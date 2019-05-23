var boja1 = "#fc0",
    boja2 = "#e04800",
    boja3 = "#484f58",
    boja4 = "#efefef";

function crtajIlustraciju(platno, funkcija) {
    var canvas = $(platno).get(0),
        c = canvas.getContext('2d'),
        w = $('main').eq(0).width() * .75;

    canvas.width = w;
    canvas.height = 2 * w / 3;

    funkcija(canvas, c, w);
};

/* *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */

function crtajHarmonije() {

    var canvas = $('#harmonije').get(0),
        c = canvas.getContext('2d'),
        w = $('main').eq(0).width();

    canvas.width = w / 1.35;
    canvas.height = w / 3;

    var šir = canvas.width,
        vis = canvas.height,
        amplituda = 200;

    c.fillStyle = c.strokeStyle = boja3;
    c.translate(0, vis / 2);

    // osnovnica
    c.strokeStyle = boja2;
    c.lineWidth = 3;
    c.moveTo(0, 0);
    c.lineTo(šir, 0);
    c.stroke();



    c.strokeStyle = boja3;
    c.lineWidth = 1;

    // vibracije
    c.save();
    for (h = 1; h < 20; h++) {
        interval(c, h, šir, vis, amplituda);
    }
    c.restore();


    var harmBoje = [boja1, boja2, boja3, '#000'];

    c.save();

    // harmonici
    for (t = 82; t > 1; t--) {
        var harmBoja = harmBoje[Math.floor(t / 20)];
        c.save();
        for (tt = 0; tt < t - 1; tt++) {
            c.translate(šir / t, 0);
            točka(c, 1, harmBoja);
        }
        c.restore();
        c.translate(0, 2);
    }
    c.restore();
    c.save();

    c.translate(4, 0);
    točka(c, 4, boja1);
    c.translate(šir - 8, 0);
    točka(c, 4, boja1);

    c.restore();


};



// harmonije

function interval(c, int, šir, vis, amp) {
    var imp = 2 * int,
        z = 1;
    c.globalAlpha = 1 / imp;
    c.beginPath();
    c.moveTo(0, 0);

    for (i = 1; i < imp; i += 2) {
        z = -z;
        c.quadraticCurveTo(i * šir / imp, z * amp / int, (i + 1) * šir / imp, 0);
    }
    for (i = imp - 1; i > -1; i -= 2) {
        z = -z;
        c.quadraticCurveTo(i * šir / imp, z * amp / int, (i - 1) * šir / imp, 0);
    }

    c.closePath();
    c.stroke();
};

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

function dinamikaWeba(canvas, c, w) {

    var w = $(canvas).parent().width(),
        h = $(canvas).parent().height() - 120;

    canvas.width = w;
    canvas.height = h;
    var profil = new Image();
    $(profil).attr('src', 'materijali/vj2/profil.png').get(0);

    profil.onload = function() {
        c.save();
        c.translate(-100, -95);
        c.drawImage(profil, 10, 10, 100, 150);
        c.translate(w, 0);
        c.scale(-1, 1);
        c.drawImage(profil, 10, 10, 100, 150);
        c.restore();
    };


    c.fillStyle = c.strokeStyle = boja3;
    c.lineWidth = 3;
    c.translate(100, h / 2);

    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(w - 200, 0);
    c.stroke();

    $('#dinamikaGif').on('click', function() {
        console.log('tu sam');
        $(this).attr('src', 'materijali/vj1/poruka.gif');
    }).css({ 'top': h / 2 - 35, 'left': w / 2 - 66 });


}


/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

