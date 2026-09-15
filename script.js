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
let points = 0;
let gameStarted = false;
let gameOver = false;
let demoComplete = false;
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
audioElement.load();
audioElement.volume = 0.6;
var audioPlaying = false;
var enterPressedInitially = false;
var beyondTitleScreen = false;
onInitialEnterPress = function(e) {
    if (e.key == "Enter") {
        enterPressedInitially = true;
        audioElement.play();
    }
};
document.addEventListener('keypress', onInitialEnterPress);

var drawTile = function(x, y, tileIndex) {
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

var drawLevelTiles = function(level, hTiles, vTiles, scrollPosition) {
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
var checkSpriteTileCollision = function(sprite, tileX, tileY, tileIndex, collisions) {
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

var resetGame = function() {
    hero = {
        spriteWidth: 100,
        spriteHeight: 59,
        levelX: 140,
        levelY: 480 - 32 - 59,
        renderX: 100,
        renderY: 480 - 32 - 59,
        velocityY: 0
    };
    currentLevel = JSON.parse(JSON.stringify(levels[0]));
    scrollX = 0;
    points = 0;
    hoverjump = false;
    heroAnimationIndex = 1;
    heroDirection = 1;
    heroJumping = false;
    heroPeakJumping = false;
    jumpPressedLastFrame = false;
    hoverjump = false;
    scrollX = 0;
    resetAnimationTime = Date.now();
    previousHeroAnimationIndex = 1;
    points = 0;
    distanceFromFloor = 0;
    nearestFloorHeight = -59;
    newJumpPress = false;
    attackCompleted = false;
};
