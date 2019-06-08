var Letter = require("./Letter.js");

function Word(answer) {
    this.objArray = [];

    for (var i = 0; i < answer.length; i++) {
        var letter = new Letter(answer[i]);
        this.objArray.push(letter);
    }

    this.log = function() {
        answerLog = "";
        for (var x = 0; x < this.objArray.length; x++){
            answerLog += this.objArray[x] + " ";
        }
        console.log(answerLog + "\n");
    }

    this.userGuess = function(input) {
        for (var j = 0; j < this.objArray.length; j++){
            this.objArray[j].guess(input);
        }
    }
}

module.exports = Word;