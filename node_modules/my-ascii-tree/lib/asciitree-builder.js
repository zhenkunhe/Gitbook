var BytesLine = require('./bytes-line');
var AsciiTree = require('./ascii-tree');

module.exports = AsciiTreeBuilder;

/**
 * A helper class to create AsciiTree.
 * @constructor
 */
function AsciiTreeBuilder() {
  this.content = null;
}

/**
 * @function withContent
 * @memberof AsciiTreeBuilder
 * @instance
 * @param {string|Buffer} content
 * @param {string} enc - string encoding.
 * @return {AsciiTreeBuilder} - return this instance.
 */
AsciiTreeBuilder.prototype.withContent = function(content, enc) {
  this.content = content;
  this.enc = Buffer.isEncoding(enc) ? enc : null;
  return this;
};

/**
 * @function
 * @memberof AsciiTreeBuilder
 * @instance
 * @param {string} enc - encoding.
 * @return {AsciiTreeBuilder} - return this instance.
 */

AsciiTreeBuilder.prototype.withEncode = function(enc) {
  this.enc = enc;
  return this;
};

/**
 * create an AsciiTree instance.
 * @function
 * @instance
 * @memberof AsciiTreeBuilder
 * @return {AsciiTree} - created AsciiTree instance.
 */
AsciiTreeBuilder.prototype.build = function() {
  bytesLines = BytesLine.getArray(this.content, this.enc);
  return new AsciiTree(bytesLines, null, this.enc);
};