function crtajGanzfeld(canvas, c, w) {

    canvas.height = w;

    c.clearRect(0, 0, w, w);

    var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],
        r1 = hex[14] + hex[15],
        g1 = hex[14] + hex[15],
        b1 = hex[14] + hex[15],
        r2 = hex[14] + hex[15],
        g2 = hex[14] + hex[15],
        b2 = hex[14] + hex[15],
        rad1 = 0,
        rad2 = w / 3,
        jed = 15,
        des = 14,
        uk = 0,
        tempo = 100;

    var grd;

    c.save();

    c.fillStyle = grd;
    c.translate(w / 2, w / 3);

    var animGrid = function() {
        setTimeout(function() {

            if (rad1 !== rad2) {
                if (jed === 0) { jed = 15;
                    des--; }
                jed--
                uk++
                if (r1 !== '12') r1 = hex[des] + hex[jed];
                if (uk >= 16 && g1 !== '91') g1 = hex[des + 1] + hex[jed];
                if (uk >= 32 && b1 !== '93') b1 = hex[des + 2] + hex[jed];
                if (rad1 !== rad2) rad1 += rad2 / 400;

                c.scale(.996, .996);
                c.translate(0, -rad2 / 500);

                crtajGradijent();
                if (tempo > 50) tempo -= .75;
                if (rad1 < rad2 - 5) animGrid();
            }
        }, tempo);

    }

    var deanimGrid = function() {

        setTimeout(function() {
            if (jed === 15) { if (des < 14) { jed = 0; if (des < 14) des++; } }
            jed++
            uk--
            if (r1 !== '1415') r1 = hex[des] + hex[jed];
            if (des > 8 && g1 !== '1415') g1 = hex[des] + hex[jed];
            if (des > 8 && b1 !== '1415') b1 = hex[des] + hex[jed];
            if (rad1 > 0) rad1 -= rad2 / 180;

            c.scale(1.008, 1.008);
            c.translate(0, rad2 / 300);

            if (hex[des] && hex[jed]) crtajGradijent();
            if (tempo < 200) tempo += .5;

            if (rad1 > 0) deanimGrid();
        }, tempo);
    }

    function crtajGradijent() {
        if (rad1 < 0) rad1 = 0;
        grd = c.createRadialGradient(0, 0, rad1, 0, 0, rad2);
        grd.addColorStop(0, '#' + r1 + g1 + b1);
        grd.addColorStop(1, '#' + r2 + g2 + b2);
        c.fillStyle = grd;
        krug(c, w);
    };

    $(document).on('keydown', function(e) {
        var key = e.which || e.keycode;
        if (key === 27) {
            $(canvas).stop();
            tempo = 5;
            rad1 = rad2 - 1;
            if (des < 1) des = 1;
            deanimGrid();
        }
    });

    animGrid();

    c.restore;
}

