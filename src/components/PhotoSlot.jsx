export default function PhotoSlot({ label, hint, aspect = "16/9",link }) {
  return (
    <div className="photo-slot" style={{ aspectRatio: aspect }}>
      <div className="photo-slot-inner">
        <div className="photo-slot-icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="2" y="7" width="28" height="19" rx="2" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="16" cy="16.5" r="5" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="16" cy="16.5" r="2" fill="currentColor" opacity="0.3" />
            <rect x="10" y="4" width="12" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </div>
        <div className="photo-slot-label">{label}</div>
        <iframe src={link} frameborder="0"></iframe>
        {hint && <div className="photo-slot-hint">{hint}</div>}
      </div>
    </div>
  );
}
