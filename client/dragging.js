import { dragRoot } from './globalState.js';

function beginDrag(event) {
    if (dragRoot.element !== this) {
        dragRoot.element = this;

        const { clientX, clientY } = event;
        const { offsetLeft, offsetTop } = this;

        this.dragOffset = {
            x: clientX - offsetLeft,
            y: clientY - offsetTop,
        };

        this.setStyle({
            pointerEvents: 'none',
        });
    }
}

function handleMouseDown(event) {
    // Left button
    if (event.button === 0) {
        this.beginDrag(event);
    }
}

export const makeDraggable = (element) => {
    Object.assign(element, {
        beginDrag,
    });

    element.setStyle({
        cursor: 'move',
    });

    element.addEventListener('mousedown', handleMouseDown.bind(element));
};
