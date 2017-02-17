function normalizeVideoId(a) {
  return a.replace(/\\_/g, "_");
}

module.exports = {

  website: {
    assets: "./assets",
    js: ["player.js"],
    css: ["player.css"]
  },

  blocks: {
    youtube: {
      process: function (blk) {
        var cfg = this.config.values.pluginsConfig["youtubex"],
          vid = normalizeVideoId(blk.body.trim().replace(/['"\/]+/g, '')),
          lang = this.options.language,
          embedString = cfg.embedDescription[lang] || cfg.embedDescription["default"];

        if (vid.length === 0) {
          console.log('\n[gitbook-plugin-youtubex](' + this.ctx.file.path + ') Error: video ID is empty.');
          return null;
        }

        if (this.generator === 'website') {
          var html = [];
          html.push('<div class="youtubexDiv">');
          html.push('   <div class="youtubex" id="' + vid + '" />');
          html.push('</div>');
          return html.join('');
        }

        return '<blockquote><b>' + embedString + '<b>&nbsp;<a href="https://www.youtube.com/watch?v=' + vid + '">' + 'https://www.youtube.com/watch?v=' + vid + '</a></blockquote>';
      }
    },
    m: {
      process: function (blk) {
        var id = blk.kwargs.id.trim();
        var h = blk.kwargs.h || 0;
        var m = blk.kwargs.m || 0;
        var s = blk.kwargs.s || 0;

        var time = h * 3600 + m * 60 + s;
        var timeString = '';
        timeString += (h !== 0) ? (h < 10 ? '0' + h : h) + ':' : '';
        timeString += (m < 10 ? '0' + m : m) + ':';
        timeString += (s < 10 ? '0' + s : s);

        return '<a href="#' + id + '" class="skip_' + id + '" data-time="' + time + '">' + timeString + '</a>';
      }
    }
  }
};
