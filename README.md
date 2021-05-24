# Martian Robot
## Running the algorithm
```sh
node index.js
```

The application works with the 3 provided test case. You can add further cases by adding
```js
console.log(moveRobot([5, 3], [0, 3, "W"], "LLFFFLFLFL"));
```

The first argument is the grid boundary, which should stay the same. The second is an array containing the original position of the robot. The third is the string representing the robot's movement.
The output is an array with the robot's current position, and if lost, an additional **LOST** string.