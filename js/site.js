// https://www.youtube.com/watch?v=1yS-JV4fWqY&list=LL&index=3
const SELECTIONS = [
    {
        name: "rock",
        emoji: "✊",
        beats: ["scissors", "lizard"]
    },
    {
        name: "paper",
        emoji: "✋",
        beats: ["spock","rock"]
    },
    {
        name: "scissors",
        emoji: "✌️",
        beats: ["paper", "lizard"]
    },
    {
        name: "lizard",
        emoji: "🦎",
        beats: ["spock", "paper"]
    },
    {
        name: "spock",
        emoji: "🖖",
        beats: ["scissors", "rock"]
    }
]


const selectionButtons = document.querySelectorAll('[data-selection]');
const finalColumn = document.querySelector('[data-final-column]')
const resultParent = document.querySelector('[data-results]')
const computerScore = document.querySelector('[data-computer-score]')
const youScore = document.querySelector('[data-you-score]')
selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection;
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        makeSelection(selection);
    })
})

function incrementScore(score) {
    score.innerText = parseInt(score.innerText) + 1
}


function makeSelection(selection) {
    const computerSelection = randomSelection()
    const youWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner(computerSelection, selection)

    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(selection, youWinner)

    if (youWinner) incrementScore(youScore)
    if (computerWinner) incrementScore(computerScore)
}

function addSelectionResult(selection, winner) {
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add("result-selection")
    if (winner) div.classList.add("winner")
    finalColumn.after(div)
}



function randomSelection() {
    const randomIndx = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndx]
}

function isWinner(selection, computerSelection) {
    return selection.beats.includes(computerSelection.name)
}