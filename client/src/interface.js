import { createDeck } from './deck.js';
import { createBoard } from './gameBoard.js';

export const initInterface = () => {
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
};
