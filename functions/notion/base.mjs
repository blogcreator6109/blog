import { Client } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  timeoutMs: 10000,
});

export const getImageBlob = async function (url) {
  const res = await fetch(url);
  const blob = await res.blob();
  return blob;
};

export const getProp = function (prop) {
  const t = prop.type;
  switch (t) {
    case "select":
      return prop[t].name;
    case "number":
    case "checkbox":
      return prop[t];
    case "rich_text":
    case "title":
      return prop[t][0]?.plain_text;
    case "created_time":
    case "last_edited_time":
      return prop[t].map((v) => v.name);
    case "multi_select":
      return prop[t].map((v) => ({
        name: v.name,
        color: v.color,
      }));
    case "files":
      return prop[t]?.[0]?.file?.url;
  }
};
