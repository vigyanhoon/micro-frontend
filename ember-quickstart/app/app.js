import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'ember-quickstart/config/environment';
import {System} from 'systemjs'

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);

// const im = document.createElement('script');
// im.type = 'importmap';
// im.textContent = JSON.stringify({
//   imports: {
//     "react": "https://cdn.jsdelivr.net/npm/@esm-bundle/react@16.14.0/system/react.development.js",
//     "react-dom": "https://cdn.jsdelivr.net/npm/@esm-bundle/react-dom@16.14.0/system/react-dom.development.js",
//     "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@5.8.0/lib/system/single-spa.dev.js",
//     "@example/react-app": "//localhost:3000/example-react-app.js"
//   }
// });
// document.currentScript.after(im);

System.set('https://cdn.jsdelivr.net/npm/single-spa@5.8.0/lib/system/single-spa.dev.js',
{
  exportedFunction: window['single-spa']
})

// System.config({
//   "imports": {
//     "react": "https://cdn.jsdelivr.net/npm/@esm-bundle/react@16.14.0/system/react.development.js",
//     "react-dom": "https://cdn.jsdelivr.net/npm/@esm-bundle/react-dom@16.14.0/system/react-dom.development.js",
//     "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@5.8.0/lib/system/single-spa.dev.js",
//     "@example/react-app": "//localhost:3000/example-react-app.js"
//   }
// })

Promise.all([System.import('single-spa'), System.import('react'), System.import('react-dom')])
  .then(([singleSpa]) => {
    singleSpa.registerApplication({
      name: 'sample-react',
      app: () => System.import('@example/react-app'),
      activeWhen: "/"
    });

    singleSpa.start();
  });
