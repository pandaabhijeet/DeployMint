import { S3 } from "aws-sdk";
import "dotenv/config";
import path from "path";
import fs from "fs";


const s3 = new S3({
    accessKeyId : `${process.env.ACCESS_KEY_ID}`,
    secretAccessKey : `${process.env.SECRET_ACCESS_KEY}`,
    endpoint : `${process.env.ENDPOINT}`
})

export async function downloadCloudFolder(prefix : string) {

    console.log(`${process.env.ACCESS_KEY_ID}` + " " + `${process.env.SECRET_ACCESS_KEY}` + " " + `${process.env.ENDPOINT}`);

    const getAllFiles = await s3.listObjectsV2({
        Bucket :"deploymint",
        Prefix : prefix
    }).promise();

    console.log("getAllFiles");
    
    const allFilePromises = getAllFiles.Contents?.map(async ({Key}) => {

        return new Promise(async (resolve) => {
            if(!Key){
                resolve("");
                return;
            }

            const finalOutputPath = path.join(__dirname, Key);
            const outputFile =  fs.createWriteStream(finalOutputPath);
            const dirName = path.dirname(finalOutputPath);

            if(!fs.existsSync(dirName)){
                fs.mkdirSync(dirName,{ recursive : true});
            }

            console.log("dirName: " +dirName);

            s3.getObject({
                Bucket : 'deploymint',
                Key : Key || ""
            }).createReadStream().pipe(outputFile).on("finish",() => {
                resolve("");
            })
        });
    }) || []

    console.log("awaiting");

    await Promise.all(allFilePromises?.filter(x => x !== undefined));
    
} 



