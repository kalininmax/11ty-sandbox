const PATHS = require('./paths');
const { inlineSvgSprite, image } = require('./shortcodes');
const { inline } = require('./filters');

module.exports = eleventyConfig => {
	eleventyConfig.ignores.add(PATHS.src.components);

	eleventyConfig.addPassthroughCopy(PATHS.src.fonts);

	eleventyConfig.addNunjucksShortcode('image', image);
	eleventyConfig.addNunjucksShortcode('svg_sprite', inlineSvgSprite);

	eleventyConfig.addNunjucksAsyncFilter('inline', inline);

	eleventyConfig.setServerOptions({
    liveReload: true,
    domDiff: true,
    port: 8080,
    watch: ['build/**/*.*'],
    showAllHosts: true,
    encoding: "utf-8",
  });

	return {
    dir: {
      input: 'src',
      includes: 'includes',
      layouts: 'templates',
      data: 'data',
      output: 'build'
    },
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};

