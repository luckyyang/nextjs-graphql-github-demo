import { useQuery, gql } from "@apollo/client";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import client from "../apollo-client";

const QUERY = gql`
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
`;

export default function Countries() {
  // const { data, loading, error } = useQuery(QUERY);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        const { data } = await client.query({ query: QUERY });
        console.log(" ====== data: ", data);
        if (data) setIssues(data.repository.issues.edges);
        setLoading(false);
      };
      fetchData();
    }, []);


  if (loading) {
    return (
      <h2>
        <a href="#loading" aria-hidden="true" className="aal_anchor" id="loading">
          <svg
            aria-hidden="true"
            className="aal_svg"
            height="16"
            version="1.1"
            viewBox="0 0 16 16"
            width="16"
          >
            <path
              fillRule="evenodd"
              d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
            ></path>
          </svg>
        </a>
        Loading...
      </h2>
    );
  }

  // if (error) {
  //   console.error(error);
  //   return null;
  // }

  return (
    <div className={styles.grid}>
      {issues.map((issue) => (
        <div key={issue.node.url}>
          <h3>{issue.node.title}</h3>
          <p>{issue.node.url}</p>
        </div>
      ))}
    </div>
  );
}
