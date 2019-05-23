var samoOblik = false;

$(document).ready(function () {
    var kontrole = $('#kontrole'),
            fieldi = kontrole.find('fieldset, button, input[type=submit]'),
            rangeri = kontrole.find('input[type=range]'),
            vrijednosti = [$('#širinaFormata'), $('#visinaFormata'), $('#duljinaStranice'), $('#brojPodjela'), $('#razmakPodjela'), $('#strokeColor'), $('#fillColor')],
            bojatori = [$('#strokeColor'), $('#fillColor')],
            inputi = kontrole.find('input, select'),
            ključ = [$('#zahtjevProporcionalnosti'), $('#držiKontrast'), $('#doFill'), $('#snapToInt')],
            izbForm = $('#orijentacijaFormata').find('input'),
            izbOm = $('#izborOmjera'),
            controlAnimSpeed = 750, omjer, x, y, hex, r, g, b, račun;


    var odabir = $('#odabirTipaRešetke').find('option');
    var sreća = Math.round(Math.random() * odabir.length);
    console.log(odabir.eq(sreća).val(), 'je', sreća, 'od', odabir.length);
    odabir.eq(sreća).attr('selected', 'selected');
  
    fieldi.slideUp(0);

    rangeri.fadeOut();

    $('#visinaFormata, #visinatorFormata').val(Math.round(($(window).height() - 174) / ($('#canvasPaleta').width() / 1000)));
    //console.log('Visina prozora:', $(window).height(), ($(window).height() - 169) / ($('#canvasPaleta').width() / 1000));


    kontrole
            .on('click', function () {
                rangeri.fadeOut();
                $(this).addClass('otvorene');
                fieldi.stop(true, true).slideDown(controlAnimSpeed); //.delay(500)
            })
            //.on('mouseleave', function () {
            //    fieldi.stop(true, true).delay(1000).slideUp(controlAnimSpeed / 2);
            //})
    ;

    $('#opisRešetke').submit(function () {
        kontrole.removeClass('otvorene');
        fieldi.stop(true, true).slideUp(controlAnimSpeed / 2);
        return false;
    });

    $(document).keypress(function (e) {
        if (e.keyCode == 13) {
            fieldi.stop(true, true).slideToggle(controlAnimSpeed / 2);
            $('#odabirTipaRešetke').focus();
        }
        // else { console.log(e.keyCode) }
    });

    $('main').on('click', function () {
        kontrole.removeClass('otvorene');
        fieldi.stop(true, true).slideUp(controlAnimSpeed / 2);
    });

    ///////////////////////////// Funkcije rešetke /////////////////////////////////////

    values = dajRačunVrijednosti(false);

    //console.log(values[0].orijentacija);
    izbOm.hide();
    ključ[0].on('change', function () {
        izbOm.toggle();
    });

    for (i = 0; i < vrijednosti.length; i++) {
        vrijednosti[i].prev().on('mouseenter', function () {
            $(this).next().next().stop(true, true).fadeIn('slow');
        });
        vrijednosti[i].next()
                .on('mouseleave', function () {
                    $(this).stop(true, true).fadeOut('fast');
                })
                .on('change', function () {
                    $(this).prev().val($(this).val()).trigger('change');
                })
                .on('hover', function () {
                    $(this).attr('title', $(this).val().toString());
                });
        vrijednosti[i].on('change', function () {

            $(this).next().val($(this).val());
            switch ($(this).get(0).id) {
                case vrijednosti[0].attr('id'): // KAD SE PROMIJENI ŠIRINA
                    if (ključ[0].is(':checked')) {
                        omjer = values[0].izborOmjera;
                        x = vrijednosti[0].val() / omjer;
                        vrijednosti[1].val(x);
                        vrijednosti[1].next().val(x);
                    }
                    break;
                case vrijednosti[1].attr('id'): // KAD SE PROMIJENI VISINA
                    if (ključ[0].is(':checked')) {
                        omjer = values[0].izborOmjera;
                        x = vrijednosti[1].val() * omjer;
                        vrijednosti[0].val(x);
                        vrijednosti[0].next().val(x);
                    }
                    break;
                case vrijednosti[2].attr('id'): // KAD SE PROMIJENI DULJINA STRANICE
                case vrijednosti[3].attr('id'): // KAD SE PROMIJENI BROJ PODJELA
                case vrijednosti[4].attr('id'): // KAD SE PROMIJENI RAZMAK MEĐU LIKOVIMA
                    if (ključ[3].is(':checked')) {
                        values = dajRačunVrijednosti($(this).get(0).id);
                        if (!samoOblik) {
                            iscrtajGlavni(canvas, context, values);
                        }
                        else {
                            crtajOblik(canvas, context, values);
                        }
                        // tu se trebaju računati omjeri stranica, podjela i razmaka
                    } else {
                        values = dajRačunVrijednosti($(this).get(0).id);
                        if (!samoOblik) {
                            iscrtajGlavni(canvas, context, values);
                        }
                        else {
                            crtajOblik(canvas, context, values);
                        }
                    }

                    break;
                default:
                    console.log($(this).get(0).id);
            }
        });
    }

    $('#izborOmjera').on('change', function () {
        omjer = izbOm.val();
        if ($('#uspravniFormat').attr('checked') === 'checked')
            omjer = 1 / omjer;
        x = vrijednosti[0].val() / omjer;
        vrijednosti[1].val(x);
        vrijednosti[1].next().val(x);

        //console.log('Novi izbor omjera');
        values = dajRačunVrijednosti(false);
        iscrtajGlavni(canvas, context, values);
    });

    izbForm.on('click', function () {
        if ($(this).attr('checked') === 'checked')
            return;
        $(this).attr('checked', 'checked');
        $(this).prev().addClass('taj');
        if ($(this).attr('id') === 'polegnutiFormat') {
            $('#uspravniFormat').removeAttr('checked');
            $('#uspravniFormat').prev().removeClass('taj');
        } else {
            $('#polegnutiFormat').removeAttr('checked');
            $('#polegnutiFormat').prev().removeClass('taj');
        }

        x = vrijednosti[0].val();
        y = vrijednosti[1].val();
        vrijednosti[0].val(y);
        vrijednosti[0].next().val(y);
        vrijednosti[1].val(x);
        vrijednosti[1].next().val(x);

        //console.log(vrijednosti[5].val());

        $('#orijentacijaFormata').find('div').css('border-color', vrijednosti[5].val());
        $('#orijentacijaFormata').find('.taj div').css('color', vrijednosti[5].val());
        $('#orijentacijaFormata').find(':not(.taj) div').css('color', 'transparent');
    });

    for (i = 0; i < bojatori.length; i++) {
        bojatori[i].on('change', function () { // KAD SE PROMIJENI BOJA
            if (ključ[1].is(':checked')) {
                hex = String($(this).val()).replace(/[^0-9a-f]/gi, '');
                hex = dajKomplementarniHex(hex);
                if ($(this).get(0).id === 'strokeColor') {
                    bojatori[1].val(hex);
                } else {
                    bojatori[0].val(hex);
                }
            }
            obojiŠtoTreba(bojatori[1].val(), bojatori[0].val());
        });
    }

    $('input+label').not('#orijentacijaFormata label').on('click', function () {
        if ($(this).html() === '⚭' || $(this).html() === '&#9901') {
            $(this).html('⚯');
        }
        else {
            $(this).html('⚭');
        }
    });
    $('#spremiCanv').on('click', spremiStari);
    $('#dodajCanv').on('click', function () {
        //alert('ŠTOOO!?!?');
    });

    $(window).on('resize',
            function () {
                values = dajRačunVrijednosti(false);
                iscrtajGlavni(canvas, context, values);
            }
    );

    inputi.not('input[type=range], #izborOmjera, #duljinaStranice, #duljinatorStranice, #brojPodjela, #brojatorPodjela, #razmakPodjela, #razmakatorPodjela').on('change',
            function () {
                values = dajRačunVrijednosti(false);
                iscrtajGlavni(canvas, context, values);
            }
    );

    iscrtajKrasni();
    if (!samoOblik) {
        iscrtajGlavni(canvas, context, values);
    }
    else {
        crtajOblik(canvas, context, values);
    }

    kontrole.show();
    canvas.fadeIn(200);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*////////////////////////////////////////////////////////// R A Č U N ////////////////////////////////////////////////////////*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function upišiPostavke() {
    var posF = $('#postavkeFormata').find('input, select'), posR = $('#postavkeRešetke').find('input, select'), prostor = $('#canvasPaleta').width();

//    for (i = 0; i < posF.length; i++) {
//        console.log(i, posF.eq(i).attr('id'), posF.eq(i).val());
//    }
//    for (i = 0; i < posR.length; i++) {
//        console.log(i, posR.eq(i).attr('id'), posR.eq(i).val());
//    }
    var valF = {
        orijentacija: provjeriOrijentaciju(),
        width: prostor * Number(posF.eq(2).val() / 1000),
        // širinator je posF.eq(3)

        držiOmjer: posF.eq(4).is(':checked'),
        izborOmjera: Number(posF.eq(5).val()),
        height: prostor * Number(posF.eq(6).val() / 1000),
        // visinator je posF.eq(7)

        stroke: posF.eq(8).val(),
        držiKontrast: posF.eq(9).is(':checked'),
        fill: posF.eq(10).val(),
        ispuna: posF.eq(11).is(':checked')
    };

    if (!valF.orijentacija) {
        valF.izborOmjera = 1 / valF.izborOmjera;
    }

    var omjerEkrana = valF.width / Number(posF.eq(2).val());

    var valR = {
        tip: [posR.eq(0).val()],
        a: Number(posR.eq(1).val()) * omjerEkrana,
        // duljinator je posR.eq(2)

        snap: posR.eq(3).is(':checked'),
        brojPodjela: Number(posR.eq(4).val()),
        // brojatorPodjela je posR.eq(5)
        rPlus: Number(posR.eq(6).val()) * omjerEkrana
                // razmakator je posF.eq(7)
    };

    for (i in valR.tip) {
        valR.tip[i] = valR.tip[i].replace('rešetka', '');
    }


    //valR.a = a = dajProvjeriJelCijeli(posF.eq(0).val() / posR.eq(1).val(), valF.width, valR.snap);
    //posR.eq(4).val(valF.width / (valR.a + valR.rPlus));

    var sveVrijednosti = [valF, valR];

    return sveVrijednosti;
}
;

function dajRačunVrijednosti(podijeli) {

    var values = upišiPostavke(), račun = [];

    var tip = values[1].tip[0], š = values[0].width, v = values[0].height,
            a = values[1].a, d = values[1].rPlus, n = patternerenrettap[values[1].tip[0]].nterokuti[0],
            zig = patternerenrettap[values[1].tip[0]].zigi, ključ = $('#snapToInt').is(':checked'), sX, sY, šU, vU, bS, bR, dR = 0, dS = 0, n, R = 0, om = 1;


    račun = patternerenrettap[values[1].tip[0]].izmjere(n,a,d);
    šU = račun[0];
    vU = račun[1];
    sX = račun[2];
    sY = račun[3];
    bS = Math.round(š / šU);
    bR = Math.round(v / vU);


    // PORAVNAJ U OMJER
    if (ključ) {
        om = ((š + R) / bS) / šU;
        console.log('povećavam za:', om);
        a = a * om;
        d = d * om;

        račun = patternerenrettap[values[1].tip[0]].izmjere(n, a, d);
        šU = račun[0];
        vU = račun[1];
        sX = račun[2];
        sY = račun[3];
    }

    // ispiši broj podjela
    if (zig && tip !== 'cvijet') {
        $('#brojPodjela, #brojatorPodjela').val(2 * bS);
    } else {
        $('#brojPodjela, #brojatorPodjela').val(bS);
    }


    // dodaj potrebne retke i stupce
    dS = Math.ceil(((š - sX) / šU) - bS) + 1;
    dR = Math.ceil(((v - sY) / vU) - bR) + 1;
    if (tip === 'cvijet') bS++;
    if (tip === 'No14') bR++;
    if (!samoOblik)
        //console.log('S', bS, '+', dS, 'x R', bR, '+', dR);

    values[1].početniX = sX;
    values[1].početniY = sY;
    values[1].širinaUzorka = šU;
    values[1].visinaUzorka = vU;
    values[1].a = a;
    values[1].rPlus = d;
    values[1].brojPodjela = bS;
    values[1].brojStupaca = bS + dS;
    values[1].brojRedaka = bR + dR;
    values[1].zigZag = zig;
    values[1].omjer = 1; //om;

    return values;
}
;

function provjeriOrijentaciju() {
    return $('#polegnutiFormat').attr('checked') === 'checked';
}

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