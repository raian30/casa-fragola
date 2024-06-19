import {initTRPC, TRPCError} from '@trpc/server';
import {useSession} from "next-auth/react";
import { getServerSession } from "next-auth/next";

const t = initTRPC.create();

const middleware = t.middleware

const isAuth  = middleware(async(opts) => {
    const session = await getServerSession();

    if (!session?.user) {
        throw new TRPCError({code : "UNAUTHORIZED"})
    }

    return opts.next({
        ctx: {

        }
    })
})

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth)