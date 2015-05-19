var fs = require('fs');
var path = require('path');

var moment = require('moment-timezone');
var hson = require('hanson');
var jade = require('jade');

compileIndex();


function compileIndex() {
  var indexFilename = here('../index.jade');
  var index = fs.readFileSync(indexFilename, 'utf-8');
  var localsHson = fs.readFileSync(here('./locals.hson'), 'utf-8');
  var locals = hson.parse(localsHson);
  alterLocals(locals);
  var fn = jade.compile(index, {pretty: true, filename: indexFilename});
  var result = fn(locals);
  fs.writeFileSync(here('../dist/index.html'), result);
}

function alterLocals(locals) {
  return locals;
}

function here(dest) {
  return path.resolve(__dirname, dest);
}
