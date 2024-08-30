import "./styles/global.css";
import "./styles/ingame.css";
import { Helmet } from "react-helmet";

export default function Game() {
  return <>
    <Helmet>
      <script src="scripts/ingame/classes/Vector.js"></script>
      <script src="scripts/ingame/classes/Size.js"></script>
      <script src="scripts/ingame/global.js"></script>
      <script src="scripts/ingame/classes/Ball.js"></script>
      <script src="scripts/ingame/classes/Character.js"></script>
      <script src="scripts/ingame/classes/Goal.js"></script>
      <script src="scripts/ingame/popups.js"></script>
      <script src="scripts/ingame/loop.js"></script>
    </Helmet>

    <div className="container">
      <div className="interface">
        <div className="left"><span id="playerName">PLAYER NAME</span></div>
        <div className="middle">
          <div className="countryInfo">
            <img src="/game/assets/Flag/Brazil.png" alt="Country A" id="countryA" />
            <span id="countryAText">Brazil</span>
          </div>
          <div className="gameInfo">
            <div className="scores">
              <div id="scoreA">0</div>
              <div id="scoreB">1</div>
            </div>
            <div className="timer">
              <span>TIMER</span>
              <span id="timer">30</span>
            </div>
          </div>
          <div className="countryInfo">
            <img src="/game/assets/Flag/Brazil.png" alt="Country B" id="countryB" />
            <span id="countryBText">Brazil</span>
          </div>
        </div>
        <div className="right">
          <span id="openMatchHistory">MATCH HISTORY</span>
        </div>
      </div>
      <div className="popups">
        <div id="countdown" className="hidden"></div>

        <div id="pauseMenu" className="hidden">
          <div className="panel">
            <div className="title">
              <img src="/game/assets/Ball 02.png" alt="Ball 02" />
              <div className="text">
                <h1>World Head</h1>
                <h1>Football</h1>
              </div>
            </div>
            <h2>Game Paused</h2>
            <button id="continueBtn">CONTINUE</button>
          </div>
        </div>

        <div id="overMenu" className="hidden">
          <div className="panel">
            <div className="title">
              <img src="/game/assets/Ball 02.png" alt="Ball 02" />
              <div className="text">
                <h1>World Head</h1>
                <h1>Football</h1>
              </div>
            </div>
            <h2>Game Over</h2>

            <div className="game-summary">
              <span id="sumPlayerName">PLAYER NAME</span>
              <table className="summary-group">
                <tbody>
                  <tr className="country-img-group">
                    <td>
                      <img src="/game/assets/Flag/Brazil.png" alt="" id="sumCountryAImg" />
                    </td>
                    <td className="divider"></td>
                    <td>
                      <img src="/game/assets/Flag/Brazil.png" alt="" id="sumCountryBImg" />
                    </td>
                  </tr>
                  <tr className="country-text-group">
                    <td>
                      <span id="sumCountryAText">Brazil</span>
                    </td>
                    <td className="divider">:</td>
                    <td>
                      <span id="sumCountryBText">Brazil</span>
                    </td>
                  </tr>
                  <tr className="scores-group">
                    <td>
                      <span id="sumScoreA">0</span>
                    </td>
                    <td className="divider">:</td>
                    <td>
                      <span id="sumScoreB">0</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="actions">
              <button id="saveBtn">Save Score</button>
              <button id="restartBtn">Restart Game</button>
              <button id="quitBtn">Quit Game</button>
            </div>
          </div>
        </div>

        <div id="matchHistory" className="hidden">
          <div className="panel">
            <div className="title">
              <img src="/game/assets/Ball 02.png" alt="Ball 02" />
              <div className="text">
                <h1>World Head</h1>
                <h1>Football</h1>
              </div>
            </div>

            <div className="top-bar">
              <h2>Match History</h2>
              <select id="sortMode">
                <option value="recent">Sort By Recent</option>
                <option value="score">Sort By Score</option>
              </select>
            </div>

            <div id="matches">
              <div className="match">
                <span className="plr-name">PLAYER NAME</span>
                <table className="summary-group">
                  <tbody>
                    <tr className="country-img-group">
                      <td>
                        <img src="/game/assets/Flag/Brazil.png" alt="" />
                      </td>
                      <td className="divider"></td>
                      <td>
                        <img src="/game/assets/Flag/Brazil.png" alt="" />
                      </td>
                    </tr>
                    <tr className="scores-group">
                      <td>
                        <span>0</span>
                      </td>
                      <td className="divider">-</td>
                      <td>
                        <span>0</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <button id="closeMatchHistory">Back</button>
          </div>
        </div>
      </div>
      <canvas id="canvas" width="1000" height="512"></canvas>
    </div>
  </>
}
