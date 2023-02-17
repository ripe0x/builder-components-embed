var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// (disabled):node_modules/buffer/index.js
var require_buffer = __commonJS({
  "(disabled):node_modules/buffer/index.js"() {
  }
});

// node_modules/bn.js/lib/bn.js
var require_bn = __commonJS({
  "node_modules/bn.js/lib/bn.js"(exports, module) {
    (function(module2, exports2) {
      "use strict";
      function assert(val, msg) {
        if (!val)
          throw new Error(msg || "Assertion failed");
      }
      function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
      function BN2(number, base, endian) {
        if (BN2.isBN(number)) {
          return number;
        }
        this.negative = 0;
        this.words = null;
        this.length = 0;
        this.red = null;
        if (number !== null) {
          if (base === "le" || base === "be") {
            endian = base;
            base = 10;
          }
          this._init(number || 0, base || 10, endian || "be");
        }
      }
      if (typeof module2 === "object") {
        module2.exports = BN2;
      } else {
        exports2.BN = BN2;
      }
      BN2.BN = BN2;
      BN2.wordSize = 26;
      var Buffer2;
      try {
        if (typeof window !== "undefined" && typeof window.Buffer !== "undefined") {
          Buffer2 = window.Buffer;
        } else {
          Buffer2 = require_buffer().Buffer;
        }
      } catch (e) {
      }
      BN2.isBN = function isBN(num) {
        if (num instanceof BN2) {
          return true;
        }
        return num !== null && typeof num === "object" && num.constructor.wordSize === BN2.wordSize && Array.isArray(num.words);
      };
      BN2.max = function max(left, right) {
        if (left.cmp(right) > 0)
          return left;
        return right;
      };
      BN2.min = function min(left, right) {
        if (left.cmp(right) < 0)
          return left;
        return right;
      };
      BN2.prototype._init = function init(number, base, endian) {
        if (typeof number === "number") {
          return this._initNumber(number, base, endian);
        }
        if (typeof number === "object") {
          return this._initArray(number, base, endian);
        }
        if (base === "hex") {
          base = 16;
        }
        assert(base === (base | 0) && base >= 2 && base <= 36);
        number = number.toString().replace(/\s+/g, "");
        var start = 0;
        if (number[0] === "-") {
          start++;
          this.negative = 1;
        }
        if (start < number.length) {
          if (base === 16) {
            this._parseHex(number, start, endian);
          } else {
            this._parseBase(number, base, start);
            if (endian === "le") {
              this._initArray(this.toArray(), base, endian);
            }
          }
        }
      };
      BN2.prototype._initNumber = function _initNumber(number, base, endian) {
        if (number < 0) {
          this.negative = 1;
          number = -number;
        }
        if (number < 67108864) {
          this.words = [number & 67108863];
          this.length = 1;
        } else if (number < 4503599627370496) {
          this.words = [
            number & 67108863,
            number / 67108864 & 67108863
          ];
          this.length = 2;
        } else {
          assert(number < 9007199254740992);
          this.words = [
            number & 67108863,
            number / 67108864 & 67108863,
            1
          ];
          this.length = 3;
        }
        if (endian !== "le")
          return;
        this._initArray(this.toArray(), base, endian);
      };
      BN2.prototype._initArray = function _initArray(number, base, endian) {
        assert(typeof number.length === "number");
        if (number.length <= 0) {
          this.words = [0];
          this.length = 1;
          return this;
        }
        this.length = Math.ceil(number.length / 3);
        this.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var j, w;
        var off = 0;
        if (endian === "be") {
          for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
            w = number[i] | number[i - 1] << 8 | number[i - 2] << 16;
            this.words[j] |= w << off & 67108863;
            this.words[j + 1] = w >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j++;
            }
          }
        } else if (endian === "le") {
          for (i = 0, j = 0; i < number.length; i += 3) {
            w = number[i] | number[i + 1] << 8 | number[i + 2] << 16;
            this.words[j] |= w << off & 67108863;
            this.words[j + 1] = w >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j++;
            }
          }
        }
        return this._strip();
      };
      function parseHex4Bits(string, index) {
        var c = string.charCodeAt(index);
        if (c >= 48 && c <= 57) {
          return c - 48;
        } else if (c >= 65 && c <= 70) {
          return c - 55;
        } else if (c >= 97 && c <= 102) {
          return c - 87;
        } else {
          assert(false, "Invalid character in " + string);
        }
      }
      function parseHexByte(string, lowerBound, index) {
        var r = parseHex4Bits(string, index);
        if (index - 1 >= lowerBound) {
          r |= parseHex4Bits(string, index - 1) << 4;
        }
        return r;
      }
      BN2.prototype._parseHex = function _parseHex(number, start, endian) {
        this.length = Math.ceil((number.length - start) / 6);
        this.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0;
        }
        var off = 0;
        var j = 0;
        var w;
        if (endian === "be") {
          for (i = number.length - 1; i >= start; i -= 2) {
            w = parseHexByte(number, start, i) << off;
            this.words[j] |= w & 67108863;
            if (off >= 18) {
              off -= 18;
              j += 1;
              this.words[j] |= w >>> 26;
            } else {
              off += 8;
            }
          }
        } else {
          var parseLength = number.length - start;
          for (i = parseLength % 2 === 0 ? start + 1 : start; i < number.length; i += 2) {
            w = parseHexByte(number, start, i) << off;
            this.words[j] |= w & 67108863;
            if (off >= 18) {
              off -= 18;
              j += 1;
              this.words[j] |= w >>> 26;
            } else {
              off += 8;
            }
          }
        }
        this._strip();
      };
      function parseBase(str, start, end, mul) {
        var r = 0;
        var b = 0;
        var len = Math.min(str.length, end);
        for (var i = start; i < len; i++) {
          var c = str.charCodeAt(i) - 48;
          r *= mul;
          if (c >= 49) {
            b = c - 49 + 10;
          } else if (c >= 17) {
            b = c - 17 + 10;
          } else {
            b = c;
          }
          assert(c >= 0 && b < mul, "Invalid character");
          r += b;
        }
        return r;
      }
      BN2.prototype._parseBase = function _parseBase(number, base, start) {
        this.words = [0];
        this.length = 1;
        for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base) {
          limbLen++;
        }
        limbLen--;
        limbPow = limbPow / base | 0;
        var total = number.length - start;
        var mod = total % limbLen;
        var end = Math.min(total, total - mod) + start;
        var word = 0;
        for (var i = start; i < end; i += limbLen) {
          word = parseBase(number, i, i + limbLen, base);
          this.imuln(limbPow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        if (mod !== 0) {
          var pow = 1;
          word = parseBase(number, i, number.length, base);
          for (i = 0; i < mod; i++) {
            pow *= base;
          }
          this.imuln(pow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        this._strip();
      };
      BN2.prototype.copy = function copy(dest) {
        dest.words = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          dest.words[i] = this.words[i];
        }
        dest.length = this.length;
        dest.negative = this.negative;
        dest.red = this.red;
      };
      function move(dest, src) {
        dest.words = src.words;
        dest.length = src.length;
        dest.negative = src.negative;
        dest.red = src.red;
      }
      BN2.prototype._move = function _move(dest) {
        move(dest, this);
      };
      BN2.prototype.clone = function clone() {
        var r = new BN2(null);
        this.copy(r);
        return r;
      };
      BN2.prototype._expand = function _expand(size) {
        while (this.length < size) {
          this.words[this.length++] = 0;
        }
        return this;
      };
      BN2.prototype._strip = function strip() {
        while (this.length > 1 && this.words[this.length - 1] === 0) {
          this.length--;
        }
        return this._normSign();
      };
      BN2.prototype._normSign = function _normSign() {
        if (this.length === 1 && this.words[0] === 0) {
          this.negative = 0;
        }
        return this;
      };
      if (typeof Symbol !== "undefined" && typeof Symbol.for === "function") {
        try {
          BN2.prototype[Symbol.for("nodejs.util.inspect.custom")] = inspect;
        } catch (e) {
          BN2.prototype.inspect = inspect;
        }
      } else {
        BN2.prototype.inspect = inspect;
      }
      function inspect() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }
      var zeros = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ];
      var groupSizes = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ];
      var groupBases = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      BN2.prototype.toString = function toString(base, padding) {
        base = base || 10;
        padding = padding | 0 || 1;
        var out;
        if (base === 16 || base === "hex") {
          out = "";
          var off = 0;
          var carry = 0;
          for (var i = 0; i < this.length; i++) {
            var w = this.words[i];
            var word = ((w << off | carry) & 16777215).toString(16);
            carry = w >>> 24 - off & 16777215;
            off += 2;
            if (off >= 26) {
              off -= 26;
              i--;
            }
            if (carry !== 0 || i !== this.length - 1) {
              out = zeros[6 - word.length] + word + out;
            } else {
              out = word + out;
            }
          }
          if (carry !== 0) {
            out = carry.toString(16) + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        if (base === (base | 0) && base >= 2 && base <= 36) {
          var groupSize = groupSizes[base];
          var groupBase = groupBases[base];
          out = "";
          var c = this.clone();
          c.negative = 0;
          while (!c.isZero()) {
            var r = c.modrn(groupBase).toString(base);
            c = c.idivn(groupBase);
            if (!c.isZero()) {
              out = zeros[groupSize - r.length] + r + out;
            } else {
              out = r + out;
            }
          }
          if (this.isZero()) {
            out = "0" + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        assert(false, "Base should be between 2 and 36");
      };
      BN2.prototype.toNumber = function toNumber() {
        var ret = this.words[0];
        if (this.length === 2) {
          ret += this.words[1] * 67108864;
        } else if (this.length === 3 && this.words[2] === 1) {
          ret += 4503599627370496 + this.words[1] * 67108864;
        } else if (this.length > 2) {
          assert(false, "Number can only safely store up to 53 bits");
        }
        return this.negative !== 0 ? -ret : ret;
      };
      BN2.prototype.toJSON = function toJSON() {
        return this.toString(16, 2);
      };
      if (Buffer2) {
        BN2.prototype.toBuffer = function toBuffer(endian, length) {
          return this.toArrayLike(Buffer2, endian, length);
        };
      }
      BN2.prototype.toArray = function toArray(endian, length) {
        return this.toArrayLike(Array, endian, length);
      };
      var allocate = function allocate2(ArrayType, size) {
        if (ArrayType.allocUnsafe) {
          return ArrayType.allocUnsafe(size);
        }
        return new ArrayType(size);
      };
      BN2.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
        this._strip();
        var byteLength = this.byteLength();
        var reqLength = length || Math.max(1, byteLength);
        assert(byteLength <= reqLength, "byte array longer than desired length");
        assert(reqLength > 0, "Requested array length <= 0");
        var res = allocate(ArrayType, reqLength);
        var postfix = endian === "le" ? "LE" : "BE";
        this["_toArrayLike" + postfix](res, byteLength);
        return res;
      };
      BN2.prototype._toArrayLikeLE = function _toArrayLikeLE(res, byteLength) {
        var position = 0;
        var carry = 0;
        for (var i = 0, shift = 0; i < this.length; i++) {
          var word = this.words[i] << shift | carry;
          res[position++] = word & 255;
          if (position < res.length) {
            res[position++] = word >> 8 & 255;
          }
          if (position < res.length) {
            res[position++] = word >> 16 & 255;
          }
          if (shift === 6) {
            if (position < res.length) {
              res[position++] = word >> 24 & 255;
            }
            carry = 0;
            shift = 0;
          } else {
            carry = word >>> 24;
            shift += 2;
          }
        }
        if (position < res.length) {
          res[position++] = carry;
          while (position < res.length) {
            res[position++] = 0;
          }
        }
      };
      BN2.prototype._toArrayLikeBE = function _toArrayLikeBE(res, byteLength) {
        var position = res.length - 1;
        var carry = 0;
        for (var i = 0, shift = 0; i < this.length; i++) {
          var word = this.words[i] << shift | carry;
          res[position--] = word & 255;
          if (position >= 0) {
            res[position--] = word >> 8 & 255;
          }
          if (position >= 0) {
            res[position--] = word >> 16 & 255;
          }
          if (shift === 6) {
            if (position >= 0) {
              res[position--] = word >> 24 & 255;
            }
            carry = 0;
            shift = 0;
          } else {
            carry = word >>> 24;
            shift += 2;
          }
        }
        if (position >= 0) {
          res[position--] = carry;
          while (position >= 0) {
            res[position--] = 0;
          }
        }
      };
      if (Math.clz32) {
        BN2.prototype._countBits = function _countBits(w) {
          return 32 - Math.clz32(w);
        };
      } else {
        BN2.prototype._countBits = function _countBits(w) {
          var t = w;
          var r = 0;
          if (t >= 4096) {
            r += 13;
            t >>>= 13;
          }
          if (t >= 64) {
            r += 7;
            t >>>= 7;
          }
          if (t >= 8) {
            r += 4;
            t >>>= 4;
          }
          if (t >= 2) {
            r += 2;
            t >>>= 2;
          }
          return r + t;
        };
      }
      BN2.prototype._zeroBits = function _zeroBits(w) {
        if (w === 0)
          return 26;
        var t = w;
        var r = 0;
        if ((t & 8191) === 0) {
          r += 13;
          t >>>= 13;
        }
        if ((t & 127) === 0) {
          r += 7;
          t >>>= 7;
        }
        if ((t & 15) === 0) {
          r += 4;
          t >>>= 4;
        }
        if ((t & 3) === 0) {
          r += 2;
          t >>>= 2;
        }
        if ((t & 1) === 0) {
          r++;
        }
        return r;
      };
      BN2.prototype.bitLength = function bitLength() {
        var w = this.words[this.length - 1];
        var hi = this._countBits(w);
        return (this.length - 1) * 26 + hi;
      };
      function toBitArray(num) {
        var w = new Array(num.bitLength());
        for (var bit = 0; bit < w.length; bit++) {
          var off = bit / 26 | 0;
          var wbit = bit % 26;
          w[bit] = num.words[off] >>> wbit & 1;
        }
        return w;
      }
      BN2.prototype.zeroBits = function zeroBits() {
        if (this.isZero())
          return 0;
        var r = 0;
        for (var i = 0; i < this.length; i++) {
          var b = this._zeroBits(this.words[i]);
          r += b;
          if (b !== 26)
            break;
        }
        return r;
      };
      BN2.prototype.byteLength = function byteLength() {
        return Math.ceil(this.bitLength() / 8);
      };
      BN2.prototype.toTwos = function toTwos(width) {
        if (this.negative !== 0) {
          return this.abs().inotn(width).iaddn(1);
        }
        return this.clone();
      };
      BN2.prototype.fromTwos = function fromTwos(width) {
        if (this.testn(width - 1)) {
          return this.notn(width).iaddn(1).ineg();
        }
        return this.clone();
      };
      BN2.prototype.isNeg = function isNeg() {
        return this.negative !== 0;
      };
      BN2.prototype.neg = function neg() {
        return this.clone().ineg();
      };
      BN2.prototype.ineg = function ineg() {
        if (!this.isZero()) {
          this.negative ^= 1;
        }
        return this;
      };
      BN2.prototype.iuor = function iuor(num) {
        while (this.length < num.length) {
          this.words[this.length++] = 0;
        }
        for (var i = 0; i < num.length; i++) {
          this.words[i] = this.words[i] | num.words[i];
        }
        return this._strip();
      };
      BN2.prototype.ior = function ior(num) {
        assert((this.negative | num.negative) === 0);
        return this.iuor(num);
      };
      BN2.prototype.or = function or(num) {
        if (this.length > num.length)
          return this.clone().ior(num);
        return num.clone().ior(this);
      };
      BN2.prototype.uor = function uor(num) {
        if (this.length > num.length)
          return this.clone().iuor(num);
        return num.clone().iuor(this);
      };
      BN2.prototype.iuand = function iuand(num) {
        var b;
        if (this.length > num.length) {
          b = num;
        } else {
          b = this;
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = this.words[i] & num.words[i];
        }
        this.length = b.length;
        return this._strip();
      };
      BN2.prototype.iand = function iand(num) {
        assert((this.negative | num.negative) === 0);
        return this.iuand(num);
      };
      BN2.prototype.and = function and(num) {
        if (this.length > num.length)
          return this.clone().iand(num);
        return num.clone().iand(this);
      };
      BN2.prototype.uand = function uand(num) {
        if (this.length > num.length)
          return this.clone().iuand(num);
        return num.clone().iuand(this);
      };
      BN2.prototype.iuxor = function iuxor(num) {
        var a;
        var b;
        if (this.length > num.length) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = a.words[i] ^ b.words[i];
        }
        if (this !== a) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        this.length = a.length;
        return this._strip();
      };
      BN2.prototype.ixor = function ixor(num) {
        assert((this.negative | num.negative) === 0);
        return this.iuxor(num);
      };
      BN2.prototype.xor = function xor(num) {
        if (this.length > num.length)
          return this.clone().ixor(num);
        return num.clone().ixor(this);
      };
      BN2.prototype.uxor = function uxor(num) {
        if (this.length > num.length)
          return this.clone().iuxor(num);
        return num.clone().iuxor(this);
      };
      BN2.prototype.inotn = function inotn(width) {
        assert(typeof width === "number" && width >= 0);
        var bytesNeeded = Math.ceil(width / 26) | 0;
        var bitsLeft = width % 26;
        this._expand(bytesNeeded);
        if (bitsLeft > 0) {
          bytesNeeded--;
        }
        for (var i = 0; i < bytesNeeded; i++) {
          this.words[i] = ~this.words[i] & 67108863;
        }
        if (bitsLeft > 0) {
          this.words[i] = ~this.words[i] & 67108863 >> 26 - bitsLeft;
        }
        return this._strip();
      };
      BN2.prototype.notn = function notn(width) {
        return this.clone().inotn(width);
      };
      BN2.prototype.setn = function setn(bit, val) {
        assert(typeof bit === "number" && bit >= 0);
        var off = bit / 26 | 0;
        var wbit = bit % 26;
        this._expand(off + 1);
        if (val) {
          this.words[off] = this.words[off] | 1 << wbit;
        } else {
          this.words[off] = this.words[off] & ~(1 << wbit);
        }
        return this._strip();
      };
      BN2.prototype.iadd = function iadd(num) {
        var r;
        if (this.negative !== 0 && num.negative === 0) {
          this.negative = 0;
          r = this.isub(num);
          this.negative ^= 1;
          return this._normSign();
        } else if (this.negative === 0 && num.negative !== 0) {
          num.negative = 0;
          r = this.isub(num);
          num.negative = 1;
          return r._normSign();
        }
        var a, b;
        if (this.length > num.length) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        var carry = 0;
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
          this.words[i] = r & 67108863;
          carry = r >>> 26;
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry;
          this.words[i] = r & 67108863;
          carry = r >>> 26;
        }
        this.length = a.length;
        if (carry !== 0) {
          this.words[this.length] = carry;
          this.length++;
        } else if (a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        return this;
      };
      BN2.prototype.add = function add(num) {
        var res;
        if (num.negative !== 0 && this.negative === 0) {
          num.negative = 0;
          res = this.sub(num);
          num.negative ^= 1;
          return res;
        } else if (num.negative === 0 && this.negative !== 0) {
          this.negative = 0;
          res = num.sub(this);
          this.negative = 1;
          return res;
        }
        if (this.length > num.length)
          return this.clone().iadd(num);
        return num.clone().iadd(this);
      };
      BN2.prototype.isub = function isub(num) {
        if (num.negative !== 0) {
          num.negative = 0;
          var r = this.iadd(num);
          num.negative = 1;
          return r._normSign();
        } else if (this.negative !== 0) {
          this.negative = 0;
          this.iadd(num);
          this.negative = 1;
          return this._normSign();
        }
        var cmp = this.cmp(num);
        if (cmp === 0) {
          this.negative = 0;
          this.length = 1;
          this.words[0] = 0;
          return this;
        }
        var a, b;
        if (cmp > 0) {
          a = this;
          b = num;
        } else {
          a = num;
          b = this;
        }
        var carry = 0;
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
          carry = r >> 26;
          this.words[i] = r & 67108863;
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry;
          carry = r >> 26;
          this.words[i] = r & 67108863;
        }
        if (carry === 0 && i < a.length && a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i];
          }
        }
        this.length = Math.max(this.length, i);
        if (a !== this) {
          this.negative = 1;
        }
        return this._strip();
      };
      BN2.prototype.sub = function sub(num) {
        return this.clone().isub(num);
      };
      function smallMulTo(self, num, out) {
        out.negative = num.negative ^ self.negative;
        var len = self.length + num.length | 0;
        out.length = len;
        len = len - 1 | 0;
        var a = self.words[0] | 0;
        var b = num.words[0] | 0;
        var r = a * b;
        var lo = r & 67108863;
        var carry = r / 67108864 | 0;
        out.words[0] = lo;
        for (var k = 1; k < len; k++) {
          var ncarry = carry >>> 26;
          var rword = carry & 67108863;
          var maxJ = Math.min(k, num.length - 1);
          for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
            var i = k - j | 0;
            a = self.words[i] | 0;
            b = num.words[j] | 0;
            r = a * b + rword;
            ncarry += r / 67108864 | 0;
            rword = r & 67108863;
          }
          out.words[k] = rword | 0;
          carry = ncarry | 0;
        }
        if (carry !== 0) {
          out.words[k] = carry | 0;
        } else {
          out.length--;
        }
        return out._strip();
      }
      var comb10MulTo = function comb10MulTo2(self, num, out) {
        var a = self.words;
        var b = num.words;
        var o = out.words;
        var c = 0;
        var lo;
        var mid;
        var hi;
        var a0 = a[0] | 0;
        var al0 = a0 & 8191;
        var ah0 = a0 >>> 13;
        var a1 = a[1] | 0;
        var al1 = a1 & 8191;
        var ah1 = a1 >>> 13;
        var a2 = a[2] | 0;
        var al2 = a2 & 8191;
        var ah2 = a2 >>> 13;
        var a3 = a[3] | 0;
        var al3 = a3 & 8191;
        var ah3 = a3 >>> 13;
        var a4 = a[4] | 0;
        var al4 = a4 & 8191;
        var ah4 = a4 >>> 13;
        var a5 = a[5] | 0;
        var al5 = a5 & 8191;
        var ah5 = a5 >>> 13;
        var a6 = a[6] | 0;
        var al6 = a6 & 8191;
        var ah6 = a6 >>> 13;
        var a7 = a[7] | 0;
        var al7 = a7 & 8191;
        var ah7 = a7 >>> 13;
        var a8 = a[8] | 0;
        var al8 = a8 & 8191;
        var ah8 = a8 >>> 13;
        var a9 = a[9] | 0;
        var al9 = a9 & 8191;
        var ah9 = a9 >>> 13;
        var b0 = b[0] | 0;
        var bl0 = b0 & 8191;
        var bh0 = b0 >>> 13;
        var b1 = b[1] | 0;
        var bl1 = b1 & 8191;
        var bh1 = b1 >>> 13;
        var b2 = b[2] | 0;
        var bl2 = b2 & 8191;
        var bh2 = b2 >>> 13;
        var b3 = b[3] | 0;
        var bl3 = b3 & 8191;
        var bh3 = b3 >>> 13;
        var b4 = b[4] | 0;
        var bl4 = b4 & 8191;
        var bh4 = b4 >>> 13;
        var b5 = b[5] | 0;
        var bl5 = b5 & 8191;
        var bh5 = b5 >>> 13;
        var b6 = b[6] | 0;
        var bl6 = b6 & 8191;
        var bh6 = b6 >>> 13;
        var b7 = b[7] | 0;
        var bl7 = b7 & 8191;
        var bh7 = b7 >>> 13;
        var b8 = b[8] | 0;
        var bl8 = b8 & 8191;
        var bh8 = b8 >>> 13;
        var b9 = b[9] | 0;
        var bl9 = b9 & 8191;
        var bh9 = b9 >>> 13;
        out.negative = self.negative ^ num.negative;
        out.length = 19;
        lo = Math.imul(al0, bl0);
        mid = Math.imul(al0, bh0);
        mid = mid + Math.imul(ah0, bl0) | 0;
        hi = Math.imul(ah0, bh0);
        var w0 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
        w0 &= 67108863;
        lo = Math.imul(al1, bl0);
        mid = Math.imul(al1, bh0);
        mid = mid + Math.imul(ah1, bl0) | 0;
        hi = Math.imul(ah1, bh0);
        lo = lo + Math.imul(al0, bl1) | 0;
        mid = mid + Math.imul(al0, bh1) | 0;
        mid = mid + Math.imul(ah0, bl1) | 0;
        hi = hi + Math.imul(ah0, bh1) | 0;
        var w1 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
        w1 &= 67108863;
        lo = Math.imul(al2, bl0);
        mid = Math.imul(al2, bh0);
        mid = mid + Math.imul(ah2, bl0) | 0;
        hi = Math.imul(ah2, bh0);
        lo = lo + Math.imul(al1, bl1) | 0;
        mid = mid + Math.imul(al1, bh1) | 0;
        mid = mid + Math.imul(ah1, bl1) | 0;
        hi = hi + Math.imul(ah1, bh1) | 0;
        lo = lo + Math.imul(al0, bl2) | 0;
        mid = mid + Math.imul(al0, bh2) | 0;
        mid = mid + Math.imul(ah0, bl2) | 0;
        hi = hi + Math.imul(ah0, bh2) | 0;
        var w2 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0;
        w2 &= 67108863;
        lo = Math.imul(al3, bl0);
        mid = Math.imul(al3, bh0);
        mid = mid + Math.imul(ah3, bl0) | 0;
        hi = Math.imul(ah3, bh0);
        lo = lo + Math.imul(al2, bl1) | 0;
        mid = mid + Math.imul(al2, bh1) | 0;
        mid = mid + Math.imul(ah2, bl1) | 0;
        hi = hi + Math.imul(ah2, bh1) | 0;
        lo = lo + Math.imul(al1, bl2) | 0;
        mid = mid + Math.imul(al1, bh2) | 0;
        mid = mid + Math.imul(ah1, bl2) | 0;
        hi = hi + Math.imul(ah1, bh2) | 0;
        lo = lo + Math.imul(al0, bl3) | 0;
        mid = mid + Math.imul(al0, bh3) | 0;
        mid = mid + Math.imul(ah0, bl3) | 0;
        hi = hi + Math.imul(ah0, bh3) | 0;
        var w3 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0;
        w3 &= 67108863;
        lo = Math.imul(al4, bl0);
        mid = Math.imul(al4, bh0);
        mid = mid + Math.imul(ah4, bl0) | 0;
        hi = Math.imul(ah4, bh0);
        lo = lo + Math.imul(al3, bl1) | 0;
        mid = mid + Math.imul(al3, bh1) | 0;
        mid = mid + Math.imul(ah3, bl1) | 0;
        hi = hi + Math.imul(ah3, bh1) | 0;
        lo = lo + Math.imul(al2, bl2) | 0;
        mid = mid + Math.imul(al2, bh2) | 0;
        mid = mid + Math.imul(ah2, bl2) | 0;
        hi = hi + Math.imul(ah2, bh2) | 0;
        lo = lo + Math.imul(al1, bl3) | 0;
        mid = mid + Math.imul(al1, bh3) | 0;
        mid = mid + Math.imul(ah1, bl3) | 0;
        hi = hi + Math.imul(ah1, bh3) | 0;
        lo = lo + Math.imul(al0, bl4) | 0;
        mid = mid + Math.imul(al0, bh4) | 0;
        mid = mid + Math.imul(ah0, bl4) | 0;
        hi = hi + Math.imul(ah0, bh4) | 0;
        var w4 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
        w4 &= 67108863;
        lo = Math.imul(al5, bl0);
        mid = Math.imul(al5, bh0);
        mid = mid + Math.imul(ah5, bl0) | 0;
        hi = Math.imul(ah5, bh0);
        lo = lo + Math.imul(al4, bl1) | 0;
        mid = mid + Math.imul(al4, bh1) | 0;
        mid = mid + Math.imul(ah4, bl1) | 0;
        hi = hi + Math.imul(ah4, bh1) | 0;
        lo = lo + Math.imul(al3, bl2) | 0;
        mid = mid + Math.imul(al3, bh2) | 0;
        mid = mid + Math.imul(ah3, bl2) | 0;
        hi = hi + Math.imul(ah3, bh2) | 0;
        lo = lo + Math.imul(al2, bl3) | 0;
        mid = mid + Math.imul(al2, bh3) | 0;
        mid = mid + Math.imul(ah2, bl3) | 0;
        hi = hi + Math.imul(ah2, bh3) | 0;
        lo = lo + Math.imul(al1, bl4) | 0;
        mid = mid + Math.imul(al1, bh4) | 0;
        mid = mid + Math.imul(ah1, bl4) | 0;
        hi = hi + Math.imul(ah1, bh4) | 0;
        lo = lo + Math.imul(al0, bl5) | 0;
        mid = mid + Math.imul(al0, bh5) | 0;
        mid = mid + Math.imul(ah0, bl5) | 0;
        hi = hi + Math.imul(ah0, bh5) | 0;
        var w5 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
        w5 &= 67108863;
        lo = Math.imul(al6, bl0);
        mid = Math.imul(al6, bh0);
        mid = mid + Math.imul(ah6, bl0) | 0;
        hi = Math.imul(ah6, bh0);
        lo = lo + Math.imul(al5, bl1) | 0;
        mid = mid + Math.imul(al5, bh1) | 0;
        mid = mid + Math.imul(ah5, bl1) | 0;
        hi = hi + Math.imul(ah5, bh1) | 0;
        lo = lo + Math.imul(al4, bl2) | 0;
        mid = mid + Math.imul(al4, bh2) | 0;
        mid = mid + Math.imul(ah4, bl2) | 0;
        hi = hi + Math.imul(ah4, bh2) | 0;
        lo = lo + Math.imul(al3, bl3) | 0;
        mid = mid + Math.imul(al3, bh3) | 0;
        mid = mid + Math.imul(ah3, bl3) | 0;
        hi = hi + Math.imul(ah3, bh3) | 0;
        lo = lo + Math.imul(al2, bl4) | 0;
        mid = mid + Math.imul(al2, bh4) | 0;
        mid = mid + Math.imul(ah2, bl4) | 0;
        hi = hi + Math.imul(ah2, bh4) | 0;
        lo = lo + Math.imul(al1, bl5) | 0;
        mid = mid + Math.imul(al1, bh5) | 0;
        mid = mid + Math.imul(ah1, bl5) | 0;
        hi = hi + Math.imul(ah1, bh5) | 0;
        lo = lo + Math.imul(al0, bl6) | 0;
        mid = mid + Math.imul(al0, bh6) | 0;
        mid = mid + Math.imul(ah0, bl6) | 0;
        hi = hi + Math.imul(ah0, bh6) | 0;
        var w6 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
        w6 &= 67108863;
        lo = Math.imul(al7, bl0);
        mid = Math.imul(al7, bh0);
        mid = mid + Math.imul(ah7, bl0) | 0;
        hi = Math.imul(ah7, bh0);
        lo = lo + Math.imul(al6, bl1) | 0;
        mid = mid + Math.imul(al6, bh1) | 0;
        mid = mid + Math.imul(ah6, bl1) | 0;
        hi = hi + Math.imul(ah6, bh1) | 0;
        lo = lo + Math.imul(al5, bl2) | 0;
        mid = mid + Math.imul(al5, bh2) | 0;
        mid = mid + Math.imul(ah5, bl2) | 0;
        hi = hi + Math.imul(ah5, bh2) | 0;
        lo = lo + Math.imul(al4, bl3) | 0;
        mid = mid + Math.imul(al4, bh3) | 0;
        mid = mid + Math.imul(ah4, bl3) | 0;
        hi = hi + Math.imul(ah4, bh3) | 0;
        lo = lo + Math.imul(al3, bl4) | 0;
        mid = mid + Math.imul(al3, bh4) | 0;
        mid = mid + Math.imul(ah3, bl4) | 0;
        hi = hi + Math.imul(ah3, bh4) | 0;
        lo = lo + Math.imul(al2, bl5) | 0;
        mid = mid + Math.imul(al2, bh5) | 0;
        mid = mid + Math.imul(ah2, bl5) | 0;
        hi = hi + Math.imul(ah2, bh5) | 0;
        lo = lo + Math.imul(al1, bl6) | 0;
        mid = mid + Math.imul(al1, bh6) | 0;
        mid = mid + Math.imul(ah1, bl6) | 0;
        hi = hi + Math.imul(ah1, bh6) | 0;
        lo = lo + Math.imul(al0, bl7) | 0;
        mid = mid + Math.imul(al0, bh7) | 0;
        mid = mid + Math.imul(ah0, bl7) | 0;
        hi = hi + Math.imul(ah0, bh7) | 0;
        var w7 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
        w7 &= 67108863;
        lo = Math.imul(al8, bl0);
        mid = Math.imul(al8, bh0);
        mid = mid + Math.imul(ah8, bl0) | 0;
        hi = Math.imul(ah8, bh0);
        lo = lo + Math.imul(al7, bl1) | 0;
        mid = mid + Math.imul(al7, bh1) | 0;
        mid = mid + Math.imul(ah7, bl1) | 0;
        hi = hi + Math.imul(ah7, bh1) | 0;
        lo = lo + Math.imul(al6, bl2) | 0;
        mid = mid + Math.imul(al6, bh2) | 0;
        mid = mid + Math.imul(ah6, bl2) | 0;
        hi = hi + Math.imul(ah6, bh2) | 0;
        lo = lo + Math.imul(al5, bl3) | 0;
        mid = mid + Math.imul(al5, bh3) | 0;
        mid = mid + Math.imul(ah5, bl3) | 0;
        hi = hi + Math.imul(ah5, bh3) | 0;
        lo = lo + Math.imul(al4, bl4) | 0;
        mid = mid + Math.imul(al4, bh4) | 0;
        mid = mid + Math.imul(ah4, bl4) | 0;
        hi = hi + Math.imul(ah4, bh4) | 0;
        lo = lo + Math.imul(al3, bl5) | 0;
        mid = mid + Math.imul(al3, bh5) | 0;
        mid = mid + Math.imul(ah3, bl5) | 0;
        hi = hi + Math.imul(ah3, bh5) | 0;
        lo = lo + Math.imul(al2, bl6) | 0;
        mid = mid + Math.imul(al2, bh6) | 0;
        mid = mid + Math.imul(ah2, bl6) | 0;
        hi = hi + Math.imul(ah2, bh6) | 0;
        lo = lo + Math.imul(al1, bl7) | 0;
        mid = mid + Math.imul(al1, bh7) | 0;
        mid = mid + Math.imul(ah1, bl7) | 0;
        hi = hi + Math.imul(ah1, bh7) | 0;
        lo = lo + Math.imul(al0, bl8) | 0;
        mid = mid + Math.imul(al0, bh8) | 0;
        mid = mid + Math.imul(ah0, bl8) | 0;
        hi = hi + Math.imul(ah0, bh8) | 0;
        var w8 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
        w8 &= 67108863;
        lo = Math.imul(al9, bl0);
        mid = Math.imul(al9, bh0);
        mid = mid + Math.imul(ah9, bl0) | 0;
        hi = Math.imul(ah9, bh0);
        lo = lo + Math.imul(al8, bl1) | 0;
        mid = mid + Math.imul(al8, bh1) | 0;
        mid = mid + Math.imul(ah8, bl1) | 0;
        hi = hi + Math.imul(ah8, bh1) | 0;
        lo = lo + Math.imul(al7, bl2) | 0;
        mid = mid + Math.imul(al7, bh2) | 0;
        mid = mid + Math.imul(ah7, bl2) | 0;
        hi = hi + Math.imul(ah7, bh2) | 0;
        lo = lo + Math.imul(al6, bl3) | 0;
        mid = mid + Math.imul(al6, bh3) | 0;
        mid = mid + Math.imul(ah6, bl3) | 0;
        hi = hi + Math.imul(ah6, bh3) | 0;
        lo = lo + Math.imul(al5, bl4) | 0;
        mid = mid + Math.imul(al5, bh4) | 0;
        mid = mid + Math.imul(ah5, bl4) | 0;
        hi = hi + Math.imul(ah5, bh4) | 0;
        lo = lo + Math.imul(al4, bl5) | 0;
        mid = mid + Math.imul(al4, bh5) | 0;
        mid = mid + Math.imul(ah4, bl5) | 0;
        hi = hi + Math.imul(ah4, bh5) | 0;
        lo = lo + Math.imul(al3, bl6) | 0;
        mid = mid + Math.imul(al3, bh6) | 0;
        mid = mid + Math.imul(ah3, bl6) | 0;
        hi = hi + Math.imul(ah3, bh6) | 0;
        lo = lo + Math.imul(al2, bl7) | 0;
        mid = mid + Math.imul(al2, bh7) | 0;
        mid = mid + Math.imul(ah2, bl7) | 0;
        hi = hi + Math.imul(ah2, bh7) | 0;
        lo = lo + Math.imul(al1, bl8) | 0;
        mid = mid + Math.imul(al1, bh8) | 0;
        mid = mid + Math.imul(ah1, bl8) | 0;
        hi = hi + Math.imul(ah1, bh8) | 0;
        lo = lo + Math.imul(al0, bl9) | 0;
        mid = mid + Math.imul(al0, bh9) | 0;
        mid = mid + Math.imul(ah0, bl9) | 0;
        hi = hi + Math.imul(ah0, bh9) | 0;
        var w9 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
        w9 &= 67108863;
        lo = Math.imul(al9, bl1);
        mid = Math.imul(al9, bh1);
        mid = mid + Math.imul(ah9, bl1) | 0;
        hi = Math.imul(ah9, bh1);
        lo = lo + Math.imul(al8, bl2) | 0;
        mid = mid + Math.imul(al8, bh2) | 0;
        mid = mid + Math.imul(ah8, bl2) | 0;
        hi = hi + Math.imul(ah8, bh2) | 0;
        lo = lo + Math.imul(al7, bl3) | 0;
        mid = mid + Math.imul(al7, bh3) | 0;
        mid = mid + Math.imul(ah7, bl3) | 0;
        hi = hi + Math.imul(ah7, bh3) | 0;
        lo = lo + Math.imul(al6, bl4) | 0;
        mid = mid + Math.imul(al6, bh4) | 0;
        mid = mid + Math.imul(ah6, bl4) | 0;
        hi = hi + Math.imul(ah6, bh4) | 0;
        lo = lo + Math.imul(al5, bl5) | 0;
        mid = mid + Math.imul(al5, bh5) | 0;
        mid = mid + Math.imul(ah5, bl5) | 0;
        hi = hi + Math.imul(ah5, bh5) | 0;
        lo = lo + Math.imul(al4, bl6) | 0;
        mid = mid + Math.imul(al4, bh6) | 0;
        mid = mid + Math.imul(ah4, bl6) | 0;
        hi = hi + Math.imul(ah4, bh6) | 0;
        lo = lo + Math.imul(al3, bl7) | 0;
        mid = mid + Math.imul(al3, bh7) | 0;
        mid = mid + Math.imul(ah3, bl7) | 0;
        hi = hi + Math.imul(ah3, bh7) | 0;
        lo = lo + Math.imul(al2, bl8) | 0;
        mid = mid + Math.imul(al2, bh8) | 0;
        mid = mid + Math.imul(ah2, bl8) | 0;
        hi = hi + Math.imul(ah2, bh8) | 0;
        lo = lo + Math.imul(al1, bl9) | 0;
        mid = mid + Math.imul(al1, bh9) | 0;
        mid = mid + Math.imul(ah1, bl9) | 0;
        hi = hi + Math.imul(ah1, bh9) | 0;
        var w10 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
        w10 &= 67108863;
        lo = Math.imul(al9, bl2);
        mid = Math.imul(al9, bh2);
        mid = mid + Math.imul(ah9, bl2) | 0;
        hi = Math.imul(ah9, bh2);
        lo = lo + Math.imul(al8, bl3) | 0;
        mid = mid + Math.imul(al8, bh3) | 0;
        mid = mid + Math.imul(ah8, bl3) | 0;
        hi = hi + Math.imul(ah8, bh3) | 0;
        lo = lo + Math.imul(al7, bl4) | 0;
        mid = mid + Math.imul(al7, bh4) | 0;
        mid = mid + Math.imul(ah7, bl4) | 0;
        hi = hi + Math.imul(ah7, bh4) | 0;
        lo = lo + Math.imul(al6, bl5) | 0;
        mid = mid + Math.imul(al6, bh5) | 0;
        mid = mid + Math.imul(ah6, bl5) | 0;
        hi = hi + Math.imul(ah6, bh5) | 0;
        lo = lo + Math.imul(al5, bl6) | 0;
        mid = mid + Math.imul(al5, bh6) | 0;
        mid = mid + Math.imul(ah5, bl6) | 0;
        hi = hi + Math.imul(ah5, bh6) | 0;
        lo = lo + Math.imul(al4, bl7) | 0;
        mid = mid + Math.imul(al4, bh7) | 0;
        mid = mid + Math.imul(ah4, bl7) | 0;
        hi = hi + Math.imul(ah4, bh7) | 0;
        lo = lo + Math.imul(al3, bl8) | 0;
        mid = mid + Math.imul(al3, bh8) | 0;
        mid = mid + Math.imul(ah3, bl8) | 0;
        hi = hi + Math.imul(ah3, bh8) | 0;
        lo = lo + Math.imul(al2, bl9) | 0;
        mid = mid + Math.imul(al2, bh9) | 0;
        mid = mid + Math.imul(ah2, bl9) | 0;
        hi = hi + Math.imul(ah2, bh9) | 0;
        var w11 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
        w11 &= 67108863;
        lo = Math.imul(al9, bl3);
        mid = Math.imul(al9, bh3);
        mid = mid + Math.imul(ah9, bl3) | 0;
        hi = Math.imul(ah9, bh3);
        lo = lo + Math.imul(al8, bl4) | 0;
        mid = mid + Math.imul(al8, bh4) | 0;
        mid = mid + Math.imul(ah8, bl4) | 0;
        hi = hi + Math.imul(ah8, bh4) | 0;
        lo = lo + Math.imul(al7, bl5) | 0;
        mid = mid + Math.imul(al7, bh5) | 0;
        mid = mid + Math.imul(ah7, bl5) | 0;
        hi = hi + Math.imul(ah7, bh5) | 0;
        lo = lo + Math.imul(al6, bl6) | 0;
        mid = mid + Math.imul(al6, bh6) | 0;
        mid = mid + Math.imul(ah6, bl6) | 0;
        hi = hi + Math.imul(ah6, bh6) | 0;
        lo = lo + Math.imul(al5, bl7) | 0;
        mid = mid + Math.imul(al5, bh7) | 0;
        mid = mid + Math.imul(ah5, bl7) | 0;
        hi = hi + Math.imul(ah5, bh7) | 0;
        lo = lo + Math.imul(al4, bl8) | 0;
        mid = mid + Math.imul(al4, bh8) | 0;
        mid = mid + Math.imul(ah4, bl8) | 0;
        hi = hi + Math.imul(ah4, bh8) | 0;
        lo = lo + Math.imul(al3, bl9) | 0;
        mid = mid + Math.imul(al3, bh9) | 0;
        mid = mid + Math.imul(ah3, bl9) | 0;
        hi = hi + Math.imul(ah3, bh9) | 0;
        var w12 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
        w12 &= 67108863;
        lo = Math.imul(al9, bl4);
        mid = Math.imul(al9, bh4);
        mid = mid + Math.imul(ah9, bl4) | 0;
        hi = Math.imul(ah9, bh4);
        lo = lo + Math.imul(al8, bl5) | 0;
        mid = mid + Math.imul(al8, bh5) | 0;
        mid = mid + Math.imul(ah8, bl5) | 0;
        hi = hi + Math.imul(ah8, bh5) | 0;
        lo = lo + Math.imul(al7, bl6) | 0;
        mid = mid + Math.imul(al7, bh6) | 0;
        mid = mid + Math.imul(ah7, bl6) | 0;
        hi = hi + Math.imul(ah7, bh6) | 0;
        lo = lo + Math.imul(al6, bl7) | 0;
        mid = mid + Math.imul(al6, bh7) | 0;
        mid = mid + Math.imul(ah6, bl7) | 0;
        hi = hi + Math.imul(ah6, bh7) | 0;
        lo = lo + Math.imul(al5, bl8) | 0;
        mid = mid + Math.imul(al5, bh8) | 0;
        mid = mid + Math.imul(ah5, bl8) | 0;
        hi = hi + Math.imul(ah5, bh8) | 0;
        lo = lo + Math.imul(al4, bl9) | 0;
        mid = mid + Math.imul(al4, bh9) | 0;
        mid = mid + Math.imul(ah4, bl9) | 0;
        hi = hi + Math.imul(ah4, bh9) | 0;
        var w13 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
        w13 &= 67108863;
        lo = Math.imul(al9, bl5);
        mid = Math.imul(al9, bh5);
        mid = mid + Math.imul(ah9, bl5) | 0;
        hi = Math.imul(ah9, bh5);
        lo = lo + Math.imul(al8, bl6) | 0;
        mid = mid + Math.imul(al8, bh6) | 0;
        mid = mid + Math.imul(ah8, bl6) | 0;
        hi = hi + Math.imul(ah8, bh6) | 0;
        lo = lo + Math.imul(al7, bl7) | 0;
        mid = mid + Math.imul(al7, bh7) | 0;
        mid = mid + Math.imul(ah7, bl7) | 0;
        hi = hi + Math.imul(ah7, bh7) | 0;
        lo = lo + Math.imul(al6, bl8) | 0;
        mid = mid + Math.imul(al6, bh8) | 0;
        mid = mid + Math.imul(ah6, bl8) | 0;
        hi = hi + Math.imul(ah6, bh8) | 0;
        lo = lo + Math.imul(al5, bl9) | 0;
        mid = mid + Math.imul(al5, bh9) | 0;
        mid = mid + Math.imul(ah5, bl9) | 0;
        hi = hi + Math.imul(ah5, bh9) | 0;
        var w14 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
        w14 &= 67108863;
        lo = Math.imul(al9, bl6);
        mid = Math.imul(al9, bh6);
        mid = mid + Math.imul(ah9, bl6) | 0;
        hi = Math.imul(ah9, bh6);
        lo = lo + Math.imul(al8, bl7) | 0;
        mid = mid + Math.imul(al8, bh7) | 0;
        mid = mid + Math.imul(ah8, bl7) | 0;
        hi = hi + Math.imul(ah8, bh7) | 0;
        lo = lo + Math.imul(al7, bl8) | 0;
        mid = mid + Math.imul(al7, bh8) | 0;
        mid = mid + Math.imul(ah7, bl8) | 0;
        hi = hi + Math.imul(ah7, bh8) | 0;
        lo = lo + Math.imul(al6, bl9) | 0;
        mid = mid + Math.imul(al6, bh9) | 0;
        mid = mid + Math.imul(ah6, bl9) | 0;
        hi = hi + Math.imul(ah6, bh9) | 0;
        var w15 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
        w15 &= 67108863;
        lo = Math.imul(al9, bl7);
        mid = Math.imul(al9, bh7);
        mid = mid + Math.imul(ah9, bl7) | 0;
        hi = Math.imul(ah9, bh7);
        lo = lo + Math.imul(al8, bl8) | 0;
        mid = mid + Math.imul(al8, bh8) | 0;
        mid = mid + Math.imul(ah8, bl8) | 0;
        hi = hi + Math.imul(ah8, bh8) | 0;
        lo = lo + Math.imul(al7, bl9) | 0;
        mid = mid + Math.imul(al7, bh9) | 0;
        mid = mid + Math.imul(ah7, bl9) | 0;
        hi = hi + Math.imul(ah7, bh9) | 0;
        var w16 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
        w16 &= 67108863;
        lo = Math.imul(al9, bl8);
        mid = Math.imul(al9, bh8);
        mid = mid + Math.imul(ah9, bl8) | 0;
        hi = Math.imul(ah9, bh8);
        lo = lo + Math.imul(al8, bl9) | 0;
        mid = mid + Math.imul(al8, bh9) | 0;
        mid = mid + Math.imul(ah8, bl9) | 0;
        hi = hi + Math.imul(ah8, bh9) | 0;
        var w17 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
        w17 &= 67108863;
        lo = Math.imul(al9, bl9);
        mid = Math.imul(al9, bh9);
        mid = mid + Math.imul(ah9, bl9) | 0;
        hi = Math.imul(ah9, bh9);
        var w18 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
        c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
        w18 &= 67108863;
        o[0] = w0;
        o[1] = w1;
        o[2] = w2;
        o[3] = w3;
        o[4] = w4;
        o[5] = w5;
        o[6] = w6;
        o[7] = w7;
        o[8] = w8;
        o[9] = w9;
        o[10] = w10;
        o[11] = w11;
        o[12] = w12;
        o[13] = w13;
        o[14] = w14;
        o[15] = w15;
        o[16] = w16;
        o[17] = w17;
        o[18] = w18;
        if (c !== 0) {
          o[19] = c;
          out.length++;
        }
        return out;
      };
      if (!Math.imul) {
        comb10MulTo = smallMulTo;
      }
      function bigMulTo(self, num, out) {
        out.negative = num.negative ^ self.negative;
        out.length = self.length + num.length;
        var carry = 0;
        var hncarry = 0;
        for (var k = 0; k < out.length - 1; k++) {
          var ncarry = hncarry;
          hncarry = 0;
          var rword = carry & 67108863;
          var maxJ = Math.min(k, num.length - 1);
          for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
            var i = k - j;
            var a = self.words[i] | 0;
            var b = num.words[j] | 0;
            var r = a * b;
            var lo = r & 67108863;
            ncarry = ncarry + (r / 67108864 | 0) | 0;
            lo = lo + rword | 0;
            rword = lo & 67108863;
            ncarry = ncarry + (lo >>> 26) | 0;
            hncarry += ncarry >>> 26;
            ncarry &= 67108863;
          }
          out.words[k] = rword;
          carry = ncarry;
          ncarry = hncarry;
        }
        if (carry !== 0) {
          out.words[k] = carry;
        } else {
          out.length--;
        }
        return out._strip();
      }
      function jumboMulTo(self, num, out) {
        return bigMulTo(self, num, out);
      }
      BN2.prototype.mulTo = function mulTo(num, out) {
        var res;
        var len = this.length + num.length;
        if (this.length === 10 && num.length === 10) {
          res = comb10MulTo(this, num, out);
        } else if (len < 63) {
          res = smallMulTo(this, num, out);
        } else if (len < 1024) {
          res = bigMulTo(this, num, out);
        } else {
          res = jumboMulTo(this, num, out);
        }
        return res;
      };
      function FFTM(x, y) {
        this.x = x;
        this.y = y;
      }
      FFTM.prototype.makeRBT = function makeRBT(N) {
        var t = new Array(N);
        var l = BN2.prototype._countBits(N) - 1;
        for (var i = 0; i < N; i++) {
          t[i] = this.revBin(i, l, N);
        }
        return t;
      };
      FFTM.prototype.revBin = function revBin(x, l, N) {
        if (x === 0 || x === N - 1)
          return x;
        var rb = 0;
        for (var i = 0; i < l; i++) {
          rb |= (x & 1) << l - i - 1;
          x >>= 1;
        }
        return rb;
      };
      FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N) {
        for (var i = 0; i < N; i++) {
          rtws[i] = rws[rbt[i]];
          itws[i] = iws[rbt[i]];
        }
      };
      FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N, rbt) {
        this.permute(rbt, rws, iws, rtws, itws, N);
        for (var s = 1; s < N; s <<= 1) {
          var l = s << 1;
          var rtwdf = Math.cos(2 * Math.PI / l);
          var itwdf = Math.sin(2 * Math.PI / l);
          for (var p = 0; p < N; p += l) {
            var rtwdf_ = rtwdf;
            var itwdf_ = itwdf;
            for (var j = 0; j < s; j++) {
              var re = rtws[p + j];
              var ie = itws[p + j];
              var ro = rtws[p + j + s];
              var io = itws[p + j + s];
              var rx = rtwdf_ * ro - itwdf_ * io;
              io = rtwdf_ * io + itwdf_ * ro;
              ro = rx;
              rtws[p + j] = re + ro;
              itws[p + j] = ie + io;
              rtws[p + j + s] = re - ro;
              itws[p + j + s] = ie - io;
              if (j !== l) {
                rx = rtwdf * rtwdf_ - itwdf * itwdf_;
                itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
                rtwdf_ = rx;
              }
            }
          }
        }
      };
      FFTM.prototype.guessLen13b = function guessLen13b(n, m) {
        var N = Math.max(m, n) | 1;
        var odd = N & 1;
        var i = 0;
        for (N = N / 2 | 0; N; N = N >>> 1) {
          i++;
        }
        return 1 << i + 1 + odd;
      };
      FFTM.prototype.conjugate = function conjugate(rws, iws, N) {
        if (N <= 1)
          return;
        for (var i = 0; i < N / 2; i++) {
          var t = rws[i];
          rws[i] = rws[N - i - 1];
          rws[N - i - 1] = t;
          t = iws[i];
          iws[i] = -iws[N - i - 1];
          iws[N - i - 1] = -t;
        }
      };
      FFTM.prototype.normalize13b = function normalize13b(ws, N) {
        var carry = 0;
        for (var i = 0; i < N / 2; i++) {
          var w = Math.round(ws[2 * i + 1] / N) * 8192 + Math.round(ws[2 * i] / N) + carry;
          ws[i] = w & 67108863;
          if (w < 67108864) {
            carry = 0;
          } else {
            carry = w / 67108864 | 0;
          }
        }
        return ws;
      };
      FFTM.prototype.convert13b = function convert13b(ws, len, rws, N) {
        var carry = 0;
        for (var i = 0; i < len; i++) {
          carry = carry + (ws[i] | 0);
          rws[2 * i] = carry & 8191;
          carry = carry >>> 13;
          rws[2 * i + 1] = carry & 8191;
          carry = carry >>> 13;
        }
        for (i = 2 * len; i < N; ++i) {
          rws[i] = 0;
        }
        assert(carry === 0);
        assert((carry & ~8191) === 0);
      };
      FFTM.prototype.stub = function stub(N) {
        var ph = new Array(N);
        for (var i = 0; i < N; i++) {
          ph[i] = 0;
        }
        return ph;
      };
      FFTM.prototype.mulp = function mulp(x, y, out) {
        var N = 2 * this.guessLen13b(x.length, y.length);
        var rbt = this.makeRBT(N);
        var _ = this.stub(N);
        var rws = new Array(N);
        var rwst = new Array(N);
        var iwst = new Array(N);
        var nrws = new Array(N);
        var nrwst = new Array(N);
        var niwst = new Array(N);
        var rmws = out.words;
        rmws.length = N;
        this.convert13b(x.words, x.length, rws, N);
        this.convert13b(y.words, y.length, nrws, N);
        this.transform(rws, _, rwst, iwst, N, rbt);
        this.transform(nrws, _, nrwst, niwst, N, rbt);
        for (var i = 0; i < N; i++) {
          var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
          iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
          rwst[i] = rx;
        }
        this.conjugate(rwst, iwst, N);
        this.transform(rwst, iwst, rmws, _, N, rbt);
        this.conjugate(rmws, _, N);
        this.normalize13b(rmws, N);
        out.negative = x.negative ^ y.negative;
        out.length = x.length + y.length;
        return out._strip();
      };
      BN2.prototype.mul = function mul(num) {
        var out = new BN2(null);
        out.words = new Array(this.length + num.length);
        return this.mulTo(num, out);
      };
      BN2.prototype.mulf = function mulf(num) {
        var out = new BN2(null);
        out.words = new Array(this.length + num.length);
        return jumboMulTo(this, num, out);
      };
      BN2.prototype.imul = function imul(num) {
        return this.clone().mulTo(num, this);
      };
      BN2.prototype.imuln = function imuln(num) {
        var isNegNum = num < 0;
        if (isNegNum)
          num = -num;
        assert(typeof num === "number");
        assert(num < 67108864);
        var carry = 0;
        for (var i = 0; i < this.length; i++) {
          var w = (this.words[i] | 0) * num;
          var lo = (w & 67108863) + (carry & 67108863);
          carry >>= 26;
          carry += w / 67108864 | 0;
          carry += lo >>> 26;
          this.words[i] = lo & 67108863;
        }
        if (carry !== 0) {
          this.words[i] = carry;
          this.length++;
        }
        return isNegNum ? this.ineg() : this;
      };
      BN2.prototype.muln = function muln(num) {
        return this.clone().imuln(num);
      };
      BN2.prototype.sqr = function sqr() {
        return this.mul(this);
      };
      BN2.prototype.isqr = function isqr() {
        return this.imul(this.clone());
      };
      BN2.prototype.pow = function pow(num) {
        var w = toBitArray(num);
        if (w.length === 0)
          return new BN2(1);
        var res = this;
        for (var i = 0; i < w.length; i++, res = res.sqr()) {
          if (w[i] !== 0)
            break;
        }
        if (++i < w.length) {
          for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
            if (w[i] === 0)
              continue;
            res = res.mul(q);
          }
        }
        return res;
      };
      BN2.prototype.iushln = function iushln(bits) {
        assert(typeof bits === "number" && bits >= 0);
        var r = bits % 26;
        var s = (bits - r) / 26;
        var carryMask = 67108863 >>> 26 - r << 26 - r;
        var i;
        if (r !== 0) {
          var carry = 0;
          for (i = 0; i < this.length; i++) {
            var newCarry = this.words[i] & carryMask;
            var c = (this.words[i] | 0) - newCarry << r;
            this.words[i] = c | carry;
            carry = newCarry >>> 26 - r;
          }
          if (carry) {
            this.words[i] = carry;
            this.length++;
          }
        }
        if (s !== 0) {
          for (i = this.length - 1; i >= 0; i--) {
            this.words[i + s] = this.words[i];
          }
          for (i = 0; i < s; i++) {
            this.words[i] = 0;
          }
          this.length += s;
        }
        return this._strip();
      };
      BN2.prototype.ishln = function ishln(bits) {
        assert(this.negative === 0);
        return this.iushln(bits);
      };
      BN2.prototype.iushrn = function iushrn(bits, hint, extended) {
        assert(typeof bits === "number" && bits >= 0);
        var h;
        if (hint) {
          h = (hint - hint % 26) / 26;
        } else {
          h = 0;
        }
        var r = bits % 26;
        var s = Math.min((bits - r) / 26, this.length);
        var mask = 67108863 ^ 67108863 >>> r << r;
        var maskedWords = extended;
        h -= s;
        h = Math.max(0, h);
        if (maskedWords) {
          for (var i = 0; i < s; i++) {
            maskedWords.words[i] = this.words[i];
          }
          maskedWords.length = s;
        }
        if (s === 0) {
        } else if (this.length > s) {
          this.length -= s;
          for (i = 0; i < this.length; i++) {
            this.words[i] = this.words[i + s];
          }
        } else {
          this.words[0] = 0;
          this.length = 1;
        }
        var carry = 0;
        for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
          var word = this.words[i] | 0;
          this.words[i] = carry << 26 - r | word >>> r;
          carry = word & mask;
        }
        if (maskedWords && carry !== 0) {
          maskedWords.words[maskedWords.length++] = carry;
        }
        if (this.length === 0) {
          this.words[0] = 0;
          this.length = 1;
        }
        return this._strip();
      };
      BN2.prototype.ishrn = function ishrn(bits, hint, extended) {
        assert(this.negative === 0);
        return this.iushrn(bits, hint, extended);
      };
      BN2.prototype.shln = function shln(bits) {
        return this.clone().ishln(bits);
      };
      BN2.prototype.ushln = function ushln(bits) {
        return this.clone().iushln(bits);
      };
      BN2.prototype.shrn = function shrn(bits) {
        return this.clone().ishrn(bits);
      };
      BN2.prototype.ushrn = function ushrn(bits) {
        return this.clone().iushrn(bits);
      };
      BN2.prototype.testn = function testn(bit) {
        assert(typeof bit === "number" && bit >= 0);
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s)
          return false;
        var w = this.words[s];
        return !!(w & q);
      };
      BN2.prototype.imaskn = function imaskn(bits) {
        assert(typeof bits === "number" && bits >= 0);
        var r = bits % 26;
        var s = (bits - r) / 26;
        assert(this.negative === 0, "imaskn works only with positive numbers");
        if (this.length <= s) {
          return this;
        }
        if (r !== 0) {
          s++;
        }
        this.length = Math.min(s, this.length);
        if (r !== 0) {
          var mask = 67108863 ^ 67108863 >>> r << r;
          this.words[this.length - 1] &= mask;
        }
        return this._strip();
      };
      BN2.prototype.maskn = function maskn(bits) {
        return this.clone().imaskn(bits);
      };
      BN2.prototype.iaddn = function iaddn(num) {
        assert(typeof num === "number");
        assert(num < 67108864);
        if (num < 0)
          return this.isubn(-num);
        if (this.negative !== 0) {
          if (this.length === 1 && (this.words[0] | 0) <= num) {
            this.words[0] = num - (this.words[0] | 0);
            this.negative = 0;
            return this;
          }
          this.negative = 0;
          this.isubn(num);
          this.negative = 1;
          return this;
        }
        return this._iaddn(num);
      };
      BN2.prototype._iaddn = function _iaddn(num) {
        this.words[0] += num;
        for (var i = 0; i < this.length && this.words[i] >= 67108864; i++) {
          this.words[i] -= 67108864;
          if (i === this.length - 1) {
            this.words[i + 1] = 1;
          } else {
            this.words[i + 1]++;
          }
        }
        this.length = Math.max(this.length, i + 1);
        return this;
      };
      BN2.prototype.isubn = function isubn(num) {
        assert(typeof num === "number");
        assert(num < 67108864);
        if (num < 0)
          return this.iaddn(-num);
        if (this.negative !== 0) {
          this.negative = 0;
          this.iaddn(num);
          this.negative = 1;
          return this;
        }
        this.words[0] -= num;
        if (this.length === 1 && this.words[0] < 0) {
          this.words[0] = -this.words[0];
          this.negative = 1;
        } else {
          for (var i = 0; i < this.length && this.words[i] < 0; i++) {
            this.words[i] += 67108864;
            this.words[i + 1] -= 1;
          }
        }
        return this._strip();
      };
      BN2.prototype.addn = function addn(num) {
        return this.clone().iaddn(num);
      };
      BN2.prototype.subn = function subn(num) {
        return this.clone().isubn(num);
      };
      BN2.prototype.iabs = function iabs() {
        this.negative = 0;
        return this;
      };
      BN2.prototype.abs = function abs() {
        return this.clone().iabs();
      };
      BN2.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
        var len = num.length + shift;
        var i;
        this._expand(len);
        var w;
        var carry = 0;
        for (i = 0; i < num.length; i++) {
          w = (this.words[i + shift] | 0) + carry;
          var right = (num.words[i] | 0) * mul;
          w -= right & 67108863;
          carry = (w >> 26) - (right / 67108864 | 0);
          this.words[i + shift] = w & 67108863;
        }
        for (; i < this.length - shift; i++) {
          w = (this.words[i + shift] | 0) + carry;
          carry = w >> 26;
          this.words[i + shift] = w & 67108863;
        }
        if (carry === 0)
          return this._strip();
        assert(carry === -1);
        carry = 0;
        for (i = 0; i < this.length; i++) {
          w = -(this.words[i] | 0) + carry;
          carry = w >> 26;
          this.words[i] = w & 67108863;
        }
        this.negative = 1;
        return this._strip();
      };
      BN2.prototype._wordDiv = function _wordDiv(num, mode) {
        var shift = this.length - num.length;
        var a = this.clone();
        var b = num;
        var bhi = b.words[b.length - 1] | 0;
        var bhiBits = this._countBits(bhi);
        shift = 26 - bhiBits;
        if (shift !== 0) {
          b = b.ushln(shift);
          a.iushln(shift);
          bhi = b.words[b.length - 1] | 0;
        }
        var m = a.length - b.length;
        var q;
        if (mode !== "mod") {
          q = new BN2(null);
          q.length = m + 1;
          q.words = new Array(q.length);
          for (var i = 0; i < q.length; i++) {
            q.words[i] = 0;
          }
        }
        var diff = a.clone()._ishlnsubmul(b, 1, m);
        if (diff.negative === 0) {
          a = diff;
          if (q) {
            q.words[m] = 1;
          }
        }
        for (var j = m - 1; j >= 0; j--) {
          var qj = (a.words[b.length + j] | 0) * 67108864 + (a.words[b.length + j - 1] | 0);
          qj = Math.min(qj / bhi | 0, 67108863);
          a._ishlnsubmul(b, qj, j);
          while (a.negative !== 0) {
            qj--;
            a.negative = 0;
            a._ishlnsubmul(b, 1, j);
            if (!a.isZero()) {
              a.negative ^= 1;
            }
          }
          if (q) {
            q.words[j] = qj;
          }
        }
        if (q) {
          q._strip();
        }
        a._strip();
        if (mode !== "div" && shift !== 0) {
          a.iushrn(shift);
        }
        return {
          div: q || null,
          mod: a
        };
      };
      BN2.prototype.divmod = function divmod(num, mode, positive) {
        assert(!num.isZero());
        if (this.isZero()) {
          return {
            div: new BN2(0),
            mod: new BN2(0)
          };
        }
        var div, mod, res;
        if (this.negative !== 0 && num.negative === 0) {
          res = this.neg().divmod(num, mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.iadd(num);
            }
          }
          return {
            div,
            mod
          };
        }
        if (this.negative === 0 && num.negative !== 0) {
          res = this.divmod(num.neg(), mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          return {
            div,
            mod: res.mod
          };
        }
        if ((this.negative & num.negative) !== 0) {
          res = this.neg().divmod(num.neg(), mode);
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.isub(num);
            }
          }
          return {
            div: res.div,
            mod
          };
        }
        if (num.length > this.length || this.cmp(num) < 0) {
          return {
            div: new BN2(0),
            mod: this
          };
        }
        if (num.length === 1) {
          if (mode === "div") {
            return {
              div: this.divn(num.words[0]),
              mod: null
            };
          }
          if (mode === "mod") {
            return {
              div: null,
              mod: new BN2(this.modrn(num.words[0]))
            };
          }
          return {
            div: this.divn(num.words[0]),
            mod: new BN2(this.modrn(num.words[0]))
          };
        }
        return this._wordDiv(num, mode);
      };
      BN2.prototype.div = function div(num) {
        return this.divmod(num, "div", false).div;
      };
      BN2.prototype.mod = function mod(num) {
        return this.divmod(num, "mod", false).mod;
      };
      BN2.prototype.umod = function umod(num) {
        return this.divmod(num, "mod", true).mod;
      };
      BN2.prototype.divRound = function divRound(num) {
        var dm = this.divmod(num);
        if (dm.mod.isZero())
          return dm.div;
        var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
        var half = num.ushrn(1);
        var r2 = num.andln(1);
        var cmp = mod.cmp(half);
        if (cmp < 0 || r2 === 1 && cmp === 0)
          return dm.div;
        return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
      };
      BN2.prototype.modrn = function modrn(num) {
        var isNegNum = num < 0;
        if (isNegNum)
          num = -num;
        assert(num <= 67108863);
        var p = (1 << 26) % num;
        var acc = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          acc = (p * acc + (this.words[i] | 0)) % num;
        }
        return isNegNum ? -acc : acc;
      };
      BN2.prototype.modn = function modn(num) {
        return this.modrn(num);
      };
      BN2.prototype.idivn = function idivn(num) {
        var isNegNum = num < 0;
        if (isNegNum)
          num = -num;
        assert(num <= 67108863);
        var carry = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          var w = (this.words[i] | 0) + carry * 67108864;
          this.words[i] = w / num | 0;
          carry = w % num;
        }
        this._strip();
        return isNegNum ? this.ineg() : this;
      };
      BN2.prototype.divn = function divn(num) {
        return this.clone().idivn(num);
      };
      BN2.prototype.egcd = function egcd(p) {
        assert(p.negative === 0);
        assert(!p.isZero());
        var x = this;
        var y = p.clone();
        if (x.negative !== 0) {
          x = x.umod(p);
        } else {
          x = x.clone();
        }
        var A = new BN2(1);
        var B = new BN2(0);
        var C = new BN2(0);
        var D = new BN2(1);
        var g = 0;
        while (x.isEven() && y.isEven()) {
          x.iushrn(1);
          y.iushrn(1);
          ++g;
        }
        var yp = y.clone();
        var xp = x.clone();
        while (!x.isZero()) {
          for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1)
            ;
          if (i > 0) {
            x.iushrn(i);
            while (i-- > 0) {
              if (A.isOdd() || B.isOdd()) {
                A.iadd(yp);
                B.isub(xp);
              }
              A.iushrn(1);
              B.iushrn(1);
            }
          }
          for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1)
            ;
          if (j > 0) {
            y.iushrn(j);
            while (j-- > 0) {
              if (C.isOdd() || D.isOdd()) {
                C.iadd(yp);
                D.isub(xp);
              }
              C.iushrn(1);
              D.iushrn(1);
            }
          }
          if (x.cmp(y) >= 0) {
            x.isub(y);
            A.isub(C);
            B.isub(D);
          } else {
            y.isub(x);
            C.isub(A);
            D.isub(B);
          }
        }
        return {
          a: C,
          b: D,
          gcd: y.iushln(g)
        };
      };
      BN2.prototype._invmp = function _invmp(p) {
        assert(p.negative === 0);
        assert(!p.isZero());
        var a = this;
        var b = p.clone();
        if (a.negative !== 0) {
          a = a.umod(p);
        } else {
          a = a.clone();
        }
        var x1 = new BN2(1);
        var x2 = new BN2(0);
        var delta = b.clone();
        while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
          for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1)
            ;
          if (i > 0) {
            a.iushrn(i);
            while (i-- > 0) {
              if (x1.isOdd()) {
                x1.iadd(delta);
              }
              x1.iushrn(1);
            }
          }
          for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1)
            ;
          if (j > 0) {
            b.iushrn(j);
            while (j-- > 0) {
              if (x2.isOdd()) {
                x2.iadd(delta);
              }
              x2.iushrn(1);
            }
          }
          if (a.cmp(b) >= 0) {
            a.isub(b);
            x1.isub(x2);
          } else {
            b.isub(a);
            x2.isub(x1);
          }
        }
        var res;
        if (a.cmpn(1) === 0) {
          res = x1;
        } else {
          res = x2;
        }
        if (res.cmpn(0) < 0) {
          res.iadd(p);
        }
        return res;
      };
      BN2.prototype.gcd = function gcd(num) {
        if (this.isZero())
          return num.abs();
        if (num.isZero())
          return this.abs();
        var a = this.clone();
        var b = num.clone();
        a.negative = 0;
        b.negative = 0;
        for (var shift = 0; a.isEven() && b.isEven(); shift++) {
          a.iushrn(1);
          b.iushrn(1);
        }
        do {
          while (a.isEven()) {
            a.iushrn(1);
          }
          while (b.isEven()) {
            b.iushrn(1);
          }
          var r = a.cmp(b);
          if (r < 0) {
            var t = a;
            a = b;
            b = t;
          } else if (r === 0 || b.cmpn(1) === 0) {
            break;
          }
          a.isub(b);
        } while (true);
        return b.iushln(shift);
      };
      BN2.prototype.invm = function invm(num) {
        return this.egcd(num).a.umod(num);
      };
      BN2.prototype.isEven = function isEven() {
        return (this.words[0] & 1) === 0;
      };
      BN2.prototype.isOdd = function isOdd() {
        return (this.words[0] & 1) === 1;
      };
      BN2.prototype.andln = function andln(num) {
        return this.words[0] & num;
      };
      BN2.prototype.bincn = function bincn(bit) {
        assert(typeof bit === "number");
        var r = bit % 26;
        var s = (bit - r) / 26;
        var q = 1 << r;
        if (this.length <= s) {
          this._expand(s + 1);
          this.words[s] |= q;
          return this;
        }
        var carry = q;
        for (var i = s; carry !== 0 && i < this.length; i++) {
          var w = this.words[i] | 0;
          w += carry;
          carry = w >>> 26;
          w &= 67108863;
          this.words[i] = w;
        }
        if (carry !== 0) {
          this.words[i] = carry;
          this.length++;
        }
        return this;
      };
      BN2.prototype.isZero = function isZero() {
        return this.length === 1 && this.words[0] === 0;
      };
      BN2.prototype.cmpn = function cmpn(num) {
        var negative = num < 0;
        if (this.negative !== 0 && !negative)
          return -1;
        if (this.negative === 0 && negative)
          return 1;
        this._strip();
        var res;
        if (this.length > 1) {
          res = 1;
        } else {
          if (negative) {
            num = -num;
          }
          assert(num <= 67108863, "Number is too big");
          var w = this.words[0] | 0;
          res = w === num ? 0 : w < num ? -1 : 1;
        }
        if (this.negative !== 0)
          return -res | 0;
        return res;
      };
      BN2.prototype.cmp = function cmp(num) {
        if (this.negative !== 0 && num.negative === 0)
          return -1;
        if (this.negative === 0 && num.negative !== 0)
          return 1;
        var res = this.ucmp(num);
        if (this.negative !== 0)
          return -res | 0;
        return res;
      };
      BN2.prototype.ucmp = function ucmp(num) {
        if (this.length > num.length)
          return 1;
        if (this.length < num.length)
          return -1;
        var res = 0;
        for (var i = this.length - 1; i >= 0; i--) {
          var a = this.words[i] | 0;
          var b = num.words[i] | 0;
          if (a === b)
            continue;
          if (a < b) {
            res = -1;
          } else if (a > b) {
            res = 1;
          }
          break;
        }
        return res;
      };
      BN2.prototype.gtn = function gtn(num) {
        return this.cmpn(num) === 1;
      };
      BN2.prototype.gt = function gt(num) {
        return this.cmp(num) === 1;
      };
      BN2.prototype.gten = function gten(num) {
        return this.cmpn(num) >= 0;
      };
      BN2.prototype.gte = function gte(num) {
        return this.cmp(num) >= 0;
      };
      BN2.prototype.ltn = function ltn(num) {
        return this.cmpn(num) === -1;
      };
      BN2.prototype.lt = function lt(num) {
        return this.cmp(num) === -1;
      };
      BN2.prototype.lten = function lten(num) {
        return this.cmpn(num) <= 0;
      };
      BN2.prototype.lte = function lte(num) {
        return this.cmp(num) <= 0;
      };
      BN2.prototype.eqn = function eqn(num) {
        return this.cmpn(num) === 0;
      };
      BN2.prototype.eq = function eq(num) {
        return this.cmp(num) === 0;
      };
      BN2.red = function red(num) {
        return new Red(num);
      };
      BN2.prototype.toRed = function toRed(ctx) {
        assert(!this.red, "Already a number in reduction context");
        assert(this.negative === 0, "red works only with positives");
        return ctx.convertTo(this)._forceRed(ctx);
      };
      BN2.prototype.fromRed = function fromRed() {
        assert(this.red, "fromRed works only with numbers in reduction context");
        return this.red.convertFrom(this);
      };
      BN2.prototype._forceRed = function _forceRed(ctx) {
        this.red = ctx;
        return this;
      };
      BN2.prototype.forceRed = function forceRed(ctx) {
        assert(!this.red, "Already a number in reduction context");
        return this._forceRed(ctx);
      };
      BN2.prototype.redAdd = function redAdd(num) {
        assert(this.red, "redAdd works only with red numbers");
        return this.red.add(this, num);
      };
      BN2.prototype.redIAdd = function redIAdd(num) {
        assert(this.red, "redIAdd works only with red numbers");
        return this.red.iadd(this, num);
      };
      BN2.prototype.redSub = function redSub(num) {
        assert(this.red, "redSub works only with red numbers");
        return this.red.sub(this, num);
      };
      BN2.prototype.redISub = function redISub(num) {
        assert(this.red, "redISub works only with red numbers");
        return this.red.isub(this, num);
      };
      BN2.prototype.redShl = function redShl(num) {
        assert(this.red, "redShl works only with red numbers");
        return this.red.shl(this, num);
      };
      BN2.prototype.redMul = function redMul(num) {
        assert(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.mul(this, num);
      };
      BN2.prototype.redIMul = function redIMul(num) {
        assert(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.imul(this, num);
      };
      BN2.prototype.redSqr = function redSqr() {
        assert(this.red, "redSqr works only with red numbers");
        this.red._verify1(this);
        return this.red.sqr(this);
      };
      BN2.prototype.redISqr = function redISqr() {
        assert(this.red, "redISqr works only with red numbers");
        this.red._verify1(this);
        return this.red.isqr(this);
      };
      BN2.prototype.redSqrt = function redSqrt() {
        assert(this.red, "redSqrt works only with red numbers");
        this.red._verify1(this);
        return this.red.sqrt(this);
      };
      BN2.prototype.redInvm = function redInvm() {
        assert(this.red, "redInvm works only with red numbers");
        this.red._verify1(this);
        return this.red.invm(this);
      };
      BN2.prototype.redNeg = function redNeg() {
        assert(this.red, "redNeg works only with red numbers");
        this.red._verify1(this);
        return this.red.neg(this);
      };
      BN2.prototype.redPow = function redPow(num) {
        assert(this.red && !num.red, "redPow(normalNum)");
        this.red._verify1(this);
        return this.red.pow(this, num);
      };
      var primes = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function MPrime(name2, p) {
        this.name = name2;
        this.p = new BN2(p, 16);
        this.n = this.p.bitLength();
        this.k = new BN2(1).iushln(this.n).isub(this.p);
        this.tmp = this._tmp();
      }
      MPrime.prototype._tmp = function _tmp() {
        var tmp = new BN2(null);
        tmp.words = new Array(Math.ceil(this.n / 13));
        return tmp;
      };
      MPrime.prototype.ireduce = function ireduce(num) {
        var r = num;
        var rlen;
        do {
          this.split(r, this.tmp);
          r = this.imulK(r);
          r = r.iadd(this.tmp);
          rlen = r.bitLength();
        } while (rlen > this.n);
        var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
        if (cmp === 0) {
          r.words[0] = 0;
          r.length = 1;
        } else if (cmp > 0) {
          r.isub(this.p);
        } else {
          if (r.strip !== void 0) {
            r.strip();
          } else {
            r._strip();
          }
        }
        return r;
      };
      MPrime.prototype.split = function split(input, out) {
        input.iushrn(this.n, 0, out);
      };
      MPrime.prototype.imulK = function imulK(num) {
        return num.imul(this.k);
      };
      function K256() {
        MPrime.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      inherits(K256, MPrime);
      K256.prototype.split = function split(input, output) {
        var mask = 4194303;
        var outLen = Math.min(input.length, 9);
        for (var i = 0; i < outLen; i++) {
          output.words[i] = input.words[i];
        }
        output.length = outLen;
        if (input.length <= 9) {
          input.words[0] = 0;
          input.length = 1;
          return;
        }
        var prev = input.words[9];
        output.words[output.length++] = prev & mask;
        for (i = 10; i < input.length; i++) {
          var next = input.words[i] | 0;
          input.words[i - 10] = (next & mask) << 4 | prev >>> 22;
          prev = next;
        }
        prev >>>= 22;
        input.words[i - 10] = prev;
        if (prev === 0 && input.length > 10) {
          input.length -= 10;
        } else {
          input.length -= 9;
        }
      };
      K256.prototype.imulK = function imulK(num) {
        num.words[num.length] = 0;
        num.words[num.length + 1] = 0;
        num.length += 2;
        var lo = 0;
        for (var i = 0; i < num.length; i++) {
          var w = num.words[i] | 0;
          lo += w * 977;
          num.words[i] = lo & 67108863;
          lo = w * 64 + (lo / 67108864 | 0);
        }
        if (num.words[num.length - 1] === 0) {
          num.length--;
          if (num.words[num.length - 1] === 0) {
            num.length--;
          }
        }
        return num;
      };
      function P224() {
        MPrime.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      inherits(P224, MPrime);
      function P192() {
        MPrime.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      inherits(P192, MPrime);
      function P25519() {
        MPrime.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      inherits(P25519, MPrime);
      P25519.prototype.imulK = function imulK(num) {
        var carry = 0;
        for (var i = 0; i < num.length; i++) {
          var hi = (num.words[i] | 0) * 19 + carry;
          var lo = hi & 67108863;
          hi >>>= 26;
          num.words[i] = lo;
          carry = hi;
        }
        if (carry !== 0) {
          num.words[num.length++] = carry;
        }
        return num;
      };
      BN2._prime = function prime(name2) {
        if (primes[name2])
          return primes[name2];
        var prime2;
        if (name2 === "k256") {
          prime2 = new K256();
        } else if (name2 === "p224") {
          prime2 = new P224();
        } else if (name2 === "p192") {
          prime2 = new P192();
        } else if (name2 === "p25519") {
          prime2 = new P25519();
        } else {
          throw new Error("Unknown prime " + name2);
        }
        primes[name2] = prime2;
        return prime2;
      };
      function Red(m) {
        if (typeof m === "string") {
          var prime = BN2._prime(m);
          this.m = prime.p;
          this.prime = prime;
        } else {
          assert(m.gtn(1), "modulus must be greater than 1");
          this.m = m;
          this.prime = null;
        }
      }
      Red.prototype._verify1 = function _verify1(a) {
        assert(a.negative === 0, "red works only with positives");
        assert(a.red, "red works only with red numbers");
      };
      Red.prototype._verify2 = function _verify2(a, b) {
        assert((a.negative | b.negative) === 0, "red works only with positives");
        assert(
          a.red && a.red === b.red,
          "red works only with red numbers"
        );
      };
      Red.prototype.imod = function imod(a) {
        if (this.prime)
          return this.prime.ireduce(a)._forceRed(this);
        move(a, a.umod(this.m)._forceRed(this));
        return a;
      };
      Red.prototype.neg = function neg(a) {
        if (a.isZero()) {
          return a.clone();
        }
        return this.m.sub(a)._forceRed(this);
      };
      Red.prototype.add = function add(a, b) {
        this._verify2(a, b);
        var res = a.add(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.iadd = function iadd(a, b) {
        this._verify2(a, b);
        var res = a.iadd(b);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res;
      };
      Red.prototype.sub = function sub(a, b) {
        this._verify2(a, b);
        var res = a.sub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.isub = function isub(a, b) {
        this._verify2(a, b);
        var res = a.isub(b);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res;
      };
      Red.prototype.shl = function shl(a, num) {
        this._verify1(a);
        return this.imod(a.ushln(num));
      };
      Red.prototype.imul = function imul(a, b) {
        this._verify2(a, b);
        return this.imod(a.imul(b));
      };
      Red.prototype.mul = function mul(a, b) {
        this._verify2(a, b);
        return this.imod(a.mul(b));
      };
      Red.prototype.isqr = function isqr(a) {
        return this.imul(a, a.clone());
      };
      Red.prototype.sqr = function sqr(a) {
        return this.mul(a, a);
      };
      Red.prototype.sqrt = function sqrt(a) {
        if (a.isZero())
          return a.clone();
        var mod3 = this.m.andln(3);
        assert(mod3 % 2 === 1);
        if (mod3 === 3) {
          var pow = this.m.add(new BN2(1)).iushrn(2);
          return this.pow(a, pow);
        }
        var q = this.m.subn(1);
        var s = 0;
        while (!q.isZero() && q.andln(1) === 0) {
          s++;
          q.iushrn(1);
        }
        assert(!q.isZero());
        var one = new BN2(1).toRed(this);
        var nOne = one.redNeg();
        var lpow = this.m.subn(1).iushrn(1);
        var z = this.m.bitLength();
        z = new BN2(2 * z * z).toRed(this);
        while (this.pow(z, lpow).cmp(nOne) !== 0) {
          z.redIAdd(nOne);
        }
        var c = this.pow(z, q);
        var r = this.pow(a, q.addn(1).iushrn(1));
        var t = this.pow(a, q);
        var m = s;
        while (t.cmp(one) !== 0) {
          var tmp = t;
          for (var i = 0; tmp.cmp(one) !== 0; i++) {
            tmp = tmp.redSqr();
          }
          assert(i < m);
          var b = this.pow(c, new BN2(1).iushln(m - i - 1));
          r = r.redMul(b);
          c = b.redSqr();
          t = t.redMul(c);
          m = i;
        }
        return r;
      };
      Red.prototype.invm = function invm(a) {
        var inv = a._invmp(this.m);
        if (inv.negative !== 0) {
          inv.negative = 0;
          return this.imod(inv).redNeg();
        } else {
          return this.imod(inv);
        }
      };
      Red.prototype.pow = function pow(a, num) {
        if (num.isZero())
          return new BN2(1).toRed(this);
        if (num.cmpn(1) === 0)
          return a.clone();
        var windowSize = 4;
        var wnd = new Array(1 << windowSize);
        wnd[0] = new BN2(1).toRed(this);
        wnd[1] = a;
        for (var i = 2; i < wnd.length; i++) {
          wnd[i] = this.mul(wnd[i - 1], a);
        }
        var res = wnd[0];
        var current = 0;
        var currentLen = 0;
        var start = num.bitLength() % 26;
        if (start === 0) {
          start = 26;
        }
        for (i = num.length - 1; i >= 0; i--) {
          var word = num.words[i];
          for (var j = start - 1; j >= 0; j--) {
            var bit = word >> j & 1;
            if (res !== wnd[0]) {
              res = this.sqr(res);
            }
            if (bit === 0 && current === 0) {
              currentLen = 0;
              continue;
            }
            current <<= 1;
            current |= bit;
            currentLen++;
            if (currentLen !== windowSize && (i !== 0 || j !== 0))
              continue;
            res = this.mul(res, wnd[current]);
            currentLen = 0;
            current = 0;
          }
          start = 26;
        }
        return res;
      };
      Red.prototype.convertTo = function convertTo(num) {
        var r = num.umod(this.m);
        return r === num ? r.clone() : r;
      };
      Red.prototype.convertFrom = function convertFrom(num) {
        var res = num.clone();
        res.red = null;
        return res;
      };
      BN2.mont = function mont(num) {
        return new Mont(num);
      };
      function Mont(m) {
        Red.call(this, m);
        this.shift = this.m.bitLength();
        if (this.shift % 26 !== 0) {
          this.shift += 26 - this.shift % 26;
        }
        this.r = new BN2(1).iushln(this.shift);
        this.r2 = this.imod(this.r.sqr());
        this.rinv = this.r._invmp(this.m);
        this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
        this.minv = this.minv.umod(this.r);
        this.minv = this.r.sub(this.minv);
      }
      inherits(Mont, Red);
      Mont.prototype.convertTo = function convertTo(num) {
        return this.imod(num.ushln(this.shift));
      };
      Mont.prototype.convertFrom = function convertFrom(num) {
        var r = this.imod(num.mul(this.rinv));
        r.red = null;
        return r;
      };
      Mont.prototype.imul = function imul(a, b) {
        if (a.isZero() || b.isZero()) {
          a.words[0] = 0;
          a.length = 1;
          return a;
        }
        var t = a.imul(b);
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u = t.isub(c).iushrn(this.shift);
        var res = u;
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m);
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.mul = function mul(a, b) {
        if (a.isZero() || b.isZero())
          return new BN2(0)._forceRed(this);
        var t = a.mul(b);
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u = t.isub(c).iushrn(this.shift);
        var res = u;
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m);
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.invm = function invm(a) {
        var res = this.imod(a._invmp(this.m).mul(this.r2));
        return res._forceRed(this);
      };
    })(typeof module === "undefined" || module, exports);
  }
});

// lib/context/index.ts
import React, { createContext } from "react";
var DaoContext = createContext({
  collection: "",
  chain: "MAINNET"
});
var BuilderDAO = ({ collection, chain, children }) => {
  return React.createElement(DaoContext.Provider, {
    children: React.createElement("div", {
      children,
      context: DaoContext
    }),
    value: { collection, chain }
  });
};

// lib/hooks/useAuction.ts
import { useEffect, useState } from "react";
import { useContractEvent } from "wagmi";
import { constants } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils.js";

// lib/abis/auction.ts
var abi = [
  {
    inputs: [
      { internalType: "address", name: "_manager", type: "address" },
      { internalType: "address", name: "_weth", type: "address" }
    ],
    stateMutability: "payable",
    type: "constructor"
  },
  { inputs: [], name: "ADDRESS_ZERO", type: "error" },
  { inputs: [], name: "ALREADY_INITIALIZED", type: "error" },
  { inputs: [], name: "AUCTION_ACTIVE", type: "error" },
  { inputs: [], name: "AUCTION_CREATE_FAILED_TO_LAUNCH", type: "error" },
  { inputs: [], name: "AUCTION_NOT_STARTED", type: "error" },
  { inputs: [], name: "AUCTION_OVER", type: "error" },
  { inputs: [], name: "AUCTION_SETTLED", type: "error" },
  { inputs: [], name: "DELEGATE_CALL_FAILED", type: "error" },
  { inputs: [], name: "FAILING_WETH_TRANSFER", type: "error" },
  { inputs: [], name: "INITIALIZING", type: "error" },
  { inputs: [], name: "INSOLVENT", type: "error" },
  { inputs: [], name: "INVALID_TARGET", type: "error" },
  { inputs: [], name: "INVALID_TOKEN_ID", type: "error" },
  {
    inputs: [{ internalType: "address", name: "impl", type: "address" }],
    name: "INVALID_UPGRADE",
    type: "error"
  },
  { inputs: [], name: "MINIMUM_BID_NOT_MET", type: "error" },
  { inputs: [], name: "NOT_INITIALIZING", type: "error" },
  { inputs: [], name: "ONLY_CALL", type: "error" },
  { inputs: [], name: "ONLY_DELEGATECALL", type: "error" },
  { inputs: [], name: "ONLY_MANAGER", type: "error" },
  { inputs: [], name: "ONLY_OWNER", type: "error" },
  { inputs: [], name: "ONLY_PENDING_OWNER", type: "error" },
  { inputs: [], name: "ONLY_PROXY", type: "error" },
  { inputs: [], name: "ONLY_UUPS", type: "error" },
  { inputs: [], name: "PAUSED", type: "error" },
  { inputs: [], name: "REENTRANCY", type: "error" },
  { inputs: [], name: "RESERVE_PRICE_NOT_MET", type: "error" },
  { inputs: [], name: "UNPAUSED", type: "error" },
  { inputs: [], name: "UNSAFE_CAST", type: "error" },
  { inputs: [], name: "UNSUPPORTED_UUID", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address",
        name: "bidder",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      { indexed: false, internalType: "bool", name: "extended", type: "bool" },
      {
        indexed: false,
        internalType: "uint256",
        name: "endTime",
        type: "uint256"
      }
    ],
    name: "AuctionBid",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endTime",
        type: "uint256"
      }
    ],
    name: "AuctionCreated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address",
        name: "winner",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "AuctionSettled",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "duration",
        type: "uint256"
      }
    ],
    name: "DurationUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "version",
        type: "uint256"
      }
    ],
    name: "Initialized",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "minBidIncrementPercentage",
        type: "uint256"
      }
    ],
    name: "MinBidIncrementPercentageUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "canceledOwner",
        type: "address"
      }
    ],
    name: "OwnerCanceled",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "pendingOwner",
        type: "address"
      }
    ],
    name: "OwnerPending",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "prevOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnerUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address"
      }
    ],
    name: "Paused",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "reservePrice",
        type: "uint256"
      }
    ],
    name: "ReservePriceUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "timeBuffer",
        type: "uint256"
      }
    ],
    name: "TimeBufferUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address"
      }
    ],
    name: "Unpaused",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "impl",
        type: "address"
      }
    ],
    name: "Upgraded",
    type: "event"
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "auction",
    outputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "highestBid", type: "uint256" },
      { internalType: "address", name: "highestBidder", type: "address" },
      { internalType: "uint40", name: "startTime", type: "uint40" },
      { internalType: "uint40", name: "endTime", type: "uint40" },
      { internalType: "bool", name: "settled", type: "bool" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "cancelOwnershipTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
    name: "createBid",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "duration",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_token", type: "address" },
      { internalType: "address", name: "_founder", type: "address" },
      { internalType: "address", name: "_treasury", type: "address" },
      { internalType: "uint256", name: "_duration", type: "uint256" },
      { internalType: "uint256", name: "_reservePrice", type: "uint256" }
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "minBidIncrement",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "pendingOwner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "reservePrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_newOwner", type: "address" }],
    name: "safeTransferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_duration", type: "uint256" }],
    name: "setDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_percentage", type: "uint256" }],
    name: "setMinimumBidIncrement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_reservePrice", type: "uint256" }],
    name: "setReservePrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_timeBuffer", type: "uint256" }],
    name: "setTimeBuffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "settleAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "settleCurrentAndCreateNewAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "timeBuffer",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "token",
    outputs: [{ internalType: "contract Token", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "treasury",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_newImpl", type: "address" }],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_newImpl", type: "address" },
      { internalType: "bytes", name: "_data", type: "bytes" }
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  }
];
var auction_default = abi;

