const Image = require('@11ty/eleventy-img');

async function imageShortcode(src, alt, sizes = '100vw') {
  const metadata = await Image(src, {
    widths: [320, 640, 960, 1280, 1920, 2560],
    formats: ['avif', 'webp', 'jpg'],
    urlPath: '/assets/images',
    outputDir: 'build/assets/images',
  });

  const imageAttributes = {
    alt,
    sizes,
    loading: 'lazy',
    decoding: 'async',
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = config => {
  config.ignores.add('src/components');

  config.addPassthroughCopy('src/assets/fonts');
  config.addPassthroughCopy('src/assets/images');

  config.addAsyncShortcode('Image', imageShortcode);

  // 11ty defaults
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
  }
};