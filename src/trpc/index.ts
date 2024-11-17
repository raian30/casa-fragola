import {privateProcedure, publicProcedure, router} from './trpc';
import {z} from "zod";
import {db} from "@/db";
import {Resend} from "resend";
import {EmailNewReservationAdmin} from "@/app/[locale]/_components/EmailNewReservationAdmin";
import {EmailNewReservationCustomer} from "@/app/[locale]/_components/EmailNewReservationCustomer";
import {EmailReservationStatusChanged} from "@/app/[locale]/_components/EmailReservationStatusChanged";

const resend = new Resend(process.env.RESEND_API_KEY);

export const appRouter = router({
    //Email
    NewReservationEmail: publicProcedure.input(z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
    })).mutation(async ({input}) => {
        try {
            const { data, error } = await resend.emails.send({
                from: 'Casa Fragola <info@casa-fragola.com>',
                to: 'mladen.radolovic@gmail.com',
                subject: 'Nova rezervacija - Casa Fragola',
                text: 'Nova rezervacija - Casa Fragola',
                react: EmailNewReservationAdmin({ id:input.id, firstName: input.firstName, lastName: input.lastName, email: input.email }),
            });

            if (error) {
                return Response.json({ error }, { status: 500 });
            }

            if (data) {
                await resend.emails.send({
                    from: 'Casa Fragola <info@casa-fragola.com>',
                    to: input.email,
                    subject: "We have received your reservation",
                    text: "We have received your reservation",
                    react: EmailNewReservationCustomer({ id:input.id, firstName: input.firstName, lastName: input.lastName, email: input.email }),
                });
            }
        } catch (error) {
            return Response.json({ error }, { status: 500 });
        }
    }),

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
    })).mutation(async ({ input}) => {
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
                    }],
                }
            }
        }, )
        return reservation
    }),

    GetReservations: privateProcedure.input(
        z.object({
            limit: z.number().min(1).max(100).nullish(),
            cursor: z.string().nullish(),
            sortBy: z.enum(['desc', 'asc']).nullish()
        }).optional()).query(async (opts) => {
        const { input } = opts;
        const limit = input?.limit ? input.limit : 1000;
        const cursor = input?.cursor && input.cursor;
        const items = await db.reservation.findMany({
            take: limit + 1, // jos jedan radi sljedeceg kursora
            cursor: cursor ? { id: cursor } : undefined,
            orderBy: {
                checkIn: input ? input.sortBy ? input.sortBy : 'desc' : 'desc',
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

    GetOneReservation: privateProcedure.input(z.object({id: z.string()})).query(async({ input}) => {
        const date = await db.reservation.findUnique({
            where: {
                id: input.id,
            }
        });
        return date
    }),

    ChangeReservationStatus: privateProcedure.input(z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        status: z.enum(['ACCEPTED', 'REJECTED']),
        checkIn: z.string().datetime(),
        checkOut: z.string().datetime(),
        range: z.string()
    })).mutation(async ({ input}) => {
        if(input.status == 'REJECTED') {
            const reservation = await db.reservation.update({
                data: {
                    status: input.status,
                    reservedDays: {
                        deleteMany: {},
                    }
                },
                where: {
                    id: input.id
                }
            }, )
            const { data, error } = await resend.emails.send({
                from: 'Casa Fragola <info@casa-fragola.com>',
                to: input.email,
                subject: "Your booking status has been changed",
                text: "Your booking status has been changed",
                react: EmailReservationStatusChanged({firstName: input.firstName, lastName: input.lastName, status: input.status }),
            });

            if (error) {
                return Response.json({ error }, { status: 500 });
            }
            return reservation
        } else {
            const reservation = await db.reservation.update({
                data: {
                    status: input.status,
                    reservedDays: {
                        //zbrisat sve da budemo siguri
                        deleteMany: {},
                        create: [{
                            startDate: input.checkIn,
                            endDate: input.checkOut,
                            range: input.range
                        }]
                    }
                },
                where: {
                    id: input.id
                }
            }, )

            const { data, error } = await resend.emails.send({
                from: 'Casa Fragola <info@casa-fragola.com>',
                to: input.email,
                subject: "Your booking status has been changed",
                text: "Your booking status has been changed",
                react: EmailReservationStatusChanged({firstName: input.firstName, lastName: input.lastName, status: input.status }),
            });

            if (error) {
                return Response.json({ error }, { status: 500 });
            }
            return reservation
        }
    }),

    EditReservation: privateProcedure.input(z.object({
        id: z.string(),
        status: z.enum(['ACCEPTED', 'REJECTED']),
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
    })).mutation(async ({ input}) => {
        type ReservationData = {
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            checkIn: string;
            checkOut: string;
            adults: number;
            children: number;
            babies: number;
            reservedDays: {
                deleteMany: {};
                create?: {
                    startDate: string;
                    endDate: string;
                    range: string;
                }[];
            };
        };

        const data: ReservationData = {
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
                deleteMany: {},
                create: [{
                    startDate: input.checkIn,
                    endDate: input.checkOut,
                    range: input.range,
                }],
            },
        };

        if (input.status === 'REJECTED') {
            data.reservedDays = {
                deleteMany: {},
            };
        }

        const reservation = await db.reservation.update({
            data,
            where: {
                id: input.id
            }
        }, )

        return reservation
    }),

    DeleteReservation: privateProcedure.input(z.object({id: z.string()})).mutation(async({ input}) => {
        await db.reservation.delete({
            where: {
                id: input.id
            }
        })
    }),

    //Reserved Days (Occupied Dates)
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
    GetOneOccupiedDate: privateProcedure.input(z.object({id: z.string()})).query(async({ input}) => {
        const date = await db.reservedDays.findUnique({
            where: {
                id: input.id,
            }
        });
        return date
    }),
})
export type AppRouter = typeof appRouter;