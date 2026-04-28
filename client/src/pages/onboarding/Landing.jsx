import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, CirclePlay, Play, Check, Leaf, Link2, Shield } from "lucide-react";
import { PrimaryButton, GhostButton, typeClasses, statusDot } from "./shared";

const problemCards = [
  { value: "$4T", copy: "lost annually to supply chain disruptions.", note: "Growing 12% year over year.", tone: "border-rose-400/70 text-rose-300" },
  { value: "3 weeks", copy: "average time to detect a disruption.", note: "Most teams rely on manual reports.", tone: "border-amber-400/70 text-amber-300" },
  { value: "72%", copy: "of companies have zero real-time visibility.", note: "Across all major industries.", tone: "border-violet-400/70 text-violet-300" },
];

const useCases = {
  Manufacturing: {
    title: "Automotive parts shortage — detected 3 weeks early.",
    body: "A major European auto manufacturer was relying on quarterly supplier risk reports. ChainPulse flagged the line risk 21 days before shutdown and recommended an approved alternative supplier in Thailand.",
    metrics: [["21 days", "early warning"], ["0 hours", "downtime"], ["₹4.2Cr", "savings"]],
  },
  Pharmaceuticals: {
    title: "Cold-chain excursion stopped before product loss.",
    body: "ChainPulse connected sensor feeds with shipment APIs and predicted a refrigeration failure on an insulin route. The operations team rerouted inventory before temperature thresholds were breached.",
    metrics: [["8 hours", "faster response"], ["0 batches", "discarded"], ["99.4%", "route integrity"]],
  },
  "Retail & E-commerce": {
    title: "Peak season warehouse bottleneck avoided in real time.",
    body: "Demand spiked across two metro regions and one fulfilment center drifted toward overload. ChainPulse simulated cascade impact and rebalanced routes.",
    metrics: [["31%", "faster reroute"], ["14%", "lower expedite spend"], ["96%", "SLA hit rate"]],
  },
};

const homeIndustries = ["Manufacturing", "Pharmaceuticals", "Retail & E-commerce"];

