import { useState, useEffect } from "react";

const navLinks = [
  { label: "Services",     id: "services" },
  { label: "Products",     id: "Products" },
  { label: "Pricing",      id: "pricing" },
  { label: "Testimonials", id: "Testimonials" },
];

export default function WeServeNavbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── smooth scroll helper ────────────────────────────────────────────────
  const scrollTo = (id) => {
    setActiveLink(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        className={`w-screen fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 h-[68px] transition-all duration-300 backdrop-blur-xl border-b
          ${scrolled
            ? "bg-[#0b0c10] border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
            : "bg-[#0b0c10] border-white/5"
          }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer select-none">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M15 3L27 9V21L15 27L3 21V9L15 3Z" fill="#7c6eff" opacity="0.15"/>
            <path d="M15 3L27 9V21L15 27L3 21V9L15 3Z" stroke="#7c6eff" strokeWidth="1.5"/>
            <circle cx="15" cy="15" r="4" fill="#7c6eff"/>
            <path d="M15 9V11M15 19V21M9 15H11M19 15H21" stroke="#7c6eff" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="font-bold text-xl text-white tracking-tight">
            we<span className="text-[#7c6eff]">serve</span>.
          </span>
        </div>

        {/* Nav Links - Desktop */}
        <ul className="hidden md:flex items-center gap-1 list-none">
          {navLinks.map(({ label, id }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`relative text-sm px-3.5 py-2 rounded-lg cursor-pointer transition-all duration-200 border-none bg-transparent
                  ${activeLink === id
                    ? "text-white"
                    : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                  }`}
              >
                {label}
                <span
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-[#7c6eff] transition-transform duration-300 origin-center
                    ${activeLink === id ? "scale-x-100" : "scale-x-0"}`}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <button className="hidden md:flex relative items-center justify-center w-[38px] h-[38px] rounded-xl border border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-200">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </button>

          <button className="hidden md:block text-sm font-medium text-white bg-[#7c6eff] hover:bg-[#6b5ce7] px-5 py-2 rounded-xl transition-all duration-200 hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(124,110,255,0.4)] active:translate-y-0">
            Sign In
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex md:hidden flex-col gap-[5px] p-1.5 rounded-lg hover:bg-white/[0.07] transition-colors duration-200 border-none bg-transparent cursor-pointer"
          >
            <span className={`block w-[22px] h-0.5 bg-white/75 rounded transition-all duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}/>
            <span className={`block w-[22px] h-0.5 bg-white/75 rounded transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}/>
            <span className={`block w-[22px] h-0.5 bg-white/75 rounded transition-all duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}/>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-[68px] left-0 right-0 z-40 bg-[#0b0c10] backdrop-blur-xl border-b border-white/[0.07] px-8 pb-6 flex flex-col gap-1 transition-all duration-300
          ${menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      >
        {navLinks.map(({ label, id }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="text-left text-[0.95rem] text-white/65 hover:text-white py-3 px-2 border-b border-white/[0.05] transition-colors duration-200 bg-transparent border-x-0 border-t-0 cursor-pointer"
          >
            {label}
          </button>
        ))}
        <div className="flex items-center gap-3 mt-3">
          <button className="relative flex items-center justify-center w-[38px] h-[38px] rounded-xl border border-white/10 bg-white/[0.04] text-white/70">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </button>
          <button className="text-sm font-medium text-white bg-[#7c6eff] px-5 py-2 rounded-xl">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}