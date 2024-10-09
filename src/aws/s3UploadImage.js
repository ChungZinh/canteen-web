// S3Upload.ts

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const uploadFileToS3 = async (
  folder,
  file,
  params,
  onSuccess,
  onError
) => {
  const { region, accessKeyId, secretAccessKey, bucket } = params;
  const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const uploadParams = {
    Bucket: bucket,
    Key: `${folder}/${file.name}`,
    Body: file,
    ContentType: file.type,
  };

  try {
    const command = new PutObjectCommand(uploadParams);
    const data = await s3Client.send(command);

    if (data.$metadata.httpStatusCode === 200) {
      const url = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
      onSuccess(url);
    } else {
      onError("Failed to upload file");
    }
  } catch (error) {
    onError(error);
  }
};
