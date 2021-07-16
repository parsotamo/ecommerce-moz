const nodemailer = require('nodemailer');
const fs = require('fs');
const htmlToText = require("html-to-text");
const mustache = require("mustache");

module.exports = class Email{
    constructor(user, url){
        this.to = user.email;
        this.firstName = user.name.split(" ")[0];
        this.url = url;
        this.from = `Ilan Parso <${process.env.EMAIL_FROM}>`;
    }
    newTransport(){
        if (process.env.NODE_ENV === "production"){
            return nodemailer.createTransport({
                service: "SendGrid",
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD
                }
            })
        }else if(process.env.NODE_ENV === "development"){
            return nodemailer.createTransport({
                service: "SendGrid",
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD
                }
            })
        }
    }
    // Send the actual Email
    async send(template, subject){
        // 1) Render the Html based on a react template
            const data = fs.readFileSync(`${__dirname}/../public/${template}.html`, "utf-8");
            const html = mustache.render(data, {
                name: this.firstName,
                url: this.url,
                path: __dirname

            });

        // 2) Define email options
            const mailOptions = {
            from: this.from,
            subject,
            to: this.to,
            html,
            text: htmlToText.fromString(html)
        }

        // 3/ Create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }
    async sendWelcome(){
       await this.send("welcome", "Bem vindo ao Comércio Moz!");
    }
    async sendPasswordReset(){
        await this.send(
            "passwordReset",
            "Seu token para mudar de senha tem validade de apenas 10 minutos"
        )
    }
}
