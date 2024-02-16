import { createClient, commandOptions } from "redis"

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
    }
}

main();