

var asn = require('./asn.js');


Vue.component('my-tree', {
  props: ['tree'],
  template: '<div style="position: relative; left:10px;">\
                  <div v-for="i in tree"> 0x{{i.tag.toString(16)}} {{i.value}} \
                   <my-tree :tree="i.child"/>\
                </div>\
             </div>'
});


Vue.component('asn-tree', {
  props: ['hex_data'],
  template: '<div>\
               <my-tree :tree="parsed"/>\
             </div>',
  computed: {
    parsed: function() {
      return asn.a1parse(this.hex_data);
    }
  }
})


