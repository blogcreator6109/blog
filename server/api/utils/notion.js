import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  timeoutMs: 10000,
});

const getProp = function (prop) {
  if (!prop?.type) return null;
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
    case "file":
    case "external":
      return prop[t]?.url;
    case "files":
      return prop[t]?.[0]?.file?.url;
    case "date":
      return prop[t]?.start;
  }
};

export { notion, getProp };
