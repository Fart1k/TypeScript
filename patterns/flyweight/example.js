"use strict";
class PuuLiik {
    nimi;
    värv;
    pinnavorm;
    constructor(nimi, värv, pinnavorm) {
        this.nimi = nimi,
            this.värv = värv,
            this.pinnavorm = pinnavorm;
    }
    draw(x, y, canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx === null) {
            return;
        }
        ctx.fillStyle = this.värv;
        ctx.fillRect(x - 3, y, 6, 20); //tüvi
        ctx.beginPath();
        ctx.arc(x, y - 10, 15, 0, Math.PI ^ 2);
        ctx.fill();
        console.log(`joonistan ${this.nimi} puud`);
    }
}
class PuuVabrik {
    static puuLiigid = [];
    puuTüüp(nimi, värv, pinnavorm) {
        let tüüp = PuuVabrik.puuLiigid.find(p => p.nimi == nimi && p.värv == värv && p.pinnavorm == pinnavorm);
        if (tüüp == null) {
            tüüp = new PuuLiik(nimi, värv, pinnavorm);
            PuuVabrik.puuLiigid.push(tüüp);
        }
        return tüüp;
    }
}
class Puu {
    x;
    y;
    tüüp;
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.tüüp = this.tüüp;
    }
    draw(canvas) {
        this.tüüp.draw(this.x, this.y, canvas);
    }
}
class Mets {
    puudMetsas;
    istutaPuu(x, y, nimi, värv, pinnavorm) {
        let tüüp = PuuVabrik.puuTüüp(nimi, värv, pinnavorm);
        let puu = new Puu(x, y, tüüp);
        this.puudMetsas.push(puu);
    }
    drawCanvas(canvas) {
        this.puudMetsas.forEach(tree => { tree.draw(canvas); });
        console.log("DrawCanvas");
    }
}
const canvas = document.getElementById("canvas");
const mets = new Mets();
mets.istutaPuu(50, 100, "Tamm", "Tumepruun", "tamm.png");
mets.istutaPuu(150, 100, "Mänd", "green", "mänd.png");
mets.istutaPuu(200, 130, "Jaapani Mänd", "roosa", "sakura.png");
mets.drawCanvas(canvas);
