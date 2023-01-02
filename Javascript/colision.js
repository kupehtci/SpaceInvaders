export function colision(objeto1, objeto2) {
    let a = {
        d: objeto1.y + objeto1.h,
        u: objeto1.y,
        l: objeto1.x,
        r: objeto1.x + objeto1.w,
    };
    let b = {
        d: objeto2.y + objeto2.h,
        u: objeto2.y,
        l: objeto2.x,
        r: objeto2.x + objeto2.w
    };

    if (a.r >= b.l && a.l <= b.r && a.u < b.d && a.d > b.u) {
        return true;
    }
    return false;
}