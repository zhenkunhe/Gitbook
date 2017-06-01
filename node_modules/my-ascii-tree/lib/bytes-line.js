var AbstractLine = require('./abstract-line');
var util = require('util');
var Char = require('./char');
var LineUtil = require('./line-util');

module.exports = BytesLine;

/**
 * @constructor
 * @augments AbstractLine
 * @param {(byte[]|Buffer)} content - array of byte.
 * @param {byte[]} separator - line separator.
 */
function BytesLine(content, separator) {
  content = content || [];
  separator = separator || [];
  if (Buffer.isBuffer(content)) {
    content = LineUtil.buffer2bytes(content);
  }
  AbstractLine.call(this, content, separator);
}

util.inherits(BytesLine, AbstractLine);

/**
 * @function
 * @memberof BytesLine
 * @instance
 * @return {string} - return string present of this BytesLine.
 */
BytesLine.prototype.getStringContent = function() {
  return new Buffer(this.content).toString();
};

BytesLine.prototype.prepend = function(prepend) {
  var buf = new Buffer(prepend),
    i = 0,
    a = [];
  for (; i < buf.length; i++) {
    a.push(buf[i]);
  }
  this.content = a.concat(this.content);
};

/**
 * if all of content are white character, return true.
 * @function
 * @memberof BytesLine
 * @instance
 * @return {Boolean}
 */

BytesLine.prototype.isWhiteLine = function() {
  var c = this.content,
    i;
  for (i = 0; i < c.length; i++) {
    if (!Char.isWhiteSpace(c[i])) {
      return false;
    }
  }
  return true;
};


/**
 * trim leadingCode and return the number trimed.
 * @function
 * @memberof BytesLine
 * @instance
 * @param {number} leadingCode - charCode
 * @return {Number} - the number of trimed leadingCode
 */
BytesLine.prototype.dropLeadingCode = function(leadingCode) {
  var c = this.content,
    i = 0;
  for (; i < c.length; i++) {
    if (c[i] !== leadingCode) {
      break;
    }
  }
  if (i > 0) {
    this.content = this.content.slice(i);
  }
  return i;
};

/**
 * if content and separator are both empty, is empty.
 * @function
 * @memberof BytesLine
 * @instance
 * @return {Boolean}
 */
BytesLine.prototype.isEmpty = function() {
  return this.content.length === 0 && this.separator.length === 0;
};

/**
 * @function
 * @memberof BytesLine
 * @instance
 * @return {Buffer} - convert this BytesLine to Buffer. Include content and separator.
 */
BytesLine.prototype.toBuffer = function() {
  return new Buffer(this.content.concat(this.separator));
};

/** @namespace BytesLine */

/**
 * @function
 * @memberof BytesLine
 * @static
 * @return {Boolean}
 */
BytesLine.isBytesLine = function(o) {
  return typeof o === 'object' && o instanceof BytesLine;
};

/**
 * @function
 * @memberof BytesLine
 * @static
 * @param {string}
 * @param {byte[]} separator
 * @param {string} [enc=UTF-8]
 * @return {BytesLine}
 */
BytesLine.fromString = function(str, separator, enc) {
  var buf = enc ? new Buffer(str, enc) : new Buffer(str);
  return  new BytesLine(buf, separator);
};

/**
 * get array of BytesLine.
 * @function
 * @memberof BytesLine
 * @static
 * @param {(string|Buffer)} src
 * @param {string} [enc=UTF-8] - encoding.
 * @return {BytesLine[]}
 */
BytesLine.getArray = function(src, enc) {
  if (!src) {
    return [];
  }
  enc = Buffer.isEncoding(enc) ? enc : null;
  var i = 0,
    code,
    lines = [],
    crlf = [],
    byteArray = [],
    crlfReached = false;

  if (typeof src === 'string') {
    src = enc ? new Buffer(src, enc) : new Buffer(src);
  }
  for (; i < src.length; i++) {
    code = src[i];
    if (code === 0x0D || code === 0x0A) {
      crlf.push(code);
      crlfReached = true;
    } else {
      if (crlfReached) {
        lines.push(new BytesLine(byteArray, crlf));
        byteArray = [];
        crlf = [];
      }
      byteArray.push(code);
      crlfReached = false;
    }
  }

  if (byteArray.length > 0 || crlf.length > 0) {
    lines.push(new BytesLine(byteArray, crlf));
  }
  return lines;
};
