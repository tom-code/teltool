

require("./comp_asntree.js")

var data = {
  hex_data: '\
626148049f08011e6b1e281c060700118605010101a01\
1600f80020780a1090607040000010001036c80a13502\
0101020102302d040833040272921527f781079121601\
38370f40407912160138370f4a60f800204c081010185\
0204f0870203c00000'
};

Vue.component('asn', {
  data: function() {
    return data;
  },
    template: '\
        <div><h2>asn1 der/ber decoder</h2> \
          copy & paste your asn1 data to see basic structure. when output is empty data are not correct der/ber <br/><br/> \
          <div> \
            <textarea v-model="hex_data" class="hex_input" rows="10"></textarea> \
          </div> \
          <asn-tree :hex_data="hex_data"/> \
        </div>'
})


