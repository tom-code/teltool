


var data = {
  pc_int: '11111111'
};

Vue.component('pc_calc', {
	data: function() {
    return data;
  },
  template: '\
        <div><h2>pointcode decoder</h2> \
          <div> \
            numeric PC value: <input v-model="pc_int"></input> <br/>\
            ansi representation: {{ansi}} <br/>\
            itu  representation: {{itu}} \
          </div> \
        </div>',
  computed: {
    ansi: function() {
      val = parseInt(data.pc_int);
      if (val > 0xffffff) return "input number too large";
      return ((val>>16)&0xff).toString() + "-" +
             ((val>>8)&0xff).toString() + "-" +
             (val&0xff).toString();
    },
    itu: function() {
      val = parseInt(data.pc_int);
      if (val > 0x3fff) return "input number too large";
      return ((val>>11)&0x07).toString() + "-" +
             ((val>>3)&0xff).toString() + "-" +
             (val&0x07).toString();
    }
  }

})


