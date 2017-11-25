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
        const { x = 0, y = 0 } = element.dragOffset;
        const actualX = clientX - x;
        const actualY = clientY - y;

        if (snapTo && !held[KEY.CTRL]) {
            element.move(snapTo.getStyle());
        }
        else {
            element.move({ top: actualY, left: actualX });
        }
    }
}

function handleMouseUp({ clientX, clientY, button }) {
    // Left button
    if (button === 0) {
        const { element, snapTo } = dragRoot;

        if (element) {
            // Tether dragged element to snap target
            if (snapTo && snapTo.tether) {
                snapTo.tether(element);
            }

            element.setStyle({
                pointerEvents: 'initial',
            });

            // Clear drag group and snap target
            dragRoot.element = null;
            dragRoot.snapTo = null;
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
    document.addEventListener('contextmenu', handleContextMenu);
};
