import React from "react";
import { signIn, signOut, useSession } from "next-auth/react"
import Image from 'next/image'

export default function Home() {
    const { data: session, status } = useSession()
    console.log('session', session)
    return (
        <div>
            <h1>Simple Github OAuth Demo</h1>

            {!session ? (
                <>
                    <button onClick={() => signIn("github")}>
                        Sign in with Github
                    </button>
                </>
            ) : (
                <>
                    <Image src={session.user.image} alt="Avatar" width={100} height={100} />
                    <p>
                        {session.user.email}
                    </p>
                    <p>
                        {session.user.name}
                    </p>
                    <button onClick={signOut}>Logout</button> <br />
                </>
            )}
        </div>
    );
}
