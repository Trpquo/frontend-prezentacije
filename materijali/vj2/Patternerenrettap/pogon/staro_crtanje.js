var bodyMargin = $('body').eq(0).css('margin-left');
bodyMargin = Number(bodyMargin.slice(0, 1)) * 2;
// stalne varijable
var fillColor = '#333', strokeColor = '#a98', canvasWidth, canvasHeight,
        tipRešetke, tip, snap, a, nSvi, n, nX = 6, r, R, kut, kA, kG, rPlus, z, razmak, brojStupaca, brojRedaka,
        proba = 1, učitavanje = 1, fill = false;

// crtanje
function iscrtajGlavni() {

    var canv = $('#glavniCanvas');
    var cont = canv.get(0).getContext('2d');
    proba++;
    učitavanje++;

    var val = upišiPostavke();
    var valF = val[0], valR = val[1];

    canvasWidth = valF.width;
    canvasHeight = valF.height;
    fillColor = valF.fill;
    strokeColor = valF.stroke;
    tipRešetke = valR.tip;
    rPlus = valR.rPlus;
    a = valR.a;
    snap = valR.snap;
    z = valR.brojPodjela;

//    console.log('canvas dimenzije:', canvasWidth, 'x', canvasHeight);

    canv.attr('width', canvasWidth).attr('height', canvasHeight);
    cont.save();

    cont.strokeStyle = cont.fillStyle = strokeColor;

    for (i in tipRešetke) {
        tip = tipRešetke[i].replace('rešetka', '');
        nSvi = rešetka[tip];

        for (x in nSvi) {

            n = nSvi[x];

            // /* TESTNO PODRUČJE */ //
            
            //tip = 'bucka';
            //n = 4;
            
            ////////////////////

            if (n === 0) {
                kA = kG = false;
                r = R = a+rPlus;
            }
            else {
                kA = alpha(n);
                kG = gamma(n);
                r = dajr(n, a, rPlus);
                R = dajR(n, a, rPlus);
            }
            switch (tip) {
                case 'matrica':
                case 'krug2x2':
                case 'No8':
                    brojStupaca = Math.round(canvasWidth / r) + 5;
                    brojRedaka = Math.round(canvasHeight / r) + 5;
                    rešetkaMatrica(cont, tip, n, a, r, brojStupaca, brojRedaka, kA, kG);
                    break;
                case 'uskoPakiranje':
                case 'cvijet':
                case 'No4':
                    brojStupaca = Math.round(canvasWidth / R) + 5;
                    brojRedaka = Math.round(canvasHeight / R) + 5;
                    rešetkaCvijet(cont, tip, n, a, R, brojStupaca, brojRedaka, kA, kG, nX);
                    break;
                case 'rešetkaNo1':
                    rešetkaNo1(cont, a, n, brojStupaca, brojRedaka)
                    break;

                case 'banananas':
                    alert('BANANANAS!!!');
                    break;
                default:
                    break;
                    brojStupaca = Math.round(canvasWidth / R) + 2;
                    brojRedaka = Math.round(canvasHeight / R) + 2;
                    console.log(brojStupaca, brojRedaka, r, R);
                    cont.save();
                    for (red = 0; red < brojRedaka; red++) {
                        for (stup = 0; stup < brojStupaca; stup++) {
                            mnogokut(cont, n, a, kG);
                            cont.translate(r, 0);
                        }
                        cont.setTransform(1, 0, 0, 1, 0, 0);
                        cont.translate(0, (red + 1) * r);
                    }
                    cont.restore();
            }
        }
    }
}
;
/*//////////////////////////////////// PRAVILNE PPODJELE PROSTORA //////////////////////////////////////////////////////////*/

