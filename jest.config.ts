export default {
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  "moduleNameMapper":{
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
  },
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest", {
      "jsc": {
        "parser": {
          "tsx": true,
          "syntax": "typescript",
        },
        "transform": {
          "react": {
            "runtime": "automatic"
          }
        },
      },
    }],
  },
};
