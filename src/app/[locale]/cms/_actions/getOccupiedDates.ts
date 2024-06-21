import {trpc} from "@/app/_trpc/client";

export function getOccupiedDates() {
    let {data: occupiedDates, error, isLoading} = trpc.GetOccupiedDates.useQuery();

    return ({occupiedDates, error, isLoading})
}