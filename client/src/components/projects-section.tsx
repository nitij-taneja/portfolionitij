import { useState } from "react";
import { ExternalLink, Github, Play, Video } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const categories = ["All", "Agentic AI", "RAG", "Data Science", "Full-Stack"];

export function ProjectsSection() {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const [activeCategory, setActiveCategory] = useState("All");
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const filteredProjects = activeCategory === "All"
    ? projects.filter((p) => p.featured)
    : projects.filter((p) => p.category === activeCategory);

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={cn("transition-all duration-700", isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="text-center mb-12">
            <p className="text-sm font-mono text-primary mb-2">03. PROJECTS</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Featured Work
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore my work in Agentic AI, LLMs, RAG systems, and full-stack applications.
              Each project showcases real-world problem-solving with cutting-edge technology.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "secondary"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                data-testid={`button-filter-${category.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className={cn(
                  "group overflow-visible flex flex-col transition-all duration-500 hover-elevate",
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
                data-testid={`card-project-${project.id}`}
              >
                <div className="relative aspect-video overflow-hidden rounded-t-md bg-muted">
                  {project.demo ? (
                    <>
                      {!loadedImages.has(project.id) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-muted">
                          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                      <img
                        src={project.demo}
                        alt={`${project.title} demo`}
                        className={cn(
                          "w-full h-full object-cover transition-all duration-300",
                          loadedImages.has(project.id) ? "opacity-100" : "opacity-0"
                        )}
                        loading="lazy"
                        onLoad={() => handleImageLoad(project.id)}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-chart-2/20">
                      <span className="text-4xl font-display font-bold text-primary/30">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <Badge variant="outline" className="shrink-0 text-xs">
                      {project.category}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs font-mono">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.tags.length - 4}
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                      data-testid={`link-github-${project.id}`}
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </a>
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`link-live-${project.id}`}
                      >
                        <Button size="sm" variant="default" className="gap-1">
                          <ExternalLink className="w-3 h-3" />
                          Live
                        </Button>
                      </a>
                    )}
                    {project.videoLink && (
                      <a
                        href={project.videoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`link-video-${project.id}`}
                      >
                        <Button size="sm" variant="ghost">
                          <Video className="w-4 h-4" />
                        </Button>
                      </a>
                    )}
                    {project.demo && !project.liveLink && !project.videoLink && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`link-demo-${project.id}`}
                      >
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://github.com/nitij-taneja"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-view-all-projects"
            >
              <Button variant="outline" size="lg">
                View All Projects on GitHub
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
