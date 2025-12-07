import { Download, FileText, Briefcase, Code2, GraduationCap, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const stats = [
  { icon: Briefcase, label: "Years Experience", value: "3+" },
  { icon: Code2, label: "Projects Completed", value: "15+" },
  { icon: GraduationCap, label: "Certifications", value: "5+" },
  { icon: Trophy, label: "Competitions Won", value: "3+" },
];

export function ResumeSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="resume" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={cn("transition-all duration-700", isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-primary mb-2">06. RESUME</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              My Resume
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Download my complete resume to learn more about my professional experience,
              skills, and achievements.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, index) => (
              <Card
                key={stat.label}
                className={cn(
                  "p-6 text-center transition-all duration-500",
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-2xl font-display font-bold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-8 text-center">
              <div className="inline-flex p-4 rounded-full bg-primary/10 mb-6">
                <FileText className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">
                Nitij Taneja - Resume
              </h3>
              <p className="text-muted-foreground mb-6">
                AI Developer & Data Scientist with expertise in Generative AI, LLMs, RAG, and Agentic AI systems.
                Includes work experience, technical skills, projects, and achievements.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" data-testid="button-download-resume-main">
                  <a href="/NitijTanejaResume.pdf" download="Nitij_Taneja_Resume.pdf">
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume (PDF)
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  data-testid="button-view-resume"
                >
                  <a href="/NitijTanejaResume.pdf" target="_blank" rel="noopener noreferrer">
                    <FileText className="w-4 h-4 mr-2" />
                    View Resume
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
