import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

export function GET(
    request: NextRequest, 
    {params }: {params: { id: number }})
{
    // Fetch data from a db
    if(params.id > 10) return NextResponse.json({message: 'User not found'}, {status: 404});

    // If not found, return 404 error
    return NextResponse.json({ id: params.id, name: 'Most'});

    // Else return data
}

export async function PUT(request: NextRequest, {params }: {params: { id: number }})
{
    const body = await request.json();
    const validation = schema.safeParse(body);

    if(!validation.success)
        return NextResponse.json(validation.error.issues, {status: 400});

    if(params.id > 10)
        return NextResponse.json({message: 'User not found'}, {status: 404});

    return NextResponse.json({ id: params.id, name: body.name });
}

export async function DELETE(request: NextRequest, {params }: {params: { id: number }})
{
    if(params.id > 10)
        return NextResponse.json({message: 'User not found'}, {status: 404});
    return NextResponse.json({}, {status: 200});
}