((global) => {
    function xy(x, y) {
        this.style.left = px(x);
        this.style.top = px(y);
    }

    function defaultDragAction() {
        this.style.zIndex = this.offsetTop;
    }

    function onmousedown(event) {
        event.preventDefault();

        // Left button
        if (event.button === 0 && this.draggable) {
            const { clientX, clientY } = event;
            const { offsetLeft, offsetTop } = this;

            this.dragOffset = {
                x: clientX - offsetLeft,
                y: clientY - offsetTop,
            };

            dragGroup.push(this);
        }
        // Right button
        else if (event.button === 2) {
            document.body.removeChild(this);
        }
    };

    global.createBaseElement = (options = {}) => {
        const {
            parent = document.body,
            style = {},
            draggable = false,
            dragAction = defaultDragAction,
        } = options;

        const element = document.createElement('div');

        Object.assign(element, {
            draggable,
            tetheredTo: [],
            // Methods
            xy,
            onmousedown,
        });

        if (draggable) {
            style.cursor = 'move';
            element.dragAction = dragAction;
        }

        // Style assignment
        Object.assign(element.style, {
            width: px(BOARD_TILE_DIM),
            height: px(BOARD_TILE_DIM),
            backgroundColor: rgb(0),
            position: 'absolute',
            ...style,
        });

        parent.appendChild(element);

        return element;
    };
})(window);
