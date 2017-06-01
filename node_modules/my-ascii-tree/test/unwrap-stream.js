var chai = require('chai');
var assert = require('assert');
var unwrapStream = require('../lib/unwrap-stream');
var through = require('through2');
var BytesLine = require('../lib/bytes-line');

var expect = chai.expect;

describe('unwrapStream', function() {
  it("should handle empty bytesline.", function(done) {
    var bytesLineAry = [];
    var src = through.obj(function(buf, enc, cb) {
      cb(null, buf);
    });

    src.pipe(unwrapStream()).pipe(through.obj(function(buf, enc, cb) {
      bytesLineAry.push(buf);
      cb();
    })).on('finish', function() {
      assert.deepEqual([new Buffer([])], bytesLineAry);
      done();
    });
    src.write(new BytesLine([], []));
    src.end();

  });

  it("should handle separator bytesline.", function(done) {
    var bytesLineAry = [];
    var src = through.obj(function(buf, enc, cb) {
      cb(null, buf);
    });

    src.pipe(unwrapStream()).pipe(through.obj(function(buf, enc, cb) {
      bytesLineAry.push(buf);
      cb();
    })).on('finish', function() {
      assert.deepEqual([new Buffer([0x0D, 0x0A])], bytesLineAry);
      done();
    });
    src.write(new BytesLine([], [0x0D, 0x0A]));
    src.end();

  });
});
