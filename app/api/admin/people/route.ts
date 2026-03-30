import {prisma} from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
export async function GET(){
    try {
        const people = await prisma.people.findMany(
            {
                include:{
                    posts:{
                        include:{
                            post: true
                        }
                    },
                    contacts: true,
                    patients: true,
                    roles: true,
                    passports: {
                        include:{
                            issue: true,
                        },
                    }
                }
            }
        );
        return NextResponse.json(people);
    }
    catch(err){
        return NextResponse.json(
            {error: "Не получилось получить пользователей :/", err},
            {status: 500}
        );
    }
}