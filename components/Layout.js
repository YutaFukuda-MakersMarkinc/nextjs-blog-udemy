import Head from "next/head";
import Image from "next/image";
import children from "react";
import Link from "next/link";

//CSSモジュールの読み込み
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import HomeStyles from '../styles/Home.module.css'


const name = "Shibainu Code";
//ページタイトルの設定
export const siteTitle = "Next.js blog";

//ページごとの内容を読み込む場所に、「children」を作成。
//Layoutのプロパティに「children」を設定する。
function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favion.ico" />
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <img src="/images/profile.png" alt="" className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}/>
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                ) : (
                    <>
                        <img src="/images/profile.png" alt="" className={`${utilStyles.borderCircle}`}/>
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                ) }
                
            </header>
            <p><Link href="/">mainタグの中を、各ページの内容に切り替える。</Link></p>
            <main>
                {children}
            </main>
                {home ? (
                    <></>
                ) : (
                    <>
                    <Link href="/"><a>←ホームへ戻る</a></Link>
                    </>
                ) }

                {!home && (
                    <>
                    <Link href="/"><a>←ホームへ戻る</a></Link>
                    </>
                )}
        </div>
    );
}

export default Layout;