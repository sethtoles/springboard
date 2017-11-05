import { px, rgb, border } from './util.js';
import { BOARD_TILE_DIM, BOARD_ROWS, BOARD_COLUMNS } from './config.js';
import { dragGroup } from './globalState.js';
import { createBaseElement } from './baseElement.js';
import { makeTethering } from './tethering.js';

function createTile(row, column) {
    const { root, tileStyle } = this;
    const { x, y } = root.getBoundingClientRect();
    const { width, height } = tileStyle;

    const tile = createBaseElement({
        style: {
            ...this.tileStyle,
            width: px(width),
            height: px(height),
            top: px(y + (row * height)),
            left: px(x + (column * width)),
        },
    });

    tile.addEventListener('mouseenter', () => {
        if (dragGroup.length && dragGroup.indexOf(tile) < 0) {
            dragGroup.snapTo = tile;
        }
    });

    tile.addEventListener('mouseleave', () => {
        if (dragGroup.snapTo === tile) {
            delete dragGroup.snapTo;
        }
    });

    makeTethering(tile);
    root.tether(tile);

    return tile;
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

    const { width } = this.tileStyle;
    const rootLeft = parseInt(this.root.style.left);
    const handleLeft = parseInt(this.handle.style.left);

    this.root.setStyle({ left: px(rootLeft - width) });
    this.handle.setStyle({ left: px(handleLeft + width) });

    this.columns++;
}

const createHandle = ({ root, columns, tileStyle }) => {
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

const createBoardControls = (board) => {
    const { root, handle, columns, tileStyle } = board;
    const { x, y } = root.getBoundingClientRect();
    const { width, height } = tileStyle;

    const baseButtonStyle = {
        left: px(x + (width * columns)),
        width: px(width),
        height: px(height),
        backgroundColor: rgb(128),
    }

    const addRowButton = createBaseElement({
        style: {
            ...baseButtonStyle,
            top: px(y + height),
        }
    });
    addRowButton.addEventListener('mousedown', () => board.addRow());
    addRowButton.classList.add('fa', 'fa-angle-double-down');
    handle.tether(addRowButton);

    const addColumnButton = createBaseElement({
        style: {
            ...baseButtonStyle,
            top: px(y + (height * 2)),
        }
    });
    addColumnButton.addEventListener('mousedown', () => board.addColumn());
    addColumnButton.classList.add('fa', 'fa-angle-double-right');
    handle.tether(addColumnButton);
}

export const createBoard = (options = {}) => {
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

    makeTethering(root);

    const handle = createHandle({
        root,
        columns,
        tileStyle,
    });

    const board = {
        root,
        handle,
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
            const tile = board.createTile(rowIndex, columnIndex);

            board.tiles.push(tile);
            root.tether(tile);
        }
    }

    createBoardControls(board);

    return board;
}