function crtajJednostavnost(canvas, c, w) {

    var jednostavnostKlik = 0;
    c.lineWidth = 3;
    c.translate((w * 7 / 8) / 6, w / 3);
    c.save();

    c.translate((w * 7 / 8) / 3, 0);

    function oblik(krak1, krak2) {
        c.save();
        for (i = 0; i < 2; i++) {
            c.beginPath();
            c.moveTo(0, 0);
            c.lineTo(w / 8, 0);
            if (i > 0) { krak1 = krak2 }
            c.lineTo(-w / 24, -krak1);
            c.closePath();
            c.stroke();
            c.translate((w / 8) + 4, 0);
            c.scale(-1, 1);
        }
        c.restore();
    }

    function mnogokuti() {

        c.clearRect((-w * 7 / 8) / 6, -w / 3, canvas.width, canvas.height);
        c.save();
        c.fillStyle = boja4;
        c.save();
        c.translate(w / 10, 0);
        c.rotate(Math.PI);
        mnogokut(c, 3, w / 6);
        c.stroke();
        c.restore();
        c.translate((w / 3) - (w / 20), 0);
        c.save();
        c.scale(1, -1);
        mnogokut(c, 5, w / 10);
        c.stroke();
        c.restore();
        c.translate(w / 3, 0);
        c.save();
        c.scale(1, -1);
        mnogokut(c, 9, w / 18);
        c.stroke();
        c.restore();
        c.stroke();
        c.restore();
    }

    function zbrka() {

        c.clearRect((-w * 7 / 8) / 6, -w / 3, canvas.width, canvas.height);

        c.save();
        var x = 0,
            y = 0,
            runda = Math.floor(Math.random() * 255);
        c.globalCompositeOperation = 'hard-light';
        c.translate(w / 3, 0);
        c.lineWidth = 2;
        c.beginPath();
        c.moveTo(0, 0);
        for (r = 0; r < runda; r++) {
            $(canvas).delay(500);
            x = (Math.floor(Math.random() * w) - w / 2);
            y = (Math.floor(Math.random() * (canvas.height + 1)) - canvas.height / 2);
            c.strokeStyle = 'rgb(' + (Math.floor(Math.random() * 255)) + ', ' + (Math.floor(Math.random() * 200)) + ', ' + (Math.floor(Math.random() * 255)) + ')';
            c.lineWidth = Math.floor(Math.random() * 6);
            c.lineTo(x, y);
            c.arcTo(y, x, y + 50, x + 50, x * x / 2);
            c.stroke();
            if (r % 3 === 0) {
                c.save();
                c.translate(x, y);
                c.fillStyle = 'rgb(' + (Math.floor(Math.random() * 255)) + ', ' + (Math.floor(Math.random() * 200)) + ', ' + (Math.floor(Math.random() * 124)) + ')';
                c.rotate(Math.floor(Math.random() * Math.PI));
                mnogokut(c, Math.floor(Math.random() * 7), Math.floor(Math.random() * 20 + 40));
                c.restore();
            }
            c.beginPath();
            c.moveTo(100 * x / y, 100 * y / x);
        }

        c.restore();
    }

    oblik(w / 10, w / 7.7);
    c.translate(-(w * 7 / 8) / 3, 0);

    $(canvas).click(function() {
        jednostavnostKlik++;
        if (jednostavnostKlik === 1) { oblik(w / 10, w / 10); }
        if (jednostavnostKlik === 2) {
            c.translate(2 * (w * 7 / 8) / 3, 0);
            oblik(w / 10, w / 6);
            c.restore();
        }
        if (jednostavnostKlik === 3) mnogokuti();
        // if (jednostavnostKlik > 10) crtajIlustraciju('#jednostavnost', crtajJednostavnost);
        if (jednostavnostKlik > 3) zbrka();
    });
}

