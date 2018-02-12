import data from './data';
import table from './controller/table';

const tbl = new table({
  el: document.getElementById('tbl'),
  data: data,
  perPage: 10,
});
tbl.init();
