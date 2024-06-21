import Form from "@/app/[locale]/cms/login/_components/Form";
import {redirect} from "next/navigation";
import {getServerSession} from "next-auth";

export default async function Login() {
    const session = await getServerSession();
    if (session) {
        redirect('/cms');
    }
    return (
        <>
            <Form/>
        </>
    );
}
