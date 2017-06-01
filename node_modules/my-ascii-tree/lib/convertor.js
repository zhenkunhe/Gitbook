var BytesLine = require('./bytes-line');
var AsciiTree = require('./ascii-tree');
var os = require('os');

module.exports = Convertor;

/**
 * @constructor
 * @param {(string|Buffer)} bufOrStr
 * @param {string|Regex} startTag
 * @param {string|Regex} endTag
 * @param {String|Buffer} prepend - add extra lines before converted tree content.
 * @param {String|Buffer} append - add extra lines after converted tree content.
 * @param {{string}} [enc=UTF-8] - encoding.
 */
function Convertor(bufOrStr, startTag, endTag, prepend, append, enc) {
  enc = Buffer.isEncoding(enc) ? enc : null;
  if (typeof bufOrStr === 'string') {
    this.buf = enc ? new Buffer(bufOrStr, enc) : new Buffer(bufOrStr);
  } else {
    this.buf = bufOrStr;
  }
  this.startTag = startTag;
  this.endTag = endTag;

  prepend = BytesLine.getArray(prepend, enc);
  append = BytesLine.getArray(append, enc);

  if (prepend.length > 0) {
    this.prepend = prepend;
  }

  if (append.length > 0) {
    this.append = append;
  }

  this.enc = enc;
  this.mixedLines = [];
}
/**
 * process all AsciiTree in buffer.
 * @function
 * @memberof Convertor
 * @instance
 * @return {Convertor} - return this.
 */

Convertor.prototype.convert = function() {
  var i = 0,
    allLines = BytesLine.getArray(this.buf),
    oneLine,
    lineArray = [],
    startTagReached = false,
    lineType;
  for (; i < allLines.length; i++) {
    oneLine = allLines[i];
    lineType = oneLine.isTagLine(this.startTag, this.endTag);
    if (lineType === 'START') {
      startTagReached = true;
    } else if (lineType === 'END') {
      if (this.prepend) {
        this.mixedLines.push(this.prepend);
      }
      this.mixedLines.push(new AsciiTree(lineArray).convert().toBytesLineArray());
      if (this.append) {
        this.mixedLines.push(this.append);
      }
      lineArray = [];
      startTagReached = false;
    } else {
      if (startTagReached) {
        lineArray.push(oneLine);
      } else {
        this.mixedLines.push(oneLine);
      }
    }
  }

  for (i = 0; i < lineArray.length; i++) {
    this.mixedLines.push(lineArray[i]);
  }
  return this;
};
/**
 * @function
 * @memberof Convertor
 * @instance
 * @return {Buffer[]} - flatted array of Buffer.
 */
Convertor.prototype.toBufferArray = function() {
  var flattedLines = this.mixedLines.reduce(function(val, it) {
    return val.concat(it);
  }, []);

  return flattedLines.map(function(it) {
    return it.toBuffer();
  });
};
/**
 * @function
 * @memberof Convertor
 * @instance
 * @return {string[]} - array of string.
 */
Convertor.prototype.toStringArray = function() {
  var enc = this.enc,
    bufs = this.toBufferArray();
  return bufs.map(function(it) {
    return enc ? it.toString(enc) : it.toString();
  });
};

/**
 * @function
 * @memberof Convertor
 * @instance
 * @return {Buffer} - whole buffer with asciitree converted.
 */
Convertor.prototype.toBuffer = function() {
  return Buffer.concat(this.toBufferArray());
};

/**
 * return whole string as result.
 * @function
 * @memberof Convertor
 * @instance
 * @return {string} - return whole converted string.
 */
Convertor.prototype.toString = function() {
  var enc = this.enc,
    buf = this.toBuffer();

  return enc ? buf.toString(enc) : buf.toString();
};
