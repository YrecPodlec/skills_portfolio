import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";
import {data} from "@formatjs/intl-localematcher/abstract/languageMatching";
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
export async function POST(request: Request){
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