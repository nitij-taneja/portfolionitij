import { useEffect, useState } from "react";
import { ArrowDown, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo, typingRoles } from "@/lib/data";

function TypewriterText({ words }: { words: string[] }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseDuration = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex, words]);

  return (
    <span className="text-primary">
      {displayText}
      <span className="animate-typing-cursor">|</span>
    </span>
  );
}

export function HeroSection() {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background dark:from-primary/10 dark:via-background dark:to-background" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-chart-2/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-chart-3/5 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="relative animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
            <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-chart-2 to-chart-3 animate-gradient-x p-1">
                <div className="w-full h-full rounded-full bg-background p-1">
                  <img
                    src={personalInfo.photo}
                    alt={personalInfo.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/20 via-chart-2/20 to-chart-3/20 blur-xl -z-10" />
            </div>
          </div>

          <div className="text-center lg:text-left flex-1">
            <p className="text-sm md:text-base text-muted-foreground mb-4 animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
              {personalInfo.greeting.hindi} | {personalInfo.greeting.english} | {personalInfo.greeting.punjabi}
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
              I'm{" "}
              <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                {personalInfo.name}
              </span>
            </h1>

            <div className="h-12 md:h-14 flex items-center justify-center lg:justify-start mb-8 animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
              <p className="text-xl md:text-2xl lg:text-3xl font-display font-medium">
                <TypewriterText words={typingRoles} />
              </p>
            </div>

            <p className="max-w-2xl mx-auto lg:mx-0 text-base md:text-lg text-muted-foreground mb-10 animate-fade-in opacity-0" style={{ animationDelay: "0.5s" }}>
              {personalInfo.shortBio}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in opacity-0" style={{ animationDelay: "0.6s" }}>
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="group"
                data-testid="button-view-projects"
              >
                View Projects
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="group"
                data-testid="button-download-resume"
              >
                <a href="/NitijTanejaResume.pdf" download="Nitij_Taneja_Resume.pdf">
                  Download Resume
                  <Download className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </a>
              </Button>
            </div>

            <div className="mt-12 animate-fade-in opacity-0" style={{ animationDelay: "0.8s" }}>
              <div className="flex items-center justify-center lg:justify-start gap-8 md:gap-12">
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-display font-bold text-foreground">10+</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Featured Projects</p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-display font-bold text-foreground">3+</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Companies</p>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-display font-bold text-foreground">50+</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Tech Skills</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-float"
        aria-label="Scroll to about section"
        data-testid="button-scroll-down"
      >
        <ArrowDown className="h-6 w-6" />
      </button>
    </section>
  );
}
