((global) => {
    function createTile(row, column) {
        const { root, tileStyle } = this;
        const { x, y } = root.xy();
        const { width, height } = tileStyle;

        return createBaseElement({
            style: {
                ...this.tileStyle,
                width: px(width),
                height: px(height),
                top: px(y + (row * height)),
                left: px(x + (column * width)),
            },
        });
    }

    function addRow() {
        this.tiles = this.tiles
            .concat(Array(this.columns)
                .fill()
                .map((column, columnIndex) => this.createTile(this.rows, columnIndex))
            )
        ;

        this.rows++;
    }

    function addColumn() {
        // Iterate backwards so that the indexing math doesn't change as we add elements
        for (let rowIndex = this.rows - 1; rowIndex >= 0; --rowIndex) {
            this.tiles.splice(
                rowIndex * this.columns, // Start index
                0, // Elements to delete
                this.createTile(rowIndex, this.columns) // Element to add
            );
        }

        this.columns++;
    }

    function createHandle({ root, columns, tileStyle }) {
        const { top, left } = root.style;
        const { width, height } = tileStyle;

        const handle = createBaseElement({
            draggable: true,
            style: {
                top,
                left: px(parseInt(left) + (width * columns)),
                width: px(width),
                height: px(height),
                color: rgb(255),
            },
        });

        makeTethering(handle);

        handle.tether(root);
        handle.classList.add('fa', 'fa-arrows', 'fa-5x');

        return handle;
    }

    global.createBoard = (options = {}) => {
        const {
            rows = BOARD_ROWS,
            columns = BOARD_COLUMNS,
            top = 0,
            left = 0,
            tileWidth = BOARD_TILE_DIM,
            tileHeight = BOARD_TILE_DIM,
            tileColor = rgb(255),
            tileBorder = border(1, rgb(0)),
        } = options;

        const tileStyle = {
            width: tileWidth,
            height: tileHeight,
            backgroundColor: tileColor,
            border: tileBorder,
        };

        // The board root is used only as a reference point,
        // relative to which all tiles and UI will be placed
        const root = createBaseElement({
            style: {
                top: px(top),
                left: px(left),
            },
        });

        const board = {
            root,
            rows,
            columns,
            tileStyle,
            tiles: [],
            // Methods
            createTile,
            addRow,
            addColumn,
        };

        const handle = createHandle(board);

        for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
            for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
                const tile = board.createTile(rowIndex, columnIndex);

                board.tiles.push(tile);
                handle.tether(tile);
            }
        }

        return board;
    }
})(window);
