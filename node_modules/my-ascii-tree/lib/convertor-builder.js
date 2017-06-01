var BytesLine = require('./bytes-line');
var AsciiTree = require('./ascii-tree');
var Convertor = require('./convertor');

module.exports = ConvertorBuilder;
/**
 * A helper class to create Convertor.
 * @constructor
 */
function ConvertorBuilder() {
  this.content = null;
}

/**
 * @function
 * @instance
 * @memberof ConvertorBuilder
 * @param {Buffer|string} content
 * @param {string} enc - string encoding.
 * @return {ConvertorBuilder} - return this instance.
 */
ConvertorBuilder.prototype.withContent = function(content, enc) {
  this.content = content;
  this.enc = Buffer.isEncoding(enc) ? enc : null;
  return this;
};

/**
 * @function
 * @memberof ConvertorBuilder
 * @instance
 * @param {string} startTag
 * @return {ConvertorBuilder} - return this instance.
 */
ConvertorBuilder.prototype.withStartTag = function(startTag) {
  this.startTag = startTag;
  return this;
};

/**
 * @function
 * @memberof ConvertorBuilder
 * @instance
 * @param {string} endTag
 * @return {ConvertorBuilder} - return this instance.
 */
ConvertorBuilder.prototype.withEndTag = function(endTag) {
  this.endTag = endTag;
  return this;
};
/**
 * @function
 * @memberof ConvertorBuilder
 * @instance
 * @param {string} enc - encoding.
 * @return {ConvertorBuilder} - return this instance.
 */
ConvertorBuilder.prototype.withEncode = function(enc) {
  this.enc = Buffer.isEncoding(enc) ? enc : null;
  return this;
};

/**
 * @function
 * @memberof ConvertorBuilder
 * @instance
 * @param {string|Buffer} prepend
 * @return {ConvertorBuilder} - return this instance.
 */
ConvertorBuilder.prototype.withPrepend = function(prepend) {
  this.prepend = prepend;
  return this;
};

/**
 * @function
 * @memberof ConvertorBuilder
 * @instance
 * @param {string|Buffer} append
 * @return {ConvertorBuilder} - return this instance.
 */
ConvertorBuilder.prototype.withAppend = function(append) {
  this.append = append;
  return this;
};

/**
 * create an AsciiTree instance.
 * @function
 * @memberof ConvertorBuilder
 * @instance
 * @return {AsciiTree}
 */
ConvertorBuilder.prototype.build = function() {
  return new Convertor(this.content, this.startTag, this.endTag, this.prepend, this.append, this.enc);
};
