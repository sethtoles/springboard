import { createBaseElement } from './baseElement.js';
import { makeDraggable } from './dragging.js';

function createPiece() {
    const { x, y } = this.xy();
    const { width } = this.getStyle();
    const piece = createBaseElement({
        top: y,
        left: x + width,
    });

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

    deck.addEventListener('mouseup', createPiece.bind(deck));

    return deck;
};
