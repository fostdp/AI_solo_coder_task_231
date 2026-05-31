const { TestEnvironment } = require('jest-environment-jsdom');
const { TextEncoder, TextDecoder } = require('util');

class CustomEnvironment extends TestEnvironment {
    constructor(config, context) {
        super(config, context);
        this.global.TextEncoder = TextEncoder;
        this.global.TextDecoder = TextDecoder;
        this.global.Uint8Array = Uint8Array;
        this.global.ArrayBuffer = ArrayBuffer;
    }
    
    async setup() {
        await super.setup();
        this.global.TextEncoder = TextEncoder;
        this.global.TextDecoder = TextDecoder;
    }
}

module.exports = CustomEnvironment;
