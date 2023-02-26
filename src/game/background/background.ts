import { Direction, IMovable } from '../interfaces';
import './background.scss';

const SPEED = 5;

export class Background implements IMovable {
    public elem: HTMLElement;
    private position = { top: 0, left: 0 };
    private area: DOMRect;

    constructor() {
        this.elem = document.createElement('div');
        this.elem.classList.add('background');

        const container = document.getElementById('container-background');

        container.appendChild(this.elem);

        this.area = this.elem.getBoundingClientRect();
        const translateX = this.area.width / 4;
        const translateY = this.area.height / 4;
        this.position.top = -translateY;
        this.position.left = -translateX;

        this.elem.style.transform = `translate(-${translateX}px, -${translateY}px)`;
    }

    // TODO: Refactor this method
    move(direction: Direction): boolean {
        const translateX = this.area.width / 2;
        const translateY = this.area.height / 2;
        const offset = SPEED;

        if (direction === Direction.UpLeft && this.position.top < 0 - offset && this.position.left < 0 - offset) {
            this.position.top += offset;
            this.position.left += offset;
        } else if (direction === Direction.UpRight && this.position.top < 0 - offset && this.position.left - offset > translateX * -1) {
            this.position.top += offset;
            this.position.left -= offset;
        } else if (direction === Direction.DownLeft && this.position.top - offset > translateY * -1 && this.position.left < 0 - offset) {
            this.position.top -= offset;
            this.position.left += offset;
        } else if (direction === Direction.DownRight && this.position.top - offset > translateY * -1 && this.position.left - offset > translateX * -1) {
            this.position.top -= offset;
            this.position.left -= offset;
        } else if (direction === Direction.Up && this.position.top < 0 - offset) {
            this.position.top += offset;
        } else if (direction === Direction.Down && this.position.top - offset > translateY * -1) {
            this.position.top -= offset;
        } else if (direction === Direction.Left && this.position.left < 0 - offset) {
            this.position.left += offset;
        } else if (direction === Direction.Right && this.position.left - offset > translateX * -1) {
            this.position.left -= offset;
        } else {
            return false;
        }
        
        this.elem.style.transform = `translate(${this.position.left}px, ${this.position.top}px)`;
        return true;
    }
}
