import { S3 } from "aws-sdk";
import fs from "fs";
import "dotenv/config"


const s3 = new S3({
    accessKeyId : `${process.env.ACCESS_KEY_ID}`,
    secretAccessKey : `${process.env.SECRET_ACCESS_KEY}`,
    endpoint : `${process.env.ENDPOINT}`
})

export const uploadFile = async (filename:string, localFilePath:string) => {
    const fileContent = fs.readFileSync(localFilePath);

    try {

        const uploadRes =  await s3.upload({
            Body : fileContent,
            Bucket : "deploymint",
            Key : filename,
        }).promise();
    
        console.log(uploadRes);

    } catch (error) {
        console.log(error);
    }
    
}