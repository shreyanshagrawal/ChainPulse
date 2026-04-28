import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PackageOpen, Factory, Store, ArrowRight } from "lucide-react";

export function BuilderVisualizer({ suppliers, factories, warehouses }) {
  // A simplified, hackathon-friendly linear visualizer
  return (
    <Card className="overflow-hidden border-border bg-card/50">
      <CardHeader>
        <CardTitle className="text-lg">Supply Chain Flow Blueprint</CardTitle>
        <CardDescription>Visual representation of your global node dependencies.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 overflow-x-auto">
        <div className="flex items-center min-w-[800px] justify-between px-8 py-12 relative">
          
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-16 right-16 h-1 -translate-y-1/2 bg-gradient-to-r from-emerald-500/30 via-blue-500/30 to-purple-500/30 z-0 rounded-full" />

          {/* Suppliers Tier */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <PackageOpen className="h-8 w-8 text-emerald-500" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm">Suppliers</p>
              <p className="text-xs text-muted-foreground">{suppliers.length} active nodes</p>
            </div>
          </div>

          <ArrowRight className="h-6 w-6 text-muted-foreground/50 z-10 bg-background rounded-full" />

          {/* Factories Tier */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.15)]">
              <Factory className="h-8 w-8 text-blue-500" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm">Factories</p>
              <p className="text-xs text-muted-foreground">{factories.length} active nodes</p>
            </div>
          </div>

          <ArrowRight className="h-6 w-6 text-muted-foreground/50 z-10 bg-background rounded-full" />

          {/* Warehouses Tier */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <Store className="h-8 w-8 text-purple-500" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm">Warehouses</p>
              <p className="text-xs text-muted-foreground">{warehouses.length} active nodes</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
