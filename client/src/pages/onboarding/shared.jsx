/**
 * Shared constants and utility components used by Landing, Auth, and Builder pages.
 * Extracted from frontend-chainpulse/src/App.jsx
 */

export const industries = [
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

export const nodeLibrary = [
  { type: "supplier", icon: "🚛", label: "Raw supplier", sub: "Primary source", tone: "purple" },
  { type: "supplier", icon: "🚛", label: "Secondary supplier", sub: "Backup source", tone: "purple" },
  { type: "factory", icon: "🏭", label: "Factory", sub: "Production unit", tone: "green" },
  { type: "quality", icon: "✅", label: "Quality control", sub: "Inspection", tone: "green" },
  { type: "packaging", icon: "📦", label: "Packaging", sub: "Final prep", tone: "green" },
  { type: "warehouse", icon: "🏪", label: "Regional warehouse", sub: "Storage hub", tone: "amber" },
  { type: "distribution", icon: "🏪", label: "Distribution centre", sub: "Dispatch", tone: "amber" },
];

export const templateNodes = [
  { id: "supplier", name: "Supplier A", location: "Vietnam", type: "supplier", category: "Raw supplier", position: { x: 180, y: 220 }, status: "healthy", inventoryBuffer: "14 days", transportMode: "Sea freight", singleSource: false, critical: false },
  { id: "factory", name: "Factory B", location: "Chennai, India", type: "factory", category: "Factory", position: { x: 430, y: 220 }, status: "healthy", inventoryBuffer: "10 days", transportMode: "Road freight", singleSource: false, critical: false },
  { id: "warehouse", name: "Warehouse C", location: "Mumbai, India", type: "warehouse", category: "Regional warehouse", position: { x: 680, y: 220 }, status: "critical", inventoryBuffer: "7 days", transportMode: "Road freight", singleSource: true, critical: true },
  { id: "logistics", name: "Logistics D", location: "Pan India", type: "distribution", category: "Last-mile", position: { x: 930, y: 220 }, status: "warning", inventoryBuffer: "5 days", transportMode: "Road freight", singleSource: false, critical: false },
  { id: "quality", name: "Quality E", location: "Chennai, India", type: "quality", category: "Inspection", position: { x: 430, y: 360 }, status: "healthy", inventoryBuffer: "3 days", transportMode: "Internal", singleSource: false, critical: false },
];

export const templateConnections = [
  ["supplier", "factory"],
  ["factory", "warehouse"],
  ["warehouse", "logistics"],
  ["factory", "quality"],
];

export const toneClasses = {
  purple: "bg-violet-100 text-violet-700",
  green: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
};

export const typeClasses = {
  supplier: "bg-violet-100 border-violet-200 text-violet-800",
  factory: "bg-emerald-100 border-emerald-200 text-emerald-800",
  warehouse: "bg-amber-100 border-amber-200 text-amber-800",
  distribution: "bg-sky-100 border-sky-200 text-sky-800",
  quality: "bg-emerald-100 border-emerald-200 text-emerald-800",
};

export const statusDot = {
  healthy: "bg-emerald-500",
  warning: "bg-amber-500",
  critical: "bg-rose-500",
};

export function PrimaryButton({ children, className = "", ...props }) {
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

export function GhostButton({ children, className = "", dark = false, ...props }) {
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
