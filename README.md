## Overview
The Herdsman is a 2D mini-game prototype. Created using technologies such as `Typescript` and `PIXI.js`

## Features
- **Animal Collection and Scoring**: Animals follow the Main Hero when approached, contributing to the score when they reach the yard.
- **Procedural Generation**: Movements of the animals and their spawning on the game field are procedurally generated.
- **Modular Design**: The game logic is separated into distinct modules, with `Interface` and `ViewEngine` classes that can be adapted to different environments or input methods.

## Structure
The project follows a modular approach, divided into clear, purpose-driven directories:
  - `modules`: Holds game logic, with separate classes for game actors like `MainHero` and `Animal`.
  - `ViewEngine`: Renders the game view and interfaces with PIXI.js.
  - `Interface`: Manages user input and game interaction.
  - `Procedural`: Encapsulates the procedural generation logic.
  - `Vector`: A utility class for 2D vector operations.

## Game Mechanics
- The `ViewEngine` handles rendering and user interactions within the game canvas.
- The `Procedural` class provides randomization functions to generate game elements dynamically.
- `Interface` translates user actions into game movements.
- The `Game` class orchestrates the overall game flow, utilizing `MainHero` and `Animal` classes to manage the game state.

## Patterns and Best Practices

In developing the Herdsman game prototype, I have employed several design patterns and programming best practices:

- **Singleton Pattern**: Used in classes like `ViewEngine`, `Game` and `Interface`, ensuring that only a single instance of these classes exists throughout the application's lifecycle.
- **Module Pattern**: By organizing code into modules, such as `Actor`, `Animal`, `MainHero`, and system modules like `Procedural` and `ViewEngine`, I ensured a clean separation of concerns, making the code more organized, maintainable, and testable.
- **Observer Pattern**: This can be seen in the way the `ViewEngine` class listens to and reacts to user input, creating a decoupled system where objects communicate without requiring a tight integration.
- **Prototype Pattern**: The procedural class uses a form of the prototype pattern by creating objects configured with values intended to be copied for new instances, which is particularly useful in procedural generation.
- **Command Pattern**: By encapsulating the action of moving the hero as a command in `Interface`, the game's control logic can be extended to include additional commands without modifying the existing codebase.
- 
Best practices are evident in the following areas:

- **Code Encapsulation**: Each class has a clear responsibility and manages its own state and behavior, which reduces complexity and increases the reusability of code.
- **Consistent Naming Conventions**: The project follows a consistent naming convention that makes it easy to infer the nature and usage of variables and methods.
- **Decoupled Logic and Presentation**: By separating game logic from rendering and input handling, the codebase allows for changes in one part without impacting others, adhering to the Single Responsibility Principle.
- 
## Ideas for Performance Improvement

As the game scales with more actors and complex interactions I propose utilizing Web Workers for offloading the calculation of `targetPositions` for all actors in the game.

- **Decoupling Calculation from Rendering**: By using Web Workers, we can calculate the positions and movements of all actors separately from the rendering process. 
- **ActorsPositions Class**: This class will hold an object with actor IDs as keys and their positions and target positions as values. The class will look something like this:

```typescript
interface IPosition {
  actorType: string; // 'animal' or 'MainHero'
  x: number;
  y: number;
  xTarget: number; // for lerp
  yTarget: number; // for lerp
  stopTime: number; // Date number for calculating deltaTime in WebWorker
}
// also it's could be just numbers for sharing memory array

class ActorsPositions {
  positions: { [key: string]: IPosition } = {}; // Fast access using actor ID as key

  worker: Worker = new Worker('path_to_worker_script');

  calculateCurrentPositions() {
    this.worker.postMessage(this.positions);
  }
}
```

- **Integration with ViewEngine**: ViewEngine will separately scan the actors in the array to get their properties and by their ID keys it will get the current position

## Game Framework Building Skills

My experience includes work with Unity, Unreal Engine, and Three.js. Unity has been my platform of choice for a current personal project — a 3D space colonization simulator. This project including procedural generation and noise algorithms to create an realistic and dynamically evolving galaxy.
