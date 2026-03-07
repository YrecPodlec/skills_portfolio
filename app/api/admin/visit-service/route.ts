import {prisma} from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    try {
        const visitService = await prisma.visitService.findMany({
            include: {
                visit: true,
                service: true,
                vaccination: {
                    include: {
                        vaccine: true
                    }
                }
            }
        })
        return NextResponse.json(visitService)
    } catch (err) {
        return NextResponse.json(
            { error: "Ошибка получения оказанных услуг", err},
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest){
    try {
        const body = await request.json();
        const {
            notes,
            visitId,
            serviceId
        } = body

        const visitService = await prisma.visitService.create({
            data: {
                notes,
                visitId,
                serviceId,
            },
            include: {
                visit: true,
                service: true,
                vaccination: {
                    include: {
                        vaccine: true
                    }
                }
            }
        })
        return NextResponse.json(visitService, {status: 201});
    }
    catch(err){
        return NextResponse.json(
            { error: "Ошибка создания пройденной услуги", err },
            { status: 500 }
        );
    }
}