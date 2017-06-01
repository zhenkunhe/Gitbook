/**
 * require('splitter-stream')();
 * @module
 */
var through2 = require('through2');
var BytesLine = require('./bytes-line');

// windows 0d0a, unix 0a, mac 0d(os9 early) 0a(new version).
var OD = 0x0D;
var OA = 0x0A;

module.exports = SplitStream;

function toBuffer(bufOrStr, enc) {
  enc = Buffer.isEncoding(enc) ? enc : null;
  if (typeof bufOrStr === 'string') {
    return enc ? new Buffer(bufOrStr, enc) : new Buffer(bufOrStr);
  } else {
    return bufOrStr;
  }
}

/**
 * @function
 * @return {Transform}
 */
function SplitStream() {
  var byteArray = [];
  var crlf = [];
  var crlfReached = false;

  return through2.obj(function(buf, enc, cb) {
    buf = toBuffer(buf, enc);
    var i = 0,
      code;
    for (; i < buf.length; i++) {
      code = buf[i];
      if (code === OD || code === OA) {
        crlf.push(code);
        crlfReached = true;
      } else {
        if (crlfReached) {
          this.push(new BytesLine(byteArray, crlf));
          byteArray = [];
          crlf = [];
        }
        byteArray.push(code);
        crlfReached = false;
      }
    }
    cb(); // I had process this buf.
  }, function(cb) {
    if (byteArray.length > 0 || crlf.length > 0) {
      this.push(new BytesLine(byteArray, crlf));
      byteArray = [];
      crlf = [];
    }
    cb();
  });
}
