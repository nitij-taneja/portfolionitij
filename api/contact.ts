import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional().default("Portfolio Contact"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const result = contactFormSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: result.error.errors
      });
    }

    const { name, email, subject, message } = result.data;

    // Send email notification
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'tanejanitij4002@gmail.com',
        subject: `New Contact Message from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Contact Message</h2>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject || 'Portfolio Contact'}</p>
              <p><strong>Message:</strong></p>
              <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <p style="color: #666; font-size: 14px;">
              This message was sent from your portfolio contact form.
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      // Don't fail the request if email fails
    }

    console.log("New contact message received:", {
      name,
      email,
      subject,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      error: "Failed to send message. Please try again later."
    });
  }
}
