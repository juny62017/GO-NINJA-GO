const canvas = document.getElementById('main_screen');
const context = canvas.getContext("2d");
var pressedKeys = {};
window.onkeyup = function(e) {
    pressedKeys[e.keyCode] = false;
};
window.onkeydown = function(e) {
    pressedKeys[e.keyCode] = true;
};

const titleScreen = document.getElementById("title-screen");
const layers = [
    document.getElementById("parallax-mountain-bg"),
    document.getElementById("parallax-mountain-montain-far"),
    document.getElementById("parallax-mountain-mountains"),
    document.getElementById("parallax-mountain-trees"),
    document.getElementById("parallax-mountain-foreground-trees")
];
const tiles = document.getElementById("tiles");
const heroIdleAnimationLeft = document.getElementById("hero-idle-left");
const heroIdleAnimationRight = document.getElementById("hero-idle-right");
const heroRunAnimationLeft = document.getElementById("hero-run-left");
const heroRunAnimationRight = document.getElementById("hero-run-right");
const heroJumpAnimationLeft = document.getElementById("hero-jump-left");
const heroJumpAnimationRight = document.getElementById("hero-jump-right");
const heroAttackAnimationLeft = document.getElementById("hero-attack-left");
const heroAttackAnimationRight = document.getElementById("hero-attack-right");
const heroCrouchAnimationLeft = document.getElementById("hero-crouch-left");
const heroCrouchAnimationRight = document.getElementById("hero-crouch-right");
const heroHurtAnimationLeft = document.getElementById("hero-hurt-left");
const heroHurtAnimationRight = document.getElementById("hero-hurt-right");

let heroAnimations = [
    [heroIdleAnimationLeft, 4],
    [heroIdleAnimationRight, 4],
    [heroRunAnimationLeft, 6],
    [heroRunAnimationRight, 6],
    [heroJumpAnimationLeft, 4],
    [heroJumpAnimationRight, 4],
    [heroAttackAnimationLeft, 5],
    [heroAttackAnimationRight, 5],
    [heroCrouchAnimationLeft, 1],
    [heroCrouchAnimationRight, 1],
    [heroHurtAnimationLeft, 1],
    [heroHurtAnimationRight, 1]
];

let heroAnimationIndex = 1;
let heroDirection = 1;
let heroJumping = false;
let heroPeakJumping = false;
let jumpPressedLastFrame = false;
let hoverjump = false;
var scrollX = 0;
var resetAnimationTime = Date.now();
var previousHeroAnimationIndex = 1;
let currentLevel = [];
let currentLevelIndex = 0;
let levelNoticeUntil = 0;
let points = 0;
let gameStarted = false;
let gameOver = false;
let demoComplete = false;
let levelTransition = false;
let completedLevelIndex = 0;
let runComplete = false;
let finalScore = 0;
const levelRow00 = [
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    1,1,1,1,
];
const levelRow01 = [
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    1,1,1,1,
];
const levelRow02 = [
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,12,0,
    1,1,1,1,
];
const levelRow03 = [
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,8,8,
    1,1,1,1,
];
const levelRow04 = [
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    1,1,1,1,
];
const levelRow05 = [
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,1,1,
    0,0,0,0,
    0,0,1,4,
    1,0,0,0,
    0,0,1,6,
    1,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    1,1,1,1,
];
const levelRow06 = [
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    1,1,1,1,
];
const levelRow07 = [
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,3,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    1,1,1,1,
];
const levelRow08 = [
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,2,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    1,1,1,1,
];
const levelRow09 = [
    8,0,8,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    1,1,1,1,
];
const levelRow10 = [
    9,0,9,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    1,1,1,1,
];
const levelRow11 = [
    9,3,9,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,1,6,
    1,0,0,0,
    1,4,1,0,
    0,0,0,0,
    0,0,0,8,
    3,8,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,6,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    1,1,1,1,
];
const levelRow12 = [
    1,2,1,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,9,
    9,9,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    2,8,2,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
];
const levelRow13 = [
    1,3,1,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    9,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,2,
    1,9,1,2,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,10,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
    0,0,0,0,
];
const levelRow14 = [
    1,1,1,1,
    1,1,1,1,
    4,5,6,1,
    1,1,1,1,
    1,0,0,0,
    0,3,2,0,
    0,0,0,0,
    0,0,3,0,
    0,0,0,0,
    0,0,1,1,
    1,1,1,1,
    3,0,0,0,
    8,0,0,0,
    0,8,0,0,
    0,0,1,1,
    1,1,2,3,
    4,5,4,3,
    2,1,1,1,
    1,0,0,0,
    0,5,0,0,
    0,1,6,1,
    0,0,0,0,
    0,0,0,0,
    0,0,0,1,
    1,1,1,1,
    1,1,1,1,
    1,1,1,1,
];
var levels = [[
    levelRow00,
    levelRow01,
    levelRow02,
    levelRow03,
    levelRow04,
    levelRow05,
    levelRow06,
    levelRow07,
    levelRow08,
    levelRow09,
    levelRow10,
    levelRow11,
    levelRow12,
    levelRow13,
    levelRow14
]];

var cloneLevel = function(level) {
    return level.map(function(row) {
        return row.slice();
    });
};

var applyLevelPatches = function(level, patches) {
    let nextLevel = cloneLevel(level);
    for (let i = 0; i < patches.length; i++) {
        let patch = patches[i];
        nextLevel[patch[0]][patch[1]] = patch[2];
    }
    return nextLevel;
};

