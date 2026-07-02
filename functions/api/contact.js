export async function onRequestPost(context) {

    const data = await context.request.json();

    const { name, email, phone, message } = data;

    if (!name || !email || !message) {
        return Response.json(
            { error: "Missing required fields." },
            { status: 400 }
        );
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {

        method: "POST",

        headers: {
            "Authorization": `Bearer ${context.env.RESEND_API_KEY}`,
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            from: "onboarding@resend.dev",

            to: "to.tuomas@outlook.com",

            subject: "New Contact Form",

            html: `
                <h2>New Contact Form</h2>

                <p><strong>Name:</strong> ${name}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Phone:</strong> ${phone || "-"}</p>

                <p><strong>Message:</strong></p>

                <p>${message}</p>
            `

        })

    });

    if (!resendResponse.ok) {

        const error = await resendResponse.text();

        return Response.json(
            { error },
            { status: 500 }
        );

    }

    return Response.json({
        success: true
    });

}