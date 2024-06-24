'use client'
import { trpc } from "@/app/_trpc/client";
import { Trash2, LoaderCircle } from "lucide-react";
import {useTransition} from "react";
import {toast} from "react-toastify";
import {UseTRPCInfiniteQueryResult} from "@trpc/react-query/shared";

export const DeleteOccupiedDate = ({id, occupiedDates}: {id: string, occupiedDates: UseTRPCInfiniteQueryResult<any, any, any>}) => {
    const [isPending, startTransition] = useTransition()
    const OccupyDateMutation = trpc.DeleteOccupiedDate.useMutation();

    return (
        <button disabled={isPending} onClick={() => {
            startTransition(async () => {
                await OccupyDateMutation.mutateAsync({ id }, {
                    onSettled: () => {
                        occupiedDates.refetch()
                    }
                });
                toast.success("Uspješno ste se izbrisali zauzeti datum!");
            })
        }}>
            {!isPending ? (
                <Trash2
                    className={'text-gray-600 rounded-md transition-all hover:cursor-pointer hover:text-red-500'}
                />
            ): (
                <LoaderCircle className={'text-gray-600 transition-all animate-spin'}/>
            )}

        </button>
    );
}