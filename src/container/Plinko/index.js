import { Graphics } from "pixi.js";
import Game from "../../app/game";

class Plinko extends Game {
  constructor(pixiApp) {
    super(pixiApp);
    this.pixiApp = pixiApp;

    for (let i = 2; i <= 7; i++) {
      for (let j = 0; j <= i; j++) {
        this.createNewCircle({
          x: 530 - i * 55 + j * 105,
          y: i * 70,
          matterOptions: { isStatic: true, friction: 0, restitution: 1 },
        });
      }
    }

    // Click Area
    this.clickArea = new Graphics().rect(0, 0, 1024, 614).fill();
    this.clickArea.alpha = 0;
    this.clickArea.interactive = true;
    this.pixiApp.stage.addChild(this.clickArea);

    // Events
    this.clickArea.on("pointerdown", (event) => {
      const randomPosition = [450, 475, 500, 525, 550, 575, 600][Math.floor(Math.random() * 7)];
      this.createNewCircle({
        x: randomPosition,
        y: -20,
        radius: 22,
        matterOptions: {
          collisionFilter: {
            group: "ball",
          },
        },
      });
    });
  }
}

export default Plinko;
