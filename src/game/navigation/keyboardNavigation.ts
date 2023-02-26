import { Direction, INavigation, INavigationState } from '../interfaces';

export class KeyboardNavigation implements INavigation {
    private state = {
        up: false,
        down: false,
        left: false,
        right: false,
    };

    constructor() {
        this.setUpListeners();
    }

    private setUpListeners() {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp') {
                this.state.up = true;
            } else if (e.key === 'ArrowDown') {
                this.state.down = true;
            } else if (e.key === 'ArrowLeft') {
                this.state.left = true;
            } else if (e.key === 'ArrowRight') {
                this.state.right = true;
            }
        });

        document.addEventListener('keyup', (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp') {
                this.state.up = false;
            } else if (e.key === 'ArrowDown') {
                this.state.down = false;
            } else if (e.key === 'ArrowLeft') {
                this.state.left = false;
            } else if (e.key === 'ArrowRight') {
                this.state.right = false;
            }
        });
    }

    private directionKeyboard(): Direction {
        if (this.state.up && this.state.left) {
            return Direction.UpLeft;
        }
        if (this.state.up && this.state.right) {
            return Direction.UpRight;
        }
        if (this.state.down && this.state.left) {
            return Direction.DownLeft;
        }
        if (this.state.down && this.state.right) {
            return Direction.DownRight;
        }
        if (this.state.up) {
            return Direction.Up;
        }
        if (this.state.down) {
            return Direction.Down;
        }
        if (this.state.left) {
            return Direction.Left;
        }
        if (this.state.right) {
            return Direction.Right;
        }
        return Direction.None;
    }

    update(): INavigationState {
        return {
            direction: this.directionKeyboard(),
        };
    }
}
