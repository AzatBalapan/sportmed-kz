const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Director contact endpoint
app.post('/api/contact/director', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'smo@csmed.kz', // Director's email
      subject: `Обращение к директору: ${subject}`,
      html: `
        <h2>Новое обращение к директору</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Тема:</strong> ${subject}</p>
        <p><strong>Сообщение:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Это сообщение отправлено с сайта ГККП "СПОРТИВНЫЙ МЕДИЦИНСКИЙ ЦЕНТР ГОРОДА АСТАНЫ"</em></p>
        <p><em>Время отправки: ${new Date().toLocaleString('ru-RU')}</em></p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Ваше обращение к директору получено',
      html: `
        <h2>Уважаемый(ая) ${name}!</h2>
        <p>Ваше обращение к директору ГККП "СПОРТИВНЫЙ МЕДИЦИНСКИЙ ЦЕНТР ГОРОДА АСТАНЫ" успешно получено.</p>
        <p><strong>Тема:</strong> ${subject}</p>
        <p><strong>Ваше сообщение:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <p>Мы рассмотрим ваше обращение и свяжемся с вами в ближайшее время.</p>
        <hr>
        <p><em>С уважением,<br>Команда ГККП "СПОРТИВНЫЙ МЕДИЦИНСКИЙ ЦЕНТР ГОРОДА АСТАНЫ"</em></p>
      `
    };

    await transporter.sendMail(userMailOptions);

    res.json({
      success: true,
      message: 'Message sent successfully'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; 