const levelTwoPatches = [
    [13, 82, 0],
    [2, 102, 0],
    [10, 55, 10],
    [7, 88, 12],
    [11, 53, 1],
    [11, 54, 1],
    [11, 55, 1],
    [11, 56, 1],
    [11, 57, 1],
    [8, 86, 1],
    [8, 87, 1],
    [8, 88, 1],
    [8, 89, 1],
    [8, 90, 1],
    [12, 20, 1],
    [12, 21, 1],
    [12, 22, 1],
    [12, 23, 1],
    [12, 24, 1],
    [11, 35, 1],
    [11, 36, 1],
    [11, 37, 1],
    [11, 38, 1],
    [11, 39, 1],
    [10, 36, 1],
    [10, 37, 1],
    [10, 38, 1],
    [10, 39, 1],
    [12, 48, 1],
    [12, 49, 1],
    [12, 50, 1],
    [12, 51, 1],
    [12, 52, 1],
    [11, 48, 1],
    [11, 49, 1],
    [11, 50, 1],
    [11, 51, 1],
    [11, 52, 1],
    [10, 61, 1],
    [10, 62, 1],
    [10, 63, 1],
    [10, 64, 1],
    [10, 65, 1],
    [9, 62, 1],
    [9, 63, 1],
    [9, 64, 1],
    [9, 65, 1],
    [9, 66, 1],
    [12, 74, 1],
    [12, 75, 1],
    [12, 76, 1],
    [12, 77, 1],
    [12, 78, 1],
    [12, 79, 1],
    [11, 75, 1],
    [11, 76, 1],
    [11, 77, 1],
    [11, 78, 1],
    [11, 79, 1],
    [10, 90, 1],
    [10, 91, 1],
    [10, 92, 1],
    [10, 93, 1],
    [10, 94, 1],
    [9, 91, 1],
    [9, 92, 1],
    [9, 93, 1],
    [9, 94, 1],
    [6, 96, 1],
    [6, 97, 1],
    [6, 98, 1],
    [6, 99, 1],
    [6, 100, 1],
    [6, 101, 1],
    [5, 96, 1],
    [5, 97, 1],
    [5, 98, 1],
    [5, 99, 1],
    [5, 100, 1],
    [5, 101, 1],
];

const levelTwo = applyLevelPatches(levels[0], levelTwoPatches);
levels.push(levelTwo);

const levelThreePatches = [
    [13, 82, 0],
    [2, 102, 0],
    [9, 65, 10],
    [5, 95, 12],
    [12, 18, 1],
    [12, 19, 1],
    [12, 20, 1],
    [12, 21, 1],
    [12, 22, 1],
    [11, 20, 1],
    [11, 21, 1],
    [11, 22, 1],
    [11, 23, 1],
    [11, 24, 1],
    [10, 28, 1],
    [10, 29, 1],
    [10, 30, 1],
    [10, 31, 1],
    [10, 32, 1],
    [9, 36, 1],
    [9, 37, 1],
    [9, 38, 1],
    [9, 39, 1],
    [9, 40, 1],
    [8, 46, 1],
    [8, 47, 1],
    [8, 48, 1],
    [8, 49, 1],
    [8, 50, 1],
    [7, 56, 1],
    [7, 57, 1],
    [7, 58, 1],
    [7, 59, 1],
    [7, 60, 1],
    [6, 64, 1],
    [6, 65, 1],
    [6, 66, 1],
    [6, 67, 1],
    [6, 68, 1],
    [5, 72, 1],
    [5, 73, 1],
    [5, 74, 1],
    [5, 75, 1],
    [5, 76, 1],
    [4, 80, 1],
    [4, 81, 1],
    [4, 82, 1],
    [4, 83, 1],
    [4, 84, 1],
    [8, 82, 1],
    [8, 83, 1],
    [8, 84, 1],
    [8, 85, 1],
    [8, 86, 1],
    [7, 90, 1],
    [7, 91, 1],
    [7, 92, 1],
    [7, 93, 1],
    [7, 94, 1],
    [6, 96, 1],
    [6, 97, 1],
    [6, 98, 1],
    [6, 99, 1],
    [6, 100, 1],
    [14, 12, 0],
    [14, 13, 0],
    [14, 38, 0],
    [14, 39, 0],
    [14, 58, 0],
    [14, 59, 0],
    [14, 69, 0],
    [14, 70, 0],
    [14, 95, 0],
    [14, 96, 0],
    [13, 12, 1],
    [13, 13, 1],
    [13, 38, 1],
    [13, 39, 1],
    [13, 58, 1],
    [13, 59, 1],
    [13, 69, 1],
    [13, 70, 1],
    [13, 95, 1],
    [13, 96, 1],
];

const levelThree = applyLevelPatches(levels[0], levelThreePatches);
levels.push(levelThree);

const SCREEN_WIDTH = 816;
const SCREEN_HEIGHT = 480;
const TILE_SIZE = 32;
let distanceFromFloor = 0;
let nearestFloorHeight = -59;
let newJumpPress = false;
let attackCompleted = false;

let hero = {
    spriteWidth: 100,
    spriteHeight: 59,
    levelX: 140,
    levelY: 480 - 32 - 59,
    renderX: 100,
    renderY: 480 - 32 - 59,
    velocityY: 0
};

var audioElement = document.getElementById("theAudio");
var musicToggle = document.getElementById("music-toggle");
audioElement.load();
audioElement.volume = 0.6;
var audioPlaying = false;
var musicEnabled = true;
var enterPressedInitially = false;
var beyondTitleScreen = false;

function updateMusicToggle() {
    musicToggle.textContent = musicEnabled ? "Music: ON" : "Music: OFF";
    musicToggle.setAttribute("aria-pressed", musicEnabled ? "true" : "false");
    musicToggle.setAttribute(
        "aria-label",
        musicEnabled ? "Turn music off" : "Turn music on"
    );
    musicToggle.classList.toggle("muted", !musicEnabled);
};

function pauseMusic() {
    if (!audioElement.paused) {
        audioElement.pause();
    }
    audioPlaying = false;
};

