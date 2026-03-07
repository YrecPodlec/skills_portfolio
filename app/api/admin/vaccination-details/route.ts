import {prisma} from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    try {
        const vaccinationDetails = await prisma.vaccinationDetails.findMany()
        return NextResponse.json(vaccinationDetails)
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            { error: "Ошибка получения деталей вакцинации", err},
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest){
    try {
        const body = await request.json();
        const {
            vaccineId,
            visitServiceId,
            batchNumber,
            expDate,
            nextDueDate,
            AdmSite,
            notes,
        } = body

        const vaccinationDetails = await prisma.vaccinationDetails.create({
            data: {
                vaccineId,
                visitServiceId,
                batchNumber,
                expDate,
                nextDueDate,
                AdmSite,
                notes,
            },
            include:{
                vaccine: true,
                visitService: {
                    include:{
                        visit: true,
                        service: true,
                    }
                },
            }
        })
        return NextResponse.json(vaccinationDetails, {status: 201});
    }
    catch(err){
        console.log(err);
        return NextResponse.json(
            { error: "Ошибка создания деталей вакцинации", err },
            { status: 500 }
        );
    }
}