// lib/abis/token.ts
var abi2 = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_manager",
        type: "address"
      }
    ],
    stateMutability: "payable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "ADDRESS_ZERO",
    type: "error"
  },
  {
    inputs: [],
    name: "ALREADY_INITIALIZED",
    type: "error"
  },
  {
    inputs: [],
    name: "ALREADY_MINTED",
    type: "error"
  },
  {
    inputs: [],
    name: "DELEGATE_CALL_FAILED",
    type: "error"
  },
  {
    inputs: [],
    name: "EXPIRED_SIGNATURE",
    type: "error"
  },
  {
    inputs: [],
    name: "INITIALIZING",
    type: "error"
  },
  {
    inputs: [],
    name: "INVALID_APPROVAL",
    type: "error"
  },
  {
    inputs: [],
    name: "INVALID_FOUNDER_OWNERSHIP",
    type: "error"
  },
  {
    inputs: [],
    name: "INVALID_OWNER",
    type: "error"
  },
  {
    inputs: [],
    name: "INVALID_RECIPIENT",
    type: "error"
  },
  {
    inputs: [],
    name: "INVALID_SIGNATURE",
    type: "error"
  },
  {
    inputs: [],
    name: "INVALID_TARGET",
    type: "error"
  },
  {
    inputs: [],
    name: "INVALID_TIMESTAMP",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "impl",
        type: "address"
      }
    ],
    name: "INVALID_UPGRADE",
    type: "error"
  },
  {
    inputs: [],
    name: "NOT_INITIALIZING",
    type: "error"
  },
  {
    inputs: [],
    name: "NOT_MINTED",
    type: "error"
  },
  {
    inputs: [],
    name: "NO_METADATA_GENERATED",
    type: "error"
  },
  {
    inputs: [],
    name: "ONLY_AUCTION",
    type: "error"
  },
  {
    inputs: [],
    name: "ONLY_CALL",
    type: "error"
  },
  {
    inputs: [],
    name: "ONLY_DELEGATECALL",
    type: "error"
  },
  {
    inputs: [],
    name: "ONLY_MANAGER",
    type: "error"
  },
  {
    inputs: [],
    name: "ONLY_OWNER",
    type: "error"
  },
  {
    inputs: [],
    name: "ONLY_PENDING_OWNER",
    type: "error"
  },
  {
    inputs: [],
    name: "ONLY_PROXY",
    type: "error"
  },
  {
    inputs: [],
    name: "ONLY_UUPS",
    type: "error"
  },
  {
    inputs: [],
    name: "REENTRANCY",
    type: "error"
  },
  {
    inputs: [],
    name: "UNSUPPORTED_UUID",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool"
      }
    ],
    name: "ApprovalForAll",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "delegator",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      }
    ],
    name: "DelegateChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "delegate",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "prevTotalVotes",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newTotalVotes",
        type: "uint256"
      }
    ],
    name: "DelegateVotesChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "wallet",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "ownershipPct",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "vestExpiry",
            type: "uint256"
          }
        ],
        indexed: false,
        internalType: "struct IManager.FounderParams[]",
        name: "newFounders",
        type: "tuple[]"
      }
    ],
    name: "FounderAllocationsCleared",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "version",
        type: "uint256"
      }
    ],
    name: "Initialized",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "baseTokenId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "founderId",
        type: "uint256"
      },
      {
        components: [
          {
            internalType: "address",
            name: "wallet",
            type: "address"
          },
          {
            internalType: "uint8",
            name: "ownershipPct",
            type: "uint8"
          },
          {
            internalType: "uint32",
            name: "vestExpiry",
            type: "uint32"
          }
        ],
        indexed: false,
        internalType: "struct TokenTypesV1.Founder",
        name: "founder",
        type: "tuple"
      }
    ],
    name: "MintScheduled",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "baseTokenId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "founderId",
        type: "uint256"
      },
      {
        components: [
          {
            internalType: "address",
            name: "wallet",
            type: "address"
          },
          {
            internalType: "uint8",
            name: "ownershipPct",
            type: "uint8"
          },
          {
            internalType: "uint32",
            name: "vestExpiry",
            type: "uint32"
          }
        ],
        indexed: false,
        internalType: "struct TokenTypesV1.Founder",
        name: "founder",
        type: "tuple"
      }
    ],
    name: "MintUnscheduled",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "canceledOwner",
        type: "address"
      }
    ],
    name: "OwnerCanceled",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "pendingOwner",
        type: "address"
      }
    ],
    name: "OwnerPending",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "prevOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnerUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "impl",
        type: "address"
      }
    ],
    name: "Upgraded",
    type: "event"
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "auction",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256"
      }
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "cancelOwnershipTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "contractURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address"
      }
    ],
    name: "delegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address"
      },
      {
        internalType: "address",
        name: "_to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256"
      },
      {
        internalType: "uint8",
        name: "_v",
        type: "uint8"
      },
      {
        internalType: "bytes32",
        name: "_r",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "_s",
        type: "bytes32"
      }
    ],
    name: "delegateBySig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address"
      }
    ],
    name: "delegates",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256"
      }
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_founderId",
        type: "uint256"
      }
    ],
    name: "getFounder",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "wallet",
            type: "address"
          },
          {
            internalType: "uint8",
            name: "ownershipPct",
            type: "uint8"
          },
          {
            internalType: "uint32",
            name: "vestExpiry",
            type: "uint32"
          }
        ],
        internalType: "struct TokenTypesV1.Founder",
        name: "",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getFounders",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "wallet",
            type: "address"
          },
          {
            internalType: "uint8",
            name: "ownershipPct",
            type: "uint8"
          },
          {
            internalType: "uint32",
            name: "vestExpiry",
            type: "uint32"
          }
        ],
        internalType: "struct TokenTypesV1.Founder[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_timestamp",
        type: "uint256"
      }
    ],
    name: "getPastVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256"
      }
    ],
    name: "getScheduledRecipient",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "wallet",
            type: "address"
          },
          {
            internalType: "uint8",
            name: "ownershipPct",
            type: "uint8"
          },
          {
            internalType: "uint32",
            name: "vestExpiry",
            type: "uint32"
          }
        ],
        internalType: "struct TokenTypesV1.Founder",
        name: "",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address"
      }
    ],
    name: "getVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "wallet",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "ownershipPct",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "vestExpiry",
            type: "uint256"
          }
        ],
        internalType: "struct IManager.FounderParams[]",
        name: "_founders",
        type: "tuple[]"
      },
      {
        internalType: "bytes",
        name: "_initStrings",
        type: "bytes"
      },
      {
        internalType: "address",
        name: "_metadataRenderer",
        type: "address"
      },
      {
        internalType: "address",
        name: "_auction",
        type: "address"
      },
      {
        internalType: "address",
        name: "_initialOwner",
        type: "address"
      }
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "_operator",
        type: "address"
      }
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "metadataRenderer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address"
      }
    ],
    name: "nonce",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "onFirstAuctionStarted",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256"
      }
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "pendingOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address"
      },
      {
        internalType: "address",
        name: "_to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256"
      }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address"
      },
      {
        internalType: "address",
        name: "_to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes"
      }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newOwner",
        type: "address"
      }
    ],
    name: "safeTransferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_operator",
        type: "address"
      },
      {
        internalType: "bool",
        name: "_approved",
        type: "bool"
      }
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "_interfaceId",
        type: "bytes4"
      }
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256"
      }
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalFounderOwnership",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalFounders",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address"
      },
      {
        internalType: "address",
        name: "_to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "wallet",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "ownershipPct",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "vestExpiry",
            type: "uint256"
          }
        ],
        internalType: "struct IManager.FounderParams[]",
        name: "newFounders",
        type: "tuple[]"
      }
    ],
    name: "updateFounders",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newImpl",
        type: "address"
      }
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newImpl",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes"
      }
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  }
];
var token_default = abi2;

