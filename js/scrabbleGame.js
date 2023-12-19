//Tomer Sheier 12/18/2023
//this is the JS code for the scrabble board game. 
//I utilized the jquery library to make the code easier to write and more efficient
//I also utilized the jquery UI library to make the tiles draggable and droppable
//I also used the jquery UI library to make the tiles snap to the board

var ScrabbleTiles = [];
ScrabbleTiles["A"] = { "value": 1, "original": 9, "remaining": 9 };
ScrabbleTiles["B"] = { "value": 3, "original": 2, "remaining": 2 };
ScrabbleTiles["C"] = { "value": 3, "original": 2, "remaining": 2 };
ScrabbleTiles["D"] = { "value": 2, "original": 4, "remaining": 4 };
ScrabbleTiles["E"] = { "value": 1, "original": 12, "remaining": 12 };
ScrabbleTiles["F"] = { "value": 4, "original": 2, "remaining": 2 };
ScrabbleTiles["G"] = { "value": 2, "original": 3, "remaining": 3 };
ScrabbleTiles["H"] = { "value": 4, "original": 2, "remaining": 2 };
ScrabbleTiles["I"] = { "value": 1, "original": 9, "remaining": 9 };
ScrabbleTiles["J"] = { "value": 8, "original": 1, "remaining": 1 };
ScrabbleTiles["K"] = { "value": 5, "original": 1, "remaining": 1 };
ScrabbleTiles["L"] = { "value": 1, "original": 4, "remaining": 4 };
ScrabbleTiles["M"] = { "value": 3, "original": 2, "remaining": 2 };
ScrabbleTiles["N"] = { "value": 1, "original": 6, "remaining": 6 };
ScrabbleTiles["O"] = { "value": 1, "original": 8, "remaining": 8 };
ScrabbleTiles["P"] = { "value": 3, "original": 2, "remaining": 2 };
ScrabbleTiles["Q"] = { "value": 10, "original": 1, "remaining": 1 };
ScrabbleTiles["R"] = { "value": 1, "original": 6, "remaining": 6 };
ScrabbleTiles["S"] = { "value": 1, "original": 4, "remaining": 4 };
ScrabbleTiles["T"] = { "value": 1, "original": 6, "remaining": 6 };
ScrabbleTiles["U"] = { "value": 1, "original": 4, "remaining": 4 };
ScrabbleTiles["V"] = { "value": 4, "original": 2, "remaining": 2 };
ScrabbleTiles["W"] = { "value": 4, "original": 2, "remaining": 2 };
ScrabbleTiles["X"] = { "value": 8, "original": 1, "remaining": 1 };
ScrabbleTiles["Y"] = { "value": 4, "original": 2, "remaining": 2 };
ScrabbleTiles["Z"] = { "value": 10, "original": 1, "remaining": 1 };
ScrabbleTiles["["] = { "value": 0, "original": 2, "remaining": 2 };

var tileSet = []; //for if there is a tile on the square
var playerRack = []; //players tiles
var score = 0;
var ScrabbleValues = Object.keys(ScrabbleTiles).length;

