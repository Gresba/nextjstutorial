import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import { prisma } from "@/prisma/client";

export async function GET(
    request: NextRequest, 
    {params }: {params: { id: string }})
{
    const user = await prisma.user.findUnique({
        where: { id: parseInt(params.id) }
    });

    // Fetch data from a db
    if(!user) return NextResponse.json({message: 'User not found'}, {status: 404});

    
    // If not found, return 404 error
    return NextResponse.json(user);
}

export async function PUT(request: NextRequest, {params }: {params: { id: string }})
{
    const body = await request.json();
    const validation = schema.safeParse(body);

    if(!validation.success)
        return NextResponse.json(validation.error.issues, {status: 400});

    const user = await prisma.user.findUnique({
        where: { id: parseInt(params.id) }
    });

    if(!user)
        return NextResponse.json({message: 'User not found'}, {status: 404});

    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { name: body.name, email: body.email }
    });

    return NextResponse.json(updatedUser);
}

export async function DELETE(request: NextRequest, {params }: {params: { id: string }})
{
    const user = await prisma.user.findUnique({
        where: { id: parseInt(params.id) }
    });

    if(!user)
        return NextResponse.json({message: 'User not found'}, {status: 404});

    await prisma.user.delete({
        where: { id: user.id }
    });

    return NextResponse.json({}, {status: 200});
}