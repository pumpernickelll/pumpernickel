// Pumpernickel service worker – offline copy of this build only (SECURITY.md G-4).
const BUILD = '1aae6a7ba009';
const FILES = ["apple-touch-icon.png","assets/01-bankdruecken-CHRbOnTv.webp","assets/02-schraegbankdruecken-D3TQFbij.webp","assets/03-brustpresse-BPiiCDrE.webp","assets/04-butterfly-fliegende-BeV4sSmH.webp","assets/05-kabel-crossover-CWtDjdWG.webp","assets/06-liegestuetz-DDesXxdC.webp","assets/07-dips-C8A76G9f.webp","assets/08-schulterdruecken-stehend-QinEedAE.webp","assets/09-kurzhantel-schulterdruecken-sitzend-DZzxdsRg.webp","assets/10-schulterpresse-B0Y5MiTT.webp","assets/11-pike-liegestuetz-C2si-5c1.webp","assets/12-landmine-press-BTC8me9A.webp","assets/13-latzug-BvLU0eoy.webp","assets/14-klimmzug-CX6h8CyX.webp","assets/15-rudern-am-kabel-BjZDPA6e.webp","assets/16-langhantelrudern-DgpT0l8I.webp","assets/17-einarmiges-kurzhantelrudern-CInpi3Jc.webp","assets/18-rudern-im-hang-_kINN-Gh.webp","assets/19-seitheben-DAU2PNtB.webp","assets/20-frontheben-ac2v4qf8.webp","assets/21-vorgebeugtes-seitheben-B01SG4Ww.webp","assets/22-face-pulls-DD57VvAm.webp","assets/23-shrugs-DaJFSrkI.webp","assets/24-aufrechtes-rudern-DWlOafj-.webp","assets/25-bizepscurl-D_JLLAdI.webp","assets/26-trizepsdruecken-am-kabel-Dxnx04j_.webp","assets/27-trizepsstrecken-ueber-kopf-BmUlLbgB.webp","assets/28-kniebeuge-qdc0VH0F.webp","assets/29-goblet-squat-Qyf_-P1c.webp","assets/30-beinpresse-BeZHZTtR.webp","assets/31-ausfallschritt-split-squat-BRtPNDbG.webp","assets/32-bulgarische-kniebeuge-H2INnYgY.webp","assets/33-rumaenisches-kreuzheben-BOOpHVcp.webp","assets/34-beinstrecker-DKVXALY8.webp","assets/35-beinbeuger-liegend-BjVfQ2Oo.webp","assets/36-wadenheben-stehend-2R1KmkBy.webp","assets/37-hip-thrust-D8kn6oMz.webp","assets/38-glute-bridge-DyqS_fJE.webp","assets/39-adduktoren-abduktorenmaschine-BcSCG2TA.webp","assets/40-unterarmstuetz-plank-BUhjis8V.webp","assets/41-seitstuetz-BNZnakUH.webp","assets/42-crunch-BKttchFR.webp","assets/43-haengendes-beinheben-Dp5DV5zV.webp","assets/44-dead-bug-B-j18ihq.webp","assets/45-pallof-press-CtQT5zDR.webp","assets/46-bauchlage-y-uPIQLl-I.webp","assets/47-wandgleiten-BzECQWtK.webp","assets/48-serratus-punch-liegend-CxbXLC9k.webp","assets/49-kinn-rueckzug-OOmJmnvj.webp","assets/50-nacken-seitdehnung-uh5XhGSm.webp","assets/51-brustdehnung-im-tuerrahmen-DawRrSYe.webp","assets/52-katze-kuh-CxB8yvnA.webp","assets/53-bws-rotation-BN2YpDLO.webp","assets/54-hueftbeuger-dehnung-im-halbkniestand-CTZ56C78.webp","assets/55-hamstring-dehnung-in-rueckenlage-Bb4Xh9Gw.webp","assets/56-90-90-huefte-BPj-SmQR.webp","assets/57-kettlebell-swing-FtZFECmX.webp","assets/58-laufen-DgPT6Dhp.webp","assets/59-radfahren-CVTyfKDS.webp","assets/60-schwimmen-kraul-DHKKpREq.webp","assets/Body-CL4gCqkb.js","assets/Body-DO15JfTm.js","assets/Cardio-BoIxFZ0w.js","assets/CustomExercises-VBYjJmYf.js","assets/ExerciseStats-B-_yzBpc.js","assets/ExerciseTile-DYHkTe-u.js","assets/Heatmap-DVrq1PgP.js","assets/History-D7aiMtAd.js","assets/Licenses-BpnZeYZY.js","assets/Picker-CG_hD8sv.js","assets/Profile-D-xF0t0L.js","assets/Routine-5l20m4gN.js","assets/Routines-DDYNkU_A.js","assets/SelectField-B3NCpaDI.js","assets/Session-r4aPLVMA.js","assets/Summary-_b1cHnae.js","assets/TemplateBrowser-5rO4m5AU.js","assets/Templates-5jNsxPlk.js","assets/Wizard-B7WQ-Mb4.js","assets/Workout-SIyt3nYC.js","assets/body-paths-B0FQsxrw.js","assets/gauge-yJ_TNUgC.js","assets/index-BqeNkIrx.css","assets/index-FyAKHe1O.js","assets/inter-latin-400-normal-C38fXH4l.woff2","assets/inter-latin-600-normal-LgqL8muc.woff2","assets/jsx-runtime-DLNB9Qsn.js","assets/muscleWeekLoad-HEM_XdFc.js","assets/pencil-vNVcR3sx.js","assets/pictograms-BkOi7Dlz.js","assets/playfair-display-latin-500-normal-DIxvyhka.woff2","assets/search-DcOeGeuq.js","assets/sparkles-CGB6hN-A.js","assets/templates-BhqG5Eg-.js","assets/trash-Ct__rEHY.js","assets/ui-B0RcsBqY.js","favicon.svg","icon-192.png","icon-512.png","icon-maskable-512.png","index.html","licenses.txt","logo.svg","manifest.webmanifest"];
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
