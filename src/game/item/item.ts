import { Game } from '../game';
import { Direction, IItem, IMovable } from '../interfaces';
import './item.scss';

const ITEM_SIZE = 80;
const SPEED = 5;

export class Item implements IItem, IMovable {
    elem: HTMLElement;
    public position = { top: 0, left: 0 };
    public game: Game;

    constructor(area: DOMRect) {
        this.elem = document.createElement('div');
        const minHeight = area.y + ITEM_SIZE;
        const maxHeight = area.bottom - ITEM_SIZE;
        const minWidth = area.x + ITEM_SIZE;
        const maxWidth = area.right - ITEM_SIZE;

        const itemsHeight = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);
        const itemsWidth = Math.floor(Math.random() * (maxWidth - minWidth) + minWidth);

        this.position.top = itemsHeight;
        this.position.left = itemsWidth;

        this.elem.style.top = `${this.position.top}px`;
        this.elem.style.left = `${this.position.left}px`;

        this.elem.classList.add('item');

        const container = document.getElementById('container-items');

        container.appendChild(this.elem);
    }
    move(direction: Direction): boolean {
        if (direction === Direction.UpLeft) {
            this.position.top += SPEED;
            this.position.left += SPEED;
        } else if (direction === Direction.UpRight) {
            this.position.top += SPEED;
            this.position.left -= SPEED;
        } else if (direction === Direction.DownLeft) {
            this.position.top -= SPEED;
            this.position.left += SPEED;
        } else if (direction === Direction.DownRight) {
            this.position.top -= SPEED;
            this.position.left -= SPEED;
        } else if (direction === Direction.Up) {
            this.position.top += SPEED;
        } else if (direction === Direction.Down) {
            this.position.top -= SPEED;
        } else if (direction === Direction.Left) {
            this.position.left += SPEED;
        } else if (direction === Direction.Right) {
            this.position.left -= SPEED;
        } else {
            return false;
        }
        this.elem.style.top = `${this.position.top}px`;
        this.elem.style.left = `${this.position.left}px`;
        return true;
    }
}
