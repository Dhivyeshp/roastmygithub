import { fetchGitHubData } from "@/lib/github";
import { computeScores } from "@/lib/scorer";

function badgeColor(total) {
  if (total >= 75) return { bg: "#7c3aed", text: "#ffffff" };
  if (total >= 50) return { bg: "#BA7517", text: "#ffffff" };
  return { bg: "#E24B4A", text: "#ffffff" };
}

function buildSvg(score, label) {
  const { bg } = badgeColor(score);
  const leftLabel = "githubmaxxing";
  const rightLabel = `${score} · ${label}`;

  // Approximate char widths for monospace-ish rendering
  const leftW = leftLabel.length * 7 + 16;
  const rightW = rightLabel.length * 7 + 16;
  const totalW = leftW + rightW;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="20" role="img" aria-label="githubmaxxing: ${score}/100 ${label}">
  <title>githubmaxxing: ${score}/100 ${label}</title>
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="r">
    <rect width="${totalW}" height="20" rx="3" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#r)">
    <rect width="${leftW}" height="20" fill="#0f172a"/>
    <rect x="${leftW}" width="${rightW}" height="20" fill="${bg}"/>
    <rect width="${totalW}" height="20" fill="url(#s)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110" image-rendering="auto">
    <text x="${Math.round(leftW / 2 + 1) * 10}" y="150" fill="#000" fill-opacity=".3" transform="scale(.1)" textLength="${(leftW - 12) * 10}" lengthAdjust="spacing">${leftLabel}</text>
    <text x="${Math.round(leftW / 2 + 1) * 10}" y="140" transform="scale(.1)" textLength="${(leftW - 12) * 10}" lengthAdjust="spacing">${leftLabel}</text>
    <text x="${(leftW + Math.round(rightW / 2)) * 10}" y="150" fill="#000" fill-opacity=".3" transform="scale(.1)" textLength="${(rightW - 12) * 10}" lengthAdjust="spacing">${rightLabel}</text>
    <text x="${(leftW + Math.round(rightW / 2)) * 10}" y="140" transform="scale(.1)" textLength="${(rightW - 12) * 10}" lengthAdjust="spacing">${rightLabel}</text>
  </g>
</svg>`;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return new Response("username required", { status: 400 });
  }

  try {
    const githubData = await fetchGitHubData(username);
    const scores = computeScores(githubData);
    const svg = buildSvg(scores.total, scores.label);

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch {
    const errorSvg = buildSvg("?", "not found");
    return new Response(errorSvg, {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }
}
