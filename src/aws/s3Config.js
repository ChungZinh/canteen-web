export const s3Config = {
    region: import.meta.env.VITE_S3_REGION,
    accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_S3_SECRET_ACCESS_KEY,
    bucket: import.meta.env.VITE_S3_BUCKET,
  };
  