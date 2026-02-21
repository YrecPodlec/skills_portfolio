import { NextResponse } from 'next/server'
import {prisma} from "@/app/[locale]/shared";

export async function GET() {
    const cats = await prisma.cat.findMany()
    return NextResponse.json(cats)
}