var patternerenrettap = {

    matrica: {
        uzorak: function (c, a) { krug(c, a) },
        nterokuti: [0],
        zigi: false,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = vU = 2 * a + 2 * d;
            sX = sY = šU / 2;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    krug2x2: {
        uzorak: function (c, a) { krug(c, a) },
        nterokuti: [0],
        zigi: false,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = vU = a + d;
            sX = sY = -šU;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    uskoPakiranje: {
        uzorak: function (c, a) { krug(c, a) },
        nterokuti: [0],
        zigi: true,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = 2 * a + 2 * d;
            vU = a * Math.sqrt(3) + d;
            sX = -šU / 2;
            sY = -2 * vU + a;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    cvijet: {
        uzorak: function (c, a) { krug(c, a) },
        nterokuti: [0],
        zigi: true,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = a + d;
            vU = a * Math.sqrt(3) / 2 + d;
            sX = -šU;
            sY = -2 * vU + a;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No1: {
        uzorak: function (c, a, d) {
            c.save();
            mnogokut(c, 12, a);
            for (x = 0; x < 2; x++) {
                hodPoMnogokutu(c, 12, a, 1);
                mnogokutPoOpsegu(c, 3, a, d);
                hodPoMnogokutu(c, 12, a, 1);
            }

            c.restore();
        },
        nterokuti: [12, 3],
        zigi: true,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = 2 * (a / 2 + upisniRadius(n, a, d) + a * Math.sqrt(3) / 2 + d);
            vU = upisniRadius(n, a, d) + d;
            sX = a * Math.sin(alpha(n)) + a * Math.cos(alpha(n)) - šU / 2;
            sY = 0 - vU;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No2: {
        uzorak: function (c, a, d) {
            c.save();
            mnogokut(c, 12, a);
            for (x = 0; x < 2; x++) {
                mnogokutPoOpsegu(c, 4, a, d);
                hodPoMnogokutu(c, 12, a, 1);
                mnogokutPoOpsegu(c, 6, a, d);
                hodPoMnogokutu(c, 12, a, 1);
            }
            mnogokutPoOpsegu(c, 4, a, d);
            c.restore();
        },
        nterokuti: [12, 6, 4],
        zigi: true,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = 2 * (a / 2 + upisniRadius(n, a, d) + a * Math.sqrt(3)) + 4 * d; // d mi nije dobar, tj. mrvu se presporo širi
            vU = upisniRadius(n, a, d) + a / 2 + d;
            sX = a * Math.sin(alpha(n)) + a * Math.cos(alpha(n)) - šU / 2;
            sY = -vU;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No3: {
        uzorak: function (c, a, d) {
            c.save();
            mnogokut(c, 8, a);
            hodPoMnogokutu(c, 8, a, 1);
            mnogokutPoOpsegu(c, 4, a, d / Math.SQRT2);
            c.restore();
        },
        nterokuti: [8, 4],
        zigi: false,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = vU = 2 * upisniRadius(n, a, d) + d;
            sX = -(a + a * Math.SQRT2 / 2) - d;
            sY = -(a + a * Math.SQRT2) - d;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No4: {
        uzorak: function (c, a, d) {
            c.save();
            mnogokut(c, 6, a);
            c.restore();
        },
        nterokuti: [6],
        zigi: true,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = 3 * a + 3 * d;
            vU = a * Math.sqrt(3) / 2 + d;
            sX = -(šU - a - d) / 2;
            sY = -vU;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No5: {
        uzorak: function (c, a, d) {
            c.save();
            mnogokut(c, 12, a);
            for (x = 0; x < 2; x++) {
                mnogokutPoOpsegu(c, 4, a, d);
                hodPoMnogokutu(c, 12, a, 1);
                trokutniCvijet(c, a, d);
                hodPoMnogokutu(c, 12, a, 1);
            }
            mnogokutPoOpsegu(c, 4, a, d);
            c.restore();
        },
        nterokuti: [12, 4, 3],
        zigi: true,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = 2 * (a / 2 + upisniRadius(n, a, d) + a * Math.sqrt(3)) + 2 * Math.sqrt(3) * d;
            vU = upisniRadius(n, a, d) + a / 2 + d;
            sX = a * Math.sin(alpha(n)) + a * Math.cos(alpha(n)) - šU / 2;
            sY = -vU;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No5bis: {
        uzorak: function (c, a, d) {
            c.save();
            mnogokut(c, 12, a);
            hodPoMnogokutu(c, 12, a, 2);
            c.rotate(-gamma(3));
            c.translate(d / 2, d / 2);
            mnogokutPoOpsegu(c, 4, a, d);
            c.translate(0, -d);
            c.scale(1, -1);
            for (x = 0; x < 4; x++) {
                hodPoMnogokutu(c, 4, a, 1);
                mnogokutPoOpsegu(c, 3, a, d / 2);
            }
            c.restore();
        },
        nterokuti: [12, 4, 3],
        zigi: false,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = vU = 2 * upisniRadius(n, a, d) + d;
            sX = sY = 0;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No6: {
        uzorak: function (c, a, d) {
            c.save();
            mnogokut(c, 6, a);
            for (x = 0; x < 2; x++) {
                hodPoMnogokutu(c, 6, a, 1);
                mnogokutPoOpsegu(c, 3, a, d);
            }
            c.restore();
        },
        nterokuti: [6, 3],
        zigi: true,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = 2 * opisniRadius(n, a, d) + d * Math.sqrt(3);
            vU = 2 * upisniRadius(n, a, d) + d * Math.sqrt(2);
            sX = -(šU + a / 2) - d; // nije dobro
            sY = -2 * upisniRadius(n, a, d) - d; // nije dobro

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No6bis: {
        uzorak: function (c, a, d) {
            c.save();
            mnogokut(c, 6, a);
            for (x = 0; x < 2; x++) {
                hodPoMnogokutu(c, 6, a, 1);
                mnogokutPoOpsegu(c, 3, a, d);
            }
            c.restore();
        },
        nterokuti: [6, 3],
        zigi: false,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = 2 * opisniRadius(n, a, d) + d * Math.sqrt(3);
            vU = 2 * upisniRadius(n, a, d) + d * Math.sqrt(2);
            sX = -a * 3 / 2 - d; // nije dobro
            sY = -2 * upisniRadius(n, a, d) - d; // nije dobro

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No7: {
        uzorak: function (c, a, d) {
            c.save();
            mnogokut(c, 6, a);

            for (x = 0; x < 3; x++) {
                mnogokutPoOpsegu(c, 4, a, d);
                hodPoMnogokutu(c, 6, a, 1);
                c.save();
                c.rotate(-gamma(4));
                c.translate(d, d / 2);
                if (x !== 2) mnogokutPoOpsegu(c, 3, a, d);
                c.restore();
            }
            c.restore();
        },
        nterokuti: [6, 4, 3],
        zigi: true,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = 3 * a + a * Math.sqrt(3) + 2 * d + d * Math.sqrt(3); // nije idealno
            vU = (a + a * Math.sqrt(3)) / 2 + d;
            sX = -2 * opisniRadius(n, a, d) - a * Math.sqrt(3) / 2 - a / 2;
            sY = -a * Math.sqrt(3);

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No7bis: {
        uzorak: function (c, a, d) {
            c.save();

            c.rotate(deg(90));
            mnogokut(c, 6, a);
            for (x = 0; x < 6; x++) {
                mnogokutPoOpsegu(c, 4, a, d);
                if (x !== 3) {
                    c.save();
                    c.translate(0, -a);
                    mnogokutPoOpsegu(c, 4, a, 2 * d);
                    if (x > 3) {
                        c.translate(0, -a);
                        mnogokutPoOpsegu(c, 3, a, d * 28 / 10); // od oka
                    }
                    c.restore();
                }
                c.save();
                c.rotate(-gamma(4));
                c.translate(d, d / 2);
                mnogokutPoOpsegu(c, 3, a, d);
                if (x < 2 || x === 5) {
                    c.translate(a / 2, -a * Math.sqrt(3) / 2);
                    c.rotate(gamma(3));
                    c.translate(-d * Math.sqrt(3) / 2, 0);
                    mnogokutPoOpsegu(c, 6, a, d * Math.sqrt(3));
                    if (x === 0) {
                        c.save();
                        c.rotate(-alpha(6) / 2);

                        c.translate(0, -a);
                        c.rotate(-alpha(6) / 2); // od oka
                        c.translate(d * 59 / 40, -d * 11 / 5); // od oka
                        mnogokutPoOpsegu(c, 4, a, 0);
                        c.restore();
                    }

                }
                c.restore();
                hodPoMnogokutu(c, 6, a, 1);
            }

            c.restore();
        },
        nterokuti: [6, 4, 3],
        zigi: false,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = 3 * a + a * Math.sqrt(3) + 4 * d;  // od oka
            vU = 2 * a + 2 * a * Math.sqrt(3) + d * 29 / 6; // od oka
            sX = -a / 2;
            sY = -a;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No8: {
        uzorak: function (c, a, d) {
            c.save();
            mnogokut(c, 4, a);
            c.restore();
        },
        nterokuti: [4],
        zigi: false,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = vU = 2 * upisniRadius(n, a, d) + d;
            sX = sY = 0;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No9: {
        uzorak: function (c, a, d) {
            c.save();

            mnogokut(c, 4, a);

            for (x = 0; x < 2; x++) {
                hodPoMnogokutu(c, 4, a, 1);
                mnogokutPoOpsegu(c, 3, a, d);
                hodPoMnogokutu(c, 4, a, 1);
            }

            c.restore();
        },
        nterokuti: [4, 3],
        zigi: true,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = 2 * a + a * Math.sqrt(3) + 2 * d;
            vU = a / 2 + 2 * d;
            sX = -a - a * Math.sqrt(3) / 2 - d;
            sY = -a / 2;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No9bis: {
        uzorak: function (c, a, d) {
            c.save();

            c.rotate(-gamma(3) / 2);
            mnogokut(c, 3, a);
            mnogokutPoOpsegu(c, 4, a, d);
            hodPoMnogokutu(c, 3, a, 1);
            mnogokutPoOpsegu(c, 3, a, d);
            hodPoMnogokutu(c, 3, a, 1);
            mnogokutPoOpsegu(c, 4, a, d);
            c.scale(1, -1);
            hodPoMnogokutu(c, 4, a, 1);
            c.translate(d, 0);
            mnogokutPoOpsegu(c, 3, a, d);
            c.translate(-a / 2 - d / Math.sqrt(2), -a * Math.sqrt(3) / 2 - d * Math.sqrt(3));
            mnogokut(c, 3, a);

            c.restore();
        },
        nterokuti: [4, 3],
        zigi: true,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = 2 * (a / 2 + a * Math.sqrt(3) / 2 + 2 * d);
            vU = a / 2 + a * Math.sqrt(3) / 2 + 2 * d;
            sX = -šU / 2 - a * Math.sqrt(3) / 2 - d;
            sY = -a / 2 - a * Math.sqrt(3) / 2 - d;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No10: {
        uzorak: function (c, a, d) {
            c.save();
            for (zzz = 0; zzz < 5; zzz++) { // PETEROPONAVLJANJE CIJELOG REDA OD TRI
                if (zzz !== 0) c.translate(a / 2 + d / 4, a * 3 * Math.sqrt(3) / 2 + d / 2 + d * Math.sqrt(3) / 2);
                for (zz = 0; zz < 3; zz++) { // TROPONAVLJANJE GLAVNOGA LIKA
                    if (!(zzz === 4 && zz === 1)) {
                        c.save();
                        if (zz === 1) c.translate(a * 5 / 2 + d * 9 / 8, a * Math.sqrt(3) / 2 + d / 2);
                        if (zz === 2) c.translate(a * 9 / 2 + d * 21 / 10, -a * Math.sqrt(3) / 2 - d * Math.sqrt(3) / 4);
                        for (z = 0; z < 3; z++) { // GLAVNI LIK
                            mnogokut(c, 6, a);
                            // prvi trokut (krak davidove zvijezde)
                            mnogokutPoOpsegu(c, 3, a, d * Math.sqrt(3) / 3);
                            if (z !== 2) {
                                c.save();
                                // drugi trokut
                                c.translate(a + d * Math.sqrt(3) / 4, 0);
                                mnogokutPoOpsegu(c, 3, a, d * Math.sqrt(3) / 3);
                                // naopaki trokut
                                c.translate(-(a + d * Math.sqrt(3) / 4) / 2, -a * Math.sqrt(3) / 2 - d / 3 - d * Math.sqrt(3) / 2);
                                c.scale(1, -1);
                                mnogokutPoOpsegu(c, 3, a, d * Math.sqrt(3) / 4);
                                if (z === 1) {
                                    c.scale(1, -1);
                                    mnogokutPoOpsegu(c, 3, a, -d / 6); // špic
                                }
                                c.restore();
                                hodPoMnogokutu(c, 6, a, 1);
                            }
                        }
                        c.restore();
                    }
                }
            }
            c.restore();
        },
        nterokuti: [6, 3],
        zigi: false,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = 7 * a + d * 26 / 8;
            vU = 7 * a * Math.sqrt(3) + (d + d * Math.sqrt(3)) * 7 / 3;
            sX = -2 * a - d;
            sY = -a * Math.sqrt(3) / 2;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No11: {
        uzorak: function (c, a, d) {
            mnogokut(c, 3, a);
            mnogokutPoOpsegu(c, 3, a, d / 2);
        },
        nterokuti: [3],
        zigi: true,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = a + d;
            vU = a * Math.sqrt(3) / 2 + d * Math.sqrt(3) / 2;
            sX = -a - d;
            sY = -a * Math.sqrt(3) / 2 - d;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No12: {
        uzorak: function (c, a, d) {
            mnogokut(c, 12, a);
            for (x = 0; x < 6; x++) {
                if (x < 3) mnogokutPoOpsegu(c, 6, a, d * Math.sqrt(3));
                hodPoMnogokutu(c, 12, a, 1);
                mnogokutPoOpsegu(c, 4, a, d);
                if (x < 2) {
                    c.save();
                    c.scale(1, -1);
                    c.translate(0, a + d * 2);
                    mnogokut(c, 3, a);
                    c.restore();
                }
                hodPoMnogokutu(c, 12, a, 1);
            }
        },
        nterokuti: [12, 6, 4, 3],
        zigi: true,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = 2 * upisniRadius(12, a) + 4 * a + a * Math.sqrt(3) + 4 * d + d * Math.sqrt(3);
            vU = upisniRadius(12, a) + a * Math.sqrt(3) / 2 + d + d * Math.sqrt(3) / 2;
            sX = a * Math.sin(alpha(n)) + a * Math.cos(alpha(n)) - šU / 2;
            sY = -vU;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No13: {
        uzorak: function (c, a, d) {
            c.save();
            mnogokut(c, 6, a);
            for (x = 0; x < 6; x++) {
                mnogokutPoOpsegu(c, 4, a, d);

                if (x < 2) {
                    c.save();
                    c.translate(0, -a);
                    mnogokutPoOpsegu(c, 3, a, d * 2);
                    c.restore();
                }
                c.save();
                c.translate(a, 0);
                c.rotate(-gamma(3) * 3 / 2);
                c.rotate(deg(30));
                c.translate(d * 23 / 20, 0);
                c.rotate(-deg(30));
                mnogokut(c, 3, a);
                c.restore();
                hodPoMnogokutu(c, 6, a, 1);
            }
            c.restore();
        },
        nterokuti: [6, 4, 3],
        zigi: true,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = 2 * (a + a * Math.sqrt(3) / 2) + 2 * d * Math.sqrt(3);
            vU = a * 3 / 2 + a * Math.sqrt(3) + d * 5 / 4 + d * Math.sqrt(3);
            sX = -šU / 2 + a / 2 + a * Math.sqrt(3) / 2 + d;
            sY = -vU + a + d;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No13bis: {
        uzorak: function (c, a, d) {
            c.save();
            mnogokut(c, 6, a);
            for (x = 0; x < 6; x++) {
                mnogokutPoOpsegu(c, 4, a, d);
                c.save();
                c.translate(a, 0);
                c.rotate(-gamma(3) * 3 / 2);
                c.rotate(deg(30));
                c.translate(d * 23 / 20, 0);
                c.rotate(-deg(30));
                mnogokut(c, 3, a);

                if (x < 2) {
                    c.save();
                    c.translate(a, 0);
                    c.rotate(alpha(6) * 2);
                    mnogokutPoOpsegu(c, 3, a, d / 2);
                    c.restore();
                }
                c.restore();
                hodPoMnogokutu(c, 6, a, 1);
            }
            c.restore();
        },
        nterokuti: [6, 4, 3],
        zigi: true,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = 2 * upisniRadius(12, a, d) + opisniRadius(12, a, d) * Math.SQRT2 + 5 * d;
            vU = upisniRadius(12, a, d) + d * Math.sqrt(2);
            sX = a * Math.sin(alpha(n)) + a * Math.cos(alpha(n)) - šU / 2;
            sY = 0 - vU;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No13ter: {
        uzorak: function (c, a, d) {
            c.save();
            mnogokut(c, 6, a);
            for (x = 0; x < 6; x++) {
                if (x === 1) {
                    c.save();
                    c.rotate(-gamma(3));
                    c.scale(1, -1);
                    c.translate((a / 2 + d) * Math.sqrt(3), a / 2 + d * Math.sqrt(3));
                    mnogokut(c, 4, a, d);
                    for (xx = 0; xx < 4; xx++) {
                        hodPoMnogokutu(c, 4, a, 1);
                        mnogokutPoOpsegu(c, 3, a, d / 2);
                    }
                    c.restore();
                }
                mnogokutPoOpsegu(c, 4, a, d);
                c.save();
                c.translate(a, 0);
                c.rotate(-gamma(3) * 3 / 2);
                c.rotate(deg(30));
                c.translate(d * 23 / 20, 0);
                c.rotate(-deg(30));
                mnogokut(c, 3, a);
                c.restore();
                hodPoMnogokutu(c, 6, a, 1);
            }
            c.restore();
        },
        nterokuti: [6, 4, 3],
        zigi: false,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = vU = 2 * upisniRadius(12, a, d) + 2 * d * Math.sqrt(3);
            sX = -(šU + a) / 2 - d * 2 / 3;
            sY = a - vU + d;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No14: {
        uzorak: function (c, a, d) {
            c.save();
            c.rotate(gamma(3) / 2);
            trokutniCvijet(c, a, d);
            c.translate(0, -a * Math.sqrt(3) - d);
            for (x = 0; x < 6; x++) {
                mnogokutPoOpsegu(c, 4, a, d);

                c.save();
                c.translate(0, -a);
                mnogokutPoOpsegu(c, 4, a, d * 2);
                if (x < 2) {
                    c.translate(0, -a);
                    mnogokutPoOpsegu(c, 3, a, d * 3);
                }
                c.restore();

                c.save();
                c.translate(a, 0);
                c.rotate(-gamma(3) * 3 / 2);
                c.rotate(deg(30));
                c.translate(d * 23 / 20, 0);
                c.rotate(-deg(30));
                mnogokut(c, 3, a);
                hodPoMnogokutu(c, 3, a, 1);
                mnogokutPoOpsegu(c, 3, a, d);
                c.translate(a + d / Math.sqrt(3), -d * Math.sqrt(3) / 2); // moglo bi možda bolje
                c.rotate(-gamma(3) * 2);
                mnogokut(c, 3, a);
                c.rotate(gamma(3) * 2);
                c.translate(-a - 2 * d / Math.sqrt(3), 0); // moglo bi možda bolje
                c.rotate(-gamma(3) * 2);
                mnogokut(c, 3, a);
                c.rotate(gamma(3) * 2);
                c.restore();
                hodPoMnogokutu(c, 6, a, 1);
            }
            c.restore();
        },
        nterokuti: [3, 4],
        zigi: true,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = 2 * (2 * a + a * Math.sqrt(3) / 2 + upisniRadius(12, a, d)) + 2 * (3 * d + d * Math.sqrt(3));
            vU = a + a * Math.sqrt(3) + d + d * Math.sqrt(3);
            sX = -šU + 2 * a + d * 3 / 2;
            sY = -vU + a * Math.sqrt(3) / 4 + d / 6;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No14bis: {
        uzorak: function (c, a, d) {
            c.save();
            c.rotate(gamma(3) / 2);
            trokutniCvijet(c, a, d);
            c.translate(0, -a * Math.sqrt(3) - d);
            for (x = 0; x < 3; x++) {
                mnogokutPoOpsegu(c, 4, a, d);
                if (x < 2) {
                    c.save();
                    c.translate(a, 0);
                    c.rotate(-gamma(3) * 3 / 2);
                    c.rotate(deg(30));
                    c.translate(d * 23 / 20, 0);
                    c.rotate(-deg(30));

                    mnogokut(c, 3, a);
                    c.restore();
                }
                hodPoMnogokutu(c, 6, a, 1);
            }
            c.restore();
        },
        nterokuti: [3, 4],
        zigi: true,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = a * Math.sqrt(3) + a + d * 48 / 25;
            vU = a * Math.sqrt(3) / 2 + a * 3 / 2 + d * 9 / 5;
            sX = -šU + a;
            sY = -vU;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No14ter: {
        uzorak: function (c, a, d) {
            c.save();

            trokutniCvijet(c, a, d);
            c.translate(0, -a * Math.sqrt(3) - d);
            for (x = 0; x < 6; x++) {
                if (x !== 3) mnogokutPoOpsegu(c, 4, a, d);
                if (x === 1 || x === 2) {
                    c.save();
                    c.translate(0, -a - d * 3 / 2);
                    mnogokutPoOpsegu(c, 3, a);
                    c.restore();
                }
                if (x !== 2 && x !== 3) {
                    c.save();
                    c.translate(a, 0);
                    c.rotate(-gamma(3) * 3 / 2);
                    c.rotate(deg(30));
                    c.translate(d * 23 / 20, 0);
                    c.rotate(-deg(30));
                    mnogokut(c, 3, a);
                    c.restore();
                }
                hodPoMnogokutu(c, 6, a, 1);
            }

            c.restore();
        },
        nterokuti: [3, 4],
        zigi: false,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = 2 * upisniRadius(12, a, d) + d * 11 / 4;
            vU = 2 * upisniRadius(6, a, d) + a + d * 2;
            sX = -šU + (a + a * Math.sqrt(3)) / 2;
            sY = -vU;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No14quat: {
        uzorak: function (c, a, d) {
            c.save();

            mnogokut(c, 4, a);
            for (xx = 0; xx < 4; xx++) {
                if (xx === 0 || xx === 2) {
                    mnogokutPoOpsegu(c, 4, a, d);
                } else {
                    c.save();
                    if (xx === 1) {
                        c.translate(a, 0);
                        c.scale(-1, 1);
                    }
                    trokutniCvijet(c, a, d);
                    c.translate(0, -a * Math.sqrt(3) - d);
                    for (x = 0; x < 6; x++) {
                        if ((x < 2 && xx !== 1) || x === 1 || x === 5) mnogokutPoOpsegu(c, 4, a, d);
                        if (x === 2 || x === 4) mnogokutPoOpsegu(c, 3, a, d);
                        c.save();
                        c.translate(a, 0);
                        c.rotate(-gamma(3) * 3 / 2);
                        if (x === 1) {
                            c.rotate(deg(45));
                            c.translate(d * Math.SQRT2, 0);
                            c.rotate(-deg(45));
                        } else {
                            c.rotate(deg(30));
                            c.translate(d * 23 / 20, 0);
                            c.rotate(-deg(30));
                        }
                        if ((x === 5 && xx !== 1) || (x === 0 && xx !== 1)) mnogokut(c, 3, a);
                        if (x === 1) mnogokut(c, 4, a);
                        c.restore();
                        hodPoMnogokutu(c, 6, a, 1);
                    }
                    c.restore();
                }
                hodPoMnogokutu(c, 4, a, 1);
            }
            c.translate(0, -a - d);

            trokutniCvijet(c, a, d);
            c.translate(0, -a * Math.sqrt(3) - d);
            for (x = 0; x < 6; x++) {
                if (x === 1 || x === 5) mnogokutPoOpsegu(c, 4, a, d);
                if (x === 1 || x === 4) {
                    c.save();
                    c.translate(a, 0);
                    c.rotate(-gamma(3) * 3 / 2);
                    c.rotate(deg(30));
                    c.translate(d * 23 / 20, 0);
                    c.rotate(-deg(30));
                    mnogokut(c, 3, a);
                    if (x === 1) {
                        c.rotate(deg(120));
                        c.translate(-a / 2, -a * Math.sqrt(3) / 2);
                        trokutniCvijet(c, a, d);
                    }
                    c.restore();

                }
                hodPoMnogokutu(c, 6, a, 1);
            }

            c.restore();
        },
        nterokuti: [3, 4],
        zigi: false,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = 4 * upisniRadius(6, a, d) + 2 * a + d * 4 + d / 8;
            vU = 2 * upisniRadius(6, a, d) + 3 * a + d * 4 + d / 8;
            sX = -šU + (a + a * Math.sqrt(3) * 2) / 2;
            sY = -vU;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No15: {
        uzorak: function (c, a, d) {
            c.save();

            mnogokut(c, 12, a);
            for (x = 0; x < 6; x++) {
                if (x !== 3) mnogokutPoOpsegu(c, 4, a, d);
                // zvijezda na početku
                if (x === 1) {
                    c.save();
                    c.rotate(-gamma(3));
                    c.scale(1, -1);
                    c.translate(a * Math.sqrt(3) / 2 + d + d / 7, a / 2 + d);
                    mnogokut(c, 4, a, d);
                    for (xx = 0; xx < 4; xx++) {
                        hodPoMnogokutu(c, 4, a, 1);
                        mnogokutPoOpsegu(c, 3, a, d / 4);
                    }
                    c.restore();
                }
                hodPoMnogokutu(c, 12, a, 1);
                // trokutni polu cvijet
                c.save();
                c.translate(a / 2, -(a * Math.sqrt(3) / 2 + d * 8 / 7));
                c.rotate(gamma(3));
                for (latica = 0; latica < 6; latica++) {
                    if ((latica === 0) || (latica === 5 && x !== 2) || (latica === 1 && x !== 3)) {
                        c.save();
                        c.translate(d * Math.cos(gamma(3) / 2) / 4, d * Math.sin(gamma(3) / 2) / 4);
                        mnogokut(c, 3, a);
                        c.restore();
                    }
                    c.rotate(gamma(3));
                }
                c.restore();
                hodPoMnogokutu(c, 12, a, 1);
            }
            mnogokutPoOpsegu(c, 4, a, d);

            c.restore();
        },
        nterokuti: [12, 4, 3],
        zigi: false,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = 2 * upisniRadius(12, a, d) + a * Math.sqrt(3) + d * 2 + d / 4;
            vU = 2 * upisniRadius(12, a, d) + a + d * 2;
            sX = -šU + a / 2 + a * Math.sqrt(3) + d;
            sY = -vU + a + d;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    No16: {
        uzorak: function (c, a, d) {
            c.save();
            c.rotate(gamma(3) / 2);
            mnogokut(c, 12, a);
            for (x = 0; x < 6; x++) {
                mnogokutPoOpsegu(c, 4, a, d);
                if (x < 3) {
                    c.save();
                    c.translate(0, -a);
                    if (x < 2) mnogokutPoOpsegu(c, 3, a, d * 11.5 / 10);
                    c.restore();
                    hodPoMnogokutu(c, 12, a, 1);
                    trokutniCvijet(c, a, d);
                } else {
                    hodPoMnogokutu(c, 12, a, 1);
                }
                hodPoMnogokutu(c, 12, a, 1);
            }
            c.restore();
        },
        nterokuti: [12, 4, 3],
        zigi: true,
        izmjere: function (n, a, d) {
            var izmjere = [];

            šU = 2 * (2 * a + a * Math.sqrt(3) / 2 + upisniRadius(12, a, d)) + 2 * d + d * Math.sqrt(3);
            vU = a + a * Math.sqrt(3) + d;
            sX = -šU / 2 - a / 2 - a * Math.sqrt(3) / 2 - d / 2;
            sY = -2 * vU + a * Math.sqrt(3) / 2 - d / 2;

            izmjere = [šU, vU, sX, sY]; return izmjere;
        }
    }
,
    osnove: {
        krug: function (c, a) {
            c.save();
            c.beginPath();
            c.arc(0, 0, a, 0, Math.PI * 2, false);
            c.stroke();
            if (fill)
                c.fill();
            c.restore();
        }
    ,
        mnogokut: function (c, n, a) {
            var k = alpha(n);
            c.save();
            c.beginPath();
            for (i = 0; i < n; i++) {
                c.lineTo(a, 0);
                c.translate(a, 0);
                c.rotate(k);
            }
            c.closePath();
            c.stroke();
            if (fill) {
                c.fill();
            }
            c.restore();
        }
    ,
        hodPoMnogokutu: function (c, n, a, s) {
            var k = alpha(n);
            for (j = 0; j < s; j++) {
                c.translate(a, 0);
                c.rotate(k);
            }
        }
    ,
        mnogokutPoOpsegu: function (c, n, a, d) {
            var k = alpha(n);
            c.save();
            c.scale(1, -1);
            c.translate(0, d);
            c.beginPath();
            for (i = 0; i < n; i++) {
                c.lineTo(a, 0);
                c.translate(a, 0);
                c.rotate(k);
            }
            c.closePath();
            c.stroke();
            if (fill) {
                c.fill();
            }
            c.restore();
        }
    ,
        trokutniCvijet: function (c, a, d) {
            c.save();

            c.translate(a / 2, -(a * Math.sqrt(3) / 2 + d));
            c.rotate(gamma(3));

            for (latica = 0; latica < 6; latica++) {
                c.save();
                if (latica % 2 !== 0) c.scale(-1, -1);
                c.translate(d * Math.cos(gamma(3) / 2) / 4, d * Math.sin(gamma(3) / 2) / 4);
                mnogokut(c, 3, a);
                c.restore();
                if (latica % 2 !== 0) c.rotate(gamma(3));
            }

            c.restore();
        }
    ,
        točka: function (c, boja) {
            c.save();
            c.lineWidth = '2';
            c.strokeStyle = c.fillStyle = boja;
            c.beginPath();
            c.arc(0, 0, 5, 0, Math.PI * 2, false);
            c.closePath();
            c.fill();
            c.beginPath();
            c.moveTo(0, 0);
            c.lineTo(30, 0);
            c.closePath();
            c.stroke();
            c.beginPath();
            c.moveTo(0, 0);
            c.lineTo(0, 15);
            c.closePath();
            c.stroke();
            c.restore();
        }
    }
,
    račun: {

        opisniRadius: function (n, a, d) {
            kut = alpha(n) / 2;
            kut = a / (2 * Math.sin(kut));
            return kut;
        }
    ,
        upisniRadius: function (n, a, d) {
            kut = alpha(n) / 2;
            kut = a / (2 * Math.tan(kut));
            return kut;
        }
    ,
        alpha: function (n) {
            return Math.PI * 2 / n;
        }
    ,
        gamma: function (n) {
            return (n - 2) * Math.PI / n;
        }
    ,
        deg: function (k) {
            return k * Math.PI / 180; // 0.017453292519943295
        }
    ,
        rad: function (d) {
            return d / Math.PI * 180;
        }
    ,
        kutMnogokuta: function (n) {
            var k = ((n - 2) / n) * 180;
            return k;
        }

    }
}