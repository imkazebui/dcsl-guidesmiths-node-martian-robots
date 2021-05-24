let lostCoordinates = [];
function moveRobot(gridBoundary, position, moveCommand) {
  // Here we will represent orientations with numbers. Going clockwise, North is 0, East is 1,...
  const directions = "NESW";
  // We will convert the letter to number for calculation
  position[2] = directions.indexOf(position[2]);

  for (let i = 0; i < moveCommand.length; i++) {
    // Check if the current position exists in the lostCoordinates array
    let includesIn = lostCoordinates.includes(position.toString());
    // If the movement is L or R, we calculate the new orientation after turning
    if (moveCommand[i] === "L" || moveCommand[i] === "R") {
      position[2] = calculateAngle(moveCommand[i], position[2]);
      // If the position exists in the lostCoordinates, we ignore the next forward movement
    } else if (includesIn) {
      continue;
    } else {
      // We check if the next forward movement in any directions would put us out of the grid
      if (
        (position[2] === 0 && position[1] + 1 > gridBoundary[1]) ||
        (position[2] === 1 && position[0] + 1 > gridBoundary[0]) ||
        (position[2] === 2 && position[1] - 1 < 0) ||
        (position[2] === 3 && position[0] - 1 < 0)
      ) {
        lostCoordinates.push(position.toString());
        position.push("LOST");
        break;
      }
      // Move forward at North will increase y by 1, East will increase x by 1, South will decrease y by 1, and finally West will decrease x by 1
      switch (position[2]) {
        // Facing North
        case 0:
          position[1]++;
          continue;
        // Facing East
        case 1:
          position[0]++;
          continue;
        // Facing South
        case 2:
          position[1]--;
          continue;
        // Facing West
        case 3:
          position[0]--;
      }
    }
  }
  // Revert orientation back to letter from number
  position[2] = directions[position[2]];
  return position;
}
console.log(moveRobot([5, 3], [1, 1, "E"], "RFRFRFRF"));
console.log(moveRobot([5, 3], [3, 2, "N"], "FRRFLLFFRRFLL"));
console.log(moveRobot([5, 3], [0, 3, "W"], "LLFFFLFLFL"));

function calculateAngle(angle, currentDirection) {
  switch (angle) {
    // If the instruction is to turn left, we decrease the number by 1. Because East turns left is North, or 1 - 1 = 0. If it is to turn right, we simply add 1 instead
    case "L":
      currentDirection--;
      // When we turn left at North, we will get a -1, so we reset it back to 3, or West
      if (currentDirection < 0) currentDirection = 3;
      return currentDirection;
    case "R":
      currentDirection++;
      // If we turn right at West, we will get a 4, so we change it to 0, or North
      if (currentDirection > 3) currentDirection = 0;
      return currentDirection;
  }
}
