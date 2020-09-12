(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const dropdownTogglers = document.querySelectorAll(".dropdown-toggler");
const dropdowns = document.querySelectorAll(".dropdown");
const notificationsDeleteiconWrapper = document.querySelectorAll(".delete-icon-wrapper");
const notifications = document.querySelectorAll(".notification-list li");
const whispers = document.querySelectorAll(".whispers-list li");
const onlineStatusVisual = document.querySelectorAll(".online-status");
const onlineBtn = document.querySelector(".white-circle-online");
const OnlineStatusWord = document.querySelector(".online-offline");
const shareActivitySection = document.querySelector(".share-activity");
const shareActivityBtn = shareActivitySection.querySelector(".white-circle");
const navLeftLinks = document.querySelectorAll(".nav-left-link-wrapper");
const darkThemeBtn = document.querySelector(".dark-theme-btn");
const links = document.querySelectorAll("a");
let closeDropdownTimeout;

(function calcFlex() {
  navLeftLinks.forEach(cur => cur.style.flex = 1 + cur.offsetWidth/100);
})();

function closeOtherDropdowns(dropdown) {
  dropdownTogglers.forEach(cur => {
    cur === dropdown ? "": cur.nextElementSibling.classList.remove("show");
})}

function toggleDropdown() {
  closeOtherDropdowns(this);
  const dropdown = this.nextElementSibling;
  dropdown.classList.add("show");
  let dropdownRect = dropdown.getBoundingClientRect();
    closeDropdownTimeout = setTimeout(() => {
    document.addEventListener("click",closeDropdownIfClickedOutside)
  },0)
  function closeDropdownIfClickedOutside(e) {

      if((e.pageX <= dropdownRect.x || dropdownRect.right <= e.pageX)||(e.pageY <= dropdownRect.y || dropdownRect.bottom <= e.pageY)) {
      clearTimeout(closeDropdownTimeout);
      document.removeEventListener("click",closeDropdownIfClickedOutside);
      dropdown.classList.remove("show");}
  }
}
function closeDropdown(e) {
  if(e.target.classList.contains("close-icon")) {
    this.classList.remove("show");
  }
}
function changeNotifColor() {
    this.parentElement.parentElement.classList.add("hover1");
}
function returnNotifColor() {
  this.parentElement.parentElement.classList.remove("hover1");
}
function deleteNotif(e) {
  if(e.target.classList.contains("delete-icon")) {
    this.remove();
  }
}
function preventDefault(e) {
  e.preventDefault();
}
function moveCircle(circle) {
    circle.classList.toggle("move");
    circle.parentElement.classList.toggle("online");
}
function changeOnlinePresence() {
  onlineStatusVisual.forEach(cur => cur.classList.toggle("online"));
  shareActivitySection.classList.toggle("hidden");
  if(OnlineStatusWord.innerText === "Offline") {
    OnlineStatusWord.innerText = "Online"
  } else {
    OnlineStatusWord.innerText = "Offline"
  }
}
function updateOnlineStatus() {
  moveCircle(this);
  if(this.classList.contains("white-circle-online")) {
    changeOnlinePresence()
  }
}
function changeTheme() {
  moveCircle(this);
  document.querySelector(".theme").classList.toggle("on");
}

dropdownTogglers.forEach(toggler => toggler.addEventListener("click",toggleDropdown));
dropdowns.forEach(dropdown => dropdown.addEventListener("click", closeDropdown));

notifications.forEach(notification => notification.addEventListener("click",deleteNotif));
notificationsDeleteiconWrapper.forEach(cur => cur.addEventListener("mouseover",changeNotifColor));
notificationsDeleteiconWrapper.forEach(cur => cur.addEventListener("mouseout",returnNotifColor));

whispers.forEach(whisper => whisper.addEventListener("click",deleteNotif));

links.forEach(link => {
  link.addEventListener("click",preventDefault);
})

onlineBtn.addEventListener("click",updateOnlineStatus);
shareActivityBtn.addEventListener("click",updateOnlineStatus);
darkThemeBtn.addEventListener("click",changeTheme);

},{}],2:[function(require,module,exports){
var canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

module.exports = canUseDOM;
},{}],3:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

},{}],4:[function(require,module,exports){
'use strict';
var charAt = require('../internals/string-multibyte').charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};

},{"../internals/string-multibyte":57}],5:[function(require,module,exports){
var isObject = require('../internals/is-object');

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

},{"../internals/is-object":35}],6:[function(require,module,exports){
'use strict';
var $forEach = require('../internals/array-iteration').forEach;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;

},{"../internals/array-iteration":8,"../internals/array-method-is-strict":9,"../internals/array-method-uses-to-length":10}],7:[function(require,module,exports){
var toIndexedObject = require('../internals/to-indexed-object');
var toLength = require('../internals/to-length');
var toAbsoluteIndex = require('../internals/to-absolute-index');

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

},{"../internals/to-absolute-index":58,"../internals/to-indexed-object":59,"../internals/to-length":61}],8:[function(require,module,exports){
var bind = require('../internals/function-bind-context');
var IndexedObject = require('../internals/indexed-object');
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var arraySpeciesCreate = require('../internals/array-species-create');

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};

},{"../internals/array-species-create":12,"../internals/function-bind-context":24,"../internals/indexed-object":30,"../internals/to-length":61,"../internals/to-object":62}],9:[function(require,module,exports){
'use strict';
var fails = require('../internals/fails');

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

},{"../internals/fails":22}],10:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var has = require('../internals/has');

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};

},{"../internals/descriptors":17,"../internals/fails":22,"../internals/has":27}],11:[function(require,module,exports){
var aFunction = require('../internals/a-function');
var toObject = require('../internals/to-object');
var IndexedObject = require('../internals/indexed-object');
var toLength = require('../internals/to-length');

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};

},{"../internals/a-function":3,"../internals/indexed-object":30,"../internals/to-length":61,"../internals/to-object":62}],12:[function(require,module,exports){
var isObject = require('../internals/is-object');
var isArray = require('../internals/is-array');
var wellKnownSymbol = require('../internals/well-known-symbol');

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

},{"../internals/is-array":33,"../internals/is-object":35,"../internals/well-known-symbol":66}],13:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],14:[function(require,module,exports){
var has = require('../internals/has');
var ownKeys = require('../internals/own-keys');
var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor');
var definePropertyModule = require('../internals/object-define-property');

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

},{"../internals/has":27,"../internals/object-define-property":39,"../internals/object-get-own-property-descriptor":40,"../internals/own-keys":45}],15:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var definePropertyModule = require('../internals/object-define-property');
var createPropertyDescriptor = require('../internals/create-property-descriptor');

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"../internals/create-property-descriptor":16,"../internals/descriptors":17,"../internals/object-define-property":39}],16:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],17:[function(require,module,exports){
var fails = require('../internals/fails');

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

},{"../internals/fails":22}],18:[function(require,module,exports){
var global = require('../internals/global');
var isObject = require('../internals/is-object');

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

},{"../internals/global":26,"../internals/is-object":35}],19:[function(require,module,exports){
// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

},{}],20:[function(require,module,exports){
// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

},{}],21:[function(require,module,exports){
var global = require('../internals/global');
var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f;
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var redefine = require('../internals/redefine');
var setGlobal = require('../internals/set-global');
var copyConstructorProperties = require('../internals/copy-constructor-properties');
var isForced = require('../internals/is-forced');

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};

},{"../internals/copy-constructor-properties":14,"../internals/create-non-enumerable-property":15,"../internals/global":26,"../internals/is-forced":34,"../internals/object-get-own-property-descriptor":40,"../internals/redefine":47,"../internals/set-global":53}],22:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

},{}],23:[function(require,module,exports){
'use strict';
// TODO: Remove from `core-js@4` since it's moved to entry points
require('../modules/es.regexp.exec');
var redefine = require('../internals/redefine');
var fails = require('../internals/fails');
var wellKnownSymbol = require('../internals/well-known-symbol');
var regexpExec = require('../internals/regexp-exec');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};

},{"../internals/create-non-enumerable-property":15,"../internals/fails":22,"../internals/redefine":47,"../internals/regexp-exec":49,"../internals/well-known-symbol":66,"../modules/es.regexp.exec":70}],24:[function(require,module,exports){
var aFunction = require('../internals/a-function');

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"../internals/a-function":3}],25:[function(require,module,exports){
var path = require('../internals/path');
var global = require('../internals/global');

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};

},{"../internals/global":26,"../internals/path":46}],26:[function(require,module,exports){
(function (global){
var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],27:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],28:[function(require,module,exports){
module.exports = {};

},{}],29:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var fails = require('../internals/fails');
var createElement = require('../internals/document-create-element');

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

},{"../internals/descriptors":17,"../internals/document-create-element":18,"../internals/fails":22}],30:[function(require,module,exports){
var fails = require('../internals/fails');
var classof = require('../internals/classof-raw');

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

},{"../internals/classof-raw":13,"../internals/fails":22}],31:[function(require,module,exports){
var store = require('../internals/shared-store');

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;

},{"../internals/shared-store":55}],32:[function(require,module,exports){
var NATIVE_WEAK_MAP = require('../internals/native-weak-map');
var global = require('../internals/global');
var isObject = require('../internals/is-object');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var objectHas = require('../internals/has');
var sharedKey = require('../internals/shared-key');
var hiddenKeys = require('../internals/hidden-keys');

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

},{"../internals/create-non-enumerable-property":15,"../internals/global":26,"../internals/has":27,"../internals/hidden-keys":28,"../internals/is-object":35,"../internals/native-weak-map":38,"../internals/shared-key":54}],33:[function(require,module,exports){
var classof = require('../internals/classof-raw');

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};

},{"../internals/classof-raw":13}],34:[function(require,module,exports){
var fails = require('../internals/fails');

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;

},{"../internals/fails":22}],35:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],36:[function(require,module,exports){
module.exports = false;

},{}],37:[function(require,module,exports){
var fails = require('../internals/fails');

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

},{"../internals/fails":22}],38:[function(require,module,exports){
var global = require('../internals/global');
var inspectSource = require('../internals/inspect-source');

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

},{"../internals/global":26,"../internals/inspect-source":31}],39:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');
var anObject = require('../internals/an-object');
var toPrimitive = require('../internals/to-primitive');

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"../internals/an-object":5,"../internals/descriptors":17,"../internals/ie8-dom-define":29,"../internals/to-primitive":63}],40:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable');
var createPropertyDescriptor = require('../internals/create-property-descriptor');
var toIndexedObject = require('../internals/to-indexed-object');
var toPrimitive = require('../internals/to-primitive');
var has = require('../internals/has');
var IE8_DOM_DEFINE = require('../internals/ie8-dom-define');

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};

},{"../internals/create-property-descriptor":16,"../internals/descriptors":17,"../internals/has":27,"../internals/ie8-dom-define":29,"../internals/object-property-is-enumerable":44,"../internals/to-indexed-object":59,"../internals/to-primitive":63}],41:[function(require,module,exports){
var internalObjectKeys = require('../internals/object-keys-internal');
var enumBugKeys = require('../internals/enum-bug-keys');

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

},{"../internals/enum-bug-keys":20,"../internals/object-keys-internal":43}],42:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],43:[function(require,module,exports){
var has = require('../internals/has');
var toIndexedObject = require('../internals/to-indexed-object');
var indexOf = require('../internals/array-includes').indexOf;
var hiddenKeys = require('../internals/hidden-keys');

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

},{"../internals/array-includes":7,"../internals/has":27,"../internals/hidden-keys":28,"../internals/to-indexed-object":59}],44:[function(require,module,exports){
'use strict';
var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

},{}],45:[function(require,module,exports){
var getBuiltIn = require('../internals/get-built-in');
var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names');
var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols');
var anObject = require('../internals/an-object');

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

},{"../internals/an-object":5,"../internals/get-built-in":25,"../internals/object-get-own-property-names":41,"../internals/object-get-own-property-symbols":42}],46:[function(require,module,exports){
var global = require('../internals/global');

module.exports = global;

},{"../internals/global":26}],47:[function(require,module,exports){
var global = require('../internals/global');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');
var has = require('../internals/has');
var setGlobal = require('../internals/set-global');
var inspectSource = require('../internals/inspect-source');
var InternalStateModule = require('../internals/internal-state');

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});

},{"../internals/create-non-enumerable-property":15,"../internals/global":26,"../internals/has":27,"../internals/inspect-source":31,"../internals/internal-state":32,"../internals/set-global":53}],48:[function(require,module,exports){
var classof = require('./classof-raw');
var regexpExec = require('./regexp-exec');

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};


},{"./classof-raw":13,"./regexp-exec":49}],49:[function(require,module,exports){
'use strict';
var regexpFlags = require('./regexp-flags');
var stickyHelpers = require('./regexp-sticky-helpers');

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;

},{"./regexp-flags":50,"./regexp-sticky-helpers":51}],50:[function(require,module,exports){
'use strict';
var anObject = require('../internals/an-object');

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"../internals/an-object":5}],51:[function(require,module,exports){
'use strict';

var fails = require('./fails');

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

},{"./fails":22}],52:[function(require,module,exports){
// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

},{}],53:[function(require,module,exports){
var global = require('../internals/global');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};

},{"../internals/create-non-enumerable-property":15,"../internals/global":26}],54:[function(require,module,exports){
var shared = require('../internals/shared');
var uid = require('../internals/uid');

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

},{"../internals/shared":56,"../internals/uid":64}],55:[function(require,module,exports){
var global = require('../internals/global');
var setGlobal = require('../internals/set-global');

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;

},{"../internals/global":26,"../internals/set-global":53}],56:[function(require,module,exports){
var IS_PURE = require('../internals/is-pure');
var store = require('../internals/shared-store');

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.5',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});

},{"../internals/is-pure":36,"../internals/shared-store":55}],57:[function(require,module,exports){
var toInteger = require('../internals/to-integer');
var requireObjectCoercible = require('../internals/require-object-coercible');

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};

},{"../internals/require-object-coercible":52,"../internals/to-integer":60}],58:[function(require,module,exports){
var toInteger = require('../internals/to-integer');

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

},{"../internals/to-integer":60}],59:[function(require,module,exports){
// toObject with fallback for non-array-like ES3 strings
var IndexedObject = require('../internals/indexed-object');
var requireObjectCoercible = require('../internals/require-object-coercible');

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

},{"../internals/indexed-object":30,"../internals/require-object-coercible":52}],60:[function(require,module,exports){
var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

},{}],61:[function(require,module,exports){
var toInteger = require('../internals/to-integer');

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

},{"../internals/to-integer":60}],62:[function(require,module,exports){
var requireObjectCoercible = require('../internals/require-object-coercible');

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};

},{"../internals/require-object-coercible":52}],63:[function(require,module,exports){
var isObject = require('../internals/is-object');

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"../internals/is-object":35}],64:[function(require,module,exports){
var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

},{}],65:[function(require,module,exports){
var NATIVE_SYMBOL = require('../internals/native-symbol');

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';

},{"../internals/native-symbol":37}],66:[function(require,module,exports){
var global = require('../internals/global');
var shared = require('../internals/shared');
var has = require('../internals/has');
var uid = require('../internals/uid');
var NATIVE_SYMBOL = require('../internals/native-symbol');
var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid');

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

},{"../internals/global":26,"../internals/has":27,"../internals/native-symbol":37,"../internals/shared":56,"../internals/uid":64,"../internals/use-symbol-as-uid":65}],67:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var forEach = require('../internals/array-for-each');

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});

},{"../internals/array-for-each":6,"../internals/export":21}],68:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var $reduce = require('../internals/array-reduce').left;
var arrayMethodIsStrict = require('../internals/array-method-is-strict');
var arrayMethodUsesToLength = require('../internals/array-method-uses-to-length');

