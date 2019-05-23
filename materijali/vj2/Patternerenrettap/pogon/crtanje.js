var bodyMargin = $('body').eq(0).css('margin-left');
bodyMargin = Number(bodyMargin.slice(0, 1)) * 2;
// stalne varijable
var canvas = $('#glavniCanvas'), context = canvas.get(0).getContext('2d'), values = {};
var fillColor = '#333', strokeColor = '#a98', canvasWidth, canvasHeight,
        tipRešetke, tip, lik, snap, podatci, a, nSvi, n, nX = 6, r, R, kut, kA, kG, rPlus, pX, pY, šU, vU, sX, sY, z, zig, razmak, brojStupaca = 10, brojRedaka = 6,
        proba = 1, učitavanje = 1, fill = false;

// crtanje
function iscrtajGlavni(canv, cc, mjere) {

    var canv = canv, c = cc, valF = mjere[0], valR = mjere[1];
    proba++;
    učitavanje++;
    canvasWidth = valF.width;
    canvasHeight = valF.height;
    canv.attr('width', canvasWidth).attr('height', canvasHeight);
    tipRešetke = valR.tip;
    c.save();

    c.strokeStyle = c.fillStyle = strokeColor;

    for (i in tipRešetke) {
        tip = tipRešetke[i];
        n = patternerenrettap[tip].nterokuti;
        lik = patternerenrettap[tip].uzorak;
        

        fillColor = valF.fill;
        strokeColor = valF.stroke;
        
        rPlus = valR.rPlus;
        a = valR.a;
        snap = valR.snap;
        sX = valR.početniX;
        sY = valR.početniY;
        šU = valR.širinaUzorka;
        vU = valR.visinaUzorka;
        brojStupaca = valR.brojStupaca;
        brojRedaka = valR.brojRedaka;
        zig = valR.zigZag;
        om = valR.omjer;

        /////////////////// CRTANJE ///////////////////////////

        c.save();
        //c.scale(om, om);
        c.translate(sX, sY);
        //console.log('Crtam', tip, brojStupaca, brojRedaka);
        for (red = 0; red < brojRedaka; red++) {
            c.save();

            for (stupac = 0; stupac < brojStupaca; stupac++) {

                if (lik) { lik(c, a, rPlus); }
                else {
                    if (n[0] === 0) { krug(c, a); }
                    else { mnogokut(c, n[0], a); }
                }
                c.translate(šU, 0);
            }
            c.restore();

            if (zig) {
                if (red % 2 === 0) { c.translate(-šU / 2, 0); }
                else { c.translate(šU/2, 0); }
            }

            c.translate(0, vU);
        }
        c.restore();
    }
}
;
/*//////////////////////////////////// PRAVILNE PPODJELE PROSTORA //////////////////////////////////////////////////////////*/
    
/*//////////////////////////////////// PRAVILNI LIKOVI //////////////////////////////////////////////////////////*/

var krug = patternerenrettap.osnove.krug,
    mnogokut = patternerenrettap.osnove.mnogokut,
    hodPoMnogokutu = patternerenrettap.osnove.hodPoMnogokutu,
    mnogokutPoOpsegu = patternerenrettap.osnove.mnogokutPoOpsegu,
    trokutniCvijet = patternerenrettap.osnove.trokutniCvijet,
    krug = patternerenrettap.osnove.krug,
    točka = patternerenrettap.osnove.točka;

/*//////////////////////////////////// STALNI RAČUNI //////////////////////////////////////////////////////////*/

var deg = patternerenrettap.račun.deg,
    rad = patternerenrettap.račun.rad,
    kutMnogokuta = patternerenrettap.račun.kutMnogokuta,
    alpha = patternerenrettap.račun.alpha,
    gamma = patternerenrettap.račun.gamma,
    opisniRadius = patternerenrettap.račun.opisniRadius,
    upisniRadius = patternerenrettap.račun.upisniRadius;