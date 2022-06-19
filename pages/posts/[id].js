import Head from 'next/head'
import Layout, { siteTitle } from "../../components/Layout";

//getAllPostIds、getPostsDataを取得
import { getAllPostIds, getPostData } from '../../lib/post'
import utilStyles from '../../styles/utils.module.css'


//SSGの場合※async関数（非同期処理）

//getStaticPathsはデータのパスを取得する
export async function getStaticPaths(){
    const paths = getAllPostIds();

    return{
        paths,
        //fallback: falseは該当のURLがない場合に「404」を返す仕組み
        fallback: false,
    };
};

//getStaticPropsはデータを一度だけ取得する関数
export async function getStaticProps({ params }){
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
        }
      }

}

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>
                    {postData.title}｜{siteTitle}
                </title>
            </Head>
            <article>
                <h1 className={utilStyles.headdingX1}>{postData.title}</h1>
                <p className={utilStyles.lightText}>{postData.date}</p>
                <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }}/>
            </article>
        </Layout>
    );
}   