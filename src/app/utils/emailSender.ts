 import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async(to:string,html:string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure:true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "mmehedihasanjoyv@gmail.com",
          pass: config.app_password,
        },
    });
    await transporter.sendMail({
        from: 'mmehedihasanjoyv@gmail.com', // sender address
        to, // list of receivers
        subject: "Reset your password withing 5 minutes", // Subject line
        text: "", // plain text body
        html, // html body
      });
}