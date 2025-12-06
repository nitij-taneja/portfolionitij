import { Briefcase, MapPin, Calendar, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { experience } from "@/lib/data";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="experience" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={cn("transition-all duration-700", isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-primary mb-2">02. EXPERIENCE</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Where I've Worked
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

            <div className="space-y-12">
              {experience.map((job, index) => (
                <div
                  key={job.id}
                  className={cn(
                    "relative pl-8 md:pl-0 transition-all duration-500",
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                    index % 2 === 0 ? "md:pr-[calc(50%+2rem)] md:text-right" : "md:pl-[calc(50%+2rem)]"
                  )}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div
                    className={cn(
                      "absolute top-0 w-4 h-4 rounded-full border-4 border-primary bg-background",
                      "left-0 -translate-x-1/2 md:left-1/2"
                    )}
                  />

                  <Card className="p-6 hover-elevate">
                    <div className={cn("flex flex-col gap-2", index % 2 === 0 ? "md:items-end" : "md:items-start")}>
                      <div className="flex items-center gap-2 flex-wrap">
                        {job.current && (
                          <Badge variant="default" className="text-xs">
                            Current
                          </Badge>
                        )}
                        <Badge variant="secondary" className="text-xs font-mono">
                          <Calendar className="w-3 h-3 mr-1" />
                          {job.period}
                        </Badge>
                      </div>

                      <h3 className="text-lg font-display font-semibold text-foreground">
                        {job.role}
                      </h3>

                      <div className={cn("flex items-center gap-2 text-sm text-muted-foreground", index % 2 === 0 ? "md:flex-row-reverse" : "")}>
                        <Briefcase className="w-4 h-4 text-primary" />
                        <span className="font-medium text-primary">{job.company}</span>
                      </div>

                      <div className={cn("flex items-center gap-1 text-xs text-muted-foreground", index % 2 === 0 ? "md:flex-row-reverse" : "")}>
                        <MapPin className="w-3 h-3" />
                        <span>{job.location}</span>
                      </div>

                      <ul className={cn("mt-4 space-y-2", index % 2 === 0 ? "md:text-right" : "md:text-left")}>
                        {job.description.map((item, i) => (
                          <li key={i} className="text-sm text-muted-foreground">
                            {item}
                          </li>
                        ))}
                      </ul>

                      {job.techStack && job.techStack.length > 0 && (
                        <div className={cn("mt-4 flex flex-wrap gap-1.5", index % 2 === 0 ? "md:justify-end" : "md:justify-start")}>
                          {job.techStack.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs font-mono">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {job.links && job.links.length > 0 && (
                        <div className={cn("mt-3 flex flex-wrap gap-2", index % 2 === 0 ? "md:justify-end" : "md:justify-start")}>
                          {job.links.map((link) => (
                            <a
                              key={link.label}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button variant="ghost" size="sm" className="h-7 text-xs">
                                {link.label}
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </Button>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
