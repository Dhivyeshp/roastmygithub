export default function SectionLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
      <div
        style={{
          width: '3px',
          height: '14px',
          borderRadius: '9999px',
          background: 'linear-gradient(180deg, #7c3aed, #a855f7)',
          flexShrink: 0,
        }}
      />
      <p
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          margin: 0,
        }}
      >
        {children}
      </p>
    </div>
  );
}