//first function is to get a random tile, set the rack, and fill the rack up with the tiles
function Rack() {
    var tileCount = 1;
    var src;
    var id;
    var title;
    var tileClass = "scrabbleTile";

    //set the rack as empty
    tileSet = [false, false, false, false, false, false, false, false];

    $('#rack div').empty();

    //loop through the rack and add tiles to it
    for (var i = 0; tileCount <= 7; i++) {

        var randTile = Math.floor((Math.random() * 27)); //get a random tile

        //This condition verifies whether there are still tiles remaining and the tile bag is not empty. 
        //If there are tiles left and the bag is not empty, it adds a randomly selected tile, 
        //reduces the remaining ScrabbleValue, and includes the image associated with the chosen tile.
        if (ScrabbleTiles[String.fromCharCode(65 + randTile)]["remaining"] !== 0 && remainingTiles()) {

            playerRack[tileCount] = {
                "letter": String.fromCharCode(65 + randTile),
                "value": ScrabbleTiles[String.fromCharCode(65 + randTile)]["value"]
            };

            ScrabbleTiles[String.fromCharCode(65 + randTile)]["remaining"]--; //reduce the remaining tiles

            id = "tile" + tileCount;
            title = playerRack[tileCount]["letter"];
            src = "./graphics_data/Scrabble_tiles/Scrabble_Tile_" + playerRack[tileCount]["letter"] + ".jpg"; //src link

            $('#playerRack').prepend($('<img>', {
                id: id,
                src: src,
                class: tileClass,
                title: title
            })); //add the tile to the rack


            tileCount++; //increment the tile count
        }

        //This condition verifies whether there are still tiles remaining and the tile bag is not empty.
        if (remainingTiles() == false) {

            //disable new tiles button upon no tiles left
            $('#Buttons').append("<p id='noTileLeft'>No more tiles</p>");
            $("#newTilesButton").prop("disabled", true);
            return;
        }

        //make the tiles draggable
        $("#" + id).draggable({
            snap: ".boardTile",
            snapMode: "inner"
        });
    }

    updateScore();
}

//function for drag and drop functionality.
function tileOnBoard(event, ui) {
    const tileId = $(this).attr("id");
    const tileTitle = $(this).attr("title");

    // Check if the tile has not been set on the board yet
    if (tileSet[tileId] === false) {
        const charCode = ui.draggable.attr("title").charCodeAt(0);
        const tileValue = ScrabbleTiles[String.fromCharCode(charCode)]["value"];

        // Perform score calculation based on the title attribute
        if (tileTitle === 'double') {
            score += 2 * tileValue;
        } else if (tileTitle === 'triple') {
            score += 3 * tileValue;
        } else if (tileTitle === 'blank') {
            score += tileValue;
        }

        tileSet[tileId] = true;
        updateScore();
    }
}

//subtract the value when the tile is removed,
function tileOffBoard(event, ui) {
    const tileId = $(this).attr("id");
    const tileTitle = $(this).attr("title");

    // Check if the tile has been set on the board
    if (tileSet[tileId] === true) {
        const charCode = ui.draggable.attr("title").charCodeAt(0);
        const tileValue = ScrabbleTiles[String.fromCharCode(charCode)]["value"];

        // Perform score calculation based on the title attribute
        if (tileTitle === 'double') {
            score -= 2 * tileValue;
        } else if (tileTitle === 'triple') {
            score -= 3 * tileValue;
        } else if (tileTitle === 'blank') {
            score -= tileValue;
        }

        tileSet[tileId] = false;
        updateScore();
    }
}

function reset() {

    $("#newTilesButton").prop("disabled", false);
    $('#noTileLeft').remove();

    for (k = 0; k < ScrabbleValues; k++) {
        ScrabbleTiles[String.fromCharCode(65 + k)]["remaining"] = ScrabbleTiles[String.fromCharCode(65 + k)]["original"];
    }

    score = 0;
    updateScore();
    Rack();
}

//update the score
function updateScore() {

    var curTile;

    $('#scoreSpan').text(score);

    //loop through th values of the table to each one
    for (j = 0; j < ScrabbleValues; j++) {

        curTile = String.fromCharCode(65 + j);

        if (curTile == "[") {
            curTile = "Blank";
        }

        //update the remaining tiles in table
        $("#" + curTile).text(ScrabbleTiles[String.fromCharCode(65 + j)]["remaining"]);

    }

}

function remainingTiles() {

    var tileSet = false;
    var count = 0;

    while (count < 27) {


        if (ScrabbleTiles[String.fromCharCode(65 + count)]["remaining"] !== 0) {
            tileSet = true; //if the tiles remaining is not 0, there are tiles left
        }
        count++; //increment the count
    }

    return tileSet;

}

$(document).ready(function() {

    Rack();
    $(".boardTile").droppable({
        drop: tileOnBoard,
        out: tileOffBoard
    });

});