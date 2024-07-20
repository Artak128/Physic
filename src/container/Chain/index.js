import Matter from "../../app/matter";
import Game from "../../app/game";

class Chains extends Game {
  constructor(pixiApp) {
    super(pixiApp);
    this.pixiApp = pixiApp;

    // Add Constraint for Mouse events
    Matter.turnOnDrag();

    // Create Circles First Chain
    this.createNewCircle({ x: 250, y: 50, radius: 40, matterOptions: { isStatic: true } });
    this.createNewCircle({ x: 250, y: 150, radius: 40 });
    this.createNewCircle({ x: 250, y: 250, radius: 40 });
    this.createNewCircle({ x: 250, y: 350, radius: 40 });
    this.createNewCircle({ x: 100, y: 450, radius: 40 });
    // Create Circles Second Chain
    this.createNewCircle({ x: 650, y: 50, radius: 40, matterOptions: { isStatic: true } });
    this.createNewCircle({ x: 650, y: 150, radius: 40 });
    this.createNewCircle({ x: 650, y: 250, radius: 40 });
    this.createNewCircle({ x: 650, y: 350, radius: 40 });
    this.createNewCircle({ x: 500, y: 450, radius: 40 });

    const matterBoxes = Matter.getAllBodies();

    // Create First Constraints
    for (let i = 0; i < 4; i++) {
      const boxConstraint = Matter.getConstraint({
        bodyA: matterBoxes[i],
        bodyB: matterBoxes[i + 1],
        length: 100,
        stiffness: 0.5,
      });
      Matter.addChild([boxConstraint]);
    }
    // Create Second Constraints
    for (let i = 5; i < 9; i++) {
      const boxConstraint = Matter.getConstraint({
        bodyA: matterBoxes[i],
        bodyB: matterBoxes[i + 1],
        length: 100,
        stiffness: 0.5,
      });
      Matter.addChild([boxConstraint]);
    }
  }
}

export default Chains;
