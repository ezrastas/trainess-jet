'use strict';

export default class table {
  constructor({
    el = document.createElement('div'),
    headers = [],
    data = [],
    perPage = 5,
  }) {
    this.headers = headers;
    this.allData = data;
    this.perPage = perPage;
    this.MainEl = el;

    this.page = 1;
  }

  init() {
    this.table = document.createElement('table');
    this.thead = document.createElement('thead');
    this.div = document.createElement('div');
    this.tbody = document.createElement('tbody');
    this.tr = document.createElement('tr');
//создаем структуру таблицы
    this.MainEl.appendChild(this.div);
    this.div.appendChild(this.table);
    this.table.appendChild(this.thead);
    this.thead.appendChild(this.tr);
    this.table.appendChild(this.tbody);
//записываем в неё данные
    this.renderHeader();
    this.renderData();
  }

  renderHeader(headers = []) {
    if (headers.length > 0) {
      this.headers = headers;
    }

    this.headers.forEach(item => {
      let td = document.createElement('td');
      td.innerText = item.title;
      this.tr.appendChild(td);
    });
  }

  renderData() {
    this.data = this.allData;
    this.data = this.data.slice(
      (this.page - 1) * this.perPage,
      this.page * this.perPage,
    );
    console.log(this.data);

      this.data.forEach(item => {
        let tr = document.createElement('tr');
        for (let key in item) {
          let td = document.createElement('td');
          td.innerText = item[key];
          tr.appendChild(td);
        }
        this.tbody.appendChild(tr);
      });

  }
};