export default function Landing() {
  const navigate = useNavigate();
  const refsMap = useRef({});
  const [homeTab, setHomeTab] = useState(homeIndustries[0]);
  const [waitlistEmail, setWaitlistEmail] = useState("");

  const navItems = [
    ["How it Works", "how"],
    ["Features", "features"],
    ["Use Cases", "use-cases"],
    ["Impact", "impact"],
  ];

  const selectedCase = useCases[homeTab];

  return (
    <div className="bg-[#0b0816] text-white">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0b0816]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3 text-xl font-medium">
            <span className="h-4 w-4 rounded-full bg-white shadow-[0_0_30px_rgba(167,139,250,0.7)]" />
            ChainPulse
          </Link>
          <nav className="hidden items-center gap-9 text-sm text-white/70 md:flex">
            {navItems.map(([label, key]) => (
              <button key={label} type="button" onClick={() => refsMap.current[key]?.scrollIntoView({ behavior: "smooth", block: "start" })} className="pb-1 transition hover:text-white">
                {label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <GhostButton dark onClick={() => navigate("/signin")}>Sign in</GhostButton>
            <PrimaryButton onClick={() => navigate("/signup")}>Get started free <ArrowRight className="h-4 w-4" /></PrimaryButton>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="overflow-hidden border-b border-white/5">
        <div className="mx-auto grid max-w-7xl px-6 pb-24 pt-16">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_right,_rgba(139,92,246,0.32),_transparent_35%),linear-gradient(180deg,#110d20_0%,#0b0816_60%)] px-6 pb-14 pt-10 md:px-10">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mx-auto inline-flex rounded-full border border-violet-400/20 bg-violet-500/10 px-5 py-2 text-sm text-white/80">
                Now in beta — built for operations teams
              </div>
              <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
                Your supply chain.<br />Always.
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/60 md:text-2xl">
                Predict disruptions before they happen. Monitor every node, route, and risk factor in real time.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <PrimaryButton className="px-8 py-4 text-lg" onClick={() => navigate("/signup")}>
                  Build your chain free <ArrowRight className="h-5 w-5" />
                </PrimaryButton>
                <GhostButton dark className="px-8 py-4 text-lg" onClick={() => navigate("/signin")}>
                  <CirclePlay className="h-5 w-5" /> Sign in to dashboard
                </GhostButton>
              </div>
              <div className="mt-14 grid gap-8 border-t border-white/10 pt-8 text-center text-white/80 md:grid-cols-3">
                {[["500+", "operations teams"], ["98%", "prediction accuracy"], ["4.2T", "CO₂ tracked"]].map(([v, l]) => (
                  <div key={l}><div className="text-4xl font-semibold">{v}</div><div className="mt-2 text-lg text-white/45">{l}</div></div>
                ))}
              </div>
            </div>

            {/* Mini chain preview */}
            <div className="mt-14 rounded-[28px] border border-white/5 bg-black/15 px-4 py-12 md:px-10">
              <div className="relative mx-auto max-w-5xl">
                <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-violet-400/10" />
                <div className="grid gap-4 md:grid-cols-5">
                  {[["Supplier A", "Vietnam", "healthy", "supplier"], ["Factory B", "Chennai", "healthy", "factory"], ["Warehouse C", "Mumbai", "critical", "warehouse"], ["Logistics D", "Pan India", "healthy", "distribution"], ["Customer", "Retail", "healthy", "warehouse"]].map(([name, place, state, type], i) => (
                    <div key={name} className="relative">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 backdrop-blur">
                        <div className="flex items-start justify-between gap-3">
                          <span className={`rounded-lg border px-2 py-1 text-xs ${typeClasses[type] ?? "border-white/10 bg-white/5 text-white/70"}`}>
                            {["⛓", "🏭", "📦", "🧊", "🛒"][i]}
                          </span>
                          <span className={`h-2.5 w-2.5 rounded-full ${statusDot[state]}`} />
                        </div>
                        <div className="mt-4 text-lg font-medium">{name}</div>
                        <div className="mt-1 text-sm text-white/45">{place}</div>
                      </div>
                      {i === 2 && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-full border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-200">
                          High disruption risk — 74%
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section ref={n => { refsMap.current.problem = n; }} className="border-b border-white/5 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <div className="text-sm uppercase tracking-[0.4em] text-violet-300">The Problem</div>
            <h2 className="mx-auto mt-7 max-w-4xl text-5xl font-semibold tracking-tight">Supply chains break. Companies find out too late.</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {problemCards.map(card => (
              <div key={card.value} className={`rounded-[28px] border bg-white/[0.02] p-8 ${card.tone}`}>
                <div className="text-6xl font-semibold tracking-tight text-white">{card.value}</div>
                <div className="mt-4 max-w-xs text-2xl leading-9 text-white/70">{card.copy}</div>
                <div className="mt-10 text-base">{card.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section ref={n => { refsMap.current.how = n; }} className="border-b border-white/5 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <div className="text-sm uppercase tracking-[0.4em] text-violet-300">How It Works</div>
            <h2 className="mx-auto mt-7 max-w-4xl text-5xl font-semibold tracking-tight">From chaos to clarity in four steps.</h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {[
              ["Describe your chain", "Select your industry and add suppliers, factories, warehouses, and routes in minutes."],
              ["Connect your sensors", "Link IoT data, shipment APIs, or use our simulated data engine to bring your chain to life."],
              ["AI monitors everything", "Our prediction engine scores every node, cross-references live global risk signals, and detects anomalies."],
              ["Act before crisis hits", "Receive intelligent alerts with recommended actions before disruptions reach your operations."],
            ].map(([title, body], i) => (
              <div key={title} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-500 text-lg font-semibold shadow-[0_12px_40px_rgba(139,92,246,0.35)]">{i + 1}</div>
                <div className="mt-8 text-3xl font-medium">{title}</div>
                <p className="mt-4 text-lg leading-8 text-white/55">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section ref={n => { refsMap.current["use-cases"] = n; }} className="border-b border-white/5 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <div className="text-sm uppercase tracking-[0.4em] text-violet-300">Use Cases</div>
            <h2 className="mx-auto mt-7 max-w-4xl text-5xl font-semibold tracking-tight">Built for every industry.</h2>
          </div>
          <div className="mx-auto mt-10 flex w-full max-w-2xl rounded-full border border-white/10 bg-white/[0.03] p-2">
            {homeIndustries.map(tab => (
              <button key={tab} type="button" onClick={() => setHomeTab(tab)} className={`flex-1 rounded-full px-5 py-3 text-sm transition ${homeTab === tab ? "bg-violet-500 text-white" : "text-white/60 hover:text-white"}`}>{tab}</button>
            ))}
          </div>
          <div className="mt-10 grid rounded-[30px] border border-white/10 bg-white/[0.02] p-8 md:grid-cols-[1.3fr_0.7fr]">
            <div className="pr-6">
              <div className="max-w-xl text-4xl font-semibold tracking-tight">{selectedCase.title}</div>
              <p className="mt-8 text-lg leading-9 text-white/60">{selectedCase.body}</p>
            </div>
            <div className="mt-8 border-t border-white/10 pt-8 md:mt-0 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <div className="space-y-8">
                {selectedCase.metrics.map(([value, label]) => (
                  <div key={label}>
                    <div className="text-6xl font-semibold tracking-tight">{value}</div>
                    <div className="mt-2 text-sm uppercase tracking-[0.25em] text-violet-300">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section ref={n => { refsMap.current.impact = n; }} className="border-b border-white/5 px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <h2 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight">The only platform that tracks operational and environmental health simultaneously.</h2>
            <div className="mt-8 space-y-4 text-lg text-white/80">
              {["Carbon footprint tracked per shipment and route.", "ESG reporting data generated automatically.", "Green vs fast route comparison built in."].map(t => (
                <div key={t} className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10"><Check className="h-4 w-4" /></span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-white/[0.02] p-8 text-center">
            <div className="text-4xl font-semibold text-amber-400">47</div>
            <div className="text-sm text-white/50 mt-1">OPS SCORE — Moderate risk</div>
            <div className="text-4xl font-semibold text-emerald-400 mt-6">81</div>
            <div className="text-sm text-white/50 mt-1">ECO SCORE — Good standing</div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mt-20 max-w-3xl text-center">
            <h2 className="mx-auto mt-8 max-w-3xl text-5xl font-semibold tracking-tight">Stop reacting. Start predicting.</h2>
            <div className="mt-10 flex flex-col items-center gap-4 md:flex-row">
              <input value={waitlistEmail} onChange={e => setWaitlistEmail(e.target.value)} placeholder="Enter your work email" className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-lg text-white placeholder:text-white/30" />
              <PrimaryButton className="h-14 w-full justify-center px-8 text-lg md:w-auto" onClick={() => { setWaitlistEmail(""); }}>
                Join the waitlist <ArrowRight className="h-5 w-5" />
              </PrimaryButton>
            </div>
          </div>
          <footer className="mt-24 border-t border-white/5 pt-14">
            <div className="flex items-center justify-between text-sm text-white/35">
              <div>© 2026 ChainPulse. Built for the hackathon.</div>
              <div>Made with care by the ChainPulse team.</div>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
