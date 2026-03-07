import {prisma} from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    try {
        const owner = await prisma.owner.findMany()
        return NextResponse.json(owner)
    } catch (err) {
        return NextResponse.json(
            { error: "Ошибка получения владельца", err},
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest){
    try {
        const body = await request.json();
        const {
            firstName,
            lastName,
            phone,
            email,
            birth,
            address,

        } = body;

        const owner = await prisma.owner.create({
            data: {
                firstName,
                lastName,
                phone,
                email,
                birth,
                address
            },
        })
        return NextResponse.json(owner, {status: 201});
    }
    catch(err){
        return NextResponse.json(
            { error: "Ошибка создания владельца", err },
            { status: 500 }
        );
    }
}