import { EnumDefaultItem } from '../interfaces';
import { Player } from '../player/player';
import { Item } from './item';

export class DefaultItem extends Item {
    public itemType: EnumDefaultItem;
    public player: Player;

    constructor(itemsArea: DOMRect, itemType: EnumDefaultItem, player?: Player) {
        super(itemsArea);
        this.itemType = itemType;
        this.player = player;
        this.elem.classList.add(EnumDefaultItem[itemType].toLowerCase());
    }

    public itemCollected() {
        this.addScore();
    }

    private addScore(num = 1) {
        this.game.score += num;
        const score = document.getElementById('score');
        score.innerHTML = this.game.score.toString();
        localStorage.setItem('score', this.game.score.toString());
    }

    public moveTowardsPlayer() {
        const moveSpeed = 0.3;
        if (this.player) {
            const playerPosition = this.player.position;
            const itemPosition = this.position;

            if (playerPosition.top > itemPosition.top) {
                this.position.top += moveSpeed
            } else if (playerPosition.top < itemPosition.top) {
                this.position.top -= moveSpeed;
            }

            if (playerPosition.left > itemPosition.left) {
                this.position.left += moveSpeed;
            } else if (playerPosition.left < itemPosition.left) {
                this.position.left -= moveSpeed;
            }

            this.elem.style.top = `${this.position.top}px`;
            this.elem.style.left = `${this.position.left}px`;
        }
    }
}
