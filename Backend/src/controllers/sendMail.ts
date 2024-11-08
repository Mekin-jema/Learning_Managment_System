import nodemailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
interface EMailOptions {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}
const sendMail = async (options: EMailOptions): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    service: process.env.SMTP_SERVICE,
    secure: process.env.SMTP_PORT === "465", // true for port 465, false for other ports
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const { email, subject, template, data } = options;
  //get the path to the email template file
  const templatePath = path.join(__dirname, "../mails", template);

  //Render the email template with EJS
  const html: string = await ejs.renderFile(templatePath, data);
  const emailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html,
  };
  await transporter.sendMail(emailOptions);
};
export default sendMail;
