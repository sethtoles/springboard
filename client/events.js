((global) => {
    const KEY = {
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

    function handleMouseUp({ clientX, clientY, button }) {
        // Left button
        if (button === 0) {
            if (dragGroup.length) {
                dragGroup.length = 0;
            }
            else {
                createElement({
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

    global.addListeners = () => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('contextmenu', () => false);
    };
})(window);
