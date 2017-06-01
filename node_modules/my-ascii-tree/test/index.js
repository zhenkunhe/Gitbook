var assert = require('assert');
var through = require('through2');
var fs = require('fs');

var asciitree = require('../lib/index');

describe('required', function() {
  describe('#require()', function() {
    it('should ok', function() {
      assert(asciitree.AsciiTree, "AsciiTree should imported.");
      assert(asciitree.Convertor, "Convertor should imported.");
      assert(asciitree.TreeLine, "Line should imported.");
      assert(asciitree.LineUtil, "LineUtil should imported.");
      assert(asciitree.Char, "Char should imported.");
      assert(asciitree.BytesLine, "BytesLine should imported.");
      assert(asciitree.AsciiTreeBuilder, "AsciiTreeBuilder should imported.");
      assert(asciitree.ConvertorBuilder, "ConvertorBuilder should imported.");

      assert(asciitree.stream.splitterStream, "splitterStream should imported");
      assert(asciitree.stream.blockStream, "blockStream should imported");
      assert(asciitree.stream.treeStream, "treeStream should imported");
      assert(asciitree.stream.unwrapStream, "unwrapStream should imported");
    });
  });

  describe('#stream()', function() {
    it('should ok', function(done) {
      var startTag = "{% asciitree %}";
      var endTag = "{% endasciitree %}";

      var src = fs.createReadStream('fixtures/tree0.txt');

      var convertedStringArray = [];

      src.pipe(asciitree.stream.splitterStream())
        .pipe(asciitree.stream.blockStream(startTag, endTag))
        .pipe(asciitree.stream.treeStream())
        .pipe(asciitree.stream.unwrapStream())
        .pipe(through.obj(function(buf, enc, cb) {
          if (!enc || enc === 'buffer') {
            enc = null;
          }
          convertedStringArray.push(buf.toString(enc));
          cb();
        })).on('finish', function() {
          assert.equal(15, convertedStringArray.length);
          done();
        });
    });
  });

});
