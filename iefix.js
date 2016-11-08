/**
 * Created by owen
 * fix ie8 not support methods
 */

var arrayProto = Array.prototype, stringProto = String.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
// Array
//indexOf
if (!arrayProto.indexOf) {
    arrayProto.indexOf = function () {
        var len = this.length, index = arguments.shift() || '', indexFrom = arguments.shift() || 0;
        indexFrom = indexFrom < 0 ? Math.abs(indexFrom) < len ? (indexFrom + len) : 0 : indexFrom;
        for (var i = indexFrom; i < len; i++) {
            if (i in this && this[i] === index) {
                return i;
            }
        }
        return -1;
    }
}
// isArray
if (!arrayProto.isArray) {
    arrayProto.isArray = function () {
        return objectProto.toString.call(this) === "[object Array]";
    }
}
//forEach
if (!arrayProto.forEach) {
    arrayProto.forEach = function () {
        if (typeof callback != 'function') {
            throw new Error('foreach needs a callback function');
        }
        var callback = arguments.shift(), context = arguments.shift() || this;
        var _this = this;
        for (var i = 0, j = _this.length; i < j; i++) {
            callback.call(context, _this[i], i);
        }
    }
}

//String
//trim
if (!stringProto.trim) {
    stringProto.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    }
}

//Function
//bind
if (!funcProto.bind) {
    funcProto.bind = function () {
        if (typeof this !== "function") {
            throw new Error('bind need a function')
        }
        var _this = this, that = arguments.shift(), arrArgus = arrayProto.slice(arguments.shift() || '');
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
        var obj = arguments.shift(), arr = [];
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