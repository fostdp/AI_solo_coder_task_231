module.exports = {
    testEnvironment: "./tests/custom-environment.cjs",
    moduleFileExtensions: ["js"],
    transform: {},
    testMatch: ["**/tests/**/*.test.js"],
    verbose: true,
    setupFilesAfterEnv: ["./tests/setup.cjs"]
};
