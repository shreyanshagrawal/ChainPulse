import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your organization preferences.</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Organization Profile</CardTitle>
          <CardDescription>Update your company details and operational region.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="org-name">Organization Name</Label>
            <Input id="org-name" defaultValue="Global Manufacturing Inc." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">Industry Type</Label>
            <Input id="industry" defaultValue="FMCG" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="region">Operational Region</Label>
            <Input id="region" defaultValue="North America, Europe, Asia" />
          </div>
          <Button className="mt-4">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
