import express from "express";
import "dotenv/config";
import { getContents } from "./cloudGetContent";

const app = express();
const port = process.env.PORT;


app.get("/*", async (req, res)=>{

    const host = req.hostname;
    const domain = host.split(".")[0];
    const filepath = req.path;

    console.log(domain);
    console.log(filepath);

    const contents = await getContents(domain,filepath);

    const type = filepath.endsWith("html") ? "text/html" 
    : filepath.endsWith("css") ? "text/css" 
    : "application/javascript"

    res.set("Content-Type", type);
    res.send(contents.Body);
});

app.listen(port,()=>{console.log("App is listening on port: " + port)});