import { Graphics } from "pixi.js";
import Matter from "../../app/matter";
import Game from "../../app/game";

class Gravity extends Game {
  constructor(pixiApp) {
    super(pixiApp);
    this.pixiApp = pixiApp;

    // Click Area
    this.clickArea = new Graphics().rect(0, 0, 1024, 614).fill();
    this.clickArea.alpha = 0;
    this.clickArea.interactive = true;
    this.addGraphic(this.clickArea);

    // Events
    this.clickArea.on("pointerdown", (event) => {
      const { x, y } = event.data.global;

      const newCircle = () => {
        this.createNewCircle({
          x,
          y,
          radius: 40,
          containerPivot: { x: -40, y: -40 },
        });
      };
      const newRect = () => {
        this.createNewRect({
          x,
          y,
          size: 80,
          graphicPivot: { x: 40, y: 40 },
          containerPivot: { x: -40, y: -40 },
        });
      };

      [newCircle, newRect][Math.round(Math.random())]();
    });

    // Matter Ground
    const ground = Matter.getRectangle(0, 614, 2000, 80, { isStatic: true });
    Matter.addChild(ground);
  }
}

export default Gravity;
