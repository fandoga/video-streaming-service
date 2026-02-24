import React from "react";

const Footer = () => {
  return (
    <footer className="w-full mt-40 bg-secondary text-muted-foreground border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3 max-w-sm">
          <h2 className="text-lg font-semibold text-foreground">Getflix</h2>
          <p className="text-sm">
            Watch your favorite movies and series in one place. Simple, fast and
            without any distractions.
          </p>
          <p className="text-xs">
            &copy; {new Date().getFullYear()} Getflix. All rights reserved.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-3">
          <div className="space-y-2">
            <p className="font-semibold text-foreground">Browse</p>
            <ul className="space-y-1">
              <li>Home</li>
              <li>Movies</li>
              <li>Series</li>
              <li>My list</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-foreground">About</p>
            <ul className="space-y-1">
              <li>How it works</li>
              <li>FAQ</li>
              <li>Support</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-foreground">Stay in touch</p>
            <ul className="space-y-1">
              <li>Twitter</li>
              <li>Instagram</li>
              <li>Facebook</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
