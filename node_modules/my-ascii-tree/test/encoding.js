var assert = require('assert');
var through = require('through2');
var logmsg = require('./logmsg');
var fs = require('fs');


describe('FileStream', function() {
  it('should ok', function(done) {
      var rr = fs.createReadStream('./fixtures/gbk.txt');
      var bufs = [];
      rr.pipe(through.obj(function(buf, enc, cb){
        bufs.push(buf);
        cb();
      })).on('finish', function(){
        var str = "";
        for(var value of bufs) {
          str += value.toString();
        }
        assert.equal("abc", str.substring(0,3));
        done();
      });
  });
});
