import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { gql } from "@apollo/client";
import client from "../apollo-client";

export default function Home({ issues = [] }) {
  const { data: session, status } = useSession();

  console.log("issues", issues);
  return (
    <div>
      <h1>Simple Github OAuth Demo</h1>

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
          <div key={issue.code}>
            <h3>
              {issue.node.title}
            </h3>
            <p>
              {issue.node.url}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
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
