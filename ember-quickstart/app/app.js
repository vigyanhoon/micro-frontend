import Application from "@ember/application";
import Resolver from "ember-resolver";
import loadInitializers from "ember-load-initializers";
import config from "ember-quickstart/config/environment";

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);

const addScript = (path, cb) => {
  const script = document.createElement("script");
  script.src = path;
  script.onload = cb;
  document.head.appendChild(script);
};

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
    "@example/react-app": "//localhost:3000/example-react-app.js",
  },
});
document.head.appendChild(script);

addScript("https://cdn.jsdelivr.net/npm/systemjs@6.7.1/dist/system.js", () => {
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
});