var rešetka = new Object();
rešetka.popis = ['prazno', 'matrica', 'krug2x2', 'usko pakiranje', 'cvijet', 'rešetkaNo1', 'rešetkaNo2', 'rešetkaNo3', 'rešetkaNo4', 'rešetkaNo5', 'rešetkaNo5bis', 'rešetkaNo6', 'rešetkaNo6bis', 'rešetkaNo7', 'rešetkaNo7bis', 'rešetkaNo8', 'rešetkaNo9', 'rešetkaNo9bis', 'rešetkaNo10', 'rešetkaNo11', 'rešetkaNo12', 'rešetkaNo13', 'rešetkaNo13bis', 'rešetkaNo13ter', 'rešetkaNo13quat', 'rešetkaNo14', 'rešetkaNo14bis', 'rešetkaNo14ter', 'rešetkaNo15', 'rešetkaNo16'];
rešetka.matrica = [0];
rešetka.krug2x2 = [0]; //rješen
rešetka.uskoPakiranje = [0]; //rješen
rešetka.cvijet = [0]; //rješen
rešetka.No1 = [3, 12];
rešetka.No2 = [4, 6, 12];
rešetka.No3 = [4, 8];
rešetka.No4 = [6];
rešetka.No5 = [3, 3, 4, 12];
rešetka.No5bis = [3, 3, 4, 12];
rešetka.No6 = [3, 3, 6, 6];
rešetka.No6bis = [3, 3, 6, 6];
rešetka.No7 = [3, 4, 4, 6];
rešetka.No7bis = [3, 4, 4, 6];
rešetka.No8 = [4];
rešetka.No9 = [3, 3, 3, 4, 4];
rešetka.No9bis = [3, 3, 3, 4, 4];
rešetka.No10 = [3, 3, 3, 3, 6];
rešetka.No11 = [3, 3, 3, 3, 3, 3];
rešetka.No12 = [4, 6, 12, 3, 4, 4, 6];
rešetka.No13 = [3, 4, 4, 6, 3, 3, 3, 4, 4];
rešetka.No13bis = [3, 4, 4, 6, 3, 3, 3, 4, 4];
rešetka.No13ter = [3, 4, 4, 6, 3, 3, 3, 4, 4];
rešetka.No13quat = [3, 4, 4, 6, 3, 3, 3, 4, 4];
rešetka.No14 = [3, 3, 3, 4, 4, 3, 3, 3, 3, 3, 3];
rešetka.No14bis = [3, 3, 3, 4, 4, 3, 3, 3, 3, 3, 3];
rešetka.No14ter = [3, 3, 3, 4, 4, 3, 3, 3, 3, 3, 3];
rešetka.No15 = [3, 3, 4, 12, 3, 3, 3, 3, 3, 3];
rešetka.No16 = [3, 3, 4, 12, 3, 3, 3, 4, 4, 3, 3, 3, 3, 3, 3];

// REŠETKA krug
function rešetkaMatrica(c, tip, n, a, r, bS, bR, kA, kG) {
    c.save();
    if (tip === 'matrica' || kA) {
        r = 2 * r;
        if (tip === 'matrica') c.translate(a, a);
    }
    if (tip === 'uskoPakiranje') {
        c.translate(-a, -a);
    }
    for (red = 0; red < bR; red++) {
        c.save();
        for (stupac = 0; stupac < bS; stupac++) {
            if (kA) {
                mnogokut(c, n, a, kG)
            } else {
                krug(c, a)
            }
            c.translate(r, 0);
        }
        c.restore();
        c.translate(0, r);
    }
    c.restore();
}
;
function rešetkaCvijet(c, tip, n, a, R, bS, bR, kA, kG, nX) {
    console.log(tip, n, a, R, bS, bR, kA, kG, nX);
    if (tip !== 'cvijet') {
        R = R * 2;
    }
    var aH = R * Math.sqrt(3) / 2;
    c.translate(-a, a - 2 * aH);
    if (kA) { nX = n; c.translate(a+(R-a)/2, -a);}
    for (red = 0; red < bR; red++) {
        c.save();
        for (stupac = 0; stupac < bS; stupac++) {
            c.save();
            if (kA) { mnogokut(c, n, a, kA); }
            else { krug(c, a); } //c.fill();
            for (i = 0; i < ((nX / 2) - 2) ; i++) {
                if (kA) c.translate(-(R - a), 0);
                c.rotate(alpha(nX));
                if (kA) c.translate(-(R-a), 0);
                c.translate(R, 0);
                if (kA) { mnogokut(c, n, a, kA); }
                else { krug(c, a); }
                
            }
            c.restore();
            if (kA) c.translate((R-a), 0);
            c.translate(R, 0);
        }
        c.restore();
        if (kA) c.translate(0, -aH);
        c.translate(0, 2*aH);
    }
}
;
function rešetkaNo1(c, a, n, bS, bR) {
    var ah = izračunajVisinu(n, a), aw = ah;

    c.save();
    c.translate(aw, 0);
    for (r = 0; r < bR; r++) {
        c.save();
        for (s = 0; s < bS; s++) {
            mnogokut(a, (Math.PI - kutMnogokuta(12)), c);
            c.translate(aw, -aw);
            mnogokut(a, (Math.PI - kutMnogokuta(12)), c);
            c.translate(aw, aw);
        }
        c.restore();
        c.translate(0, r * ah);
    }
}
/*//////////////////////////////////// PRAVILNI LIKOVI //////////////////////////////////////////////////////////*/

