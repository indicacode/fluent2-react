const nextJest = require("next/jest")

const createJestConfig = nextJest({
  dir: "./",
})

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testMatch: ["<rootDir>/app/tests/**/*.(test|spec).(ts|tsx)"],
  testPathIgnorePatterns: ["<rootDir>/old_project/", "<rootDir>/.next/"],
}

module.exports = createJestConfig(customJestConfig)
