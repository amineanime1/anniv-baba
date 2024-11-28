import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  return (
    <div className="space-y-6">

<h1 className="text-5xl font-bold text-primary">This Page Does Not Work For The Moment</h1>
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Store Information</h2>
          <div className="grid gap-4 max-w-lg">
            <div className="space-y-2">
              <label className="text-sm font-medium">Store Name</label>
              <Input defaultValue="Grandpa's Plant Shop" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Contact Email</label>
              <Input defaultValue="contact@grandpasplants.dz" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <Input defaultValue="+213 XX XX XX XX" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Admin Account</h2>
          <div className="grid gap-4 max-w-lg">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input type="text" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">New Password</label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm Password</label>
              <Input type="password" />
            </div>
          </div>
        </div>

        <Button>Save Changes</Button>
      </div>
    </div>
  );
}