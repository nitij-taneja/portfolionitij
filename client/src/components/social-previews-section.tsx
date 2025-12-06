import { ExternalLink } from "lucide-react";
import { FaLinkedin, FaYoutube, FaStackOverflow } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { socialPreviews } from "@/lib/data";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const iconMap: Record<string, any> = {
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  article: FaStackOverflow,
};

const colorMap: Record<string, string> = {
  linkedin: "text-blue-600",
  youtube: "text-red-600",
  article: "text-orange-500",
};

export function SocialPreviewsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={cn("transition-all duration-700", isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="text-center mb-12">
            <p className="text-sm font-mono text-primary mb-2">CONNECT</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Find Me Online
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Check out my content and professional activity across different platforms
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {socialPreviews.map((preview, index) => {
              const Icon = iconMap[preview.icon] || ExternalLink;
              const colorClass = colorMap[preview.icon] || "text-primary";
              
              return (
                <a
                  key={preview.id}
                  href={preview.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card
                    className={cn(
                      "p-5 h-full hover-elevate transition-all duration-500 cursor-pointer group",
                      isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    )}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn("p-2 rounded-lg bg-muted shrink-0", colorClass)}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          {preview.platform}
                        </p>
                        <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors truncate">
                          {preview.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {preview.description}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </div>
                  </Card>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