// lib/queries/utils.ts
var fetchDataWithQuery = async (query7, variables = {}, url = "https://api.zora.co/graphql") => {
  try {
    const response = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ query: query7, variables })
    });
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

// lib/utils/index.ts
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
dayjs.extend(relativeTime);
var logWarning = (type, collection, chain = "MAINNET") => {
  console.warn(
    `BUILDER: ${type}. Double check that the collection address and chain are correct or retry the query.

collection: ${collection}
chain: ${chain}`
  );
};
var trunc = (address) => {
  if (!address)
    return "";
  return address.substring(0, 6) + "..." + address.substring(address.length - 4);
};
var fetchEnsData = async (address) => {
  if (!address)
    return {};
  try {
    const response = await fetch("https://api.ensideas.com/ens/resolve/" + address);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return {};
  }
};
var relative = (timestamp) => {
  if (!timestamp)
    return "";
  return dayjs.unix(timestamp / 1e3).fromNow(false);
};

// lib/queries/fetchAuctionData.ts
var fetchAuctionData = async ({
  collection,
  chain
}) => {
  const response = await fetchDataWithQuery(query, { collection, chain });
  if (!response) {
    logWarning("no_data_from_api", collection, chain);
    return null;
  }
  const data = formatQueryData(response, chain);
  if (!data)
    return null;
  return data;
};
var formatQueryData = (data, chain) => {
  const { data: result, errors } = data;
  const auctionData = result?.nouns?.nounsActiveMarket;
  if (errors) {
    logWarning("query_error", "", chain);
    return null;
  }
  const auction = {
    auctionId: Number(auctionData?.tokenId),
    startTime: Number(auctionData?.startTime) * 1e3,
    endTime: Number(auctionData?.endTime) * 1e3,
    highestBid: String(auctionData?.highestBidPrice?.nativePrice?.decimal),
    highestBidder: auctionData?.highestBidder,
    minPctIncrease: String(auctionData?.minBidIncrementPercentage),
    chain
  };
  return auction;
};
var query = `query GetCurrentAuction($collection: String!, $chain: Chain!) {
  nouns {
    nounsActiveMarket(
      where: {collectionAddress: $collection}
      network: {network: ETHEREUM, chain: $chain}
    ) {
      tokenId
      startTime
      endTime
      highestBidder
      highestBidPrice {
        nativePrice {
          decimal
        }
      }
      minBidIncrementPercentage
    }
  }
}`;

