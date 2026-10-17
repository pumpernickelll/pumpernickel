// Pumpernickel service worker – offline copy of this build only (SECURITY.md G-4).
const BUILD = 'ecb055c8f822';
const FILES = ["apple-touch-icon.png","assets/Body-Cowtrd2H.js","assets/Body-D_YbFw1N.js","assets/Cardio-hWE-wWlj.js","assets/CustomExercises-BdX258QY.js","assets/EquipmentIcon-CMyk-jHv.js","assets/ExerciseStats-EK2YD-0e.js","assets/Picker-DXYOhLgy.js","assets/Routine-DqOSw4VS.js","assets/Routines-BCqcdFbk.js","assets/Session-Da8gKojr.js","assets/Summary-B7_PwV85.js","assets/Templates-DAq9mpho.js","assets/Wizard-CH2YLlUp.js","assets/arrow-up-Bu38bN_m.js","assets/check-CWy5XwY-.js","assets/gauge-DuYj9FQ7.js","assets/index-DBJdGNwc.js","assets/index-ZZWscEDd.css","assets/inter-latin-400-normal-C38fXH4l.woff2","assets/inter-latin-600-normal-LgqL8muc.woff2","assets/labels-DiXKI9yL.js","assets/muscles-qPbHKcs4.js","assets/pencil-C5l7Fjy5.js","assets/plan-DUtJvok2.js","assets/playfair-display-latin-500-normal-DIxvyhka.woff2","assets/templates-B8Ccmquu.js","assets/ui-CDmWvJQ7.js","favicon.svg","icon-192.png","icon-512.png","icon-maskable-512.png","index.html","licenses.txt","logo.svg","manifest.webmanifest"];
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
