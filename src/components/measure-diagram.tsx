/** Static SVG: how to measure rim and height — no cards, one visual idea */
export function MeasureDiagram() {
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-border/70 bg-mist/40">
      <svg
        viewBox="0 0 640 280"
        className="h-auto w-full"
        role="img"
        aria-label="角型ゴミ箱の口の長辺・短辺と高さを測る図"
      >
        <rect width="640" height="280" fill="#e7efea" />
        {/* Bin isometric-ish */}
        <g transform="translate(80,40)">
          <polygon
            points="40,70 220,70 220,220 40,220"
            fill="#f4f8f5"
            stroke="#1f4d3d"
            strokeWidth="2.5"
          />
          <polygon
            points="220,70 290,30 290,180 220,220"
            fill="#cfe0d6"
            stroke="#1f4d3d"
            strokeWidth="2.5"
          />
          <polygon
            points="40,70 110,30 290,30 220,70"
            fill="#e7efea"
            stroke="#1f4d3d"
            strokeWidth="2.5"
          />
          <polygon
            points="70,48 200,48 245,28 115,28"
            fill="#3f7a62"
            opacity="0.22"
          />
          {/* Width arrow */}
          <line
            x1="40"
            y1="240"
            x2="220"
            y2="240"
            stroke="#1f4d3d"
            strokeWidth="1.5"
            markerEnd="url(#arrow)"
            markerStart="url(#arrow)"
          />
          <text x="130" y="262" textAnchor="middle" fill="#1f4d3d" fontSize="14">
            口の長辺
          </text>
          {/* Height arrow */}
          <line
            x1="310"
            y1="40"
            x2="310"
            y2="200"
            stroke="#1f4d3d"
            strokeWidth="1.5"
          />
          <text
            x="325"
            y="130"
            fill="#1f4d3d"
            fontSize="14"
            transform="rotate(90 325 130)"
          >
            高さ（内寸）
          </text>
        </g>
        {/* Round bin */}
        <g transform="translate(400,50)">
          <ellipse cx="90" cy="190" rx="70" ry="14" fill="#1f4d3d" opacity="0.1" />
          <path
            d="M20 60 L30 190 Q90 220 150 190 L160 60"
            fill="#f4f8f5"
            stroke="#1f4d3d"
            strokeWidth="2.5"
          />
          <ellipse
            cx="90"
            cy="60"
            rx="70"
            ry="22"
            fill="#e7efea"
            stroke="#1f4d3d"
            strokeWidth="2.5"
          />
          <ellipse cx="90" cy="60" rx="48" ry="12" fill="#3f7a62" opacity="0.25" />
          <line
            x1="20"
            y1="60"
            x2="160"
            y2="60"
            stroke="#3f7a62"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <text x="90" y="44" textAnchor="middle" fill="#1f4d3d" fontSize="14">
            直径
          </text>
          <line
            x1="175"
            y1="60"
            x2="175"
            y2="190"
            stroke="#1f4d3d"
            strokeWidth="1.5"
          />
          <text x="188" y="130" fill="#1f4d3d" fontSize="14">
            高さ
          </text>
        </g>
        <defs>
          <marker
            id="arrow"
            markerWidth="6"
            markerHeight="6"
            refX="3"
            refY="3"
            orient="auto"
          >
            <circle cx="3" cy="3" r="2" fill="#1f4d3d" />
          </marker>
        </defs>
      </svg>
      <figcaption className="border-t border-border/60 px-4 py-3 text-xs text-muted-foreground sm:px-5">
        左: 角型は口の長辺・短辺と高さ。右: 丸型は直径と高さ。いずれも縁の内側。
      </figcaption>
    </figure>
  );
}
