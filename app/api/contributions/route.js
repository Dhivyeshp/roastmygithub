const GITHUB_SEARCH = "https://api.github.com/search/issues";

function githubHeaders() {
  const h = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

const DIFFICULTY_LABELS = {
  beginner: '"good first issue"',
  intermediate: '"help wanted"',
  advanced: null,
};

function formatAge(dateStr) {
  const days = Math.floor((Date.now() - new Date(dateStr)) / (1000 * 60 * 60 * 24));
  if (days === 0) return "today";
  if (days === 1) return "1d ago";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

async function searchIssues(query, perPage = 15) {
  const url = `${GITHUB_SEARCH}?q=${encodeURIComponent(query)}&sort=created&order=desc&per_page=${perPage}`;
  const res = await fetch(url, {
    headers: githubHeaders(),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `GitHub search error ${res.status}`);
  }
  return res.json();
}

function buildQuery(language, labelPart, minStars, dateStr) {
  const parts = [
    "is:open",
    "is:issue",
    labelPart,
    `stars:>=${minStars}`,
    `created:>=${dateStr}`,
    `language:${language}`,
  ].filter(Boolean);
  return parts.join(" ");
}

function mapItem(item) {
  return {
    id: item.id,
    title: item.title,
    url: item.html_url,
    repoName: item.repository_url.replace("https://api.github.com/repos/", ""),
    labels: (item.labels || []).map((l) => l.name),
    age: formatAge(item.created_at),
    createdAt: item.created_at,
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const difficulty = searchParams.get("difficulty") || "beginner";
  const minStars = Math.max(0, parseInt(searchParams.get("minStars") || "5", 10));
  const maxAgeDays = Math.max(1, parseInt(searchParams.get("maxAgeDays") || "30", 10));
  const languagesParam = searchParams.get("languages") || "";
  const languages = languagesParam.split(",").filter(Boolean).slice(0, 5);

  if (languages.length === 0) {
    return Response.json({ issues: [], total: 0 });
  }

  const cutoff = new Date(Date.now() - maxAgeDays * 24 * 60 * 60 * 1000);
  const dateStr = cutoff.toISOString().split("T")[0];
  const labelPart = DIFFICULTY_LABELS[difficulty] ? `label:${DIFFICULTY_LABELS[difficulty]}` : null;

  try {
    // Run one query per language in parallel, merge and deduplicate
    const perLang = languages.length === 1 ? 30 : 15;
    const results = await Promise.all(
      languages.map((lang) =>
        searchIssues(buildQuery(lang, labelPart, minStars, dateStr), perLang).catch(() => ({ items: [] }))
      )
    );

    const seen = new Set();
    const issues = results
      .flatMap((r) => (r.items || []).map(mapItem))
      .filter((item) => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 30)
      .map(({ createdAt: _drop, ...rest }) => rest);

    const total = results.reduce((sum, r) => sum + (r.total_count || 0), 0);

    return Response.json({ issues, total });
  } catch (err) {
    console.error("[contributions]", err.message);
    return Response.json({ error: err.message || "Search failed" }, { status: 500 });
  }
}
