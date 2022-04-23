import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import Link from "next/link";

export default function Home({ issues }) {
  const { data: session, status } = useSession();
  console.log("session", session);
  return (
    <div>
      <h1>Simple Github OAuth Demo</h1>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 10 }}>
          <Link href="/">Static rendering</Link>
        </div>
        <div style={{ marginRight: 10 }}>
          <Link href="/client-side">Client side rendering</Link>
        </div>
        <div style={{ marginRight: 10 }}>
          <Link href="/server-side">Server side rendering</Link>
        </div>
      </div>
      {!session ? (
        <>
          <button onClick={() => signIn("github")}>Sign in with Github</button>
        </>
      ) : (
        <>
          <Image
            src={session.user.image}
            alt="Avatar"
            width={100}
            height={100}
          />
          <p>{session.user.email}</p>
          <p>{session.user.name}</p>
          <button onClick={signOut}>Logout</button> <br />
        </>
      )}

      <div>
        {issues.map((issue) => (
          <div key={issue.node.url}>
            <h3>{issue.node.title}</h3>
            <p>{issue.node.url}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query {
        repository(owner: "octocat", name: "Hello-World") {
          issues(last: 20, states: CLOSED) {
            edges {
              node {
                title
                url
                labels(first: 5) {
                  edges {
                    node {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      issues: data.repository.issues.edges,
    },
  };
}

