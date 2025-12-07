import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { emailService } from "./email";
import path from "path";
import fs from "fs";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional().default("Portfolio Contact"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const adminLoginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/admin/login", async (req, res) => {
    try {
      const result = adminLoginSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Validation failed", 
          details: result.error.errors 
        });
      }

      const { password } = result.data;
      const adminPassword = process.env.ADMIN_PASSWORD || "nitij2024";
      
      if (password === adminPassword) {
        return res.status(200).json({ 
          success: true, 
          message: "Authentication successful" 
        });
      } else {
        return res.status(401).json({ 
          error: "Invalid password" 
        });
      }
    } catch (error) {
      console.error("Admin login error:", error);
      return res.status(500).json({ 
        error: "Authentication failed. Please try again." 
      });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const result = contactFormSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          error: "Validation failed",
          details: result.error.errors
        });
      }

      const { name, email, subject, message } = result.data;

      const contactMessage = await storage.createContactMessage({
        name,
        email,
        subject,
        message,
      });

      // Send email notification
      try {
        await emailService.sendContactMessage({
          name,
          email,
          subject,
          message,
        });
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Don't fail the request if email fails, just log it
      }

      console.log("New contact message received:", {
        id: contactMessage.id,
        name,
        email,
        subject,
        timestamp: new Date().toISOString(),
      });

      return res.status(200).json({
        success: true,
        message: "Message sent successfully! I'll get back to you soon.",
        id: contactMessage.id
      });
    } catch (error) {
      console.error("Contact form error:", error);
      return res.status(500).json({
        error: "Failed to send message. Please try again later."
      });
    }
  });

  app.get("/api/resume", (req, res) => {
    try {
      const resumePath = path.join(process.cwd(), "attached_assets", "NitijTanejaResume.pdf");

      if (!fs.existsSync(resumePath)) {
        return res.status(404).json({ error: "Resume not found" });
      }

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'attachment; filename="Nitij_Taneja_Resume.pdf"');

      const fileStream = fs.createReadStream(resumePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error("Resume download error:", error);
      return res.status(500).json({ error: "Failed to download resume" });
    }
  });

  app.get("/api/github/stats", async (req, res) => {
    try {
      const username = "nitij-taneja";
      
      const userResponse = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          "Accept": "application/vnd.github.v3+json",
          "User-Agent": "Portfolio-App",
        },
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch GitHub user data");
      }

      const userData = await userResponse.json();

      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
        headers: {
          "Accept": "application/vnd.github.v3+json",
          "User-Agent": "Portfolio-App",
        },
      });

      let totalStars = 0;
      let languages: Record<string, number> = {};

      if (reposResponse.ok) {
        const repos = await reposResponse.json();
        for (const repo of repos) {
          totalStars += repo.stargazers_count || 0;
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
        }
      }

      const topLanguages = Object.entries(languages)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([name, count]) => ({ name, count }));

      return res.json({
        username: userData.login,
        avatarUrl: userData.avatar_url,
        publicRepos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        totalStars,
        topLanguages,
        profileUrl: userData.html_url,
        bio: userData.bio,
        company: userData.company,
        location: userData.location,
      });
    } catch (error) {
      console.error("GitHub stats error:", error);
      return res.status(500).json({ 
        error: "Failed to fetch GitHub stats",
        username: "nitij-taneja",
        publicRepos: 20,
        followers: 50,
        totalStars: 100,
        topLanguages: [
          { name: "Python", count: 15 },
          { name: "JavaScript", count: 5 },
        ],
      });
    }
  });

  app.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      return res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      return res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  return httpServer;
}
