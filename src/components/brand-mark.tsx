import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  title = "フクロメ",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("size-8", className)}
      role="img"
      aria-label={title}
    >
      <rect width="40" height="40" rx="10" fill="#1a3f32" />
      {/* Open bag silhouette */}
      <path
        d="M12 13h16l-1.4 18.2a2.4 2.4 0 0 1-2.4 2.2H15.8a2.4 2.4 0 0 1-2.4-2.2L12 13Z"
        fill="#d7ebe1"
      />
      <ellipse
        cx="20"
        cy="13"
        rx="8.2"
        ry="2.8"
        fill="#f3faf6"
        stroke="#7eaa95"
        strokeWidth="1.2"
      />
      {/* Eye / measurement mark — 「メ」sense */}
      <circle cx="20" cy="22" r="3.2" fill="#1a3f32" />
      <circle cx="20" cy="22" r="1.2" fill="#f3faf6" />
      <path
        d="M14 13.5c0 2.6 2.6 4.2 6 4.2s6-1.6 6-4.2"
        stroke="#3f7a62"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
