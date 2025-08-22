import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function LoginPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE =
    import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || "";

  const handleSubmit = async (e) => {
    e && e.preventDefault && e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const msg = (await res.text()) || "Login failed";
        throw new Error(msg);
      }
      toast({ title: "Logged in", description: "Welcome back 👋" });
      // TODO: store token / redirect if backend returns it
    } catch (err) {
      toast({ title: "Error", description: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
