import Application from "@ember/application";
import Resolver from "ember-resolver";
import loadInitializers from "ember-load-initializers";
import config from "ember-quickstart/config/environment";
// import {System} from 'systemjs'

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);

{
  /* <meta name="importmap-type" content="systemjs-importmap" /> */
}

const meta = document.createElement("meta");
meta.setAttribute("name", "importmap-type");
meta.content = "systemjs-importmap";
document.getElementsByTagName("head")[0].appendChild(meta);

const script = document.createElement("script");
script.setAttribute("type", "systemjs-importmap");
script.textContent = JSON.stringify({
  imports: {
    react:
      "https://cdn.jsdelivr.net/npm/@esm-bundle/react@16.14.0/system/react.development.js",
    "react-dom":
      "https://cdn.jsdelivr.net/npm/@esm-bundle/react-dom@16.14.0/system/react-dom.development.js",
    "single-spa":
      "https://cdn.jsdelivr.net/npm/single-spa@5.8.0/lib/system/single-spa.dev.js",
    "@example/react-app": "//localhost:3000/example-react-app.js",
  },
});
document.head.appendChild(script);

// <!-- <script src="https://cdn.jsdelivr.net/npm/systemjs@6.7.1/dist/system.js"></script> -->

const systemScript = document.createElement("script");
systemScript.setAttribute(
  "src",
  "https://cdn.jsdelivr.net/npm/systemjs@6.7.1/dist/system.js"
);
document.head.appendChild(systemScript);

const spaScript = document.createElement("script");
spaScript.setAttribute(
  "src",
  "https://cdn.jsdelivr.net/npm/single-spa@5.8.0/lib/system/single-spa.dev.js"
);
document.head.appendChild(spaScript);

const reactScript = document.createElement("script");
reactScript.setAttribute(
  "src",
  "https://cdn.jsdelivr.net/npm/@esm-bundle/react@16.14.0/system/react.development.js"
);
document.head.appendChild(reactScript);

const domScript = document.createElement("script");
domScript.setAttribute(
  "src",
  "https://cdn.jsdelivr.net/npm/@esm-bundle/react-dom@16.14.0/system/react-dom.development.js"
);
document.head.appendChild(domScript);

// setTimeout(()=>{
//   import('single-spa')
//     .then((module)=>console.log(module))
// }, 5000)

// System.set('https://cdn.jsdelivr.net/npm/single-spa@5.8.0/lib/system/single-spa.dev.js',
// {
//   exportedFunction: window['single-spa']
// })

// System.config({
//   "imports": {
//     "react": "https://cdn.jsdelivr.net/npm/@esm-bundle/react@16.14.0/system/react.development.js",
//     "react-dom": "https://cdn.jsdelivr.net/npm/@esm-bundle/react-dom@16.14.0/system/react-dom.development.js",
//     "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@5.8.0/lib/system/single-spa.dev.js",
//     "@example/react-app": "//localhost:3000/example-react-app.js"
//   }
// })

setTimeout(() => {
  Promise.all([
    System.import(
      "https://cdn.jsdelivr.net/npm/single-spa@5.8.0/lib/system/single-spa.dev.js"
    ),
  ]).then(([singleSpa]) => {
    singleSpa.registerApplication({
      name: "sample-react",
      app: () => System.import("@example/react-app"),
      activeWhen: "/",
    });

    singleSpa.start();
  });
}, 5000);

// registerApplication({
//     name: 'sample-react',
//     app: () => System.import('@example/react-app'),
//     activeWhen: "/"
//   });

//   start();
