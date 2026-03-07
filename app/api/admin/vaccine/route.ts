import {prisma} from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    try {
        const vaccine = await prisma.vaccine.findMany()
        return NextResponse.json(vaccine)
    } catch (err) {
        return NextResponse.json(
            { error: "Ошибка получения вакцины", err},
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

        const vaccine = await prisma.vaccine.create({
            data: {
                name
            }
        })
        return NextResponse.json(vaccine, {status: 201});
    }
    catch(err){
        return NextResponse.json(
            { error: "Ошибка создания вакцины", err },
            { status: 500 }
        );
    }
}