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

    // this.data = this.allData.slice(0, this.perPage);
    // console.log(this.data);

    this.page = 1;
    this.NumPage = Math.ceil(this.allData.length / this.perPage);
  }

  init() {
    this.table = document.createElement('table');
    this.thead = document.createElement('thead');
    this.div = document.createElement('div');
    this.tbody = document.createElement('tbody');
    this.tr = document.createElement('tr');
    this.paging = document.createElement('div');
//создаем структуру таблицы
    this.MainEl.appendChild(this.div);
    this.div.appendChild(this.table);
    this.table.appendChild(this.thead);
    this.thead.appendChild(this.tr);
    this.table.appendChild(this.tbody);

    this.div.appendChild(this.paging);
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

  if (this.tbody.hasChildNodes()) { // обновление данных на странице
    console.log(this.tbody.hasChildNodes());
    let rows = this.tbody.childNodes;
    for (let i = 0; i < rows.length; i++) {
      let fields = rows[i].childNodes;
      let rowKeys = Object.keys(this.data[i]);
      for (let j = 0; j < fields.length; j++) {
        fields[j].innerText = this.data[i][rowKeys[j]];
      }
    }
  } else {
    while (this.tbody.firstChild) {
      this.tbody.removeChild(this.tbody.firstChild);
    }
console.log(this.tbody.hasChildNodes());
    this.data.forEach(item => {
      let row = document.createElement('tr');
      for (let key in item) {
        let field = document.createElement('td');
        field.innerText = item[key];
        row.appendChild(field);
      }
      this.tbody.appendChild(row);
    });
  }
    this.renderPaging();
}

  renderPaging(){
    this.oldPageNum = this.NumPage;
    this.NumPage = Math.ceil(this.allData.length / this.perPage);

      if (
              this.oldPageCount === this.pageCount &&
              this.paging.hasChildNodes()
            ) {
              this.paging.firstChild.dataset.page = Math.max(1, this.page - 1);
              for (let i = 1; i < this.paging.childNodes.length - 1; i++) {
                this.paging.childNodes[i].dataset.page = i;
              }
              this.paging.lastChild.dataset.page = Math.min(
                this.pageCount,
                this.page + 1,
              );
            } else {
      while (this.paging.firstChild) {
  this.paging.removeChild(this.paging.firstChild);
}
    console.log(this.NumPage);

for (let i = 0; i <= this.NumPage; i++) {
  let page = document.createElement('span');
  page.innerText = i.toString();
  page.dataset.page = i;
  if(i===0){page.innerText ="previous";}
  this.paging.appendChild(page);
  console.log(page,page.dataset.page,page.innerText);
}

this.paging.childNodes.forEach(item => {
  item.onclick = () => {
    this.changePage(parseInt(item.dataset.page));

    console.log("dataset",item.dataset.page);//NaN
  };
});

}
  }
  changePage(page) {
  if (this.page !== page) {
    this.page = page;
    console.log(this.page);
    this.renderData();
  }
}
};
