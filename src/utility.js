// JavaScript helper functions

export function genRandColor(transl = 0.2) {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);

  var translucency = transl;

  var ret = 'rgba(' + r + ',' + g + ',' + b + ',' + translucency + ')';
  return ret;
}

