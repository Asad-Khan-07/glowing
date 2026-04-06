import { useState, useRef } from "react";

const showcaseItems = [
  { id: 1, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Qkhts2y4WGaNKgD-1oFjfnEFxFV16YbRLpd2n5gviA&s", alt: "Dashboard App" },
  { id: 2, src: "https://placehold.co/320x200/6c2fff/ffffff?text=We+Empower", alt: "We Empower", featured: true },
  { id: 3, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX3hnbVFbX_ss_ZznvqjtrwyzESoxi6lUyGA&s", alt: "Analytics" },
  { id: 4, src: "data:image/jpeg;base64,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", alt: "Mobile App" },
];

const carouselItems = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1763718528755-4bca23f82ac3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2hpdGUlMjBkYXRhJTIwZGFzaGJvYXJkfGVufDB8MHwwfHx8MA%3D%3D",
    title: "Dashboard App",
    sub: "Analytics & reporting interface",
  },
  {
    id: 2,
    src: "https://plus.unsplash.com/premium_photo-1661510884617-232a2ba30dc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHdlYnNpdGV8ZW58MHwwfDB8fHww",
    title: "We Empower",
    sub: "Our flagship platform",
    featured: true,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFuYWx5dGljcyUyMHN1aXRlfGVufDB8MHwwfHx8MA%3D%3D",
    title: "Analytics Suite",
    sub: "Deep insights & metrics",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1767449441925-737379bc2c4d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW9iaWxlJTIwYXBwJTIwZGVzaWdufGVufDB8MHwwfHx8MA%3D%3D",
    title: "Mobile App",
    sub: "Cross-platform solution",
  },
//   {
//     id: 5,
//     src: "https://placehold.co/280x200/0d1117/6c2fff?text=Security+Tool",
//     title: "Security Tool",
//     sub: "Anti-DDoS & IP protection",
//   },
];

const CARD_WIDTH = 256; // w-64 = 256px
const CARD_GAP = 16;    // gap-4 = 16px
const STEP = CARD_WIDTH + CARD_GAP;

const vipPoints = [
  "Connect database through secure SSH",
  "Anti-DDOS automation activation",
  "Diverse traffic into multiple servers",
  "Blocklist unwanted IPs for security",
  "More new access coming soon",
];

function ShowcaseSection() {
  const [hovered, setHovered] = useState(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const maxIdx = carouselItems.length - 1;

  const prev = () => setActiveIdx((i) => Math.max(0, i - 1));
  const next = () => setActiveIdx((i) => Math.min(maxIdx, i + 1));

  return (
    <section id="Products">
      <div className="text-center mb-20">
        <h2 className="text-white font-extrabold text-3xl md:text-4xl mb-3">
          Our Showcase
        </h2>
        <p className="text-[#8b8fa8] text-sm leading-6 max-w-sm mx-auto mb-10">
          They built amazing website to help more people around the world by
          using our recommendation services and products.
        </p>

        {/* Image strip */}
        {/* <div className="flex gap-4 items-end justify-center overflow-x-auto pb-2">
          {showcaseItems.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              className={[
                "relative flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer",
                item.featured
                  ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-[#0d0f1a]"
                  : "border border-white/10",
                hovered === item.id
                  ? "-translate-y-2 shadow-[0_16px_50px_rgba(124,77,255,0.35)]"
                  : "shadow-[0_6px_20px_rgba(0,0,0,0.4)]",
              ].join(" ")}
              style={{
                width: item.featured ? 280 : 230,
                height: item.featured ? 200 : 165,
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div> */}

        {/* ── Carousel ── */}
        <div className="mt-12">
          {/* Track */}
          <div className="overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIdx * STEP}px)` }}
            >
              {carouselItems.map((item) => (
                <div
                  key={item.id}
                  className={[
                    "flex-shrink-0 w-64 rounded-2xl overflow-hidden text-left",
                    item.featured
                      ? ""
                      : "border border-white/10",
                  ].join(" ")}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="bg-[#13162a] px-4 py-3">
                    {/* {item.featured && (
                      <span className="inline-block text-[11px] font-semibold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full mb-2">
                        Featured
                      </span>
                    )} */}
                    <p className="text-white text-sm font-semibold leading-5">
                      {item.title}
                    </p>
                    <p className="text-[#8b8fa8] text-xs mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-5 mt-6">
            {/* Prev */}
            <button
              onClick={prev}
              disabled={activeIdx === 0}
              className="w-9 h-9 rounded-full border border-white/10 bg-[#13162a] text-white flex items-center justify-center transition-all duration-200 hover:border-purple-500 hover:bg-purple-500/10 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {carouselItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={[
                    "rounded-full transition-all duration-300",
                    i === activeIdx
                      ? "w-5 h-2 bg-purple-500"
                      : "w-2 h-2 bg-white/20 hover:bg-white/40",
                  ].join(" ")}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={next}
              disabled={activeIdx === maxIdx}
              className="w-9 h-9 rounded-full border border-white/10 bg-[#13162a] text-white flex items-center justify-center transition-all duration-200 hover:border-purple-500 hover:bg-purple-500/10 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
        {/* ── End Carousel ── */}
      </div>
    </section>
  );
}

function VIPSection() {
  return (
    <section id="pricing">
      <div className="flex flex-col md:flex-row items-center gap-12">

        {/* Left: Text */}
        <div className="flex-1">
          <h2 className="text-white font-extrabold text-3xl md:text-4xl leading-tight mb-8">
            We Give You All<br />VIP Golden Access
          </h2>

          <ul className="space-y-3 mb-10">
            {vipPoints.map((point, i) => (
              <li key={i} className="flex items-center gap-3 text-[#c4c6d6] text-sm">
                <span className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {point}
              </li>
            ))}
          </ul>

          <button className="bg-[#6c2fff] hover:bg-purple-600 text-white text-sm font-bold px-7 py-3 rounded-full transition-all duration-300 hover:shadow-[0_8px_30px_rgba(108,47,255,0.45)] hover:-translate-y-0.5">
            Get a Free Trial
          </button>
        </div>

        {/* Right: Image card */}
        <div className="flex-1 relative flex justify-center">
          <div className="relative rounded-3xl overflow-hidden w-72 h-80 md:w-80 md:h-96">
            <img
src="https://images.unsplash.com/photo-1543270122-f7a11ad44f3a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybCUyMHdpdGglMjB0YWJsZXR8ZW58MHwxfDB8fHww"
              alt="VIP Access"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f1a]/60 via-transparent to-transparent" />
          </div>

          {/* 5/5 Growth badge */}
          <div className="absolute -left-4 top-6 bg-[#13162a] border border-white/10 rounded-2xl px-4 py-3 shadow-xl">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-violet-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <span className="text-white font-bold text-sm">5/5 Growth</span>
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          </div>

          {/* AI Automation badge */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#13162a] border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl w-48">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-violet-400 flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
                <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
                <path d="M12 8v4l3 3" />
              </svg>
            </div>
            <div>
              <p className="text-white text-sm font-bold">AI Automation</p>
              <p className="text-[#8b8fa8] text-xs">Working Faster</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Product() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-1 { animation: fadeUp 0.6s 0.0s ease both; }
        .anim-3 { animation: fadeUp 0.6s 0.3s ease both; }
      `}</style>

      <section
        className="min-h-screen bg-[#0d0f1a] px-6 py-16"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="anim-1"><ShowcaseSection /></div>
          <div className="border-t border-white/[0.06] mb-20" />
          <div className="anim-3"><VIPSection /></div>
        </div>
      </section>
    </>
  );
}