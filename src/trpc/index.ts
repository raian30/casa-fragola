import {privateProcedure, publicProcedure, router} from './trpc';
import {z} from "zod";
import {db} from "@/db";

export const appRouter = router({
    OccupyDate: publicProcedure.input(z.object({range: z.string()})).mutation(async({ctx, input}) => {
        let date = await db.reservedDays.create({
            data: {
                range: input.range
            }
        })
        return date
    }),
    GetOccupiedDates: publicProcedure.query(async({ctx}) => {
        const date = await db.reservedDays.findMany({
            orderBy: {
                createdAt: 'asc',
            }
        });
        return date
    }),
})
export type AppRouter = typeof appRouter;