// lib/queries/fetchCollectionTokens.ts
var fetchCollectionTokens = async ({
  collection,
  chain
}) => {
  const response = await fetchDataWithQuery(query2, { collection, chain });
  if (!response) {
    logWarning("no_data_from_api", collection, chain);
    return null;
  }
  const data = formatQueryData2(response, chain);
  if (!data)
    return null;
  return data;
};
var formatQueryData2 = (data, chain) => {
  const { data: result, errors } = data;
  const tokenData = result?.tokens?.nodes;
  const marketData = result?.nouns?.nounsMarkets?.nodes;
  if (errors) {
    logWarning("query_error", "", chain);
    return null;
  }
  const auctionData = marketData.map((rawData) => {
    const amount = rawData?.highestBidPrice?.nativePrice?.decimal;
    return {
      tokenId: Number(rawData?.tokenId),
      winner: rawData?.winner ?? "",
      amount: amount ? String(amount) : "0.00",
      startTime: Number(rawData?.startTime) * 1e3,
      endTime: Number(rawData?.endTime) * 1e3
    };
  });
  const tokens = tokenData.map((rawData) => {
    const { token, events } = rawData;
    const mintData = events[0]?.transactionInfo;
    return {
      id: Number(token?.tokenId),
      owner: token?.owner,
      name: token?.name,
      description: token?.description,
      imageUrl: token?.image?.url,
      chain,
      attributes: token?.attributes?.map((attribute) => {
        return {
          label: attribute?.traitType,
          value: attribute?.value
        };
      }),
      mintInfo: {
        blockNumber: Number(mintData?.blockNumber),
        blockTimestamp: Date.parse(mintData?.blockTimestamp),
        transactionHash: mintData?.transactionHash
      },
      auctionInfo: auctionData.find((d) => {
        return d?.tokenId === Number(token?.tokenId);
      }) ?? {}
    };
  });
  return tokens;
};
var query2 = `query GetCollection($collection: [String!], $chain: Chain!) {
  tokens(
    networks: {network: ETHEREUM, chain: $chain}
    where: {collectionAddresses: $collection}
    pagination: {limit: 500}
    sort: {sortKey: MINTED, sortDirection: ASC}
  ) {
    nodes {
      token {
        tokenId
        owner
        name
        description
        image {
          url
        }
        attributes {
          traitType
          value
        }
      }
      events(filter: {eventTypes: MINT_EVENT}) {
        transactionInfo {
          blockNumber
          blockTimestamp
          transactionHash
        }
      }
    }
  }
  nouns {
    nounsMarkets(
      filter: {nounsMarketType: NOUNS_BUILDER_AUCTION}
      networks: {network: ETHEREUM, chain: $chain}
      where: {collectionAddresses: $collection}
      pagination: {limit: 250}
      sort: {sortKey: CREATED, sortDirection: ASC}
    ) {
      nodes {
        status
        tokenId
        startTime
        endTime
        winner
        highestBidPrice {
          nativePrice {
            decimal
          }
        }
      }
    }
  }
}`;