function resumeMusic() {
    if (!musicEnabled || !gameStarted || !enterPressedInitially) {
        return;
    }
    audioElement.play();
    audioPlaying = true;
};

function toggleMusic() {
    musicEnabled = !musicEnabled;
    if (musicEnabled) {
        resumeMusic();
    } else {
        pauseMusic();
    }
    updateMusicToggle();
};

musicToggle.addEventListener("click", toggleMusic);
updateMusicToggle();

onInitialEnterPress = function(e) {
    if (e.key == "Enter") {
        enterPressedInitially = true;
        if (musicEnabled) {
            audioElement.play();
            audioPlaying = true;
        }
    }
};
document.addEventListener('keypress', onInitialEnterPress);

function drawTile(x, y, tileIndex) {
    var sx = tileIndex * 32 -
        64 * Math.floor(tileIndex / 64) * 32;
    var sy = Math.floor(tileIndex / 64) * 32;
    context.drawImage(
        tiles,
        sx,
        sy,
        32,
        32,
        x,
        y,
        32,
        32
    );
};

function drawLevelTiles(level, hTiles, vTiles, scrollPosition) {
    for (var i = 0; i < hTiles; i++) {
        for (var j = 0; j < vTiles; j++) {
            if (level[j][i] == 1) {
                drawTile(
                    32 * i - scrollPosition,
                    j * 32,
                    18 + 64 * 3
                );
            } else if (level[j][i] == 10) {
                drawTile(
                    32 * i - scrollPosition,
                    j * 32,
                    49 + 64 * 9
                );
            } else if (level[j][i] == 12) {
                drawTile(
                    32 * i - scrollPosition,
                    j * 32,
                    23 + 64 * 1
                );
            } else if (level[j][i] != 0) {
                drawTile(
                    32 * i - scrollPosition,
                    j * 32,
                    41 + level[j][i] + 64 * 6
                );
            }
        }
    }
};
function checkSpriteTileCollision(sprite, tileX, tileY, tileIndex, collisions) {
    if (
        sprite.levelX + sprite.spriteWidth >= tileX &&
        sprite.levelX <= tileX + TILE_SIZE &&
        sprite.levelY + sprite.spriteHeight >= tileY &&
        sprite.levelY <= tileY + TILE_SIZE
    ) {
        let intersect = {
            x: Math.max(sprite.levelX, tileX),
            y: Math.max(sprite.levelY, tileY)
        };
        intersect.width = Math.min(
            sprite.levelX + sprite.spriteWidth,
            tileX + TILE_SIZE
        ) - intersect.x;
        intersect.height = Math.min(
            sprite.levelY + sprite.spriteHeight,
            tileY + TILE_SIZE
        ) - intersect.y;
        if (
            sprite.levelX + sprite.spriteWidth / 2 > tileX + TILE_SIZE / 2 &&
            intersect.height > intersect.width
        ) collisions.left = true;
        if (
            sprite.levelX + sprite.spriteWidth / 2 < tileX + TILE_SIZE / 2 &&
            intersect.height > intersect.width
        ) collisions.right = true;
        if (
            sprite.levelY + sprite.spriteHeight / 2 < tileY + TILE_SIZE / 2 &&
            intersect.width > intersect.height &&
            intersect.width > 4
        ) {
            collisions.top = true;
            collisions.topY = tileY;
        }
        if (
            sprite.levelY + sprite.spriteHeight / 2 > tileY + TILE_SIZE / 2 &&
            intersect.width > intersect.height &&
            intersect.width > 4
        ) {
            collisions.bottom = true;
        }
    }
};

var checkSpriteTileCollisions = function(sprite, level) {
    let levelWidth = level[0].length;
    let levelHeight = level.length;
    let collisions = {
        left: false,
        right: false,
        top: false,
        bottom: false,
        topY: null
    };
    for (let i = 0; i < levelWidth; i++) {
        for (let j = 0; j < levelHeight; j++) {
            if (level[j][i] != 0) {
                checkSpriteTileCollision(
                    sprite,
                    i * TILE_SIZE,
                    j * TILE_SIZE,
                    level[j][i],
                    collisions
                );
            }
        }
    }
    return collisions;
};

var resetHeroForLevel = function() {
    hero = {
        spriteWidth: 100,
        spriteHeight: 59,
        levelX: 140,
        levelY: 480 - 32 - 59,
        renderX: 100,
        renderY: 480 - 32 - 59,
        velocityY: 0
    };
    scrollX = 0;
    hoverjump = false;
    heroAnimationIndex = 1;
    heroDirection = 1;
    heroJumping = false;
    heroPeakJumping = false;
    jumpPressedLastFrame = false;
    resetAnimationTime = Date.now();
    previousHeroAnimationIndex = 1;
    distanceFromFloor = 0;
    nearestFloorHeight = -59;
    newJumpPress = false;
    attackCompleted = false;
};

var loadLevel = function(index, showNotice) {
    currentLevelIndex = index;
    currentLevel = cloneLevel(levels[currentLevelIndex]);
    resetHeroForLevel();
    levelNoticeUntil = showNotice ? Date.now() + 1600 : 0;
};

var resetGame = function() {
    points = 0;
    loadLevel(0, false);
};

