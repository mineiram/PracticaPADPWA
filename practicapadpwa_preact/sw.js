importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js')

console.log(`Workbox ${workbox ? 'sí' : 'no'} está funcionando`)

workbox.routing.registerRoute(
  'https://unpkg.com/htm/preact/standalone.module.js',
  new workbox.strategies.CacheFirst({
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  }),
)

workbox.precaching.precacheAndRoute([
  {url: 'index.html', revision: null },
  {url: 'gui.js', revision: null},
  {url: 'style.css', revision: null},
  {url: 'manifest.json', revision: null},
  {url: 'pwa.png', revision: null}
])