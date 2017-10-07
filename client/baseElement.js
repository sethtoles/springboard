((global) => {
    function xy(x, y) {
        if (!arguments.length) {
            return {
                x: parseInt(this.style.left),
                y: parseInt(this.style.top),
            };
        }

        this.style.left = px(x);
        this.style.top = px(y);
    }

    function defaultDragAction() {
        this.style.zIndex = this.offsetTop;
    }

    function beginDrag(event) {
        if (dragGroup.indexOf(this) < 0) {
            const { clientX, clientY } = event;
            const { offsetLeft, offsetTop } = this;

            this.dragOffset = {
                x: clientX - offsetLeft,
                y: clientY - offsetTop,
            };

            this.style.pointerEvents = 'none';

            dragGroup.push(this);
        }
    }

    function onmousedown(event) {
        event.preventDefault();

        // Left button
        if (event.button === 0 && this.draggable) {
            this.beginDrag(event);
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
            beginDrag,
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
