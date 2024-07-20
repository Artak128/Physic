import { useEffect, useRef, useState } from "react";
import { Application } from "pixi.js";
import Matter from "./app/matter";
import Container from "./container";
import "./App.css";

const gameTypes = ["Gravity", "Chains", "Plinko"];

function App() {
  const containerRef = useRef(null);
  const [gameType, setGameType] = useState(null);

  useEffect(() => {
    /* Init App */
    (async () => {
      const app = new Application();

      await app.init({ width: 1024, height: 614 });

      window.globalThis.__PIXI_APP__ = app; // For Devtools
      Matter.setPixiApp(app); // Set Pixi App for Matter
      Matter.run(); // Run Matter

      containerRef.current = new Container(app);
      app.ticker.add(containerRef.current.update);
      setGameType(gameTypes[0]);
      document.querySelector("#pixi").appendChild(app.canvas);
    })();
  }, []);

  useEffect(() => {
    if (containerRef.current && gameType) {
      containerRef.current.setGame(gameType);
    }
  }, [gameType]);

  return (
    <div>
      <div className="menu">
        {gameTypes.map((type, index) => (
          <p key={index} className={type === gameType ? "checked" : ""} onClick={() => setGameType(type)}>
            {type}
          </p>
        ))}
      </div>
      <div id="pixi" />
    </div>
  );
}

export default App;
