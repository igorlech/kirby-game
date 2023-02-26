import { Game } from './game/game';
import './styles.scss';

// bootstrap main App when DOMContentLOADED
document.addEventListener('DOMContentLoaded', () => {
    new Game();
});

