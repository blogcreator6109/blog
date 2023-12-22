import getTableData from "./notion/get_table.mjs";
import { storage } from "./firebase/base.mjs";
import { uploadFile } from "./firebase/storage.mjs";
import { saveFirestore } from "./firebase/firestore.mjs";

exports.handler = async function (event, context) {
  const tableData = await getTableData();

  await saveFirestore(tableData);

  return {
    statusCode: 200,
    body: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json",
    },
  };

  // // Firestore 데이터베이스 초기화
  // const db = admin.firestore();

  // // Notion API 초기화
  // const notion = new Client({ auth: process.env.NOTION_API_KEY });

  // try {
  //   // Notion API를 사용하여 데이터 가져오기
  //   // 예: 특정 데이터베이스에서 페이지 목록을 가져옵니다.
  //   const response = await notion.databases.query({
  //     database_id: process.env.NOTION_POST_TABLE_ID,
  //   });

  //   // Firestore에 데이터 저장
  //   response.results.forEach(async (page) => {
  //     const docRef = db.collection("notion_pages").doc(page.id);
  //     await docRef.set({
  //       // 저장할 데이터 구조를 정의합니다
  //       // 예: page 객체의 일부 데이터를 사용
  //       title: page.properties.Title.title[0].text.content,
  //       // 기타 필요한 데이터
  //     });
  //   });

  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify({ message: "Data transferred successfully" }),
  //   };
  // } catch (error) {
  //   console.error("Error:", error);
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify({ message: "Error occurred" }),
  //   };
  // }
};
