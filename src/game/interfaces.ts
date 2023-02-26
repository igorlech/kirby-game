export enum Direction {
    None,
    Up,
    UpLeft,
    UpRight,
    Down,
    DownLeft,
    DownRight,
    Left,
    Right,
}

export enum EnumDefaultItem {
    Coin,
    Bomb,
}

export enum EnumRandomItem {
    PowerUpSpeed,
    PowerDownSpeed,
    PowerUpInvincible,
    PowerUpMagnet,
    PowerUpTime,
}

export interface INavigationState {
    direction: Direction;
    start?: boolean;
    restart?: boolean;
}

export interface INavigation {
    update(): INavigationState;
}

export interface IMovable {
    elem: HTMLElement;
    move(direction: Direction): boolean;
}

export interface IPlayer extends IMovable {
    elem: HTMLElement;
}

export interface IItem {
    elem: HTMLElement;
}
