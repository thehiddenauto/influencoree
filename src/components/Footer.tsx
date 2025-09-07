const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="h-6 w-6 rounded bg-primary"></div>
            <span className="font-semibold text-foreground">Influencore</span>
          </div>

          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:accent-color transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:accent-color transition-colors">
              Terms
            </a>
            <a href="#" className="hover:accent-color transition-colors">
              Support
            </a>
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Influencore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
