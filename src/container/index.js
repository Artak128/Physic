import Matter from "../app/matter";
import Chains from "./Chain";
import Gravity from "./Gravity";
import Plinko from "./Plinko";

class Container {
  constructor(pixiApp) {
    this.pixiApp = pixiApp;
    this.game = {};
  }

  update = () => {
    this.game.update?.();
  };

  setGame = (gameType = "Plinko") => {
    this.pixiApp.stage.removeChildren();
    Matter.clearAllBodies();
    this.game = new { Plinko, Gravity, Chains }[`${gameType}`](this.pixiApp);
  };
}

export default Container;
