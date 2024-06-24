import {privateProcedure, publicProcedure, router} from './trpc';
import {z} from "zod";
import {db} from "@/db";

export const appRouter = router({
    //Reservation
    CreateReservation: publicProcedure.input(z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phone: z.string(),
        checkIn: z.string().datetime(),
        checkOut: z.string().datetime(),
        adults: z.number(),
        children: z.number(),
        babies: z.number(),
        range: z.string()
    })).mutation(async ({ctx, input}) => {
        const reservation = await db.reservation.create({
            data: {
                firstName: input.firstName,
                lastName: input.lastName,
                email: input.email,
                phone: input.phone,
                checkIn: input.checkIn,
                checkOut: input.checkOut,
                adults: input.adults,
                children: input.children,
                babies: input.babies,
                reservedDays: {
                    create: [{
                        startDate: input.checkIn,
                        endDate: input.checkOut,
                        range: input.range
                    }]
                }
            }
        }, )

        return reservation
    }),

    //Reserved Days
    OccupyDate: privateProcedure.input(z.object({range: z.string(), startDate: z.string().datetime(), endDate: z.string().datetime()})).mutation(async({ctx, input}) => {
        let date = await db.reservedDays.create({
            data: {
                startDate: input.startDate,
                endDate: input.endDate,
                range: input.range
            }
        })
        return date
    }),
    GetOccupiedDates: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).nullish(),
                cursor: z.string().nullish(),
                sortBy: z.enum(['desc', 'asc']).nullish()
            }).optional())
        .query(async (opts) => {
            const { input } = opts;
            const limit = input?.limit ? input.limit : 1000;
            const cursor = input?.cursor && input.cursor;
            const items = await db.reservedDays.findMany({
                take: limit + 1, // jos jedan radi sljedeceg kursora
                cursor: cursor ? { id: cursor } : undefined,
                orderBy: {
                    startDate: input ? input.sortBy ? input.sortBy : 'desc' : 'desc',
                },
            });
            let nextCursor: typeof cursor | undefined = undefined;
            if (items.length > limit) {
                const nextItem = items.pop();
                nextCursor = nextItem!.id;
            }
            return {
                items,
                nextCursor,
            };
        }),
    GetOneOccupiedDate: privateProcedure.input(z.object({id: z.string()})).query(async({ctx, input}) => {
        const date = await db.reservedDays.findUnique({
            where: {
                id: input.id,
            }
        });
        return date
    }),
    EditOccupiedDate: privateProcedure.input(z.object({id: z.string(), range:z.string(), startDate: z.string().datetime(), endDate: z.string().datetime()})).mutation(async({ctx, input}) => {
        return await db.reservedDays.update({
            where: {
                id: input.id
            },
            data: {
                startDate: input.startDate,
                endDate: input.endDate,
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