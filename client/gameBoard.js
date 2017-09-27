((global) => {
    global.createBoard = (options = {}) => {
        const {
            rows = BOARD_ROWS,
            columns = BOARD_COLUMNS,
            tileWidth = BOARD_TILE_DIM,
            tileHeight = BOARD_TILE_DIM,
            tileColor = rgb(255),
            tileBorder = border(2, rgb(0)),
        } = options;

        const board = {
            tiles: [],
        };

        Array(rows).fill().map((row, rowIndex) => {
            Array(columns).fill().map((column, columnIndex) => {
                const tile = createElement({
                    style: {
                        top: px(rowIndex * tileHeight),
                        left: px(columnIndex * tileWidth),
                        width: px(tileWidth),
                        height: px(tileHeight),
                        backgroundColor: tileColor,
                        border: tileBorder,
                    },
                });

                board.tiles.push(tile);
            });
        });

        return board;
    }
})(window);
