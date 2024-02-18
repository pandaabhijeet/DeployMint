import "dotenv/config";
import { S3 } from "aws-sdk";

const s3 = new S3({
    accessKeyId : `${process.env.ACCESS_KEY_ID}`,
    secretAccessKey : `${process.env.SECRET_ACCESS_KEY}`,
    endpoint : `${process.env.ENDPOINT}`
});

export async function getContents(domain : string, filePath : string){

    return await s3.getObject({
        Bucket : "deploymint",
        Key : `dist/${domain}${filePath}`
    }).promise();
}
