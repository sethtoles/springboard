import { dragRoot, held } from './globalState.js';

const KEY = {
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
};

function handleKeyDown(event) {
    held[event.which] = true;

    switch (event.which) {
        default:
            console.log(event.which);
    };
}

function handleMouseMove({ clientX, clientY }) {
    const { element, snapTo } = dragRoot;

    if (element) {
        if (snapTo && !held[KEY.CTRL]) {
            element.position(snapTo.getBoundingClientRect());
        }
        else {
            const { top = 0, left = 0 } = element.dragOffset;

            element.position({
                top: clientY - top,
                left: clientX - left,
            });
        }
    }
}

function handleMouseUp({ clientX, clientY, button }) {
    // Left button
    if (button === 0) {
        const { element } = dragRoot;

        // Finish dragging any dragged element
        if (element && element.endDrag) {
            element.endDrag();
        }
    }
}

function handleKeyUp(event) {
    delete held[event.which];
}

function clearHeld() {
    for (const key in held) {
        delete held[key];
    }
}

function handleContextMenu(event) {
    event.preventDefault();
}

export const addListeners = () => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('focus', clearHeld);
    document.addEventListener('blur', clearHeld);
    // document.addEventListener('contextmenu', handleContextMenu);
};
