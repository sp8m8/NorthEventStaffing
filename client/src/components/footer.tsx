import { Users } from "lucide-react";
import { Link } from "wouter";

const footerNavs = [
  {
    label: "Services",
    items: [
      { href: "/services", name: "All Services" },
      { href: " /packages", name: "Event Packages" },
      { href: "/join-us", name: "Join Our Team" },
      { href: "/contact", name: "Get Quote" },
    ],
  },
  {
    label: "Company",
    items: [
      { href: "/about", name: "About Us" },
      { href: "/blog", name: "Blog" },
      { href: "/contact", name: "Contact Us" },
    ],
  },
  {
    label: "Legal",
    items: [
      { href: "/terms", name: "Terms of Service" },
      { href: "/privacy", name: "Privacy Policy" },
    ],
  },
];

const socialLinks = [
  // Add social links here
];

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-primary" />
              <span className="font-bold">NORTH STAFF</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your one-stop shop for event staffing in the North.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-1 lg:col-span-3">
            {footerNavs.map((nav) => (
              <div key={nav.label}>
                <h3 className="text-sm font-semibold tracking-wider text-foreground">
                  {nav.label}
                </h3>
                <ul className="mt-4 space-y-2">
                  {nav.items.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href}>
                        <a className="text-sm text-muted-foreground hover:text-primary">
                          {item.name}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t pt-6 sm:flex sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NORTH STAFF. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-primary"
              >
                <span className="sr-only">{link.name}</span>
                {/* Add SVG icons here */}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
