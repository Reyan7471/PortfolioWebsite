import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;

      // Validate required fields
      if (!name || !email || !message) {
        return res.status(400).json({ 
          message: "Name, email, and message are required" 
        });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          message: "Please provide a valid email address" 
        });
      }

      // In a real application, you would:
      // 1. Save to database
      // 2. Send email notification
      // 3. Integrate with email service (SendGrid, etc.)
      
      console.log("Contact form submission:", {
        name,
        email,
        message,
        timestamp: new Date().toISOString()
      });

      res.status(200).json({
        message: "Message sent successfully",
        success: true
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({
        message: "Internal server error. Please try again later."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
