'use client'
import { trpc } from "@/app/_trpc/client";
import {LoaderCircle, EllipsisVertical} from "lucide-react";
import {useState, useTransition} from "react";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

type DeleteReservationProps = {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    status: string,
    checkIn: Date,
    checkOut: Date,
    range: string,
    refetch: any
}

export const EditReservationDropdown = ({id, email, firstName, lastName, status, checkIn, checkOut, range, refetch}: DeleteReservationProps) => {
    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false)
    const [isPendingEdit, startTransitionEdit] = useTransition()
    const [isPendingDelete, startTransitionDelete] = useTransition()
    const DeleteReservationMutation = trpc.DeleteReservation.useMutation();
    const ChangeReservationStatusMutation = trpc.ChangeReservationStatus.useMutation();

    const router = useRouter()

    return (
        <div className={'relative'}>
            <EllipsisVertical className={'cursor-pointer'} onClick={() => setIsMenuOpened(prev => !prev)}/>
            <div
                className={`absolute right-0 top-[150%] flex flex-col w-max drop-shadow-lg bg-white rounded-lg transition-opacity ${isMenuOpened ? 'select-auto opacity-100 z-10' : 'select-none opacity-0 -z-10'}`}>
                <button className={'w-full hover:bg-gray-100 transition-all p-4 rounded-t-lg flex group gap-2 justify-between items-center'} disabled={isPendingEdit} onClick={() => {
                    startTransitionEdit(async () => {
                        await ChangeReservationStatusMutation.mutateAsync({
                            id,
                            email,
                            firstName,
                            lastName,
                            status: status == 'ACCEPTED' ? 'REJECTED' : 'ACCEPTED',
                            // @ts-ignore
                            checkIn,
                            // @ts-ignore
                            checkOut,
                            range
                        }, {onSettled: () => {refetch()}});
                        toast.success("Uspješno ste se promjenili status rezervacije!");
                    })
                    setIsMenuOpened(prev => !prev)
                }}>
                    {!isPendingEdit ? (
                        <>
                            <p>{status == 'ACCEPTED' ? 'Odbij rezervaciju' : 'Prihvati rezervaciju'} </p>
                        </>
                    ) : (
                        <LoaderCircle className={'flex justify-center items-center w-full text-gray-600 transition-all animate-spin'}/>
                    )}
                </button>
                <button className={'w-full text-red-500 hover:bg-gray-100 transition-all rounded-b-lg p-4 flex group gap-2 justify-between items-center'} disabled={isPendingDelete} onClick={() => {
                    startTransitionDelete(async () => {
                        await DeleteReservationMutation.mutateAsync({id});
                        router.push('/cms?deleted=success')
                    })
                }}>
                    {!isPendingDelete ? (
                        <>
                            <p className={''}>Izbriši rezervaciju</p>
                        </>
                    ) : (
                        <LoaderCircle className={'flex justify-center items-center w-full text-gray-600 transition-all animate-spin'}/>
                    )}
                </button>
            </div>
        </div>
    );
}