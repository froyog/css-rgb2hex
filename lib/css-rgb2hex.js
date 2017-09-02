'use babel';

import { CompositeDisposable } from 'atom';

export default {

    subscriptions: null,

    activate(state) {
        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
          'css-rgb2hex:toggle': () => this.convert()
        }));
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    shorter (hex) {
        if (hex[0] === hex[1] && hex[2] === hex[3] && hex[4] === hex[5]) {
            return hex[0] + hex[2] + hex[4];
        }
        return hex;
    },

    convert() {
        if (editor = atom.workspace.getActiveTextEditor()) {
            const selection = editor.getSelectedText();
            const rgbPattern = /rgb\((\d{1,3})\s{0,},\s{0,}(\d{1,3})\s{0,},\s{0,}(\d{1,3})\)/;

            if (!rgbPattern.test(selection)) return 'invaild input!';

            const rgbArr = rgbPattern.exec(selection).slice(1, 4);
            let hexString = [];
            for (let color of rgbArr) {
                const colorDec = +color;
                if (colorDec > 255 || colorDec < 0 || typeof colorDec !== 'number') {
                    return 'invaild color type!';
                }

                let colorHex = colorDec.toString(16);
                if (colorHex.length === 1) {
                    colorHex = '0' + colorHex;
                }
                hexString += colorHex;
            }
            hexString = this.shorter(hexString);
            hexString = '#' + hexString;
            editor.insertText(hexString);
        }
    }

};