var titleScreenLoop = function(now, oldTime) {
    var sx = 0;
    var sy = 0;
    var swidth = 384;
    var sheight = 224;
    context.drawImage(
        titleScreen,
        sx,
        sy,
        swidth,
        sheight,
        0,
        0,
        816,
        480
    );
    context.font = "90px Luminari, fantasy";
    context.fillStyle = "rgb(242,131,28)";
    context.fillText("Platform Pillage", 75, 140);
    context.font = "60px Luminari, fantasy";
    context.fillStyle = "rgb(255, 247, 227, " +
        (0.75 + 0.15 * Math.cos(2 * 3.1415 * (Math.round(now - oldTime) / 1000))) + ")";
    context.fillText("Press Enter", 240, 260);
    let currentFrame = Math.floor(
        ((Date.now() / 100) % heroAnimations[heroAnimationIndex][1])
    );
    context.drawImage(
        heroAnimations[heroAnimationIndex][0],
        currentFrame * hero.spriteWidth,
        0,
        hero.spriteWidth,
        hero.spriteHeight,
        SCREEN_WIDTH / 2 - 100,
        280,
        200,
        59 * 2
    );
    if (pressedKeys["13"] || (enterPressedInitially && !beyondTitleScreen)) {
        gameStarted = true;
        beyondTitleScreen = true;
    }
};

var gameOverScreen = function(now, oldTime) {
    context.fillStyle = "black";
    context.fillRect(0, 0, 816, 480);
    context.font = "90px Luminari, fantasy";
    context.fillStyle = "red";
    context.fillText("Game Over", 170, 140);
    context.font = "60px Luminari, fantasy";
    context.fillStyle = "rgb(255, 247, 227, " +
        (0.50 + 0.10 * Math.cos(2 * 3.1415 * (Math.round(now - oldTime) / 1000))) + ")";
    context.fillText("Press ESC to Exit", 170, 260);
    let currentFrame = Math.floor(
        ((Date.now() / 100) % heroAnimations[11][1])
    );
    context.drawImage(
        heroAnimations[11][0],
        currentFrame * hero.spriteWidth,
        0,
        hero.spriteWidth,
        hero.spriteHeight,
        SCREEN_WIDTH / 2 - 100,
        280,
        200,
        59 * 2
    );
    if (pressedKeys["27"]) {
        resetGame();
        gameOver = false;
    }
};

var demoCompleteScreen = function(now, oldTime) {
    context.fillStyle = "rgb(67, 67, 67)";
    context.fillRect(0, 0, 816, 480);
    context.font = "90px Luminari, fantasy";
    context.fillStyle = "#4BB543";
    context.fillText("Level Complete", 90, 140);
    context.font = "60px Luminari, fantasy";
    context.fillStyle = "white";
    const zeroPad = (num, places) => String(num).padStart(places, '0');
    context.fillText("Score: " + zeroPad(points, 5) + " Pts", 180, 220);
    context.font = "50px Luminari, fantasy";
    context.fillStyle = "rgb(255, 247, 227, " +
        (0.50 + 0.10 * Math.cos(2 * 3.1415 * (Math.round(now - oldTime) / 1000))) + ")";
    context.fillText("Press ESC to Exit", 200, 290);
    let currentFrame = Math.floor(
        ((Date.now() / 100) % heroAnimations[3][1])
    );
    context.drawImage(
        heroAnimations[3][0],
        currentFrame * hero.spriteWidth,
        0,
        hero.spriteWidth,
        hero.spriteHeight,
        SCREEN_WIDTH / 2 - 100,
        280,
        200,
        59 * 2
    );
    if (pressedKeys["27"]) {
        resetGame();
        demoComplete = false;
    }
};
var continueToNextLevel = function() {
    let nextLevelIndex = completedLevelIndex + 1;
    loadLevel(nextLevelIndex, true);
    levelTransition = false;
    gameStarted = true;
};

const STAGE_PATH_START = 310;
const STAGE_PATH_GAP = 98;

var drawStagePath = function() {
    let startX = STAGE_PATH_START;
    let gap = STAGE_PATH_GAP;
    let y = 335;
    context.strokeStyle = "rgba(255, 247, 227, 0.45)";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(startX, y);
    context.lineTo(startX + gap * (levels.length - 1), y);
    context.stroke();
    for (let i = 0; i < levels.length; i++) {
        let x = startX + gap * i;
        context.fillStyle = i <= completedLevelIndex ?
            "rgb(242, 131, 28)" : "rgb(255, 247, 227)";
        context.beginPath();
        context.arc(x, y, 18, 0, Math.PI * 2);
        context.fill();
        context.font = "18px Luminari, fantasy";
        context.fillStyle = "rgb(67, 67, 67)";
        context.textAlign = "center";
        context.fillText(String(i + 1), x, y + 6);
    }
    context.textAlign = "start";
};

var levelTransitionScreen = function(now, oldTime) {
    context.fillStyle = "rgb(67, 67, 67)";
    context.fillRect(0, 0, 816, 480);
    context.font = "76px Luminari, fantasy";
    context.fillStyle = "#4BB543";
    context.textAlign = "center";
    context.fillText("Level " + (completedLevelIndex + 1) + " Complete", 408, 120);
    context.font = "46px Luminari, fantasy";
    context.fillStyle = "white";
    context.fillText("Score: " + String(points).padStart(5, "0") + " Pts", 408, 190);
    context.font = "38px Luminari, fantasy";
    context.fillStyle = "rgb(242, 131, 28)";
    context.fillText("Next: Level " + (completedLevelIndex + 2), 408, 245);
    context.font = "34px Luminari, fantasy";
    context.fillStyle = "rgb(255, 247, 227, " +
        (0.55 + 0.15 * Math.cos(2 * 3.1415 * (Math.round(now - oldTime) / 1000))) + ")";
    context.fillText("Press Enter to Continue", 408, 300);
    context.textAlign = "start";
    drawStagePath();
    let currentFrame = Math.floor(
        ((Date.now() / 100) % heroAnimations[3][1])
    );
    context.drawImage(
        heroAnimations[3][0],
        currentFrame * hero.spriteWidth,
        0,
        hero.spriteWidth,
        hero.spriteHeight,
        SCREEN_WIDTH / 2 - 75,
        365,
        150,
        59 * 1.5
    );
    if (pressedKeys["13"]) {
        continueToNextLevel();
    }
};

