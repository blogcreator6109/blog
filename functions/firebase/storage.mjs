import { lookup } from "mime-types";

export const uploadFile = async (dest, file) => {
  const options = {
    destination: dest,
    public: true,
    metadata: {
      contentType: lookup(ext), // 이미지의 MIME 타입
      cacheControl: "public, max-age=604800",
    },
  };

  // await bucket.upload(filePath, options);
};
