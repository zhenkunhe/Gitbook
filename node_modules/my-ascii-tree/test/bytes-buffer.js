var chai = require('chai');
var assert = require('assert');
var fs = require('fs');

var expect = chai.expect;

var noneAscii = "我的心是旷野的鸟，在你的眼里找到了飞翔的天空。";

describe('Bytes and Buffer', function() {
  it("encoding.", function() {
    assert(!Buffer.isEncoding('buffer'), "buffer is not encoding.");
    assert(!Buffer.isEncoding(undefined), "undefined is not encoding.");
    assert(!Buffer.isEncoding(null), "null is not encoding.");
    assert(Buffer.isEncoding('ascii'), "ascii is encoding.");
  });
  it("ascii's bytes and buffer should equal.", function() {
    var buf = new Buffer("abc");
    var i = 0;
    var bytes = [];

    for (i = 0; i < buf.length; i++) {
      bytes.push(buf[i]);
    }

    for (i = 0; i < bytes.length; i++) {
      assert.equal(bytes[i], buf[i]);
    }
  });

  it("none ascii's bytes and buffer should equal.", function() {
    var buf = new Buffer(noneAscii);
    var i = 0;
    var bytes = [];

    for (i = 0; i < buf.length; i++) {
      bytes.push(buf[i]);
    }
    for (i = 0; i < bytes.length; i++) {
      assert.equal(bytes[i], buf[i]);
    }
  });

  it("string and buffer should differenct.", function() {
    var buf = new Buffer(noneAscii);
    var i = 0;
    var bytes = [];

    assert(noneAscii.length !== buf.length);
    for (i = 0; i < noneAscii.length; i++) {
      bytes.push(noneAscii.charCodeAt(i));
    }
    assert(bytes.length === noneAscii.length);
  });

  it("gbk", function(){
    var buf = fs.readFileSync("fixtures/gbk.txt");
    assert(buf instanceof Buffer);

    //node will not valid encoding.
    var str = fs.readFileSync("fixtures/gbk.txt", {encoding: "utf-8"});
    assert(typeof str === 'string');

    // for(i=0;i<str.length;i++) {
    //   console.log(str.charCodeAt(i));
    // }

    str = fs.readFileSync("fixtures/afile.txt", {encoding: "utf-8"});
    assert(typeof str === 'string');

    // console.log(str);
  });
});
