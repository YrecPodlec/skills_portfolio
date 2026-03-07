import {prisma} from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
export async function GET(){
    try {
        const employers = await prisma.employer.findMany(
            {
                include:{
                    posts:{
                        include:{
                            post: true
                        }
                    }
                }
            }
        );
        return NextResponse.json(employers);
    }
    catch(err){
        return NextResponse.json(
            {error: "Не получилось получить сотрудников :/", err},
            {status: 500}
        );
    }
}
export async function POST(request: NextRequest){
    try {
        const body = await request.json();
        const {name, lastname, postIds} = body;

        const employer = await prisma.employer.create({
            data: {
                name,
                lastname,
                posts: {
                    create: postIds.map((postId: number) => ({postId})),
                },
            },
            include: {
                posts: {
                    include: {
                        post: true
                    }
                }
            }
        })
        return NextResponse.json(employer, {status: 201});
    }
    catch(err){
        return NextResponse.json(
            { error: "Ошибка создания сотрудника", err },
            { status: 500 }
        );
    }
}