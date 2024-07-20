import { Engine, Render, Runner, Bodies, Composite, Constraint, MouseConstraint, Mouse, World } from "matter-js";

class Matter {
  static #engine;

  static #pixiApp;

  static setPixiApp = (pixiApp) => {
    Matter.#pixiApp = pixiApp;
  };

  static addChild = (child) => {
    Composite.add(Matter.#engine.world, child);
  };

  static removeChild = (child) => Composite.remove(Matter.#engine.world, child);

  static getRectangle = (x, y, width, height, physicParams = {}) => Bodies.rectangle(x, y, width, height, physicParams);

  static getCircle = (x, y, radius, physicParams = {}) => Bodies.circle(x, y, radius, physicParams);

  static isOnScreen = ({ bounds }) => bounds.min.y < Matter.#pixiApp.canvas.height + 50;

  static getAllBodies = () => Composite.allBodies(Matter.#engine.world);

  static getConstraint = (params = {}) => Constraint.create(params);

  static getMouseConstraint = () =>
    MouseConstraint.create(Matter.#engine, {
      mouse: Mouse.create(Matter.#pixiApp.canvas),
      constraint: {
        render: { visible: true },
      },
    });

  static run = () => {
    Matter.#engine = Engine.create();
    Runner.run(Matter.#engine);
  };

  static turnOnDrag = () => Matter.addChild(Matter.getMouseConstraint());

  static clearAllBodies = () => Composite.clear(Matter.#engine.world, false);
}

export default Matter;
