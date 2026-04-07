import dashboard from "../assets/dashboard.jpg";
import Prism from "./Prism";

const logos = ["Logoipsum", "logoipsum", "Logoipsum", "Logoipsum", "Logoipsum"];

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-[#0d0e1a] flex flex-col items-center overflow-hidden relative">

      {/* ── PRISM BACKGROUND ── */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={1}
        />
      </div>

      {/* Radial glow bg */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#7c6eff]/10 rounded-full blur-[120px]"/>
        <div className="absolute top-[30%] right-[-5%] w-[300px] h-[300px] bg-[#6366f1]/10 rounded-full blur-[80px]"/>
      </div>

      {/* ── HERO TEXT ── */}
      <div className="relative z-10 flex flex-col items-center text-center pt-24 px-4 w-full">

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.05] mb-5">
          #1 Best Provider
        </h1>

        {/* Subtext */}
        <p className="text-white/45 text-base max-w-md mb-8 leading-relaxed">
          We provide a variety of servers to grow your users without compromising data.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-4 mb-16">
          <button className="px-6 py-3 rounded-full bg-[#7c6eff] text-white text-sm font-semibold hover:bg-[#6b5ce7] hover:shadow-[0_8px_30px_rgba(124,110,255,0.45)] hover:-translate-y-0.5 transition-all duration-200">
            Try Free Trial
          </button>
          <button className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/[0.04] text-white/80 text-sm font-medium hover:bg-white/[0.08] hover:border-white/25 transition-all duration-200">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Schedule a Demo
          </button>
        </div>

        {/* ── DASHBOARD IMAGE ── */}
        <div className="relative max-w-6xl mx-auto w-full px-4">

          {/* Floating left card */}
          <div className="absolute -left-4 top-10 z-20 bg-[#181929] border border-white/10 rounded-2xl p-4 w-36 shadow-2xl hidden lg:block">
            <div className="w-8 h-8 rounded-xl bg-[#7c6eff]/20 flex items-center justify-center mb-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c6eff" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <p className="text-white text-sm font-bold leading-tight">Secured</p>
            <p className="text-white/40 text-[10px] mt-0.5">100% Data</p>
          </div>

          {/* Floating right card */}
          <div className="absolute -right-4 bottom-20 z-20 bg-white rounded-2xl p-3.5 shadow-2xl hidden lg:block">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#7c6eff]/15 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c6eff" strokeWidth="2.5">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                  <polyline points="16 7 22 7 22 13"/>
                </svg>
              </div>
              <div>
                <p className="text-[#0d0e1a] text-sm font-black">500% Visits</p>
                <p className="text-gray-400 text-[10px]">Within 100 days</p>
              </div>
            </div>
          </div>

          {/* Dashboard Image */}
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
            <img
              src={dashboard}
              alt="Dashboard"
              className="w-full h-[500px] object-cover block"
            />
            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0d0e1a] to-transparent pointer-events-none"/>
          </div>

        </div>
      </div>

      {/* ── TRUSTED BY ── */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 pt-14 pb-12 text-center">
        <p className="text-white font-bold text-sm mb-6">Trusted by 83K Biggest Companies</p>
        <div className="flex items-center justify-center gap-8 flex-wrap">
          {logos.map((logo, i) => (
            <div key={i} className="flex items-center gap-1.5 text-white/25 hover:text-white/50 transition-colors duration-200 cursor-pointer">
              <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white/30"/>
              </div>
              <span className="text-xs font-semibold">{logo}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}