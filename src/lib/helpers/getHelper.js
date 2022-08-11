/* eslint-disable */
'use strict';
/*
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
jQuery v1.9.1 (c) 2005, 2012
jQuery Foundation, Inc. jquery.org/license.
*/

/* code has been altered to use window.extensionGoogleDataLayer.DataLayerHelper instead of window.DataLayerHelper */
/* method getComputedState() added - returns clone of _model object.
/* code state #9e00d56 17 Aug 2020 https://github.com/google/data-layer-helper/blob/master/dist/data-layer-helper.js */

module.exports = () => {
  (function () {
    var f =
      'function' == typeof Object.defineProperties
        ? Object.defineProperty
        : function (a, b, c) {
            if (a == Array.prototype || a == Object.prototype) return a;
            a[b] = c.value;
            return a;
          };
    function g(a) {
      a = [
        'object' == typeof globalThis && globalThis,
        a,
        'object' == typeof window && window,
        'object' == typeof self && self,
        'object' == typeof global && global
      ];
      for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        if (c && c.Math == Math) return c;
      }
      throw Error('Cannot find global object');
    }
    var m = g(this);
    function n(a, b) {
      if (b)
        a: {
          var c = m;
          a = a.split('.');
          for (var d = 0; d < a.length - 1; d++) {
            var e = a[d];
            if (!(e in c)) break a;
            c = c[e];
          }
          a = a[a.length - 1];
          d = c[a];
          b = b(d);
          b != d &&
            null != b &&
            f(c, a, { configurable: !0, writable: !0, value: b });
        }
    }
    var p =
      'function' == typeof Object.assign
        ? Object.assign
        : function (a, b) {
            for (var c = 1; c < arguments.length; c++) {
              var d = arguments[c];
              if (d)
                for (var e in d)
                  Object.prototype.hasOwnProperty.call(d, e) && (a[e] = d[e]);
            }
            return a;
          };
    n('Object.assign', function (a) {
      return a || p;
    }); /*
 jQuery v1.9.1 (c) 2005, 2012
 jQuery Foundation, Inc. jquery.org/license.
*/
    var q =
      /\[object (Boolean|Number|String|Function|Array|Date|RegExp|Arguments)\]/;
    function r(a) {
      return null == a
        ? String(a)
        : (a = q.exec(Object.prototype.toString.call(Object(a))))
        ? a[1].toLowerCase()
        : 'object';
    }
    function u(a, b) {
      return Object.prototype.hasOwnProperty.call(Object(a), b);
    }
    function v(a) {
      if (!a || 'object' != r(a) || a.nodeType || a == a.window) return !1;
      try {
        if (
          a.constructor &&
          !u(a, 'constructor') &&
          !u(a.constructor.prototype, 'isPrototypeOf')
        )
          return !1;
      } catch (c) {
        return !1;
      }
      for (var b in a);
      return void 0 === b || u(a, b);
    }
    function w(a, b) {
      var c = {},
        d = c;
      a = a.split('.');
      for (var e = 0; e < a.length - 1; e++) d = d[a[e]] = {};
      d[a[a.length - 1]] = b;
      return c;
    }
    function x(a, b) {
      var c = !a._clear,
        d;
      for (d in a)
        if (u(a, d)) {
          var e = a[d];
          'array' === r(e) && c
            ? ('array' === r(b[d]) || (b[d] = []), x(e, b[d]))
            : v(e) && c
            ? (v(b[d]) || (b[d] = {}), x(e, b[d]))
            : (b[d] = e);
        }
      delete b._clear;
    } /*
 Copyright 2012 Google Inc. All rights reserved. */
    function y(a, b, c) {
      b = void 0 === b ? {} : b;
      'function' === typeof b
        ? (b = {
            listener: b,
            listenToPast: void 0 === c ? !1 : c,
            processNow: !0,
            commandProcessors: {}
          })
        : (b = {
            listener: b.listener || function () {},
            listenToPast: b.listenToPast || !1,
            processNow: void 0 === b.processNow ? !0 : b.processNow,
            commandProcessors: b.commandProcessors || {}
          });
      this.a = a;
      this.m = b.listener;
      this.l = b.listenToPast;
      this.g = this.i = !1;
      this.b = {};
      this.f = [];
      this.c = b.commandProcessors;
      this.h = z(this);
      var d = this.a.push,
        e = this;
      this.a.push = function () {
        var k = [].slice.call(arguments, 0),
          l = d.apply(e.a, k);
        A(e, k);
        return l;
      };
      b.processNow && this.process();
    }
    y.prototype.process = function () {
      this.registerProcessor('set', function () {
        var c = {};
        1 === arguments.length && 'object' === r(arguments[0])
          ? (c = arguments[0])
          : 2 === arguments.length &&
            'string' === r(arguments[0]) &&
            (c = w(arguments[0], arguments[1]));
        return c;
      });
      this.i = !0;
      for (var a = this.a.length, b = 0; b < a; b++)
        A(this, [this.a[b]], !this.l);
    };
    y.prototype.get = function (a) {
      var b = this.b;
      a = a.split('.');
      for (var c = 0; c < a.length; c++) {
        if (void 0 === b[a[c]]) return;
        b = b[a[c]];
      }
      return b;
    };
    y.prototype.j = function () {
      return Object.assign({}, this.b);
    };
    y.prototype.flatten = function () {
      this.a.splice(0, this.a.length);
      this.a[0] = {};
      x(this.b, this.a[0]);
    };
    y.prototype.registerProcessor = function (a, b) {
      a in this.c || (this.c[a] = []);
      this.c[a].push(b);
    };
    function A(a, b, c) {
      c = void 0 === c ? !1 : c;
      if (a.i && (a.f.push.apply(a.f, b), !a.g))
        for (; 0 < a.f.length; ) {
          b = a.f.shift();
          if ('array' === r(b))
            a: {
              var d = a.b;
              r(b[0]);
              for (
                var e = b[0].split('.'), k = e.pop(), l = b.slice(1), h = 0;
                h < e.length;
                h++
              ) {
                if (void 0 === d[e[h]]) break a;
                d = d[e[h]];
              }
              try {
                d[k].apply(d, l);
              } catch (B) {}
            }
          else if ('arguments' === r(b)) {
            e = a;
            k = [];
            l = b[0];
            if (e.c[l])
              for (d = e.c[l].length, h = 0; h < d; h++)
                k.push(e.c[l][h].apply(e.h, [].slice.call(b, 1)));
            a.f.push.apply(a.f, k);
          } else if ('function' == typeof b)
            try {
              b.call(a.h);
            } catch (B) {}
          else if (v(b)) for (var t in b) x(w(t, b[t]), a.b);
          else continue;
          c || ((a.g = !0), a.m(a.b, b), (a.g = !1));
        }
    }
    y.prototype.registerProcessor = y.prototype.registerProcessor;
    y.prototype.flatten = y.prototype.flatten;
    y.prototype.getComputedState = y.prototype.j;
    y.prototype.get = y.prototype.get;
    y.prototype.process = y.prototype.process;
    window.extensionGoogleDataLayer = window.extensionGoogleDataLayer || {};
    window.extensionGoogleDataLayer.DataLayerHelper = y;
    function z(a) {
      return {
        set: function (b, c) {
          x(w(b, c), a.b);
        },
        get: function (b) {
          return a.get(b);
        }
      };
    }
  })();
};