var restartAdventure = function() {
    runComplete = false;
    demoComplete = false;
    levelTransition = false;
    completedLevelIndex = 0;
    finalScore = 0;
    resetGame();
    levelNoticeUntil = Date.now() + 1600;
    gameStarted = true;
};

var drawVictoryHero = function() {
    let animation = heroAnimations[3];
    let currentFrame = Math.floor(
        ((Date.now() / 100) % animation[1])
    );
    context.drawImage(
        animation[0],
        currentFrame * hero.spriteWidth,
        0,
        hero.spriteWidth,
        hero.spriteHeight,
        SCREEN_WIDTH / 2 - 75,
        365,
        150,
        59 * 1.5
    );
};

var drawVictorySummary = function() {
    context.font = "42px Luminari, fantasy";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText(levels.length + " Levels Cleared", 408, 205);
    context.font = "48px Luminari, fantasy";
    context.fillStyle = "rgb(242, 131, 28)";
    context.fillText("Final Score: " + String(finalScore).padStart(5, "0"), 408, 265);
    context.textAlign = "start";
    drawStagePath();
};

const VICTORY_ACCENT_RADIUS = 7;

var drawVictoryAccents = function() {
    let accentPoints = [[125, 90], [175, 145], [641, 145], [691, 90]];
    context.fillStyle = "rgb(242, 131, 28)";
    for (let i = 0; i < accentPoints.length; i++) {
        context.beginPath();
        context.arc(accentPoints[i][0], accentPoints[i][1], VICTORY_ACCENT_RADIUS, 0, Math.PI * 2);
        context.fill();
    }
};

var victoryScreen = function(now, oldTime) {
    context.fillStyle = "rgb(67, 67, 67)";
    context.fillRect(0, 0, 816, 480);
    drawVictoryAccents();
    context.font = "68px Luminari, fantasy";
    context.fillStyle = "#4BB543";
    context.textAlign = "center";
    context.fillText("Adventure Complete", 408, 115);
    drawVictorySummary();
    context.font = "32px Luminari, fantasy";
    context.fillStyle = "rgb(255, 247, 227, " +
        (0.55 + 0.15 * Math.cos(2 * 3.1415 * (Math.round(now - oldTime) / 1000))) + ")";
    context.fillText("Press Enter to Play Again", 408, 310);
    context.textAlign = "start";
    drawVictoryHero();
    if (pressedKeys["13"]) {
        restartAdventure();
    }
};

var updateCamera = function() {
    if (
        hero.levelX + hero.spriteWidth / 2 >= SCREEN_WIDTH / 2 &&
        scrollX + SCREEN_WIDTH < currentLevel[0].length * TILE_SIZE ||
        hero.levelX + SCREEN_WIDTH / 2 + hero.spriteWidth / 2 <= currentLevel[0].length * TILE_SIZE &&
        scrollX > 0
    ) {
        scrollX = hero.levelX - SCREEN_WIDTH / 2 + hero.spriteWidth / 2;
    }
    hero.renderX = hero.levelX - scrollX;
    hero.renderY = hero.levelY;
};

var drawParallax = function() {
    for (var i = 0; i < layers.length; i++) {
        if (i == 0) {
            context.drawImage(layers[i], 0, 0, 816, 480);
        } else {
            var sx = 0.0050 * scrollX * Math.pow(2, i);
            if (i == 1) {
                sx -= 0;
            } else if (i == 4) {
                sx -= Math.floor(sx / 263) * 263;
            } else {
                sx -= Math.floor(sx / 272) * 272;
            }
            var sy = 0;
            var swidth = 272;
            var sheight = 160;
            context.drawImage(
                layers[i],
                sx,
                sy,
                swidth,
                sheight,
                0,
                0,
                816,
                480
            );
        }
    }
};

var drawLevelNotice = function() {
    if (Date.now() >= levelNoticeUntil) {
        return;
    }
    context.fillStyle = "rgba(0, 0, 0, 0.35)";
    context.fillRect(280, 185, 256, 80);
    context.font = "48px Luminari, fantasy";
    context.fillStyle = "rgb(255, 247, 227)";
    context.textAlign = "center";
    context.fillText("Level " + (currentLevelIndex + 1), 408, 240);
    context.textAlign = "start";
};

var drawHero = function() {
    let currentFrame = Math.floor(
        ((Date.now() - resetAnimationTime) / 100) % heroAnimations[heroAnimationIndex][1]
    );
    if (
        (heroAnimationIndex == 4 || heroAnimationIndex == 5) &&
        heroJumping &&
        currentFrame == heroAnimations[heroAnimationIndex][1] - 1
    ) {
        heroPeakJumping = true;
    }
    if (
        (heroAnimationIndex == 4 || heroAnimationIndex == 5) &&
        heroPeakJumping
    ) {
        currentFrame = heroAnimations[heroAnimationIndex][1] - 1;
    }
    if (heroDirection == 0) {
        currentFrame = heroAnimations[heroAnimationIndex][1] - currentFrame - 1;
    }
    context.drawImage(
        heroAnimations[heroAnimationIndex][0],
        currentFrame * hero.spriteWidth,
        0,
        hero.spriteWidth,
        hero.spriteHeight,
        hero.renderX,
        hero.renderY,
        hero.spriteWidth,
        hero.spriteHeight
    );
    return currentFrame;
};

var getHeroCollisions = function() {
    return checkSpriteTileCollisions({
        levelX: hero.levelX + 25,
        levelY: hero.levelY,
        spriteWidth: 50,
        spriteHeight: hero.spriteHeight
    }, currentLevel);
};