// lib/queries/fetchDaoData.ts
var fetchDaoData = async ({ collection, chain }) => {
  const response = await fetchDataWithQuery(query3, { collection, chain });
  if (!response) {
    logWarning("no_data_from_api", collection, chain);
    return null;
  }
  const data = formatQueryData3(response, chain);
  if (!data)
    return null;
  return data;
};
var formatQueryData3 = (data, chain) => {
  const { data: result, errors } = data;
  const stats = result?.aggregateStat;
  const info = result?.nouns?.nounsDaos?.nodes[0];
  if (errors) {
    logWarning("query_error", "", chain);
    return null;
  }
  return {
    name: info?.name,
    symbol: info?.symbol,
    owners: stats?.ownerCount,
    totalSupply: stats?.nftCount,
    contracts: {
      auction: info?.auctionAddress,
      collection: info?.collectionAddress,
      governor: info?.governorAddress,
      metadata: info?.metadataAddress,
      treasury: info?.treasuryAddress
    },
    chain,
    chainId: chain === "MAINNET" ? 1 : 5
  };
};
var query3 = `query GetDAO($collection: [String!], $chain: Chain!) {
  nouns {
    nounsDaos(
      where: {collectionAddresses: $collection}
      networks: {network: ETHEREUM, chain: $chain}
    ) {
      nodes {
        name
        symbol
        auctionAddress
        collectionAddress
        governorAddress
        metadataAddress
        treasuryAddress
      }
    }
  }
  aggregateStat {
    nftCount(
      networks: {network: ETHEREUM, chain: $chain}
      where: {collectionAddresses: $collection}
    )
    ownerCount(
      networks: {network: ETHEREUM, chain: $chain}
      where: {collectionAddresses: $collection}
    )
  }
}`;

// lib/queries/fetchMembers.ts
var fetchMembers = async ({
  collection,
  chain
}) => {
  const response = await fetchDataWithQuery(query4, { collection, chain });
  if (!response) {
    logWarning("no_data_from_api", collection, chain);
    return [];
  }
  const data = formatQueryData4(response, chain);
  if (!data)
    return [];
  return data ?? [];
};
var formatQueryData4 = (data, chain) => {
  const { data: result, errors } = data;
  const memberData = result?.aggregateStat?.ownersByCount?.nodes;
  if (errors) {
    logWarning("query_error", "", chain);
    return null;
  }
  const members = memberData.map((member) => {
    return {
      address: member?.owner,
      tokenIds: member?.tokenIds?.map((t) => Number(t))
    };
  });
  return members;
};
var query4 = `query GetMembers($collection: [String!]!, $chain: Chain!) {
  aggregateStat {
    ownersByCount(
      where: {collectionAddresses: $collection}
      networks: {network: ETHEREUM, chain: $chain}
      pagination: {limit: 500}
    ) {
      nodes {
        owner
        tokenIds
      }
    }
  }
}`;

// lib/queries/fetchProposals.ts
var fetchProposals = async ({
  collection,
  chain
}) => {
  const response = await fetchDataWithQuery(query5, { collection, chain });
  if (!response) {
    logWarning("no_data_from_api", collection, chain);
    return [];
  }
  const data = formatQueryData5(response, chain);
  if (!data)
    return [];
  return data;
};
var formatQueryData5 = (data, chain) => {
  const { data: result, errors } = data;
  const props = result?.nouns?.nounsProposals?.nodes;
  if (errors) {
    console.log(errors);
    logWarning("query_error", "", chain);
    return null;
  }
  const proposals = props.map((prop) => {
    return {
      id: prop?.proposalId,
      number: prop?.proposalNumber,
      created: prop?.timeCreated * 1e3,
      proposer: prop?.proposer,
      title: prop?.title,
      description: prop?.description,
      status: prop?.status?.charAt(0) + prop?.status?.slice(1).toLowerCase(),
      quorum: prop?.quorumVotes,
      voteStart: prop?.voteStart * 1e3,
      voteEnd: prop?.voteEnd * 1e3,
      tally: {
        for: prop?.forVotes,
        against: prop?.againstVotes,
        abstain: prop?.abstainVotes
      },
      votes: prop?.votes?.map((vote) => {
        return {
          voter: vote?.voter,
          weight: vote?.weight,
          support: vote?.support?.charAt(0) + vote?.support?.slice(1).toLowerCase(),
          reason: vote?.reason
        };
      }) ?? []
    };
  });
  return proposals;
};
var query5 = `query GetProposals($collection: [String!], $chain: Chain!) {
  nouns {
    nounsProposals(
      where: {collectionAddresses: $collection}
      networks: {network: ETHEREUM, chain: $chain}
      sort: {sortKey: CREATED, sortDirection: DESC}
      pagination: {limit: 500}
    ) {
      nodes {
        proposalId
        proposalNumber
        timeCreated
        proposer
        title
        status
        quorumVotes
        voteStart
        voteEnd
        forVotes
        againstVotes
        abstainVotes
        votes {
          voter
          weight
          support
          reason
        }
      }
    }
  }
}`;

