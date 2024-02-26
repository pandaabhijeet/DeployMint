**This is an application that allows you to deploy your GitHub repository with a single click.**

**#### -- STEPS TO START AND DEPLOY --####**

Note : You need to have **Redis** loacally installed in your machine to be able to run this code.

1. Fork the repository or download the code package and open it in your code editor
2. There are four services each independent of the other that can be run deparately. Run each of them as below :

   a) Start the Redis server locally with command - **"sudo service redis-server start"**. You can take help from here : https://redis.io/docs/get-started/data-store/
   b) In your editor terminal cd to the upload service :
      - cd /[your local path]/upload-service
      - install all required dependencies with : "npm install"
      - finally build and run the service by :"tsc -build" , "node dist/index.js"
        
   c) Again your editor terminal cd to the deployment service :
      - cd /[your local path]/deploy-service
      - install all required dependencies with : "npm install"
      - finally build and run the service by :"tsc -build" , "node dist/index.js"

   d) Again your editor terminal cd to the request-handler service :
      - cd /[your local path]/request-handler
      - install all required dependencies with : "npm install"
      - finally build and run the service by :"tsc -build" , "node dist/index.js"
        
   e) Finally your editor terminal cd to the front-end service :
      - cd /[your local path]/front-end
      - install all required dependencies with : "npm install"
      - finally build and run the service by : "npm run dev"
  
  3. Once all the services are up & running, you can access the UI that looks like below :
     
     ![image](https://github.com/pandaabhijeet/DeployMint/assets/37467013/779c8964-2a63-4372-a4c3-a27598caca1f)

 4. You can paste your Github repostory link the input text and click on Deploy. This will return you a unique ID for your application and the current status of deployment :

    ![image](https://github.com/pandaabhijeet/DeployMint/assets/37467013/16b48411-be31-4f5c-91c1-475bc34b686c)

5. Once your repository is deployed, you will see a card showing the deployed URL with confirmation of deployement. You can simply click on the **"Visit Application"** button
   or copy and paste the URL provided in the card in a new tab in your browser.

   ![image](https://github.com/pandaabhijeet/DeployMint/assets/37467013/c4a2fb52-6e22-49ff-9174-49d3c0d6a758)

Note : You need to change your local host to the DNS of the above link. DNS should be in this format : **[deploymentId].deploymint.com**.
        You can take help from this : https://www.hostinger.in/tutorials/how-to-edit-hosts-file


Thats it, you can now run your application !! Suggestions are welcome. Happy Coding :)

 
