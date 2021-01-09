module.exports = {
  jpegtran: { progressive: true, arithmetic: false },
  gifsicle: { optimizationLevel: 2, interlaced: false, colors: 20 },
  pngquant: { quality: [0.25, 0.5] },
  svgo: {
      plugins: [{ removeViewBox: false }, { cleanupIDs: true }],
  },
  webp: { quality: 10 },
}
