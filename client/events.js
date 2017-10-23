((global) => {
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
                    snapXY = dragGroup.snapTo.getBoundingClientRect();
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

                dragGroup.map((element) => {
                    if (snapTo && snapTo.tether) {
                        snapTo.tether(element);
                    }

                    element.style.pointerEvents = 'initial';
                });

                dragGroup.length = 0;
                delete dragGroup.snapTo;
            }
            // else {
            //     createBaseElement({
            //         draggable: true,
            //         style: {
            //             top: px(clientY),
            //             left: px(clientX),
            //         },
            //     });
            // }
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
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('focus', clearHeld);
        document.addEventListener('blur', clearHeld);
        document.addEventListener('contextmenu', handleContextMenu);
    };
})(window);
