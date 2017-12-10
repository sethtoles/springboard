import { addListeners } from './events.js';
import { createBoard } from './gameBoard.js';
import { createTrash }  from './trash.js';

addListeners();

window.board = createBoard({
    top: 30,
    left: 30,
});

window.trash = createTrash();
