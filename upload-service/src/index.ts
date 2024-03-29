import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { generate } from "./generate";
import simpleGit from "simple-git";
import { getAllFiles } from "./getFiles";
import { uploadFile } from "./cloudUpload";
import { createClient } from "redis";

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.json());

const publisher = createClient();
publisher.connect();
const subscriber = createClient();
subscriber.connect();

app.post("/deploy", async (req,res) => {
    const repoUrl = req.body.repoUrl;
    console.log(repoUrl);
    const repoId = generate();

    console.log(path.join( __dirname,`output/${repoId}`));

    await simpleGit().clone(repoUrl, path.join( __dirname,`output/${repoId}`));

    const getFiles = getAllFiles(path.join( __dirname,`output/${repoId}`));

    //console.log(getFiles);


    try {
         await Promise.all(getFiles.map(async(file) =>{
            const pathWithSlash = file.slice(__dirname.length + 1).replace(/\\/g, '/');
            console.log(pathWithSlash);    
            await uploadFile(pathWithSlash, file);
            }));

            publisher.LPUSH("build_queue", repoId);
            publisher.hSet("status",repoId,"uploaded");

            console.log("repository pushed to queue");
            
    } catch (error) {
        console.log(error);
    }
    
    res.json({
        "repoId": repoId
    });
});

app.get("/status", async (req,res) => {

    console.log("getting status for :");
    const repoId = req.query.id;
    console.log(repoId);
    const status = await subscriber.hGet("status", repoId as string);

    res.json({
        status : status
    });
    console.log("status: " + status);
})


app.listen(port,() => {
    console.log("App is running on port: "+ port);
})
