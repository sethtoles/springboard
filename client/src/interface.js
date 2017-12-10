import { createDeck } from './deck.js';
import { createBoard } from './gameBoard.js';

const creatorSelect = document.getElementById('creatorSelect');

creatorSelect.addEventListener('change', ({ target }) => {
    switch (target.value) {
        case 'deck':
            createDeck();
            break;
        case 'board':
            createBoard();
            break;
    }

    target.value = "";
});
