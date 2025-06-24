# SportMed Backend

Backend service for handling contact forms and email notifications for the SportMed website.

## Features

- Director contact form endpoint
- Email sending functionality
- Input validation
- CORS support
- Health check endpoint

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
PORT=3001
```

3. For Gmail, you'll need to:
   - Enable 2-factor authentication
   - Generate an App Password
   - Use the App Password in EMAIL_PASS

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### POST /api/contact/director
Send a message to the director.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+7 (123) 456-78-90",
  "subject": "General Inquiry",
  "message": "Hello, I would like to..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Email Configuration

The backend uses Nodemailer to send emails. Currently configured for Gmail, but can be adapted for other email services.

### Gmail Setup
1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Generate an App Password
4. Use the App Password in your .env file

### Other Email Services
You can modify the transporter configuration in `server.js` to use other email services like:
- Outlook/Hotmail
- Yahoo
- Custom SMTP server

## Frontend Integration

The frontend is configured to use this backend API. To enable backend email sending instead of mailto links:

1. Update the `EmailService.sendToDirectorAPI()` method in `src/lib/emailService.ts`
2. Set the correct API endpoint URL
3. Handle the response appropriately

## Security Considerations

- Use environment variables for sensitive data
- Implement rate limiting for production
- Add input sanitization
- Use HTTPS in production
- Consider adding CAPTCHA for spam prevention

## Deployment

This backend can be deployed to:
- Heroku
- Vercel
- Railway
- DigitalOcean
- AWS
- Any Node.js hosting platform

Make sure to set the environment variables in your deployment platform. 