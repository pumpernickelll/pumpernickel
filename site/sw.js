// Pumpernickel service worker – offline copy of this build only (SECURITY.md G-4).
const BUILD = '7b12064f14c7';
const FILES = ["apple-touch-icon.png","assets/Body-CL2kbwCv.js","assets/Body-Crtd548H.js","assets/Cardio-CTi2ndwx.js","assets/CustomExercises-DVxgQ4tq.js","assets/EquipmentIcon-DmSRyzr1.js","assets/ExerciseStats-CdL-k9zq.js","assets/Heatmap-D5qgk2Om.js","assets/History-Kl25AiC2.js","assets/Licenses-CoMno5z9.js","assets/Picker-B9NFAVj3.js","assets/Profile-Bxs57tNV.js","assets/Routine-CzK_bNG7.js","assets/Routines-DUewXQXt.js","assets/Session-oFVpDTki.js","assets/Summary-XY3nB1lL.js","assets/Templates-bH8G_KUR.js","assets/Wizard-D1h1wf0r.js","assets/Workout-349KqnO-.js","assets/clock-aHyDrmMo.js","assets/gauge-CoSOn6VY.js","assets/index-Bjn8Syuk.css","assets/index-CMmR0Yeq.js","assets/inter-latin-400-normal-C38fXH4l.woff2","assets/inter-latin-600-normal-LgqL8muc.woff2","assets/jsx-runtime-DLNB9Qsn.js","assets/muscleWeekLoad-CdgSuS61.js","assets/pencil-Dx1MSwVy.js","assets/playfair-display-latin-500-normal-DIxvyhka.woff2","assets/search-CcjZujsz.js","assets/sparkles-_-vBEi2P.js","assets/templates-CqWMqbrJ.js","assets/trash-BUOfWoAl.js","assets/ui-BL4Xtxc5.js","favicon.svg","icon-192.png","icon-512.png","icon-maskable-512.png","index.html","licenses.txt","logo.svg","manifest.webmanifest"];
const PREFIX = 'pumpernickel-';
const CACHE = PREFIX + BUILD;
const scope = new URL(self.registration.scope);
const INDEX = new URL('index.html', scope).href;
const own = url => url.origin === scope.origin && url.pathname.startsWith(scope.pathname);

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES.map(file => new URL(file, scope).href))));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key))))
    .then(() => self.clients.claim()));
});

// A waiting update only takes over when the page asks for it (after the user confirmed).
self.addEventListener('message', event => {
  if (event.data === 'pumpernickel:activate') event.waitUntil(self.skipWaiting());
  else if (event.data === 'pumpernickel:build') event.ports[0]?.postMessage(BUILD);
});

// ignoreVary: the server's Vary header (e.g. Accept-Encoding, Origin) must not turn a cached file into a miss –
// after a release the old file names no longer exist online, and a miss would break the running version.
const lookup = { ignoreSearch: true, ignoreVary: true };
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (!own(url)) return;
  const target = request.mode === 'navigate' ? INDEX : request;
  event.respondWith(caches.open(CACHE).then(cache => cache.match(target, lookup)).then(hit => hit || fetch(request)));
});
