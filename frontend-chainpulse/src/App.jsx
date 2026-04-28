import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CirclePlay,
  Download,
  Eye,
  EyeOff,
  Grip,
  Leaf,
  Link2,
  Mail,
  Minus,
  Play,
  Plus,
  RotateCcw,
  Search,
  Share2,
  Shield,
  Sparkles,
  Trash2,
  WandSparkles,
} from "lucide-react";

const industries = [
  { icon: "🏭", name: "Manufacturing", desc: "Raw materials to finished goods." },
  { icon: "💊", name: "Pharmaceuticals", desc: "Drug production and cold-chain coordination." },
  { icon: "🌾", name: "Food and Agriculture", desc: "Farm to shelf supply chains." },
  { icon: "🛒", name: "Retail and E-commerce", desc: "Inventory, fulfilment, and last-mile coverage." },
  { icon: "🚗", name: "Automotive", desc: "Parts, assembly, and dealer distribution." },
  { icon: "⚡", name: "Electronics", desc: "Components, assembly, and global sourcing." },
  { icon: "👕", name: "Textiles and Apparel", desc: "Fabric sourcing to retail distribution." },
  { icon: "❤️", name: "Healthcare", desc: "Medical devices and hospital supply planning." },
  { icon: "🔋", name: "Energy", desc: "Fuel, renewables, and grid distribution." },
  { icon: "🚛", name: "Logistics and 3PL", desc: "Third-party warehousing and transport networks." },
];

const nodeLibrary = [
  { type: "supplier", icon: "🚛", label: "Raw supplier", sub: "Primary source", tone: "purple" },
  { type: "supplier", icon: "🚛", label: "Secondary supplier", sub: "Backup source", tone: "purple" },
  { type: "factory", icon: "🏭", label: "Factory", sub: "Production unit", tone: "green" },
  { type: "quality", icon: "✅", label: "Quality control", sub: "Inspection", tone: "green" },
  { type: "packaging", icon: "📦", label: "Packaging", sub: "Final prep", tone: "green" },
  { type: "warehouse", icon: "🏪", label: "Regional warehouse", sub: "Storage hub", tone: "amber" },
  { type: "distribution", icon: "🏪", label: "Distribution centre", sub: "Dispatch", tone: "amber" },
];

const templateNodes = [
  {
    id: "supplier",
    name: "Supplier A",
    location: "Vietnam",
    type: "supplier",
    category: "Raw supplier",
    position: { x: 180, y: 220 },
    status: "healthy",
    inventoryBuffer: "14 days",
    transportMode: "Sea freight",
    singleSource: false,
    critical: false,
  },
  {
    id: "factory",
    name: "Factory B",
    location: "Chennai, India",
    type: "factory",
    category: "Factory",
    position: { x: 430, y: 220 },
    status: "healthy",
    inventoryBuffer: "10 days",
    transportMode: "Road freight",
    singleSource: false,
    critical: false,
  },
  {
    id: "warehouse",
    name: "Warehouse C",
    location: "Mumbai, India",
    type: "warehouse",
    category: "Regional warehouse",
    position: { x: 680, y: 220 },
    status: "critical",
    inventoryBuffer: "7 days",
    transportMode: "Road freight",
    singleSource: true,
    critical: true,
  },
  {
    id: "logistics",
    name: "Logistics D",
    location: "Pan India",
    type: "distribution",
    category: "Last-mile",
    position: { x: 930, y: 220 },
    status: "warning",
    inventoryBuffer: "5 days",
    transportMode: "Road freight",
    singleSource: false,
    critical: false,
  },
  {
    id: "quality",
    name: "Quality E",
    location: "Chennai, India",
    type: "quality",
    category: "Inspection",
    position: { x: 430, y: 360 },
    status: "healthy",
    inventoryBuffer: "3 days",
    transportMode: "Internal",
    singleSource: false,
    critical: false,
  },
];

const templateConnections = [
  ["supplier", "factory"],
  ["factory", "warehouse"],
  ["warehouse", "logistics"],
  ["factory", "quality"],
];

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

const jumpSections = [
  "Node risk breakdown",
  "Top disruption predictions",
  "Cascade impact map",
  "Fix recommendations",
  "Environmental impact",
];

const toneClasses = {
  purple: "bg-violet-100 text-violet-700",
  green: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
};

const typeClasses = {
  supplier: "bg-violet-100 border-violet-200 text-violet-800",
  factory: "bg-emerald-100 border-emerald-200 text-emerald-800",
  warehouse: "bg-amber-100 border-amber-200 text-amber-800",
  distribution: "bg-sky-100 border-sky-200 text-sky-800",
  quality: "bg-emerald-100 border-emerald-200 text-emerald-800",
};

const statusDot = {
  healthy: "bg-emerald-500",
  warning: "bg-amber-500",
  critical: "bg-rose-500",
};

const problemCards = [
  {
    value: "$4T",
    copy: "lost annually to supply chain disruptions.",
    note: "Growing 12% year over year.",
    tone: "border-rose-400/70 text-rose-300",
  },
  {
    value: "3 weeks",
    copy: "average time to detect a disruption.",
    note: "Most teams rely on manual reports.",
    tone: "border-amber-400/70 text-amber-300",
  },
  {
    value: "72%",
    copy: "of companies have zero real-time visibility.",
    note: "Across all major industries.",
    tone: "border-violet-400/70 text-violet-300",
  },
];

const featureCards = [
  {
    title: "Live Chain Map",
    body: "Visualize your entire supply network in an interactive, real-time map.",
    size: "large",
  },
  {
    title: "Disruption Predictor",
    body: "AI forecasting model predicts failures up to 90 days out.",
    size: "tall",
  },
  {
    title: "IoT Anomaly",
    body: "Connect sensor data for real-time fault alerts.",
    size: "tall",
  },
  {
    title: "Dual Health Score",
    body: "Track operational and eco impact together.",
    size: "small",
  },
  {
    title: "AI Co-Pilot",
    body: "Chat with your supply chain. Ask for risk summaries, recommendations, and deep-dives.",
    size: "wide",
  },
];

const useCases = {
  Manufacturing: {
    title: "Automotive parts shortage — detected 3 weeks early.",
    body:
      "A major European auto manufacturer was relying on quarterly supplier risk reports. A tier-2 supplier in Vietnam began showing instability signals in labor force data, but operations was unaware. ChainPulse flagged the line risk 21 days before shutdown and recommended an approved alternative supplier in Thailand.",
    metrics: [
      ["21 days", "early warning"],
      ["0 hours", "downtime"],
      ["₹4.2Cr", "savings"],
    ],
  },
  Pharmaceuticals: {
    title: "Cold-chain excursion stopped before product loss.",
    body:
      "ChainPulse connected sensor feeds with shipment APIs and predicted a refrigeration failure on an insulin route. The operations team rerouted inventory before temperature thresholds were breached, preventing spoilage and compliance exposure.",
    metrics: [
      ["8 hours", "faster response"],
      ["0 batches", "discarded"],
      ["99.4%", "route integrity"],
    ],
  },
  "Retail & E-commerce": {
    title: "Peak season warehouse bottleneck avoided in real time.",
    body:
      "Demand spiked across two metro regions and one fulfilment center drifted toward overload. ChainPulse simulated cascade impact, rebalanced routes, and helped the team protect next-day delivery targets without emergency shipping costs.",
    metrics: [
      ["31%", "faster reroute"],
      ["14%", "lower expedite spend"],
      ["96%", "SLA hit rate"],
    ],
  },
};

