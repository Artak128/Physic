import { Container, Graphics } from "pixi.js";
import Matter from "../../app/matter";

class Game {
  constructor(pixiApp) {
    this.pixiApp = pixiApp;
  }

  update = () => {
    this.updatePositions();
  };

  createNewRect = ({
    x,
    y,
    size = 80,
    pivot = size / 2,
    matterOptions = {},
    graphicPivot = { x: 0, y: 0 },
    containerPivot = { x: 0, y: 0 },
  }) => {
    /* Matter Box */
    const newBox = Matter.getRectangle(x, y, size, size, {
      density: 0.5,
      restitution: 0.5,
      friction: 0.5,
      ...matterOptions,
    });
    /* Pixi Container with Rect Graphic */
    const newGraphic = new Graphics().fill(0xff0000).rect(0, 0, size, size).fill();
    newGraphic.stroke({ width: 2, color: 0xfeeb77 });
    const container = new Container();
    container.addChild(newGraphic);
    // newGraphic.pivot.set(pivot, pivot);
    // container.pivot.set(-pivot, -pivot);
    newGraphic.pivot.set(graphicPivot.x, graphicPivot.y);
    container.pivot.set(containerPivot.x, containerPivot.y);
    container.matterBox = newBox;

    this.addGraphic(container);
    Matter.addChild(newBox);
  };

  createNewCircle = ({
    x,
    y,
    radius = 10,
    graphicPivot = { x: 0, y: 0 },
    containerPivot = { x: 0, y: 0 },
    matterOptions = {},
  }) => {
    /* Matter Box */
    const newBox = Matter.getCircle(x, y, radius, { density: 0.5, restitution: 0.5, friction: 0.5, ...matterOptions });

    /* Pixi Container with Circle Graphic */
    const newGraphic = new Graphics().fill(0xff0000).circle(0, 0, radius).fill();
    newGraphic.stroke({ width: 2, color: 0xfeeb77 });
    const container = new Container();
    container.addChild(newGraphic);
    newGraphic.pivot.set(graphicPivot.x, graphicPivot.y);
    container.pivot.set(containerPivot.x, containerPivot.y);
    container.matterBox = newBox;

    this.addGraphic(container);
    Matter.addChild(newBox);
  };

  updatePositions = () => {
    const containers = this.pixiApp.stage.children;
    for (let i = 0; i < containers.length; i++) {
      const container = containers[i];
      const matterContainer = container.matterBox;

      if (container.constructor.name === "Container") {
        if (Matter.isOnScreen(matterContainer)) {
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
    Matter.removeChild(matterContainer);
  };

  addGraphic = (elem) => this.pixiApp.stage.addChild(elem);
}

export default Game;
