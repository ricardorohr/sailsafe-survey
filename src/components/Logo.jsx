// SailSafe mark — a sail over a wave. Pure SVG, scales via the className's size.
export default function Logo({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="SailSafe"
    >
      <rect width="48" height="48" rx="12" fill="#0B2540" />
      <path d="M23 9.5 L23 30 L11.5 30 Z" fill="#FFFFFF" />
      <path d="M25.4 13.5 L35 30 L25.4 30 Z" fill="#1763E6" />
      <path
        d="M8 34c3 2.4 6 2.4 9 0s6-2.4 9 0 6 2.4 9 0"
        stroke="#9FC0F0"
        strokeWidth="2.3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
