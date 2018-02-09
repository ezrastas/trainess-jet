import {data} from './data.js';
import table from './controller/table.js';

let headers = [
  {
    title: 'Name',
    type: 'String',
  },
  {
    title: 'Position',
    type: 'String',
  },
  {
    title: 'Office',
    type: 'String',
  },
  {
    title: 'Age',
    type: 'Number',
  },
  {
    title: 'Start date',
    type: 'Date',
  },
  {
    title: 'Salary',
    type: 'String',
  },
];

const tbl = new table({
  el: document.getElementById('tbl'),
  headers: headers,
  data: data,
  perPage: 10,
});
tbl.init();
