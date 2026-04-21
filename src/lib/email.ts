import nodemailer from 'nodemailer';

// ── SMTP Transport ─────────────────────────────────────────────────────────
function createTransport() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
    port:   Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// ── Shared HTML shell ─────────────────────────────────────────────────────
function htmlShell(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f0;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1a1a2e 0%,#2a1a0e 100%);padding:32px 40px;">
            <span style="font-size:22px;font-weight:800;letter-spacing:-0.5px;color:#ffffff;">
              Str<span style="color:#FF4800;">a</span>veda
            </span>
            <p style="margin:6px 0 0;font-size:12px;color:rgba(255,255,255,0.5);letter-spacing:0.1em;text-transform:uppercase;">
              ${title}
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            ${body}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8f8fc;padding:20px 40px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:11px;color:#9ca3af;text-align:center;">
              This email was generated automatically by Straveda's website.<br/>
              © ${new Date().getFullYear()} Straveda Tech · Pune, Maharashtra, India
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function field(label: string, value: string) {
  return `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #f0f0f4;">
      <p style="margin:0 0 3px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#9ca3af;">${label}</p>
      <p style="margin:0;font-size:14px;color:#1a1a2e;">${value || '—'}</p>
    </td>
  </tr>`;
}

// ── Contact Enquiry Email ─────────────────────────────────────────────────
export interface ContactEmailData {
  name:    string;
  company: string;
  email:   string;
  phone:   string;
  service: string;
  message: string;
}

export async function sendContactEmail(data: ContactEmailData) {
  const transport = createTransport();

  const body = `
    <h2 style="margin:0 0 6px;font-size:20px;font-weight:700;color:#1a1a2e;">New Enquiry Received</h2>
    <p style="margin:0 0 28px;font-size:14px;color:#6b7280;">Someone filled out the contact form on straveda.com</p>

    <table width="100%" cellpadding="0" cellspacing="0">
      ${field('Name',    data.name)}
      ${field('Company', data.company)}
      ${field('Email',   `<a href="mailto:${data.email}" style="color:#FF4800;">${data.email}</a>`)}
      ${field('Phone',   data.phone || 'Not provided')}
      ${field('Service of Interest', data.service)}
    </table>

    <div style="margin-top:24px;">
      <p style="margin:0 0 8px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#9ca3af;">Message</p>
      <div style="background:#f8f8fc;border-left:3px solid #FF4800;border-radius:0 8px 8px 0;padding:16px 20px;">
        <p style="margin:0;font-size:14px;color:#1a1a2e;line-height:1.7;white-space:pre-wrap;">${data.message}</p>
      </div>
    </div>

    <div style="margin-top:32px;text-align:center;">
      <a href="mailto:${data.email}" style="display:inline-block;background:#FF4800;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:600;">
        Reply to ${data.name} →
      </a>
    </div>`;

  await transport.sendMail({
    from:    `"Straveda Website" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to:      process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    replyTo: data.email,
    subject: `New Enquiry from ${data.name} — ${data.service}`,
    html:    htmlShell('New Contact Enquiry', body),
  });

  // Auto-reply to the sender
  await transport.sendMail({
    from:    `"Straveda" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to:      data.email,
    subject: `We received your message, ${data.name.split(' ')[0]}!`,
    html: htmlShell('Message Received', `
      <h2 style="margin:0 0 6px;font-size:20px;font-weight:700;color:#1a1a2e;">Thanks for reaching out!</h2>
      <p style="margin:0 0 20px;font-size:14px;color:#6b7280;line-height:1.7;">
        Hi ${data.name.split(' ')[0]}, we've received your enquiry about <strong style="color:#1a1a2e;">${data.service}</strong>.
        Our team will review it and get back to you within <strong style="color:#1a1a2e;">1 business day</strong>.
      </p>
      <p style="margin:0;font-size:14px;color:#6b7280;">
        In the meantime, feel free to WhatsApp us at <a href="https://wa.me/919123456789" style="color:#FF4800;">+91 91234 56789</a>.
      </p>
      <p style="margin:24px 0 0;font-size:14px;color:#1a1a2e;font-weight:600;">— Team Straveda</p>
    `),
  });
}

// ── Career Application Email ───────────────────────────────────────────────
export interface CareerEmailData {
  role:       string;
  name:       string;
  email:      string;
  phone:      string;
  linkedin:   string;
  portfolio:  string;
  whyJoin:    string;
  resumeName: string;
}

export async function sendCareerEmail(
  data: CareerEmailData,
  resumeBuffer: Buffer,
) {
  const transport = createTransport();

  const body = `
    <h2 style="margin:0 0 6px;font-size:20px;font-weight:700;color:#1a1a2e;">New Job Application</h2>
    <p style="margin:0 0 4px;font-size:14px;color:#6b7280;">Role applied for:</p>
    <p style="margin:0 0 28px;display:inline-block;background:rgba(255,72,0,0.1);color:#FF4800;font-size:13px;font-weight:700;padding:5px 14px;border-radius:20px;">${data.role}</p>

    <table width="100%" cellpadding="0" cellspacing="0">
      ${field('Full Name',   data.name)}
      ${field('Email',       `<a href="mailto:${data.email}" style="color:#FF4800;">${data.email}</a>`)}
      ${field('Phone',       data.phone || 'Not provided')}
      ${field('LinkedIn',    data.linkedin ? `<a href="${data.linkedin}" style="color:#FF4800;">${data.linkedin}</a>` : 'Not provided')}
      ${field('Portfolio',   data.portfolio ? `<a href="${data.portfolio}" style="color:#FF4800;">${data.portfolio}</a>` : 'Not provided')}
      ${field('Resume',      `📎 ${data.resumeName} (attached)`)}
    </table>

    <div style="margin-top:24px;">
      <p style="margin:0 0 8px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#9ca3af;">Why do you want to join Straveda?</p>
      <div style="background:#f8f8fc;border-left:3px solid #FF4800;border-radius:0 8px 8px 0;padding:16px 20px;">
        <p style="margin:0;font-size:14px;color:#1a1a2e;line-height:1.7;white-space:pre-wrap;">${data.whyJoin}</p>
      </div>
    </div>

    <div style="margin-top:32px;text-align:center;">
      <a href="mailto:${data.email}" style="display:inline-block;background:#FF4800;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:600;">
        Reply to ${data.name} →
      </a>
    </div>`;

  // Notify the team
  await transport.sendMail({
    from:        `"Straveda Careers" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to:          process.env.CAREERS_EMAIL || process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    replyTo:     data.email,
    subject:     `[Application] ${data.name} — ${data.role}`,
    html:        htmlShell('New Job Application', body),
    attachments: [
      {
        filename:    data.resumeName,
        content:     resumeBuffer,
        contentType: 'application/pdf',
      },
    ],
  });

  // Auto-reply to the applicant
  await transport.sendMail({
    from:    `"Straveda Careers" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to:      data.email,
    subject: `We received your application, ${data.name.split(' ')[0]}!`,
    html: htmlShell('Application Received', `
      <h2 style="margin:0 0 6px;font-size:20px;font-weight:700;color:#1a1a2e;">Application received!</h2>
      <p style="margin:0 0 20px;font-size:14px;color:#6b7280;line-height:1.7;">
        Hi ${data.name.split(' ')[0]}, thanks for applying for the
        <strong style="color:#1a1a2e;">${data.role}</strong> role at Straveda.
        We review every application carefully and will get back to you within <strong style="color:#1a1a2e;">5 business days</strong>.
      </p>
      <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.7;">
        We're a small team and every hire matters — so if you're a fit, you'll hear from us directly.
        In the meantime, check out our <a href="https://straveda.com" style="color:#FF4800;">latest work</a>.
      </p>
      <p style="margin:24px 0 0;font-size:14px;color:#1a1a2e;font-weight:600;">— Team Straveda</p>
    `),
  });
}
