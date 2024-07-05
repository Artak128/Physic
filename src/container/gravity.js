import { Container, Graphics } from "pixi.js";
import Matter from "../matter";

class Game {
  constructor(pixiApp) {
    this.pixiApp = pixiApp;

    // Click Area
    this.clickArea = new Graphics().rect(0, 0, 1024, 614).fill();
    this.clickArea.alpha = 0;
    this.clickArea.interactive = true;
    this.addGraphic(this.clickArea);

    // Matter
    this.Matter = new Matter(pixiApp);

    // Matter Ground
    const ground = this.Matter.getRectangle(0, 614, 2000, 80, { isStatic: true });
    this.Matter.addChild(ground);

    // Events
    this.clickArea.on("pointerdown", (event) => {
      const { x, y } = event.data.global;
      this[["createNewRect", "createNewCircle"][Math.round(Math.random())]](x, y);
    });
  }

  update = () => {
    this.updatePositions();
  };

  createNewRect = (x, y) => {
    const size = 80;
    const pivot = size / 2;
    /* Matter Box */
    const newBox = this.Matter.getRectangle(x, y, size, size, { density: 0.5, restitution: 0.5, friction: 0.5 });

    /* Pixi Container with Rect Graphic */
    const newGraphic = new Graphics().fill(0xff0000).rect(0, 0, size, size).fill();
    newGraphic.stroke({ width: 2, color: 0xfeeb77 });
    const container = new Container();
    container.addChild(newGraphic);
    newGraphic.pivot.set(pivot, pivot);
    container.pivot.set(-pivot, -pivot);
    container.matterBox = newBox;

    this.addGraphic(container);
    this.Matter.addChild(newBox);
  };

  createNewCircle = (x, y) => {
    const radius = 40;
    /* Matter Box */
    const newBox = this.Matter.getCircle(x, y, radius, { density: 0.5, restitution: 0.5, friction: 0.5 });

    /* Pixi Container with Rect Graphic */
    const newGraphic = new Graphics().fill(0xff0000).circle(0, 0, radius).fill();
    newGraphic.stroke({ width: 2, color: 0xfeeb77 });
    const container = new Container();
    container.addChild(newGraphic);
    newGraphic.pivot.set(0, 0);
    container.pivot.set(-40, -40);
    container.matterBox = newBox;

    this.addGraphic(container);
    this.Matter.addChild(newBox);
  };

  addGraphic = (elem) => {
    this.pixiApp.stage.addChild(elem);
  };

  updatePositions = () => {
    const containers = this.pixiApp.stage.children;
    for (let i = 0; i < containers.length; i++) {
      const container = containers[i];
      const matterContainer = container.matterBox;

      if (container.constructor.name === "Container") {
        if (this.Matter.isOnScreen(matterContainer)) {
          /** Update position */
          const {
            position: { x, y },
            angle,
          } = matterContainer;

          container.position.set(x, y);
          container.children[0].rotation = angle;
        } else {
          /** Remove  element when outside of screen */
          this.removeElement(container, matterContainer);
        }
      }
    }
  };

  removeElement = (container, matterContainer) => {
    this.pixiApp.stage.removeChild(container);
    this.Matter.removeChild(matterContainer);
  };
}

export default Game;
