import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");
//process,cwd()はカレンとディレクトを指している
//(process,cwd(), "posts")でカレントディレクトリ内の「posts」ディレクトリ

//◆mdファイルのデータを取り出す
export function getPostsData() {
    //外部サーバからデータを取得する場合※外部APIに接続
    //const fetchData = await fetch("endpointを記述");
    
    //postsDirectory内（postsディレクトリ）ファイル名を配列として取得
    const fileNames = fs.readdirSync(postsDirectory);

    //配列として取り出したfileNamesを個別のデータにする。
    const allPostsData = fileNames.map((fileName) => {
        //個別にしたデータfileNameから拡張子を消し、変数（id）に代入する
        //※replaceは置き換え、第二引数を空欄にすることで、削除できる
        const id = fileName.replace(/\.md$/,"");

        //◆マークダウンファイルを文字列として読み取る
        //マークダウンファイルのパスを指定する
        const fullPath = path.join(postsDirectory,fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        //ライブラリgray-matterを使用して、マークダウンファイルのメタデータの解析を行う
        const matterResult = matter(fileContents);

        //idとデータを返す
        return {
            id,
            //matterResultの「...」は取得するメタデータの種類（?）だけ必要
            ...matterResult.data,
        }
    });
    return allPostsData;
}

//getStaticPathでreturnで使うpathを取得する
export function getAllPostIds(){
    //postsディレクトリ 内のファイル名を全て取得
    const fileNames = fs.readdirSync(postsDirectory);
    //fileNamesで取得したファイル名を、バラバラする
    return fileNames.map((fileName) => {
        return{
            params: {
                //ファイル名を変数[id]に渡す
                id: fileName.replace(/\.md$/,"")
            },
        };
    });
}

//IDに基づいてブログ記事情報を返す
export async function getPostData(id){
    //◆マークダウンファイルを文字列として読み取る
    //マークダウンファイルのパスを指定する
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    //読み込んだファイル内容の取得
    const matterResult = matter(fileContent);

    //読み込んだ.mdファイルをhtml形式に変換し、「blogContent」に投げ込む
    const blogContent = await remark().use(html).process(matterResult.content);

    const blogContentHTML = blogContent.toString();

    //記事ID、記事本文、記事のメタデータを返す
    return {
        id,
        blogContentHTML,
        ...matterResult.data
    };
}