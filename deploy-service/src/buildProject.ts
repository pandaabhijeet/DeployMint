import { exec } from "child_process"
import path from "path"


export function buildProject(projectId : string){

    return new Promise((resolve) => {

        console.log(`cd ${path.join(__dirname, `output/${projectId}`)} && npm install && npm run build`);
        const child = exec( `cd ${path.join(__dirname, `output/${projectId}`)} && npm install && npm run build`);

        console.log("Please wait while we build the project...");

        child.stdout?.on("data", function(data){
            console.log('stdout: ' + data);
        });

        child.stderr?.on("data", function(data){
            console.log('stderr: ' + data);
        });

        child.on('close',function(code){
            console.log('close: ' + code);
            resolve("");
        });
    });
}