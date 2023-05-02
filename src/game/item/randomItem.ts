import { EnumRandomItem } from '../interfaces';
import { Player } from '../player/player';
import { DefaultItem } from './defaultItem';
import { Item } from './item';

export class RandomItem extends Item {
    public player: Player;
    private effectDuration = 7;
    private timeAdded = 100;
    public itemType: EnumRandomItem;
    private opacityChanged = false;
    private invincibleAnimation = [{ opacity: 1 }, { opacity: 0.5, offset: 0.05 }, { opacity: 0.5, offset: 0.95 }, { opacity: 1 }];

    constructor(itemsArea: DOMRect, itemType: EnumRandomItem, player: Player) {
        super(itemsArea);
        this.itemType = itemType;
        this.player = player;
        this.elem.classList.add(EnumRandomItem[itemType].toLowerCase());
    }

    public speedUp(speed = 6) {
        if (this.effectDuration > 0) {
            this.effectDuration--;
            this.player.speed = speed;
            setTimeout(() => this.speedUp(speed), 1000);
        } else {
            this.player.speed = 5;
        }
    }

    public speedDown(speed = 2.5) {
        if (this.effectDuration > 0) {
            this.effectDuration--;
            this.player.speed = speed;
            setTimeout(() => this.speedDown(speed), 1000);
        } else {
            this.player.speed = 5;
        }
    }

    public invincible() {
        if (this.effectDuration > 0) {
            this.effectDuration--;
            this.player.invincible = true;
            if (!this.opacityChanged) {
                this.player.elem.animate(this.invincibleAnimation, { duration: (this.effectDuration + 1) * 1000 });
            }
            this.opacityChanged = true;
            setTimeout(() => this.invincible(), 1000);
        } else {
            this.player.invincible = false;
            this.opacityChanged = false;
            this.player.elem.classList.remove('invincible');
        }
    }

    public timeUp(timeLeft: number): number {
        return (timeLeft += this.timeAdded);
    }

    public magnet(defaultItems: Array<DefaultItem>): void {
        const duration = 5000;
        // Move all items towards the player for 5 seconds.
        const interval = setInterval(() => {
            for (let i = 0; i < defaultItems.length; i++) {
                defaultItems[i].moveTowardsPlayer();
            }
        }, 10);

        setTimeout(() => {
            clearInterval(interval);
        }, duration);
    }
}
