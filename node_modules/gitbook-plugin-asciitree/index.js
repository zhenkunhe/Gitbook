var asciitree = require("my-ascii-tree");
var BytesLine = asciitree.BytesLine;
var AsciiTree = asciitree.AsciiTree;

module.exports = {
  blocks: {
    asciitree: {
      // shortcuts: {
      //   parsers: ["markdown"],
      //   start: "$$",
      //   end: "$$"
      // },
      process: function(block) {
        var body = block.body || "";
        var asciitreeConfig = {};

        if (this.book) {
          asciitreeConfig = this.book.config.get('pluginsConfig.asciitree');
        }

        var tree = new AsciiTree(BytesLine.getArray(body)).prepend("```").append("```").convert();

        var convertedLines = tree.toStringArray() || [];

        var result = convertedLines.reduce(function(prev, cur){
          return prev + cur;
        }, "");
        // because parse is true, ``` should be treat as markdown tag.
        return {
          body: result,
          parse: true
        };
      }
    }
  }
};

/*
process can return this formatter too.
return {
    body: lang+"_"+blk.body+"_"+lang,
    html: false
};
https://github.com/GitbookIO/gitbook/blob/master/lib/plugin.js
// Get config from book
Plugin.prototype.getConfig = function() {
    return this.book.config.get('pluginsConfig.'+this.reducedName(), {});
};
*/
