import * as chai from 'chai'
import * as _ from 'lodash'
import {
  a_Function_arrowNamed,
  a_Function_arrows_anonymous,
  a_Function_async_arrow_anonymous,
  a_Function_async_arrow_named,
  a_Function_async_normal_named,
  a_Function_Async_normalAnonymous,
  a_Function_normalAnonymous,
  a_Function_normalNamed,
  a_GeneratorFunction_anonymous,
  a_GeneratorFunction_async_anonymous,
  a_GeneratorFunction_async_named,
  a_GeneratorFunction_named,
  Employee,
  Person,
} from '../../../test-utils/test-data'
import { isRealFunction } from '../isRealFunction'

const { expect } = chai

describe('isRealFunction', () => {
  _.each(
    [
      // all true
      ['asyncNormalFunction', a_Function_async_normal_named, true],
      ['a_Function_Async_normalAnonymous', a_Function_Async_normalAnonymous, true],

      ['a_Function_async_arrow_named', a_Function_async_arrow_named, true],
      ['a_Function_async_arrow_anonymous', a_Function_async_arrow_anonymous, true],

      ['a_GeneratorFunction_async_named', a_GeneratorFunction_async_named, true],
      ['a_GeneratorFunction_async_anonymous', a_GeneratorFunction_async_anonymous, true],

      ['normalFunction', a_Function_normalNamed, true],
      ['a_Function_normalAnonymous', a_Function_normalAnonymous, true],

      ['arrowFunction', a_Function_arrowNamed, true],
      ['a_Function_arrows_anonymous', a_Function_arrows_anonymous, true],

      ['a_GeneratorFunction_named', a_GeneratorFunction_named, true],
      ['a_GeneratorFunction_anonymous', a_GeneratorFunction_anonymous, true],

      ['promise.resolve', Promise.resolve, true], // see https://stackoverflow.com/a/72326559/799502

      // false for classes
      ['class', class {}, false],
      ['class Person', Person, false],
      ['subclass Employee', Employee, false],

      // false for all other types
      ['object', {}, false],
      ['array', [], false],
      ['string', '', false],
      ['number', 1, false],
      ['boolean', true, false],
      ['date', new Date(), false],
      ['regexp', /a/, false],
      ['error', new Error(), false],
      ['map', new Map(), false],
      ['set', new Set(), false],
      ['weakmap', new WeakMap(), false],
      ['weakset', new WeakSet(), false],
      ['symbol', Symbol(), false],
      ['bigint', BigInt(1), false],
      ['arraybuffer', new ArrayBuffer(1), false],
      ['dataview', new DataView(new ArrayBuffer(1)), false],
      ['float32array', new Float32Array(), false],
      ['float64array', new Float64Array(), false],
      ['int8array', new Int8Array(), false],
      ['int16array', new Int16Array(), false],
      ['int32array', new Int32Array(), false],
      ['uint8array', new Uint8Array(), false],
      ['uint8clampedarray', new Uint8ClampedArray(), false],
      ['uint16array', new Uint16Array(), false],
      ['uint32array', new Uint32Array(), false],
      ['promise', Promise.resolve(), false],
    ],
    ([descr, value, expected]: [string, any, boolean]) =>
      it(`${descr}: for ${String(value)} returns ${expected}`, () => {
        expect(isRealFunction(value)).to.be.equal(expected)
      })
  )
})