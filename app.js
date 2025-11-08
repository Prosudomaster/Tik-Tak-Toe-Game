let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;
let winnerFound = false;
const maxClicks = 9;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    winnerFound = false;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 && pos2 && pos3 && pos1 === pos2 && pos2 === pos3) {
            winnerFound = true;
            showWinner(pos1);
            return;
        }
    }

    if (count === 9 && winnerFound === false) {
        msg.innerText = "Game Draw!";
        msgContainer.classList.remove("hide");
    }
}

boxes.forEach(box => {
    box.addEventListener("click", () => {

        if (turnO) {
            box.innerText = "O";
            box.style.color = "#cee500ff";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "#00e1e5ff";
            turnO = true;
        }

        box.disabled = true;
        count++;
        checkWinner();
    });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
