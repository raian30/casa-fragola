import {initTRPC, TRPCError} from '@trpc/server';
import {useSession} from "next-auth/react";

const t = initTRPC.create();

const middleware = t.middleware

const isAuth  = middleware(async(opts) => {

    // FIX!! useSession ne dela u server componentama

    // const { data: session, status } = useSession()

    // if (status === "unauthenticated") {
    //     throw new TRPCError({code : "UNAUTHORIZED"})
    // }

    return opts.next({
        ctx: {

        }
    })
})

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth)