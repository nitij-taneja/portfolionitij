import { useQuery } from "@tanstack/react-query";
import { Github, Star, GitFork, Code2, Flame } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  topLanguages: { name: string; percentage: number; color: string }[];
}

export function GitHubSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const { data: stats, isLoading } = useQuery<GitHubStats>({
    queryKey: ["/api/github/stats"],
    staleTime: 1000 * 60 * 30,
  });

  return (
    <section id="github" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={cn("transition-all duration-700", isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-primary mb-2">GITHUB ACTIVITY</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Open Source Contributions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My GitHub activity and contribution statistics.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="p-6 text-center">
                    <Skeleton className="h-8 w-8 rounded-full mx-auto mb-3" />
                    <Skeleton className="h-8 w-16 mx-auto mb-2" />
                    <Skeleton className="h-4 w-24 mx-auto" />
                  </Card>
                ))
              ) : (
                <>
                  <Card className="p-6 text-center">
                    <Github className="w-8 h-8 text-primary mx-auto mb-3" />
                    <p className="text-2xl font-display font-bold text-foreground mb-1">
                      {stats?.publicRepos || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Public Repos</p>
                  </Card>
                  <Card className="p-6 text-center">
                    <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                    <p className="text-2xl font-display font-bold text-foreground mb-1">
                      {stats?.totalStars || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Stars</p>
                  </Card>
                  <Card className="p-6 text-center">
                    <GitFork className="w-8 h-8 text-green-500 mx-auto mb-3" />
                    <p className="text-2xl font-display font-bold text-foreground mb-1">
                      {stats?.followers || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Followers</p>
                  </Card>
                  <Card className="p-6 text-center">
                    <Flame className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                    <p className="text-2xl font-display font-bold text-foreground mb-1">
                      {stats?.following || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Following</p>
                  </Card>
                </>
              )}
            </div>

            <Card className="p-6 mb-8">
              <h3 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary" />
                Top Languages
              </h3>
              {isLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-2 w-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {(stats?.topLanguages || []).map((lang) => (
                    <div key={lang.name}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-medium text-foreground">{lang.name}</span>
                        <span className="text-muted-foreground">{lang.percentage}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: isInView ? `${lang.percentage}%` : "0%",
                            backgroundColor: lang.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card className="p-6 overflow-hidden">
              <h3 className="text-lg font-display font-semibold mb-4">Contribution Graph</h3>
              <div className="w-full overflow-x-auto">
                <img
                  src="https://ghchart.rshah.org/3b82f6/nitij-taneja"
                  alt="GitHub Contribution Graph"
                  className="w-full min-w-[600px]"
                  loading="lazy"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
