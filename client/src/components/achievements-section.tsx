import { Trophy, Medal, Award, Eye, GraduationCap, FileText, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { achievements, certifications } from "@/lib/data";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const iconMap: Record<string, any> = {
  trophy: Trophy,
  medal: Medal,
  award: Award,
  eye: Eye,
  certificate: GraduationCap,
  article: FileText,
};

export function AchievementsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="achievements" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={cn("transition-all duration-700", isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-primary mb-2">05. ACHIEVEMENTS</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Recognition & Certifications
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Highlights from competitions, hackathons, and professional certifications
              that demonstrate my commitment to excellence.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {achievements.map((achievement, index) => {
              const Icon = iconMap[achievement.icon] || Trophy;
              return (
                <Card
                  key={achievement.id}
                  className={cn(
                    "p-6 text-center hover-elevate transition-all duration-500",
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-1">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-2">
                    {achievement.subtitle}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {achievement.description}
                  </p>
                </Card>
              );
            })}
          </div>

          <div>
            <h3 className="text-xl font-display font-semibold text-center mb-8">
              Certifications & Publications
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {certifications.map((cert, index) => {
                const Icon = iconMap[cert.icon] || GraduationCap;
                const hasLink = 'link' in cert && cert.link;
                
                const cardContent = (
                  <Card
                    className={cn(
                      "p-4 flex items-start gap-4 hover-elevate transition-all duration-500",
                      hasLink && "cursor-pointer",
                      isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    )}
                    style={{ transitionDelay: `${(achievements.length + index) * 100}ms` }}
                  >
                    <div className="p-2 rounded-md bg-primary/10 shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground text-sm mb-1 truncate">
                          {cert.title}
                        </h4>
                        {hasLink && (
                          <ExternalLink className="w-3 h-3 text-primary shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {cert.issuer}
                      </p>
                    </div>
                  </Card>
                );
                
                if (hasLink) {
                  return (
                    <a
                      key={cert.id}
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`link-certification-${cert.id}`}
                      className="block"
                    >
                      {cardContent}
                    </a>
                  );
                }
                
                return <div key={cert.id}>{cardContent}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
