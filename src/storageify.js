import xs from 'xstream'

function _serialize (state) {
  return JSON.stringify(state)
}

function _deserialize (state) {
  try {
    return JSON.parse(state)
  } catch (ex) {
    return void 0
  }
}

const _key = 'appState'

export default function storageify (component, options = {}) {
  return _storageify(component, options)
}

function _storageify (
  component,
  { key = _key, serialize = _serialize, deserialize = _deserialize }
) {
  if (typeof component !== 'function') {
    throw new Error("storageify's first argument must be of type 'function'.")
  }

  if (typeof key !== 'string') {
    throw new Error("key option must be of type 'string'.")
  }

  if (typeof deserialize !== 'function') {
    throw new Error("deserialize option must be of type 'function'.")
  }

  if (typeof serialize !== 'function') {
    throw new Error("serialize option must be of type 'function'.")
  }

  return function _storageify (sources) {
    const componentSinks = component(sources)
    const componentReducer$ = componentSinks.onion

    const reducer$ = sources.storage.local
      .getItem(key)
      .take(1)
      .map(deserialize)
      .map(storedState =>
        componentReducer$.startWith(function storedReducer (prevState) {
          return storedState || prevState
        })
      )
      .flatten()

    const stateStorage$ = sources.onion.state$
      .map(serialize)
      .map(state => ({ key: key, value: state }))

    const storage$ = componentSinks.storage
      ? xs.merge(stateStorage$, componentSinks.storage)
      : stateStorage$

    const sinks = { ...componentSinks, onion: reducer$, storage: storage$ }

    return sinks
  }
}
