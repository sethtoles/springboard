import { rgb, px } from './util.js';
import { createBaseElement } from './baseElement.js';

function createPiece() {
    const { x, y } = this.getBoundingClientRect();
    const { width } = this.style;
    const piece = createBaseElement({
        draggable: true,
    });

    piece.xy(x + parseInt(width), y);

    return piece;
}

export const createDeck = (options = {}) => {
    const deck = createBaseElement({
        style: {
            width: px(300),
            height: px(400),
            backgroundColor: rgb(0, 0, 128),
        },
    });

    deck.addEventListener('mouseup', createPiece.bind(deck));

    return deck;
};
