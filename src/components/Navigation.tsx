import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const loc = useLocation();
  const isActive = (p: string) => loc.pathname === p;
  return (
    <nav className="w-full bg-surface border-b border-muted/20">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between max-w-6xl">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-bold">I</div>
            <span className="font-semibold">Influencore</span>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/pricing" className={isActive("/pricing") ? "underline" : ""}>Pricing</Link>
          <Link to="/docs" className={isActive("/docs") ? "underline" : ""}>Docs</Link>
          <Link to="/dashboard" className={isActive("/dashboard") ? "underline" : ""}>Dashboard</Link>
          <Link to="/signin" className="ml-4 text-sm">Sign In</Link>
          <Link to="/pricing" className="ml-3 inline-flex items-center px-4 py-2 rounded-2xl bg-brand text-white">Start a Free Trial</Link>
        </div>
      </div>
    </nav>
  );
}
