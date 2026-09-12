interface ContactPayload {
  name?: unknown;
  company?: unknown;
  phone?: unknown;
  email?: unknown;
  activityType?: unknown;
  serviceNeeded?: unknown;
  description?: unknown;
  message?: unknown;
}

function clean(value: unknown): string {
  return String(value ?? "").trim().replace(/[<>]/g, "");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function json(data: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return json(
      {
        success: false,
        message: "Method not allowed",
      },
      405,
    );
  }

  try {
    const body = (await req.json()) as ContactPayload;

    const name = clean(body.name);
    const company = clean(body.company);
    const phone = clean(body.phone);
    const email = clean(body.email);
    const activityType = clean(body.activityType);
    const serviceNeeded = clean(body.serviceNeeded);
    const description = clean(body.description);
    const message = clean(body.message);

    if (!name || !email || !phone) {
      return json(
        {
          success: false,
          message: "يرجى تعبئة الاسم والبريد الإلكتروني ورقم التواصل.",
        },
        400,
      );
    }

    if (!isValidEmail(email)) {
      return json(
        {
          success: false,
          message: "البريد الإلكتروني غير صحيح.",
        },
        400,
      );
    }

    const isConsultation = Boolean(
      company || activityType || serviceNeeded || description,
    );

    if (isConsultation && (!company || !activityType || !description)) {
      return json(
        {
          success: false,
          message: "يرجى تعبئة الحقول المطلوبة.",
        },
        400,
      );
    }

    if (!isConsultation && !message) {
      return json(
        {
          success: false,
          message: "يرجى كتابة الرسالة.",
        },
        400,
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !toEmail) {
      console.error("Missing RESEND_API_KEY or CONTACT_TO_EMAIL");

      return json(
        {
          success: false,
          message: "خدمة البريد غير مهيأة.",
        },
        500,
      );
    }

    const subject = isConsultation
      ? `طلب استشارة جديد من ${name}`
      : `رسالة جديدة من ${name}`;

    const html = isConsultation
      ? `
        <div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.8">
          <h2>طلب استشارة جديد — جذع AI</h2>
          <hr />

          <p><strong>الاسم:</strong> ${escapeHtml(name)}</p>
          <p><strong>الشركة:</strong> ${escapeHtml(company)}</p>
          <p><strong>رقم التواصل:</strong> ${escapeHtml(phone)}</p>
          <p><strong>البريد الإلكتروني:</strong> ${escapeHtml(email)}</p>
          <p><strong>نوع النشاط:</strong> ${escapeHtml(activityType)}</p>
          <p><strong>الخدمة المطلوبة:</strong> ${escapeHtml(serviceNeeded || "لم يتم تحديدها")}</p>

          <h3>وصف الاحتياج</h3>

          <p style="white-space:pre-wrap">
            ${escapeHtml(description)}
          </p>
        </div>
      `
      : `
        <div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.8">
          <h2>رسالة جديدة — جذع AI</h2>
          <hr />

          <p><strong>الاسم:</strong> ${escapeHtml(name)}</p>
          <p><strong>رقم التواصل:</strong> ${escapeHtml(phone)}</p>
          <p><strong>البريد الإلكتروني:</strong> ${escapeHtml(email)}</p>

          <h3>الرسالة</h3>

          <p style="white-space:pre-wrap">
            ${escapeHtml(message)}
          </p>
        </div>
      `;

    const text = isConsultation
      ? `طلب استشارة جديد — جذع AI

الاسم: ${name}
الشركة: ${company}
رقم التواصل: ${phone}
البريد الإلكتروني: ${email}
نوع النشاط: ${activityType}
الخدمة المطلوبة: ${serviceNeeded || "لم يتم تحديدها"}

وصف الاحتياج:
${description}`
      : `رسالة جديدة — جذع AI

الاسم: ${name}
رقم التواصل: ${phone}
البريد الإلكتروني: ${email}

الرسالة:
${message}`;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: [toEmail],
        reply_to: email,
        subject,
        html,
        text,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend error:", resendData);

      return json(
        {
          success: false,
          message: "تعذر إرسال البريد.",
        },
        502,
      );
    }

    return json({
      success: true,
      message: "تم إرسال الطلب بنجاح.",
      id: resendData.id,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return json(
      {
        success: false,
        message: "حدث خطأ أثناء إرسال الطلب.",
      },
      500,
    );
  }
}
