import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendEmail({ to, subject, text, html }) {
  const msg = {
    to,
    from: process.env.EMAIL_FROM,
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}
