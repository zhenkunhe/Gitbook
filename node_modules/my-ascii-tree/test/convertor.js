var fs = require('fs');
var assert = require('assert');
var BytesLine = require('../lib/bytes-line');
var Convertor = require('../lib/convertor');
var ConvertorBuilder = require('../lib/convertor-builder');
var LineUtil = require('../lib/line-util');

describe('Convertor', function() {
  describe('#constructor', function() {
    it('array push should work.', function() {
      var a = [];
      a.push([1, 2, 3]);
      assert.equal(1, a.length);
    });
    it('should handle string', function() {
      var s = "a\rxx\rbbbb\r-b1\ryy\rxx\raaa\r-uuuuu\ryy\r";
      var lines = BytesLine.getArray(s);
      assert.equal(9, lines.length);
      var bufConvertor = new Convertor(s, 'xx', 'yy').convert();
      var bufArray = bufConvertor.toBufferArray();
      assert.equal(5, bufArray.length);
      // console.log(bufArray);
      var strArray = bufConvertor.toStringArray();
      // console.log(strArray);
      assert.equal('└── bbbb\r', strArray[1]);

    });
  });

  describe('#builder', function() {
    it('should handle string', function() {
      var s = "a\rxx\rbbbb\r-b1\ryy\rxx\raaa\r-uuuuu\ryy\r";
      var convertorBuilder = new ConvertorBuilder()
        .withContent(s)
        .withStartTag("xx")
        .withEndTag("yy")
        .withPrepend("hello-start")
        .withAppend("hello-end");


      var bufConvertor = convertorBuilder.build().convert();
      var bufArray = bufConvertor.toBufferArray();
      assert.equal(9, bufArray.length);
      // console.log(bufArray);
      var strArray = bufConvertor.toStringArray();
      // console.log(strArray);
      assert.equal('└── bbbb\r', strArray[2]);

    });
  });
});