// lib/queries/fetchTokenData.ts
var fetchTokenData = async ({
  tokenId,
  collection,
  chain
}) => {
  const response = await fetchDataWithQuery(query6, {
    tokenId: String(tokenId),
    collection,
    chain
  });
  if (!response) {
    logWarning("no_data_from_api", collection, chain);
    return null;
  }
  const data = formatQueryData6(response, chain);
  if (!data?.name) {
    logWarning("incomplete_data_from_api", collection, chain);
    return null;
  }
  return data;
};
var formatQueryData6 = (data, chain) => {
  const { data: result, errors } = data;
  const tokenData = result?.token?.token;
  const mintData = result?.token?.events[0]?.transactionInfo;
  const marketData = result?.nouns?.nounsMarkets?.nodes[0];
  if (errors) {
    logWarning("query_error", "", chain);
    return null;
  }
  return {
    id: Number(tokenData?.tokenId),
    owner: tokenData?.owner,
    name: tokenData?.name,
    description: tokenData?.description,
    imageUrl: tokenData?.image?.url,
    chain,
    attributes: tokenData?.attributes?.map((attribute) => {
      return {
        label: attribute?.traitType,
        value: attribute?.value
      };
    }),
    auctionInfo: {
      tokenId: Number(marketData?.tokenId),
      winner: marketData?.winner,
      amount: String(marketData?.highestBidPrice?.nativePrice?.decimal),
      startTime: Number(marketData?.startTime) * 1e3,
      endTime: Number(marketData?.endTime) * 1e3
    },
    mintInfo: {
      blockNumber: Number(mintData?.blockNumber),
      blockTimestamp: Date.parse(mintData?.blockTimestamp),
      transactionHash: mintData?.transactionHash
    }
  };
};
var query6 = `query GetToken($tokenId: String!, $collection: String!, $chain: Chain!) {
  token(
    token: {address: $collection, tokenId: $tokenId}
    network: {network: ETHEREUM, chain: $chain}
  ) {
    token {
      tokenId
      owner
      name
      description
      image {
        url
      }
      attributes {
        traitType
        value
      }
    }
		events(filter: {eventTypes: MINT_EVENT}) {
			transactionInfo {
				blockNumber
				blockTimestamp
				transactionHash
			}
		}
  }
  nouns {
    nounsMarkets(
      filter: {nounsMarketType: NOUNS_BUILDER_AUCTION}
      networks: {network: ETHEREUM, chain: $chain}
      where: {tokens: {tokenId: $tokenId, address: $collection}}
    ) {
      nodes {
        status
        tokenId
        startTime
        endTime
        winner
        highestBidPrice {
          nativePrice {
            decimal
          }
        }
      }
    }
  }
}`;

// lib/hooks/useAuction.ts
var defaultData = {
  auction: {},
  minBid: formatEther(parseEther("0.001"))
};
var useAuction = (dao) => {
  const [auctionData, setAuctionData] = useState(defaultData.auction);
  const [minBid, setMinBid] = useState(defaultData.minBid);
  const [userBid, setUserBid] = useState("0");
  const [isValidUserBid, setIsValidUserBid] = useState(false);
  const handleUserBidChange = (event) => {
    setUserBid(event.currentTarget.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      const { chain } = dao;
      const { collection } = dao.contracts;
      const data = await fetchAuctionData({ collection, chain });
      if (data)
        setAuctionData(data);
      else
        setAuctionData(defaultData.auction);
    };
    if (dao.contracts?.collection && dao.chain)
      fetchData();
  }, [dao]);
  useEffect(() => {
    if (auctionData?.auctionId) {
      const { highestBid } = auctionData;
      if (!highestBid || Number(highestBid) < 0)
        setMinBid(defaultData.minBid);
      else {
        const bid = parseEther(highestBid);
        if (bid.gt(parseEther("0"))) {
          const min = bid.add(bid.div(auctionData.minPctIncrease));
          setMinBid(formatEther(min));
        } else
          setMinBid(defaultData.minBid);
      }
      return () => setMinBid(defaultData.minBid);
    }
  }, [auctionData.highestBid, auctionData.minPctIncrease]);
  useEffect(() => {
    if (Date.now() >= auctionData.endTime)
      setIsValidUserBid(false);
    else if (!userBid || Number(userBid) < 0 || !Number.isInteger(auctionData.auctionId))
      setIsValidUserBid(false);
    else {
      const bid = parseEther(userBid);
      const min = parseEther(minBid);
      const isValid = bid.gte(min);
      setIsValidUserBid(isValid);
    }
    return () => setIsValidUserBid(false);
  }, [auctionData.endTime, minBid, userBid]);
  useContractEvent({
    address: dao.contracts.auction,
    chainId: dao.chainId,
    abi: auction_default,
    eventName: "AuctionBid",
    listener(tokenId, bidder, bid, extended, endTime) {
      const data = { ...auctionData };
      data.auctionId = tokenId.toNumber();
      data.highestBidder = bidder;
      data.highestBid = formatEther(bid);
      if (extended)
        data.endTime = endTime.toNumber() * 1e3;
      setAuctionData(data);
    }
  });
  useContractEvent({
    address: dao.contracts.auction,
    chainId: dao.chainId,
    abi: auction_default,
    eventName: "AuctionCreated",
    listener(tokenId, startTime, endTime) {
      const data = {
        auctionId: tokenId.toNumber(),
        startTime: startTime.toNumber() * 1e3,
        endTime: endTime.toNumber() * 1e3,
        highestBid: formatEther("0"),
        highestBidder: constants.AddressZero,
        chain: dao.chain,
        minPctIncrease: auctionData.minPctIncrease
      };
      setAuctionData(data);
    }
  });
  return {
    auctionData,
    formData: {
      attributes: {},
      input: {
        value: userBid,
        min: minBid,
        step: "any",
        type: "number",
        placeholder: `${minBid} or more`,
        onChange: handleUserBidChange
      },
      btn: {
        disabled: !isValidUserBid
      },
      addMinBid: () => setUserBid(minBid)
    }
  };
};

// lib/hooks/useCollection.ts
import { useEffect as useEffect2, useState as useState2 } from "react";
var useCollection = (dao) => {
  const [tokens, setTokens] = useState2();
  useEffect2(() => {
    const fetchData = async () => {
      const { chain } = dao;
      const { collection } = dao.contracts;
      const data = await fetchCollectionTokens({ collection, chain });
      if (data)
        setTokens(data);
      else
        setTokens([]);
    };
    if (dao)
      fetchData();
  }, [dao]);
  return tokens ?? [];
};

// lib/hooks/useDao.ts
import { useContext, useEffect as useEffect3, useState as useState3 } from "react";
import { useContractRead } from "wagmi";
var ipfsGateway = "https://gateway.pinata.cloud/ipfs/";
var useDao = () => {
  const ctx = useContext(DaoContext);
  const [apiData, setApiData] = useState3();
  const [contractUri, setContractUri] = useState3();
  useContractRead({
    enabled: Boolean(ctx.collection),
    address: ctx.collection,
    chainId: ctx.chain === "GOERLI" ? 5 : 1,
    abi: token_default,
    functionName: "contractURI",
    onSuccess(data) {
      const uri = JSON.parse(window.atob(data.split(",")[1]));
      if (uri?.image)
        uri.image = uri.image.replace("ipfs://", ipfsGateway);
      const daoUri = {
        name: uri?.name ?? "",
        description: uri?.description ?? "",
        imageUrl: uri?.image ?? "",
        website: uri?.external_url ?? ""
      };
      setContractUri(daoUri);
    },
    onError(err) {
      console.error(err);
    }
  });
  useEffect3(() => {
    const fetchData = async () => {
      const { collection, chain } = ctx;
      const data = await fetchDaoData({ collection, chain });
      if (data)
        setApiData(data);
      else {
        console.error("dao data not returned from zora");
      }
    };
    if (ctx.collection && ctx.chain)
      fetchData();
  }, [ctx]);
  return contractUri && apiData ? { ...contractUri, ...apiData } : null;
};

// lib/hooks/useMembers.ts
import { useEffect as useEffect4, useState as useState4 } from "react";
import { constants as constants2 } from "ethers";
var useMembers = (dao) => {
  const [members, setMembers] = useState4([]);
  useEffect4(() => {
    const fetchData = async () => {
      const { chain } = dao;
      const { collection } = dao.contracts;
      const data = await fetchMembers({ collection, chain });
      if (data.length) {
        const filteredMembers = data.filter((m) => m.address !== constants2.AddressZero);
        setMembers(filteredMembers);
      } else
        setMembers([]);
    };
    if (dao)
      fetchData();
  }, [dao]);
  return members;
};

// lib/hooks/useProposals.ts
import { useEffect as useEffect5, useState as useState5 } from "react";
var useProposals = (dao) => {
  const [proposals, setProposals] = useState5();
  useEffect5(() => {
    const fetchData = async () => {
      const { chain } = dao;
      const { collection } = dao.contracts;
      const data = await fetchProposals({ collection, chain });
      if (data)
        setProposals(data);
      else
        setProposals([]);
    };
    if (dao)
      fetchData();
  }, [dao]);
  return proposals ?? [];
};

// lib/hooks/useToken.ts
import { useEffect as useEffect6, useState as useState6 } from "react";
import { useContract, useProvider } from "wagmi";

// node_modules/@ethersproject/bignumber/lib.esm/bignumber.js
var import_bn = __toESM(require_bn());

// node_modules/@ethersproject/logger/lib.esm/_version.js
var version = "logger/5.7.0";

// node_modules/@ethersproject/logger/lib.esm/index.js
var _permanentCensorErrors = false;
var _censorErrors = false;
var LogLevels = { debug: 1, "default": 2, info: 2, warning: 3, error: 4, off: 5 };
var _logLevel = LogLevels["default"];
var _globalLogger = null;
function _checkNormalize() {
  try {
    const missing = [];
    ["NFD", "NFC", "NFKD", "NFKC"].forEach((form) => {
      try {
        if ("test".normalize(form) !== "test") {
          throw new Error("bad normalize");
        }
        ;
      } catch (error) {
        missing.push(form);
      }
    });
    if (missing.length) {
      throw new Error("missing " + missing.join(", "));
    }
    if (String.fromCharCode(233).normalize("NFD") !== String.fromCharCode(101, 769)) {
      throw new Error("broken implementation");
    }
  } catch (error) {
    return error.message;
  }
  return null;
}
var _normalizeError = _checkNormalize();
var LogLevel;
(function(LogLevel2) {
  LogLevel2["DEBUG"] = "DEBUG";
  LogLevel2["INFO"] = "INFO";
  LogLevel2["WARNING"] = "WARNING";
  LogLevel2["ERROR"] = "ERROR";
  LogLevel2["OFF"] = "OFF";
})(LogLevel || (LogLevel = {}));
var ErrorCode;
(function(ErrorCode2) {
  ErrorCode2["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
  ErrorCode2["NOT_IMPLEMENTED"] = "NOT_IMPLEMENTED";
  ErrorCode2["UNSUPPORTED_OPERATION"] = "UNSUPPORTED_OPERATION";
  ErrorCode2["NETWORK_ERROR"] = "NETWORK_ERROR";
  ErrorCode2["SERVER_ERROR"] = "SERVER_ERROR";
  ErrorCode2["TIMEOUT"] = "TIMEOUT";
  ErrorCode2["BUFFER_OVERRUN"] = "BUFFER_OVERRUN";
  ErrorCode2["NUMERIC_FAULT"] = "NUMERIC_FAULT";
  ErrorCode2["MISSING_NEW"] = "MISSING_NEW";
  ErrorCode2["INVALID_ARGUMENT"] = "INVALID_ARGUMENT";
  ErrorCode2["MISSING_ARGUMENT"] = "MISSING_ARGUMENT";
  ErrorCode2["UNEXPECTED_ARGUMENT"] = "UNEXPECTED_ARGUMENT";
  ErrorCode2["CALL_EXCEPTION"] = "CALL_EXCEPTION";
  ErrorCode2["INSUFFICIENT_FUNDS"] = "INSUFFICIENT_FUNDS";
  ErrorCode2["NONCE_EXPIRED"] = "NONCE_EXPIRED";
  ErrorCode2["REPLACEMENT_UNDERPRICED"] = "REPLACEMENT_UNDERPRICED";
  ErrorCode2["UNPREDICTABLE_GAS_LIMIT"] = "UNPREDICTABLE_GAS_LIMIT";
  ErrorCode2["TRANSACTION_REPLACED"] = "TRANSACTION_REPLACED";
  ErrorCode2["ACTION_REJECTED"] = "ACTION_REJECTED";
})(ErrorCode || (ErrorCode = {}));
var HEX = "0123456789abcdef";
var Logger = class {
  constructor(version4) {
    Object.defineProperty(this, "version", {
      enumerable: true,
      value: version4,
      writable: false
    });
  }
  _log(logLevel, args) {
    const level = logLevel.toLowerCase();
    if (LogLevels[level] == null) {
      this.throwArgumentError("invalid log level name", "logLevel", logLevel);
    }
    if (_logLevel > LogLevels[level]) {
      return;
    }
    console.log.apply(console, args);
  }
  debug(...args) {
    this._log(Logger.levels.DEBUG, args);
  }
  info(...args) {
    this._log(Logger.levels.INFO, args);
  }
  warn(...args) {
    this._log(Logger.levels.WARNING, args);
  }
  makeError(message, code, params) {
    if (_censorErrors) {
      return this.makeError("censored error", code, {});
    }
    if (!code) {
      code = Logger.errors.UNKNOWN_ERROR;
    }
    if (!params) {
      params = {};
    }
    const messageDetails = [];
    Object.keys(params).forEach((key) => {
      const value = params[key];
      try {
        if (value instanceof Uint8Array) {
          let hex = "";
          for (let i = 0; i < value.length; i++) {
            hex += HEX[value[i] >> 4];
            hex += HEX[value[i] & 15];
          }
          messageDetails.push(key + "=Uint8Array(0x" + hex + ")");
        } else {
          messageDetails.push(key + "=" + JSON.stringify(value));
        }
      } catch (error2) {
        messageDetails.push(key + "=" + JSON.stringify(params[key].toString()));
      }
    });
    messageDetails.push(`code=${code}`);
    messageDetails.push(`version=${this.version}`);
    const reason = message;
    let url = "";
    switch (code) {
      case ErrorCode.NUMERIC_FAULT: {
        url = "NUMERIC_FAULT";
        const fault = message;
        switch (fault) {
          case "overflow":
          case "underflow":
          case "division-by-zero":
            url += "-" + fault;
            break;
          case "negative-power":
          case "negative-width":
            url += "-unsupported";
            break;
          case "unbound-bitwise-result":
            url += "-unbound-result";
            break;
        }
        break;
      }
      case ErrorCode.CALL_EXCEPTION:
      case ErrorCode.INSUFFICIENT_FUNDS:
      case ErrorCode.MISSING_NEW:
      case ErrorCode.NONCE_EXPIRED:
      case ErrorCode.REPLACEMENT_UNDERPRICED:
      case ErrorCode.TRANSACTION_REPLACED:
      case ErrorCode.UNPREDICTABLE_GAS_LIMIT:
        url = code;
        break;
    }
    if (url) {
      message += " [ See: https://links.ethers.org/v5-errors-" + url + " ]";
    }
    if (messageDetails.length) {
      message += " (" + messageDetails.join(", ") + ")";
    }
    const error = new Error(message);
    error.reason = reason;
    error.code = code;
    Object.keys(params).forEach(function(key) {
      error[key] = params[key];
    });
    return error;
  }
  throwError(message, code, params) {
    throw this.makeError(message, code, params);
  }
  throwArgumentError(message, name2, value) {
    return this.throwError(message, Logger.errors.INVALID_ARGUMENT, {
      argument: name2,
      value
    });
  }
  assert(condition, message, code, params) {
    if (!!condition) {
      return;
    }
    this.throwError(message, code, params);
  }
  assertArgument(condition, message, name2, value) {
    if (!!condition) {
      return;
    }
    this.throwArgumentError(message, name2, value);
  }
  checkNormalize(message) {
    if (message == null) {
      message = "platform missing String.prototype.normalize";
    }
    if (_normalizeError) {
      this.throwError("platform missing String.prototype.normalize", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "String.prototype.normalize",
        form: _normalizeError
      });
    }
  }
  checkSafeUint53(value, message) {
    if (typeof value !== "number") {
      return;
    }
    if (message == null) {
      message = "value not safe";
    }
    if (value < 0 || value >= 9007199254740991) {
      this.throwError(message, Logger.errors.NUMERIC_FAULT, {
        operation: "checkSafeInteger",
        fault: "out-of-safe-range",
        value
      });
    }
    if (value % 1) {
      this.throwError(message, Logger.errors.NUMERIC_FAULT, {
        operation: "checkSafeInteger",
        fault: "non-integer",
        value
      });
    }
  }
  checkArgumentCount(count, expectedCount, message) {
    if (message) {
      message = ": " + message;
    } else {
      message = "";
    }
    if (count < expectedCount) {
      this.throwError("missing argument" + message, Logger.errors.MISSING_ARGUMENT, {
        count,
        expectedCount
      });
    }
    if (count > expectedCount) {
      this.throwError("too many arguments" + message, Logger.errors.UNEXPECTED_ARGUMENT, {
        count,
        expectedCount
      });
    }
  }
  checkNew(target, kind) {
    if (target === Object || target == null) {
      this.throwError("missing new", Logger.errors.MISSING_NEW, { name: kind.name });
    }
  }
  checkAbstract(target, kind) {
    if (target === kind) {
      this.throwError("cannot instantiate abstract class " + JSON.stringify(kind.name) + " directly; use a sub-class", Logger.errors.UNSUPPORTED_OPERATION, { name: target.name, operation: "new" });
    } else if (target === Object || target == null) {
      this.throwError("missing new", Logger.errors.MISSING_NEW, { name: kind.name });
    }
  }
  static globalLogger() {
    if (!_globalLogger) {
      _globalLogger = new Logger(version);
    }
    return _globalLogger;
  }
  static setCensorship(censorship, permanent) {
    if (!censorship && permanent) {
      this.globalLogger().throwError("cannot permanently disable censorship", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "setCensorship"
      });
    }
    if (_permanentCensorErrors) {
      if (!censorship) {
        return;
      }
      this.globalLogger().throwError("error censorship permanent", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "setCensorship"
      });
    }
    _censorErrors = !!censorship;
    _permanentCensorErrors = !!permanent;
  }
  static setLogLevel(logLevel) {
    const level = LogLevels[logLevel.toLowerCase()];
    if (level == null) {
      Logger.globalLogger().warn("invalid log level - " + logLevel);
      return;
    }
    _logLevel = level;
  }
  static from(version4) {
    return new Logger(version4);
  }
};
Logger.errors = ErrorCode;
Logger.levels = LogLevel;

// node_modules/@ethersproject/bytes/lib.esm/_version.js
var version2 = "bytes/5.7.0";

// node_modules/@ethersproject/bytes/lib.esm/index.js
var logger = new Logger(version2);
function isHexable(value) {
  return !!value.toHexString;
}
function isInteger(value) {
  return typeof value === "number" && value == value && value % 1 === 0;
}
function isBytes(value) {
  if (value == null) {
    return false;
  }
  if (value.constructor === Uint8Array) {
    return true;
  }
  if (typeof value === "string") {
    return false;
  }
  if (!isInteger(value.length) || value.length < 0) {
    return false;
  }
  for (let i = 0; i < value.length; i++) {
    const v = value[i];
    if (!isInteger(v) || v < 0 || v >= 256) {
      return false;
    }
  }
  return true;
}
function isHexString(value, length) {
  if (typeof value !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false;
  }
  if (length && value.length !== 2 + 2 * length) {
    return false;
  }
  return true;
}
var HexCharacters = "0123456789abcdef";
function hexlify(value, options) {
  if (!options) {
    options = {};
  }
  if (typeof value === "number") {
    logger.checkSafeUint53(value, "invalid hexlify value");
    let hex = "";
    while (value) {
      hex = HexCharacters[value & 15] + hex;
      value = Math.floor(value / 16);
    }
    if (hex.length) {
      if (hex.length % 2) {
        hex = "0" + hex;
      }
      return "0x" + hex;
    }
    return "0x00";
  }
  if (typeof value === "bigint") {
    value = value.toString(16);
    if (value.length % 2) {
      return "0x0" + value;
    }
    return "0x" + value;
  }
  if (options.allowMissingPrefix && typeof value === "string" && value.substring(0, 2) !== "0x") {
    value = "0x" + value;
  }
  if (isHexable(value)) {
    return value.toHexString();
  }
  if (isHexString(value)) {
    if (value.length % 2) {
      if (options.hexPad === "left") {
        value = "0x0" + value.substring(2);
      } else if (options.hexPad === "right") {
        value += "0";
      } else {
        logger.throwArgumentError("hex data is odd-length", "value", value);
      }
    }
    return value.toLowerCase();
  }
  if (isBytes(value)) {
    let result = "0x";
    for (let i = 0; i < value.length; i++) {
      let v = value[i];
      result += HexCharacters[(v & 240) >> 4] + HexCharacters[v & 15];
    }
    return result;
  }
  return logger.throwArgumentError("invalid hexlify value", "value", value);
}

// node_modules/@ethersproject/bignumber/lib.esm/_version.js
var version3 = "bignumber/5.7.0";

