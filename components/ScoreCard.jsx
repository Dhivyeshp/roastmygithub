const CATEGORY_LABELS = {
  profile: "Profile",
  repos: "Repos",
  readmes: "READMEs",
  commits: "Commits",
  social: "Social",
};

const CATEGORY_NOTES = {
  profile: "Avatar, bio, location, website, profile README",
  repos: "Original repos, descriptions, active maintenance",
  readmes: "Documentation quality across top repos",
  commits: "How recently and consistently you push code",
  social: "Followers and star count signal",
};

const CATEGORY_ICONS = {
  profile: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  ),
  repos: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h18v18H3z" rx="2" /><path d="M9 3v18M3 9h6" />
    </svg>
  ),
  readmes: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  ),
  commits: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><line x1="2" y1="12" x2="9" y2="12" /><line x1="15" y1="12" x2="22" y2="12" />
    </svg>
  ),
  social: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

function scoreColor(score) {
  if (score >= 75) return "#7c3aed";
  if (score >= 50) return "#BA7517";
  return "#E24B4A";
}

function barGradient(score) {
  if (score >= 75) return "linear-gradient(90deg, #7c3aed, #a855f7)";
  if (score >= 50) return "linear-gradient(90deg, #BA7517, #f59e0b)";
  return "linear-gradient(90deg, #E24B4A, #f87171)";
}

export default function ScoreCard({ category, score }) {
  const label = CATEGORY_LABELS[category] || category;
  const note = CATEGORY_NOTES[category] || "";
  const icon = CATEGORY_ICONS[category];
  const color = scoreColor(score);
  const gradient = barGradient(score);

  return (
    <div
      className="card-hover"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "0.875rem",
        padding: "1.125rem 1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
          <span style={{ color: "var(--text-faint)", display: "flex", alignItems: "center" }}>
            {icon}
          </span>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {label}
          </span>
        </div>
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "1.625rem",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color,
          }}
        >
          {score}
          <span
            style={{
              fontSize: "0.6rem",
              fontWeight: 500,
              color: "var(--text-faint)",
              letterSpacing: 0,
              marginLeft: "1px",
            }}
          >
            /100
          </span>
        </span>
      </div>

      {/* Gradient progress bar */}
      <div
        style={{
          height: "5px",
          backgroundColor: "var(--border)",
          borderRadius: "9999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${score}%`,
            background: gradient,
            borderRadius: "9999px",
            transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>

      {/* Note */}
      <p
        style={{
          fontSize: "0.68rem",
          color: "var(--text-faint)",
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        {note}
      </p>
    </div>
  );
}
