import { Container, Graphics } from "pixi.js";
import Matter from "../matter";

class Plinko {
  constructor(pixiApp) {
    this.pixiApp = pixiApp;

    // Matter
    this.Matter = new Matter(pixiApp);
    // Add Constraint for Mouse events
    this.Matter.addChild(this.Matter.getMouseConstraint());

    // Create Elements
    this.createNewCircle(250, 50, true);
    this.createNewCircle(250, 150);
    this.createNewCircle(250, 250);
    this.createNewCircle(250, 350);
    this.createNewCircle(100, 450);
    // Add Elements
    this.createNewCircle(550, 50, true);
    this.createNewCircle(550, 150);
    this.createNewCircle(550, 250);
    this.createNewCircle(550, 350);
    this.createNewCircle(400, 450);

    // Create Constraints
    const matterBoxes = this.Matter.getAllBodies();

    // Circle
    const boxConstraint = this.Matter.getConstraint({
      bodyA: matterBoxes[0],
      bodyB: matterBoxes[1],
      length: 100,
      stiffness: 0.5,
    });
    const boxConstraint2 = this.Matter.getConstraint({
      bodyA: matterBoxes[1],
      bodyB: matterBoxes[2],
      length: 100,
      stiffness: 0.5,
    });
    const boxConstraint3 = this.Matter.getConstraint({
      bodyA: matterBoxes[2],
      bodyB: matterBoxes[3],
      length: 100,
      stiffness: 0.5,
    });
    const boxConstraint4 = this.Matter.getConstraint({
      bodyA: matterBoxes[3],
      bodyB: matterBoxes[4],
      length: 100,
      stiffness: 0.5,
    });
    //
    const boxConstraint5 = this.Matter.getConstraint({
      bodyA: matterBoxes[5],
      bodyB: matterBoxes[6],
      length: 100,
      stiffness: 0.5,
    });
    const boxConstraint6 = this.Matter.getConstraint({
      bodyA: matterBoxes[6],
      bodyB: matterBoxes[7],
      length: 100,
      stiffness: 0.5,
    });
    const boxConstraint7 = this.Matter.getConstraint({
      bodyA: matterBoxes[7],
      bodyB: matterBoxes[8],
      length: 100,
      stiffness: 0.5,
    });
    const boxConstraint8 = this.Matter.getConstraint({
      bodyA: matterBoxes[8],
      bodyB: matterBoxes[9],
      length: 100,
      stiffness: 0.5,
    });

    this.Matter.addChild([
      boxConstraint,
      boxConstraint2,
      boxConstraint3,
      boxConstraint4,
      boxConstraint5,
      boxConstraint6,
      boxConstraint7,
      boxConstraint8,
    ]);

    // Add Ground
    const ground = this.Matter.getRectangle(0, 614, 2000, 80, { isStatic: true });
    this.Matter.addChild(ground);
  }

  update = () => {
    this.updatePositions();
  };

  createNewCircle = (x, y, isStatic = false) => {
    const size = 40;
    /* Matter Box */
    const newBox = this.Matter.getCircle(x, y, size, { density: 0.5, restitution: 0.5, friction: 0.5, isStatic });

    /* Pixi Container with Circle Graphic */
    const newGraphic = new Graphics().fill(0xff0000).circle(0, 0, size).fill();
    newGraphic.stroke({ width: 2, color: 0xfeeb77 });
    const container = new Container();
    container.addChild(newGraphic);
    newGraphic.pivot.set(0, 0);
    container.matterBox = newBox;

    this.addGraphic(container);
    this.Matter.addChild(newBox);
  };

  updatePositions = () => {
    const containers = this.pixiApp.stage.children;
    for (let i = 0; i < containers.length; i++) {
      const container = containers[i];
      const matterContainer = container.matterBox;

      /** Update position */
      const {
        position: { x, y },
        angle,
      } = matterContainer;

      container.position.set(x, y);
      container.children[0].rotation = angle;
    }
  };

  removeElement = (container, matterContainer) => {
    this.pixiApp.stage.removeChild(container);
    this.Matter.removeChild(matterContainer);
  };

  addGraphic = (elem) => this.pixiApp.stage.addChild(elem);
}

export default Plinko;
