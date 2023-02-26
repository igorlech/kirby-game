import { Direction, INavigation } from '../interfaces';

export abstract class Navigation implements INavigation {
    public abstract update(): { direction: Direction, start?: boolean, stop?: boolean };
}