var updateMovement = function(collisions) {
    if (pressedKeys["65"]) {
        if (hero.levelX > -25 && !collisions.left) {
            hero.levelX -= 240 * interval;
        }
        heroAnimationIndex = 2;
        heroDirection = 0;
    }
    if (pressedKeys["68"]) {
        if (
            hero.levelX + hero.spriteWidth - 25 - 30 < currentLevel[0].length * TILE_SIZE &&
            !collisions.right
        ) {
            hero.levelX += 240 * interval;
        }
        heroAnimationIndex = 3;
        heroDirection = 1;
    }
    if (!(pressedKeys[65] || pressedKeys[68])) {
        if (heroDirection) heroAnimationIndex = 1;
        else heroAnimationIndex = 0;
    }
    if (pressedKeys["83"]) {
        if (heroDirection) heroAnimationIndex = 9;
        else heroAnimationIndex = 8;
    }
};
var updateAttack = function(currentFrame) {
    if (pressedKeys["75"]) {
        if (heroDirection) {
            if (currentFrame == 4 && previousHeroAnimationIndex == 7) {
                attackCompleted = true;
            }
            if (attackCompleted && pressedKeys["68"]) {
                heroAnimationIndex = 3;
            } else if (attackCompleted && !(pressedKeys[65] || pressedKeys[68])) {
                heroAnimationIndex = 1;
            } else {
                heroAnimationIndex = 7;
            }
        } else {
            if (currentFrame == 0 && previousHeroAnimationIndex == 6) {
                attackCompleted = true;
            }
            if (attackCompleted && pressedKeys["65"]) {
                heroAnimationIndex = 2;
            } else if (attackCompleted && !(pressedKeys[65] || pressedKeys[68])) {
                heroAnimationIndex = 0;
            } else {
                heroAnimationIndex = 6;
            }
        }
    } else {
        attackCompleted = false;
    }
};

var updateJumpState = function() {
    if (pressedKeys["87"]) {
        if (distanceFromFloor > 0 || hoverjump) {
            if (heroDirection) heroAnimationIndex = 5;
            else heroAnimationIndex = 4;
        }
        heroJumping = true;
    } else {
        heroJumping = false;
        heroPeakJumping = false;
    }
    if (previousHeroAnimationIndex != heroAnimationIndex) {
        resetAnimationTime = Date.now();
    }
};

var updatePhysics = function(collisions) {
    if (hero.velocityY >= 0 && collisions.top) {
        nearestFloorHeight = SCREEN_HEIGHT - collisions.topY;
    } else {
        nearestFloorHeight = -hero.spriteHeight;
    }
    distanceFromFloor = SCREEN_HEIGHT - nearestFloorHeight - (hero.levelY + hero.spriteHeight);
    if (distanceFromFloor > 0 && !(hoverjump && heroJumping)) {
        hero.velocityY += 0.5;
    } else {
        hero.velocityY = 0;
    }
    if (distanceFromFloor <= 0) {
        hero.levelY = SCREEN_HEIGHT - nearestFloorHeight - hero.spriteHeight;
    }
    if (hoverjump) {
        if (heroJumping && !newJumpPress) {
            newJumpPress = true;
        } else {
            newJumpPress = false;
        }
        if (newJumpPress) {
            hero.velocityY = -4;
        }
    } else {
        if (
            heroJumping &&
            !newJumpPress &&
            distanceFromFloor <= 0 &&
            !jumpPressedLastFrame
        ) {
            newJumpPress = true;
        } else {
            newJumpPress = false;
        }
        if (newJumpPress) {
            hero.levelY -= 1;
            hero.velocityY = -10;
        }
    }
    if (
        hero.velocityY > 0 && collisions.top ||
        hero.velocityY < 0 && hero.levelY <= -10 ||
        hero.velocityY < 0 && collisions.bottom
    ) {
        hero.velocityY = 0;
    }
    hero.levelY += hero.velocityY;
};
var getSpecialTiles = function(level) {
    let specialTiles = [];
    for (let row = 0; row < level.length; row++) {
        for (let column = 0; column < level[row].length; column++) {
            let tile = level[row][column];
            if (tile == 10 || tile == 12) {
                specialTiles.push({
                    row: row,
                    column: column,
                    tile: tile
                });
            }
        }
    }
    return specialTiles;
};

var heroTouchesTile = function(row, column, tile) {
    let touched = {
        top: false,
        topY: null,
        bottom: false,
        left: false,
        right: false
    };
    checkSpriteTileCollision({
        levelX: hero.levelX + 25,
        levelY: hero.levelY,
        spriteWidth: 50,
        spriteHeight: hero.spriteHeight
    }, column * TILE_SIZE, row * TILE_SIZE, tile, touched);
    return touched.top || touched.bottom || touched.left || touched.right;
};

var collectSpecialTile = function(item) {
    if (!heroTouchesTile(item.row, item.column, item.tile)) {
        return;
    }
    if (currentLevel[item.row][item.column] != item.tile) {
        return;
    }
    if (item.tile == 10) {
        points += 800;
        hoverjump = true;
    }
    if (item.tile == 12) {
        points += 10000;
    }
    currentLevel[item.row][item.column] = 0;
};

var updateCollectibles = function() {
    let specialTiles = getSpecialTiles(currentLevel);
    for (let i = 0; i < specialTiles.length; i++) {
        collectSpecialTile(specialTiles[i]);
    }
};

var finishGameplayFrame = function() {
    jumpPressedLastFrame = pressedKeys["87"];
    previousHeroAnimationIndex = heroAnimationIndex;
    if (hero.levelX + hero.spriteWidth / 2 >= TILE_SIZE * currentLevel[0].length) {
        if (currentLevelIndex < levels.length - 1) {
            completedLevelIndex = currentLevelIndex;
            levelTransition = true;
            gameStarted = false;
        } else {
            completedLevelIndex = currentLevelIndex;
            finalScore = points;
            runComplete = true;
            gameStarted = false;
        }
    }
    if (hero.levelY >= SCREEN_HEIGHT) {
        gameOver = true;
        gameStarted = false;
    }
};

