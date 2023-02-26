import { Background } from './background/background';
import { Helper } from './helper';
import { Direction, IMovable, INavigation, IPlayer, EnumDefaultItem, EnumRandomItem } from './interfaces';
import { DefaultItem } from './item/defaultItem';
import { RandomItem } from './item/randomItem';
import { Player } from './player/player';
import { AudioManager } from './audioManager';
import { GamepadNavigation } from './navigation/gamepadNavigation';
import { KeyboardNavigation } from './navigation/keyboardNavigation';
import { Leaderboard } from './leaderboard';

export class Game {
    private navigation: INavigation;
    private keyboardNavigation: KeyboardNavigation;
    private player: IPlayer;
    private playerObject: Player;
    private background: IMovable;
    private itemsArea: DOMRect;
    private defaultItems: Array<DefaultItem>;
    private randomItems: Array<RandomItem>;
    private audioManager: AudioManager;
    private leaderboard: Leaderboard;
    private gameFinished = true;
    private timer = 600;
    private timeLeft = this.timer;
    public score = 0;
    private isMusicPlaying = false;

    constructor() {
        this.initGame();
        this.spawnItems(this.playerObject);
        this.setUpListeners();
        this.update();
    }

    private initGame() {
        this.playerObject = new Player();
        this.player = this.playerObject;
        this.background = new Background();
        this.itemsArea = this.background.elem?.getBoundingClientRect();
        this.keyboardNavigation = new KeyboardNavigation();
        this.leaderboard = new Leaderboard();
        this.defaultItems = new Array<DefaultItem>();
        this.randomItems = new Array<RandomItem>();
        this.audioManager = new AudioManager();
    }

    updateStartScreen() {
        if (this.navigation.update().start) {
            this.startGame();
        }
    }

    update() {
        const gamepad = this.getGamepad();

        if (gamepad) {
            this.navigation = new GamepadNavigation(gamepad);
        } else {
            this.navigation = this.keyboardNavigation;
        }

        if (this.gameFinished) {
            this.updateStartScreen();
        }
        if (this.navigation.update().restart) {
            this.restartGame();
        }

        if (!this.gameFinished) {
            this.checkCollision();
            this.checkIfItemsAreCollected();
            this.movePlayerItemsAndBackground(this.navigation.update().direction);
        }

        window.requestAnimationFrame(() => this.update());
    }

    private spawnItems(playerObject: Player) {
        if (this.itemsArea) {
            // Add 15 coins to the game
            for (let i = 0; i < 15; i++) {
                this.defaultItems.push(new DefaultItem(this.itemsArea, EnumDefaultItem.Coin, playerObject));
                this.defaultItems[i].game = this;
            }
            // Add 5 bombs to the game
            for (let i = 15; i < 20; i++) {
                this.defaultItems.push(new DefaultItem(this.itemsArea, EnumDefaultItem.Bomb));
                this.defaultItems[i].game = this;
            }
            // Add 5 random powerups to the game
            for (let i = 0; i < 5; i++) {
                const random = Math.floor(Math.random() * 5);
                this.randomItems.push(new RandomItem(this.itemsArea, random, playerObject));
                this.randomItems[i].game = this;
            }
        }
    }

    private setUpListeners() {
        const btnAddScore = document.getElementById('btn-add-score');
        btnAddScore?.addEventListener('click', () => this.leaderboard.addScoreToLeaderboard(this.timer, this.timeLeft));

        const btnStartGame = document.querySelector('.btn-game-start');
        btnStartGame?.addEventListener('click', () => this.startGame());
    }

    private startGame() {
        const startScreen: HTMLElement = document.querySelector('.start-screen');
        const startScore: HTMLElement = document.querySelector('.score-display');

        startScreen.style.display = 'none';
        startScore.style.display = 'flex';

        if (!this.isMusicPlaying) {
            this.audioManager.playSound('background-music', true, 0.5);
            this.isMusicPlaying = true;
        }

        this.gameFinished = false;
        this.update();
        this.timerUpdate();
    }

