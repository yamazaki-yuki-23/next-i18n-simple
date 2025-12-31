import nextJest from 'next/jest.js'

import type { Config } from 'jest'

const createJestConfig = nextJest({
  dir: './'
})

const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/(.*)$': '<rootDir>/$1'
  }
}

export default createJestConfig(config)