function crtajSimetrije(canvas, c, w) {

    canvas.height = w;
    c.fillStyle = boja3;

    function zarez() { c.fillText(',', 0, em); };

    function noviRed(prazni) {
        c.translate(0, 0.75 * em);
        if (prazni !== 'prazni') {
            c.translate(0, 0.75 * em);
            c.beginPath();
            c.moveTo(0, em / 4);
            c.lineTo(em * (n + 1), em / 4);
            c.closePath();
            c.stroke();
        }
    }
    var nn = 30,
        em = $(window).height() / nn,
        n = Math.floor(canvas.width / em);
    c.strokeStyle = boja1;
    c.font = "bold " + 2 * em + "px serifni, serif";
    /* RITMOVI */

    c.translate(0, -em * 1.35);
    noviRed();
    c.translate(0, em);

    // takt
    c.save();
    for (tr = 0; tr < n; tr++) {
        c.save();
        c.rotate(Math.PI / 6);
        mnogokut(c, 3, em);
        c.restore();
        c.translate(em * 1.5, 0);
    }
    c.restore();
    c.translate(0, em * 2);

    // polovinke
    c.save();
    for (tr = 0; tr < n; tr++) {
        c.save();
        if ((tr + 2) % 2 === 0) {
            mnogokut(c, 4, em);
        } else {
            c.translate(em / 2, em / 8);
            c.rotate(Math.PI / 3);
            mnogokut(c, 3, em);
        }
        c.restore();
        c.translate(em * 1.5, 0);
    }
    c.restore();
    c.translate(0, em * 2.5);

    // triole
    c.save();
    c.translate(em / 2, 0);
    for (tr = 0; tr < n; tr++) {
        c.save();
        if ((tr + 3) % 3 === 0) { točka(c, em / 2); } else { točka(c, em / 3); }
        c.restore();
        c.translate(em * 1.5, 0);
    }
    c.restore();

    c.translate(0, em * 1.35);

    // ubrzanje
    c.save();
    for (ub = 1; ub < n * 3; ub++) {
        c.scale(.96, 1);
        mnogokut(c, 4, em);
        c.translate(em * 1.8, 0);
    }
    c.restore();

    noviRed();

    //  MNOGOSTRUKE SIMETRIJE

    c.save();
    c.translate(w / 6, 2.5 * em);
    // oko točke
    točka(c, 4, boja2);

    c.save();
    c.rotate(-Math.PI / 4);
    for (t = 0; t < 3; t++) {
        c.rotate(Math.PI / 1.5);
        zarez();
    }
    c.restore();

    c.translate(em * n / 3, 0);
    // oko osi

    c.beginPath();
    c.moveTo(0, -em / 2 - 4);
    c.lineTo(0, em / 2);
    c.closePath();
    c.stroke();

    c.save();
    c.translate(-em * .75, -em);
    zarez();
    c.translate(em * 1.5, 0);
    c.scale(-1, 1);
    zarez();
    c.restore();

    c.translate(em * n / 3, 0);

    // oko točke i osi
    točka(c, 4, boja2);

    c.save();
    c.rotate(-Math.PI / 2);
    for (to = 0; to < 3; to++) {
        c.rotate(Math.PI / 1.5);

        // ponavljanje oko osi
        c.save();
        c.rotate(Math.PI / 2);
        c.translate(0, -em);
        c.beginPath();
        c.moveTo(0, -em / 2);
        c.lineTo(0, em / 2);
        c.closePath();
        c.stroke();

        c.save();
        c.translate(-em * .75, -em);
        zarez();
        c.translate(em * 1.5, 0);
        c.scale(-1, 1);
        zarez();
        c.restore();
        c.restore();
    }
    c.restore();
    c.restore();

    c.translate(0, 2.75 * em);
    noviRed();

    // RAZNE SIMETRIJE

    // obično ponavljanje
    c.save();
    for (i = 0; i < n + 2; i++) {
        zarez();
        c.translate(em, 0);
    }
    c.restore();

    noviRed();
    // ponavljanje sa uspravnim zrcaljenjem
    c.save();
    for (i = 0; i < n * 1.5; i++) {
        c.save();
        if (i % 2 === 0) { c.translate(-1.5 * em, 0);
            c.scale(-1, 1); }
        zarez();
        c.restore();
        c.translate(em, 0);
    }
    c.restore();
    noviRed();

    // ponavljanje sa rotacijom
    c.save();
    for (i = 0; i < n * 1.5; i++) {
        c.save();
        if (i % 2 === 0) { c.translate(-1.5 * em, 2 * em);
            c.scale(-1, -1); }
        zarez();
        c.restore();
        c.translate(em, 0);
    }
    c.restore();
    noviRed();

    // ponavljanje sa zrcaljenjem i rotacijom
    c.save();
    // mnogokut(c, 3, em);
    for (dva = 0; dva < n / 1.5; dva++) {
        c.save();
        for (i = 1; i < 5; i++) {
            c.save();
            if (i % 2 === 0) { c.translate(-.5 * em, 2.8 * em);
                c.scale(1, -1); }
            if (i % 4 === 0) { c.translate(.5 * em, 0);
                c.scale(-1, 1); }
            if (i % 3 === 0) { c.translate(.5 * em, 0);
                c.scale(-1, 1); }
            zarez();
            c.restore();
            c.translate(.5 * em, 0);
        }
        c.restore();
        c.translate(2 * em, 0);
    }
    c.restore();
    noviRed('prazni');
    noviRed();

    // ponavljanje sa zrcaljenjem, rotacijom i pomakom
    c.save();
    c.translate(0, .75 * em);
    for (dva = 0; dva < n / 1.5; dva++) {
        c.save();
        for (i = 1; i < 5; i++) {
            c.save();
            if (i % 2 === 0) { c.translate(0, -.75 * em); }
            if (i % 4 === 0) { c.translate(.45 * em, 2 * em);
                c.scale(-1, -1); }
            if (i % 3 === 0) { c.translate(.45 * em, 2 * em);
                c.scale(-1, -1); }
            zarez();
            c.restore();
            c.translate(.5 * em, 0);
        }
        c.restore();
        c.translate(2 * em, 0);
    }
    c.restore();
    noviRed('prazni');
    noviRed();

    // ponavljanje sa zrcaljenjem, pomakom i zrcaljenjem 
    c.save();
    for (pun = 0; pun < n; pun++) {
        c.save();
        for (dva = 1; dva < 3; dva++) {
            for (i = 1; i < 3; i++) {
                c.save();
                if (i % 2 === 0) { c.translate(.5 * em, 0);
                    c.scale(-1, 1); }
                zarez();
                c.restore();
                c.translate(.5 * em, 0);
            }
            c.scale(1, -1);
            c.translate(0, -2.75 * em);
        }
        c.restore();
        c.translate(2 * em, 0);
    }
    c.restore();
    noviRed('prazni');
    noviRed();

}

