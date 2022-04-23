import Head from "next/head";
import styles from "../styles/Home.module.css";
import ClientOnly from "../components/ClientOnly";
import Issues from "../components/Issues";
import Link from "next/link";

export default function ClientSide() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Client side rendering</h1>
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
        <ClientOnly>
          <Issues />
        </ClientOnly>
      </main>
    </div>
  );
}
