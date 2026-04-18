'use client';

export default function ShareCard({ username, score, label }) {
  function handleShare() {
    const url = `https://githubmaxxing.vercel.app/share/${username}`;
    const summary = `My GitHub profile scored ${score}/100 (${label}) on GitHub Maxxing — a free tool that audits your profile and gives you a ranked action plan.`;
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(`GitHub score: ${score}/100 · ${label}`)}&summary=${encodeURIComponent(summary)}&source=githubmaxxing`,
      "_blank",
      "width=600,height=600"
    );
  }

  return (
    <div
      style={{
        borderTop: "1px solid var(--border)",
        paddingTop: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <p
        style={{
          fontSize: "0.875rem",
          color: "var(--text-muted)",
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        Share your score.{" "}
        <span style={{ color: "var(--text)" }}>
          Challenge friends to beat it.
        </span>
      </p>

      <button
        onClick={handleShare}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.375rem",
          padding: "0.5rem 1rem",
          border: "1px solid var(--border)",
          borderRadius: "0.375rem",
          backgroundColor: "transparent",
          color: "var(--text)",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: "0.75rem",
          cursor: "pointer",
          transition: "border-color 0.15s",
          whiteSpace: "nowrap",
          width: "fit-content",
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.borderColor = "var(--text-muted)")
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.borderColor = "var(--border)")
        }
      >
        Share on LinkedIn ↗
      </button>
    </div>
  );
}
