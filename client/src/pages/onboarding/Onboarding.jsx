import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Grip, Link2, Minus, Plus, RotateCcw, Search, Trash2, WandSparkles } from "lucide-react";
import {
  industries, nodeLibrary, templateNodes, templateConnections,
  toneClasses, typeClasses, statusDot, PrimaryButton, GhostButton
} from "./shared";

const analysisChecks = [
  { text: "Mapping node dependencies and chain structure", time: "0.4s" },
  { text: "Identifying single points of failure", time: "1.2s" },
  { text: "Scoring each node by disruption risk", time: "0.8s" },
  { text: "Cross-referencing global industry benchmarks", time: "0.9s" },
  { text: "Checking geopolitical risk by node location", time: "0.7s" },
  { text: "Simulating cascade failure scenarios", time: "1.4s" },
  { text: "Calculating environmental impact per route", time: "0.6s" },
  { text: "Generating your disruption risk report", time: "0.5s" },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState(0);
  const [nodes, setNodes] = useState(templateNodes);
  const [connections, setConnections] = useState(templateConnections);
  const [selectedNodeId, setSelectedNodeId] = useState("warehouse");
  const [search, setSearch] = useState("");
  const [tool, setTool] = useState("select");
  const [zoom, setZoom] = useState(100);
  const [analysisIndex, setAnalysisIndex] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const timerRef = useRef(null);

  const selectedNode = nodes.find(n => n.id === selectedNodeId) ?? nodes[0];
  const filteredLibrary = useMemo(() => {
    const term = search.trim().toLowerCase();
    return term ? nodeLibrary.filter(i => i.label.toLowerCase().includes(term)) : nodeLibrary;
  }, [search]);

  const stats = useMemo(() => {
    const critical = nodes.filter(n => n.critical || n.status === "critical").length;
    const avgRisk = Math.round(nodes.reduce((s, n) => s + (n.status === "critical" ? 85 : n.status === "warning" ? 56 : 28), 0) / Math.max(1, nodes.length));
    return { critical, avgRisk, chainHealth: Math.max(35, 100 - avgRisk + 15), delayDays: Math.max(4, critical * 7) };
  }, [nodes]);

  const lines = useMemo(() =>
    connections.map(([fromId, toId]) => {
      const from = nodes.find(n => n.id === fromId);
      const to = nodes.find(n => n.id === toId);
      if (!from || !to) return null;
      return { key: `${fromId}-${toId}`, x1: from.position.x + 150, y1: from.position.y + 36, x2: to.position.x, y2: to.position.y + 36 };
    }).filter(Boolean),
    [connections, nodes]
  );

  // Run analysis animation on step 3
  useEffect(() => {
    if (step !== 3) { clearInterval(timerRef.current); return; }
    setAnalysisIndex(0);
    setAnalysisProgress(0);
    timerRef.current = setInterval(() => {
      setAnalysisIndex(prev => {
        const next = prev + 1;
        if (next >= analysisChecks.length) {
          clearInterval(timerRef.current);
          setTimeout(() => setStep(4), 800);
          return analysisChecks.length;
        }
        return next;
      });
      setAnalysisProgress(prev => Math.min(100, prev + 13));
    }, 900);
    return () => clearInterval(timerRef.current);
  }, [step]);

  const addNode = (item) => {
    const id = `${item.type}-${Date.now()}`;
    setNodes(prev => [...prev, { id, name: item.label, location: "New location", type: item.type, category: item.label, position: { x: 180 + prev.length * 45, y: 120 }, status: "healthy", inventoryBuffer: "7 days", transportMode: "Road freight", singleSource: false, critical: false }]);
  };

  const updateNode = (field, value) => setNodes(prev => prev.map(n => n.id === selectedNodeId ? { ...n, [field]: value } : n));

  const removeNode = () => {
    setNodes(prev => { const next = prev.filter(n => n.id !== selectedNodeId); setSelectedNodeId(next[0]?.id ?? ""); return next; });
    setConnections(prev => prev.filter(([f, t]) => f !== selectedNodeId && t !== selectedNodeId));
  };

  const steps = ["Industry", "Build Chain", "Analysing", "Risk Report"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/95 backdrop-blur px-6 py-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <span className="h-5 w-5 rounded-full bg-primary" /> ChainPulse
        </div>
        <div className="hidden items-center md:flex">
          {steps.map((s, i) => {
            const n = i + 1; const done = n < step; const active = n === step;
            return (
              <div key={s} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold ${done ? "border-emerald-500 bg-emerald-500 text-white" : active ? "border-violet-600 bg-violet-600 text-white" : "border-slate-300 bg-white text-slate-500"}`}>
                    {done ? "✓" : n}
                  </div>
                  <span className={`text-[10px] uppercase tracking-[0.18em] ${active ? "text-violet-700" : done ? "text-emerald-600" : "text-slate-400"}`}>{s}</span>
                </div>
                {i < steps.length - 1 && <div className={`mx-3 h-0.5 w-12 ${done ? "bg-emerald-500" : "bg-slate-300"}`} />}
              </div>
            );
          })}
        </div>
        <div className="flex gap-2">
          {step === 2 && <><GhostButton onClick={() => { setNodes(templateNodes); setConnections(templateConnections); }}>Use template</GhostButton><PrimaryButton onClick={() => setStep(3)}>Analyse my chain</PrimaryButton></>}
          {step === 4 && <GhostButton onClick={() => setStep(2)}><ArrowLeft className="h-4 w-4" /> Edit chain</GhostButton>}
        </div>
      </header>

      <main>
        {/* Step 1 — Industry */}
        {step === 1 && (
          <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-14">
            <div className="rounded-full bg-primary/10 border border-primary/20 px-4 py-1 text-sm font-medium text-primary">Step 1 of 4</div>
            <h1 className="mt-6 text-center text-4xl font-semibold tracking-tight">What industry are you in?</h1>
            <p className="mt-3 max-w-xl text-center text-base leading-7 text-muted-foreground">We'll customise your node library, risk benchmarks, and AI analysis based on your industry.</p>
            <div className="mt-10 grid w-full max-w-4xl gap-4 md:grid-cols-2 xl:grid-cols-3">
              {industries.map((ind, i) => (
                <button key={ind.name} type="button" onClick={() => setSelectedIndustry(i)} className={`rounded-xl border bg-card p-5 text-left shadow-sm transition hover:border-primary/50 ${i === selectedIndustry ? "border-2 border-primary bg-primary/5" : "border-border"}`}>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-2xl">{ind.icon}</span>
                    {i === selectedIndustry && <span className="rounded-full bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground">Selected</span>}
                  </div>
                  <div className="mt-3 text-base font-semibold">{ind.name}</div>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{ind.desc}</p>
                </button>
              ))}
            </div>
            <PrimaryButton className="mt-10 px-10 py-3 text-base" onClick={() => setStep(2)}>Continue</PrimaryButton>
          </section>
        )}

        {/* Step 2 — Builder Canvas */}
        {step === 2 && (
          <section className="flex h-[calc(100vh-73px)] min-h-[720px]">
            <aside className="w-72 shrink-0 overflow-y-auto border-r border-border bg-card p-4">
              <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground">
                <Search className="h-4 w-4" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search nodes..." className="w-full bg-transparent text-sm placeholder:text-muted-foreground" />
              </div>
              <div className="mt-6 space-y-2">
                <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Node Library</div>
                {filteredLibrary.map(item => (
                  <button key={`${item.type}-${item.label}`} type="button" onClick={() => addNode(item)} className="flex w-full items-center gap-3 rounded-lg border border-border bg-card px-3 py-2 text-left transition hover:bg-secondary">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-base ${toneClasses[item.tone]}`}>{item.icon}</div>
                    <div><div className="text-sm font-medium">{item.label}</div><div className="text-xs text-muted-foreground">{item.sub}</div></div>
                  </button>
                ))}
              </div>
            </aside>

            <div className="relative flex-1 overflow-hidden bg-secondary/20">
              {/* Toolbar */}
              <div className="absolute left-4 top-4 z-20 flex gap-2 rounded-lg border border-border bg-card p-2 shadow-sm">
                {[{ key: "select", icon: WandSparkles }, { key: "link", icon: Link2 }, { key: "pan", icon: Grip }, { key: "delete", icon: Trash2 }].map(({ key, icon: Icon }) => (
                  <button key={key} type="button" onClick={() => { setTool(key); if (key === "delete") removeNode(); }} className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${tool === key ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary"}`}>
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
              <div className="absolute right-4 top-4 z-20 rounded-lg border border-border bg-card px-4 py-2 text-sm text-muted-foreground shadow-sm">{nodes.length} nodes · {connections.length} connections</div>

              {/* Canvas */}
              <div className="absolute inset-0 overflow-auto p-10">
                <div className="relative h-[560px] min-w-[1120px] origin-top-left transition-transform duration-200" style={{ transform: `scale(${zoom / 100})` }}>
                  <svg className="pointer-events-none absolute inset-0 h-full w-full">
                    <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" /></marker></defs>
                    {lines.map(l => <line key={l.key} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />)}
                  </svg>
                  {nodes.map(node => (
                    <button key={node.id} type="button" onClick={() => setSelectedNodeId(node.id)} className={`absolute min-w-[150px] rounded-xl border-2 px-5 py-4 text-left shadow-sm transition ${typeClasses[node.type] ?? "bg-white border-slate-200"} ${node.id === selectedNodeId ? "ring-2 ring-violet-500 ring-offset-2" : ""}`} style={{ left: node.position.x, top: node.position.y }}>
                      <span className={`absolute right-3 top-3 h-2.5 w-2.5 rounded-full ${statusDot[node.status]}`} />
                      <div className="text-sm font-semibold">{node.name}</div>
                      <div className="mt-1 text-xs text-slate-500">{node.location}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Zoom */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 shadow-sm">
                <button type="button" onClick={() => setZoom(v => Math.max(60, v - 10))}><Minus className="h-4 w-4" /></button>
                <span>{zoom}%</span>
                <button type="button" onClick={() => setZoom(v => Math.min(140, v + 10))}><Plus className="h-4 w-4" /></button>
              </div>
            </div>

            {/* Right panel */}
            <aside className="w-80 shrink-0 overflow-y-auto border-l border-border bg-card p-5">
              {selectedNode ? (
                <>
                  <div className="text-lg font-semibold">{selectedNode.name}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{selectedNode.category}</div>
                  {[["Node name", "name"], ["Location", "location"]].map(([label, field]) => (
                    <div key={field} className="mt-5">
                      <div className="mb-2 text-sm text-muted-foreground">{label}</div>
                      <input className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" value={selectedNode[field]} onChange={e => updateNode(field, e.target.value)} />
                    </div>
                  ))}
                  <button type="button" onClick={removeNode} className="mt-6 w-full rounded-lg border border-destructive/40 px-4 py-2 text-sm font-medium text-destructive transition hover:bg-destructive/10">Remove node</button>
                </>
              ) : (
                <div className="rounded-xl border border-dashed border-border p-5 text-sm text-muted-foreground">Select a node to edit its properties.</div>
              )}
            </aside>
          </section>
        )}

        {/* Step 3 — Analysing */}
        {step === 3 && (
          <section className="mx-auto flex min-h-[720px] max-w-4xl flex-col items-center justify-center px-6 py-14">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary text-4xl text-primary-foreground">
              <div className="absolute -inset-3 rounded-full border-2 border-primary/20 animate-pulse" />🔗
            </div>
            <h2 className="mt-8 text-center text-3xl font-semibold">Analysing your supply chain</h2>
            <p className="mt-3 max-w-xl text-center text-base leading-7 text-muted-foreground">Our AI is reading every node, connection, and risk factor in your chain.</p>
            <div className="mt-10 w-full max-w-2xl rounded-2xl border border-border bg-card px-6 py-2 shadow-sm">
              {analysisChecks.map((item, i) => {
                const state = i < analysisIndex ? "done" : i === analysisIndex ? "active" : "pending";
                return (
                  <div key={item.text} className="flex items-center justify-between border-b border-border py-4 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${state === "done" ? "bg-emerald-500 text-white" : state === "active" ? "border-2 border-primary text-primary" : "border border-border text-transparent"}`}>
                        {state === "done" ? "✓" : state === "active" ? "↻" : "."}
                      </div>
                      <span className={`text-sm ${state === "active" ? "font-medium text-violet-700" : "text-slate-700"}`}>{item.text}</span>
                    </div>
                    <span className="text-sm text-slate-400">{state === "done" ? item.time : ""}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 w-full max-w-2xl">
              <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-violet-600 transition-all duration-500" style={{ width: `${analysisProgress}%` }} />
              </div>
              <div className="mt-2 text-right text-sm text-slate-500">{analysisProgress}%</div>
            </div>
          </section>
        )}

        {/* Step 4 — Report → Go to Dashboard */}
        {step === 4 && (
          <section className="flex min-h-[720px]">
            <aside className="w-72 shrink-0 border-r border-border bg-card p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Overall Chain Health</div>
              <div className="mt-5 flex justify-center">
                <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-[12px] border-slate-100">
                  <div className="absolute inset-0 rounded-full border-[12px] border-amber-400" style={{ clipPath: `inset(${100 - stats.chainHealth}% 0 0 0)` }} />
                  <div className="text-center"><div className="text-2xl font-semibold">{stats.chainHealth}</div><div className="text-[10px] text-slate-400">out of 100</div></div>
                </div>
              </div>
              <p className="mt-4 text-center text-sm leading-6 text-amber-600">Moderate-to-high risk. Upstream nodes need attention.</p>
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-200 pt-5">
                {[["Total nodes", nodes.length], ["Critical nodes", stats.critical, "red"], ["Avg risk score", `${stats.avgRisk}%`, "amber"], ["Est. delay", `${stats.delayDays} days`, "red"]].map(([label, value, tone]) => (
                  <div key={label}><div className="text-xs text-slate-400">{label}</div><div className={`mt-1 text-xl font-semibold ${tone === "red" ? "text-rose-500" : tone === "amber" ? "text-amber-500" : "text-slate-900"}`}>{value}</div></div>
                ))}
              </div>
            </aside>

            <div className="flex-1 bg-background px-8 py-7">
              <h2 className="text-3xl font-semibold tracking-tight">My {industries[selectedIndustry].name} Chain</h2>
              <div className="mt-2 text-sm text-muted-foreground">{nodes.length} nodes · {connections.length} connections · Built {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</div>
              <div className="mt-6 rounded-2xl border border-border bg-card p-5 text-sm leading-7 text-muted-foreground shadow-sm">
                Your supply chain shows concentration risk in the upstream supplier network. Applying the suggested fixes could improve overall chain health from {stats.chainHealth} to {Math.min(91, stats.chainHealth + 19)}.
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
                <div>
                  <div className="text-base font-medium">Analysis complete!</div>
                  <div className="text-sm text-slate-500">Your live dashboard is ready with simulated real-time data.</div>
                </div>
                <PrimaryButton className="px-8 py-3 text-base" onClick={() => navigate("/dashboard")}>
                  Open my Dashboard →
                </PrimaryButton>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
