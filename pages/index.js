//nextjsのライブラリを読み込み
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

//作成したレイアウトファイルを読み込み
import Layout, { siteTitle } from '../components/Layout'
import utilStyles from '../styles/utils.module.css'
import HomeStyles from '../styles/Home.module.css'
import {getPostsData} from '../lib/post'


//CSSの読み込み
//import styles from '../styles/Home.module.css'


//SSGの場合※async関数（非同期処理）
//getStaticPropsはデータを一度だけ取得する関数
export async function getStaticProps(){
  const allPostsData = getPostsData();
  //console.log(allPostsData);

  //allPostsDataをHomeコンポーネントに渡す

  return {
    props: {
      allPostsData,
    }
  }
}

//SSRの場合※参考程度に…
//export async function getServerSideProps(context){
  //return {
    //props: {
      //コンポーネントに渡すためのProps

    //},
  //};
//}

//allPostsDataをHomeコンポーネントが受け取る
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>
          {siteTitle}
        </title>
      </Head>
      <p>
        各ページの内容が、Layoutのchildrenに挿入される。<br />
        Next.JSを使用したマイクロブログの作成
      </p>

      <section>
        <p className={utilStyles.headingMd}>
          Next.jsを利用したマイクロブログの作成
        </p>
      </section>

      <section>
        <h3>🗒エンジニアのブログ</h3>
        <div className={HomeStyles.grid}>
          {allPostsData.map(({id, title, date, thumbnail}) => (
            <article key={id}>
            <Link href={`/posts/${id}`}>
              <a>
                <img src={`${thumbnail}`} alt=""  className={HomeStyles.thumbnailImage}/>
              </a>
            </Link>
            <Link href={`/posts/${id}`}>
              <a className={utilStyles.boldText}>{title}</a>
            </Link>
            <br />
            <Link href={`/posts/${id}`}>
              <small className={utilStyles.lightText}>{date}</small>
            </Link>
          </article>
          ))}
        </div>
      </section>

    </Layout>
  )
}