const LEVEL_HUD_LEFT = 10;
const LEVEL_HUD_WIDTH = 796;
const LEVEL_HUD_Y = 62;

var getLevelProgress = function() {
    let levelWidth = currentLevel[0].length * TILE_SIZE;
    let centerX = hero.levelX + hero.spriteWidth / 2;
    let progress = centerX / levelWidth;
    if (progress < 0) {
        progress = 0;
    }
    if (progress > 1) {
        progress = 1;
    }
    return progress;
};

var drawLevelHud = function() {
    let progress = getLevelProgress();
    context.font = "28px Luminari, fantasy";
    context.fillStyle = "rgb(255, 247, 227)";
    context.fillText(points + " Pts", 10, 50);
    context.fillText("Level " + (currentLevelIndex + 1), 690, 50);
    context.fillStyle = "rgba(0, 0, 0, 0.4)";
    context.fillRect(LEVEL_HUD_LEFT, LEVEL_HUD_Y, LEVEL_HUD_WIDTH, 8);
    context.fillStyle = "rgb(242, 131, 28)";
    context.fillRect(LEVEL_HUD_LEFT, LEVEL_HUD_Y, LEVEL_HUD_WIDTH * progress, 8);
    context.beginPath();
    context.arc(LEVEL_HUD_LEFT + LEVEL_HUD_WIDTH * progress, LEVEL_HUD_Y + 4, 6, 0, Math.PI * 2);
    context.fill();
};

var gameLoop = function(interval) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    updateCamera();
    drawParallax();
    drawLevelTiles(currentLevel, currentLevel[0].length, currentLevel.length, scrollX);
    drawLevelNotice();
    let currentFrame = drawHero();
    let collisions = getHeroCollisions();
    updateMovement(collisions);
    updateAttack(currentFrame);
    updateJumpState();
    updatePhysics(collisions);
    updateCollectibles();
    finishGameplayFrame();
    runUpdateHooks(interval);
};

const gameState = {
    screen: "title",
    started: false,
    paused: false,
    restarting: false,
    inputLocked: false,
    frameNumber: 0,
    elapsedSeconds: 0,
    lastFrameTime: performance.now(),
    levelStartedAt: performance.now()
};

const updateHooks = [];
const hudHooks = [];
const resetHooks = [];

function clearInputState() {
    Object.keys(pressedKeys).forEach(function(key) {
        pressedKeys[key] = false;
    });
    jumpPressedLastFrame = false;
    newJumpPress = false;
}

function setGameScreen(screen) {
    gameState.screen = screen;
    gameState.inputLocked = screen == "transition";
    gameState.paused = screen == "paused";
}

function syncGameState() {
    gameState.started = gameStarted;
    if (gameOver) {
        setGameScreen("game-over");
    } else if (levelTransition) {
        setGameScreen("transition");
    } else if (runComplete) {
        setGameScreen("victory");
    } else if (gameStarted) {
        setGameScreen("playing");
    } else {
        setGameScreen("title");
    }
}

function runUpdateHooks(seconds) {
    for (let i = 0; i < updateHooks.length; i++) {
        updateHooks[i](seconds);
    }
}

function runHudHooks() {
    for (let i = 0; i < hudHooks.length; i++) {
        hudHooks[i]();
    }
}

function runResetHooks() {
    for (let i = 0; i < resetHooks.length; i++) {
        resetHooks[i]();
    }
}

window.addEventListener("blur", clearInputState);
document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        clearInputState();
    }
});

const restartState = {
    keyWasDown: false,
    lastRestartAt: 0,
    count: 0
};

function resetAdventureState() {
    clearInputState();
    gameOver = false;
    demoComplete = false;
    levelTransition = false;
    runComplete = false;
    completedLevelIndex = 0;
    finalScore = 0;
    points = 0;
    scrollX = 0;
    hoverjump = false;
    attackCompleted = false;
    currentLevelIndex = 0;
    currentLevel = cloneLevel(levels[0]);
    resetHeroForLevel();
    levelNoticeUntil = Date.now() + 1200;
    gameStarted = true;
    beyondTitleScreen = true;
    enterPressedInitially = true;
    gameState.restarting = false;
    gameState.levelStartedAt = performance.now();
    setGameScreen("playing");
    runResetHooks();
}

function restartCurrentRun() {
    if (gameState.restarting) {
        return;
    }
    gameState.restarting = true;
    restartState.lastRestartAt = Date.now();
    restartState.count += 1;
    resetAdventureState();
}

function updateRestartInput() {
    const restartDown = Boolean(pressedKeys[27]);
    if (restartDown && !restartState.keyWasDown) {
        restartCurrentRun();
    }
    restartState.keyWasDown = restartDown;
}

function drawRestartHint() {
    if (!gameStarted) {
        return;
    }
    context.font = "14px Arial, sans-serif";
    context.fillStyle = "rgba(255, 247, 227, 0.75)";
    context.textAlign = "right";
    context.fillText("ESC Restart", SCREEN_WIDTH - 12, SCREEN_HEIGHT - 12);
    context.textAlign = "start";
}

restartAdventure = restartCurrentRun;
resetGame = function() {
    resetAdventureState();
};
updateHooks.push(updateRestartInput);
hudHooks.push(drawRestartHint);

const frameState = {
    previousTime: performance.now(),
    accumulator: 0,
    step: 1 / 60,
    maxFrame: 0.05,
    renderedFrames: 0
};

