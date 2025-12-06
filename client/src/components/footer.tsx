import { Heart } from "lucide-react";
import { SiLinkedin, SiGithub, SiKaggle, SiYoutube } from "react-icons/si";
import { personalInfo, navLinks } from "@/lib/data";

const quickLinks = navLinks.slice(0, 4);
const socialLinks = [
  { icon: SiLinkedin, url: personalInfo.linkedin, label: "LinkedIn" },
  { icon: SiGithub, url: personalInfo.github, label: "GitHub" },
  { icon: SiKaggle, url: personalInfo.kaggle, label: "Kaggle" },
  { icon: SiYoutube, url: personalInfo.youtube, label: "YouTube" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-display font-bold text-2xl mb-4 block"
            >
              Nitij<span className="text-primary">.</span>
            </button>
            <p className="text-sm text-muted-foreground max-w-xs">
              AI Developer & Data Scientist building intelligent systems
              with cutting-edge AI technologies.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {currentYear} Nitij Taneja. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using React & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
