/* eslint-env mocha */
import chai, { expect } from 'chai'
import asserttype from 'chai-asserttype'
import xs from 'xstream'
import { adapt } from '@cycle/run/lib/adapt'
import storageify from '../lib'

chai.use(asserttype)

const appKey = 'appState'
const mockState = { mock: true }
const mockSerializedState = JSON.stringify(mockState)
const mockSources = {
  onion: { state$: adapt(xs.of(mockState)) },
  storage: {
    local: {
      getItem () {
        return adapt(xs.of(mockSerializedState))
      }
    }
  }
}

function mockApp (sources) {
  return { fake: xs.empty(), storage: xs.empty(), onion: xs.empty() }
}

function emptyApp (sources) {}

describe(`storageify()`, () => {
  it('should be a function', () => {
    expect(storageify).to.be.function()
  })

  it('should throw if not provided a component function to wrap', () => {
    expect(() => storageify()).to.throw(Error)
  })

  it('should throw if provided component to wrap is not a function', () => {
    expect(() => storageify('not a function')).to.throw(Error)
  })

  it('should throw if provided options.key is not a string', () => {
    expect(() => storageify(emptyApp, { key: {} })).to.throw(Error)
  })

  it('should throw if provided options.serialize is not a function', () => {
    expect(() =>
      storageify(emptyApp, { serialize: 'not a function' })
    ).to.throw(Error)
  })

  it('should throw if provided options.deserialize is not a function', () => {
    expect(() =>
      storageify(emptyApp, { deserialize: 'not a function' })
    ).to.throw(Error)
  })

  it('should not throw when called with valid component function and options object', () => {
    expect(() => storageify(emptyApp)).to.not.throw()
  })

  it('should return a function when called with valid component function and options object', () => {
    expect(storageify(emptyApp)).to.be.function()
  })

  it('should throw if not provided a sources object', () => {
    expect(() => storageify(emptyApp)()).to.throw(Error)
  })

  it('should throw if provided sources is not an object', () => {
    expect(() => storageify(emptyApp)('not an object')).to.throw(Error)
  })

  it('should throw if provided sources object has not all stream sources', () => {
    expect(() => storageify(emptyApp)({ FAKE: 'fake' })).to.throw(Error)
  })

  it('should throw if provided stream sources are not of correct type', () => {
    expect(() =>
      storageify(emptyApp)({ onion: 'fake', storage: 'fake' })
    ).to.throw(Error)
  })

  it('should throw if provided component to wrap returns sinks of incorrect type', () => {
    expect(() => storageify(emptyApp)(mockSources)).to.throw(Error)
  })

  it('should not throw when called with valid sources object', () => {
    expect(() => storageify(mockApp)(mockSources)).to.not.throw()
  })

  it('should return sinks object when called with a valid sources object', () => {
    expect(storageify(mockApp)(mockSources)).to.be.object()
  })

  it('should return not empty sinks object when called with a valid sources object', () => {
    expect(storageify(mockApp)(mockSources)).to.contain.all.keys([
      'onion',
      'storage'
    ])
  })

  it('should return not empty sinks object with all needed sink streams declared as properties when called with a valid sources object', () => {
    const sinks = storageify(mockApp)(mockSources)

    expect(sinks)
      .with.deep.nested.property('onion.addListener')
      .to.be.function()

    expect(sinks)
      .with.deep.nested.property('storage.addListener')
      .to.be.function()
  })

  it("should return not empty sinks object with all needed sink streams (including component's sinks) declared as properties when called with a valid sources object", () => {
    const sinks = storageify(mockApp)(mockSources)

    expect(sinks)
      .with.deep.nested.property('onion.addListener')
      .to.be.function()

    expect(sinks)
      .with.deep.nested.property('storage.addListener')
      .to.be.function()

    expect(sinks)
      .with.deep.nested.property('fake.addListener')
      .to.be.function()
  })

  it('should read the correct state', done => {
    const sinks = storageify(mockApp)(mockSources)

    sinks.onion.addListener({
      next: value => {
        expect(value).to.be.function()

        const state = value()

        expect(state).to.be.object()

        expect(state).to.have.property('mock', true)

        done()
      }
    })
  })

  it('should write the correct state', done => {
    const sinks = storageify(mockApp)(mockSources)

    sinks.storage.addListener({
      next: value => {
        expect(value).to.be.object()

        expect(value).to.have.property('key', appKey)

        expect(value).to.have.property('value', mockSerializedState)

        done()
      }
    })
  })
})