// node_modules/@ethersproject/bignumber/lib.esm/bignumber.js
var BN = import_bn.default.BN;
var logger2 = new Logger(version3);
var _constructorGuard = {};
var MAX_SAFE = 9007199254740991;
var _warnedToStringRadix = false;
var BigNumber = class {
  constructor(constructorGuard, hex) {
    if (constructorGuard !== _constructorGuard) {
      logger2.throwError("cannot call constructor directly; use BigNumber.from", Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "new (BigNumber)"
      });
    }
    this._hex = hex;
    this._isBigNumber = true;
    Object.freeze(this);
  }
  fromTwos(value) {
    return toBigNumber(toBN(this).fromTwos(value));
  }
  toTwos(value) {
    return toBigNumber(toBN(this).toTwos(value));
  }
  abs() {
    if (this._hex[0] === "-") {
      return BigNumber.from(this._hex.substring(1));
    }
    return this;
  }
  add(other) {
    return toBigNumber(toBN(this).add(toBN(other)));
  }
  sub(other) {
    return toBigNumber(toBN(this).sub(toBN(other)));
  }
  div(other) {
    const o = BigNumber.from(other);
    if (o.isZero()) {
      throwFault("division-by-zero", "div");
    }
    return toBigNumber(toBN(this).div(toBN(other)));
  }
  mul(other) {
    return toBigNumber(toBN(this).mul(toBN(other)));
  }
  mod(other) {
    const value = toBN(other);
    if (value.isNeg()) {
      throwFault("division-by-zero", "mod");
    }
    return toBigNumber(toBN(this).umod(value));
  }
  pow(other) {
    const value = toBN(other);
    if (value.isNeg()) {
      throwFault("negative-power", "pow");
    }
    return toBigNumber(toBN(this).pow(value));
  }
  and(other) {
    const value = toBN(other);
    if (this.isNegative() || value.isNeg()) {
      throwFault("unbound-bitwise-result", "and");
    }
    return toBigNumber(toBN(this).and(value));
  }
  or(other) {
    const value = toBN(other);
    if (this.isNegative() || value.isNeg()) {
      throwFault("unbound-bitwise-result", "or");
    }
    return toBigNumber(toBN(this).or(value));
  }
  xor(other) {
    const value = toBN(other);
    if (this.isNegative() || value.isNeg()) {
      throwFault("unbound-bitwise-result", "xor");
    }
    return toBigNumber(toBN(this).xor(value));
  }
  mask(value) {
    if (this.isNegative() || value < 0) {
      throwFault("negative-width", "mask");
    }
    return toBigNumber(toBN(this).maskn(value));
  }
  shl(value) {
    if (this.isNegative() || value < 0) {
      throwFault("negative-width", "shl");
    }
    return toBigNumber(toBN(this).shln(value));
  }
  shr(value) {
    if (this.isNegative() || value < 0) {
      throwFault("negative-width", "shr");
    }
    return toBigNumber(toBN(this).shrn(value));
  }
  eq(other) {
    return toBN(this).eq(toBN(other));
  }
  lt(other) {
    return toBN(this).lt(toBN(other));
  }
  lte(other) {
    return toBN(this).lte(toBN(other));
  }
  gt(other) {
    return toBN(this).gt(toBN(other));
  }
  gte(other) {
    return toBN(this).gte(toBN(other));
  }
  isNegative() {
    return this._hex[0] === "-";
  }
  isZero() {
    return toBN(this).isZero();
  }
  toNumber() {
    try {
      return toBN(this).toNumber();
    } catch (error) {
      throwFault("overflow", "toNumber", this.toString());
    }
    return null;
  }
  toBigInt() {
    try {
      return BigInt(this.toString());
    } catch (e) {
    }
    return logger2.throwError("this platform does not support BigInt", Logger.errors.UNSUPPORTED_OPERATION, {
      value: this.toString()
    });
  }
  toString() {
    if (arguments.length > 0) {
      if (arguments[0] === 10) {
        if (!_warnedToStringRadix) {
          _warnedToStringRadix = true;
          logger2.warn("BigNumber.toString does not accept any parameters; base-10 is assumed");
        }
      } else if (arguments[0] === 16) {
        logger2.throwError("BigNumber.toString does not accept any parameters; use bigNumber.toHexString()", Logger.errors.UNEXPECTED_ARGUMENT, {});
      } else {
        logger2.throwError("BigNumber.toString does not accept parameters", Logger.errors.UNEXPECTED_ARGUMENT, {});
      }
    }
    return toBN(this).toString(10);
  }
  toHexString() {
    return this._hex;
  }
  toJSON(key) {
    return { type: "BigNumber", hex: this.toHexString() };
  }
  static from(value) {
    if (value instanceof BigNumber) {
      return value;
    }
    if (typeof value === "string") {
      if (value.match(/^-?0x[0-9a-f]+$/i)) {
        return new BigNumber(_constructorGuard, toHex(value));
      }
      if (value.match(/^-?[0-9]+$/)) {
        return new BigNumber(_constructorGuard, toHex(new BN(value)));
      }
      return logger2.throwArgumentError("invalid BigNumber string", "value", value);
    }
    if (typeof value === "number") {
      if (value % 1) {
        throwFault("underflow", "BigNumber.from", value);
      }
      if (value >= MAX_SAFE || value <= -MAX_SAFE) {
        throwFault("overflow", "BigNumber.from", value);
      }
      return BigNumber.from(String(value));
    }
    const anyValue = value;
    if (typeof anyValue === "bigint") {
      return BigNumber.from(anyValue.toString());
    }
    if (isBytes(anyValue)) {
      return BigNumber.from(hexlify(anyValue));
    }
    if (anyValue) {
      if (anyValue.toHexString) {
        const hex = anyValue.toHexString();
        if (typeof hex === "string") {
          return BigNumber.from(hex);
        }
      } else {
        let hex = anyValue._hex;
        if (hex == null && anyValue.type === "BigNumber") {
          hex = anyValue.hex;
        }
        if (typeof hex === "string") {
          if (isHexString(hex) || hex[0] === "-" && isHexString(hex.substring(1))) {
            return BigNumber.from(hex);
          }
        }
      }
    }
    return logger2.throwArgumentError("invalid BigNumber value", "value", value);
  }
  static isBigNumber(value) {
    return !!(value && value._isBigNumber);
  }
};
function toHex(value) {
  if (typeof value !== "string") {
    return toHex(value.toString(16));
  }
  if (value[0] === "-") {
    value = value.substring(1);
    if (value[0] === "-") {
      logger2.throwArgumentError("invalid hex", "value", value);
    }
    value = toHex(value);
    if (value === "0x00") {
      return value;
    }
    return "-" + value;
  }
  if (value.substring(0, 2) !== "0x") {
    value = "0x" + value;
  }
  if (value === "0x") {
    return "0x00";
  }
  if (value.length % 2) {
    value = "0x0" + value.substring(2);
  }
  while (value.length > 4 && value.substring(0, 4) === "0x00") {
    value = "0x" + value.substring(4);
  }
  return value;
}
function toBigNumber(value) {
  return BigNumber.from(toHex(value));
}
function toBN(value) {
  const hex = BigNumber.from(value).toHexString();
  if (hex[0] === "-") {
    return new BN("-" + hex.substring(3), 16);
  }
  return new BN(hex.substring(2), 16);
}
function throwFault(fault, operation, value) {
  const params = { fault, operation };
  if (value != null) {
    params.value = value;
  }
  return logger2.throwError(fault, Logger.errors.NUMERIC_FAULT, params);
}

// lib/hooks/useToken.ts
var useToken = (id, dao) => {
  const provider = useProvider();
  const [tokenData, setTokenData] = useState6();
  const tokenContract = useContract({
    address: dao.contracts.collection,
    abi: token_default,
    signerOrProvider: provider
  });
  const getDataFromContract = async (id2) => {
    const tokenId = BigNumber.from(String(id2));
    const response = await tokenContract?.tokenURI(tokenId);
    if (!response)
      return null;
    const data = JSON.parse(window.atob(response.split(",")[1]));
    const { name: name2, description, image, properties } = data;
    return {
      id: id2,
      owner: "",
      name: name2,
      description,
      imageUrl: image,
      attributes: properties,
      chain: dao.chain
    };
  };
  useEffect6(() => {
    if (!id)
      return;
    const fetchData = async (id2) => {
      const { chain } = dao;
      const { collection } = dao.contracts;
      const data = await fetchTokenData({ tokenId: id2, collection, chain });
      if (data)
        setTokenData(data);
      else {
        const data2 = await getDataFromContract(id2);
        if (data2)
          setTokenData(data2);
        else {
          logWarning("no_data", collection, chain);
        }
      }
    };
    if (id !== void 0 && dao.contracts?.collection && dao.chain)
      fetchData(id);
  }, [id, dao]);
  return tokenData ?? {};
};

// lib/components/AuctionHero.tsx
import { useEffect as useEffect11, useState as useState9 } from "react";
import { constants as constants4 } from "ethers";
import Countdown from "react-countdown";

// lib/components/ComponentWrapper.tsx
import { useEffect as useEffect7, useRef } from "react";

// lib/themes/base.ts
var baseTheme = createTheme({
  primary: "blue",
  secondary: "red",
  textBase: "#1f2937",
  background: "white",
  border: "#d1d5db"
});
var base_default = baseTheme;

// lib/themes/dark.ts
var darkTheme = createTheme({
  primary: "#212529",
  secondary: "#343A40",
  textBase: "white",
  background: "#1f2937",
  border: "#4b5563"
});
var dark_default = darkTheme;

// lib/themes/index.ts
var themes = {
  base: base_default,
  dark: dark_default
};

// lib/themes/utils.ts
function getThemeStyles(theme) {
  if (theme === "dark")
    return themes.dark;
  return themes.base;
}
function applyTheme(element, theme) {
  const themeStyles = getThemeStyles(theme);
  Object.keys(themeStyles).forEach((cssVar) => {
    element.style.setProperty(cssVar, themeStyles[cssVar]);
  });
}
function createTheme(config) {
  return {
    "--theme-primary": config.primary,
    "--theme-secondary": config.secondary,
    "--theme-text-base": config.textBase,
    "--theme-background": config.background,
    "--theme-border": config.border
  };
}

// lib/assets/loading-noggles.gif
var loading_noggles_default = "./loading-noggles-BTZW44M2.gif";

// lib/components/shared/Loading.tsx
import { jsx } from "react/jsx-runtime";
function Loading({}) {
  return /* @__PURE__ */ jsx("div", { className: "mx-auto w-full h-full flex items-center justify-center p-4 md:p-10", children: /* @__PURE__ */ jsx("img", { src: loading_noggles_default, alt: "loading", className: "w-full max-w-[120px]" }) });
}
var Loading_default = Loading;

// lib/components/ComponentWrapper.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function ComponentWrapper(props) {
  const ref = useRef(null);
  const theme = props.theme;
  useEffect7(() => {
    if (ref.current != null) {
      const target = ref.current;
      applyTheme(target, theme);
    }
  }, [theme, ref]);
  return /* @__PURE__ */ jsx2("div", { className: "text-text-base bg-background p-2 md:p-5 rounded-lg", ref, children: !props.isDataLoaded ? /* @__PURE__ */ jsx2(Loading_default, {}) : props.children });
}
var ComponentWrapper_default = ComponentWrapper;

// lib/components/shared/Account.tsx
import { useEffect as useEffect9, useState as useState8 } from "react";
import cx from "classnames";

// lib/components/shared/Avatar.tsx
import { useEffect as useEffect8, useMemo, useState as useState7 } from "react";
import { zorbImageDataURI } from "@zoralabs/zorb";
import { constants as constants3 } from "ethers";
import { jsx as jsx3 } from "react/jsx-runtime";
var Avatar = ({ address }) => {
  const [ensAvatar, setEnsAvatar] = useState7("");
  const zorbImage = useMemo(() => {
    if (address)
      return zorbImageDataURI(address);
    else
      return zorbImageDataURI(constants3.AddressZero);
  }, [address]);
  useEffect8(() => {
    const getEnsData = async (address2) => {
      const { avatar } = await fetchEnsData(address2);
      if (avatar)
        setEnsAvatar(avatar);
      else
        setEnsAvatar("");
    };
    if (address)
      getEnsData(address);
    else
      setEnsAvatar("");
  }, [address]);
  return /* @__PURE__ */ jsx3("img", { src: ensAvatar || zorbImage, className: "w-full rounded-full aspect-square" });
};

// lib/components/shared/Account.tsx
import { jsx as jsx4, jsxs } from "react/jsx-runtime";
var Account = ({ address, chainId, hideAvatar = false }) => {
  const [ensName, setEnsName] = useState8("");
  useEffect9(() => {
    const getEnsData = async (address2) => {
      const { name: name2 } = await fetchEnsData(address2);
      if (name2)
        setEnsName(name2);
      else
        setEnsName("");
    };
    if (address)
      getEnsData(address);
    else
      setEnsName("");
  }, [address]);
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: `https://etherscan.io/address/${address}`,
      className: "inline-flex flex-row items-center",
      target: "_blank",
      rel: "noreferrer",
      children: [
        !hideAvatar === true && /* @__PURE__ */ jsx4("span", { className: "mr-2 h-6 w-6 absolute", children: /* @__PURE__ */ jsx4(Avatar, { address, chainId }) }),
        /* @__PURE__ */ jsx4(
          "span",
          {
            className: cx(
              "w-full overflow-hidden overflow-ellipsis font-bold",
              !hideAvatar === true && "pl-7"
            ),
            children: ensName || trunc(address)
          }
        )
      ]
    }
  );
};

// lib/components/BidForm.tsx
import { useRef as useRef2, useEffect as useEffect10 } from "react";
import { BigNumber as BigNumber2 } from "ethers";
import { parseEther as parseEther2 } from "ethers/lib/utils.js";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { jsx as jsx5, jsxs as jsxs2 } from "react/jsx-runtime";
var BidForm = ({ tokenId, formData, dao, theme }) => {
  const ref = useRef2(null);
  const { config } = usePrepareContractWrite({
    address: dao.contracts.auction,
    chainId: dao.chainId,
    abi: auction_default,
    functionName: "createBid",
    args: [BigNumber2.from(String(tokenId))],
    enabled: !formData.btn.disabled,
    overrides: {
      value: parseEther2(formData.input.value || "0")
    },
    onError(err) {
      console.error(err);
    }
  });
  const { write } = useContractWrite(config);
  const placeBid = (event) => {
    event.preventDefault();
    write?.();
  };
  useEffect10(() => {
    if (ref.current != null) {
      const target = ref.current;
      applyTheme(target, theme);
    }
  }, [theme, ref]);
  return /* @__PURE__ */ jsxs2(
    "form",
    {
      onSubmit: placeBid,
      className: "mt-4 md:mt-8 flex flex-col font-bold sm:flex-row gap-5 w-full",
      ref,
      children: [
        /* @__PURE__ */ jsxs2("div", { className: "relative mb-2 w-full flex-grow", children: [
          /* @__PURE__ */ jsx5("span", { className: "text-lg absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400", children: "\u039E" }),
          /* @__PURE__ */ jsx5(
            "input",
            {
              ...formData.input,
              className: "text-xl shadow appearance-none border rounded-lg w-full py-4 pl-7 px-4 text-gray-700 leading-tight focus:shadow-outline"
            }
          )
        ] }),
        /* @__PURE__ */ jsx5(
          "button",
          {
            type: "submit",
            ...formData.btn,
            className: "rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 disabled:cursor-not-allowed disabled:pointer-events-none flex-shrink-0 border-2 border-text-base disabled:opacity-40",
            children: "Place bid"
          }
        )
      ]
    }
  );
};

