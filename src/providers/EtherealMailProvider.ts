import nodemailer from 'nodemailer';
import { getMailClient } from '../lib/mail';
import { IMailProvider } from './IMailProvider';

export class EtherealMailProvider implements IMailProvider {
  async sendMail(to: string, subject: string, text: string, html: string) {
    const mailer = await getMailClient();
    const info = await mailer.sendMail({ from: '"DevStore" <noreply@devstore.com>', to, subject, text, html });
    return nodemailer.getTestMessageUrl(info);
  }
}