function getFrameSeconds(now) {
    let seconds = (now - frameState.previousTime) / 1000;
    frameState.previousTime = now;
    if (!Number.isFinite(seconds) || seconds < 0) {
        return frameState.step;
    }
    return Math.min(seconds, frameState.maxFrame);
}

function updateGameScreen(now, seconds) {
    syncGameState();
    if (!gameStarted) {
        if (gameOver) {
            pauseMusic();
            gameOverScreen(now, oldTime);
        } else if (levelTransition) {
            levelTransitionScreen(now, oldTime);
        } else if (runComplete) {
            victoryScreen(now, oldTime);
        } else if (demoComplete) {
            demoCompleteScreen(now, oldTime);
        } else {
            pauseMusic();
            titleScreenLoop(now, oldTime);
        }
        return;
    }
    if (musicEnabled && !audioPlaying && enterPressedInitially) {
        resumeMusic();
    }
    interval = seconds;
    gameLoop(seconds);
    drawLevelHud();
    runHudHooks();
}

function animationFrame(now) {
    const seconds = getFrameSeconds(now);
    gameState.elapsedSeconds += seconds;
    gameState.frameNumber += 1;
    frameState.accumulator += seconds;
    updateGameScreen(now, seconds);
    previousFrameTime = now;
    frameCounter += 1;
    frameState.renderedFrames += 1;
    if (now - oldTime > 1000) {
        frameCounter = 0;
        oldTime = now;
    }
    requestAnimationFrame(animationFrame);
}

const jumpAssist = {
    coyoteSeconds: 0.11,
    bufferSeconds: 0.13,
    lastGroundedAt: 0,
    lastPressedAt: -1,
    keyWasDown: false,
    shortHopSpeed: -4.5,
    fullJumpSpeed: -10
};

function heroIsGrounded() {
    return distanceFromFloor <= 1 && hero.velocityY >= 0;
}

function rememberJumpInput() {
    const jumpDown = Boolean(pressedKeys[87]);
    if (jumpDown && !jumpAssist.keyWasDown) {
        jumpAssist.lastPressedAt = gameState.elapsedSeconds;
    }
    jumpAssist.keyWasDown = jumpDown;
}

function canUseCoyoteJump() {
    return gameState.elapsedSeconds - jumpAssist.lastGroundedAt <= jumpAssist.coyoteSeconds;
}

function hasBufferedJump() {
    return gameState.elapsedSeconds - jumpAssist.lastPressedAt <= jumpAssist.bufferSeconds;
}

function consumeBufferedJump() {
    if (!hasBufferedJump()) {
        return false;
    }
    if (!heroIsGrounded() && !canUseCoyoteJump()) {
        return false;
    }
    hero.velocityY = jumpAssist.fullJumpSpeed;
    hero.levelY -= 1;
    heroJumping = true;
    jumpAssist.lastPressedAt = -1;
    return true;
}

function applyShortHop() {
    if (!pressedKeys[87] && hero.velocityY < jumpAssist.shortHopSpeed) {
        hero.velocityY = jumpAssist.shortHopSpeed;
    }
}

function updateJumpAssist() {
    rememberJumpInput();
    if (heroIsGrounded()) {
        jumpAssist.lastGroundedAt = gameState.elapsedSeconds;
    }
    consumeBufferedJump();
    applyShortHop();
}

resetHooks.push(function() {
    jumpAssist.lastGroundedAt = 0;
    jumpAssist.lastPressedAt = -1;
    jumpAssist.keyWasDown = false;
});
updateHooks.push(updateJumpAssist);

function getHeroCollisionBox() {
    return {
        levelX: hero.levelX + 25,
        levelY: hero.levelY + 2,
        spriteWidth: 50,
        spriteHeight: hero.spriteHeight - 2
    };
}

function getNearbyTiles(sprite, level) {
    const left = Math.max(0, Math.floor(sprite.levelX / TILE_SIZE) - 1);
    const right = Math.min(
        level[0].length - 1,
        Math.floor((sprite.levelX + sprite.spriteWidth) / TILE_SIZE) + 1
    );
    const top = Math.max(0, Math.floor(sprite.levelY / TILE_SIZE) - 1);
    const bottom = Math.min(
        level.length - 1,
        Math.floor((sprite.levelY + sprite.spriteHeight) / TILE_SIZE) + 1
    );
    const nearby = [];
    for (let row = top; row <= bottom; row++) {
        for (let column = left; column <= right; column++) {
            if (level[row][column] != 0) {
                nearby.push({
                    row: row,
                    column: column,
                    tile: level[row][column]
                });
            }
        }
    }
    return nearby;
}

function emptyCollisionResult() {
    return {
        left: false,
        right: false,
        top: false,
        bottom: false,
        topY: null
    };
}

function getStableHeroCollisions() {
    const sprite = getHeroCollisionBox();
    const collisions = emptyCollisionResult();
    const nearby = getNearbyTiles(sprite, currentLevel);
    for (let i = 0; i < nearby.length; i++) {
        const item = nearby[i];
        checkSpriteTileCollision(
            sprite,
            item.column * TILE_SIZE,
            item.row * TILE_SIZE,
            item.tile,
            collisions
        );
    }
    return collisions;
}

function keepHeroInsideLevel() {
    const levelWidth = currentLevel[0].length * TILE_SIZE;
    hero.levelX = Math.max(-25, Math.min(hero.levelX, levelWidth - hero.spriteWidth / 2));
    if (hero.levelY < -10) {
        hero.levelY = -10;
        hero.velocityY = Math.max(0, hero.velocityY);
    }
}

getHeroCollisions = getStableHeroCollisions;
updateHooks.push(keepHeroInsideLevel);

let FPS = 60;
let interval = 1 / FPS;
let frameCounter = 0;
let oldTime = performance.now();
let previousFrameTime = oldTime;
loadLevel(0, false);
requestAnimationFrame(animationFrame);
