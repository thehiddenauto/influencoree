import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-lg bg-primary"></div>
          <span className="text-xl font-semibold text-foreground">
            Influencore
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/pricing"
            className="text-sm text-muted-foreground hover:accent-color transition-colors"
          >
            Pricing
          </Link>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:accent-color transition-colors"
          >
            Docs
          </a>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Sign In
          </Button>
          <Button
            size="sm"
            className="btn-primary shadow-elegant hover:shadow-glow transition-all duration-200"
          >
            Start a Free Trial
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
