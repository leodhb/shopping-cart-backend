const quantityHandler = (value, max) => {
    if(value > max) {
        value = max;
    } else if (value <= 0) {
        value = 1;
    }
    return value;
}
module.exports = quantityHandler;
