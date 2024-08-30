export default function Game() {
  return <>
    <div class="container">
      <div class="form">
        <div class="title">
          <img src="assets/Ball 02.png" alt="" />
          <div class="text">
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
            autocomplete="off" />
          <select name="country" required autocomplete="off">
            <option value="" selected disabled>Select Country</option>
            <option>Brazil</option>
            <option>England</option>
            <option>Germany</option>
            <option>Italy</option>
            <option>Japan</option>
            <option>Netherlands</option>
            <option>Portugal</option>
            <option>Spain</option>
          </select>
          <select name="opponentCountry" required autocomplete="off">
            <option value="" selected disabled>Select Opponent Country</option>
            <option>Brazil</option>
            <option>England</option>
            <option>Germany</option>
            <option>Italy</option>
            <option>Japan</option>
            <option>Netherlands</option>
            <option>Portugal</option>
            <option>Spain</option>
          </select>
          <select name="level" required autocomplete="off">
            <option value="" selected disabled>Select level</option>
            <option value="30">Easy</option>
            <option value="20">Medium</option>
            <option value="15">Hard</option>
          </select>
          <label class="ballSelect">
            Select Ball
            <div class="options">
              <label class="ballOpt">
                <input type="radio" name="ball" value="Ball 01" required autocomplete="off" />
                <img src="assets/Ball 01.png" alt="Ball 01" />
              </label>
              <label class="ballOpt">
                <input type="radio" name="ball" value="Ball 02" required autocomplete="off" />
                <img src="assets/Ball 02.png" alt="Ball 02" />
              </label>
            </div>
          </label>
          <div class="actions">
            <button type="submit" id="playGame" autocomplete="off" disabled>Play Game</button>
            <button type="button" id="openInstruction">Open Instruction</button>
          </div>
        </form>
      </div>

      <div id="instructions">
        <div class="topbar">
          <h1>How to play</h1>
          <button id="closeInstruction">X</button>
        </div>

        <div class="steps">
          <div>Input Username</div>
          <div>Move character to bounce ball</div>
          <div>Get high score and win</div>
          <div>Enjoy!</div>
        </div>
      </div>
    </div>

    <script src="scripts/lobbypage.js"></script>
  </>
}