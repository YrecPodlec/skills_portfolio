import {prisma} from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    try {
        const service = await prisma.service.findMany()
        return NextResponse.json(service)
    } catch (err) {
        return NextResponse.json(
            { error: "Ошибка получения услуги", err},
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest){
    try {
        const body = await request.json();
        const {
            name
        } = body

        const service = await prisma.service.create({
            data: {
                name
            }
        })
        return NextResponse.json(service, {status: 201});
    }
    catch(err){
        return NextResponse.json(
            { error: "Ошибка создания услуги", err },
            { status: 500 }
        );
    }
}