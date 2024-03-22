import handlebars from "handlebars";
import * as fs from "fs";
import * as nodemailer from "nodemailer";
import {config} from "../../config";


export class ReportSendEmail {

    static async sendEmail(email: string, timeSheetDTO): Promise<void> {
        const templateHtml = fs.readFileSync('src/template.html', 'utf-8');
        // Compilar o template com Handlebars
        const template = handlebars.compile(templateHtml);
        const htmlFinal = template({timeSheetDTO});

        const transporter = nodemailer.createTransport({
            host: config.EMAIL_SMTP,
            port: 587,
            tls: {
                ciphers: "SSLv3",
                rejectUnauthorized: false,
            },
            auth: {
                user: config.EMAIL_FROM,
                pass: config.EMAIL_PASSWORD,
            },
        });

// Enviar o email
        transporter.sendMail({
            from: config.EMAIL_FROM,
            to: email,
            subject: 'Lista de Ponto',
            html: htmlFinal
        });

        console.log('Email enviado para: ', email);
    }

}