import { createBaseElement } from './baseElement.js';
import { makeDraggable } from './dragging.js';

function createPiece(options = {}) {
    const {
        style = {},
    } = options;

    const { top, left } = this.getBoundingClientRect();
    const { width } = this.getStyle([ 'width' ]);
    const piece = createBaseElement({
        ...options,
        style: {
            ...style,
            top,
            left: left + width,
        },
    });

    piece.classList.add('piece');

    makeDraggable(piece);

    return piece;
}

export const createDeck = (options = {}) => {
    const deck = createBaseElement({
        style: {
            width: 300,
            height: 400,
            backgroundColor: [0, 0, 128],
        },
    });

    deck.classList.add('deck');

    deck.addEventListener('mouseup', createPiece.bind(deck));

    return deck;
};
