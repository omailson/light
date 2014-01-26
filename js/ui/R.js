var R = {
    Body: document.body,
    Content: document.getElementById("content"),
    Canvas: document.getElementById("canvas"),
    GamePage: document.getElementById("gamepage"),
    YouWinDialog: {
        root: document.getElementById("you-win-dialog"),
        Menu: document.getElementById("you-win-menu"),
        PlayAgain: document.getElementById("you-win-playagain"),
        NextLevel: document.getElementById("you-win-nextlevel")
    },
    HomePage: {
        root: document.getElementById("homepage"),
        Play: document.getElementById("hp-play")
    },
    LevelPage: {
        root: document.getElementById("levelpage"),
        LevelList: document.getElementById("levels"),
        Levels: function () { return document.querySelectorAll("#levelpage li"); },
        Back: document.getElementById("levelpage-back")
    },
    ScoreWidget: {
        root: document.getElementById("scorewidget"),
        ScoreValue: document.querySelector("#scorewidget > span")
    },
    ChangedScoreWidget: document.getElementById("changedscore"),
    PausedText: document.getElementById("paused")
};
