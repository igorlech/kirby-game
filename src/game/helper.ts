export class Helper {
    static hitDetection(a: HTMLElement, b: HTMLElement): boolean {
        const playerWidth = 5;

        const aRect = a.getBoundingClientRect();
        const bRect = b.getBoundingClientRect();

        let collision = false;

        const aX = aRect.x;
        const aY = aRect.y;
        const aRight = aRect.right - playerWidth;
        const aBottom = aRect.bottom - playerWidth;

        const bX = bRect.x;
        const bY = bRect.y;
        const bRight = bRect.right;
        const bBottom = bRect.bottom;

        if (bX <= aRight && bRight >= aX && bBottom >= aY && bY <= aBottom) {
            collision = true;
        }

        return collision;
    }
}