function crtajRazlike(canvas, c, w) {
    canvas.width = w / 4.6;
    canvas.height = w / 7.35;

    var platno = '#' + canvas.id,
        brojRedaka = 4,
        brojStupaca = 6;

    if (vj === 2) {
        var mjera = .85;
        c.scale(mjera, mjera);
        canvas.width = w / 4.6 * mjera;
        canvas.height = w / 7.35 * mjera;
    }

    c.save();
    c.fillStyle = boja3;


    if (platno === '#razlikaPoložaja4') {
        c.save();
        c.fillStyle = boja1;
        c.translate(-8, -8);
        c.scale(1.5, 1);
        c.globalAlpha = 0.6;
        mnogokut(c, 4, (canvas.width / brojStupaca) * 2);
        c.restore();
    }
    if (platno === '#razlikaPoložaja2') { c.scale(1, .92); }
    for (red = 0; red < brojRedaka; red++) {
        c.save();
        if (platno === '#razlikaVeličina') { c.translate((canvas.width / brojStupaca) * .1, (canvas.width / brojStupaca) * .1);
            c.scale(.7, .7); }
        for (stup = 0; stup < brojStupaca; stup++) {
            if (stup === nasumce(brojStupaca) && platno.indexOf('razlikaPoložaja') < 0) {
                c.save();
                switch (platno) {
                    case '#razlikaBoja':
                        c.fillStyle = boja2;
                        break;
                    case '#razlikaOblika':
                        mnogokut(c, 3, (canvas.width - 40) / brojStupaca);
                        c.translate(canvas.width / brojStupaca, 0);
                        break;
                    case '#razlikaVeličina':
                        c.translate(-(canvas.width / brojStupaca) * .175, -(canvas.width / brojStupaca) * .19);
                        c.scale(1.5, 1.5);
                        break;
                    default:
                        break;
                }
                mnogokut(c, 4, (canvas.width - 50) / brojStupaca);
                c.restore();
            } else if (platno === '#razlikaPoložaja3' && ((stup === 2 && red < 3) || (red === 2 && stup < 2)) || (platno === '#razlikaPoložaja1' && stup === 1) || (platno === '#razlikaPoložaja2' && red === 1)) {
                // preskoči potez
            } else {
                mnogokut(c, 4, (canvas.width - 50) / brojStupaca);
            }


            if (platno === '#razlikaVeličina') c.translate((canvas.width / brojStupaca) * .5, 0);
            if (platno === '#razlikaPoložaja1') c.translate((canvas.width / brojStupaca) * .25, 0);
            c.translate(canvas.width / brojStupaca, 0);
        }
        c.restore();
        if (platno === '#razlikaPoložaja2') c.translate(0, (canvas.width / brojStupaca) * .145);
        c.translate(0, canvas.width / brojStupaca);
    }

    c.restore();

    function nasumce(limit) {
        return Math.floor(Math.random() * limit);
    }
};


// vj2 slide 3
var klikNaSliku = 1,
    ukSlika = 9;
