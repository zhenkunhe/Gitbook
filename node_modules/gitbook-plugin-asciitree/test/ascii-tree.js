var path = require('path');
var fs = require('fs');
var assert = require('assert');
var gitbook = require('../index');
var os = require('os');
var asciitree = require("my-ascii-tree");

describe('AsciiTree', function() {
  describe('#asciitree', function() {
    it('should not null', function() {
      var buf = new Buffer("abc");
      assert(asciitree.BytesLine, "bytesline should exist.");
      assert(asciitree.LineUtil, "LineUtil should exist.");
      assert(asciitree.LineUtil.buffer2bytes, "LineUtil's buffer2bytes should exist.");
      assert(asciitree.BytesLine.fromString, "bytesline's fromString should exist.");
    });
  });
});

describe('GitBook', function() {
  describe('#process', function() {
    it('should work when no separator', function() {
      assert(gitbook.blocks.asciitree.process, "not null");
      var newBlock = gitbook.blocks.asciitree.process({
        body: "hello"
      });
      assert.deepEqual({
        body: "```└── hello```",
        parse: true
      }, newBlock);
    });
    it('should work when has separator', function() {
      assert(gitbook.blocks.asciitree.process, "not null");
      var newBlock = gitbook.blocks.asciitree.process({
        body: "hello\r"
      });
      assert.deepEqual({
        body: "```\r└── hello\r```\r",
        parse: true
      }, newBlock);
    });
  });
});
