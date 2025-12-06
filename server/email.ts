import nodemailer from 'nodemailer';

interface ContactMessage {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD, // App password, not regular password
      },
    });
  }

  async sendContactMessage(contactMessage: ContactMessage) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'tanejanitij4002@gmail.com',
        subject: `New Contact Message from ${contactMessage.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Contact Message</h2>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${contactMessage.name}</p>
              <p><strong>Email:</strong> ${contactMessage.email}</p>
              <p><strong>Subject:</strong> ${contactMessage.subject || 'Portfolio Contact'}</p>
              <p><strong>Message:</strong></p>
              <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
                ${contactMessage.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <p style="color: #666; font-size: 14px;">
              This message was sent from your portfolio contact form.
            </p>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);
      console.log('Contact email sent successfully');
    } catch (error) {
      console.error('Failed to send contact email:', error);
      throw error;
    }
  }

  async verifyConnection() {
    try {
      await this.transporter.verify();
      console.log('Email service connected successfully');
      return true;
    } catch (error) {
      console.error('Email service connection failed:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();
