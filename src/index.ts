import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { generate } from "./generate";
import simpleGit from "simple-git";

const app = express();
app.use(cors())
const port = process.env.PORT || 5000;
app.use(express.json());

app.post("/deploy", async (req,res) => {
    const repoUrl = req.body.repoUrl;
    console.log(repoUrl);
    const repoId = generate();
    console.log("repoId= "+repoId);

    await simpleGit().clone(repoUrl,`output/${repoId}`);

    res.json({});
});

app.listen(port,() => {
    console.log("App is running on port: "+ port);
})

//app.listen(3000);