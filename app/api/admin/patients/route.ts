import {prisma} from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    try {
        const patient = await prisma.patient.findMany({
            include: {
                owner: true,
                breed: true
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

export async function POST(request: NextRequest){
    try {
        const body = await request.json();
        const {
            name,
            dateOfBirth,
            sex,
            color,
            chipNumber,
            ownerId,
            breedId
        } = body;

        const patient = await prisma.patient.create({
            data: {
                name,
                dateOfBirth,
                sex,
                color,
                chipNumber,
                ownerId,
                breedId
            },
            include: {
                owner: true,
                breed: true
            }
        })
        return NextResponse.json(patient, {status: 201});
    }
    catch(err){
        return NextResponse.json(
            { error: "Ошибка создания пациента", err },
            { status: 500 }
        );
    }
}