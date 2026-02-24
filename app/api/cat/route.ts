import { prisma } from '@/app/[locale]/shared/lib/prisma';

export async function GET() {
    try {
        const cats = await prisma.cat.findMany();
        return Response.json(cats);
    } catch (err) {
        console.error(err);
        return new Response('Ошибка сервера', { status: 500 });
    }
}