function krug(c, a) {
    c.save();
    //c.translate(a, a);
    c.beginPath();
    c.arc(0, 0, a, 0, Math.PI * 2, false);
    c.stroke();
    if (fill)
        c.fill();
    c.restore();
}
;
function mnogokut(c, n, a, k) {
    c.save();
    c.beginPath();
    c.moveTo(0, 0);
    for (i = 0; i < n; i++) {
        c.lineTo(a, 0);
        c.translate(a, 0);
        c.rotate(k);
    }
    c.closePath();
    c.stroke();
    if (fill) { c.fill(); }
    c.restore();
}
;

/*//////////////////////////////////// STALNI RAČUNI //////////////////////////////////////////////////////////*/

function dajVisinuŠirinu(n, a) {
    switch (n) {
        case 3:
            return Math.sin(kutMnogokuta(3)) * a;
            break;
        case 4:
            break;
        case 6:
            break;
        case 8:
            break;
        case 12:
            return a + 2 * (Math.cos(kutMnogokuta(12) / 2) * a / Math.sqrt(2));
            break;
        default:
            break;
    }
}
;

function dajR(n, a, rPlus) {
   
    kut = alpha(n) / 2;
    kut = a / (2 * Math.sin(kut));
    console.log(n, a, rPlus, kut);
    return kut + rPlus;
}
;
function dajr(n, a, rPlus) {
    kut = alpha(n)  / 2;
    kut = a / (2 * Math.tan(kut));
    return kut + rPlus;
}
;
function alpha(n) {
    return Math.PI * 2 / n;
}
;
function gamma(n) {
    return (n - 2) * Math.PI / n;
}
;
function deg(k) {
    return k * Math.PI / 180; // 0.017453292519943295
}
;
function rad(d) {
    return d / Math.PI * 180;
}
;
function kutMnogokuta(n) {
    var k = ((n - 2) / n) * 180;
    //console.log('kut', n, '-tverokuta iznosi', k, 'stupnjeva');
    return deg(k);
}
;

/*//////////////////////////////////// RANDOMIZER //////////////////////////////////////////////////////////*/
function iscrtajKrasni() {
    var canv = $('#krasniCanvas');
    var c = canv.get(0).getContext('2d');
    var cD = 35, v = cD, vratar = 'stoj', r, g, b;

    canv.attr('width', cD).attr('height', cD);
    colorPicker(canv, c);

    var colorRandomiser = function () {
        c.save();
        c.beginPath();
        c.translate(cD / 2, cD / 2);
        for (r = 0; r < 3; r++) {
            c.rotate(rad(Math.random()));
            c.fillStyle = randomColor();
            c.arc(0, 0, cD / 3, 0, Math.PI, Math.round(Math.random())); // ovo zadnje je true ili false randomizator
            c.closePath();
            c.fill();
        }
        c.restore();
    };

    var crtajVrata = function () {
        c.clearRect(0, 0, cD, cD);
        c.fillStyle = '#333';
        c.fillRect(0, 0, cD, cD);
        colorRandomiser();
        c.save();

        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(v, 0);
        c.lineTo(0, v);
        c.closePath();
        c.fillStyle = '#555';
        c.fill();

        c.beginPath();
        c.moveTo(cD, cD);
        c.lineTo(cD, cD - v);
        c.lineTo(cD - v, cD);
        c.closePath();
        c.fillStyle = '#aaa';
        c.fill();

        c.restore();
        c.strokeRect(5, 5, cD - 10, cD - 10);
    };
    crtajVrata();

    var animirajVrata = function () {
        switch (vratar) {
            default:
            case 'stoj':
                break;
            case 'otvaraj':
                if (v < 0) {
                    v = 0;
                    break;
                }
                v -= 1;
                crtajVrata();
                break;
            case 'zatvaraj':
                if (v > cD) {
                    vratar = 'stoj';
                    break;
                }
                v += 1;
                crtajVrata();
                break;
        }
        if (vratar !== 'stoj') {
            setTimeout(animirajVrata, 100);
        }
    };



    canv.on('mouseover', function () {
        vratar = 'otvaraj';
        animirajVrata();
    });
    canv.on('mouseout', function () {
        vratar = 'zatvaraj';
        animirajVrata();
    });
}
;