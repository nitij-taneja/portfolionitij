import { skills } from "@/lib/data";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  SiPython, SiR, SiCplusplus, SiJavascript, SiTypescript, SiNodedotjs,
  SiPytorch, SiTensorflow, SiScikitlearn, SiOpencv,
  SiNumpy, SiPandas, SiTableau,
  SiMysql, SiMongodb, SiPostgresql, SiFirebase, SiSqlite,
  SiDocker, SiKubernetes, SiGit, SiJenkins, SiApacheairflow,
  SiFastapi, SiDjango, SiFlask,
  SiReact, SiStreamlit, SiHtml5, SiCss3, SiTailwindcss,
  SiC
} from "react-icons/si";
import { Brain, Sparkles, Database, Code2, BarChart3, Cloud, Layout, PieChart } from "lucide-react";

const iconMap: Record<string, any> = {
  python: SiPython,
  r: SiR,
  c: SiC,
  cpp: SiCplusplus,
  java: SiJavascript,
  javascript: SiJavascript,
  typescript: SiTypescript,
  sql: Database,
  nodejs: SiNodedotjs,
  pytorch: SiPytorch,
  tensorflow: SiTensorflow,
  sklearn: SiScikitlearn,
  opencv: SiOpencv,
  numpy: SiNumpy,
  pandas: SiPandas,
  tableau: SiTableau,
  powerbi: PieChart,
  mysql: SiMysql,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  firebase: SiFirebase,
  sqlite: SiSqlite,
  neo4j: Database,
  docker: SiDocker,
  kubernetes: SiKubernetes,
  aws: Cloud,
  git: SiGit,
  jenkins: SiJenkins,
  airflow: SiApacheairflow,
  fastapi: SiFastapi,
  django: SiDjango,
  flask: SiFlask,
  react: SiReact,
  streamlit: SiStreamlit,
  html: SiHtml5,
  css: SiCss3,
  tailwind: SiTailwindcss,
};

const categoryIcons: Record<string, any> = {
  genai: Sparkles,
  ml: Brain,
  backend: Code2,
  languages: Code2,
  frontend: Layout,
  data: BarChart3,
  databases: Database,
};

const categoryColors: Record<string, string> = {
  genai: "from-purple-500/20 to-pink-500/20",
  ml: "from-blue-500/20 to-cyan-500/20",
  backend: "from-green-500/20 to-emerald-500/20",
  languages: "from-orange-500/20 to-yellow-500/20",
  data: "from-indigo-500/20 to-violet-500/20",
  databases: "from-teal-500/20 to-green-500/20",
  frontend: "from-rose-500/20 to-orange-500/20",
};

export function SkillsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={cn("transition-all duration-700", isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-primary mb-2">04. SKILLS</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Tech Stack & Tools
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit spanning AI/ML frameworks, programming languages,
              cloud infrastructure, and data science tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([key, category], categoryIndex) => {
              const CategoryIcon = categoryIcons[key] || Cloud;
              return (
                <div
                  key={key}
                  className={cn(
                    "relative p-6 rounded-lg border border-border bg-gradient-to-br transition-all duration-500",
                    categoryColors[key] || "from-gray-500/20 to-slate-500/20",
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                  style={{ transitionDelay: `${categoryIndex * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-md bg-background/50 backdrop-blur">
                      <CategoryIcon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground">
                      {category.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill, skillIndex) => {
                      const SkillIcon = iconMap[skill.icon];
                      return (
                        <Badge
                          key={skill.name}
                          variant="secondary"
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 transition-all duration-300",
                            isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
                          )}
                          style={{ transitionDelay: `${(categoryIndex * 100) + (skillIndex * 30)}ms` }}
                        >
                          {SkillIcon && <SkillIcon className="w-3.5 h-3.5" />}
                          <span className="text-xs font-medium">{skill.name}</span>
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
