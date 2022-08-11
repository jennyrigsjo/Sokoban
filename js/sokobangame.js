/**
 * ---Table of contents---
 *  1. Setup
 *  2. Rendering functions
 *  3. Game logic functions
 *  4. Helper functions
 * 
 */

/*****************************************
                Setup
******************************************/
initBoard();
document.addEventListener("keydown", makeMove);
var levelComplete = false;



/*****************************************
            Rendering functions
******************************************/

function initBoard() {

    let main = document.getElementsByTagName("main")[0];

    let message = document.createElement("span");
    message.id = "level-complete";
    main.appendChild(message);
    
    let board = document.createElement("div");
    board.id = "board";

    let map = BoardMap.map;

    for (let row = 0; row < map.length; row++) 
    {
        for (let col = 0; col < map[row].length; col++) 
        {   
            let tile = document.createElement("div");
            tile.id = `${row}-${col}`;

            let tileContent = map[row][col];
            tile.className = getClassNames(tileContent);

            board.appendChild(tile);
        }
    }

    main.appendChild(board);
}


function updateBoard() {

    let map = BoardMap.map;

    for (let row = 0; row < map.length; row++) 
    {
        for (let col = 0; col < map[row].length; col++) 
        {   
            let id = `${row}-${col}`;
            let tile = document.getElementById(id);

            let tileContent = map[row][col];
            tile.className = getClassNames(tileContent);
        }
    }
}



/*****************************************
                Game logic
******************************************/

function makeMove(event) {

    let currentPosition = currentPlayerPosition();

    let directions = {
        "ArrowUp": "up",
        "ArrowDown": "down",
        "ArrowLeft": "left",
        "ArrowRight": "right",
    };

    if (Object.keys(directions).includes(event.key))
    {
        event.preventDefault();
        move(currentPosition, directions[event.key]);
    }

    updateBoard();

    if (levelComplete)
    {
        let message = document.getElementById("level-complete");
        message.style.display = "block";
        message.innerHTML = "Level complete!";
    }
}


function currentPlayerPosition() {
    
    let map = BoardMap.map;
    let player = "P";

    let row = map.findIndex(row => row.find(col => col.find(tile => tile.includes(player))));
    let col = map[row].findIndex(col => col.find(tile => tile.includes(player)));

    let position = {
        row: row,
        col: col,
    };
  
    return position;
}


function move(currentPosition, direction) {

    let directions = {
        "up": "upTile",
        "down": "downTile",
        "left": "leftTile",
        "right": "rightTile",
    };

    let targetTile = [];

    if (Object.keys(directions).includes(direction))
    {
        let dir = directions[direction];
        targetTile = getAdjacentTiles(currentPosition)[dir];
    }

    if (isTraversible(targetTile))
    {
        movePlayer(currentPosition, direction);
    }

    if (isBox(targetTile) && moveBox(currentPosition, direction))
    {
       movePlayer(currentPosition, direction);
    }
}


function movePlayer(currentPosition, direction) {

    moveFromTile(currentPosition, "P");

    let directions = {
        "up": "upPos",
        "down": "downPos",
        "left": "leftPos",
        "right": "rightPos",
    };

    if (Object.keys(directions).includes(direction))
    {
        let dir = directions[direction];
        let coordinates = getAdjacentTiles(currentPosition)[dir];
        moveToTile(coordinates, "P");
    }
}


function moveBox(playerPosition, direction) {

    let currentPos = {};
    let targetPos = {};
    let targetTile = [];

    let directions = {
        "up": {pos: "upPos", tile: "upTile"},
        "down": {pos: "downPos", tile: "downTile"},
        "left": {pos: "leftPos", tile: "leftTile"},
        "right": {pos: "rightPos", tile: "rightTile"},
    };

    if (Object.keys(directions).includes(direction))
    {
        let pos = directions[direction]["pos"];
        let tile = directions[direction]["tile"];

        currentPos = getAdjacentTiles(playerPosition)[pos];
        targetPos = getAdjacentTiles(currentPos)[pos];
        targetTile = getAdjacentTiles(currentPos)[tile];
    }

    if (isTraversible(targetTile)) 
    {
        moveFromTile(currentPos, "B");
        moveToTile(targetPos, "B");

        if (allBoxesInGoal())
        {   
            levelComplete = true;
        }

        return true;
    }

    return false;
}


function moveFromTile(fromPosition, entity) {

    let index = BoardMap.map[fromPosition.row][fromPosition.col].indexOf(entity);

    if (index > -1)
    {
        BoardMap.map[fromPosition.row][fromPosition.col].splice(index, 1);
    }

    if (BoardMap.map[fromPosition.row][fromPosition.col].length == 0)
    {
        // make sure the array contains at least one (empty) element
        BoardMap.map[fromPosition.row][fromPosition.col].push(" ");
    }
}


function moveToTile(toPosition, entity) {
    BoardMap.map[toPosition.row][toPosition.col].push(entity);
}


function allBoxesInGoal() {

    let allBoxesInGoal = true;
    let map = BoardMap.map;

    for (let row = 0; row < map.length; row++)
    {
        for (let col = 0; col < map[row].length; col++)
        {
            let tile = map[row][col];

            if (isBox(tile) && !isGoal(tile)) 
            {
                allBoxesInGoal = false;
                return allBoxesInGoal;
            }
        }
    }

    return allBoxesInGoal;
}



/*****************************************
            Helper functions
******************************************/

function getClassNames(tile) {

    let classNames = "";
    let list = "";

    for (let letter = 0; letter < tile.length; letter++) 
    {
        switch(tile[letter]) 
        {
            case "W":
                list = Tiles.Wall;
                break;
            case "B":
                list = Entities.Box;
                break;
            case "P":
                list = Entities.Player;
                break;
            case "G":
                list = Tiles.Goal;
                break;
            default:
              list = Tiles.Empty;
        }

        classNames += (classNames.length == 0) ? list : " " + list;
    }

    return classNames;
}


function getAdjacentTiles(position) {

    let up = {row: position.row - 1, col: position.col};
    let down = {row: position.row + 1, col: position.col};
    let left = {row: position.row, col: position.col - 1};
    let right = {row: position.row, col: position.col + 1};

    let adjacentTiles = {
        upPos: up,
        downPos: down,
        leftPos: left,
        rightPos: right,
        upTile: getTile(up),
        downTile: getTile(down),
        leftTile: getTile(left),
        rightTile: getTile(right),
    };

    return adjacentTiles;
}


function getTile(position) 
{
    let tile = BoardMap.map[position.row][position.col];
    return tile;
}


function isWall(tile) {
    return tile.includes("W");
}


function isBox(tile) {
    return tile.includes("B");
}


function isGoal(tile) {
    return tile.includes("G");
}


function isTraversible(tile) {
    return (!isWall(tile) && !isBox(tile));
}