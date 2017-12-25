import { dragRoot } from './globalState.js';

function beginDrag(event) {
    if (dragRoot.element !== this) {
        dragRoot.element = this;

        const { clientX, clientY } = event;
        const { offsetLeft, offsetTop } = this;

        this.dragOffset = {
            top: clientY - offsetTop,
            left: clientX - offsetLeft,
        };

        // Ensure the mouse entering and leaving the dragged element
        // doesn't trigger any side effects
        this.setStyle({
            pointerEvents: 'none',
        });
    }
}

function endDrag() {
    const { snapTo } = dragRoot;

    // Tether to the snap target
    if (snapTo && snapTo.tether) {
        snapTo.tether(this);
    }
    else if (this.tetheredTo) {
        this.tetheredTo.untether(this);
    }

    // Restore default pointer events
    this.setStyle({
        pointerEvents: 'initial',
    });

    // Clear drag group and snap target
    dragRoot.element = null;
    dragRoot.snapTo = null;
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
        endDrag,
    });

    element.setStyle({
        cursor: 'move',
    });

    element.addEventListener('mousedown', handleMouseDown.bind(element));
};