const homeIndustries = ["Manufacturing", "Pharmaceuticals", "Retail & E-commerce"];

function App() {
  const [route, setRoute] = useState("home");
  const [page, setPage] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState(0);
  const [nodes, setNodes] = useState(templateNodes);
  const [connections, setConnections] = useState(templateConnections);
  const [selectedNodeId, setSelectedNodeId] = useState("warehouse");
  const [search, setSearch] = useState("");
  const [tool, setTool] = useState("select");
  const [zoom, setZoom] = useState(100);
  const [toast, setToast] = useState("");
  const [analysisIndex, setAnalysisIndex] = useState(3);
  const [analysisProgress, setAnalysisProgress] = useState(62);
  const [activeJump, setActiveJump] = useState(jumpSections[0]);
  const [homeTab, setHomeTab] = useState(homeIndustries[0]);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [authMode, setAuthMode] = useState("signin");
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const analysisTimerRef = useRef(null);
  const sectionRefs = useRef({});

  const selectedNode = nodes.find((node) => node.id === selectedNodeId) ?? nodes[0];
  const filteredLibrary = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return nodeLibrary;
    return nodeLibrary.filter((item) => item.label.toLowerCase().includes(term) || item.sub.toLowerCase().includes(term));
  }, [search]);

  const stats = useMemo(() => {
    const criticalNodes = nodes.filter((node) => node.critical || node.status === "critical").length;
    const avgRisk = Math.round(
      nodes.reduce((sum, node) => {
        if (node.status === "critical") return sum + 85;
        if (node.status === "warning") return sum + 56;
        return sum + 28;
      }, 0) / Math.max(1, nodes.length),
    );
    return {
      criticalNodes,
      avgRisk,
      chainHealth: Math.max(35, 100 - avgRisk + 15),
      delayDays: Math.max(4, criticalNodes * 7),
    };
  }, [nodes]);

  const lines = useMemo(
    () =>
      connections
        .map(([fromId, toId]) => {
          const from = nodes.find((node) => node.id === fromId);
          const to = nodes.find((node) => node.id === toId);
          if (!from || !to) return null;
          return {
            key: `${fromId}-${toId}`,
            x1: from.position.x + 150,
            y1: from.position.y + 36,
            x2: to.position.x,
            y2: to.position.y + 36,
          };
        })
        .filter(Boolean),
    [connections, nodes],
  );

  const riskBreakdown = useMemo(
    () =>
      nodes
        .map((node) => {
          const score = node.status === "critical" ? 85 : node.status === "warning" ? 68 : 28;
          const severity = score >= 80 ? "Critical" : score >= 60 ? "High" : score >= 40 ? "Medium" : "Low";
          return { ...node, score, severity };
        })
        .sort((a, b) => b.score - a.score),
    [nodes],
  );

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (route !== "builder" || page !== 3) {
      window.clearInterval(analysisTimerRef.current);
      return undefined;
    }

    setAnalysisIndex(3);
    setAnalysisProgress(62);
    analysisTimerRef.current = window.setInterval(() => {
      setAnalysisIndex((prev) => {
        const next = prev + 1;
        if (next >= analysisChecks.length) {
          window.clearInterval(analysisTimerRef.current);
          window.setTimeout(() => setPage(4), 700);
          return analysisChecks.length;
        }
        return next;
      });
      setAnalysisProgress((prev) => Math.min(100, prev + 8));
    }, 900);

    return () => window.clearInterval(analysisTimerRef.current);
  }, [page, route]);

  function navigate(nextRoute, options = {}) {
    setRoute(nextRoute);
    if (nextRoute === "signin" || nextRoute === "signup") {
      setAuthMode(nextRoute);
    }
    if (nextRoute === "builder" && options.step) {
      setPage(options.step);
    }
    if (nextRoute === "home" && options.scrollTo) {
      window.setTimeout(() => {
        sectionRefs.current[options.scrollTo]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function resetChain() {
    setNodes(templateNodes);
    setConnections(templateConnections);
    setSelectedNodeId("warehouse");
    setZoom(100);
    setTool("select");
    setToast("Chain template restored.");
  }

  function clearCanvas() {
    setNodes([]);
    setConnections([]);
    setSelectedNodeId("");
    setToast("Canvas cleared.");
  }

  function addLibraryNode(item) {
    const id = `${item.type}-${Date.now()}`;
    const nextNode = {
      id,
      name: item.label,
      location: "New location",
      type: item.type,
      category: item.label,
      position: { x: 180 + nodes.length * 45, y: nodes.length > 4 ? 360 : 120 },
      status: item.type === "warehouse" ? "warning" : "healthy",
      inventoryBuffer: "7 days",
      transportMode: "Road freight",
      singleSource: false,
      critical: false,
    };
    setNodes((prev) => [...prev, nextNode]);
    if (nodes.length > 0) {
      setConnections((prev) => [...prev, [nodes[nodes.length - 1].id, id]]);
    }
    setSelectedNodeId(id);
    setToast(`${item.label} added to the chain.`);
  }

  function updateNode(field, value) {
    setNodes((prev) => prev.map((node) => (node.id === selectedNodeId ? { ...node, [field]: value } : node)));
  }

  function toggleRisk(field) {
    setNodes((prev) =>
      prev.map((node) => {
        if (node.id !== selectedNodeId) return node;
        const nextValue = !node[field];
        const nextStatus =
          field === "critical"
            ? nextValue
              ? "critical"
              : node.singleSource
                ? "warning"
                : "healthy"
            : nextValue
              ? "warning"
              : node.critical
                ? "critical"
                : "healthy";
        return { ...node, [field]: nextValue, status: nextStatus };
      }),
    );
  }

  function removeSelectedNode() {
    if (!selectedNodeId) return;
    const nextNodes = nodes.filter((node) => node.id !== selectedNodeId);
    setNodes(nextNodes);
    setConnections((prev) => prev.filter(([from, to]) => from !== selectedNodeId && to !== selectedNodeId));
    setSelectedNodeId(nextNodes[0]?.id ?? "");
    setToast("Selected node removed.");
  }

  function shareReport() {
    const shareUrl = `https://chainpulse.app/report/${selectedIndustry + 1}-${nodes.length}-${stats.avgRisk}`;
    navigator.clipboard?.writeText(shareUrl);
    setToast("Report link copied to clipboard.");
  }

  function downloadReport() {
    window.print();
  }

  function startNewChain() {
    resetChain();
    setSelectedIndustry(0);
    setPage(1);
    navigate("home");
  }

  function submitWaitlist() {
    if (!waitlistEmail.trim()) {
      setToast("Enter your work email first.");
      return;
    }
    setToast("You’re on the ChainPulse waitlist.");
    setWaitlistEmail("");
  }

  function submitAuth(event) {
    event.preventDefault();
    if (!authForm.email.trim() || !authForm.password.trim()) {
      setToast("Email and password are required.");
      return;
    }
    if (authMode === "signup" && !authForm.name.trim()) {
      setToast("Please add your full name.");
      return;
    }
    setToast(authMode === "signin" ? "Signed in. Opening your chain builder." : "Account created. Let’s build your chain.");
    setPage(1);
    navigate("builder", { step: 1 });
  }

  function updateAuthField(field, value) {
    setAuthForm((prev) => ({ ...prev, [field]: value }));
  }

  const builderTopRight = {
    1: (
      <>
        <GhostButton dark onClick={() => navigate("signin")}>Sign in</GhostButton>
        <PrimaryButton onClick={() => navigate("signup")}>Get started free</PrimaryButton>
      </>
    ),
    2: (
      <>
        <GhostButton onClick={clearCanvas}>Clear canvas</GhostButton>
        <GhostButton onClick={resetChain}>Use template</GhostButton>
        <PrimaryButton onClick={() => setPage(3)}>Analyse my chain</PrimaryButton>
      </>
    ),
    3: (
      <GhostButton onClick={() => setPage(2)}>
        <ArrowLeft className="h-4 w-4" />
        Edit my chain
      </GhostButton>
    ),
    4: (
      <GhostButton onClick={() => setPage(2)}>
        <ArrowLeft className="h-4 w-4" />
        Edit chain
      </GhostButton>
    ),
  };

  return (
    <div className={route === "builder" ? "min-h-screen bg-slate-100 text-slate-900" : "min-h-screen bg-[#0b0816] text-white"}>
      {route === "home" && (
        <LandingPage
          homeTab={homeTab}
          navigate={navigate}
          refsMap={sectionRefs}
          selectedCase={useCases[homeTab]}
          setHomeTab={setHomeTab}
          submitWaitlist={submitWaitlist}
          waitlistEmail={waitlistEmail}
          setWaitlistEmail={setWaitlistEmail}
        />
      )}

      {(route === "signin" || route === "signup") && (
        <AuthPage
          authForm={authForm}
          authMode={authMode}
          navigate={navigate}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
          submitAuth={submitAuth}
          updateAuthField={updateAuthField}
        />
      )}

      {route === "builder" && (
        <>
          <BuilderTopBar page={page} setPage={setPage} topRight={builderTopRight[page]} navigate={navigate} />
          <main>
            {page === 1 && (
              <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-14">
                <div className="rounded-full bg-violet-100 px-4 py-1 text-sm font-medium text-violet-700">Step 1 of 4</div>
                <h1 className="mt-6 text-center text-4xl font-semibold tracking-tight">What industry are you in?</h1>
                <p className="mt-3 max-w-xl text-center text-base leading-7 text-slate-500">
                  We&apos;ll customise your node library, risk benchmarks, and AI analysis based on your industry.
                </p>
                <div className="mt-10 grid w-full max-w-4xl gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {industries.map((industry, index) => {
                    const active = index === selectedIndustry;
                    return (
                      <button
                        key={industry.name}
                        type="button"
                        onClick={() => setSelectedIndustry(index)}
                        className={`rounded-xl border bg-white p-5 text-left shadow-sm transition hover:border-violet-400 ${
                          active ? "border-2 border-violet-600 bg-violet-50" : "border-slate-200"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <span className="text-2xl">{industry.icon}</span>
                          {active && <span className="rounded-full bg-violet-600 px-2 py-1 text-xs font-semibold text-white">Selected</span>}
                        </div>
                        <div className="mt-3 text-base font-semibold">{industry.name}</div>
                        <p className="mt-1 text-sm leading-6 text-slate-500">{industry.desc}</p>
                      </button>
                    );
                  })}
                </div>
                <PrimaryButton className="mt-10 px-10 py-3 text-base" onClick={() => setPage(2)}>
                  Continue
                </PrimaryButton>
              </section>
            )}

            {page === 2 && (
              <section className="flex h-[calc(100vh-73px)] min-h-[720px]">
                <aside className="scrollbar-thin w-72 shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-500">
                    <Search className="h-4 w-4" />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search nodes..."
                      className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400"
                    />
                  </div>

                  <div className="mt-6 space-y-6">
                    <div>
                      <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Node Library</div>
                      <div className="space-y-2">
                        {filteredLibrary.map((item) => (
                          <button
                            key={`${item.type}-${item.label}`}
                            type="button"
                            onClick={() => addLibraryNode(item)}
                            className="flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-left transition hover:bg-slate-50"
                          >
                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-base ${toneClasses[item.tone]}`}>{item.icon}</div>
                            <div>
                              <div className="text-sm font-medium text-slate-800">{item.label}</div>
                              <div className="text-xs text-slate-500">{item.sub}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Status Legend</div>
                      <LegendItem color="bg-emerald-500" label="Healthy node" />
                      <LegendItem color="bg-amber-500" label="Needs attention" />
                      <LegendItem color="bg-rose-500" label="Critical / no backup" />
                    </div>
                  </div>
                </aside>

                <div className="relative flex-1 overflow-hidden bg-slate-50">
                  <div className="grid-dots absolute inset-0" />

                  <div className="absolute left-4 top-4 z-20 flex gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-panel">
                    {[
                      { key: "select", icon: WandSparkles },
                      { key: "link", icon: Link2 },
                      { key: "pan", icon: Grip },
                      { key: "delete", icon: Trash2 },
                    ].map(({ key, icon: Icon }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setTool(key);
                          if (key === "delete") removeSelectedNode();
                        }}
                        className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                          tool === key ? "bg-violet-100 text-violet-700" : "text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </button>
                    ))}
                  </div>

                  <div className="absolute right-4 top-4 z-20 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 shadow-panel">
                    {nodes.length} nodes · {connections.length} connections
                  </div>

                  <div className="absolute inset-0 overflow-auto p-10">
                    <div
                      className="relative h-[560px] min-w-[1120px] origin-top-left transition-transform duration-200"
                      style={{ transform: `scale(${zoom / 100})` }}
                    >
                      <svg className="pointer-events-none absolute inset-0 h-full w-full">
                        <defs>
                          <marker id="arrow-head" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                            <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8" />
                          </marker>
                        </defs>
                        {lines.map((line) => (
                          <line
                            key={line.key}
                            x1={line.x1}
                            y1={line.y1}
                            x2={line.x2}
                            y2={line.y2}
                            stroke="#94a3b8"
                            strokeWidth="2"
                            markerEnd="url(#arrow-head)"
                          />
                        ))}
                      </svg>

                      {nodes.map((node) => {
                        const isSelected = node.id === selectedNodeId;
                        return (
                          <button
                            key={node.id}
                            type="button"
                            onClick={() => setSelectedNodeId(node.id)}
                            className={`absolute min-w-[150px] rounded-xl border-2 px-5 py-4 text-left shadow-sm transition ${
                              typeClasses[node.type] ?? "bg-white border-slate-200"
                            } ${isSelected ? "ring-2 ring-violet-500 ring-offset-2" : ""}`}
                            style={{ left: node.position.x, top: node.position.y }}
                          >
                            <span className={`absolute right-3 top-3 h-2.5 w-2.5 rounded-full ${statusDot[node.status]}`} />
                            <div className="text-sm font-semibold">{node.name}</div>
                            <div className="mt-1 text-xs text-slate-500">{node.location}</div>
                            {node.critical && (
                              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-rose-500 px-3 py-1 text-[10px] font-semibold text-white">
                                Critical node
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-violet-700 shadow-panel">
                    Click a library item to add it on canvas, then select a node to edit its risk settings.
                  </div>

                  <div className="absolute bottom-4 right-4 z-20 flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 shadow-panel">
                    <button type="button" onClick={() => setZoom((value) => Math.max(60, value - 10))}>
                      <Minus className="h-4 w-4" />
                    </button>
                    <span>{zoom}%</span>
                    <button type="button" onClick={() => setZoom((value) => Math.min(140, value + 10))}>
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <aside className="scrollbar-thin w-80 shrink-0 overflow-y-auto border-l border-slate-200 bg-white p-5">
                  {selectedNode ? (
                    <>
                      <div className="text-lg font-semibold">{selectedNode.name}</div>
                      <div className="mt-1 text-sm text-slate-500">{selectedNode.category}</div>

                      <Field label="Node name">
                        <input
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                          value={selectedNode.name}
                          onChange={(event) => updateNode("name", event.target.value)}
                        />
                      </Field>
                      <Field label="Location">
                        <input
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                          value={selectedNode.location}
                          onChange={(event) => updateNode("location", event.target.value)}
                        />
                      </Field>
                      <Field label="Inventory buffer">
                        <select
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                          value={selectedNode.inventoryBuffer}
                          onChange={(event) => updateNode("inventoryBuffer", event.target.value)}
                        >
                          <option>3 days</option>
                          <option>7 days</option>
                          <option>10 days</option>
                          <option>14 days</option>
                        </select>
                      </Field>
                      <Field label="Transport mode">
                        <select
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                          value={selectedNode.transportMode}
                          onChange={(event) => updateNode("transportMode", event.target.value)}
                        >
                          <option>Road freight</option>
                          <option>Air freight</option>
                          <option>Sea freight</option>
                          <option>Rail</option>
                          <option>Internal</option>
                        </select>
                      </Field>

                      <div className="mt-6 border-t border-slate-200 pt-5">
                        <div className="text-sm font-semibold">Risk settings</div>
                        <ToggleRow
                          title="Single source only"
                          subtitle="No backup supplier"
                          enabled={selectedNode.singleSource}
                          onToggle={() => toggleRisk("singleSource")}
                        />
                        <ToggleRow
                          title="Mark as critical node"
                          subtitle="Increases risk weight"
                          enabled={selectedNode.critical}
                          onToggle={() => toggleRisk("critical")}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={removeSelectedNode}
                        className="mt-6 w-full rounded-lg border border-rose-300 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                      >
                        Remove node
                      </button>
                    </>
                  ) : (
                    <div className="rounded-xl border border-dashed border-slate-300 p-5 text-sm text-slate-500">
                      No node selected. Add a node from the library or restore the template.
                    </div>
                  )}
                </aside>
              </section>
            )}

            {page === 3 && (
              <section className="mx-auto flex min-h-[720px] max-w-4xl flex-col items-center justify-center px-6 py-14">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-violet-600 text-4xl text-white">
                  <div className="absolute -inset-3 rounded-full border-2 border-violet-100" />
                  🔗
                </div>
                <h2 className="mt-8 text-center text-3xl font-semibold">Analysing your supply chain</h2>
                <p className="mt-3 max-w-xl text-center text-base leading-7 text-slate-500">
                  Our AI is reading every node, connection, and risk factor in your chain.
                </p>

                <div className="mt-10 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white px-6 py-2 shadow-sm">
                  {analysisChecks.map((item, index) => {
                    const state = index < analysisIndex ? "done" : index === analysisIndex ? "active" : "pending";
                    return (
                      <div key={item.text} className="flex items-center justify-between border-b border-slate-100 py-4 last:border-b-0">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                              state === "done"
                                ? "bg-emerald-500 text-white"
                                : state === "active"
                                  ? "border-2 border-violet-500 text-violet-600"
                                  : "border border-slate-300 text-transparent"
                            }`}
                          >
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

                <div className="mt-8 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-700">Early Finding</div>
                  <div className="mt-3 text-sm leading-7 text-slate-700">
                    {nodes.filter((node) => node.singleSource).length} of your {nodes.length} nodes have no backup supplier, which is
                    increasing cascade risk across the chain.
                  </div>
                </div>
              </section>
            )}

            {page === 4 && (
              <section className="flex min-h-[720px]">
                <aside className="w-72 shrink-0 border-r border-slate-200 bg-white p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Overall Chain Health</div>
                  <div className="mt-5 flex justify-center">
                    <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-[12px] border-slate-100">
                      <div
                        className="absolute inset-0 rounded-full border-[12px] border-amber-400"
                        style={{ clipPath: `inset(${100 - stats.chainHealth}% 0 0 0)` }}
                      />
                      <div className="text-center">
                        <div className="text-2xl font-semibold">{stats.chainHealth}</div>
                        <div className="text-[10px] text-slate-400">out of 100</div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-center text-sm leading-6 text-amber-600">
                    Moderate-to-high risk. Upstream nodes need immediate attention.
                  </p>

                  <div className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Jump to section</div>
                  <div className="mt-3 space-y-1">
                    {jumpSections.map((section) => (
                      <button
                        key={section}
                        type="button"
                        onClick={() => setActiveJump(section)}
                        className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                          activeJump === section ? "bg-violet-100 font-medium text-violet-700" : "text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        {section}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-200 pt-5">
                    <StatBox label="Total nodes" value={nodes.length} />
                    <StatBox label="Critical nodes" value={stats.criticalNodes} tone="red" />
                    <StatBox label="Avg risk score" value={`${stats.avgRisk}%`} tone="amber" />
                    <StatBox label="Est. delay" value={`${stats.delayDays} days`} tone="red" />
                  </div>
                </aside>

                <div className="flex-1 bg-slate-50 px-8 py-7">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-semibold tracking-tight">My Manufacturing Chain</h2>
                      <div className="mt-2 text-sm text-slate-500">
                        {industries[selectedIndustry].name} · Built 28 April 2026
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">Moderate risk</span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs text-slate-500">
                        {nodes.length} nodes · {connections.length} connections
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-600 shadow-sm">
                    Your supply chain shows significant concentration risk in the upstream supplier network.{" "}
                    {riskBreakdown[0]?.name ?? "Warehouse C"} is currently the highest-risk node based on backup coverage, transport
                    dependence, and route concentration. Applying the suggested fixes could improve your overall chain health from{" "}
                    {stats.chainHealth} to {Math.min(91, stats.chainHealth + 19)}.
                  </div>

                  <div className="mt-8 text-xl font-semibold">{activeJump}</div>
                  <div className="mt-1 text-sm text-slate-500">All nodes ranked by disruption likelihood.</div>

                  <div className="mt-5 space-y-3">
                    {riskBreakdown.map((node) => (
                      <RiskCard key={node.id} node={node} />
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
                    <div>
                      <div className="text-base font-medium">Satisfied with your analysis?</div>
                      <div className="text-sm text-slate-500">Share or save this report.</div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <GhostButton onClick={shareReport}>
                        <Share2 className="h-4 w-4" />
                        Share report link
                      </GhostButton>
                      <GhostButton onClick={startNewChain}>
                        <RotateCcw className="h-4 w-4" />
                        Start a new chain
                      </GhostButton>
                      <PrimaryButton onClick={downloadReport}>
                        <Download className="h-4 w-4" />
                        Download PDF report
                      </PrimaryButton>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </main>
        </>
      )}

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-sm text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

function LandingPage({ homeTab, navigate, refsMap, selectedCase, setHomeTab, submitWaitlist, waitlistEmail, setWaitlistEmail }) {
  const navItems = [
    ["How it Works", "how"],
    ["Features", "features"],
    ["Use Cases", "use-cases"],
    ["Impact", "impact"],
    ["About", "footer"],
  ];

  return (
    <div className="bg-[#0b0816] text-white">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0b0816]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button type="button" onClick={() => navigate("home")} className="flex items-center gap-3 text-xl font-medium">
            <span className="h-4 w-4 rounded-full bg-white shadow-[0_0_30px_rgba(167,139,250,0.7)]" />
            ChainPulse
          </button>
          <nav className="hidden items-center gap-9 text-sm text-white/70 md:flex">
            {navItems.map(([label, key], index) => (
              <button
                key={label}
                type="button"
                onClick={() => refsMap.current[key]?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className={`pb-1 transition hover:text-white ${index === 0 ? "border-b border-violet-400 text-white" : ""}`}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <GhostButton dark onClick={() => navigate("signin")}>Sign in</GhostButton>
            <PrimaryButton onClick={() => navigate("signup")}>Get started free <ArrowRight className="h-4 w-4" /></PrimaryButton>
          </div>
        </div>
      </header>

      <section className="overflow-hidden border-b border-white/5">
        <div className="mx-auto grid max-w-7xl px-6 pb-24 pt-16">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_right,_rgba(139,92,246,0.32),_transparent_35%),linear-gradient(180deg,#110d20_0%,#0b0816_60%,#0b0816_100%)] px-6 pb-14 pt-10 md:px-10">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mx-auto inline-flex rounded-full border border-violet-400/20 bg-violet-500/10 px-5 py-2 text-sm text-white/80">
                Now in beta — built for operations teams
              </div>
              <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
                Your supply chain.
                <br />
                Always.
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/60 md:text-2xl">
                Predict disruptions before they happen. Monitor every node, route, and risk factor in real time.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <PrimaryButton className="px-8 py-4 text-lg" onClick={() => navigate("signup")}>
                  Build your chain free
                  <ArrowRight className="h-5 w-5" />
                </PrimaryButton>
                <GhostButton dark className="px-8 py-4 text-lg" onClick={() => refsMap.current.demo?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                  <CirclePlay className="h-5 w-5" />
                  Watch 90-second demo
                </GhostButton>
              </div>
              <div className="mt-14 grid gap-8 border-t border-white/10 pt-8 text-center text-white/80 md:grid-cols-3">
                <HeroStat value="500+" label="operations teams" />
                <HeroStat value="98%" label="prediction accuracy" />
                <HeroStat value="4.2T" label="CO₂ tracked" />
              </div>
            </div>

            <div className="mt-14 rounded-[28px] border border-white/5 bg-black/15 px-4 py-12 md:px-10">
              <div className="relative mx-auto max-w-5xl">
                <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-violet-400/10" />
                <div className="grid gap-4 md:grid-cols-5">
                  {[
                    ["Supplier A", "Vietnam", "healthy", "supplier"],
                    ["Factory B", "Chennai", "healthy", "factory"],
                    ["Warehouse C", "Mumbai", "critical", "warehouse"],
                    ["Logistics D", "Pan India", "healthy", "distribution"],
                    ["Customer", "Retail", "healthy", "warehouse"],
                  ].map(([name, place, state, type], index) => (
                    <div key={name} className="relative">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 backdrop-blur">
                        <div className="flex items-start justify-between gap-3">
                          <span className={`rounded-lg border px-2 py-1 text-xs ${typeClasses[type] ?? "border-white/10 bg-white/5 text-white/70"}`}>
                            {name === "Supplier A" ? "⛓" : name === "Factory B" ? "🏭" : name === "Warehouse C" ? "📦" : name === "Logistics D" ? "🧊" : "🛒"}
                          </span>
                          <span className={`h-2.5 w-2.5 rounded-full ${statusDot[state]}`} />
                        </div>
                        <div className="mt-4 text-lg font-medium">{name}</div>
                        <div className="mt-1 text-sm text-white/45">{place}</div>
                      </div>
                      {index === 2 && (
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

      <section ref={(node) => { refsMap.current.problem = node; }} className="border-b border-white/5 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="The Problem" title="Supply chains break. Companies find out too late." body="By the time a disruption appears on a report, it has already cost you weeks and millions." />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {problemCards.map((card) => (
              <div key={card.value} className={`rounded-[28px] border bg-white/[0.02] p-8 ${card.tone}`}>
                <div className="text-6xl font-semibold tracking-tight text-white">{card.value}</div>
                <div className="mt-4 max-w-xs text-2xl leading-9 text-white/70">{card.copy}</div>
                <div className="mt-10 text-base">{card.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={(node) => { refsMap.current.how = node; }} className="border-b border-white/5 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="How It Works" title="From chaos to clarity in four steps." />
          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {[
              ["Describe your chain", "Select your industry and drag nodes onto the canvas. Add suppliers, factories, warehouses, and routes in minutes."],
              ["Connect your sensors", "Link IoT data, shipment APIs, or use our simulated data engine to bring your chain to life instantly."],
              ["AI monitors everything", "Our prediction engine scores every node, cross-references live global risk signals, and detects anomalies in real time."],
              ["Act before crisis hits", "Receive intelligent alerts with recommended actions before disruptions reach your operations."],
            ].map(([title, body], index) => (
              <div key={title} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-500 text-lg font-semibold shadow-[0_12px_40px_rgba(139,92,246,0.35)]">
                  {index + 1}
                </div>
                <div className="mt-8 text-3xl font-medium">{title}</div>
                <p className="mt-4 text-lg leading-8 text-white/55">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={(node) => { refsMap.current.features = node; }} className="border-b border-white/5 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Core Features" title="Everything your operations team needs." />
          <div className="mt-16 grid gap-6 md:grid-cols-4">
            {featureCards.map((card) => (
              <FeatureCard key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section ref={(node) => { refsMap.current.impact = node; }} className="border-b border-white/5 px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <h2 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
              The only platform that tracks operational health and environmental impact simultaneously.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
              Every decision in your supply chain has two consequences — operational and environmental. ChainPulse scores both in real
              time so you never have to choose between efficiency and responsibility.
            </p>
            <div className="mt-8 space-y-4 text-lg text-white/80">
              <CheckLine text="Carbon footprint tracked per shipment and route." />
              <CheckLine text="ESG reporting data generated automatically." />
              <CheckLine text="Green vs fast route comparison built in." />
            </div>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-white/[0.02] p-8">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <ScoreRing value={47} label="OPS SCORE" color="#fbbf24" badge="Moderate risk" badgeTone="bg-amber-500/15 text-amber-300" />
              <ScoreRing value={81} label="ECO SCORE" color="#4ade80" badge="Good standing" badgeTone="bg-emerald-500/15 text-emerald-300" />
            </div>
          </div>
        </div>
      </section>

      <section ref={(node) => { refsMap.current["use-cases"] = node; }} className="border-b border-white/5 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHeading eyebrow="Use Cases" title="Built for every industry." />
          <div className="mx-auto mt-10 flex w-full max-w-2xl rounded-full border border-white/10 bg-white/[0.03] p-2">
            {homeIndustries.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setHomeTab(tab)}
                className={`flex-1 rounded-full px-5 py-3 text-sm transition ${homeTab === tab ? "bg-violet-500 text-white" : "text-white/60 hover:text-white"}`}
              >
                {tab}
              </button>
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

      <section ref={(node) => { refsMap.current.demo = node; }} className="border-b border-white/5 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHeading eyebrow="See It Live" title="Watch ChainPulse catch a disruption in real time." body="Click play to see the 90-second Cold Chain Crisis scenario — from disruption to resolution." />
          <button
            type="button"
            onClick={() => setHomeTab("Pharmaceuticals")}
            className="mt-14 w-full rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(31,17,58,0.98),rgba(8,40,54,0.55))] p-6 text-left"
          >
            <div className="grid gap-4 md:grid-cols-[auto_1fr_auto]">
              <span className="rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">Live scenario</span>
              <div className="text-right text-xs uppercase tracking-[0.2em] text-white/70 md:text-left">AI prediction</div>
            </div>
            <div className="flex min-h-[420px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-white text-violet-600 shadow-[0_18px_70px_rgba(255,255,255,0.18)]">
                  <Play className="ml-1 h-10 w-10 fill-current" />
                </div>
                <div className="mt-8 text-3xl font-medium">Cold Chain Crisis Demo · 90 seconds</div>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <span className="rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">Alert triggered</span>
              <span className="rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-right text-xs uppercase tracking-[0.2em] text-white/70">Action taken</span>
            </div>
          </button>
        </div>
      </section>

      <section ref={(node) => { refsMap.current.footer = node; }} className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 border-b border-white/5 pb-10 text-center text-white/55 md:grid-cols-5 md:text-left">
            {["Manufacturing", "Pharmaceuticals", "Automotive", "Retail", "Healthcare"].map((item) => (
              <div key={item} className="text-3xl">{item}</div>
            ))}
          </div>

          <div className="mx-auto mt-20 max-w-3xl text-center">
            <div className="inline-flex rounded-full border border-violet-400/20 bg-violet-500/10 px-5 py-2 text-sm text-white/80">
              Free to get started. No credit card.
            </div>
            <h2 className="mx-auto mt-8 max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl">
              Stop reacting. Start predicting.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/60">
              Join 500+ operations teams using ChainPulse to prevent disruptions before they happen.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 md:flex-row">
              <input
                value={waitlistEmail}
                onChange={(event) => setWaitlistEmail(event.target.value)}
                placeholder="Enter your work email"
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-lg text-white placeholder:text-white/30"
              />
              <PrimaryButton className="h-14 w-full justify-center px-8 text-lg md:w-auto" onClick={submitWaitlist}>
                Join the waitlist
                <ArrowRight className="h-5 w-5" />
              </PrimaryButton>
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-4 text-sm text-white/40">
              <span>No spam</span>
              <span>Unsubscribe anytime</span>
              <span>Free forever plan</span>
            </div>
          </div>

          <footer className="mt-24 grid gap-10 border-t border-white/5 pt-14 md:grid-cols-[1.1fr_1fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-3 text-2xl font-medium">
                <span className="h-4 w-4 rounded-full bg-white shadow-[0_0_30px_rgba(167,139,250,0.7)]" />
                ChainPulse
              </div>
              <p className="mt-6 max-w-xs text-lg leading-8 text-white/50">
                Predictive supply chain intelligence. Built for the teams who keep the world moving.
              </p>
            </div>
            <FooterColumn title="Product" items={["How it Works", "Features", "Use Cases", "Changelog"]} />
            <FooterColumn title="Company" items={["About", "Blog", "Hackathon Story", "Contact"]} />
            <FooterColumn title="Legal" items={["Privacy Policy", "Terms of Service", "Cookie Settings"]} />
          </footer>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-sm text-white/35 md:flex-row">
            <div>© 2026 ChainPulse. Built for the hackathon.</div>
            <div>Made with care by the ChainPulse team.</div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AuthPage({ authForm, authMode, navigate, setShowPassword, showPassword, submitAuth, updateAuthField }) {
  const isSignin = authMode === "signin";

  return (
    <div className="grid min-h-screen md:grid-cols-[0.52fr_0.48fr]">
      <section className="relative hidden overflow-hidden bg-[linear-gradient(160deg,#6d4bf4_0%,#8858ff_45%,#6d4bf4_100%)] p-10 text-white md:block">
        <button type="button" onClick={() => navigate("home")} className="flex items-center gap-3 text-2xl font-medium">
          <span className="h-4 w-4 rounded-full bg-white" />
          ChainPulse
        </button>
        <div className="mt-40 max-w-xl">
          <h1 className="text-6xl font-semibold leading-tight tracking-tight">Your supply chain. Fully visible. Always.</h1>
          <p className="mt-6 text-2xl leading-9 text-white/80">
            Predict disruptions before they happen. Monitor every node in real time.
          </p>
          <div className="mt-12 space-y-5 text-lg text-white/85">
            <AuthBullet icon={<Link2 className="h-5 w-5" />} text="End-to-end supply chain visibility" />
            <AuthBullet icon={<Shield className="h-5 w-5" />} text="AI-powered disruption prediction" />
            <AuthBullet icon={<Leaf className="h-5 w-5" />} text="Operational and environmental health scores" />
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center bg-white px-6 py-12 text-slate-900">
        <div className="w-full max-w-md">
          <button type="button" onClick={() => navigate("home")} className="mb-12 text-sm text-slate-500 md:hidden">
            ← Back to home
          </button>
          <div className="text-xs uppercase tracking-[0.35em] text-slate-400">{isSignin ? "Welcome Back" : "Get Started"}</div>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight">{isSignin ? "Sign in to ChainPulse" : "Create your ChainPulse account"}</h2>

          <form className="mt-12 space-y-6" onSubmit={submitAuth}>
            {!isSignin && (
              <>
                <AuthField label="Full name">
                  <input
                    value={authForm.name}
                    onChange={(event) => updateAuthField("name", event.target.value)}
                    placeholder="Your full name"
                    className="h-14 w-full rounded-2xl border border-slate-200 px-4 text-lg"
                  />
                </AuthField>
                <AuthField label="Company">
                  <input
                    value={authForm.company}
                    onChange={(event) => updateAuthField("company", event.target.value)}
                    placeholder="Company name"
                    className="h-14 w-full rounded-2xl border border-slate-200 px-4 text-lg"
                  />
                </AuthField>
              </>
            )}

            <AuthField label="Work email">
              <input
                value={authForm.email}
                onChange={(event) => updateAuthField("email", event.target.value)}
                placeholder="you@company.com"
                className="h-14 w-full rounded-2xl border border-slate-200 px-4 text-lg"
              />
            </AuthField>

            <AuthField
              label="Password"
              trailing={isSignin ? <button type="button" className="text-sm text-violet-600">Forgot password?</button> : null}
            >
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={authForm.password}
                  onChange={(event) => updateAuthField("password", event.target.value)}
                  placeholder="Enter your password"
                  className="h-14 w-full rounded-2xl border border-slate-200 px-4 pr-12 text-lg"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </AuthField>

            <PrimaryButton type="submit" className="h-14 w-full justify-center text-lg">
              {isSignin ? "Sign in" : "Create account"}
              <ArrowRight className="h-5 w-5" />
            </PrimaryButton>

            <div className="relative py-2 text-center text-sm text-slate-400">
              <span className="relative z-10 bg-white px-4">or</span>
              <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-200" />
            </div>

            <button
              type="button"
              onClick={() => navigate("builder", { step: 1 })}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 text-lg font-medium"
            >
              <span className="text-2xl">G</span>
              Continue with Google
            </button>
          </form>

          <div className="mt-8 text-center text-base text-slate-500">
            {isSignin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button type="button" onClick={() => navigate(isSignin ? "signup" : "signin")} className="font-medium text-violet-600">
              {isSignin ? "Create one free" : "Sign in"}
              <ArrowRight className="ml-1 inline h-4 w-4" />
            </button>
          </div>

          <p className="mt-28 text-center text-sm leading-6 text-slate-400">
            By {isSignin ? "signing in" : "creating an account"}, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </section>
    </div>
  );
}

function BuilderTopBar({ page, setPage, topRight, navigate }) {
  const steps = ["Industry", "Build Chain", "Analysing", "Risk Report"];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <button type="button" onClick={() => navigate("home")} className="flex items-center gap-2 text-sm font-semibold text-slate-800">
        <span className="h-5 w-5 rounded-full bg-violet-600" />
        ChainPulse
      </button>

      <div className="hidden items-center md:flex">
        {steps.map((step, index) => {
          const number = index + 1;
          const done = number < page;
          const active = number === page;
          return (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold ${
                    done
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : active
                        ? "border-violet-600 bg-violet-600 text-white"
                        : "border-slate-300 bg-white text-slate-500"
                  }`}
                >
                  {done ? "✓" : number}
                </div>
                <span className={`text-[10px] uppercase tracking-[0.18em] ${active ? "text-violet-700" : done ? "text-emerald-600" : "text-slate-400"}`}>
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && <div className={`mx-3 h-0.5 w-12 ${done ? "bg-emerald-500" : "bg-slate-300"}`} />}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3">{topRight}</div>
    </header>
  );
}

function SectionHeading({ eyebrow, title, body }) {
  return (
    <div className="text-center">
      <div className="text-sm uppercase tracking-[0.4em] text-violet-300">{eyebrow}</div>
      <h2 className="mx-auto mt-7 max-w-4xl text-5xl font-semibold tracking-tight md:text-6xl">{title}</h2>
      {body && <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-white/60">{body}</p>}
    </div>
  );
}

function FeatureCard({ card }) {
  const spanClass =
    card.size === "large"
      ? "md:col-span-2"
      : card.size === "wide"
        ? "md:col-span-3"
        : card.size === "small"
          ? "md:col-span-1"
          : "md:col-span-1";

  return (
    <div className={`rounded-[30px] border border-white/10 bg-white/[0.02] p-7 ${spanClass}`}>
      <div className="text-3xl font-semibold">{card.title}</div>
      <p className="mt-4 max-w-xl text-lg leading-8 text-white/55">{card.body}</p>

      {card.title === "Live Chain Map" && (
        <div className="mt-8 rounded-[24px] border border-white/5 bg-black/20 p-8">
          <div className="flex items-center justify-center gap-3">
            {["supplier", "factory", "warehouse", "distribution"].map((type, index) => (
              <div key={type} className="flex items-center gap-3">
                <div className={`h-14 w-14 rounded-xl border ${typeClasses[type]}`} />
                {index < 3 && <div className="h-px w-10 bg-white/20" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {card.title === "Disruption Predictor" && (
        <div className="mt-10 flex h-[260px] items-end gap-4">
          {[44, 68, 128].map((height, index) => (
            <div
              key={height}
              className={`w-16 rounded-t-lg ${index === 2 ? "bg-rose-500" : "bg-white/10"}`}
              style={{ height }}
            />
          ))}
        </div>
      )}

      {card.title === "IoT Anomaly" && (
        <div className="mt-16 h-[230px]">
          <svg viewBox="0 0 320 180" className="h-full w-full">
            <path d="M10 110 C 50 60, 80 160, 120 90 S 180 40, 210 140 S 260 110, 310 110" fill="none" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>
      )}

      {card.title === "Dual Health Score" && (
        <div className="mt-10 flex items-center justify-between gap-4">
          <MiniRing value={47} color="#fbbf24" />
          <MiniRing value={81} color="#4ade80" />
        </div>
      )}

      {card.title === "AI Co-Pilot" && (
        <div className="mt-8 rounded-[24px] border border-white/5 bg-black/20 p-6">
          <div className="ml-auto w-fit rounded-full bg-violet-500/20 px-4 py-3 text-base text-violet-100">
            Why is Warehouse C flagged as critical?
          </div>
          <div className="mt-6 flex gap-3">
            <span className="mt-3 h-4 w-4 rounded-full bg-white" />
            <div className="max-w-3xl rounded-[22px] bg-white/5 px-5 py-4 text-lg leading-8 text-white/70">
              Warehouse C has no backup supplier and sits on a monsoon-affected route. Disruption probability: 74% in Q3. Recommended
              action: add a secondary distribution node in Pune.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ScoreRing({ badge, badgeTone, color, label, value }) {
  const dash = `${value * 2.2} 999`;
  return (
    <div className="text-center">
      <svg viewBox="0 0 140 140" className="mx-auto h-48 w-48">
        <circle cx="70" cy="70" r="48" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
        <circle
          cx="70"
          cy="70"
          r="48"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={dash}
          transform="rotate(-90 70 70)"
        />
        <text x="70" y="66" textAnchor="middle" className="fill-white text-[26px] font-semibold">{value}</text>
        <text x="70" y="88" textAnchor="middle" className="fill-white/55 text-[10px] tracking-[0.25em]">{label}</text>
      </svg>
      <div className={`mx-auto mt-4 w-fit rounded-full px-4 py-2 text-sm font-medium ${badgeTone}`}>{badge}</div>
    </div>
  );
}

function MiniRing({ color, value }) {
  const dash = `${value * 1.8} 999`;
  return (
    <svg viewBox="0 0 100 100" className="h-28 w-28">
      <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
      <circle
        cx="50"
        cy="50"
        r="34"
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={dash}
        transform="rotate(-90 50 50)"
      />
      <text x="50" y="56" textAnchor="middle" className="fill-white text-[22px] font-semibold">{value}</text>
    </svg>
  );
}

function HeroStat({ label, value }) {
  return (
    <div>
      <div className="text-4xl font-semibold">{value}</div>
      <div className="mt-2 text-lg text-white/45">{label}</div>
    </div>
  );
}

function CheckLine({ text }) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
        <Check className="h-4 w-4" />
      </span>
      <span>{text}</span>
    </div>
  );
}

function AuthBullet({ icon, text }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-white">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function AuthField({ label, trailing, children }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        {trailing}
      </div>
      {children}
    </div>
  );
}

function FooterColumn({ items, title }) {
  return (
    <div>
      <div className="text-sm uppercase tracking-[0.3em] text-white/35">{title}</div>
      <div className="mt-6 space-y-4 text-lg text-white/55">
        {items.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </div>
  );
}

function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, className = "", dark = false, ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm transition ${
        dark ? "border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.06]" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Field({ label, children }) {
  return (
    <div className="mt-5">
      <div className="mb-2 text-sm text-slate-500">{label}</div>
      {children}
    </div>
  );
}

function ToggleRow({ title, subtitle, enabled, onToggle }) {
  return (
    <div className="mt-4 flex items-center justify-between gap-4">
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-slate-500">{subtitle}</div>
      </div>
      <button
        type="button"
        aria-pressed={enabled}
        onClick={onToggle}
        className={`relative h-6 w-11 rounded-full transition ${enabled ? "bg-violet-600" : "bg-slate-300"}`}
      >
        <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${enabled ? "right-1" : "left-1"}`} />
      </button>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      {label}
    </div>
  );
}

function StatBox({ label, value, tone }) {
  const toneClass = tone === "red" ? "text-rose-500" : tone === "amber" ? "text-amber-500" : "text-slate-900";
  return (
    <div>
      <div className="text-xs text-slate-400">{label}</div>
      <div className={`mt-1 text-xl font-semibold ${toneClass}`}>{value}</div>
    </div>
  );
}

function RiskCard({ node }) {
  const accent =
    node.severity === "Critical"
      ? "border-rose-300"
      : node.severity === "High"
        ? "border-amber-300"
        : node.severity === "Medium"
          ? "border-sky-300"
          : "border-emerald-300";
  const pill =
    node.severity === "Critical"
      ? "bg-rose-100 text-rose-700"
      : node.severity === "High"
        ? "bg-amber-100 text-amber-700"
        : node.severity === "Medium"
          ? "bg-sky-100 text-sky-700"
          : "bg-emerald-100 text-emerald-700";
  const bar =
    node.severity === "Critical"
      ? "bg-rose-500"
      : node.severity === "High"
        ? "bg-amber-500"
        : node.severity === "Medium"
          ? "bg-sky-500"
          : "bg-emerald-500";

  return (
    <div className={`rounded-2xl border bg-white p-5 shadow-sm ${accent}`}>
      <div className="flex flex-wrap items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${typeClasses[node.type] ?? "bg-slate-100 border-slate-200"}`}>
          {node.type === "supplier" ? "🚛" : node.type === "factory" ? "🏭" : node.type === "warehouse" ? "🏪" : node.type === "distribution" ? "📦" : "✅"}
        </div>
        <div className="min-w-[180px] flex-1">
          <div className="text-sm font-semibold">{node.name}</div>
          <div className="text-xs text-slate-500">
            {node.category} · {node.location}
          </div>
        </div>
        <div className="text-lg font-semibold">{node.score}%</div>
        <div className="w-20">
          <div className="h-1.5 rounded-full bg-slate-100">
            <div className={`h-full rounded-full ${bar}`} style={{ width: `${node.score}%` }} />
          </div>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${pill}`}>{node.severity}</span>
      </div>
      <div className="mt-3 text-sm text-slate-500">
        {node.critical
          ? "Single source, no backup supplier."
          : node.singleSource
            ? "Backup coverage is limited and increases interruption exposure."
            : node.status === "warning"
              ? "Some capacity or route constraints are visible."
              : "Stable performance with acceptable redundancy."}
      </div>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-500">
        <li>Inventory buffer: {node.inventoryBuffer}</li>
        <li>Primary transport: {node.transportMode}</li>
        <li>{node.critical ? "Immediate alternate node recommended." : "Monitor continuously for changing demand."}</li>
      </ul>
    </div>
  );
}

export default App;
