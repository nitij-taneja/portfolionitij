import { useState } from "react";
import { Send, Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { SiLinkedin, SiGithub, SiKaggle, SiHackerrank, SiLeetcode, SiYoutube, SiInstagram, SiGeeksforgeeks } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { personalInfo } from "@/lib/data";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const socialLinks = [
  { name: "LinkedIn", icon: SiLinkedin, url: personalInfo.linkedin, color: "hover:text-[#0A66C2]" },
  { name: "GitHub", icon: SiGithub, url: personalInfo.github, color: "hover:text-foreground" },
  { name: "Kaggle", icon: SiKaggle, url: personalInfo.kaggle, color: "hover:text-[#20BEFF]" },
  { name: "HackerRank", icon: SiHackerrank, url: personalInfo.hackerrank, color: "hover:text-[#2EC866]" },
  { name: "LeetCode", icon: SiLeetcode, url: personalInfo.leetcode, color: "hover:text-[#FFA116]" },
  { name: "YouTube", icon: SiYoutube, url: personalInfo.youtube, color: "hover:text-[#FF0000]" },
  { name: "Instagram", icon: SiInstagram, url: personalInfo.instagram, color: "hover:text-[#E4405F]" },
  { name: "GeeksforGeeks", icon: SiGeeksforgeeks, url: personalInfo.geeksforgeeks, color: "hover:text-[#2F8D46]" },
];

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function ContactSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again or email me directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={cn("transition-all duration-700", isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
          <div className="text-center mb-16">
            <p className="text-sm font-mono text-primary mb-2">07. CONTACT</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Get In Touch
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, collaborations,
              or just having a chat about AI and technology.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <Card className="p-8">
              <h3 className="text-xl font-display font-semibold mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    data-testid="input-contact-name"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    data-testid="input-contact-email"
                    required
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    data-testid="input-contact-message"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={contactMutation.isPending}
                  data-testid="button-submit-contact"
                >
                  {contactMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-display font-semibold mb-6">Contact Info</h3>
                <div className="space-y-4">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover-elevate transition-colors"
                    data-testid="link-email-contact"
                  >
                    <div className="p-2 rounded-md bg-primary/10">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-foreground font-medium">{personalInfo.email}</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                    <div className="p-2 rounded-md bg-primary/10">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="text-foreground font-medium">{personalInfo.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                    <div className="p-2 rounded-md bg-primary/10">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-foreground font-medium">{personalInfo.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-display font-semibold mb-6">Connect With Me</h3>
                <div className="grid grid-cols-4 gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-lg bg-card border border-border text-muted-foreground transition-colors hover-elevate",
                        social.color
                      )}
                      aria-label={social.name}
                      data-testid={`link-social-${social.name.toLowerCase()}`}
                    >
                      <social.icon className="w-6 h-6" />
                      <span className="text-xs font-medium">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
