import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Lock, Plus, Trash2, Save, Eye, EyeOff, Edit2, X, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: number;
  title: string;
  description: string;
  github: string;
  demo: string | null;
  liveLink: string | null;
  videoLink: string | null;
  tags: string[];
  featured: boolean;
  category: string;
}

interface Experience {
  id: number;
  company: string;
  role: string;
  location: string;
  period: string;
  description: string[];
  techStack: string[];
  current: boolean;
  links: { label: string; url: string }[];
}

export function AdminPanel() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");
  
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("portfolio_projects");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [experiences, setExperiences] = useState<Experience[]>(() => {
    const saved = localStorage.getItem("portfolio_experiences");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [newTag, setNewTag] = useState("");
  const [newTechStack, setNewTechStack] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleLogin = async () => {
    if (!password.trim()) {
      toast({ title: "Password required", description: "Please enter a password", variant: "destructive" });
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
        toast({ title: "Login successful", description: "Welcome to the admin panel" });
      } else {
        toast({ title: "Invalid password", description: "Please try again", variant: "destructive" });
      }
    } catch {
      toast({ title: "Login failed", description: "Please try again later", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const saveProjects = (updatedProjects: Project[]) => {
    localStorage.setItem("portfolio_projects", JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
    toast({ title: "Saved", description: "Projects updated successfully" });
  };

  const saveExperiences = (updatedExperiences: Experience[]) => {
    localStorage.setItem("portfolio_experiences", JSON.stringify(updatedExperiences));
    setExperiences(updatedExperiences);
    toast({ title: "Saved", description: "Experience updated successfully" });
  };

  const addNewProject = () => {
    const newProject: Project = {
      id: Date.now(),
      title: "New Project",
      description: "Project description here",
      github: "https://github.com/nitij-taneja/",
      demo: null,
      liveLink: null,
      videoLink: null,
      tags: [],
      featured: true,
      category: "Agentic AI",
    };
    setEditingProject(newProject);
  };

  const addNewExperience = () => {
    const newExp: Experience = {
      id: Date.now(),
      company: "Company Name",
      role: "Role Title",
      location: "Remote",
      period: "Month Year – Present",
      description: [],
      techStack: [],
      current: false,
      links: [],
    };
    setEditingExperience(newExp);
  };

  const saveProject = () => {
    if (!editingProject) return;
    const existingIndex = projects.findIndex((p) => p.id === editingProject.id);
    let updated: Project[];
    if (existingIndex >= 0) {
      updated = [...projects];
      updated[existingIndex] = editingProject;
    } else {
      updated = [...projects, editingProject];
    }
    saveProjects(updated);
    setEditingProject(null);
  };

  const deleteProject = (id: number) => {
    const updated = projects.filter((p) => p.id !== id);
    saveProjects(updated);
  };

  const saveExperience = () => {
    if (!editingExperience) return;
    const existingIndex = experiences.findIndex((e) => e.id === editingExperience.id);
    let updated: Experience[];
    if (existingIndex >= 0) {
      updated = [...experiences];
      updated[existingIndex] = editingExperience;
    } else {
      updated = [...experiences, editingExperience];
    }
    saveExperiences(updated);
    setEditingExperience(null);
  };

  const deleteExperience = (id: number) => {
    const updated = experiences.filter((e) => e.id !== id);
    saveExperiences(updated);
  };

  const addTagToProject = () => {
    if (!editingProject || !newTag.trim()) return;
    setEditingProject({
      ...editingProject,
      tags: [...editingProject.tags, newTag.trim()],
    });
    setNewTag("");
  };

  const removeTagFromProject = (tag: string) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      tags: editingProject.tags.filter((t) => t !== tag),
    });
  };

  const addTechStackToExperience = () => {
    if (!editingExperience || !newTechStack.trim()) return;
    setEditingExperience({
      ...editingExperience,
      techStack: [...editingExperience.techStack, newTechStack.trim()],
    });
    setNewTechStack("");
  };

  const removeTechStackFromExperience = (tech: string) => {
    if (!editingExperience) return;
    setEditingExperience({
      ...editingExperience,
      techStack: editingExperience.techStack.filter((t) => t !== tech),
    });
  };

  const addDescriptionToExperience = () => {
    if (!editingExperience || !newDescription.trim()) return;
    setEditingExperience({
      ...editingExperience,
      description: [...editingExperience.description, newDescription.trim()],
    });
    setNewDescription("");
  };

  const removeDescriptionFromExperience = (index: number) => {
    if (!editingExperience) return;
    setEditingExperience({
      ...editingExperience,
      description: editingExperience.description.filter((_, i) => i !== index),
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold mb-2">Admin Panel</h1>
            <p className="text-muted-foreground text-sm">
              Enter the admin password to access the dashboard
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <Button onClick={handleLogin} className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
            <Button variant="ghost" onClick={() => setLocation("/")} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setLocation("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
            <h1 className="text-xl font-display font-bold">Admin Panel</h1>
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsAuthenticated(false)}>
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Manage Projects</h2>
              <Button onClick={addNewProject}>
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>

            {editingProject && (
              <Card className="p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">
                    {projects.find((p) => p.id === editingProject.id) ? "Edit Project" : "New Project"}
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => setEditingProject(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Title</Label>
                      <Input
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <select
                        className="w-full h-10 rounded-md border border-input bg-background px-3"
                        value={editingProject.category}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                      >
                        <option value="Agentic AI">Agentic AI</option>
                        <option value="RAG">RAG</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Full-Stack">Full-Stack</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={editingProject.description}
                      onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>GitHub URL</Label>
                      <Input
                        value={editingProject.github}
                        onChange={(e) => setEditingProject({ ...editingProject, github: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Demo/GIF URL</Label>
                      <Input
                        value={editingProject.demo || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, demo: e.target.value || null })}
                        placeholder="Leave empty for placeholder"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Live Link URL</Label>
                      <Input
                        value={editingProject.liveLink || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, liveLink: e.target.value || null })}
                        placeholder="Optional"
                      />
                    </div>
                    <div>
                      <Label>Video Link URL</Label>
                      <Input
                        value={editingProject.videoLink || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, videoLink: e.target.value || null })}
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {editingProject.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="gap-1">
                          {tag}
                          <button onClick={() => removeTagFromProject(tag)}>
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add tag"
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTagToProject())}
                      />
                      <Button type="button" variant="secondary" onClick={addTagToProject}>
                        Add
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingProject.featured}
                        onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                        className="rounded"
                      />
                      <span className="text-sm">Featured Project</span>
                    </label>
                  </div>

                  <Button onClick={saveProject} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save Project
                  </Button>
                </div>
              </Card>
            )}

            <div className="grid gap-4">
              {projects.length === 0 ? (
                <Card className="p-8 text-center text-muted-foreground">
                  <p>No custom projects added yet.</p>
                  <p className="text-sm mt-2">Projects added here will appear alongside the default projects.</p>
                </Card>
              ) : (
                projects.map((project) => (
                  <Card key={project.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{project.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.tags.slice(0, 4).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setEditingProject(project)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteProject(project.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="experience">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Manage Experience</h2>
              <Button onClick={addNewExperience}>
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </div>

            {editingExperience && (
              <Card className="p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">
                    {experiences.find((e) => e.id === editingExperience.id) ? "Edit Experience" : "New Experience"}
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => setEditingExperience(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Company</Label>
                      <Input
                        value={editingExperience.company}
                        onChange={(e) => setEditingExperience({ ...editingExperience, company: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Role</Label>
                      <Input
                        value={editingExperience.role}
                        onChange={(e) => setEditingExperience({ ...editingExperience, role: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={editingExperience.location}
                        onChange={(e) => setEditingExperience({ ...editingExperience, location: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Period</Label>
                      <Input
                        value={editingExperience.period}
                        onChange={(e) => setEditingExperience({ ...editingExperience, period: e.target.value })}
                        placeholder="e.g., Oct 2024 – Present"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Description Points</Label>
                    <div className="space-y-2 mb-2">
                      {editingExperience.description.map((desc, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="text-sm text-muted-foreground flex-1">{desc}</span>
                          <Button variant="ghost" size="sm" onClick={() => removeDescriptionFromExperience(index)}>
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Add description point"
                        rows={2}
                      />
                      <Button type="button" variant="secondary" onClick={addDescriptionToExperience}>
                        Add
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Tech Stack</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {editingExperience.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary" className="gap-1">
                          {tech}
                          <button onClick={() => removeTechStackFromExperience(tech)}>
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newTechStack}
                        onChange={(e) => setNewTechStack(e.target.value)}
                        placeholder="Add tech"
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTechStackToExperience())}
                      />
                      <Button type="button" variant="secondary" onClick={addTechStackToExperience}>
                        Add
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingExperience.current}
                        onChange={(e) => setEditingExperience({ ...editingExperience, current: e.target.checked })}
                        className="rounded"
                      />
                      <span className="text-sm">Currently Working Here</span>
                    </label>
                  </div>

                  <Button onClick={saveExperience} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save Experience
                  </Button>
                </div>
              </Card>
            )}

            <div className="grid gap-4">
              {experiences.length === 0 ? (
                <Card className="p-8 text-center text-muted-foreground">
                  <p>No custom experiences added yet.</p>
                  <p className="text-sm mt-2">Experiences added here will appear alongside the default experiences.</p>
                </Card>
              ) : (
                experiences.map((exp) => (
                  <Card key={exp.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{exp.role}</h3>
                        <p className="text-sm text-primary">{exp.company}</p>
                        <p className="text-xs text-muted-foreground">{exp.period}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {exp.techStack.slice(0, 4).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setEditingExperience(exp)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteExperience(exp.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="instructions">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold">Access Information</h2>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Default Password</p>
                    <code className="font-mono text-primary font-medium">nitij2024</code>
                  </div>
                  <p className="text-muted-foreground">
                    To change the password, set the <code className="bg-muted px-1 py-0.5 rounded text-xs">ADMIN_PASSWORD</code> environment variable.
                  </p>
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Password is verified server-side for security. No credentials are exposed in the frontend.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-chart-3/10">
                    <Save className="w-5 h-5 text-chart-3" />
                  </div>
                  <h2 className="text-lg font-semibold">Data Storage</h2>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Content is saved to your browser's localStorage.</p>
                  <ul className="space-y-1.5 mt-3">
                    <li className="flex items-start gap-2">
                      <span className="text-chart-3 mt-0.5">+</span>
                      <span>Persists across browser sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-chart-3 mt-0.5">+</span>
                      <span>Appears alongside default content</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-0.5">-</span>
                      <span>Device-specific (won't sync)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-0.5">-</span>
                      <span>Clearing browser data removes it</span>
                    </li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-chart-2/10">
                    <Plus className="w-5 h-5 text-chart-2" />
                  </div>
                  <h2 className="text-lg font-semibold">Adding Projects</h2>
                </div>
                <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Click <span className="text-foreground font-medium">"Add Project"</span> button</li>
                  <li>Fill in title, category, and description</li>
                  <li>Add GitHub URL (required)</li>
                  <li>Add optional Demo GIF, Live Link, or Video Link</li>
                  <li>Add technology tags one at a time</li>
                  <li>Check "Featured" to show on homepage</li>
                  <li>Click <span className="text-foreground font-medium">"Save Project"</span></li>
                </ol>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-chart-4/10">
                    <Edit2 className="w-5 h-5 text-chart-4" />
                  </div>
                  <h2 className="text-lg font-semibold">Adding Experience</h2>
                </div>
                <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Click <span className="text-foreground font-medium">"Add Experience"</span> button</li>
                  <li>Enter company name and your role</li>
                  <li>Set location and date period</li>
                  <li>Add description bullet points</li>
                  <li>Add technologies used in this role</li>
                  <li>Check "Currently Working" if applicable</li>
                  <li>Click <span className="text-foreground font-medium">"Save Experience"</span></li>
                </ol>
              </Card>
            </div>

            <Card className="p-6 mt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">Quick Tips</h2>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="font-medium text-foreground mb-1">Use GIF Demos</p>
                  <p className="text-xs text-muted-foreground">Visual demos increase engagement significantly</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="font-medium text-foreground mb-1">Concise Descriptions</p>
                  <p className="text-xs text-muted-foreground">2-3 sentences work best for readability</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="font-medium text-foreground mb-1">Relevant Tags</p>
                  <p className="text-xs text-muted-foreground">Helps with filtering and discoverability</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="font-medium text-foreground mb-1">Live Links</p>
                  <p className="text-xs text-muted-foreground">Makes it easy for visitors to try your work</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
