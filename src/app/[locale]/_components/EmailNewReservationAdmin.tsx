import * as React from 'react';

interface EmailTemplateProps {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
}

export const EmailNewReservationAdmin: React.FC<Readonly<EmailTemplateProps>> = ({id, firstName, lastName, email}) => (
    <div>
        <h1>Nova rezervacija od {firstName} {lastName}!</h1>
        <p>Više informacija o rezervaciji možete vidjeti <a href={`${process.env.NEXTAUTH_URL}/cms/reservation/${id}`}>Ovdje</a>.</p>
        <img src={`${process.env.NEXTAUTH_URL}/logo.png`} alt="Casa Fragola Logo"/>
    </div>
);