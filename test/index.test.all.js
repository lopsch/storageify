/* eslint-env mocha */
import test from './index.test.common'
import storageifyESM from '../lib/index.esm'
import storageifyCJS from '../lib/index.cjs'
import storageifyUMD from '../lib/index.umd'

test('esm', storageifyESM)
test('cjs', storageifyCJS)
test('umd', storageifyUMD)
