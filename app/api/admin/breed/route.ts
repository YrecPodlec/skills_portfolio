import {prisma} from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    try {
        const breed = await prisma.breed.findMany()
        return NextResponse.json(breed)
    } catch (err) {
        return NextResponse.json(
            { error: "Ошибка получения пород", err},
            { status: 500 }
        );
    }
}
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, species } = body;

        const newBreed = await prisma.breed.create({
            data: {
                name,
                species
            }
        });

        return NextResponse.json(newBreed, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Не получилось создать породу", err },
            { status: 500 }
        );
    }
}