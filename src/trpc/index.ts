import {privateProcedure, publicProcedure, router} from './trpc';
import {z} from "zod";
import {db} from "@/db";
import {revalidatePath} from "next/cache";

export const appRouter = router({
    OccupyDate: privateProcedure.input(z.object({range: z.string()})).mutation(async({ctx, input}) => {
        let date = await db.reservedDays.create({
            data: {
                range: input.range
            }
        })
        return date
    }),
    GetOccupiedDates: privateProcedure.query(async({ctx}) => {
        const date = await db.reservedDays.findMany({
            orderBy: {
                createdAt: 'desc',
            }
        });
        return date
    }),
    GetOneOccupiedDate: privateProcedure.input(z.object({id: z.string()})).query(async({ctx, input}) => {
        const date = await db.reservedDays.findUnique({
            where: {
                id: input.id,
            }
        });
        return date
    }),
    EditOccupiedDate: privateProcedure.input(z.object({id: z.string(), range:z.string()})).mutation(async({ctx, input}) => {
        return await db.reservedDays.update({
            where: {
                id: input.id
            },
            data: {
                range: input.range
            }
        });
    }),
    DeleteOccupiedDate: privateProcedure.input(z.object({id: z.string()})).mutation(async({ctx, input}) => {
        await db.reservedDays.delete({
            where: {
                id: input.id
            }
        });
    })
})
export type AppRouter = typeof appRouter;