var STRICT_METHOD = arrayMethodIsStrict('reduce');
var USES_TO_LENGTH = arrayMethodUsesToLength('reduce', { 1: 0 });

// `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"../internals/array-method-is-strict":9,"../internals/array-method-uses-to-length":10,"../internals/array-reduce":11,"../internals/export":21}],69:[function(require,module,exports){
var DESCRIPTORS = require('../internals/descriptors');
var defineProperty = require('../internals/object-define-property').f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}

},{"../internals/descriptors":17,"../internals/object-define-property":39}],70:[function(require,module,exports){
'use strict';
var $ = require('../internals/export');
var exec = require('../internals/regexp-exec');

$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});

},{"../internals/export":21,"../internals/regexp-exec":49}],71:[function(require,module,exports){
'use strict';
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var anObject = require('../internals/an-object');
var toLength = require('../internals/to-length');
var requireObjectCoercible = require('../internals/require-object-coercible');
var advanceStringIndex = require('../internals/advance-string-index');
var regExpExec = require('../internals/regexp-exec-abstract');

// @@match logic
fixRegExpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative(nativeMatch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

},{"../internals/advance-string-index":4,"../internals/an-object":5,"../internals/fix-regexp-well-known-symbol-logic":23,"../internals/regexp-exec-abstract":48,"../internals/require-object-coercible":52,"../internals/to-length":61}],72:[function(require,module,exports){
'use strict';
var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic');
var anObject = require('../internals/an-object');
var toObject = require('../internals/to-object');
var toLength = require('../internals/to-length');
var toInteger = require('../internals/to-integer');
var requireObjectCoercible = require('../internals/require-object-coercible');
var advanceStringIndex = require('../internals/advance-string-index');
var regExpExec = require('../internals/regexp-exec-abstract');

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

},{"../internals/advance-string-index":4,"../internals/an-object":5,"../internals/fix-regexp-well-known-symbol-logic":23,"../internals/regexp-exec-abstract":48,"../internals/require-object-coercible":52,"../internals/to-integer":60,"../internals/to-length":61,"../internals/to-object":62}],73:[function(require,module,exports){
var global = require('../internals/global');
var DOMIterables = require('../internals/dom-iterables');
var forEach = require('../internals/array-for-each');
var createNonEnumerableProperty = require('../internals/create-non-enumerable-property');

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}

},{"../internals/array-for-each":6,"../internals/create-non-enumerable-property":15,"../internals/dom-iterables":19,"../internals/global":26}],74:[function(require,module,exports){
module.exports=["Amazing", "Awesome", "Blithesome", "Excellent", "Fabulous", "Fantastic", "Favorable", "Fortuitous", "Great", "Incredible", "Ineffable", "Mirthful", "Outstanding", "Perfect", "Propitious", "Remarkable", "Smart", "Spectacular", "Splendid", "Stellar", "Stupendous", "Super", "Ultimate", "Unbelievable", "Wondrous", "adaptable", "adventurous", "affable", "affectionate", "agreeable", "ambitious", "amiable", "amicable", "amusing", "brave", "bright", "broad-minded", "calm", "careful", "charming", "communicative", "compassionate", "conscientious", "considerate", "convivial", "courageous", "courteous", "creative", "decisive", "determined", "diligent", "diplomatic", "discreet", "dynamic", "easygoing", "emotional", "energetic", "enthusiastic", "exuberant", "fair-minded", "faithful", "fearless", "forceful", "frank", "friendly", "funny", "generous", "gentle", "good", "gregarious", "hard-working", "helpful", "honest", "humorous", "imaginative", "impartial", "independent", "intellectual", "intelligent", "intuitive", "inventive", "kind", "loving", "loyal", "modest", "neat", "nice", "optimistic", "passionate", "patient", "persistent ", "pioneering", "philosophical", "placid", "plucky", "polite", "powerful", "practical", "quick-witted", "quiet", "rational", "reliable", "reserved", "resourceful", "romantic", "sincere", "sociable", "straightforward", "sympathetic", "thoughtful", "tidy", "tough", "unassuming", "understanding", "versatile", "warmhearted", "willing", "witty"]

},{}],75:[function(require,module,exports){
'use strict';
var data = {
    names: require('./names.json'),
    adjectives: require('./adjectives.json')
  },
  seperator = '-';
module.exports.setNames = function (names) {
  data.names = names;
};
module.exports.setAdjectives = function (adjectives) {
  data.adjectives = adjectives;
};
module.exports.setSeperator = function (new_seperator) {
  seperator = new_seperator;
};

module.exports.generate = function () {
  var ran_a = Math.floor(Math.random() * data.names.length),
    ran_b = Math.floor(Math.random() * data.adjectives.length),
    ran_suffix = Math.floor(Math.random() * 100);
  return  data.adjectives[ran_b]+ seperator + data.names[ran_a] + seperator + ran_suffix;
};

},{"./adjectives.json":74,"./names.json":76}],76:[function(require,module,exports){
module.exports=["bounderby","honeythunder","rosa","barbara","sharp","berry","pott","squod","fladdock","barley","limpkins","norris","tiny","dombey","arabella","turveydrop","lambert","filer","morris","present","chopkins","leeford","strong","major","bobster","cleaver","borum","pugstyles","may","edmund","aunt","children","jenkins","chicken","tobias","dot","fanny","marion","scadder","whimple","biddy","trabb","pip","fagin","johnson","simon","phib","horatio","bradley","miss","simmonds","young","avenger","drood","priscilla","wegg","tupman","flintwinch","copperfield","alfred","snewkes","kenwigs","plornish","bart","single","jobling","smauker","charley","sydney","caroline","gills","bodgers","ann","harry","pawkins","shepherd","gazingi","beadwood","mortimer","drummle","richard","tungay","tomkins","defarge","weevle","slowboy","britain","rugg","bevan","childers","lady","fielding","clickett","parent","chestle","emily","gregsbury","donny","hannibal","tutor","soldier","sheriff","critic","artiste","agent","subaltern","estimator","director","realtor","ranchers","judge","traveler","sailor","brewer","chemist","undertaker","trainer","merchant","millwright","engineer","acrobat","robber","singer","auditor","cook","mortician","academic","buyer","astronomer","geologist","girlguide","accountant","technician","major","hunter","paramedic","teacher","pilot","writer","prisoner","author","senator","scientist","consultant","craftsman","farmer","magician","worshipper","trustee","capitalist","actuary","appraiser","player","horseman","advisor"]
},{}],77:[function(require,module,exports){
(function (global){
/**
 * SimpleBar.js - v6.0.0-beta.4
 * Scrollbars, simpler.
 * https://grsmto.github.io/simplebar/
 *
 * Made by Adrien Denat from a fork by Jonathan Nicol
 * Under MIT License
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("core-js/modules/es.array.for-each"),require("core-js/modules/web.dom-collections.for-each"),require("can-use-dom"),require("core-js/modules/es.array.reduce"),require("core-js/modules/es.function.name"),require("core-js/modules/es.regexp.exec"),require("core-js/modules/es.string.match"),require("core-js/modules/es.string.replace")):"function"==typeof define&&define.amd?define(["core-js/modules/es.array.for-each","core-js/modules/web.dom-collections.for-each","can-use-dom","core-js/modules/es.array.reduce","core-js/modules/es.function.name","core-js/modules/es.regexp.exec","core-js/modules/es.string.match","core-js/modules/es.string.replace"],e):(t=t||self).SimpleBar=e(null,null,t.canUseDOM)}(this,(function(t,e,s){"use strict";s=s&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s;var i="object"==typeof global&&global&&global.Object===Object&&global,r="object"==typeof self&&self&&self.Object===Object&&self,l=i||r||Function("return this")(),o=l.Symbol,a=Object.prototype,n=a.hasOwnProperty,c=a.toString,h=o?o.toStringTag:void 0;var d=Object.prototype.toString;var u=o?o.toStringTag:void 0;function p(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":u&&u in Object(t)?function(t){var e=n.call(t,h),s=t[h];try{t[h]=void 0;var i=!0}catch(t){}var r=c.call(t);return i&&(e?t[h]=s:delete t[h]),r}(t):function(t){return d.call(t)}(t)}function f(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}var v=/^\s+|\s+$/g,m=/^[-+]0x[0-9a-f]+$/i,g=/^0b[01]+$/i,b=/^0o[0-7]+$/i,y=parseInt;function x(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return null!=t&&"object"==typeof t}(t)&&"[object Symbol]"==p(t)}(t))return NaN;if(f(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=f(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(v,"");var s=g.test(t);return s||b.test(t)?y(t.slice(2),s?2:8):m.test(t)?NaN:+t}var E,O=l["__core-js_shared__"],w=(E=/[^.]+$/.exec(O&&O.keys&&O.keys.IE_PROTO||""))?"Symbol(src)_1."+E:"";var S=Function.prototype.toString;var A=/^\[object .+?Constructor\]$/,k=Function.prototype,L=Object.prototype,M=k.toString,_=L.hasOwnProperty,W=RegExp("^"+M.call(_).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function z(t){return!(!f(t)||(e=t,w&&w in e))&&(function(t){if(!f(t))return!1;var e=p(t);return"[object Function]"==e||"[object GeneratorFunction]"==e||"[object AsyncFunction]"==e||"[object Proxy]"==e}(t)?W:A).test(function(t){if(null!=t){try{return S.call(t)}catch(t){}try{return t+""}catch(t){}}return""}(t));var e}function N(t,e){var s=function(t,e){return null==t?void 0:t[e]}(t,e);return z(s)?s:void 0}var C=N(Object,"create");var j=Object.prototype.hasOwnProperty;var T=Object.prototype.hasOwnProperty;function R(t){var e=-1,s=null==t?0:t.length;for(this.clear();++e<s;){var i=t[e];this.set(i[0],i[1])}}function D(t,e){for(var s,i,r=t.length;r--;)if((s=t[r][0])===(i=e)||s!=s&&i!=i)return r;return-1}R.prototype.clear=function(){this.__data__=C?C(null):{},this.size=0},R.prototype.delete=function(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e},R.prototype.get=function(t){var e=this.__data__;if(C){var s=e[t];return"__lodash_hash_undefined__"===s?void 0:s}return j.call(e,t)?e[t]:void 0},R.prototype.has=function(t){var e=this.__data__;return C?void 0!==e[t]:T.call(e,t)},R.prototype.set=function(t,e){var s=this.__data__;return this.size+=this.has(t)?0:1,s[t]=C&&void 0===e?"__lodash_hash_undefined__":e,this};var $=Array.prototype.splice;function P(t){var e=-1,s=null==t?0:t.length;for(this.clear();++e<s;){var i=t[e];this.set(i[0],i[1])}}P.prototype.clear=function(){this.__data__=[],this.size=0},P.prototype.delete=function(t){var e=this.__data__,s=D(e,t);return!(s<0)&&(s==e.length-1?e.pop():$.call(e,s,1),--this.size,!0)},P.prototype.get=function(t){var e=this.__data__,s=D(e,t);return s<0?void 0:e[s][1]},P.prototype.has=function(t){return D(this.__data__,t)>-1},P.prototype.set=function(t,e){var s=this.__data__,i=D(s,t);return i<0?(++this.size,s.push([t,e])):s[i][1]=e,this};var q=N(l,"Map");function V(t,e){var s,i,r=t.__data__;return("string"==(i=typeof(s=e))||"number"==i||"symbol"==i||"boolean"==i?"__proto__"!==s:null===s)?r["string"==typeof e?"string":"hash"]:r.map}function B(t){var e=-1,s=null==t?0:t.length;for(this.clear();++e<s;){var i=t[e];this.set(i[0],i[1])}}B.prototype.clear=function(){this.size=0,this.__data__={hash:new R,map:new(q||P),string:new R}},B.prototype.delete=function(t){var e=V(this,t).delete(t);return this.size-=e?1:0,e},B.prototype.get=function(t){return V(this,t).get(t)},B.prototype.has=function(t){return V(this,t).has(t)},B.prototype.set=function(t,e){var s=V(this,t),i=s.size;return s.set(t,e),this.size+=s.size==i?0:1,this};function H(t,e){if("function"!=typeof t||null!=e&&"function"!=typeof e)throw new TypeError("Expected a function");var s=function(){var i=arguments,r=e?e.apply(this,i):i[0],l=s.cache;if(l.has(r))return l.get(r);var o=t.apply(this,i);return s.cache=l.set(r,o)||l,o};return s.cache=new(H.Cache||B),s}H.Cache=B;var F=function(){return l.Date.now()},X=Math.max,Y=Math.min;function I(t,e,s){var i,r,l,o,a,n,c=0,h=!1,d=!1,u=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function p(e){var s=i,l=r;return i=r=void 0,c=e,o=t.apply(l,s)}function v(t){return c=t,a=setTimeout(g,e),h?p(t):o}function m(t){var s=t-n;return void 0===n||s>=e||s<0||d&&t-c>=l}function g(){var t=F();if(m(t))return b(t);a=setTimeout(g,function(t){var s=e-(t-n);return d?Y(s,l-(t-c)):s}(t))}function b(t){return a=void 0,u&&i?p(t):(i=r=void 0,o)}function y(){var t=F(),s=m(t);if(i=arguments,r=this,n=t,s){if(void 0===a)return v(n);if(d)return clearTimeout(a),a=setTimeout(g,e),p(n)}return void 0===a&&(a=setTimeout(g,e)),o}return e=x(e)||0,f(s)&&(h=!!s.leading,l=(d="maxWait"in s)?X(x(s.maxWait)||0,e):l,u="trailing"in s?!!s.trailing:u),y.cancel=function(){void 0!==a&&clearTimeout(a),c=0,i=n=r=a=void 0},y.flush=function(){return void 0===a?o:b(F())},y}let U=null,Z=null;function G(){if(null===U){if("undefined"==typeof document)return U=0,U;const t=document.body,e=document.createElement("div");e.classList.add("simplebar-hide-scrollbar"),t.appendChild(e);const s=e.getBoundingClientRect().right;t.removeChild(e),U=s}return U}function J(t){return t&&t.ownerDocument&&t.ownerDocument.defaultView?t.ownerDocument.defaultView:window}function K(t){return t&&t.ownerDocument?t.ownerDocument:document}s&&window.addEventListener("resize",()=>{Z!==window.devicePixelRatio&&(Z=window.devicePixelRatio,U=null)});class Q{constructor(t,e={}){this.onScroll=()=>{const t=J(this.el);this.scrollXTicking||(t.requestAnimationFrame(this.scrollX),this.scrollXTicking=!0),this.scrollYTicking||(t.requestAnimationFrame(this.scrollY),this.scrollYTicking=!0),this.isScrolling||(this.isScrolling=!0,this.el.classList.add(this.classNames.scrolling)),this.onStopScrolling()},this.scrollX=()=>{this.axis.x.isOverflowing&&this.positionScrollbar("x"),this.scrollXTicking=!1},this.scrollY=()=>{this.axis.y.isOverflowing&&this.positionScrollbar("y"),this.scrollYTicking=!1},this.onStopScrolling=()=>{this.el.classList.remove(this.classNames.scrolling),this.isScrolling=!1},this.onMouseEnter=()=>{this.isMouseEntering||(this.el.classList.add(this.classNames.mouseEntered),this.isMouseEntering=!0),this.onMouseEntered()},this.onMouseEntered=()=>{this.el.classList.remove(this.classNames.mouseEntered),this.isMouseEntering=!1},this.onMouseMove=t=>{this.mouseX=t.clientX,this.mouseY=t.clientY,(this.axis.x.isOverflowing||this.axis.x.forceVisible)&&this.onMouseMoveForAxis("x"),(this.axis.y.isOverflowing||this.axis.y.forceVisible)&&this.onMouseMoveForAxis("y")},this.onMouseLeave=()=>{this.onMouseMove.cancel(),(this.axis.x.isOverflowing||this.axis.x.forceVisible)&&this.onMouseLeaveForAxis("x"),(this.axis.y.isOverflowing||this.axis.y.forceVisible)&&this.onMouseLeaveForAxis("y"),this.mouseX=-1,this.mouseY=-1},this.onWindowResize=()=>{this.scrollbarWidth=this.getScrollbarWidth(),this.hideNativeScrollbar()},this.onPointerEvent=t=>{let e,s;this.axis.x.track.rect=this.axis.x.track.el.getBoundingClientRect(),this.axis.y.track.rect=this.axis.y.track.el.getBoundingClientRect(),(this.axis.x.isOverflowing||this.axis.x.forceVisible)&&(e=this.isWithinBounds(this.axis.x.track.rect)),(this.axis.y.isOverflowing||this.axis.y.forceVisible)&&(s=this.isWithinBounds(this.axis.y.track.rect)),(e||s)&&(t.preventDefault(),t.stopPropagation(),"mousedown"===t.type&&(e&&(this.axis.x.scrollbar.rect=this.axis.x.scrollbar.el.getBoundingClientRect(),this.isWithinBounds(this.axis.x.scrollbar.rect)?this.onDragStart(t,"x"):this.onTrackClick(t,"x")),s&&(this.axis.y.scrollbar.rect=this.axis.y.scrollbar.el.getBoundingClientRect(),this.isWithinBounds(this.axis.y.scrollbar.rect)?this.onDragStart(t,"y"):this.onTrackClick(t,"y"))))},this.drag=t=>{let e;const s=this.axis[this.draggedAxis].track,i=s.rect[this.axis[this.draggedAxis].sizeAttr],r=this.axis[this.draggedAxis].scrollbar,l=this.contentWrapperEl[this.axis[this.draggedAxis].scrollSizeAttr],o=parseInt(this.elStyles[this.axis[this.draggedAxis].sizeAttr],10);t.preventDefault(),t.stopPropagation(),e="y"===this.draggedAxis?t.pageY:t.pageX;let a=(e-s.rect[this.axis[this.draggedAxis].offsetAttr]-this.axis[this.draggedAxis].dragOffset)/(i-r.size)*(l-o);"x"===this.draggedAxis&&(a=this.isRtl&&Q.getRtlHelpers().isScrollOriginAtZero?a-(i+r.size):a),this.contentWrapperEl[this.axis[this.draggedAxis].scrollOffsetAttr]=a},this.onEndDrag=t=>{const e=K(this.el),s=J(this.el);t.preventDefault(),t.stopPropagation(),this.el.classList.remove(this.classNames.dragging),e.removeEventListener("mousemove",this.drag,!0),e.removeEventListener("mouseup",this.onEndDrag,!0),this.removePreventClickId=s.setTimeout(()=>{e.removeEventListener("click",this.preventClick,!0),e.removeEventListener("dblclick",this.preventClick,!0),this.removePreventClickId=null})},this.preventClick=t=>{t.preventDefault(),t.stopPropagation()},this.el=t,this.minScrollbarWidth=20,this.stopScrollDelay=175,this.options={...Q.defaultOptions,...e},this.classNames={contentEl:"simplebar-content",contentWrapper:"simplebar-content-wrapper",offset:"simplebar-offset",mask:"simplebar-mask",wrapper:"simplebar-wrapper",placeholder:"simplebar-placeholder",scrollbar:"simplebar-scrollbar",track:"simplebar-track",heightAutoObserverWrapperEl:"simplebar-height-auto-observer-wrapper",heightAutoObserverEl:"simplebar-height-auto-observer",visible:"simplebar-visible",horizontal:"simplebar-horizontal",vertical:"simplebar-vertical",hover:"simplebar-hover",dragging:"simplebar-dragging",scrolling:"simplebar-scrolling",scrollable:"simplebar-scrollable",mouseEntered:"simplebar-mouse-entered",...this.options.classNames},this.axis={x:{scrollOffsetAttr:"scrollLeft",sizeAttr:"width",scrollSizeAttr:"scrollWidth",offsetSizeAttr:"offsetWidth",offsetAttr:"left",overflowAttr:"overflowX",dragOffset:0,isOverflowing:!0,isVisible:!1,forceVisible:!1,track:{},scrollbar:{}},y:{scrollOffsetAttr:"scrollTop",sizeAttr:"height",scrollSizeAttr:"scrollHeight",offsetSizeAttr:"offsetHeight",offsetAttr:"top",overflowAttr:"overflowY",dragOffset:0,isOverflowing:!0,isVisible:!1,forceVisible:!1,track:{},scrollbar:{}}},this.removePreventClickId=null,this.isScrolling=!1,this.isMouseEntering=!1,Q.instances.has(this.el)||(e.classNames&&console.warn("simplebar: classNames option is deprecated. Please override the styles with CSS instead."),e.autoHide&&console.warn("simplebar: autoHide option is deprecated. Please use CSS instead: '.simplebar-scrollbar::before { opacity: 0.5 };' for autoHide: false"),this.onMouseMove=function(t,e,s){var i=!0,r=!0;if("function"!=typeof t)throw new TypeError("Expected a function");return f(s)&&(i="leading"in s?!!s.leading:i,r="trailing"in s?!!s.trailing:r),I(t,e,{leading:i,maxWait:e,trailing:r})}(this.onMouseMove,64),this.onWindowResize=I(this.onWindowResize,64,{leading:!0}),this.onStopScrolling=I(this.onStopScrolling,this.stopScrollDelay),this.onMouseEntered=I(this.onMouseEntered,this.stopScrollDelay),Q.getRtlHelpers=H(Q.getRtlHelpers),this.init())}static getRtlHelpers(){const t=document.createElement("div");t.innerHTML='<div class="simplebar-dummy-scrollbar-size"><div></div></div>';const e=t.firstElementChild,s=e.firstElementChild;document.body.appendChild(e),e.scrollLeft=0;const i=Q.getOffset(e),r=Q.getOffset(s);e.scrollLeft=-999;const l=Q.getOffset(s);return{isScrollOriginAtZero:i.left!==r.left,isScrollingToNegative:r.left!==l.left}}static getOffset(t){const e=t.getBoundingClientRect(),s=K(t),i=J(t);return{top:e.top+(i.pageYOffset||s.documentElement.scrollTop),left:e.left+(i.pageXOffset||s.documentElement.scrollLeft)}}init(){Q.instances.set(this.el,this),s&&(this.initDOM(),this.scrollbarWidth=this.getScrollbarWidth(),this.recalculate(),this.initListeners())}initDOM(){if(Array.prototype.filter.call(this.el.children,t=>t.classList.contains(this.classNames.wrapper)).length)this.wrapperEl=this.el.querySelector("."+this.classNames.wrapper),this.contentWrapperEl=this.options.scrollableNode||this.el.querySelector("."+this.classNames.contentWrapper),this.contentEl=this.options.contentNode||this.el.querySelector("."+this.classNames.contentEl),this.offsetEl=this.el.querySelector("."+this.classNames.offset),this.maskEl=this.el.querySelector("."+this.classNames.mask),this.placeholderEl=this.findChild(this.wrapperEl,"."+this.classNames.placeholder),this.heightAutoObserverWrapperEl=this.el.querySelector("."+this.classNames.heightAutoObserverWrapperEl),this.heightAutoObserverEl=this.el.querySelector("."+this.classNames.heightAutoObserverEl),this.axis.x.track.el=this.findChild(this.el,`.${this.classNames.track}.${this.classNames.horizontal}`),this.axis.y.track.el=this.findChild(this.el,`.${this.classNames.track}.${this.classNames.vertical}`);else{for(this.wrapperEl=document.createElement("div"),this.contentWrapperEl=document.createElement("div"),this.offsetEl=document.createElement("div"),this.maskEl=document.createElement("div"),this.contentEl=document.createElement("div"),this.placeholderEl=document.createElement("div"),this.heightAutoObserverWrapperEl=document.createElement("div"),this.heightAutoObserverEl=document.createElement("div"),this.wrapperEl.classList.add(this.classNames.wrapper),this.contentWrapperEl.classList.add(this.classNames.contentWrapper),this.offsetEl.classList.add(this.classNames.offset),this.maskEl.classList.add(this.classNames.mask),this.contentEl.classList.add(this.classNames.contentEl),this.placeholderEl.classList.add(this.classNames.placeholder),this.heightAutoObserverWrapperEl.classList.add(this.classNames.heightAutoObserverWrapperEl),this.heightAutoObserverEl.classList.add(this.classNames.heightAutoObserverEl);this.el.firstChild;)this.contentEl.appendChild(this.el.firstChild);this.contentWrapperEl.appendChild(this.contentEl),this.offsetEl.appendChild(this.contentWrapperEl),this.maskEl.appendChild(this.offsetEl),this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl),this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl),this.wrapperEl.appendChild(this.maskEl),this.wrapperEl.appendChild(this.placeholderEl),this.el.appendChild(this.wrapperEl)}if(!this.axis.x.track.el||!this.axis.y.track.el){const t=document.createElement("div"),e=document.createElement("div");t.classList.add(this.classNames.track),e.classList.add(this.classNames.scrollbar),t.appendChild(e),this.axis.x.track.el=t.cloneNode(!0),this.axis.x.track.el.classList.add(this.classNames.horizontal),this.axis.y.track.el=t.cloneNode(!0),this.axis.y.track.el.classList.add(this.classNames.vertical),this.el.appendChild(this.axis.x.track.el),this.el.appendChild(this.axis.y.track.el)}this.axis.x.scrollbar.el=this.axis.x.track.el.querySelector("."+this.classNames.scrollbar),this.axis.y.scrollbar.el=this.axis.y.track.el.querySelector("."+this.classNames.scrollbar),this.options.autoHide||(this.axis.x.scrollbar.el.classList.add(this.classNames.visible),this.axis.y.scrollbar.el.classList.add(this.classNames.visible)),this.el.setAttribute("data-simplebar","init")}initListeners(){const t=J(this.el);if(this.el.addEventListener("mouseenter",this.onMouseEnter),["mousedown","click","dblclick"].forEach(t=>{this.el.addEventListener(t,this.onPointerEvent,!0)}),["touchstart","touchend","touchmove"].forEach(t=>{this.el.addEventListener(t,this.onPointerEvent,{capture:!0,passive:!0})}),this.el.addEventListener("mousemove",this.onMouseMove),this.el.addEventListener("mouseleave",this.onMouseLeave),this.contentWrapperEl.addEventListener("scroll",this.onScroll),t.addEventListener("resize",this.onWindowResize),window.ResizeObserver){let e=!1;const s=t.ResizeObserver||ResizeObserver;this.resizeObserver=new s(()=>{e&&t.requestAnimationFrame(()=>{this.recalculate()})}),this.resizeObserver.observe(this.el),this.resizeObserver.observe(this.contentEl),t.requestAnimationFrame(()=>{e=!0})}this.mutationObserver=new t.MutationObserver(()=>{t.requestAnimationFrame(()=>{this.recalculate()})}),this.mutationObserver.observe(this.contentEl,{childList:!0,subtree:!0,characterData:!0})}recalculate(){const t=J(this.el);this.elStyles=t.getComputedStyle(this.el),this.isRtl="rtl"===this.elStyles.direction;const e=this.contentEl.offsetWidth,s=this.heightAutoObserverEl.offsetHeight<=1,i=this.heightAutoObserverEl.offsetWidth<=1||e>0,r=this.contentWrapperEl.offsetWidth,l=this.elStyles.overflowX,o=this.elStyles.overflowY;this.contentEl.style.padding=`${this.elStyles.paddingTop} ${this.elStyles.paddingRight} ${this.elStyles.paddingBottom} ${this.elStyles.paddingLeft}`,this.wrapperEl.style.margin=`-${this.elStyles.paddingTop} -${this.elStyles.paddingRight} -${this.elStyles.paddingBottom} -${this.elStyles.paddingLeft}`;const a=this.contentEl.scrollHeight,n=this.contentEl.scrollWidth;this.contentWrapperEl.style.height=s?"auto":"100%",this.placeholderEl.style.width=i?(e||n)+"px":"auto",this.placeholderEl.style.height=a+"px";const c=this.contentWrapperEl.offsetHeight;this.axis.x.isOverflowing=0!==e&&n>e,this.axis.y.isOverflowing=a>c,this.axis.x.isOverflowing="hidden"!==l&&this.axis.x.isOverflowing,this.axis.y.isOverflowing="hidden"!==o&&this.axis.y.isOverflowing,this.axis.x.forceVisible="x"===this.options.forceVisible||!0===this.options.forceVisible,this.axis.y.forceVisible="y"===this.options.forceVisible||!0===this.options.forceVisible,this.hideNativeScrollbar();let h=this.axis.x.isOverflowing?this.scrollbarWidth:0,d=this.axis.y.isOverflowing?this.scrollbarWidth:0;this.axis.x.isOverflowing=this.axis.x.isOverflowing&&n>r-d,this.axis.y.isOverflowing=this.axis.y.isOverflowing&&a>c-h,this.axis.x.scrollbar.size=this.getScrollbarSize("x"),this.axis.y.scrollbar.size=this.getScrollbarSize("y"),this.axis.x.scrollbar.el.style.width=this.axis.x.scrollbar.size+"px",this.axis.y.scrollbar.el.style.height=this.axis.y.scrollbar.size+"px",this.positionScrollbar("x"),this.positionScrollbar("y"),this.toggleTrackVisibility("x"),this.toggleTrackVisibility("y")}getScrollbarSize(t="y"){if(!this.axis[t].isOverflowing)return 0;const e=this.contentEl[this.axis[t].scrollSizeAttr],s=this.axis[t].track.el[this.axis[t].offsetSizeAttr];let i,r=s/e;return i=Math.max(~~(r*s),this.options.scrollbarMinSize),this.options.scrollbarMaxSize&&(i=Math.min(i,this.options.scrollbarMaxSize)),i}positionScrollbar(t="y"){if(!this.axis[t].isOverflowing)return;const e=this.contentWrapperEl[this.axis[t].scrollSizeAttr],s=this.axis[t].track.el[this.axis[t].offsetSizeAttr],i=parseInt(this.elStyles[this.axis[t].sizeAttr],10),r=this.axis[t].scrollbar;let l=this.contentWrapperEl[this.axis[t].scrollOffsetAttr];l="x"===t&&this.isRtl&&Q.getRtlHelpers().isScrollOriginAtZero?-l:l;let o=l/(e-i),a=~~((s-r.size)*o);a="x"===t&&this.isRtl&&Q.getRtlHelpers().isScrollingToNegative?-a+(s-r.size):a,r.el.style.transform="x"===t?`translate3d(${a}px, 0, 0)`:`translate3d(0, ${a}px, 0)`}toggleTrackVisibility(t="y"){const e=this.axis[t].track.el,s=this.axis[t].scrollbar.el;this.axis[t].isOverflowing||this.axis[t].forceVisible?(e.style.visibility="visible",this.contentWrapperEl.style[this.axis[t].overflowAttr]="scroll",this.el.classList.add(`${this.classNames.scrollable}-${t}`)):(e.style.visibility="hidden",this.contentWrapperEl.style[this.axis[t].overflowAttr]="hidden",this.el.classList.remove(`${this.classNames.scrollable}-${t}`)),this.axis[t].isOverflowing?s.style.display="block":s.style.display="none"}hideNativeScrollbar(){this.offsetEl.style[this.isRtl?"left":"right"]=this.axis.y.isOverflowing||this.axis.y.forceVisible?`-${this.scrollbarWidth}px`:0,this.offsetEl.style.bottom=this.axis.x.isOverflowing||this.axis.x.forceVisible?`-${this.scrollbarWidth}px`:0}onMouseMoveForAxis(t="y"){this.axis[t].track.rect=this.axis[t].track.el.getBoundingClientRect(),this.axis[t].scrollbar.rect=this.axis[t].scrollbar.el.getBoundingClientRect();this.isWithinBounds(this.axis[t].scrollbar.rect)?this.axis[t].scrollbar.el.classList.add(this.classNames.hover):this.axis[t].scrollbar.el.classList.remove(this.classNames.hover),this.isWithinBounds(this.axis[t].track.rect)?this.axis[t].track.el.classList.add(this.classNames.hover):this.axis[t].track.el.classList.remove(this.classNames.hover)}onMouseLeaveForAxis(t="y"){this.axis[t].track.el.classList.remove(this.classNames.hover),this.axis[t].scrollbar.el.classList.remove(this.classNames.hover)}onDragStart(t,e="y"){const s=K(this.el),i=J(this.el),r=this.axis[e].scrollbar,l="y"===e?t.pageY:t.pageX;this.axis[e].dragOffset=l-r.rect[this.axis[e].offsetAttr],this.draggedAxis=e,this.el.classList.add(this.classNames.dragging),s.addEventListener("mousemove",this.drag,!0),s.addEventListener("mouseup",this.onEndDrag,!0),null===this.removePreventClickId?(s.addEventListener("click",this.preventClick,!0),s.addEventListener("dblclick",this.preventClick,!0)):(i.clearTimeout(this.removePreventClickId),this.removePreventClickId=null)}onTrackClick(t,e="y"){if(!this.options.clickOnTrack)return;const s=J(this.el);this.axis[e].scrollbar.rect=this.axis[e].scrollbar.el.getBoundingClientRect();const i=this.axis[e].scrollbar.rect[this.axis[e].offsetAttr],r=parseInt(this.elStyles[this.axis[e].sizeAttr],10);let l=this.contentWrapperEl[this.axis[e].scrollOffsetAttr];const o=("y"===e?this.mouseY-i:this.mouseX-i)<0?-1:1,a=-1===o?l-r:l+r,n=()=>{-1===o?l>a&&(l-=40):l<a&&(l+=40),this.contentWrapperEl[this.axis[e].scrollOffsetAttr]=l,s.requestAnimationFrame(n)};n()}getContentElement(){return this.contentEl}getScrollElement(){return this.contentWrapperEl}getScrollbarWidth(){try{return"none"===getComputedStyle(this.contentWrapperEl,"::-webkit-scrollbar").display||"scrollbarWidth"in document.documentElement.style||"-ms-overflow-style"in document.documentElement.style?0:G()}catch(t){return G()}}removeListeners(){const t=J(this.el);this.el.removeEventListener("mouseenter",this.onMouseEnter),["mousedown","click","dblclick"].forEach(t=>{this.el.removeEventListener(t,this.onPointerEvent,!0)}),["touchstart","touchend","touchmove"].forEach(t=>{this.el.removeEventListener(t,this.onPointerEvent,{capture:!0,passive:!0})}),this.el.removeEventListener("mousemove",this.onMouseMove),this.el.removeEventListener("mouseleave",this.onMouseLeave),this.contentWrapperEl.removeEventListener("scroll",this.onScroll),t.removeEventListener("resize",this.onWindowResize),this.mutationObserver.disconnect(),this.resizeObserver&&this.resizeObserver.disconnect(),this.onMouseMove.cancel(),this.onWindowResize.cancel(),this.onStopScrolling.cancel(),this.onMouseEntered.cancel()}unMount(){this.removeListeners(),Q.instances.delete(this.el)}isWithinBounds(t){return this.mouseX>=t.left&&this.mouseX<=t.left+t.width&&this.mouseY>=t.top&&this.mouseY<=t.top+t.height}findChild(t,e){const s=t.matches||t.webkitMatchesSelector||t.mozMatchesSelector||t.msMatchesSelector;return Array.prototype.filter.call(t.children,t=>s.call(t,e))[0]}}Q.defaultOptions={autoHide:!0,forceVisible:!1,clickOnTrack:!0,scrollbarMinSize:25,scrollbarMaxSize:0},Q.instances=new WeakMap;var tt=function(t){return Array.prototype.reduce.call(t,(function(t,e){var s=e.name.match(/data-simplebar-(.+)/);if(s){var i=s[1].replace(/\W+(.)/g,(function(t,e){return e.toUpperCase()}));switch(e.value){case"true":t[i]=!0;break;case"false":t[i]=!1;break;case void 0:t[i]=!0;break;default:t[i]=e.value}}return t}),{})};return Q.initDOMLoadedElements=function(){document.removeEventListener("DOMContentLoaded",this.initDOMLoadedElements),window.removeEventListener("load",this.initDOMLoadedElements),Array.prototype.forEach.call(document.querySelectorAll("[data-simplebar]"),(function(t){"init"===t.getAttribute("data-simplebar")||Q.instances.has(t)||new Q(t,tt(t.attributes))}))},Q.removeObserver=function(){this.globalObserver.disconnect()},Q.initHtmlApi=function(){this.initDOMLoadedElements=this.initDOMLoadedElements.bind(this),"undefined"!=typeof MutationObserver&&(this.globalObserver=new MutationObserver(Q.handleMutations),this.globalObserver.observe(document,{childList:!0,subtree:!0})),"complete"===document.readyState||"loading"!==document.readyState&&!document.documentElement.doScroll?window.setTimeout(this.initDOMLoadedElements):(document.addEventListener("DOMContentLoaded",this.initDOMLoadedElements),window.addEventListener("load",this.initDOMLoadedElements))},Q.handleMutations=function(t){t.forEach((function(t){Array.prototype.forEach.call(t.addedNodes,(function(t){1===t.nodeType&&(t.hasAttribute("data-simplebar")?!Q.instances.has(t)&&new Q(t,tt(t.attributes)):Array.prototype.forEach.call(t.querySelectorAll("[data-simplebar]"),(function(t){"init"===t.getAttribute("data-simplebar")||Q.instances.has(t)||new Q(t,tt(t.attributes))})))})),Array.prototype.forEach.call(t.removedNodes,(function(t){1===t.nodeType&&(t.hasAttribute("data-simplebar")?Q.instances.has(t)&&Q.instances.get(t).unMount():Array.prototype.forEach.call(t.querySelectorAll('[data-simplebar="init"]'),(function(t){Q.instances.has(t)&&Q.instances.get(t).unMount()})))}))}))},Q.getOptions=tt,Q.default=Q,s&&Q.initHtmlApi(),Q}));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"can-use-dom":2,"core-js/modules/es.array.for-each":67,"core-js/modules/es.array.reduce":68,"core-js/modules/es.function.name":69,"core-js/modules/es.regexp.exec":70,"core-js/modules/es.string.match":71,"core-js/modules/es.string.replace":72,"core-js/modules/web.dom-collections.for-each":73}],78:[function(require,module,exports){
require("simplebar");

},{"simplebar":77}],79:[function(require,module,exports){
const followedChannelsList = document.querySelector(".followed-channels-list");
const showMoreBtn = document.querySelector(".show-more");
const showLessBtn = document.querySelector(".show-less");
let followedCollapseBtn = document.querySelector(".collapse-btn");
const followedChannelsBtnContainer = document.querySelector(".follower-ion-container");
let hiddenFollowedChnArr;
let totalHiddenChannels;
let hiddenFollowedChannels = 0;
let shownFollowedChannels = 0;

function arrangeFollowedChannels() {
  const onlineChannels = document.querySelectorAll(".followed-channels-list .online");

  let onlineChannelsSorted = Array.from(onlineChannels).sort(function(a,b) {
    return b.dataset.viewercount - a.dataset.viewercount;
  })

  onlineChannelsSorted.forEach((cur,index) => cur.style.order = index);
}
function formatNumber() {
  let number = Math.floor(Math.random() * 100000);
  let formatedNumber;
  if (number <= 999) {
    formatedNumber = number;
  } else if (number > 1000) {
    formatedNumber = number/1000;
    formatedNumber = Math.round(formatedNumber * 10)/10;
    formatedNumber = `${formatedNumber}k`
  }
  return [formatedNumber,number];
}
(function generateFollowerList() {
  let rug = require("random-username-generator");
  rug.setSeperator("");

  let totalFollowedChannels = Math.floor(Math.random() * 30 + 8);
  let numOnlineChannels = Math.floor(Math.random() * 4 + 6);
  let followedChannelsArr = [];

  let categories = ["arts","league of legends", "vainglory", "call of duty", "Ark", "Heroes of Newerth", "Fall Guys", "Among us", "Just Chatting", "PUBG MOBILE", "Fortnite", "Valorant"];

  for(let i = 0; i <= totalFollowedChannels; i++) {
    let userName = rug.generate();

    let html;
    let [viewerCountFormatted,viewerCount] = formatNumber();
    if(i <= numOnlineChannels) {
      html = `<li class="online" data-viewercount="${viewerCount}">
        <div class="avatar">
          <ion-icon class="person-icon" name="person-outline"></ion-icon>
        </div>
          <div class="wrapper collapsable">
          <div class="container streamer-info">
            <div>
              <p class="streamer-name">${userName}</p>
              <span class="category">${categories[Math.floor(Math.random() * categories.length)]}</span>
            </div>
          </div>

          <div class="container container-viewership">
            <div class="status">
              <div class="red-dot"></div>
              <span class="viewer-count">${viewerCountFormatted}</span>
            </div>
          </div>
          </div>
      </li>`
    } else if (i < 11) {
      html = `<li class="offline">
        <div class="avatar">
          <ion-icon class="person-icon" name="person-outline"></ion-icon>
      </div>
        <div class="wrapper collapsable">
        <div class="container streamer-info">
          <div>
            <p class="streamer-name">${userName}</p>
            <span class="invisible-game"></span>
          </div>
        </div>
        <div class="container container-viewership">
          <div class="status">
            <span>Offline</span>
          </div>
        </div>
        </div>
    </li>`
  } else {
    html = `<li class="offline hide">
      <div class="avatar">
        <ion-icon class="person-icon" name="person-outline"></ion-icon>
    </div>
      <div class="wrapper collapsable">
      <div class="container streamer-info">
        <div>
          <p class="streamer-name">${userName}</p>
          <span class="invisible-game"></span>
        </div>
      </div>
      <div class="container container-viewership">
        <div class="status">
          <span>Offline</span>
        </div>
      </div>
      </div>
  </li>`
    }
    followedChannelsArr.push(html);
  }
  function displayShowMoreButton() {
    if(totalFollowedChannels > 11) {
      showMoreBtn.classList.remove("invis");
    }
  }
  followedChannelsList.innerHTML = followedChannelsArr.join("");
  arrangeFollowedChannels();
  hiddenFollowedChnArr = Array.from(document.querySelectorAll("li.offline.hide"));
  totalHiddenChannels = hiddenFollowedChnArr.length;
  hiddenFollowedChannels = totalHiddenChannels;
  displayShowMoreButton();
})();

function updateFollowedChannelsData(type,amount) {
  if(type === "inc") {
    hiddenFollowedChannels-= amount;
    shownFollowedChannels+= amount;
  } else {
    hiddenFollowedChannels+= amount;
    shownFollowedChannels-= amount;
  }
}

function showMoreChannels() {
  if (hiddenFollowedChannels > 3) {
    for(let i = shownFollowedChannels; i < shownFollowedChannels + 3; i++) {
      hiddenFollowedChnArr[i].classList.remove("hide");
    }
    updateFollowedChannelsData("inc",3);
    showLessBtn.classList.remove("invis");
  } else {
    for(let i = shownFollowedChannels; i < totalHiddenChannels; i++) {
      hiddenFollowedChnArr[i].classList.remove("hide");
    }
    updateFollowedChannelsData("inc",totalHiddenChannels - shownFollowedChannels);
    showMoreBtn.classList.add("invis");
    showLessBtn.classList.remove("invis");
  }
}
function showLessChannels() {
  if(shownFollowedChannels > 3) {
    for (let i = shownFollowedChannels - 1 ; i > shownFollowedChannels -4; i--) {
      hiddenFollowedChnArr[i].classList.add("hide");
    }
      updateFollowedChannelsData("dec",3);
      showMoreBtn.classList.remove("invis");
  } else {
    for (let i = shownFollowedChannels; i > 0; i--) {
      hiddenFollowedChnArr[i].classList.add("hide");
    }
    updateFollowedChannelsData("dec", shownFollowedChannels - 0);
    showLessBtn.classList.add("invis");
    showMoreBtn.classList.remove("invis");
  }
}
function collapseSideBar() {
  document.querySelectorAll(".collapsable").forEach(cur => cur.classList.toggle("hide"));
  document.querySelector(".channel-type").classList.toggle("collapsed");
  if (followedCollapseBtn.getAttribute("name") == "chevron-back-outline") {
      followedCollapseBtn.setAttribute("name","chevron-forward-outline");
  } else {
      followedCollapseBtn.setAttribute("name","chevron-back-outline");
  }
}
showMoreBtn.addEventListener("click",showMoreChannels);
showLessBtn.addEventListener("click",showLessChannels);
followedCollapseBtn.addEventListener("click", collapseSideBar);

},{"random-username-generator":75}]},{},[1,79,78]);
