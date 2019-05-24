var Word = require("./word.js");
var inquirer = require("inquirer");
var chalk = require("chalk");

var letterArray = "abcdefghijklmnopqrstuvwxyz";

var SaintSeiyaChar = ["saga", "manigoldo", "seiya", "shiryu", "shun", "ikki", "hyoga", "saori", "shaka", "dhoko", "mu", "camus", "shion", "aiolos", "shaina", "aioria", "shura", "aldebaran", "marin", "afrodita", "milo", "kanon", "hades", "poseidon", "hilda", "cassios", "kiki"];

var randomIndex = Math.floor(Math.random() * SaintSeiyaChar.length);
var randomWord = SaintSeiyaChar[randomIndex];

computerWord = new Word(randomWord);

var requireNewWord = false;

var incorrectLetters = [];
var correctLetters = [];

var guessesLeft = 10;
console.log(chalk.magenta.bold(
    "-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_\n" +
    "Welcome to the Constructor Hangman Game \n" +
    "    Saint Seiya Principal Characters    \n" +
    "-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_\n") +
    "How to Play? \n" +
    "1. The game will ask you for a letter betwen A - Z to start \n" +
    "2. The game will run and provide a randomly character\n" +
    "3. If the letter is correct the game fill the letter in the _ _\n" +
    "4. If the letter is wrong restores an guesses left\n" +
    "5. You win the game when complete the character name\n");

function knowledge() {

    if (requireNewWord) {
        var randomIndex = Math.floor(Math.random() * SaintSeiyaChar.length);
        var randomWord = SaintSeiyaChar[randomIndex];

        computerWord = new Word(randomWord);
        
        requireNewWord = false;
    }

    var wordComplete = [];
    computerWord.objArray.forEach(completeCheck);

    if (wordComplete.includes(false)) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Guess a letter between A-Z!",
                    name: "userinput"
                }
            ])
            .then(function (input) {

               
                if (!letterArray.includes(input.userinput) || input.userinput.length > 1) {
                    console.log("\nPlease try again!\n");
                    knowledge();
                } else {

                   
                    if (incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === "") {
                        console.log("\nAlready Guessed or Nothing Entered\n");
                        knowledge();
                    } else {

                        var wordCheckArray = [];
                        
                        computerWord.userGuess(input.userinput);

                        computerWord.objArray.forEach(wordCheck);
                        if (wordCheckArray.join('') === wordComplete.join('')) {
                            console.log(chalk.red("\nIncorrect\n"));
                           
                            incorrectLetters.push(input.userinput);
                            guessesLeft--;
                        } else {
                            console.log(chalk.green("\nCorrect!\n"));
                           
                            correctLetters.push(input.userinput);
                        }

                        
                        computerWord.log();

                        console.log("Guesses Left: " + guessesLeft + "\n");

                        console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");

                        if (guessesLeft > 0) { 
                            knowledge();
                        } else {
                            console.log(chalk.bgRed("Sorry, you lose!\n"));

                            restartGame();
                        }


                        
                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }
                    }
                }
            })
    } else {
        console.log(chalk.bgGreen("YOU WIN!\n"));

        restartGame();
    }

    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }

}

function restartGame() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to:",
                choices: ["Play Again", "Exit"],
                name: "restart"
            }
        ])
        .then(function (input) {
            if (input.restart === "Play Again") {
                requireNewWord = true;
                incorrectLetters = [];
                correctLetters = [];
                guessesLeft = 10;
                knowledge();
            } else {
                return
            }
        })
}

knowledge();