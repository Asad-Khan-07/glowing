import { useState, useRef, useLayoutEffect, useCallback } from "react";

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
];

const CARD_WIDTH = 256;
const CARD_GAP = 16;
const STEP = CARD_WIDTH + CARD_GAP;
const len = carouselItems.length;

// Aage aur peeche 2-2 clones — fast clicking pe bhi safe
const clonedItems = [
  ...carouselItems.slice(-2).map((item) => ({ ...item, _clone: "pre" })),
  ...carouselItems,
  ...carouselItems.slice(0, 2).map((item) => ({ ...item, _clone: "post" })),
];
// Real cards start index = 2 (kyunki 2 pre-clones hain)
const REAL_START = 2;

const vipPoints = [
  "Connect database through secure SSH",
  "Anti-DDOS automation activation",
  "Diverse traffic into multiple servers",
  "Blocklist unwanted IPs for security",
  "More new access coming soon",
];

function ShowcaseSection() {
  // activeIdx = clonedItems mein current position, starts at REAL_START
  const [activeIdx, setActiveIdx] = useState(REAL_START);
  const trackRef = useRef(null);
  const wrapRef = useRef(null);
  const isJumping = useRef(false);

  const realDotIdx = (activeIdx - REAL_START + len) % len;

  const getOffset = useCallback(
    (idx = activeIdx) => {
      const wrapW = wrapRef.current?.offsetWidth ?? 0;
      const centerOffset = (wrapW - CARD_WIDTH) / 2;
      return idx * STEP - centerOffset;
    },
    [activeIdx]
  );

  const jumpTo = useCallback((idx) => {
    const el = trackRef.current;
    if (!el) return;
    isJumping.current = true;
    el.style.transition = "none";
    const wrapW = wrapRef.current?.offsetWidth ?? 0;
    const centerOffset = (wrapW - CARD_WIDTH) / 2;
    el.style.transform = `translateX(-${idx * STEP - centerOffset}px)`;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        el.style.transition = "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)";
        isJumping.current = false;
      })
    );
    setActiveIdx(idx);
  }, []);

  // Animated slide
  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el || isJumping.current) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)";
    el.style.transform = `translateX(-${getOffset()}px)`;
  }, [activeIdx, getOffset]);

  const next = useCallback(() => {
    if (!isJumping.current) setActiveIdx((i) => i + 1);
  }, []);

  const prev = useCallback(() => {
    if (!isJumping.current) setActiveIdx((i) => i - 1);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    // Last real card ke baad post-clone pe pohoncha → real first pe jump
    if (activeIdx >= REAL_START + len) {
      jumpTo(REAL_START + (activeIdx - REAL_START - len));
    }
    // First real card se pehle pre-clone pe pohoncha → real last pe jump
    else if (activeIdx < REAL_START) {
      jumpTo(REAL_START + len + (activeIdx - REAL_START));
    }
  }, [activeIdx, jumpTo]);

  return (
    <section id="Products">
      <div className="text-center mb-20">
        <h2 className="text-white font-extrabold text-3xl md:text-4xl mb-3">
          Our Showcase
        </h2>
        <p className="text-[#8b8fa8] text-sm leading-6 max-w-sm mx-auto mb-10">
          They built amazing websites to help more people around the world by
          using our recommendation services and products.
        </p>

        <div className="mt-12">
          <div className="overflow-hidden" ref={wrapRef}>
            <div
              ref={trackRef}
              className="flex gap-4"
              style={{ willChange: "transform" }}
              onTransitionEnd={handleTransitionEnd}
            >
              {clonedItems.map((item, i) => (
                <div
                  key={`${item.id}-${i}`}
                  className={[
                    "flex-shrink-0 w-64 rounded-2xl overflow-hidden text-left",
                    item.featured ? "" : "border border-white/10",
                  ].join(" ")}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="bg-[#13162a] px-4 py-3">
                    <p className="text-white text-sm font-semibold leading-5">
                      {item.title}
                    </p>
                    <p className="text-[#8b8fa8] text-xs mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-5 mt-6">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-white/10 bg-[#13162a] text-white flex items-center justify-center transition-all duration-200 hover:border-purple-500 hover:bg-purple-500/10"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="flex gap-2">
              {carouselItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (!isJumping.current) jumpTo(REAL_START + i);
                  }}
                  className={[
                    "rounded-full transition-all duration-300",
                    i === realDotIdx
                      ? "w-5 h-2 bg-purple-500"
                      : "w-2 h-2 bg-white/20 hover:bg-white/40",
                  ].join(" ")}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-white/10 bg-[#13162a] text-white flex items-center justify-center transition-all duration-200 hover:border-purple-500 hover:bg-purple-500/10"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function VIPSection() {
  return (
    <section id="pricing">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-white font-extrabold text-3xl md:text-4xl leading-tight mb-8">
            We Give You All<br />VIP Golden Access
          </h2>

          <ul className="space-y-3 mb-10">
            {vipPoints.map((point, i) => (
              <li key={i} className="flex items-center gap-3 text-[#c4c6d6] text-sm">
                <span className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#22c55e" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round" />
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

        <div className="flex-1 relative flex justify-center">
          <div className="relative rounded-3xl overflow-hidden w-72 h-80 md:w-80 md:h-96">
            <img
              src="https://images.unsplash.com/photo-1543270122-f7a11ad44f3a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybCUyMHdpdGglMjB0YWJsZXR8ZW58MHwxfDB8fHww"
              alt="VIP Access"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f1a]/60 via-transparent to-transparent" />
          </div>

          <div className="absolute -left-4 top-6 bg-[#13162a] border border-white/10 rounded-2xl px-4 py-3 shadow-xl">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-violet-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  width={16} height={16}>
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

          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#13162a] border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl w-48">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-violet-400 flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                width={18} height={18}>
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