import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const DashboardNavbar = () => {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">InfluenCore</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <Button variant="ghost">Dashboard</Button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;