'use client'
import {Eye, EyeOff} from "lucide-react";
import {FormEvent, useState, useTransition} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {toast, ToastContainer, useToast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Form() {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isPending, startTransition] = useTransition()

    const router = useRouter()

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        startTransition(async () => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const response = await signIn('credentials', {
                email: formData.get('email'),
                password: formData.get('password'),
                redirect: false,

            })

            if(response?.error == 'CredentialsSignin'){
                toast.error("Krivi pristupni podaci!")
            }

            if(response?.error == null && response?.ok && response?.status == 200) {
                router.push('/cms?login=success')
            }
        });
    }

    return (
        <main
            className="flex bg-[#F5F5F5] flex-col items-center justify-center min-h-[calc(100dvh-120px)] py-8 px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-28 overflow-x-hidden w-screen">
            <div
                className={'py-8 sm:py-10 px-8 sm:px-10 flex flex-col items-center justify-center gap-12 bg-white rounded-lg drop-shadow-2xl w-full sm:w-[30rem]'}>
                <h1 className={'text-black text-2xl text-center w-full'}>Prijavite se za pristup</h1>
                <form onSubmit={handleSubmit} className={'flex flex-col gap-7 w-full'}>
                    <div className={'flex flex-col items-start justify-start w-full'}>
                        <label htmlFor="email" className={'text-gray-700 text-sm w-full mb-2'}>Email</label>
                        <input id={'email'} name={'email'} type="email"
                               className={'border-2 border-gray-500 rounded-lg px-4 py-2.5 w-full'}/>
                    </div>
                    <div className={'flex flex-col items-start justify-start w-full'}>
                        <label htmlFor="password" className={'text-gray-700 text-sm w-full mb-2'}>Password</label>
                        <div
                            className={'flex justify-between items-center w-full border-2 border-gray-500 rounded-lg px-4 py-2.5'}>
                            <input id={'password'} name={'password'} type={showPassword ? 'text' : 'password'}
                                   className={'w-full border-0 focus:outline-0 focus-visible:outline-0 focus-within:outline-0'}/>
                            {!showPassword ? (
                                <Eye className={'ml-2 cursor-pointer'} onClick={() => setShowPassword(!showPassword)}/>
                            ) : (
                                <EyeOff className={'ml-2 cursor-pointer'}
                                        onClick={() => setShowPassword(!showPassword)}/>
                            )}
                        </div>
                    </div>
                    <button type="submit" className={`bg-[#923E82] border-2 border-[#923E82] py-2.5 mt-5 rounded-lg text-white hover:bg-opacity-10 hover:border-opacity-70 hover:text-black transition-all ${isPending && 'bg-transparent'}`}>{isPending ? <p className={'text-black'}>Ucitavanje...</p> : 'Prijava'}</button>
                    <span className={'text-center mt-5 flex items-center justify-center gap-2 flex-wrap'}><p>Problemi s prijavom?</p><p className={'text-[#923E82]'}>Kontaktriajte administratora</p></span>
                </form>
            </div>
            <ToastContainer position="bottom-right" theme="colored"/>
        </main>
    )
}