'use client'
import { trpc } from "@/app/_trpc/client";
import { Trash2 } from "lucide-react";
import {useRouter} from "next/navigation";
import {RevalidateCMS} from "@/app/[locale]/cms/_actions/revalidate";
import {useEffect, useTransition} from "react";
import {getOccupiedDates} from "@/app/[locale]/cms/_actions/getOccupiedDates";
import {toast} from "react-toastify";

export function DeleteOccupiedDate({ id }: { id: string }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition()
    const OccupyDateMutation = trpc.DeleteOccupiedDate.useMutation();
    let occupiedDates = trpc.GetOccupiedDates.useQuery();

    return (
        <Trash2
            className={'text-gray-600 rounded-md transition-all hover:cursor-pointer hover:text-red-500'}
            onClick={() => {
                startTransition(async () => {
                    await OccupyDateMutation.mutateAsync({id }, {
                        onSettled: () => occupiedDates.refetch()
                    });
                    toast.success("Uspješno ste se izbrisali zauzeti datum!");
                })
            }}
        />
    );
}