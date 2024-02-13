import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { generate } from "./generate";
import simpleGit from "simple-git";
import { getAllFiles } from "./getFiles";
import { uploadFile } from "./cloudUpload";

const app = express();
app.use(cors())
const port = process.env.PORT || 5000;
app.use(express.json());

app.post("/deploy", async (req,res) => {
    const repoUrl = req.body.repoUrl;
    console.log(repoUrl);
    const repoId = generate();

    console.log(path.join( __dirname,`output/${repoId}`));

    await simpleGit().clone(repoUrl, path.join( __dirname,`output/${repoId}`));

    const getFiles = getAllFiles(path.join( __dirname,`output/${repoId}`));

    //console.log(getFiles);


    try {
        getFiles.forEach(async(file) =>{
            const pathWithSlash = file.slice(__dirname.length + 1).replace(/\\/g, '/');
            console.log(pathWithSlash);    
            await uploadFile(pathWithSlash, file);
            })
    } catch (error) {
        console.log(error);
    }
    
    res.json({
        "repoId": repoId
    });
});


app.listen(port,() => {
    console.log("App is running on port: "+ port);
})
