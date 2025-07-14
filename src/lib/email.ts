import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const mailOptions = {
      from: `"Dollup" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}

// Email Templates
export const emailTemplates = {
  bookingConfirmation: (data: {
    customerName: string;
    service: string;
    date: string;
    time: string;
    amount: number;
  }) => ({
    subject: 'Booking Confirmation - Dollup',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4e4528; font-size: 32px; margin: 0;">Dollup</h1>
          <p style="color: #8b7355; margin: 5px 0;">Professional Makeup Artistry</p>
        </div>
        
        <div style="background: #f8f6f0; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #2c2c2c; margin-top: 0;">Booking Confirmed!</h2>
          <p style="color: #6b6b6b;">Hi ${data.customerName},</p>
          <p style="color: #6b6b6b;">Your booking has been confirmed. Here are the details:</p>
        </div>
        
        <div style="background: white; border: 1px solid #e8d5b7; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #2c2c2c; margin-top: 0;">Booking Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><strong>Service:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${data.service}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><strong>Date:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${data.date}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><strong>Time:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${data.time}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0;"><strong>Amount:</strong></td>
              <td style="padding: 10px 0; color: #d4a574; font-weight: bold;">₹${data.amount.toLocaleString()}</td>
            </tr>
          </table>
        </div>
        
        <div style="background: #e8f5e8; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
          <p style="color: #2d5a2d; margin: 0;"><strong>Payment Status:</strong> Confirmed</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #6b6b6b;">Thank you for choosing Dollup!</p>
          <p style="color: #8b7355; font-size: 14px;">For any questions, please contact us at support@dollup.com</p>
        </div>
      </div>
    `,
    text: `
      Booking Confirmed - Dollup
      
      Hi ${data.customerName},
      
      Your booking has been confirmed. Here are the details:
      
      Service: ${data.service}
      Date: ${data.date}
      Time: ${data.time}
      Amount: ₹${data.amount.toLocaleString()}
      
      Payment Status: Confirmed
      
      Thank you for choosing Dollup!
      For any questions, please contact us at support@dollup.com
    `
  }),

  artistNotification: (data: {
    artistName: string;
    customerName: string;
    service: string;
    date: string;
    time: string;
    amount: number;
    customerEmail: string;
    customerPhone: string;
  }) => ({
    subject: 'New Booking Received - Dollup',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4e4528; font-size: 32px; margin: 0;">Dollup</h1>
          <p style="color: #8b7355; margin: 5px 0;">Professional Makeup Artistry</p>
        </div>
        
        <div style="background: #f8f6f0; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #2c2c2c; margin-top: 0;">New Booking Alert!</h2>
          <p style="color: #6b6b6b;">Hi ${data.artistName},</p>
          <p style="color: #6b6b6b;">You have received a new booking. Here are the details:</p>
        </div>
        
        <div style="background: white; border: 1px solid #e8d5b7; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #2c2c2c; margin-top: 0;">Booking Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><strong>Customer:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${data.customerName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><strong>Email:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${data.customerEmail}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><strong>Phone:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${data.customerPhone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><strong>Service:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${data.service}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><strong>Date:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${data.date}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><strong>Time:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${data.time}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0;"><strong>Amount:</strong></td>
              <td style="padding: 10px 0; color: #d4a574; font-weight: bold;">₹${data.amount.toLocaleString()}</td>
            </tr>
          </table>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/artist/dashboard" 
             style="background: #d4a574; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
            View in Dashboard
          </a>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #6b6b6b;">Please prepare for your upcoming appointment!</p>
          <p style="color: #8b7355; font-size: 14px;">For any questions, please contact us at support@dollup.com</p>
        </div>
      </div>
    `,
    text: `
      New Booking Alert - Dollup
      
      Hi ${data.artistName},
      
      You have received a new booking. Here are the details:
      
      Customer: ${data.customerName}
      Email: ${data.customerEmail}
      Phone: ${data.customerPhone}
      Service: ${data.service}
      Date: ${data.date}
      Time: ${data.time}
      Amount: ₹${data.amount.toLocaleString()}
      
      Please prepare for your upcoming appointment!
      For any questions, please contact us at support@dollup.com
    `
  }),

  artistApproval: (data: {
    artistName: string;
    artistEmail: string;
  }) => ({
    subject: 'Artist Account Approved - Dollup',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4e4528; font-size: 32px; margin: 0;">Dollup</h1>
          <p style="color: #8b7355; margin: 5px 0;">Professional Makeup Artistry</p>
        </div>
        
        <div style="background: #e8f5e8; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #2d5a2d; margin-top: 0;">🎉 Congratulations!</h2>
          <p style="color: #2d5a2d;">Hi ${data.artistName},</p>
          <p style="color: #2d5a2d;">Your artist account has been approved! You can now start receiving bookings.</p>
        </div>
        
        <div style="background: white; border: 1px solid #e8d5b7; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #2c2c2c; margin-top: 0;">Next Steps:</h3>
          <ul style="color: #6b6b6b; line-height: 1.6;">
            <li>Complete your profile and portfolio</li>
            <li>Set up your services and pricing</li>
            <li>Configure your availability</li>
            <li>Start receiving bookings from customers</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/artist/dashboard" 
             style="background: #d4a574; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
            Access Dashboard
          </a>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #6b6b6b;">Welcome to the Dollup artist community!</p>
          <p style="color: #8b7355; font-size: 14px;">For any questions, please contact us at support@dollup.com</p>
        </div>
      </div>
    `,
    text: `
      Artist Account Approved - Dollup
      
      Hi ${data.artistName},
      
      Congratulations! Your artist account has been approved! You can now start receiving bookings.
      
      Next Steps:
      - Complete your profile and portfolio
      - Set up your services and pricing
      - Configure your availability
      - Start receiving bookings from customers
      
      Welcome to the Dollup artist community!
      For any questions, please contact us at support@dollup.com
    `
  }),

  contactResponse: (data: {
    name: string;
    email: string;
    message: string;
  }) => ({
    subject: 'Thank you for contacting Dollup',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4e4528; font-size: 32px; margin: 0;">Dollup</h1>
          <p style="color: #8b7355; margin: 5px 0;">Professional Makeup Artistry</p>
        </div>
        
        <div style="background: #f8f6f0; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #2c2c2c; margin-top: 0;">Thank You for Contacting Us!</h2>
          <p style="color: #6b6b6b;">Hi ${data.name},</p>
          <p style="color: #6b6b6b;">We have received your message and will get back to you within 24 hours.</p>
        </div>
        
        <div style="background: white; border: 1px solid #e8d5b7; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #2c2c2c; margin-top: 0;">Your Message:</h3>
          <p style="color: #6b6b6b; font-style: italic;">"${data.message}"</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #6b6b6b;">Our team will review your message and respond promptly.</p>
          <p style="color: #8b7355; font-size: 14px;">For urgent matters, please call us at +91 77096 16260</p>
        </div>
      </div>
    `,
    text: `
      Thank you for contacting Dollup
      
      Hi ${data.name},
      
      We have received your message and will get back to you within 24 hours.
      
      Your Message: "${data.message}"
      
      Our team will review your message and respond promptly.
      For urgent matters, please call us at +91 77096 16260
    `
  })
};

// Helper functions for sending specific emails
export async function sendBookingConfirmation(data: {
  customerEmail: string;
  customerName: string;
  service: string;
  date: string;
  time: string;
  amount: number;
}) {
  const template = emailTemplates.bookingConfirmation(data);
  return await sendEmail({
    to: data.customerEmail,
    subject: template.subject,
    html: template.html,
    text: template.text
  });
}

export async function sendArtistNotification(data: {
  artistEmail: string;
  artistName: string;
  customerName: string;
  service: string;
  date: string;
  time: string;
  amount: number;
  customerEmail: string;
  customerPhone: string;
}) {
  const template = emailTemplates.artistNotification(data);
  return await sendEmail({
    to: data.artistEmail,
    subject: template.subject,
    html: template.html,
    text: template.text
  });
}

export async function sendArtistApproval(data: {
  artistEmail: string;
  artistName: string;
}) {
  const template = emailTemplates.artistApproval(data);
  return await sendEmail({
    to: data.artistEmail,
    subject: template.subject,
    html: template.html,
    text: template.text
  });
}

export async function sendContactResponse(data: {
  email: string;
  name: string;
  message: string;
}) {
  const template = emailTemplates.contactResponse(data);
  return await sendEmail({
    to: data.email,
    subject: template.subject,
    html: template.html,
    text: template.text
  });
} 