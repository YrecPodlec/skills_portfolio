import {prisma} from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";

export async function GET() {
    try {
        const post = await prisma.employerPost.findMany()
        return NextResponse.json(post)
    } catch (err) {
        return NextResponse.json(
            { error: "Ошибка получения должностей", err},
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { post } = body;

        const newPost = await prisma.employerPost.create({
            data: { post }
        });

        return NextResponse.json(newPost, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Не получилось создать должность", err },
            { status: 500 }
        );
    }
}