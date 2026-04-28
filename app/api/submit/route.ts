import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function generateHTMLEmail(name: string, topValues: any[]): string {
  const valuesHTML = topValues.map((val: any, i: number) => `
    <div style="margin-bottom: 20px; padding: 15px; background: rgba(25, 146, 176, 0.1); border-left: 4px solid #DF9317; border-radius: 4px;">
      <h3 style="color: #DF9317; margin-top: 0; font-family: sans-serif; letter-spacing: 1px;">${i + 1}. ${val.name}</h3>
      <p style="color: #4a5568; margin-bottom: 0; line-height: 1.5;">${val.description}</p>
    </div>
  `).join('');

  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <!-- Header -->
      <div style="background-color: #104E5B; padding: 40px 20px; text-align: center;">
        <h1 style="color: #DF9317; margin: 0; font-size: 28px; letter-spacing: 2px; text-transform: uppercase;">THAY ĐỔI TÂM THỨC</h1>
        <p style="color: #ffffff; opacity: 0.9; margin-top: 10px; font-size: 16px;">La bàn dẫn lối cuộc đời bạn</p>
      </div>
      
      <!-- Body -->
      <div style="padding: 40px 30px;">
        <h2 style="color: #2d3748; margin-top: 0;">Xin chào ${name},</h2>
        <p style="color: #4a5568; line-height: 1.6; font-size: 16px;">
          Cảm ơn bạn đã dành thời gian tĩnh lặng và gọi tên những giá trị sâu sắc nhất của mình. 
          Đây không chỉ là những từ ngữ, mà là ngọn hải đăng cho những quyết định sắp tới của bạn.
        </p>
        
        <h3 style="color: #1992B0; margin-top: 30px; margin-bottom: 20px; text-transform: uppercase; font-size: 14px; letter-spacing: 1px;">5 Giá Trị Cốt Lõi Của Bạn</h3>
        
        ${valuesHTML}
        
        <div style="margin-top: 40px; text-align: center; padding: 20px; background-color: #f7fafc; border-radius: 8px;">
          <p style="color: #4a5568; line-height: 1.6; margin-bottom: 15px;">
            Hãy tiếp tục hành trình nuôi dưỡng tâm thức cùng chúng tôi.
          </p>
          <a href="https://thaydoitamthuc.com" style="display: inline-block; background-color: #DF9317; color: #104E5B; text-decoration: none; padding: 12px 25px; border-radius: 50px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; font-size: 14px;">Trở về trang chủ</a>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #f7fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="color: #a0aec0; font-size: 12px; margin: 0;">
          THAY ĐỔI TÂM THỨC Team &copy; ${new Date().getFullYear()}<br/>
          Hành trình của bạn, La bàn của bạn.
        </p>
      </div>
    </div>
  `;
}

export async function POST(req: Request) {
  try {
    const { name, email, phone, topValues, scenarioAnswers } = await req.json();

    // 1. Send data to Google Sheets via Webhook (Google Apps Script)
    const sheetsWebhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL;
    
    if (sheetsWebhookUrl) {
      try {
        await fetch(sheetsWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            name,
            email,
            phone,
            topValues: topValues.map((v: any) => v.name).join(', '),
          }),
        });
        console.log('Saved to Google Sheets');
      } catch (e) {
        console.error('Error saving to sheets:', e);
      }
    }

    // 3. Send Email using Nodemailer
    const SMTP_EMAIL = process.env.SMTP_EMAIL;
    const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

    if (!SMTP_EMAIL || !SMTP_PASSWORD) {
       console.log('Email feature requires SMTP_EMAIL and SMTP_PASSWORD environment variables.');
       // We'll still return success for the demo even if email skips
       return NextResponse.json({ success: true, message: 'Saved successfully, skipped email (missing credentials).' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail', // Defaults to Gmail
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD, // Use an App Password, not regular password
      },
    });

    const mailOptions: any = {
      from: `"THAY ĐỔI TÂM THỨC" <${SMTP_EMAIL}>`,
      to: email,
      subject: 'Kết Quả La Bàn Nội Tâm Của Bạn - Thay Đổi Tâm Thức',
      html: generateHTMLEmail(name, topValues),
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully!');
    } catch (emailError: any) {
      console.error('Error sending email:', emailError);
      return NextResponse.json({ success: true, message: 'Saved successfully, but email failed to send.', email_error: emailError.message });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to submit:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
