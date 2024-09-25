export class ColorSpaceConverter {

    static rgbToHex(rgb) {
        var r,g,b;
        [r,g,b] = [rgb.r, rgb.g, rgb.b];
        var decToHex = this.decToHex;
        return "#" + decToHex(r) + decToHex(g) + decToHex(b);
    }
    
    static decToHex(num) {
        if (num < 0) {
            alert();
        }
        if (num == 0) {
            return "00";
        } else if (num < 11) {
            return "0" + num.toString(16);
        } else {
            return num.toString(16);
        }
    }




    static rgbToHsv(rgb) {
        var h,s,v,r,g,b;
        var c;
        [r,g,b] = rgb;

        v = Math.max(r, g, b);
        c = v - Math.min(r, g, b);

        if (c == 0) {
            h = 0;
        } else if (v == r) {
            h = 60 * ((g-b) / c);

        } else if (v == g) {
            h = 60 * (2 + (b-r) / c);

        } else if (v == b) {

            h = 60 * (4 + (r-g) / c);
        }

        s = (v == 0) ? 0: c/v;

        return [h,s,v];
    }

    static hsvToRgb(hsv) {
        var h,s,v;
        [h,s,v] = hsv;

        return [this.helper(h, s, v, 5),
            this.helper(h, s, v, 3),
            this.helper(h, s, v, 1)];
    }

    static helper(h, s, v, n) {
        var k = (n + (h/60)) % 6;
        return (v - (v * s * Math.max(0, Math.min(k, 4-k, 1))));
    }


}



console.log(ColorSpaceConverter.hsvToRgb([36, 0.78, 0.89]));
console.log(ColorSpaceConverter.rgbToHsv([0.89, 0.61, 0.19]));