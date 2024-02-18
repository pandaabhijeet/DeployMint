import { createClient, commandOptions } from "redis"
import { downloadCloudFolder } from "./cloudDownload";
import { buildProject } from "./buildProject";

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

            //download folder from cloud
            await downloadCloudFolder(`output/${repoId}`);
            console.log("Repository downloaded.");

            //build the project (npm run build)
            repoId && await buildProject(repoId);
            console.log("Build complete.");

        }catch(error){
            console.log(error)
        }
        
    }
}

main();