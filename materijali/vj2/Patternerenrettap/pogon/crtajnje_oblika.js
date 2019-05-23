function crtajOblik(canvas, context, values) {
    var canv = canvas, c = context, valF = values[0], valR = values[1];
    canvasWidth = valF.width;
    canvasHeight = valF.height;
    //console.log('dimenzije:', canvasWidth, canvasHeight);
    canv.attr('width', canvasWidth).attr('height', 1.5 * canvasHeight);
    tipRešetke = valR.tip;
    c.save();
    c.strokeStyle = c.fillStyle = strokeColor;
    for (i in tipRešetke) {
        tip = tipRešetke[i];
        n = rešetka[tip];
        fillColor = valF.fill;
        strokeColor = valF.stroke;
        d = valR.rPlus;
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

        var crvena = '#a33', žuta = '#cb0', plava = '#08a';
        //d = 50;
        c.translate(10 * a, 20 * a);
        c.save();
        točka(c, plava);

        
        

        točka(c, crvena);

        c.restore();
    }
}
;