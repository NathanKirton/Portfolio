import { NextResponse } from "next/server";
import { z } from "zod";

import { sendContactEmail } from "@/lib/mailer";

const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email(),
  serviceType: z.string().min(1),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = contactSchema.parse(body);

    const result = await sendContactEmail(payload);

    if (result.mode === "dev-log") {
      return NextResponse.json({ message: "Message captured locally. Configure email credentials to deliver real emails." });
    }

    return NextResponse.json({ message: "Message sent successfully." });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Please complete all required fields correctly." }, { status: 400 });
    }

    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to send your message right now." },
      { status: 500 }
    );
  }
}