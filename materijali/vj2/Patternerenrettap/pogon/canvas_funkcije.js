
function gridDesc() {
    var data = [];
    var i = 0;
    $('#opisRešetke').find('input, select').each(function () {
        
        if ((i % 2 === 0 && i !== 0 && i !== 4 && i !== 16 && i < 19) || i === 11) {
                data.push($(this).val());
         }
        
        i++;
    });
    data = data.join('/');
    return data;
};

function dodajCanvas(id) {
    var canvas = $('<canvas></canvas>');
    canvas.attr('id', id).data('grid', canvasDesc).html('<!--Kajgod, ali nema ' + id + ' Canvasa-->');
    if (id === 'krasniCanvas') {
        $('#fillColor').after(canvas);
    }
    else {
        $('#canvasPaleta').prepend(canvas);
    }
}
;
function spremiStari() {
    var spremnik = $('#spremnikPrikaza');
    var canvas = $('#glavniCanvas');
    var slika = canvas.get(0).toDataURL();
    spremnik.show();
    var stari = $('<img></img>')
            .attr('id', 'canvas' + proba)
            .attr('src', slika);
    var figure = $('<figure></figure>');
    figure.css({ 'width': '14.2%', 'height': ((spremnik.width() / 6) - 10) * 0.618, 'overflow': 'hidden', 'position': 'relative', 'background-color': fillColor, 'color': strokeColor })
    .data('grid', gridDesc());
    var potpis = $('<figcaption></figcaption>');
    potpis.css({ 'background-color': fillColor }).html(tipRešetke + ' ' + $('#širinaFormata').val() + ' x ' + $('#visinaFormata').val());
    figure.append(stari).append(potpis).on('click', učitajStari);
    spremnik.prepend(figure);
}
;
function učitajStari() {
    var data = $(this).data('grid').split('/');
    //console.log(data);

    if (Number(data[0]) > Number(data[1])) {
        $('polegnutiFormat').attr('checked', 'checked').prev().addClass('taj');;
        $('uspravniFormat').removeAttr('checked').prev().removeClass('taj');
    } else {
        $('uspravniFormat').attr('checked', 'checked').prev().addClass('taj');;
        $('polegnutiFormat').removeAttr('checked').prev().removeClass('taj');
    }
    $('#širinaFormata, #širinatorFormata').val(Number(data[0]));
    $('#visinaFormata, #visinatorFormata').val(Number(data[1]));
    $('#strokeColor').val(data[2]);
    $('#fillColor').val(data[3]);
    $('#doFill').val(data[4]);
    $('#odabirTipaRešetke').val(data[5]);
    $('#duljinaStranice, #duljinatorStranice').val(Number(data[6]));
    $('#razmakPodjela, #razmakatorPodjela').val(Number(data[7]));
    
    obojiŠtoTreba(data[3], data[2]);
    iscrtajGlavni($('#glavniCanvas'), $('#glavniCanvas').get(0).getContext('2d'), dajRačunVrijednosti(false));
};
//function dajProvjeriJelCijeli(x, w, jel) {
//    if (jel)
//        return w / (Math.round(x));
//    return x;
//}
//;

function colorPicker(source, context, output) {

    var canvas = source,
            context = context;

    canvas.on('click', function (e) {
        var canvasOffset = canvas.offset(),
                canvasX = Math.floor(e.pageX - canvasOffset.left),
                canvasY = Math.floor(e.pageY - canvasOffset.top);

        var imageData = context.getImageData(canvasX, canvasY, 1, 1),
                pixel = imageData.data,
                pixelColor = "rgba(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ", " + pixel[3] + ")",
                invertPixelColor = "rgb(" + (255 - pixel[0]) + ", " + (255 - pixel[1]) + ", " + (255 - pixel[2]) + ")";
        obojiŠtoTreba(pixelColor, invertPixelColor, output);
    });
}
;
function obojiŠtoTreba(fl, st, output) {
    var zaObojati = $('html, #kontrole, #kontrole input, #kontrole select, #kontrole button, #kontrole fieldset, #podnožje');
    zaObojati.css({ 'background-color': fl, 'color': st });
    if (output) { output.css({ 'background-color': fl, 'color': st }); } //else { console.log('ništo više', output); }
    zaObojati.find('fieldset, input, select, button').css('border-color', st);
    $('#glavniCanvas, #spremnikPrikaza figure').css('border-color', st);
    $('#spremnikPrikaza img').css('border-bottom-color', st);

    var logo = $('#logoCanvas').get(0).getContext('2d');
    logo.fillStyle = st;
    logo.fillRect(0, 0, 700, 100);

    $('#orijentacijaFormata').find('div').css('border-color', st);
    $('#orijentacijaFormata').find('.taj div').css('color', st);
    $('#orijentacijaFormata').find(':not(.taj) div').css('color', 'transparent');
    
    fillColor = fl, strokeColor = st;
    $('#fillColor').val(dajHex(fl));
    $('#strokeColor').val(dajHex(st));

    var vals = dajRačunVrijednosti(false), canv = $('#glavniCanvas'), cont = canv.get(0).getContext('2d');
    iscrtajGlavni(canv, cont, vals);
}

function randomColor() {
    r = parseInt(Math.random() * 255), g = parseInt(Math.random() * 255), b = parseInt(Math.random() * 255);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
;
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
;
function dajHex(rgb) {
    if (rgb.indexOf('#') > -1)
        return rgb;
    var hex;
    rgb = rgb.replace('rgb', '').replace('a', '').replace('(', '').replace(')', '');
    rgb = rgb.split(', ');
    hex = rgbToHex(Number(rgb[0]), Number(rgb[1]), Number(rgb[2]));
    return hex;
}
;
function dajKomplementarniHex(hex) {
    var x;
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    hex = [hex[0], hex[1], hex[2], hex[3], hex[4], hex[5]];
    for (i = 0; i < hex.length; i++) {
        x = hex[i];
        switch (x) {
            case 'a':
                x = 10;
                break;
            case 'b':
                x = 11;
                break;
            case 'c':
                x = 12;
                break;
            case 'd':
                x = 13;
                break;
            case 'e':
                x = 14;
                break;
            case 'f':
                x = 15;
                break;
        }

        if (Number(x) !== 'NaN') {
            x = 15 - Number(x);
        }
        else {
            alert('NEVALJA');
        }

        switch (x) {
            case 10:
                x = 'a';
                break;
            case 11:
                x = 'b';
                break;
            case 12:
                x = 'c';
                break;
            case 13:
                x = 'd';
                break;
            case 14:
                x = 'e';
                break;
            case 15:
                x = 'f';
                break;
        }
        hex[i] = x;
    }
    hex = hex.join('');
    return '#' + hex;
}
;

