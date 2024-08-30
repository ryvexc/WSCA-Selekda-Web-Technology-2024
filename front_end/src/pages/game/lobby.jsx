import "./styles/global.css";
import "./styles/lobbypage.css";
import { Helmet } from "react-helmet";

export default function GameLobby() {
  return <>
    <Helmet>
      <script src="/game/scripts/lobbypage.js"></script>
    </Helmet>

    <div className="container">
      <div className="form">
        <div className="title">
          <img src="/game/assets/Ball 02.png" alt="" />
          <div className="text">
            <h1>World Head</h1>
            <h1>Football</h1>
          </div>
        </div>

        <form id="form">
          <input
            type="text"
            name="username"
            id="usernameInput"
            placeholder="Input Username"
            required
            autoComplete="off" />
          <select name="country" required autoComplete="off">
            <option value="" disabled>Select Country</option>
            <option>Brazil</option>
            <option>England</option>
            <option>Germany</option>
            <option>Italy</option>
            <option>Japan</option>
            <option>Netherlands</option>
            <option>Portugal</option>
            <option>Spain</option>
          </select>
          <select name="opponentCountry" required autoComplete="off">
            <option value="" disabled>Select Opponent Country</option>
            <option>Brazil</option>
            <option>England</option>
            <option>Germany</option>
            <option>Italy</option>
            <option>Japan</option>
            <option>Netherlands</option>
            <option>Portugal</option>
            <option>Spain</option>
          </select>
          <select name="level" required autoComplete="off">
            <option value="" disabled>Select level</option>
            <option value="30">Easy</option>
            <option value="20">Medium</option>
            <option value="15">Hard</option>
          </select>
          <label className="ballSelect">
            Select Ball
            <div className="options">
              <label className="ballOpt">
                <input type="radio" name="ball" value="Ball 01" required autoComplete="off" />
                <img src="assets/Ball 01.png" alt="Ball 01" />
              </label>
              <label className="ballOpt">
                <input type="radio" name="ball" value="Ball 02" required autoComplete="off" />
                <img src="assets/Ball 02.png" alt="Ball 02" />
              </label>
            </div>
          </label>
          <div className="actions">
            <button type="submit" id="playGame" autoComplete="off" disabled>Play Game</button>
            <button type="button" id="openInstruction">Open Instruction</button>
          </div>
        </form>
      </div>

      <div id="instructions">
        <div className="topbar">
          <h1>How to play</h1>
          <button id="closeInstruction">X</button>
        </div>

        <div className="steps">
          <div>Input Username</div>
          <div>Move character to bounce ball</div>
          <div>Get high score and win</div>
          <div>Enjoy!</div>
        </div>
      </div>
    </div>
  </>
}