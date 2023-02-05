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
    encoding: 'utf-8',
    watch: ['build/**/*.*'],
    showAllHosts: true,
		https: {
      key: './localhost.key',
      cert: './localhost.cert',
    }
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

