// Stub implementation - replace with real email service
export const sendVerificationEmail = async (email: string, token: string) => {
  console.log(`Sending verification email to ${email} with token: ${token}`);
  // Real implementation would use Nodemailer, SendGrid, etc.
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  console.log(`Sending password reset email to ${email} with token: ${token}`);
  // Real implementation would use email service
};