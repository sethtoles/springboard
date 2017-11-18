import { dragGroup, held } from './globalState.js';

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
    if (dragGroup.length) {
        dragGroup.map((element) => {
            const { x = 0, y = 0 } = element.dragOffset;
            const actualX = clientX - x;
            const actualY = clientY - y;

            if (dragGroup.snapTo && !held[KEY.CTRL]) {
                const snapXY = dragGroup.snapTo.getBoundingClientRect();
                element.xy(snapXY.x, snapXY.y);
            }
            else {
                element.xy(actualX, actualY);
            }

            element.handleMovement();
        });
    }
}

function handleMouseUp({ clientX, clientY, button }) {
    // Left button
    if (button === 0) {
        if (dragGroup.length) {
            const { snapTo } = dragGroup;

            // Tether all dragged elements to snap target
            dragGroup.map((element) => {
                if (snapTo && snapTo.tether) {
                    snapTo.tether(element);
                }

                element.setStyle({
                    pointerEvents: 'initial',
                });
            });

            // Clear drag group and snap target
            dragGroup.length = 0;
            delete dragGroup.snapTo;
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
