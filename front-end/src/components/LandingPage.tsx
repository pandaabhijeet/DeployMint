import "./LandingPage.css"
import { FaGithub } from "react-icons/fa";

function LandingPage(){
  return (
    <div className="wrapper">
      <form action="">
        <h1>Deploymint</h1>
        <h2>Deploy your application in one go !</h2>

        <div className="input-box">
          <input type="text" placeholder="Enter your GitHub Repository..." required/>
          <FaGithub className="icon"/>
        </div>

        <button className="deploy-btn" type="submit">Deploy</button>
      </form>
    </div>
  )
}

export default LandingPage;