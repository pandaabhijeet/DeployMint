import { createClient, commandOptions } from "redis"
import { downloadCloudFolder } from "./cloudDownload";

const subscriber = createClient();
subscriber.connect();

async function main() {
    while(true){
        console.log("subscriber is listening now.");
        const response = await subscriber.brPop(
            commandOptions({isolated: true}),
            "build_queue",
            0
        );
        console.log(response);

        const repoId = response?.element;

        try{
            const pathDown = `output/${repoId}`;
            console.log(pathDown);
            await downloadCloudFolder(`output/${repoId}`);
            console.log("Repository downloaded.")
        }catch(error){
            console.log(error)
        }
        
    }
}

main();