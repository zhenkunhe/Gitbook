var lineUtil = require('./line-util');
var TreeLine = require('./tree-line');
var BytesLine = require('./bytes-line');
var os = require('os');

module.exports = AsciiTree;

/**
 * @constructor
 * @param {BytesLine[]} - array of BytesLine
 * @param {number} [leadingCharCode] - charCode of leading.Optional, will guess.
 * @param {string} [enc=UTF-8] - encoding.
 */
function AsciiTree(lines, leadingCharCode, enc) {
  this.lines = lines || [];
  this.leadingCharCode = leadingCharCode || lineUtil.guessLeadingCharCode(this.lines);
  this.topLine = null;
  this.enc = Buffer.isEncoding(enc) ? enc : null;
  this.prepends = [];
  this.appends = [];
}
/**
 * @function
 * @memberof AsciiTree
 * @instance
 * @return {Buffer[]} - converted Buffers.
 */
AsciiTree.prototype.toBufferArray = function() {
  var enc = this.enc;
  return this.toBytesLineArray().map(function(it) {
    return it.toBuffer();
  });
};
/**
 * @function
 * @memberof AsciiTree
 * @instance
 * @return {string[]} - converted lines.
 */
AsciiTree.prototype.toStringArray = function() {
  var enc = this.enc;
  return this.toBufferArray().map(function(it) {
    return enc ? it.toString(enc) : it.toString();
  });
};
/**
 * @function
 * @memberof AsciiTree
 * @instance
 * @return {byte[]} - the separator of tree line.
 */
AsciiTree.prototype.getSeparator = function() {
  return this.lines.length > 0 ? this.lines[0].separator : os.EOL;
};

/**
 * @function
 * @memberof AsciiTree
 * @instance
 * @param {(string|string[])} - String or String Array to prepend. old tailed newline will to be trimed. new newline will to appended.
 * @param {string} [enc=UTF-8] - Optional encoding.
 * @return {AsciiTree} - return this instance.
 */

AsciiTree.prototype.prepend = function(toadd, enc) {
  var toadds = Array.isArray(toadd) ? toadd : [toadd],
    converted = [],
    self = this,
    separator = this.getSeparator();

  converted = toadds.map(function(it) {
    return BytesLine.fromString(it, separator, enc);
  });
  converted.forEach(function(it) {
    self.prepends.push(it);
  });
  return this;
};

/**
 * @function
 * @memberof AsciiTree
 * @instance
 * @param {(string|string[])} - String or String Array to append. old tailed newline will to be trimed. new newline will to appended.
 * @param {string} [enc=UTF-8] - Optional encoding.
 * @return {AsciiTree} - return this instance.
 */

AsciiTree.prototype.append = function(toadd, enc) {
  var toadds = Array.isArray(toadd) ? toadd : [toadd],
    converted = [],
    lines = this.lines,
    self = this,
    separator = this.getSeparator(),
    lastLine = lines.length > 0 ? lines[lines.length - 1] : null;

  if (lastLine) {
    if (lastLine.separator.length === 0) {
      lastLine.separator = this.getSeparator();
    }
  }

  converted = toadds.map(function(it) {
    return BytesLine.fromString(it, separator, enc);
  });

  converted.forEach(function(it) {
    self.appends.push(it);
  });
  return this;
};

/**
 * @function
 * @memberof AsciiTree
 * @instance
 * @return {string} - converted string.
 */
AsciiTree.prototype.toString = function() {
  return this.toStringArray().reduce(function(val, it) {
    return val + it;
  }, "");
};

/**
 * @function
 * @memberof AsciiTree
 * @instance
 * @return {BytesLine[]} - return array of BytesLine.
 */
AsciiTree.prototype.toBytesLineArray = function() {
  return this.prepends.concat(this.topLine.toLines(), this.appends);
};

/**
 * @function
 * @memberof AsciiTree
 * @instance
 * @return {AsciiTree} - return this instance.
 */
AsciiTree.prototype.convert = function() {
  var topLine = new TreeLine(),
    leadingCharCode = this.leadingCharCode,
    currentLine = topLine;

  this.lines.forEach(function(it) {
    if (!it.isWhiteLine()) {
      currentLine = currentLine.addChild(new TreeLine(it, leadingCharCode));
    }
  }, this);
  topLine.setupMeta();
  this.topLine = topLine;
  return this;
};
