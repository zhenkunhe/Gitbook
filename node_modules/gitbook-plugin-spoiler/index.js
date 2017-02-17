module.exports = {

  website: {
    assets: "./assets",
    css: [
      "spoiler.css"
    ],
    js: [
      "spoiler.js"
    ]
  },

  blocks: {
    s: {
      process: function(blk) {
        return '<span class="spoiler">' + blk.body + '</span>';
      }
    }
  }
};
