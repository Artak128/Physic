import { Engine, Render, Runner, Bodies, Composite, Constraint, MouseConstraint, Mouse } from "matter-js";

class Matter {
  constructor(pixiApp) {
    this.pixiApp = pixiApp;
    this.engine = Engine.create();

    Runner.run(this.engine);
  }

  addChild = (child) => Composite.add(this.engine.world, child);

  removeChild = (child) => Composite.remove(this.engine.world, child);

  getRectangle = (x, y, width, height, physicParams = {}) => Bodies.rectangle(x, y, width, height, physicParams);

  getCircle = (x, y, radius, physicParams = {}) => Bodies.circle(x, y, radius, physicParams);

  isOnScreen = ({ bounds }) => bounds.min.y < this.pixiApp.canvas.height + 50;

  getAllBodies = () => Composite.allBodies(this.engine.world);

  getConstraint = (params = {}) => Constraint.create(params);

  getMouseConstraint = () =>
    MouseConstraint.create(this.engine, {
      mouse: Mouse.create(this.pixiApp.canvas),
      constraint: {
        render: { visible: true },
      },
    });
}

export default Matter;
