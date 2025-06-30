import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendAccountDeletionVerificationEmail = async (
  email: string,
  token: string
) => {
  const confirmLink = `${domain}/auth/confirm-account-deletion?token=${token}`;

  await resend.emails.send({
    from: "Skillpix <noreply@skillpix.com>",
    to: email,
    subject: "Confirm Account Deletion - Skillpix",
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center;">
        <img src="https://sitedata.skillpix.in/skillpix-logo.PNG" alt="Skillpix Logo" style="width: 100px; margin-bottom: 20px;">
        <h1>Confirm Account Deletion</h1>
        <p>We received a request to delete your Skillpix account. This action is <strong>permanent</strong> and cannot be undone.</p>
        <p>If you want to proceed with deleting your account, please click the button below to confirm.</p>
        <p style="color: #dc3545; font-weight: bold;">Warning: This will permanently delete all your data, progress, and account information.</p>
        <p>Note: Link will expire in 1 hour! If you did not request account deletion, please ignore this email and your account will remain safe.</p>
        <a href="${confirmLink}" style="display: inline-block; padding: 10px 20px; margin-top: 20px; color: white; background-color: #dc3545; text-decoration: none; border-radius: 5px;">Confirm Account Deletion</a>
        <p style="margin-top: 30px; font-size: 14px; color: #666;">If you're having issues with your account, consider contacting our support team instead of deleting your account.</p>
      </div>
    `,
  });
};
