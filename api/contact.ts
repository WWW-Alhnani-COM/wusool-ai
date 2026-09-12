const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 8000);

try {
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
    signal: controller.signal,
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
  if (error instanceof Error && error.name === "AbortError") {
    console.error("Resend request timed out after 8 seconds");

    return json(
      {
        success: false,
        message: "خدمة البريد لم تستجب في الوقت المحدد.",
      },
      504,
    );
  }

  console.error("Resend request error:", error);

  return json(
    {
      success: false,
      message: "تعذر الاتصال بخدمة البريد.",
    },
    502,
  );
} finally {
  clearTimeout(timeout);
}
