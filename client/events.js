((global) => {
    const KEY = {
        SHIFT: 16,
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

                if (held[KEY.ALT]) {
                    element.xy(actualX, actualY);
                }
                else {
                    element.xy(
                        Math.round(actualX / BOARD_TILE_DIM) * BOARD_TILE_DIM,
                        Math.round(actualY / BOARD_TILE_DIM) * BOARD_TILE_DIM,
                    );
                }

                if (element.dragAction) {
                    element.dragAction();
                }
            });
        }
    }

    function handleClick({ clientX, clientY, button }) {
        // Left button
        if (button === 0) {
            if (dragGroup.length) {
                dragGroup.length = 0;
            }
            else {
                createBaseElement({
                    draggable: true,
                    style: {
                        top: px(clientY),
                        left: px(clientX),
                    },
                });
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

    global.addListeners = () => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('click', handleClick);
        document.addEventListener('focus', clearHeld);
        document.addEventListener('blur', clearHeld);
        document.addEventListener('contextmenu', handleContextMenu);
    };
})(window);
