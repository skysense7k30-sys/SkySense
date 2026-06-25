export default function SpecIcon({ name, className }) {
  const common = {
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
  };

  switch (name) {
    case "flightController":
      return (
        <svg {...common}>
          <rect x="14" y="14" width="36" height="36" rx="2" />
          <rect x="24" y="24" width="16" height="16" rx="1" />
          <line x1="32" y1="6" x2="32" y2="14" />
          <line x1="32" y1="50" x2="32" y2="58" />
          <line x1="6" y1="32" x2="14" y2="32" />
          <line x1="50" y1="32" x2="58" y2="32" />
          <circle cx="32" cy="32" r="3" fill="#ff6b35" stroke="none" />
        </svg>
      );

    case "esc":
      return (
        <svg {...common}>
          <rect x="10" y="14" width="44" height="32" rx="2" />
          <circle cx="18" cy="22" r="3" />
          <circle cx="46" cy="22" r="3" />
          <circle cx="18" cy="38" r="3" />
          <circle cx="46" cy="38" r="3" />
          <path d="M32 18 L28 30 L34 30 L30 42" stroke="#ff6b35" />
        </svg>
      );

    case "gps":
      return (
        <svg {...common}>
          <path d="M32 50 C32 50 20 36 20 26 C20 17.2 25.4 12 32 12 C38.6 12 44 17.2 44 26 C44 36 32 50 32 50 Z" />
          <circle cx="32" cy="26" r="6" fill="#ff6b35" stroke="none" />
          <ellipse cx="32" cy="48" rx="16" ry="4" strokeDasharray="2 3" />
        </svg>
      );

    case "camera":
      return (
        <svg {...common}>
          <rect x="10" y="20" width="36" height="26" rx="3" />
          <rect x="20" y="14" width="12" height="8" rx="1" />
          <circle cx="28" cy="33" r="8" />
          <circle cx="28" cy="33" r="3" fill="#ff6b35" stroke="none" />
          <path d="M42 26 Q50 26 50 34" />
          <path d="M46 28 Q50 28 50 32" />
        </svg>
      );

    case "sensor":
      return (
        <svg {...common}>
          <path d="M20 10 v24 a8 8 0 1 0 8 0 V10 a4 4 0 0 0 -8 0 Z" />
          <circle cx="24" cy="44" r="3" fill="#ff6b35" stroke="none" />
          <path d="M44 14 C44 14 52 26 52 34 C52 39.5 48.4 44 43.5 44 C38.6 44 35 39.5 35 34 C35 26 44 14 44 14 Z" />
        </svg>
      );

    case "rc":
      return (
        <svg {...common}>
          <rect x="14" y="16" width="36" height="32" rx="4" />
          <circle cx="24" cy="32" r="6" />
          <circle cx="24" cy="32" r="2" fill="#ff6b35" stroke="none" />
          <circle cx="42" cy="32" r="6" />
          <circle cx="42" cy="32" r="2" fill="#ff6b35" stroke="none" />
          <line x1="20" y1="16" x2="16" y2="6" />
          <line x1="46" y1="16" x2="50" y2="6" />
        </svg>
      );

    case "microcontroller":
      return (
        <svg {...common}>
          <rect x="10" y="16" width="44" height="30" rx="2" />
          <rect x="10" y="20" width="10" height="8" />
          <line x1="16" y1="10" x2="16" y2="16" />
          <line x1="22" y1="10" x2="22" y2="16" />
          <line x1="28" y1="10" x2="28" y2="16" />
          <line x1="34" y1="10" x2="34" y2="16" />
          <line x1="40" y1="10" x2="40" y2="16" />
          <line x1="46" y1="10" x2="46" y2="16" />
          <circle cx="44" cy="38" r="4" fill="#ff6b35" stroke="none" />
        </svg>
      );

    case "bluetooth":
      return (
        <svg {...common}>
          <path d="M26 14 V50 L42 38 L30 30 L42 26 L26 14" />
          <circle cx="26" cy="14" r="2" fill="#ff6b35" stroke="none" />
          <circle cx="26" cy="50" r="2" fill="#ff6b35" stroke="none" />
        </svg>
      );

    case "motorConfig":
      return (
        <svg {...common}>
          <line x1="32" y1="32" x2="14" y2="14" />
          <line x1="32" y1="32" x2="50" y2="14" />
          <line x1="32" y1="32" x2="14" y2="50" />
          <line x1="32" y1="32" x2="50" y2="50" />
          <circle cx="14" cy="14" r="6" />
          <circle cx="50" cy="14" r="6" />
          <circle cx="14" cy="50" r="6" />
          <circle cx="50" cy="50" r="6" />
          <circle cx="32" cy="32" r="4" fill="#ff6b35" stroke="none" />
        </svg>
      );

    case "power":
      return (
        <svg {...common}>
          <rect x="14" y="18" width="32" height="28" rx="2" />
          <rect x="46" y="26" width="4" height="12" />
          <path d="M32 22 L26 34 L32 34 L28 44" stroke="#ff6b35" />
        </svg>
      );

    case "videoProtocol":
      return (
        <svg {...common}>
          <circle cx="26" cy="32" r="16" />
          <path d="M22 24 L36 32 L22 40 Z" fill="#ff6b35" stroke="none" />
          <path d="M46 22 Q54 32 46 42" />
          <path d="M40 26 Q44 32 40 38" />
        </svg>
      );

    case "missionSoftware":
      return (
        <svg {...common}>
          <path d="M10 46 Q20 30 30 38 T50 18" strokeDasharray="3 4" />
          <circle cx="10" cy="46" r="3" fill="#ff6b35" stroke="none" />
          <circle cx="30" cy="38" r="3" fill="#ff6b35" stroke="none" />
          <circle cx="50" cy="18" r="3" />
        </svg>
      );

    default:
      return null;
  }
}