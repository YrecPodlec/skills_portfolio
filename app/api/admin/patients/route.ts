import {prisma} from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    try {
        const patient = await prisma.patient.findMany({
            include: {
                owner: true,
                breed: true,
                visits: true,
                visitServices: {
                    include: {
                        doctor: {
                            include: {
                                post: true,
                                employer: true,
                            }
                        },
                        service: true,
                    }
                },
            }
        })
        return NextResponse.json(patient)
    } catch (err) {
        return NextResponse.json(
            { error: "Ошибка получения пациента", err},
            { status: 500 }
        );
    }
}