import { useState } from "react";

const features = [
  {
    id: 1,
    title: "AI Automation",
    desc: "Decide the business flow based on latest reports.",
    featured: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/>
        <path d="M12 8v4l3 3"/>
        <path d="M8 12h.01M12 16h.01M16 12h.01"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Extra Layers",
    desc: "Making your project more secure, avoiding DDoS.",
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <path d="M7 10h10M7 14h6"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Auto-Scaling",
    desc: "Have a long weekend without worrying any loss.",
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    id: 4,
    title: "Bot Chats",
    desc: "Customer feels happy when they get quick response.",
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    id: 5,
    title: "Streaming",
    desc: "Unlimited bandwidth to stream your business.",
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <circle cx="12" cy="12" r="10"/>
        <polygon points="10 8 16 12 10 16 10 8"/>
      </svg>
    ),
  },
  {
    id: 6,
    title: "Multi Users",
    desc: "Collaborate with team easily to achieve growth.",
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

function FeatureCard({ title, desc, icon, featured }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={[
        "relative rounded-2xl overflow-hidden cursor-default transition-all duration-300 p-6",
        featured
          ? "bg-gradient-to-br from-[#6c2fff] to-[#9d5cff] border border-transparent"
          : `bg-[#13162a] border ${hovered ? "border-purple-500/30" : "border-white/[0.06]"}`,
        hovered ? "-translate-y-1.5" : "translate-y-0",
        hovered
          ? featured
            ? "shadow-[0_20px_50px_rgba(108,47,255,0.4)]"
            : "shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_30px_rgba(124,77,255,0.08)]"
          : "shadow-none",
      ].join(" ")}
    >
      {/* Glow */}
      <div className={[
        "absolute inset-0 pointer-events-none transition-opacity duration-300",
        featured
          ? "opacity-100 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.12),transparent_60%)]"
          : `bg-[radial-gradient(circle_at_30%_20%,rgba(124,77,255,0.08),transparent_65%)] ${hovered ? "opacity-100" : "opacity-100"}`,
      ].join(" ")} />

      <div className="relative">
        {/* Icon */}
        <div
          className={[
            "flex items-center justify-center rounded-[12px] mb-4",
            featured
              ? "bg-white/15 text-white"
              : "bg-purple-500/15 border border-purple-500/20 text-violet-400",
          ].join(" ")}
          style={{ width: 44, height: 44 }}
        >
          {icon}
        </div>

        <h3
          className="text-white font-bold text-base mb-1.5 tracking-tight"
        //   style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {title}
        </h3>
        <p className={`text-xs leading-relaxed ${featured ? "text-white/80" : "text-white/50"}`}>
          {desc}
        </p>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <>
      <style>{`

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .feat-header { animation: fadeUp 0.5s ease both; }
        .feat-card-0 { animation: fadeUp 0.5s 0.10s ease both; }
        .feat-card-1 { animation: fadeUp 0.5s 0.18s ease both; }
        .feat-card-2 { animation: fadeUp 0.5s 0.26s ease both; }
        .feat-card-3 { animation: fadeUp 0.5s 0.34s ease both; }
        .feat-card-4 { animation: fadeUp 0.5s 0.42s ease both; }
        .feat-card-5 { animation: fadeUp 0.5s 0.50s ease both; }
      `}</style>

      <section
        className="min-h-screen flex items-center justify-center px-6 py-16 bg-[#0d0f1a]"
        style={{
        //   fontFamily: "'DM Sans', sans-serif",
          backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        id="services"
      >
        <div className="w-full max-w-5xl">

          {/* Header */}
          <div className="feat-header flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-10 mb-10">
            <h2
              className="text-white font-extrabold leading-tight shrink-0 text-4xl md:text-5xl"
            //   style={{ fontFamily: "'Syne', sans-serif" }}
            >
              You Will Get
            </h2>
            <p className="text-[#8b8fa8] text-sm leading-7 max-w-xs md:pt-1.5">
              We always serious when building the key features because our clients needs a strong and reliable backbone in long terms.
            </p>
          </div>

          {/* 3-column 2-row grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div key={f.id} className={`feat-card-${i}`}>
                <FeatureCard {...f} />
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}