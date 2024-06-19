'use client'
import { trpc } from "@/app/_trpc/client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function DeleteOccupiedDate({ id }: { id: string }) {
    const router = useRouter();
    const OccupyDateMutation = trpc.DeleteOccupiedDate.useMutation();

    const handleDelete = async () => {
        try {
            await OccupyDateMutation.mutateAsync({ id });
            router.push('/cms?deleted=success');
            router.refresh()
        } catch (error) {
            console.error('Error deleting occupied date:', error);
        }
    };

    return (
        <Trash2
            className={'text-gray-600 rounded-md transition-all hover:cursor-pointer hover:text-red-500'}
            onClick={() => {
                handleDelete()
            }}
        />
    );
}