$('#slikaUslici').on('click', function() {
    klikNaSliku++
    if (klikNaSliku > ukSlika) klikNaSliku = 1;
    $(this).attr('src', 'materijali/vj2/slika-u-slici' + klikNaSliku + '.jpg');

}).on('contextmenu', function(e) {
    e.preventDefault();
    klikNaSliku--
    if (klikNaSliku < 1) klikNaSliku = ukSlika;
    $(this).attr('src', 'materijali/vj2/slika-u-slici' + klikNaSliku + '.jpg');
});


function crtajBoxModel() {

    var canvas = $('#boxModel').css('margin-top', '-1em').get(0),
        c = canvas.getContext('2d'),
        w = $(canvas).parent().width(),
        h = $(canvas).parent().height(),
        r = 50;

    canvas.width = w;
    canvas.height = h;

    c.fillStyle = boja2;
    c.fillRect(w / 6, h / 6, 4 * w / 6, 4 * h / 6);
    c.fillStyle = boja1;
    c.fillRect(w / 6 + r, h / 6 + r, 4 * w / 6 - 2 * r, 4 * h / 6 - 2 * r);
    c.lineWidth = 3;
    c.strokeRect(w / 6 + r, h / 6 + r, 4 * w / 6 - 2 * r, 4 * h / 6 - 2 * r);
    c.fillStyle = boja4;
    c.fillRect(w / 6 + 2 * r, h / 6 + 2 * r, 4 * w / 6 - 4 * r, 4 * h / 6 - 4 * r);

    c.save();
    c.lineWidth = 1;
    c.translate(w / 2, h / 2);
    for (i = 0; i < 2; i++) {
        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(w / 2 - (w / 6 + 2 * r), 0);
        c.lineTo(w / 2 - (w / 6 + 2 * r + 10), -10);
        c.moveTo(w / 2 - (w / 6 + 2 * r), 0);
        c.lineTo(w / 2 - (w / 6 + 2 * r + 10), 10);
        c.stroke();
        c.rotate(Math.PI);
    }
    for (i = 0; i < 2; i++) {
        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(0, h / 2 - (h / 6 + 2 * r));
        c.lineTo(-10, h / 2 - (h / 6 + 2 * r + 10));
        c.moveTo(0, h / 2 - (h / 6 + 2 * r));
        c.lineTo(10, h / 2 - (h / 6 + 2 * r + 10));
        c.stroke();
        c.rotate(Math.PI);
    }
    c.restore();

    c.save();
    c.translate(w / 2, h / 6);
    c.textAlign = 'center';
    c.font = '' + r / 2 + 'px sans-serif';
    c.fillText('margine', 0, 5 * r / 8);
    c.fillStyle = boja3;
    c.fillText('popune', 0, 13 * r / 8);

    c.translate(0, h / 2 - h / 6);
    c.font = '' + r / 3 + 'px sans-serif';
    c.fillStyle = boja2;
    c.fillText('širina', w / 6, -r / 8);
    c.rotate(-Math.PI / 2);
    c.fillText('visina', h / 8, -r / 8);
    c.restore();
}

function ocjenjivanje() {
    var ostatak = 100;
    var bod;
    $('#ocjenjivanje span').on('click', function() {
        bod = $(this).clone();
        console.log(bod);
        $('#ukupno').append(bod);
        ostatak -= bod.outerWidth();
        console.log(bod.outerWidth(), ostatak);
    });

    $('#ZWS').hide(0);
    $('#OWS').on('click', function() {
        $('#ZWS').fadeIn(3000);
    });
}



/* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */

