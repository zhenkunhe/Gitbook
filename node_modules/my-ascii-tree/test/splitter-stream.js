var fs = require('fs');
var chai = require('chai');
var through = require('through2');
var assert = require('assert');
var splitterStream = require('../lib/splitter-stream');
var BytesLine = require('../lib/bytes-line');
var fixtures = require('./fixtures');

var expect = chai.expect;
/**
because stream catch all errors, include assertion errors.
So I just pinrt it.
*/
describe('splitterStream', function() {
  describe('#pipe()', function() {
    it('should convert to byteslines.', function(done) {
      var count = 0;
      var lines = [];
      var src = through.obj(function(buf, enc, cb) {
        cb(null, buf);
      });

      src.pipe(splitterStream())
        .pipe(through.obj(function(line, enc, cb) {
          count++;
          lines.push(line);
          cb();
        }))
        .on('finish', function() {
          assert.equal(fixtures.stringArray.length, count);
          lines.forEach(function(it) {
            assert(it instanceof BytesLine);
          });
          done();
        });

      fixtures.stringArray.forEach(function(it) {
        src.write(it);
        src.write('\r');
      });
      src.write('\r');
      src.write('\r\r\r\r');
      src.end();
    });

    it('should handle short line.', function(done) {
      var count = 0;
      var lines = [];
      var rs = fs.createReadStream('fixtures/gbk.txt')
        .pipe(splitterStream())
        .pipe(through.obj(function(line, enc, cb) {
          count++;
          lines.push(line);
          cb();
        }))
        .on('finish', function() {
          assert.equal(1, count);
          assert(BytesLine.isBytesLine(lines[0]), 'should be BytesLine');
          assert.deepEqual([0x0D, 0x0A], lines[0].separator);
          done();
        });
    });

    it('should handle long line.', function(done) {
      var count = 0;
      var lines = [];
      var rs = fs.createReadStream('fixtures/longline.txt')
        .pipe(splitterStream())
        .pipe(through.obj(function(sl, enc, cb) {
          count++;
          lines.push(sl);
          cb();
        }))
        .on('finish', function() {
          assert.equal(1, lines.length);
          assert.deepEqual([0x0D, 0x0A], lines[0].separator);
          done();
        });
    });
  });
});
