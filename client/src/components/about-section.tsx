import { Code2, Brain, Rocket, GraduationCap, School } from "lucide-react";
import { Card } from "@/components/ui/card";
import { personalInfo, education } from "@/lib/data";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const highlights = [
  {
    icon: Brain,
    title: "AI & ML Expertise",
    description: "Specialized in Generative AI, LLMs, RAG, and Agentic AI systems",
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "Building end-to-end applications with Python, FastAPI, Django, and modern frontends",
  },
  {
    icon: Rocket,
    title: "Startup Experience",
    description: "Promoted to Project Head at ApexIQ AI, leading backend development across 3+ products",
  },
  {
    icon: GraduationCap,
    title: "Academic Excellence",
    description: `CGPA ${education[0].grade.split(": ")[1] || "8.56"} at VIT Bhopal, pursuing Integrated M.Tech in CS`,
  },
];

export function AboutSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={cn("transition-all duration-700", isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-primary mb-2">01. ABOUT ME</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Who I Am
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {personalInfo.bio}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Previously worked as a Data Science Intern at CloudyML and was promoted to{" "}
                <span className="text-foreground font-medium">Project Head (Backend Developer)</span>{" "}
                during my internship at ApexIQ AI, where I led critical projects including call analytics, AI accounting platforms, and content moderation systems.
              </p>

              <div className="pt-6">
                <h3 className="text-xl font-display font-semibold mb-4">Education</h3>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <Card key={edu.id} className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                          {index === 0 ? (
                            <GraduationCap className="h-5 w-5 text-primary" />
                          ) : (
                            <School className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground text-sm">{edu.degree}</h4>
                          {edu.specialization && (
                            <p className="text-xs text-muted-foreground mb-1">
                              {edu.specialization}
                            </p>
                          )}
                          <p className="text-xs text-primary font-medium">{edu.institution}</p>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-muted-foreground">
                            <span>{edu.period}</span>
                            <span className="text-primary font-medium">{edu.grade}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <Card
                  key={item.title}
                  className={cn(
                    "p-6 transition-all duration-500 hover-elevate",
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
