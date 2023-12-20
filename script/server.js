const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = 3000; // Порт, на якому буде працювати сервер

// Middleware для обробки даних з форми
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Налаштування транспортера Nodemailer для відправки листів
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kosanenkokola@gmail.com", // Ваша електронна адреса Gmail
    pass: "kalyasik1299", // Ваш пароль від Gmail
  },
});

// Обробка POST-запиту з форми
app.post("/submit-form", (req, res) => {
  const { email, name, phone } = req.body;

  // Налаштовуємо дані листа
  const mailOptions = {
    from: "your_email@gmail.com",
    to: "kosanenkokola@gmail.com", // Електронна адреса, куди ви хочете отримати дані
    subject: "New Order",
    html: `<p>Email: ${email}</p><p>ПБІ: ${name}</p><p>Номер телефону: ${phone}</p>`,
  };

  // Надсилаємо листа
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }

    res.status(200).send("Email sent: " + info.response);
  });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
