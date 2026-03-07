import {prisma} from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    try {
        const visit = await prisma.visit.findMany({
            include:{
                patient: true,
                services: true,
            }
        })
        return NextResponse.json(visit)
    } catch (err) {
        return NextResponse.json(
            { error: "Ошибка получения визита", err},
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest){
    try {
        const body = await request.json();
        const {
            endAt,
            status,
            notes,
            patientId
        } = body;

        const visit = await prisma.visit.create({
            data: {
                endAt,
                status,
                notes,
                patientId,
            },
            include:{
                patient: true,
                services: {
                    include: {
                        service: true
                    }
                },
            }
        })
        return NextResponse.json(visit, {status: 201});
    }
    catch(err){
        return NextResponse.json(
            { error: "Ошибка создания визита", err },
            { status: 500 }
        );
    }
}