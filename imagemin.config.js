module.exports = {
  jpegtran: { progressive: true, arithmetic: false },
  gifsicle: { optimizationLevel: 10, interlaced: true, colors: 50 },
  pngquant: { quality: [0.8, 0.8] },
  svgo: {
      plugins: [{ removeViewBox: false }, { cleanupIDs: true }],
  },
  webp: { quality: 10 },
}
