import nodemailer from 'nodemailer';

/**
 * Configure Nodemailer Transporter
 * Supports Gmail, Hostinger, Titan, or custom SMTP configurations
 */
const getTransporter = () => {
  const user = process.env.EMAIL_USER || '';
  const pass = process.env.EMAIL_PASS || '';

  if (!user || !pass) {
    return null;
  }

  // If using Gmail
  if (user.endsWith('@gmail.com')) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    });
  }

  // If custom domain (like support@niharadaura.com)
  const host = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false
    }
  });
};

/**
 * Send 6-Digit OTP Email to Patron
 * @param {string} email - Recipient email
 * @param {string} otp - 6-digit OTP code
 * @param {string} fullName - Patron full name (optional)
 * @param {string} purpose - 'register' | 'login'
 */
export const sendOtpEmail = async (email, otp, fullName = '', purpose = 'login') => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[AUTH OTP] ${purpose} code generated for ${email}; valid for 10 minutes.`);
  }

  try {
    const transporter = getTransporter();
    if (!transporter) {
      console.error('[EmailService] Email transport is not configured.');
      return { sent: false, reason: 'Credentials not configured' };
    }

    const brandTitle = purpose === 'register' ? 'Welcome to Nihara D\'Aura' : 'Your Verification Code';
    const subTitle = purpose === 'register' 
      ? `Welcome ${fullName ? fullName : 'esteemed patron'} to the sanctuary of haute luxury.`
      : 'Use the one-time security code below to access your luxury account.';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #FAF8F5; margin: 0; padding: 24px; color: #1A1815; }
          .container { max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 24px; border: 1px solid #E5D2A8; overflow: hidden; box-shadow: 0 10px 30px rgba(133,95,20,0.08); }
          .header { background: linear-gradient(135deg, #1C1814, #2D2418); padding: 32px 24px; text-align: center; }
          .brand-name { color: #D4AF37; font-size: 26px; font-weight: bold; letter-spacing: 2px; margin: 0; font-family: Georgia, serif; }
          .brand-tagline { color: #C59B27; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; margin-top: 6px; }
          .content { padding: 36px 30px; text-align: center; }
          .title { font-size: 22px; font-weight: bold; color: #1A1815; margin: 0 0 12px 0; font-family: Georgia, serif; }
          .subtitle { font-size: 14px; color: #666; line-height: 1.6; margin: 0 0 28px 0; }
          .otp-card { background: #FAF5EB; border: 2px dashed #C59B27; border-radius: 16px; padding: 20px; margin: 20px 0; }
          .otp-label { font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; color: #855F14; margin-bottom: 8px; }
          .otp-code { font-size: 38px; font-weight: 800; letter-spacing: 10px; color: #855F14; font-family: monospace; }
          .expiry-note { font-size: 12px; color: #8C733E; margin-top: 10px; }
          .footer { background: #FCFBF8; padding: 20px; text-align: center; border-top: 1px solid #F0E6D2; font-size: 11px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="brand-name">Nihara D'Aura</h1>
            <div class="brand-tagline">Haute Jewellery • Bridal Makeup • Salon Sanctuary</div>
          </div>
          <div class="content">
            <h2 class="title">${brandTitle}</h2>
            <p class="subtitle">${subTitle}</p>
            <div class="otp-card">
              <div class="otp-label">Security Verification Code</div>
              <div class="otp-code">${otp}</div>
              <div class="expiry-note">⏱️ Valid for 10 minutes. Do not share this code.</div>
            </div>
            <p style="font-size: 12px; color: #888; margin-top: 24px;">If you did not request this OTP, please ignore this email.</p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Nihara D'Aura. All rights reserved.<br>
            Bespoke Luxury & Haute Beauty Sanctuary
          </div>
        </div>
      </body>
      </html>
    `;

    const info = await transporter.sendMail({
      from: `"Nihara D'Aura" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `✨ ${otp} is your Nihara D'Aura Verification Code`,
      text: `Your Nihara D'Aura verification code is ${otp}. Valid for 10 minutes.`,
      html: htmlContent
    });

    console.log(`[EmailService] ✅ Email dispatched successfully! Message ID: ${info.messageId}`);
    return { sent: true, messageId: info.messageId };
  } catch (err) {
    console.error(`[EmailService] ⚠️ SMTP Dispatch Notice: ${err.message}`);
    return { sent: false, error: err.message };
  }
};
