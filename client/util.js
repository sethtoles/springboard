((global) => {
    global.px = (size) => `${size}px`;

    global.rgb = (r, g = r, b = r) => `rgb(${r},${g},${b})`;

    global.border = (size, color) => `${px(size)} solid ${color}`;
})(window);
