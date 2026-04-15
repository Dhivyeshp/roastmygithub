const impactStyle = {
  high: { backgroundColor: "#ede9fe", color: "#5b21b6" },
  medium: { backgroundColor: "#fdf3e3", color: "#854F0B" },
  low: { backgroundColor: "var(--surface-2)", color: "var(--text-muted)" },
};

const effortStyle = {
  low: { backgroundColor: "#E6F1FB", color: "#185FA5" },
  medium: { backgroundColor: "#fdf3e3", color: "#854F0B" },
  high: { backgroundColor: "#fdecea", color: "#A32D2D" },
};

const accentGradient = {
  high: "linear-gradient(180deg, #7c3aed, #a855f7)",
  medium: "linear-gradient(180deg, #BA7517, #f59e0b)",
  low: "var(--border)",
};

function Pill({ children, style }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.2rem 0.55rem",
        borderRadius: "0.375rem",
        fontFamily: "'DM Mono', monospace",
        fontSize: "0.58rem",
        fontWeight: 500,
        letterSpacing: "0.02em",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function ActionItem({ action, index }) {
  const { priority, issue, fix, impact, effort, timeEstimate } = action;
  const impactSt = impactStyle[impact] || impactStyle.low;
  const effortSt = effortStyle[effort] || effortStyle.medium;
  const gradient = accentGradient[impact] || accentGradient.low;

  return (
    <div
      className="card-hover fade-up"
      style={{
        display: "flex",
        gap: "0.875rem",
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "0.875rem",
        padding: "1.125rem 1.25rem",
        position: "relative",
        overflow: "hidden",
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "3px",
          background: gradient,
          borderRadius: "0.875rem 0 0 0.875rem",
        }}
      />

      {/* Priority circle */}
      <div
        style={{
          width: "26px",
          height: "26px",
          borderRadius: "9999px",
          backgroundColor: "var(--surface-2)",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.6rem",
          fontWeight: 700,
          color: "var(--text-muted)",
          flexShrink: 0,
          marginTop: "1px",
        }}
      >
        {priority}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            letterSpacing: "-0.015em",
            marginBottom: "0.3rem",
            color: "var(--text)",
            lineHeight: 1.4,
          }}
        >
          {issue}
        </p>
        <p
          style={{
            fontSize: "0.775rem",
            color: "var(--text-muted)",
            lineHeight: 1.65,
            marginBottom: "0.75rem",
          }}
        >
          {fix}
        </p>
        <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
          <Pill style={impactSt}>{impact} impact</Pill>
          <Pill style={effortSt}>{effort} effort</Pill>
          <Pill style={{ backgroundColor: "var(--surface-2)", color: "var(--text-faint)" }}>
            {timeEstimate}
          </Pill>
        </div>
      </div>
    </div>
  );
}

export default function ActionPlan({ actions }) {
  if (!actions || actions.length === 0) {
    return (
      <p
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.75rem",
          color: "var(--text-muted)",
          textAlign: "center",
          padding: "2rem 0",
        }}
      >
        No actions generated.
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {actions.map((action, i) => (
        <ActionItem key={action.priority} action={action} index={i} />
      ))}
    </div>
  );
}
