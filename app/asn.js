
function char_to_bin(ch) {
  if (ch >= '0' && ch <='9') return ch-'0';
  ch = ch.toLowerCase();
  switch (ch) {
    case 'a': return 0xa;
    case 'b': return 0xb;
    case 'c': return 0xc;
    case 'd': return 0xd;
    case 'e': return 0xe;
    case 'f': return 0xf;
  }
  return 0;
}

function get_byte(dat) {
  b = char_to_bin(dat[0])<<4 | char_to_bin(dat[1]);
  return [b, dat.substring(2)];
}
function get_raw(dat, len) {
  return [dat.substring(0, (len)*2), dat.substring((len)*2)];
}
function get_tag(dat) {
  return get_byte(dat); //fix multibyte tags
}
function get_len(dat) {
  var b1;
  var b2;
  [b1, dat] = get_byte(dat);
  if (!(b1 & 0x80)) return [b1, dat];
  if (b1 == 0x80) return [-1, dat];
  l = 0;
  for (i=0; i<b1&0x7f; i++) {
    l = l<<8;
    [b2, dat] = get_byte(dat);
    l|=b2;
  }
  return [l, dat];
}

function a1p(dat) {
  var items = [];
  var data = dat;
  data = data.replace(/\s+/g,"") //remove blanks
  while (data.length > 0) {
    var tag = 0;
    var len = 0;
    var d = null;
    var da = null;

    [tag, data] = get_tag(data);
    [len, data] = get_len(data);

    if ((tag == 0) && (len == 0))
      return [items, data];
    if (len != -1)
      [d, data] = get_raw(data, len);

    if (tag & 0x20) {
      var it;
      var zzz;
      if (len == -1) [da, data] = a1p(data);
      else [da, zzz] = a1p(d);
    }

    items.push({"tag":tag, "value":d, "child":da})
  }
  return [items, null]
}

function a1parse(data) {
  try {
    [items, _] = a1p(data);
    return items;
  } catch (err) {
    return [];
  }
}

exports.a1parse = a1parse;
