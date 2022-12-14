/*   This is the base file for the Sokoban assignment - include this one in your HTML page, before you add the main script file*/

/*   Enum of CSS Classes for the immovable elements   */
const Tiles = {
  Wall: "tile wall",
  Empty: "tile empty",
  Goal: "tile goal",
};

/*   Enum of CSS Classes for the moving elements   */
const Entities = {
  Player: "entity player",
  Box: "entity box",
};

/*  Legend
    W = Wall
    B = Movable box
    P = Player starting position
    G = Goal area for the boxes
*/
const BoardMap = {
  width: 19,
  height: 16,
  map: [
    [
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
    [
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
    [
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
    [
      [" "],
      [" "],
      [" "],
      [" "],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
    [
      [" "],
      [" "],
      [" "],
      [" "],
      ["W"],
      [" "],
      [" "],
      [" "],
      ["W"],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
    [
      [" "],
      [" "],
      [" "],
      [" "],
      ["W"],
      ["B"],
      [" "],
      [" "],
      ["W"],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
    [
      [" "],
      [" "],
      ["W"],
      ["W"],
      ["W"],
      [" "],
      [" "],
      ["B"],
      ["W"],
      ["W"],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
    [
      [" "],
      [" "],
      ["W"],
      [" "],
      [" "],
      ["B"],
      [" "],
      ["B"],
      [" "],
      ["W"],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
    [
      ["W"],
      ["W"],
      ["W"],
      [" "],
      ["W"],
      [" "],
      ["W"],
      ["W"],
      [" "],
      ["W"],
      [" "],
      [" "],
      [" "],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
    ],
    [
      ["W"],
      [" "],
      [" "],
      [" "],
      ["W"],
      [" "],
      ["W"],
      ["W"],
      [" "],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      [" "],
      [" "],
      ["G"],
      ["G"],
      ["W"],
    ],
    [
      ["W"],
      [" "],
      ["B"],
      [" "],
      [" "],
      ["B"],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      ["G"],
      ["G"],
      ["W"],
    ],
    [
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      [" "],
      ["W"],
      ["W"],
      ["W"],
      [" "],
      ["W"],
      ["P"],
      ["W"],
      ["W"],
      [" "],
      [" "],
      ["G"],
      ["G"],
      ["W"],
    ],
    [
      [" "],
      [" "],
      [" "],
      [" "],
      ["W"],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
    ],
    [
      [" "],
      [" "],
      [" "],
      [" "],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
    [
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
    [
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
  ],
};