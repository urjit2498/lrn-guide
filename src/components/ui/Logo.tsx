interface LogoMarkProps {
  size?: number;
}

/** The icon mark — rounded square with gradient + </> */
export function LogoMark({ size = 32 }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      {/* Background */}
      <rect width="32" height="32" rx="8" fill="url(#logo-grad)" />
      {/* < bracket */}
      <path d="M8 16l5-5v2.5L10 16l3 2.5V21L8 16z" fill="white" />
      {/* > bracket */}
      <path d="M24 16l-5-5v2.5L22 16l-3 2.5V21l5-5z" fill="white" />
      {/* / slash */}
      <rect x="14.5" y="9" width="2.5" height="14" rx="1.25" fill="rgba(255,255,255,0.6)" transform="rotate(−15 15.75 16)" />
      <line x1="17" y1="9.5" x2="14" y2="22.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.9" />
    </svg>
  );
}

interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}

/** Full logo: icon mark + "LRN GUIDE" wordmark */
export function Logo({ size = 32, showWordmark = true, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      {showWordmark && (
        <div className="leading-none">
          <span className="block font-bold text-sm tracking-wide text-gray-900 dark:text-white">
            LRN GUIDE
          </span>
          <span className="block text-[10px] text-gray-500 dark:text-gray-400 tracking-wide mt-0.5">
            Developer Learning Platform
          </span>
        </div>
      )}
    </div>
  );
}
