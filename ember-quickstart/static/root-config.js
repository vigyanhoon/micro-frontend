//load with followin command line
//http-server C:\Users\vigya\Desktop\projects\micro-frontend\ember-quickstart\static --cors=*

System.register([], function (_export, _context) {
  var dep;
  return {
    setters: [
      function (_dep) {
        dep = _dep;
      },
    ],
    execute: function () {
      _export({
        name: "value",
        func: function a(param) {
          console.log("loaded default from root config " + param.name);
        },
      });
    },
  };
});
