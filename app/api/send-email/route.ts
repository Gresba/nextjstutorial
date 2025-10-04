import { EmailTemplate } from '@/emails/WelcomeTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST()
{
    await resend.emails.send({
        from: 'updates@altsgreat.com',
        to: ['slimmyyimmy1@gmail.com'],
        subject: 'Test',
        react: EmailTemplate({firstName: "Mosh"})
    })

    return NextResponse.json({});
}