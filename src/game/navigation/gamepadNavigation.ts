import { Direction, INavigation, INavigationState } from '../interfaces';

export class GamepadNavigation implements INavigation {
    constructor(private gamepad: Gamepad) {}

    update(): INavigationState {
        return {
            direction: this.directionGamepad(this.gamepad),
            start: this.gamepad.buttons[0].pressed,
            restart: this.gamepad.buttons[1].pressed,
        };
    }

    private directionGamepad(gamepad: Gamepad): Direction {
        if (gamepad.axes[0] < -0.5 && gamepad.axes[1] < -0.5) {
            return Direction.UpLeft;
        }
        if (gamepad.axes[0] > 0.5 && gamepad.axes[1] < -0.5) {
            return Direction.UpRight;
        }
        if (gamepad.axes[0] < -0.5 && gamepad.axes[1] > 0.5) {
            return Direction.DownLeft;
        }
        if (gamepad.axes[0] > 0.5 && gamepad.axes[1] > 0.5) {
            return Direction.DownRight;
        }
        if (gamepad.axes[0] < -0.5) {
            return Direction.Left;
        }
        if (gamepad.axes[0] > 0.5) {
            return Direction.Right;
        }
        if (gamepad.axes[1] < -0.5) {
            return Direction.Up;
        }
        if (gamepad.axes[1] > 0.5) {
            return Direction.Down;
        }
        return Direction.None;
    }
}
