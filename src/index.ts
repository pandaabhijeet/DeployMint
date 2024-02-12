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

    console.log(getFiles);


    const file = 'E:\\Web Dev Udemy\\DeployMint\\dist\\output\\lsie0v6iou\\src\\App.jsx';

    await uploadFile(file.slice(__dirname.length + 1), file);

    res.json({
        "repoId": repoId
    });
});


app.listen(port,() => {
    console.log("App is running on port: "+ port);
})
