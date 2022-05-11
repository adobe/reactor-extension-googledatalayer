/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

'use strict';

// jest.config.js
module.exports = {
  projects: [
    {
      displayName: 'test views',
      setupFilesAfterEnv: ['./src/view/jest.setup.js'],
      testEnvironment: 'jsdom',
      moduleNameMapper: {
        '\\.(css|styl)$': '<rootDir>/src/view/__tests_helpers__/styleMock.js'
      },
      modulePathIgnorePatterns: ['<rootDir>/src/lib/'],
      transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest'
      }
    },
    {
      displayName: 'test library modules',
      testEnvironment: 'node',
      modulePathIgnorePatterns: ['<rootDir>/src/view/']
    },
    {
      displayName: 'lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/src/**']
    }
  ],

  collectCoverageFrom: [
    './src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/__tests__/**'
  ],

  coverageReporters: ['lcov', 'text', 'html']
};
