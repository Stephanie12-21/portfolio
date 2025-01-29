import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

async function sendMessageContact(nom, email, phone, objet, message) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.SMTP_USER,
    subject: objet,

    html: `
 <div
    style="
      font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f0f4f8;
      border-radius: 10px;
      
    "
  >
    <div
      style="
        background: linear-gradient(to right, #ec4899, #7c3aed);
        padding: 30px;
        border-radius: 8px 8px 0 0;
        text-align: center;
        margin-bottom: 20px;
     "
    >
      <h1
        style="
        color: #ffffff;
        margin: 0;
        font-size: 28px;
        font-weight: bold;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
      "
      >
        Nouveau message depuis votre site 
      </h1>
    </div>

    <div
      style="padding: 30px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        line-height: 1.6;
        color: #333333;
    "
    >
      <p style="font-size: 24px; margin-bottom: 20px;">Bonjour Stéphanie,</p>

      <p style=" font-size: 16px; margin-bottom: 20px;">
        Vous avez reçu un nouveau message de la part de 
        <strong style="color: #ec4899;">
           ${nom}
        </strong>
      </p>

      <div
        style="
          background-color: #3e143e;
          border-left: 4px solid #d794de;
          padding: 15px;
          margin-bottom: 20px;
          border-radius: 0 8px 8px 0;
      "
      >
        <h2
          style="
            font-size: 18px;
            font-weight: bold;
            color: #d794de;
            margin-bottom: 10px;
          "
        >
          Message :
        </h2>
        <p
          style="
            font-size: 16px;
            margin-bottom: 0;
            whiteSpace: pre-wrap;
            color : #fcf6fd;
          "
        >
          ${message}
        </p>
      </div>

      <hr style=" border: 1px solid #e2e8f0; margin: 30px 0;" />

      <h2
        style="
          font-size: 20px;
          font-weight: bold;
          color: #d794de;
          margin-bottom: 15px;
        "
      >
        Informations de l'envoyeur :
      </h2>

      <table
        style="
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          line-height: 1.5;
          font-size: 16px
    "
      >
        <tr>
          <td
            style="
              padding: 8px;
              border-bottom: 1px solid #e2e8f0;
              font-weight: bold;
              width: 30%;
            "
          >
            Nom :
          </td>
          <td style=" padding: 8px; border-bottom: 1px solid #e2e8f0;">${nom}</td>
        </tr>
        
        <tr>
          <td
            style="
              padding: 8px;
              border-bottom: 1px solid #e2e8f0;
              font-weight: bold;
            "
          >
            Email :
          </td>
          <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; color: #fcf6fd !important;">
            ${email}
          </td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">Téléphone :</td>
          <td style=" padding: 8px;">${phone}</td>
        </tr>
      </table>

      
    </div>

    <div
      style="
        text-align: center;
        padding-top: 20px;
        color: #666;
        font-size: 12px;
      "
    >
      <p>© 2025 Adventures, conçu par Stéphanie MAMINIAINA.</p>
    </div>
  </div>

  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Message envoyé avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'envoi du message :", error);
    throw new Error("Erreur lors de l'envoi de l'e-mail");
  }
}

export async function POST(req) {
  const { nom, email, phone, objet, message } = await req.json();

  if (!nom || !email || !phone || !objet || !message) {
    return NextResponse.json(
      { error: "Tous les champs sont requis." },
      { status: 400 }
    );
  }

  try {
    await sendMessageContact(nom, email, phone, objet, message);
    return NextResponse.json(
      { message: "Message envoyé à l'administrateur avec succès" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