// lib/components/shared/TokenImage.tsx
import React12 from "react";
import cx2 from "classnames";
import Skeleton from "react-loading-skeleton";
import { Fragment, jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
function TokenImage({ imageUrl, inCollectionList }) {
  const [isImageLoaded, setIsImageLoaded] = React12.useState(false);
  const [isImageError, setIsImageError] = React12.useState(false);
  return /* @__PURE__ */ jsxs3(Fragment, { children: [
    /* @__PURE__ */ jsx6(
      "img",
      {
        src: imageUrl,
        style: isImageLoaded ? {} : { display: "none" },
        onLoad: () => setIsImageLoaded(true),
        onError: () => setIsImageError(true),
        className: cx2(
          "rounded-md w-full",
          !inCollectionList && "rounded-b-none !md:rounded-md !md:rounded-r-none"
        ),
        alt: `${name} token image`
      }
    ),
    /* @__PURE__ */ jsx6(
      "div",
      {
        style: !isImageLoaded && !isImageError ? { display: "block", height: "100%" } : { display: "none" },
        children: /* @__PURE__ */ jsx6(
          Skeleton,
          {
            containerClassName: "h-full w-full rounded-md rounded-b-none !md:rounded-md !md:rounded-r-none",
            className: "aspect-square"
          }
        )
      }
    )
  ] });
}
var TokenImage_default = TokenImage;

// lib/components/AuctionHero.tsx
import { Fragment as Fragment2, jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
var AuctionHero = ({ dao, opts = {} }) => {
  const theme = opts?.theme;
  const { auctionData, formData } = useAuction(dao);
  const [latestTokenId, setLatestTokenId] = useState9();
  const [tokenId, setTokenId] = useState9();
  const [showCountdown, toggleCountdown] = useState9(true);
  const [isDataLoaded, setIsDataLoaded] = useState9(false);
  const token = useToken(tokenId, dao);
  useEffect11(() => {
    Object.keys(auctionData).length && setIsDataLoaded(true);
    const currentAuctionToken = auctionData?.auctionId;
    if (currentAuctionToken !== void 0) {
      if (!Number.isInteger(tokenId))
        setTokenId(currentAuctionToken);
      if (!Number.isInteger(latestTokenId) || tokenId === latestTokenId) {
        setTokenId(currentAuctionToken);
        setLatestTokenId(currentAuctionToken);
      } else
        setLatestTokenId(currentAuctionToken);
    }
  }, [auctionData]);
  const date = auctionData && new Date(auctionData.endTime).toLocaleDateString("en-US");
  const time = auctionData && new Date(auctionData.endTime).toLocaleTimeString("en-US");
  const countdownRenderer = (props) => {
    if (props.completed) {
      return /* @__PURE__ */ jsx7("p", { children: "Auction has ended" });
    } else {
      return /* @__PURE__ */ jsxs4("span", { children: [
        props.hours,
        "h ",
        props.minutes,
        "m ",
        props.seconds,
        "s"
      ] });
    }
  };
  return /* @__PURE__ */ jsxs4(ComponentWrapper_default, { theme, isDataLoaded, children: [
    isDataLoaded && !auctionData?.auctionId && /* @__PURE__ */ jsx7("div", { id: "auction", children: /* @__PURE__ */ jsx7("div", { className: "flex justify-center mx-auto", children: /* @__PURE__ */ jsx7("div", { className: "h-full text-center w-full flex flex-col md:flex-row md:gap-10 items-center", children: /* @__PURE__ */ jsx7("p", { className: "bg-slate-50 p-4 md:p-10 w-full", children: "No auction found" }) }) }) }),
    isDataLoaded && auctionData?.auctionId ? /* @__PURE__ */ jsx7("div", { id: "auction", children: /* @__PURE__ */ jsx7("div", { className: "flex justify-center mx-auto", children: /* @__PURE__ */ jsxs4("div", { className: "w-full flex flex-col md:flex-row md:gap-10 items-center", children: [
      /* @__PURE__ */ jsx7("div", { className: "md:w-3/5 aspect-square", children: token?.imageUrl && /* @__PURE__ */ jsx7(TokenImage_default, { imageUrl: token.imageUrl }) }),
      /* @__PURE__ */ jsxs4("div", { className: "mt-10 mb-5 w-full sm:w-3/4 md:w-2/5", children: [
        /* @__PURE__ */ jsxs4("div", { className: "flex flex-row items-center w-full gap-2 mb-3 md:mb-6", children: [
          /* @__PURE__ */ jsx7(
            "button",
            {
              className: "bg-gray-400 opacity-70 hover:opacity-100 text-base font-bold py-1 px-2 rounded-full text-md aspect-square disabled:opacity-25 leading-none",
              disabled: !tokenId || tokenId <= 0,
              onClick: () => {
                tokenId !== void 0 && tokenId >= 0 && setTokenId(tokenId - 1);
              },
              children: "\u2190"
            }
          ),
          /* @__PURE__ */ jsx7(
            "button",
            {
              className: "bg-slate-400 opacity-70 hover:opacity-100 text-base font-bold py-1 px-2 rounded-full text-md aspect-square disabled:opacity-25 leading-none",
              disabled: tokenId === auctionData?.auctionId,
              onClick: () => {
                tokenId !== void 0 && tokenId < auctionData?.auctionId && setTokenId(tokenId + 1);
              },
              children: "\u2192"
            }
          )
        ] }),
        /* @__PURE__ */ jsx7("h1", { className: "text-4xl md:text-5xl font-bold", children: token?.name ? token?.name : /* @__PURE__ */ jsx7(Fragment2, {}) }),
        auctionData?.auctionId === tokenId ? /* @__PURE__ */ jsx7(Fragment2, { children: /* @__PURE__ */ jsxs4("div", { className: "flex gap-5", children: [
          /* @__PURE__ */ jsxs4("div", { className: "my-5", children: [
            /* @__PURE__ */ jsx7("p", { className: "text-md text-text-base opacity-40", children: "highest bid" }),
            /* @__PURE__ */ jsxs4("p", { className: "text-3xl font-bold text-text-base", children: [
              "\u039E ",
              auctionData?.highestBid
            ] })
          ] }),
          /* @__PURE__ */ jsxs4("div", { className: "my-5", children: [
            /* @__PURE__ */ jsx7("p", { className: "text-md text-text-base opacity-40", children: "auction ends" }),
            /* @__PURE__ */ jsx7(
              "button",
              {
                className: "font-bold text-text-base text-left",
                onClick: () => {
                  toggleCountdown(!showCountdown);
                },
                children: showCountdown ? auctionData?.endTime && /* @__PURE__ */ jsx7("span", { className: "text-3xl", children: /* @__PURE__ */ jsx7(
                  Countdown,
                  {
                    renderer: countdownRenderer,
                    daysInHours: true,
                    date: auctionData.endTime
                  }
                ) }) : /* @__PURE__ */ jsxs4(Fragment2, { children: [
                  /* @__PURE__ */ jsxs4("span", { className: "text-left text-lg", children: [
                    date,
                    " ",
                    time
                  ] }),
                  /* @__PURE__ */ jsx7("span", { className: "text-left text-lg" })
                ] })
              }
            )
          ] })
        ] }) }) : /* @__PURE__ */ jsx7(Fragment2, { children: auctionData?.highestBidder && /* @__PURE__ */ jsxs4("div", { className: "my-5", children: [
          /* @__PURE__ */ jsx7("p", { className: "text-md text-text-base opacity-40", children: "owned by" }),
          /* @__PURE__ */ jsx7("p", { className: "text-3xl font-bold text-text-base truncate w-full max-w-[300px]", children: /* @__PURE__ */ jsx7(Account, { address: token.owner, chainId: dao.chainId }) })
        ] }) }),
        tokenId && tokenId === auctionData?.auctionId && /* @__PURE__ */ jsxs4(Fragment2, { children: [
          /* @__PURE__ */ jsx7(
            BidForm,
            {
              tokenId: auctionData?.auctionId,
              formData,
              dao,
              theme
            }
          ),
          auctionData?.highestBidder !== constants4.AddressZero && /* @__PURE__ */ jsx7("div", { className: "my-5", children: /* @__PURE__ */ jsxs4("p", { className: "text-1xl font-bold text-text-base truncate w-full max-w-[300px] flex flex-row gap-3 justify-between", children: [
            /* @__PURE__ */ jsx7(Account, { address: auctionData?.highestBidder, chainId: dao.chainId }),
            /* @__PURE__ */ jsxs4("span", { className: "text-md text-text-base opacity-40", children: [
              "\u039E ",
              auctionData.highestBid
            ] })
          ] }) })
        ] })
      ] })
    ] }) }) }) : /* @__PURE__ */ jsx7(Fragment2, {})
  ] });
};

// lib/components/CollectionList.tsx
import { useEffect as useEffect12, useState as useState10 } from "react";

// lib/components/NFT.tsx
import cx3 from "classnames";
import Skeleton2 from "react-loading-skeleton";
import { Fragment as Fragment3, jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
var NFT = ({ token, showDetails, dao, inCollectionList, hideLabels }) => {
  const { owner, name: name2, imageUrl, mintInfo } = token;
  return /* @__PURE__ */ jsx8("div", { className: cx3("flex flex-col", !inCollectionList && "md:flex-row md:items-center"), children: /* @__PURE__ */ jsxs5(Fragment3, { children: [
    /* @__PURE__ */ jsx8("div", { className: cx3("w-full h-full", !inCollectionList && "md:w-2/3"), children: /* @__PURE__ */ jsx8(TokenImage_default, { imageUrl, inCollectionList }) }),
    !hideLabels && /* @__PURE__ */ jsxs5(
      "div",
      {
        className: cx3(
          "py-2 rounded-md rounded-t-none gap-5",
          !inCollectionList && "md:p-8 !md:rounded-md !md:rounded-l-none md:flex md:flex-col md:h-full md:w-1/3"
        ),
        children: [
          /* @__PURE__ */ jsx8(
            "p",
            {
              className: cx3(
                "text-md font-bold",
                inCollectionList && "lg:text-md",
                !inCollectionList && "text-2xl md:text-4xl"
              ),
              children: name2 || /* @__PURE__ */ jsx8(Skeleton2, { className: "text-2xl md:text-4xl" })
            }
          ),
          showDetails && /* @__PURE__ */ jsxs5("div", { className: "grid grid-cols-12 gap-5 md:flex md:flex-col", children: [
            /* @__PURE__ */ jsx8("div", { className: "col-span-4 md:col-span-6", children: /* @__PURE__ */ jsxs5(Fragment3, { children: [
              /* @__PURE__ */ jsx8("p", { className: "text-sm text-slate-400", children: "Owner" }),
              /* @__PURE__ */ jsx8("p", { className: "text-md truncate font-bold w-full", children: owner ? /* @__PURE__ */ jsx8(Account, { address: owner, chainId: dao.chainId }) : /* @__PURE__ */ jsx8(Skeleton2, { className: "text-md" }) })
            ] }) }),
            /* @__PURE__ */ jsxs5("div", { className: "col-span-4 md:col-span-3", children: [
              /* @__PURE__ */ jsx8("p", { className: "text-sm text-slate-400", children: "Minted on" }),
              /* @__PURE__ */ jsx8("p", { className: "text-md  truncate font-bold", children: mintInfo ? /* @__PURE__ */ jsx8("p", { className: "text-md truncate font-bold", children: new Date(mintInfo.blockTimestamp).toLocaleDateString("en-US") }) : /* @__PURE__ */ jsx8(Skeleton2, { className: "text-sm" }) })
            ] }),
            /* @__PURE__ */ jsxs5("div", { className: "col-span-4 md:col-span-3", children: [
              /* @__PURE__ */ jsx8("p", { className: "text-sm text-slate-400", children: "Member of" }),
              /* @__PURE__ */ jsx8("a", { href: dao.external_url, rel: "noopener", className: "no-underline", children: dao ? /* @__PURE__ */ jsxs5(Fragment3, { children: [
                dao.imageUrl && /* @__PURE__ */ jsx8("img", { src: dao.imageUrl, alt: `${dao.name} logo`, className: "rounded-md" }),
                /* @__PURE__ */ jsx8("p", { className: "text-md truncate font-bold", children: dao.name })
              ] }) : /* @__PURE__ */ jsx8(Skeleton2, { className: "text-md" }) })
            ] })
          ] })
        ]
      }
    )
  ] }) });
};

// lib/components/CollectionList.tsx
import { useMediaQuery } from "react-responsive";
import { jsx as jsx9, jsxs as jsxs6 } from "react/jsx-runtime";
var CollectionList = ({ dao, opts = {} }) => {
  const theme = opts?.theme;
  const rows = Number(opts?.rows) || 3;
  const itemsPerRow = Number(opts?.itemsPerRow) || 5;
  const sortDirection = opts?.sortDirection?.toUpperCase() || "ASC";
  const hideLabels = opts?.hideLabels === true || opts?.hideLabels === "true";
  const collection = useCollection(dao);
  const isMdOrAbove = useMediaQuery({ query: "(min-width: 786px)" });
  const [isDataLoaded, setIsDataLoaded] = useState10(false);
  const [tokens, setTokens] = useState10([]);
  useEffect12(() => {
    if (collection.length) {
      setIsDataLoaded(true);
      if (sortDirection === "DESC") {
        const sorted = [...collection].sort((a, b) => b.id - a.id);
        setTokens(sorted);
      } else
        setTokens(collection);
    }
  }, [collection, sortDirection]);
  return /* @__PURE__ */ jsxs6(ComponentWrapper_default, { theme, isDataLoaded, children: [
    !collection.length && /* @__PURE__ */ jsx9(Loading_default, {}),
    /* @__PURE__ */ jsx9(
      "div",
      {
        id: "collection",
        className: `mx-auto grid gap-8`,
        style: {
          gridTemplateColumns: isMdOrAbove ? `repeat(${itemsPerRow},minmax(0,1fr))` : "repeat(3,minmax(0,1fr))"
        },
        children: collection && tokens?.map((token, i) => {
          if (rows && i >= rows * itemsPerRow)
            return null;
          return /* @__PURE__ */ jsx9(
            "a",
            {
              href: `https://nouns.build/dao/${dao.contracts.collection}/${token.id}`,
              target: "_blank",
              rel: "noreferrer",
              children: /* @__PURE__ */ jsx9(
                NFT,
                {
                  token,
                  dao,
                  showDetails: false,
                  inCollectionList: true,
                  hideLabels
                }
              )
            },
            token.id
          );
        })
      }
    )
  ] });
};

// lib/components/MemberList.tsx
import { useEffect as useEffect13, useState as useState11 } from "react";
import { useMediaQuery as useMediaQuery2 } from "react-responsive";
import { jsx as jsx10, jsxs as jsxs7 } from "react/jsx-runtime";
var MemberList = ({ dao, opts = {} }) => {
  const theme = opts?.theme;
  const rows = Number(opts?.rows) || 3;
  const itemsPerRow = Number(opts?.itemsPerRow) || 6;
  const isMdOrAbove = useMediaQuery2({ query: "(min-width: 786px)" });
  const members = useMembers(dao);
  const [isDataLoaded, setIsDataLoaded] = useState11(false);
  useEffect13(() => {
    if (members.length) {
      setIsDataLoaded(true);
    }
  }, [members]);
  return /* @__PURE__ */ jsx10(ComponentWrapper_default, { theme, isDataLoaded, children: /* @__PURE__ */ jsx10(
    "div",
    {
      className: `mx-auto grid gap-3 md:gap-10`,
      style: {
        gridTemplateColumns: isMdOrAbove ? `repeat(${itemsPerRow},minmax(0,1fr))` : "repeat(3,minmax(0,1fr))"
      },
      children: members?.map((member, i) => {
        if (rows && i >= rows * itemsPerRow)
          return null;
        return /* @__PURE__ */ jsxs7("div", { className: "w-full", children: [
          /* @__PURE__ */ jsx10(Avatar, { address: member.address, chainId: dao.chainId }),
          /* @__PURE__ */ jsx10(Account, { address: member.address, chainId: dao.chainId, hideAvatar: true })
        ] }, i);
      })
    }
  ) });
};

// lib/components/PropHouseProps.tsx
import { useEffect as useEffect14, useState as useState12 } from "react";
import cx5 from "classnames";
import { useRoundsByHouse } from "use-prop-house";

// lib/components/shared/PropHouseProp.tsx
import cx4 from "classnames";

// lib/styles/shared.ts
var label = "text-sm text-slate-400";
var pill = "rounded-md px-2 py-1 text-center text-sm";
var statusColors = [
  "bg-red-200 text-red-800",
  "bg-green-200 text-green-800",
  "bg-gray-200 text-gray-500"
];

// lib/components/shared/PropHouseProp.tsx
import { Fragment as Fragment4, jsx as jsx11, jsxs as jsxs8 } from "react/jsx-runtime";
var PropHouseProp = ({ prop, format }) => {
  const { created, title, summary, proposer, isWinner } = prop;
  return /* @__PURE__ */ jsxs8(
    "div",
    {
      className: `h-full border border-theme-border p-3 md:p-5 rounded-lg hover:shadow-md shadow-none transition-shadow`,
      children: [
        format === "grid" && /* @__PURE__ */ jsx11("span", { className: "opacity-70", children: relative(created) }),
        /* @__PURE__ */ jsxs8("div", { className: "flex flex-row justify-between mb-2", children: [
          /* @__PURE__ */ jsx11("p", { className: "font-bold text-xl leading-snug", children: title }),
          isWinner && /* @__PURE__ */ jsx11("p", { className: cx4(pill, statusColors[1]), children: "Winner" })
        ] }),
        /* @__PURE__ */ jsx11("p", { className: "font-normal line-clamp-2 mb-2 opacity-70", children: summary }),
        /* @__PURE__ */ jsxs8("p", { className: "font-normal", children: [
          /* @__PURE__ */ jsx11("strong", { children: /* @__PURE__ */ jsx11(Account, { address: proposer, chainId: 1 }) }),
          format !== "grid" && /* @__PURE__ */ jsxs8(Fragment4, { children: [
            /* @__PURE__ */ jsx11("span", { className: "px-2 opacity-25", children: "\u2022" }),
            " ",
            /* @__PURE__ */ jsx11("span", { className: "opacity-70", children: relative(created) })
          ] })
        ] })
      ]
    }
  );
};

// lib/components/PropHouseProps.tsx
import { jsx as jsx12, jsxs as jsxs9 } from "react/jsx-runtime";
var getListFormatClasses = (format) => {
  return format === "grid" ? "grid grid-cols-1 md:grid-cols-3" : "flex flex-col";
};
var PropHouseProps = ({ opts = {} }) => {
  const theme = opts?.theme;
  const houseId = opts?.houseId ? Number(opts?.houseId) : 21;
  const roundName = opts?.round ?? "";
  const format = opts?.format || "list";
  const maxProposals = Number(opts?.max) || 12;
  const { data: roundData } = useRoundsByHouse({ houseId });
  const [round, setRound] = useState12();
  useEffect14(() => {
    const parseRounds = () => {
      const index = roundData.findIndex((r) => r.name === roundName);
      if (index >= 0)
        setRound(roundData[index]);
      else
        setRound(void 0);
    };
    if (roundName && roundData.length)
      parseRounds();
    else
      setRound(void 0);
  }, [roundName, roundData]);
  return /* @__PURE__ */ jsxs9(ComponentWrapper_default, { theme, isDataLoaded: roundData.length ? true : false, children: [
    !round && /* @__PURE__ */ jsx12("div", { id: "auction", children: /* @__PURE__ */ jsx12("div", { className: "flex justify-center mx-auto", children: /* @__PURE__ */ jsx12("div", { className: "h-full text-center w-full flex flex-col md:flex-row md:gap-10 items-center", children: /* @__PURE__ */ jsx12("p", { className: "bg-slate-50 p-4 md:p-10 w-full", children: "No auction found" }) }) }) }),
    /* @__PURE__ */ jsx12("div", { id: "ph-rounds", className: cx5(`mx-auto gap-5 `, getListFormatClasses(format)), children: round && round.proposals.map((prop, i) => {
      if (i >= maxProposals)
        return null;
      return /* @__PURE__ */ jsx12("a", { href: prop.url, target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsx12(PropHouseProp, { prop, format }) }, prop.id);
    }) })
  ] });
};

// lib/components/PropHouseRounds.tsx
import { useEffect as useEffect15, useState as useState13 } from "react";
import { useRoundsByHouse as useRoundsByHouse2 } from "use-prop-house";

// lib/components/shared/PropHouseRound.tsx
import cx6 from "classnames";
import { jsx as jsx13, jsxs as jsxs10 } from "react/jsx-runtime";
var getStatusColorClasses = (status) => {
  switch (status.toLowerCase()) {
    case "proposing":
      return "bg-blue-200 text-blue-500";
    case "voting":
      return "bg-green-200 text-green-500";
    default:
      return "bg-gray-200 text-gray-500";
  }
};
var PropHouseRound = ({ round }) => {
  const { name: name2, description, status, proposals, funding, proposalDeadline } = round;
  const statusColor = getStatusColorClasses(status);
  return /* @__PURE__ */ jsxs10("div", { className: "h-full border border-theme-border p-3 md:p-5 rounded-lg hover:shadow-md shadow-none transition-shadow", children: [
    /* @__PURE__ */ jsxs10("div", { children: [
      /* @__PURE__ */ jsxs10("div", { className: "flex flex-row justify-between mb-3", children: [
        /* @__PURE__ */ jsx13("p", { className: "font-bold text-xl leading-snug", children: name2 }),
        /* @__PURE__ */ jsx13("p", { className: cx6(pill, statusColor), children: status })
      ] }),
      /* @__PURE__ */ jsx13("p", { className: "line-clamp-3 font-normal text-xs md:text-base", children: description })
    ] }),
    /* @__PURE__ */ jsxs10("div", { className: "flex flex-row gap-3 justify-between pt-3 md:pt-5", children: [
      /* @__PURE__ */ jsxs10("div", { children: [
        /* @__PURE__ */ jsx13("p", { className: label, children: "Funding" }),
        /* @__PURE__ */ jsx13("p", { className: "font-bold", children: `${funding.amount} ${funding.currency} ${String.fromCharCode(
          215
        )} ${funding.winners}` })
      ] }),
      /* @__PURE__ */ jsxs10("div", { children: [
        /* @__PURE__ */ jsx13("p", { className: label, children: "Prop deadline" }),
        /* @__PURE__ */ jsx13("p", { className: "font-bold", children: relative(proposalDeadline) })
      ] }),
      /* @__PURE__ */ jsxs10("div", { children: [
        /* @__PURE__ */ jsx13("p", { className: label, children: "Proposals" }),
        /* @__PURE__ */ jsx13("p", { className: "font-bold", children: proposals.length })
      ] })
    ] })
  ] });
};

// lib/components/PropHouseRounds.tsx
import { jsx as jsx14 } from "react/jsx-runtime";
var PropHouseRounds = ({ opts = {} }) => {
  const theme = opts?.theme;
  const houseId = opts?.houseId ? Number(opts?.houseId) : 21;
  const sortDirection = opts?.sortDirection?.toUpperCase() || "DESC";
  const rows = Number(opts?.rows) || 3;
  const itemsPerRow = Number(opts?.itemsPerRow) || 2;
  const [isDataLoaded, setIsDataLoaded] = useState13(false);
  const { data: roundData } = useRoundsByHouse2({ houseId });
  const [rounds, setRounds] = useState13([]);
  useEffect15(() => {
    if (sortDirection === "ASC") {
      const sorted = [...roundData].sort((a, b) => a.created - b.created);
      setRounds(sorted);
    } else {
      const sorted = [...roundData].sort((a, b) => b.created - a.created);
      setRounds(sorted);
    }
  }, [roundData, sortDirection]);
  return /* @__PURE__ */ jsx14(ComponentWrapper_default, { theme, isDataLoaded: roundData.length ? true : false, children: /* @__PURE__ */ jsx14("div", { id: "ph-rounds", className: `mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5`, children: rounds.map((round, i) => {
    if (rows && i >= rows * itemsPerRow)
      return null;
    return /* @__PURE__ */ jsx14("a", { href: round.url, target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsx14(PropHouseRound, { round }) }, round.id);
  }) }) });
};

// lib/components/ProposalList.tsx
import { useEffect as useEffect16, useState as useState14 } from "react";

// lib/components/ProposalListItem.tsx
import cx7 from "classnames";
import { Fragment as Fragment5, jsx as jsx15, jsxs as jsxs11 } from "react/jsx-runtime";
var statusColors2 = {
  pending: "bg-yellow-200 text-yellow-800",
  active: "bg-green-200 text-green-800",
  executed: "bg-green-200 text-green-800",
  defeated: "bg-red-200 text-red-800",
  canceled: "bg-red-200 text-red-800",
  queued: "bg-yellow-200 text-yellow-800",
  unknown: "bg-gray-200 text-gray-500"
};
var ProposalListItem = ({ dao, proposal }) => {
  const { id, status, title, voteStart, voteEnd } = proposal;
  const { collection } = dao.contracts;
  return /* @__PURE__ */ jsx15("a", { href: `https://nouns.build/dao/${collection}/vote/${id}`, children: /* @__PURE__ */ jsxs11(
    "div",
    {
      className: `flex flex-col-reverse md:flex-row justify-between gap-3 border border-theme-border p-3 md:p-5 rounded-lg hover:shadow-md shadow-none transition-shadow`,
      children: [
        /* @__PURE__ */ jsxs11("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx15("p", { className: "text-xl font-bold leading-snug", children: title }),
          /* @__PURE__ */ jsx15("p", { className: "text-sm opacity-40", children: relative(voteStart) })
        ] }),
        /* @__PURE__ */ jsx15("div", { className: "flex flex-row md:flex-row-reverse items-center gap-3", children: status && /* @__PURE__ */ jsxs11(Fragment5, { children: [
          /* @__PURE__ */ jsx15(
            "p",
            {
              className: cx7(
                statusColors2[status.toLowerCase() || "unknown"],
                "rounded-lg px-3 py-2 text-center font-bold text-xs md:text-base"
              ),
              children: status
            }
          ),
          status === "Active" && /* @__PURE__ */ jsxs11("p", { className: "text-sm opacity-40", children: [
            "ends ",
            relative(voteEnd)
          ] })
        ] }) })
      ]
    }
  ) });
};

// lib/components/ProposalList.tsx
import { jsx as jsx16 } from "react/jsx-runtime";
var ProposalList = ({ dao, opts = {} }) => {
  const theme = opts?.theme;
  const sortDirection = opts?.sortDirection?.toUpperCase() || "DESC";
  const maxProposals = Number(opts?.max) || 10;
  const [isDataLoaded, setIsDataLoaded] = useState14(false);
  const props = useProposals(dao);
  const [proposals, setProposals] = useState14([]);
  useEffect16(() => {
    if (props.length) {
      setIsDataLoaded(true);
      if (sortDirection === "ASC") {
        const sorted = [...props].sort((a, b) => a.created - b.created);
        setProposals(sorted);
      } else
        setProposals(props);
    }
  }, [props, sortDirection]);
  return /* @__PURE__ */ jsx16(ComponentWrapper_default, { theme, isDataLoaded, children: /* @__PURE__ */ jsx16("div", { id: "proposal-list", className: "flex flex-col gap-6", children: proposals?.map((proposal, i) => {
    if (maxProposals && i >= maxProposals)
      return null;
    return /* @__PURE__ */ jsx16(ProposalListItem, { dao, proposal }, proposal.id);
  }) }) });
};

// lib/components/Treasury.tsx
import { useEffect as useEffect17, useRef as useRef3, useState as useState15 } from "react";
import { useBalance } from "wagmi";
import { jsx as jsx17, jsxs as jsxs12 } from "react/jsx-runtime";
var Treasury = ({ dao, opts = {} }) => {
  const ref = useRef3(null);
  const theme = opts?.theme;
  const address = dao.contracts.treasury;
  const [balance, setBalance] = useState15("0");
  useBalance({
    address,
    chainId: dao.chainId,
    onSettled(data, error) {
      if (error) {
        console.error(error);
        setBalance("0");
      } else {
        const balance2 = data?.formatted ?? "0";
        const pIndex = balance2.indexOf(".");
        if (pIndex && pIndex > 0)
          setBalance(balance2.slice(0, pIndex + 3));
        else
          setBalance(balance2);
      }
    }
  });
  useEffect17(() => {
    if (ref.current != null) {
      const target = ref.current;
      applyTheme(target, theme);
    }
  }, [theme, ref]);
  return /* @__PURE__ */ jsx17(
    "a",
    {
      href: "https://etherscan.io/address/" + address,
      className: "w-fit block text-text-base bg-background border border-theme-border p-3 md:p-5 rounded-lg hover:shadow-md shadow-none transition-shadow",
      rel: "noreferrer",
      target: "_blank",
      ref,
      children: /* @__PURE__ */ jsxs12("p", { className: "font-bold", children: [
        /* @__PURE__ */ jsx17("span", { className: "opacity-60 inline-block mr-3", children: "Treasury" }),
        "\u039E ",
        balance
      ] })
    }
  );
};
export {
  AuctionHero,
  BuilderDAO,
  CollectionList,
  MemberList,
  PropHouseProps,
  PropHouseRounds,
  ProposalList,
  Treasury,
  useAuction,
  useCollection,
  useDao,
  useMembers,
  useProposals,
  useToken
};
