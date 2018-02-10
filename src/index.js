import {data} from './data.js';
import table from './controller/table.js';

const tbl = new table({
  el: document.getElementById('tbl'),
  data: data,
  perPage: 10,
});
tbl.init();
