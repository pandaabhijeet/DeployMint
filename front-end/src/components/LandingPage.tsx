import { useState } from "react";
import "./LandingPage.css";
import { FaGithub } from "react-icons/fa";
import axios from "axios";

const BACKEND_UPLOAD_URL = "http://localhost:3000";

function LandingPage() {
  const [repoUrl, setRepoUrl] = useState("");
  const [uploadId, setUploadId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deployed, setDeployed] = useState(false);

  return (
    <>
    <div className="wrapper">
      <form action="">
        <h1>Deploymint</h1>
        <h2>Deploy your application in one go !</h2>

        <div className="input-box">
          <input
            type="text"
            onChange={(e) => {
              setRepoUrl(e.target.value);
            }}
            placeholder="Enter your GitHub Repository..."
            required
          />
          <FaGithub className="icon" />
        </div>

        <button
          className="deploy-btn"
          type="submit"
          onClick={async () => {
            setUploading(true);
            const response = await axios.post(`${BACKEND_UPLOAD_URL}/deploy`, {
              repoUrl: repoUrl,
            });
            setUploadId(response.data.id);
            setUploading(false);

            const interval = setInterval(async () => {
              const res = await axios.get(`${BACKEND_UPLOAD_URL}/status?id=${response.data.id}`);

              if(res.data.status === "deployed"){
                clearInterval(interval);
                setDeployed(true);
              }
            }, 3000)
          
          }} disabled={uploadId !=="" || uploading}>
            {uploadId ? `Deploying (${uploadId})` : uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
    {deployed && 
    <div className="status-card">
      <h2>Your application has been successfully deployed!</h2>
      <div className="url-box">
        <h3>Deployed URL</h3>
        <input id="deployed-url" readOnly type="url" value={`http://${uploadId}.deploymint.com:3001/index.html`}/>
      </div>

      <button className="visit-btn">
        <a href={`http://${uploadId}.deploymint.com:3001/index.html`}>
          Visit Application
        </a>
      </button>
    </div>}
    </>
  );
}

export default LandingPage;