    private timerUpdate() {
        if (!this.gameFinished) {
            this.timeLeft--;

            const timer = document.getElementById('timer');
            timer.innerHTML = (this.timeLeft / 10).toString();
            if (this.timeLeft <= 100) {
                timer.style.color = 'red';
            }
            if (this.timeLeft <= 0) {
                this.gameOver();
                return;
            }
            setTimeout(() => this.timerUpdate(), 100);
        }
    }

    private movePlayerItemsAndBackground(direction: Direction) {
        let backgroundCanMove = true;

        if (direction !== Direction.None) {
            const playerCanMove = this.player.move(direction);

            if (!playerCanMove) {
                backgroundCanMove = this.background.move(direction);
                // Move all items
                for (let i = 0; i < this.defaultItems.length; i++) {
                    this.defaultItems[i].move(direction);
                }
                for (let i = 0; i < this.randomItems.length; i++) {
                    this.randomItems[i].move(direction);
                }
            }

            if (!backgroundCanMove) {
                this.gameOver();
            }
        }
    }

    private checkIfItemsAreCollected() {
        const defaultItemsCoins = this.defaultItems.filter((x) => x.itemType === EnumDefaultItem.Coin);

        if (defaultItemsCoins.length === 0) {
            this.gameWon();
        }
    }

    private checkCollision() {
        for (let i = 0; i < this.randomItems.length; i++) {
            const collided = Helper.hitDetection(this.player.elem, this.randomItems[i].elem);
            if (collided) {
                if (this.randomItems[i].itemType === EnumRandomItem.PowerUpSpeed) {
                    this.randomItems[i].speedUp();
                } else if (this.randomItems[i].itemType === EnumRandomItem.PowerUpInvincible) {
                    this.randomItems[i].invincible();
                } else if (this.randomItems[i].itemType === EnumRandomItem.PowerDownSpeed) {
                    this.randomItems[i].speedDown();
                } else if (this.randomItems[i].itemType === EnumRandomItem.PowerUpTime) {
                    this.timeLeft = this.randomItems[i].timeUp(this.timeLeft);
                } else if (this.randomItems[i].itemType === EnumRandomItem.PowerUpMagnet) {
                    this.randomItems[i].magnet(this.defaultItems);
                }
                this.itemRemove(this.randomItems, i);
            }
        }

        for (let i = 0; i < this.defaultItems.length; i++) {
            const collided = Helper.hitDetection(this.player.elem, this.defaultItems[i].elem);
            if (collided) {
                if (this.defaultItems[i].itemType === EnumDefaultItem.Bomb) {
                    if (this.playerObject.invincible) {
                        this.itemRemove(this.defaultItems, i);
                    } else {
                        this.audioManager.playSound('gameover');
                        this.gameOver();
                    }
                } else if (this.defaultItems[i].itemType === EnumDefaultItem.Coin) {
                    this.audioManager.playSound('coin', false, 0.2);
                    this.defaultItems[i].itemCollected();
                    this.itemRemove(this.defaultItems, i);
                }
            }
        }
    }

    private itemRemove(array: Array<DefaultItem> | Array<RandomItem>, position: number) {
        array[position].elem.remove();
        array.splice(position, 1);
    }

    private async gameOver(): Promise<void> {
        const gameOver = document.getElementById('game-over');
        this.gameFinished = true;
        gameOver.style.display = 'flex';
        this.audioManager.playSound('gameover');
        await this.leaderboard.displayLeaderboard('.leaderboard-table-body-lost');
    }

    private async gameWon(): Promise<void> {
        const gameWon = document.getElementById('game-won');
        gameWon.style.display = 'flex';
        this.gameFinished = true;
        this.audioManager.playSound('gamewon', false, 1);
        this.displayScore();
        await this.leaderboard.displayLeaderboard('.leaderboard-table-body-won');
    }

    private restartGame(): void {
        console.log('restart');
        // TODO: Restart the game instead of reloading the page.
        window.location.reload();
    }

    private displayScore(): void {
        const score = document.querySelector('.winner-time');
        score.innerHTML = `Your time: ${(this.timer - this.timeLeft) / 10}s`;
    }

    private getGamepad(): Gamepad | null {
        const gamepads = navigator.getGamepads();

        if (gamepads.some((x) => x !== null)) {
            return gamepads.find((x) => x !== null);
        }
        return null;
    }
}
