/**
 * Check if obj1 is colliding with obj2 by checking its x and y variables and height and width 
 * @param {Object} objeto1 Object 1 for comparing images
 * @param {Object} objeto2 Object 2 for comparing images
 * @returns True if one image is colliding with the other 1
 */
function collision(obj1, obj2) {
    let a = {
        d: obj1?.y + obj1?.height,
        u: obj1?.y,
        l: obj1?.x,
        r: obj1?.x + obj1?.width,
    };
    let b = {
        d: obj2?.y + obj2?.height,
        u: obj2?.y,
        l: obj2?.x,
        r: obj2?.x + obj2?.width
    };

    if (a.r >= b.l && a.l <= b.r && a.u < b.d && a.d > b.u) {
        return true;
    }
    return false;
}