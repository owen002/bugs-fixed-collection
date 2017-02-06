/**
 * Created by owen
 * fix ie8 don't support methods
 */

var arrayProto = Array.prototype, stringProto = String.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
// Array
//indexOf
if (!arrayProto.indexOf) {
    arrayProto.indexOf = function () {
        var args = arrayProto.slice.call(arguments);
        var len = this.length, index = args.shift() || '', indexFrom = args.shift() || 0;
        indexFrom = indexFrom < 0 ? Math.abs(indexFrom) < len ? (indexFrom + len) : 0 : indexFrom;
        for (var i = indexFrom; i < len; i++) {
            if (i in this && this[i] === index) {
                return i;
            }
        }
        return -1;
    }
}
/*if (!Array.prototype.indexOf) {
 Array.prototype.indexOf = function(searchElement, fromIndex) {
 var k;
 if (this == null) {
 throw new TypeError('this is null or not defined');
 }
 var o = Object(this);
 var len = o.length >>> 0;
 if (len === 0) {
 return -1;
 }
 var n = fromIndex | 0;
 if (n >= len) {
 return -1;
 }
 k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
 while (k < len) {
 if (k in o && o[k] === searchElement) {
 return k;
 }
 k++;
 }
 return -1;
 };
 }*/

// isArray
if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}
//forEach
if (!arrayProto.forEach) {
    arrayProto.forEach = function () {
        var args = arrayProto.slice.call(arguments);
        var callback = args.shift(), context = args.shift() || this;
        if (typeof callback != 'function') {
            throw new Error('foreach needs a callback function');
        }
        var _this = this;
        for (var i = 0, j = _this.length; i < j; i++) {
            callback.call(context, _this[i], i);
        }
    }
}
/*if (!Array.prototype.forEach) {
 Array.prototype.forEach = function(callback, thisArg) {
 var T, k;
 if (this === null) {
 throw new TypeError(' this is null or not defined');
 }
 var O = Object(this);
 var len = O.length >>> 0;
 if (typeof callback !== "function") {
 throw new TypeError(callback + ' is not a function');
 }
 if (arguments.length > 1) {
 T = thisArg;
 }
 k = 0;
 while (k < len) {
 var kValue;
 if (k in O) {
 kValue = O[k];
 callback.call(T, kValue, k, O);
 }
 k++;
 }
 };
 }*/

//filter
if (!arrayProto.filter) {
    Array.prototype.filter = function (fun/*, thisArg*/) {
        if(!this){
            throw new Error('this needs to be an array');
        }
        var t = Object(this),len = t.length >>> 0;
        if (typeof fun !== 'function') {
            throw new TypeError();
        }
        var res = [];
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i];
                if (fun.call(thisArg, val, i, t)) {
                    res.push(val);
                }
            }
        }
        return res;
    };
}


//String
//trim
if (!stringProto.trim) {
    stringProto.trim = function () {
//查看了jquery源码之后发现一点：\uFEFF是utf8的字节序标记，在ie中不换行符号non-break(圆角空格)('\xA0')不算作空白,即不在字符集[\s]中,但在其他浏览器则属于空白,所以在jQuery中针对ie作了加强处理
        return this.replace(/^[\s\xA0\uFEFF]+|[\s\xA0\uFEFF]+$/g, '');
    }
}

//Function
//bind
if (!funcProto.bind) {
    funcProto.bind = function () {
        var args = arrayProto.slice.call(arguments);
        if (typeof this !== "function") {
            throw new Error('bind need a function')
        }
        var _this = this, that = args.shift(), arrArgus = arrayProto.slice(args.shift() || '');
        that = that ? that : _this;
        return function () {
            _this.apply(that, arrArgus);
        }
    }
}

//Object
//keys
if (!Object.keys) {
    Object.keys = function () {
        var args = arrayProto.slice.call(arguments);
        var obj = args.shift(), arr = [];
        if (typeof obj !== 'object') {
            throw new Error('Object.keys error:param need an object');
        }
        for (var i in obj) {
            if (objectProto.hasOwnProperty.call(obj, i)) {
                arr.push(i);
            }
        }
        return arr;
    }
}

/*
 if (!Object.keys) {
 Object.keys = (function() {
 'use strict';
 var hasOwnProperty = Object.prototype.hasOwnProperty,
 hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
 dontEnums = [
 'toString',
 'toLocaleString',
 'valueOf',
 'hasOwnProperty',
 'isPrototypeOf',
 'propertyIsEnumerable',
 'constructor'
 ],
 dontEnumsLength = dontEnums.length;
 return function(obj) {
 if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
 throw new TypeError('Object.keys called on non-object');
 }
 var result = [], prop, i;
 for (prop in obj) {
 if (hasOwnProperty.call(obj, prop)) {
 result.push(prop);
 }
 }
 if (hasDontEnumBug) {
 for (i = 0; i < dontEnumsLength; i++) {
 if (hasOwnProperty.call(obj, dontEnums[i])) {
 result.push(dontEnums[i]);
 }
 }
 }
 return result;
 };
 }());
 }*/
