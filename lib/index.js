'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var xs = _interopDefault(require('xstream'));

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

function serialize_(state) {
  return JSON.stringify(state);
}

function deserialize_(state) {
  try {
    return JSON.parse(state);
  } catch (ex) {
    return void 0;
  }
}

var key_ = 'appState';

function storageify(component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return storageify_(component, options);
}

function storageify_(component, _ref) {
  var _ref$key = _ref.key,
      key = _ref$key === undefined ? key_ : _ref$key,
      _ref$serialize = _ref.serialize,
      serialize = _ref$serialize === undefined ? serialize_ : _ref$serialize,
      _ref$deserialize = _ref.deserialize,
      deserialize = _ref$deserialize === undefined ? deserialize_ : _ref$deserialize;

  if (typeof component !== 'function') {
    throw new Error("storageify's first argument must be of type 'function'.");
  }

  if (typeof key !== 'string') {
    throw new Error("key option must be of type 'string'.");
  }

  if (typeof deserialize !== 'function') {
    throw new Error("deserialize option must be of type 'function'.");
  }

  if (typeof serialize !== 'function') {
    throw new Error("serialize option must be of type 'function'.");
  }

  return function _storageify(sources) {
    var componentSinks = component(sources);
    var componentReducer$ = componentSinks.onion;

    var reducer$ = sources.storage.local.getItem(key).take(1).map(deserialize).map(function (storedState) {
      return componentReducer$.startWith(function storedReducer(prevState) {
        return storedState || prevState;
      });
    }).flatten();

    var stateStorage$ = sources.onion.state$.map(serialize).map(function (state) {
      return { key: key, value: state };
    });

    var storage$ = componentSinks.storage ? xs.merge(stateStorage$, componentSinks.storage) : stateStorage$;

    var sinks = _extends({}, componentSinks, { onion: reducer$, storage: storage$ });

    return sinks;
  };
}

module.exports = storageify;
//# sourceMappingURL=index.js.map
