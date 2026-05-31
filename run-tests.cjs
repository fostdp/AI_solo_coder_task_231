const { spawn } = require('child_process');
const path = require('path');

const args = [
    '--experimental-vm-modules',
    'node_modules/jest/bin/jest.js',
    '--config',
    'jest.config.cjs'
];

const jestProcess = spawn(process.execPath, args, {
    cwd: __dirname,
    stdio: 'inherit',
    env: {
        ...process.env,
        NODE_OPTIONS: '--experimental-vm-modules'
    }
});

jestProcess.on('close', (code) => {
    process.exit(code);
});