function crtajSve() {

    if (vj === 1) {

        var klikNaSliku = 1;

        $('#slide4 figure img').on('click', function() {
            console.log('KLIK!');
            klikNaSliku++;
            if (klikNaSliku > 3) klikNaSliku = 1;
            $(this).attr('src', 'materijali/vj1/web-u-slici' + klikNaSliku + '.jpg');
            console.log('web-u-slici' + klikNaSliku + '.jpg');
        });

        crtajIlustraciju('#dinamikaWeba', dinamikaWeba);
        crtajIlustraciju('#razlikaBoja', crtajRazlike);
        crtajIlustraciju('#razlikaOblika', crtajRazlike);
        crtajIlustraciju('#razlikaVeličina', crtajRazlike);
        crtajIlustraciju('#razlikaPoložaja1', crtajRazlike);
        crtajIlustraciju('#razlikaPoložaja2', crtajRazlike);
        crtajIlustraciju('#razlikaPoložaja3', crtajRazlike);
        crtajIlustraciju('#razlikaPoložaja4', crtajRazlike);

        $('#razlikaBoja, #razlikaOblika, #razlikaVeličina').on('click', function() {
            var taj = '#' + $(this).attr('id').toString();
            crtajIlustraciju(taj, crtajRazlike);
        });


        $('#whodunnit').attr({ 'height': $(window).height() / 1.5, 'width': $(window).width() / 1.6 });

        $('#ganzfeld').attr('width', $('#ganzfeld').parent().width()).attr('height', $('#ganzfeld').parent().height()).on('click', function() {
            crtajIlustraciju('#ganzfeld', crtajGanzfeld)
        });

        crtajIlustraciju('#jednostavnost', crtajJednostavnost);

        crtajIlustraciju('#simetrije', crtajSimetrije);

        crtajIlustraciju('#harmonije', crtajHarmonije);


        var klikOCD = 1;
        $('#OCD').find('img').click(function() {
            klikOCD++;
            if (klikOCD > 4) klikOCD = 1;
            $(this).attr('src', 'materijali/vj2/OCD' + klikOCD + '.jpg');
        });

        $('#subjektivnoObjektivno').fadeOut(0);
        $('#prvoSubjektivnoObjektivno, #urođenoNaučeno, #priča').css({ 'margin-top': $(window).height() / 2 - 100, 'font-size': '1.5em' })
            .find('.poanta').css({ 'opacity': 0, 'display': 'inline-block', 'width': 10, 'margin': '0 -.25em' })
            .on('click', function(e) {
                $(this).animate({ 'opacity': 1, 'width': $(this).text().length / 2 + 'em', 'margin': '0' }, 500);
                if (e.currentTarget === $('#priča .poanta').get(0)) {
                    $('#priča').delay(1000).animate({ 'margin-top': '6em', 'font-size': '1.25em' }, 1000);
                    $('#subjektivnoObjektivno').delay(2500).fadeIn(1200);
                    var klik1 = 0,
                        klik2 = 0,
                        klik3 = 0;
                    $('#subjektivnoObjektivno').find('img').eq(0).click(function() {
                        klik1++;
                        var slike = ['rembrandt', 'picasso', 'rott', 'saturn'];
                        if (klik1 > slike.length - 1) klik1 = 0;
                        $(this).attr('src', 'materijali/vj2/' + slike[klik1] + '.jpg');
                    });
                    $('#subjektivnoObjektivno').find('img').eq(1).click(function() {
                        klik2++;
                        var slike = ['velazquez', 'rembrandt-gilda', 'buisness', 'grifon', 'beba'];
                        if (klik2 > slike.length - 1) klik2 = 0;
                        $(this).attr('src', 'materijali/vj2/' + slike[klik2] + '.jpg');
                    });
                    $('#subjektivnoObjektivno').find('img').eq(2).click(function() {
                        klik3++;
                        var slike = ['brueghel', 'manet', 'boljševik', 'štakori', 'matematika'];
                        if (klik3 > slike.length - 1) klik3 = 0;
                        $(this).attr('src', 'materijali/vj2/' + slike[klik3] + '.jpg');
                    });
                }
            });

        $('#pojamPojava, #doživljajČinjenica, #simboličnoDatost, #teorijaPrikaz, #fikcijaZbilja, #junakSvijet').css({ 'margin-top': '1em', 'font-size': '1.5em' }) // #razumljivoVjerodostojno, 
            .each(function() {
                var klikani = { klik1: 0, klik2: 0, klik3: 0 };
                var slika = $(this).find('img');

                slika.click(function() {
                    var koja = slika.index($(this)),
                        slike, figura = $(this).parent().attr('id');

                    klikani['klik' + (koja + 1)]++;
                    console.log(figura, klikani['klik' + (koja + 1)]);
                    switch (figura) {

                        case 'razumljivoVjerodostojno':
                            switch (koja) {
                                case 0:
                                    var slike = ['surogat', 'miffy', 'noćna-mora', 'pokemon', 'prsten', 'star-trek'];
                                    break;
                                case 1:
                                    var slike = ['mary-and-max', 'lav-i-miš', 'pinokio', 'avatar', 'space-jam'];
                                    break;
                                case 2:
                                    var slike = ['klasicizam', 'sam-u-kući', 'persepolis', 'bashir', 'rastava', 'autist'];
                                    break;
                            }
                            break;

                        case 'doživljajČinjenica':
                            switch (koja) {
                                case 0:
                                    var slike = ['čudovišta', 'čudnovište', 'geocentrizam', 'kreacionizam'];
                                    break;
                                case 1:
                                    var slike = ['monsters-inc', 'whoville', 'baltazar-grad', 'štrumfovi-grad', 'heliocentrizam', 'evolucija'];
                                    break;
                                case 2:
                                    var slike = ['strah-mrak', 'tokyo', 'svemir', 'rakovi'];
                                    break;
                            }
                            break;


                        case 'pojamPojava':
                            switch (koja) {
                                case 0:
                                    var slike = ['justinian', 'iluzija-lica', 'ghandi', 'karikatura', 'špilja1', 'sumer', 'sumer-kip', 'venera', 'japan', 'hindu', 'poklonstvo', 'šuma-striborova', 'most', 'kolodvor', 'metro', 'guernica', 'cassandre', 'ubermensch', 'nordmen', 'bad-arab'];
                                    break;
                                case 1:
                                    var slike = ['obrnuta-perspektiva', 'dali-mašta', 'stereotip', 'stereotip2', 'obrnuta-perspektiva2', 'alan', 'posljednja-večera', 'dubrovnik', 'gogen', 'dali1', 'rembrandt-anatomie', 'de-chirico', 'magritte', 'gitarist', 'dječja-moderna', 'simpsoni'];
                                    break;
                                case 2:
                                    var slike = ['renesansna-perspektiva', 'nered', 'facebook', 'nepoznati', 'tintoretti', 'barok-strop', '3d-streetart', 'dali2'];
                                    break;
                            }
                            break;

                        case "simboličnoDatost":
                            switch (koja) {
                                case 0:
                                    var slike = ['pismo-auto', 'pismo-gotica', 'pismo-ukrasno', 'pismo-novine', 'kod'];
                                    break;
                                case 1:
                                    var slike = ['hieroglifi', 'kinesko-pismo', 'piktogrami-olimpijada', 'emoticoni', 'iluminacija', 'kapitalisti', 'che', 'batman'];
                                    break;
                                case 2:
                                    var slike = ['špilja-lascaux', 'špilja-ljudi', 'kralj-tomislav', 'zebra', 'anatomija'];
                                    break;
                            }
                            break;


                    }
                    if (klikani['klik' + (koja + 1)] > slike.length - 1) klikani['klik' + (koja + 1)] = 0;
                    if ((figura === 'subjektivnoObjektivno' || figura === 'pojamPojava') && klikani['klik' + (koja + 1)] < 1) { $(this).attr('src', 'materijali/vj2/' + slike[klikani['klik' + (koja + 1)]] + '.jpg'); } else { $(this).attr('src', 'materijali/vj2/' + slike[klikani['klik' + (koja + 1)]] + '.jpg'); }
                });
            });
    }

    if (vj === 2) {
        var klikTuring = 1;
        $('#turingSearle').find('img').eq(0).click(function() {
            klikTuring++;
            if (klikTuring > 19) return;
            $(this).attr('src', 'materijali/vj3/turing-searle' + klikTuring + '.jpg');
        });
        $('#turingSearle').find('img').eq(0).on('contextmenu', function(e) {
            e.preventDefault();
            if (klikTuring === 1) return;
            klikTuring--;
            $(this).attr('src', 'materijali/vj3/turing-searle' + klikTuring + '.jpg');
        });
    }
    if (vj === 5) {

        crtajBoxModel();

    }

}