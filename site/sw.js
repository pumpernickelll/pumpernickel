// Pumpernickel service worker – offline copy of this build only (SECURITY.md G-4).
const BUILD = 'a5515db8d142';
const FILES = ["apple-touch-icon.png","assets/Body-CTPuaKJT.js","assets/Body-zDHZyFpX.js","assets/Cardio-0l_9sxfh.js","assets/CustomExercises-CxmuAMog.js","assets/EquipmentIcon-DmSRyzr1.js","assets/ExerciseStats-Cx5W6CwH.js","assets/Licenses-DYGn9Kml.js","assets/Picker-CLELHJ7n.js","assets/Routine-BWCzwVcL.js","assets/Routines-CsuIDtKh.js","assets/Session-DwIUTWrn.js","assets/Summary-EZ1MEN0T.js","assets/Templates-LYMyyYnT.js","assets/Wizard-BYzQMxFc.js","assets/arrow-up-10IxO46k.js","assets/check-BeDrRffz.js","assets/gauge-DGsW1xcA.js","assets/index-BH7ujW7x.css","assets/index-B_yaY0Vz.js","assets/inter-latin-400-normal-C38fXH4l.woff2","assets/inter-latin-600-normal-LgqL8muc.woff2","assets/jsx-runtime-DLNB9Qsn.js","assets/labels-CyUKIgp8.js","assets/muscles-Cola647G.js","assets/pencil-DFFvhXq9.js","assets/plan-DUWvuJ1d.js","assets/playfair-display-latin-500-normal-DIxvyhka.woff2","assets/store-BuCRjBP1.js","assets/templates-CW1SiFIO.js","assets/ui-CplTD-CO.js","favicon.svg","icon-192.png","icon-512.png","icon-maskable-512.png","index.html","licenses.txt","logo.svg","manifest.webmanifest"];
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
