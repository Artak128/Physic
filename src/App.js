import { useEffect } from "react";
import { Application } from "pixi.js";
import Game from "./container/gravity";
// import Game from "./container/chains";
// import Game from "./container/plinko";
import "./App.css";

function App() {
  useEffect(() => {
    (async () => {
      const app = new Application();

      await app.init({ width: 1024, height: 614 });

      window.globalThis.__PIXI_APP__ = app; // For Devtools

      const game = new Game(app);
      app.ticker.add(game.update);
      document.querySelector("#pixi").appendChild(app.canvas);
    })();
  }, []);

  return <div id="pixi" />;
}

export default App;
