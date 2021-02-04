module.exports = {

    lowercase: function(str) {
        if (str == null) return str;

        return String(str).toLowerCase();
    },

    uppercase: function(str) {
        if (str == null) return str;

        return String(str).toUpperCase();
    },

    camelize: function(str) {
        if (str == null) return str;

        return String(str)
            .trim()
            .replace(/(\-|_|\s)+(.)?/g, (a, b, c) => c ? c.toUpperCase() : '');
    },

    capitalize: function(str) {
        if (str == null) return str;

        str = String(str);

        return str.charAt(0).toUpperCase + str.substr(1);
    },

    dasherize: function(str) {
        if (str == null) return str;
        
        return String(str)
            .replace(/[_\s]+/g, '-')
            .replace(/([A-Z])/g, '-$1')
            .replace(/-+/g, '-')
            .toLowerCase();
    },

    humanize: function(str) {
        if (str == null) return str;

        str = String(str)
            .trim()
            .replace(/([a-z\D])([A-Z]+)/g, '$1_$2')
            .replace(/[-\s]+/g, '_')
            .toLowerCase()
            .replace(/_id$/, '')
            .replace(/_/g, ' ')
            .trim();

        return str.charAt(0).toUpperCase() + str.substr(1);
    },

    slugify: function(str) {
        if (str == null) return str;

        return String(str)
            .toLowerCase()
            .replace(/[^\w\s]/g, '')
            .replace(/[_\s]+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-/, '');
    },

    underscore: function(str) {
        if (str == null) return str;

        return String(str)
            .trim()
            .replace(/([a-z\d])([A-Z]+)/g, '$1_$2')
            .replace(/[-\s]+/g, '_')
            .toLowerCase();
    },

    titlecase: function(str) {
        if (str == null) return str;

        return String(str)
            .replace(/(?:^|\s)\S/g, a => a.toUpperCase());
    },

    camelcase: function(str) {
        if (str == null) return str;

        return String(str)
            .toLowerCase()
            .replace(/\s+(\S)/g, (a, b) => b.toUpperCase());
    },

    replace: function(str, search, value) {
        if (str == null) return str;

        if (typeof search == 'string') {
            search = new RegExp(search, 'g');
        }

        return String(str).replace(search, value);
    },

    trim: function(str) {
        if (str == null) return str;
        
        return String(str).trim();
    },

    split: function(str, separator) {
        if (str == null) return [];

        return String(str).split(separator);
    },

    pad: function(str, length, chr, pos) {
        if (str == null) return str;

        str = String(str);
        chr = chr && typeof chr == 'string' ? chr[0] : ' ';

        if (str.length < length) {
            let n = length - str.length;

            switch (pos) {
                case 'right':
                    str += chr.repeat(n);
                    break;

                case 'center':
                    str = chr.repeat(Math.floor(n / 2)) + str + chr.repeat(Math.ceil(n / 2));
                    break;

                default:
                    str = chr.repeat(n) + str;
            }
        }

        return str;
    },

    repeat: function(str, num) {
        if (str == null) return str;

        return String(str).repeat(num);
    },

    substr: function(str, start, length) {
        if (str == null) return str;

        return String(str).substr(start, length);
    },

    trunc: function(str, length, useWordBoundary, fragment) {
        if (str == null) return str;

        str = String(str);
        length = Number(length);
        fragment = fragment && typeof fragment == 'string' ? fragment : '\u2026';

        if (str.length > length) {
            str = str.substr(0, length - fragment.length);

            if (useWordBoundary && str.includes(' ')) {
                str = str.substr(0, str.lastIndexOf(' '));
            }

            str += fragment;
        }

        return str;
    },

    stripTags: function(str) {
        if (str == null) return str;

        return String(str).replace(/<[^>]+>/g, '');
    },

    wordCount: function(str) {
        if (str == null) return 0;

        return String(str)
            .replace(/\.\?!,/g, ' ')
            .trim()
            .split(/\s+/)
            .length;
    },

    length: function(str) {
        if (str == null) return 0;

        return String(str).length;
    },

    urlencode: function(str) {
        if (str == null) return str;

        return encodeURI(String(str));
    },

    urldecode: function(str) {
        if (str == null) return str;

        return decodeURI(String(str));
    },

};