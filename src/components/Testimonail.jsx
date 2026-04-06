const testimonials = [
  {
    id: 1,
    text: (
      <>
        We hit our first <strong className="text-white">billion dollar valuation</strong> because of WeServe services was great enough.
      </>
    ),
    name: "Angga Risky",
    role: "Founder Alimax",
    avatar: "https://placehold.co/40x40/6c2fff/fff?text=AR",
    featured: false,
  },
  {
    id: 2,
    text: (
      <>
        <strong className="text-white">Reaching global customers</strong> never been easy before, thanks to WeServe for great Innovatives.
      </>
    ),
    name: "Assyline",
    role: "CFO Yunikeh",
    avatar: "https://placehold.co/40x40/9d5cff/fff?text=A",
    featured: true,
  },
  {
    id: 3,
    text: (
      <>
        Scaling from scratch was easier because <strong className="text-white">all automations</strong> that WeServe provides for us.
      </>
    ),
    name: "Jessica Maraska",
    role: "CFO findra",
    avatar: "https://placehold.co/40x40/6c2fff/fff?text=JM",
    featured: false,
  },
];

function Stars() {
  return (
    <div className="flex gap-1 mb-5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ text, name, role, avatar, featured }) {
  return (
    <div
      className={[
        "relative rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 group",
        featured
          ? "bg-[#13162a] border border-purple-500/40 shadow-[400px_400px_200px_rgba(124,77,255,0.12)]"
          : "bg-[#13162a] border border-white/[0.06]",
        "hover:-translate-y-1.5 hover:border-purple-500/40 hover:shadow-purple-500/40 shadow-2xl",
      ].join(" ")}
    >
      {/* Subtle glow overlay */}
      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_20%,rgba(124,77,255,0.06),transparent_60%)] pointer-events-none" />

      <div className="relative">
        <Stars />
        <p className="text-[#9ca3af] text-sm leading-7">{text}</p>
      </div>

      {/* Avatar row */}
      <div className="relative flex items-center gap-3 mt-8">
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/30"
        />
        <div>
          <p className="text-white text-sm font-semibold" style={{ fontFamily: "'Syne', sans-serif" }}>
            {name}
          </p>
          <p className="text-[#8b8fa8] text-xs">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .t-header { animation: fadeUp 0.5s ease both; }
        .t-card-0 { animation: fadeUp 0.5s 0.12s ease both; }
        .t-card-1 { animation: fadeUp 0.5s 0.22s ease both; }
        .t-card-2 { animation: fadeUp 0.5s 0.32s ease both; }
      `}</style>

      <section
        className="min-h-screen flex items-center justify-center px-6 py-20 bg-[#0d0f1a]"
        style={{
        //   fontFamily: "'DM Sans', sans-serif",
          backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        id="Testimonials"
 >
        <div className="w-full max-w-5xl">

          {/* Header */}
          <div className="t-header text-center mb-14">
            <h2
              className="text-white font-extrabold text-4xl md:text-5xl mb-3"
            //   style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Great Stories
            </h2>
            <p className="text-[#8b8fa8] text-sm">
              Boost your confidence to build a successful business
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={t.id} className={`t-card-${i}`}>
                <TestimonialCard {...t} />
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}