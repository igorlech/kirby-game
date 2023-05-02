import './player.scss';
import { Direction, IPlayer } from '../interfaces';

const SPEED = 3;
const BOUNDARY = 20;
const PLAYER_SIZE = 80;

export class Player implements IPlayer {
    public elem: HTMLElement;
    public invincible = false;
    public position = { top: 300, left: 550 };
    public speed = SPEED;

    constructor() {
        this.elem = document.getElementById('player');
        this.elem.style.top = `${this.position.top}px`;
        this.elem.style.left = `${this.position.left}px`;
        const container = document.getElementById('container-player');
        container.appendChild(this.elem);
    }

    move(direction: Direction): boolean {
        let canMove = true;
        if (direction === Direction.UpLeft) {
            canMove = this.moveUpLeft();
        }
        if (direction === Direction.UpRight) {
            canMove = this.moveUpRight();
        }
        if (direction === Direction.DownLeft) {
            canMove = this.moveDownLeft();
        }
        if (direction === Direction.DownRight) {
            canMove = this.moveDownRight();
        }
        if (direction === Direction.Up) {
            canMove = this.moveUp();
        }
        if (direction === Direction.Down) {
            canMove = this.moveDown();
        }
        if (direction === Direction.Left) {
            canMove = this.moveLeft();
        }
        if (direction === Direction.Right) {
            canMove = this.moveRight();
        }

        this.elem.style.top = `${this.position.top}px`;
        this.elem.style.left = `${this.position.left}px`;

        return canMove;
    }

    private moveUpLeft() {
        if (this.position.top <= BOUNDARY) {
            return false;
        }
        this.position.top -= this.speed;
        if (this.position.left <= BOUNDARY) {
            return false;
        }
        this.position.left -= this.speed;
        return true;
    }

    private moveUpRight() {
        if (this.position.top <= BOUNDARY) {
            return false;
        }
        this.position.top -= this.speed;
        if (this.position.left >= window.innerWidth - BOUNDARY - PLAYER_SIZE) {
            return false;
        }
        this.position.left += this.speed;
        return true;
    }

    private moveDownLeft() {
        if (this.position.top >= window.innerHeight - BOUNDARY - PLAYER_SIZE) {
            return false;
        }
        this.position.top += this.speed;
        if (this.position.left <= BOUNDARY) {
            return false;
        }
        this.position.left -= this.speed;
        return true;
    }

    private moveDownRight() {
        if (this.position.top >= window.innerHeight - BOUNDARY - PLAYER_SIZE) {
            return false;
        }
        this.position.top += this.speed;
        if (this.position.left >= window.innerWidth - BOUNDARY - PLAYER_SIZE) {
            return false;
        }
        this.position.left += this.speed;
        return true;
    }

    private moveUp() {
        if (this.position.top <= BOUNDARY) {
            return false;
        }
        this.position.top -= this.speed;
        return true;
    }

    private moveDown() {
        if (this.position.top >= window.innerHeight - BOUNDARY - PLAYER_SIZE) {
            return false;
        }
        this.position.top += this.speed;
        return true;
    }

    private moveLeft() {
        if (this.position.left <= BOUNDARY) {
            return false;
        }
        this.position.left -= this.speed;
        return true;
    }

    private moveRight() {
        if (this.position.left >= window.innerWidth - BOUNDARY - PLAYER_SIZE) {
            return false;
        }
        this.position.left += this.speed;
        return true;
    }

    public get getPosition() {
        return this.position;
    }
}
