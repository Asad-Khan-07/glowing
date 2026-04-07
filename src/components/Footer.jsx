import CountUp from "./Count.jsx";

const footerLinks = {
  Company: ["About Us", "Careers", "Blog", "Press Kit"],
  Services: ["VPS Hosting", "Dedicated Servers", "Cloud Storage", "CDN Network"],
  Support: ["Documentation", "Help Center", "Status Page", "Contact Us"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
};

const socials = [
  {
    label: "Twitter",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
  {
    label: "Discord",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0d0e1a] border-t border-white/[0.06] overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2
        w-[600px] h-[300px] bg-[#7c6eff]/[0.06] rounded-full blur-[100px] pointer-events-none"/>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* ── Top CTA Banner ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between
          gap-4 py-8 sm:py-10 border-b border-white/[0.06]">
          <div>
            <p className="text-white font-black text-xl sm:text-2xl tracking-tight">
              Ready to scale your infrastructure?
            </p>
            <p className="text-white/40 text-sm mt-1">
              Start free, upgrade anytime. No credit card required.
            </p>
          </div>


          
          <div className="flex items-center gap-3 shrink-0">
            <button className="px-5 py-2.5 rounded-full bg-[#7c6eff] text-white text-sm
              font-semibold hover:bg-[#6b5ce7] hover:-translate-y-0.5
              hover:shadow-[0_8px_28px_rgba(124,110,255,0.4)]
              transition-all duration-200">
              Get Started Free
            </button>
            <button className="px-5 py-2.5 rounded-full border border-white/15
              bg-white/[0.04] text-white/70 text-sm font-medium
              hover:bg-white/[0.08] hover:border-white/25 transition-all duration-200">
              View Pricing
            </button>
          </div>
        </div>



        {/* ── Stats bar ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6
          border-t border-b border-white/[0.06]">
          {[
{ to: 99.99, suffix: "%", label: "Uptime SLA" },
{ to: 83,    suffix: "K+", label: "Companies" },
{ to: 140,   suffix: "+",  label: "Countries" },
{ to: 500,   suffix: "M",  label: "Ecosystem Value" },
          ].map(stat => (
            <div key={stat.label} className="text-center">
<p className="text-white font-black text-xl sm:text-2xl flex items-center justify-center gap-0.5">
  <CountUp from={0} to={stat.to} duration={2} direction="up" />
  <span>{stat.suffix}</span>
</p>
              <p className="text-white/35 text-xs mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>


        {/* ── Main Footer Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5
          gap-8 sm:gap-10 py-10 sm:py-12">

          {/* Brand col */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-4">
              <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
                <path d="M15 3L27 9V21L15 27L3 21V9L15 3Z" fill="#7c6eff" opacity="0.15"/>
                <path d="M15 3L27 9V21L15 27L3 21V9L15 3Z" stroke="#7c6eff" strokeWidth="1.5"/>
                <circle cx="15" cy="15" r="4" fill="#7c6eff"/>
                <path d="M15 9V11M15 19V21M9 15H11M19 15H21"
                  stroke="#7c6eff" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="font-bold text-lg text-white tracking-tight">
                we<span className="text-[#7c6eff]">serve</span>.
              </span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed max-w-[220px] mb-5">
              Powering global ecosystems with reliable, secure, and scalable server infrastructure.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map(s => (
                <button key={s.label}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04]
                    text-white/40 hover:text-white hover:bg-white/10
                    hover:border-white/20 flex items-center justify-center
                    transition-all duration-200">
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="text-white text-xs font-bold uppercase tracking-widest mb-4">
                {title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map(link => (
                  <li key={link}>
                    <a href="#"
                      className="text-white/40 text-sm hover:text-white/80
                        transition-colors duration-200 leading-none">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>






{/* import CountUp from './CountUp' */}


        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between
          gap-3 py-6 text-white/30 text-xs">
          <p>© 2026 WeServe. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
            <p>All systems operational</p>
          </div>
        </div>

      </div>
    </footer>
  );
}