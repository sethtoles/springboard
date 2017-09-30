((global) => {
    function createTile(row, column) {
        const { width, height } = this.tileStyle;

        return createBaseElement({
            style: {
                ...this.tileStyle,
                width: px(width),
                height: px(height),
                top: px(row * height),
                left: px(column * width),
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

    global.createBoard = (options = {}) => {
        const {
            rows = BOARD_ROWS,
            columns = BOARD_COLUMNS,
            tileWidth = BOARD_TILE_DIM,
            tileHeight = BOARD_TILE_DIM,
            tileColor = rgb(255),
            tileBorder = border(2, rgb(0)),
        } = options;

        const tileStyle = {
            width: tileWidth,
            height: tileHeight,
            backgroundColor: tileColor,
            border: tileBorder,
        };

        const board = {
            rows,
            columns,
            tileStyle,
            tiles: [],
            // Methods
            createTile,
            addRow,
            addColumn,
        };

        for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
            for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
                board.tiles.push(board.createTile(rowIndex, columnIndex));
            }
        }

        return board;
    }
})(window);
