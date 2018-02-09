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
    this.NumPage = Math.ceil(this.allData.length / this.perPage);
    this.table = document.createElement('table');
    this.thead = document.createElement('thead');
    this.div = document.createElement('div');
    this.tbody = document.createElement('tbody');
    this.tr = document.createElement('tr');
    this.paging = document.createElement('div');
  }

  init() {
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

  renderData(page) {
      !!page?this.page = page:''; //проверяем, нажали ли на пагинатор(если нет - то page = undefined).
        this.data = this.allData;
        this.data = this.data.slice(
          (this.page - 1) * this.perPage,
          this.page * this.perPage,
        );
    while (this.tbody.firstChild) {  //убираем предыдущие записи
      this.tbody.removeChild(this.tbody.firstChild);
    }
    this.data.forEach(item => {
      let row = document.createElement('tr');
      for (let key in item) {
        let field = document.createElement('td');
        field.innerText = item[key];
        row.appendChild(field);
      }
      this.tbody.appendChild(row);
    });
    this.renderPaging();
  }

  renderPaging(){
         this.NumPage = Math.ceil(this.allData.length / this.perPage);

         let previous = document.createElement('span');
         previous.innerText = 'Previous';

         let next = document.createElement('span');
         next.innerText = 'Next';
         console.log(this.paging.hasChildNodes());
          if (this.paging.hasChildNodes()) {
                  this.paging.firstChild.dataset.page = Math.max(1, this.page - 1);
                  for (let i = 1; i < this.paging.childNodes.length - 1; i++) {
                    this.paging.childNodes[i].dataset.page = i;
                  }
                  this.paging.lastChild.dataset.page = Math.min(
                    this.NumPage,
                    this.page + 1,
                  );
                } else {
          while (this.paging.firstChild) {
      this.paging.removeChild(this.paging.firstChild);
    }

    for (let i = 0; i <= this.NumPage+1; i++) {
      if(i==0){
        this.paging.appendChild(previous);
      }else{
          if (i!=(this.NumPage+1)){
            let page = document.createElement('span');
            page.innerText = i.toString();
            page.dataset.page = i;
            this.paging.appendChild(page);
          }else{
            next.dataset.page = Math.min(this.NumPage, this.page + 1);
            this.paging.appendChild(next);
          }
      }
    }
    this.paging.childNodes.forEach(item => {
      item.onclick = () => {
        this.renderData(parseInt(item.dataset.page));
      };
    });

    }
  }
};
