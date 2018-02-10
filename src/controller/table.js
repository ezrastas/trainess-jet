'use strict';

export default class table {
  constructor({
    el = document.createElement('div'),
    data = [],
    perPage = 5,
  }) {
    this.headers = Object.keys(data[0]);
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
    //this.search = document.createElement('div');
  }

  init() {
    //создаём поле поиска

    let search = document.createElement('div');

    let searchTxt = document.createElement('span');
    searchTxt.innerText = 'Search:';
    search.appendChild(searchTxt);

    this.searchInput = document.createElement('input');

    let searchBtn = document.createElement('button');
    searchBtn.innerText = 'Search';
    searchBtn.onclick = () => {
      this.SearchRequest(this.searchInput.value);
    };

    search.appendChild(this.searchInput);
    search.appendChild(searchBtn);
    this.div.appendChild(search);

//создаем структуру таблицы

     this.MainEl.appendChild(this.div);
     this.div.appendChild(this.table);

    //this.MainEl.appendChild(this.table);

    this.table.appendChild(this.thead);
    this.thead.appendChild(this.tr);
    this.table.appendChild(this.tbody);

    this.div.appendChild(this.paging);
//записываем в неё данные
    this.renderHeader(this.headers);
    this.renderData();
  }

  SearchRequest(request = '') {
    this.searchRec = request;
    this.page = 1;
    this.renderData();
  }

  SortTable(){
    console.log("test");
    // 
    // this.renderData();

  }

  renderHeader() {
    this.headers.forEach(item => {
      let td = document.createElement('td');
      item = item.replace("_"," ");
      item = item[0].toUpperCase()+ item.slice(1);
      td.innerText = item;
      this.tr.appendChild(td);
      td.onclick = () => {
        this.SortTable();
      };
    });
  }

  renderData(page) {
      // console.log(page);
       !!page?this.page = page:''; //проверяем, нажали ли на пагинатор(если нет - то page = undefined).

       this.data = this.allData;
if (!!this.searchRec) {
  this.data = this.allData.filter(item => {
    for (let key in item) {
      if (item[key].toString().includes(this.searchRec)) {
        return true;
      }
    }
    return false;
  });
}

this.searchData = this.data;
        this.data = this.data.slice(
          (this.page - 1) * this.perPage,
          this.page * this.perPage,
        );//возвращает записи для каждой из страниц
    while (this.tbody.firstChild) {  //очищает предыдущие записи
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

         let previous = document.createElement('span');
         previous.innerText = 'Previous';

         let next = document.createElement('span');
         next.innerText = 'Next';

          if (this.paging.hasChildNodes()) {
            while (this.paging.firstChild) { //очистка предыдущего пейджинга

        this.NumPage = Math.ceil(this.searchData.length / this.perPage);
        this.paging.removeChild(this.paging.firstChild);
      }}

      previous.dataset.page = Math.min(this.NumPage, this.page - 1);
      this.paging.appendChild(previous);

      for (let i = 1; i <= this.NumPage; i++) {
            let page = document.createElement('span');
            page.innerText = i.toString();
            page.dataset.page = i;
            this.paging.appendChild(page);
      }

      next.dataset.page = Math.min(this.NumPage, this.page + 1);
      this.paging.appendChild(next);

    this.paging.childNodes.forEach(item => {
      item.onclick = () => {
        this.renderData(parseInt(item.dataset.page));
      };
    });
  }
};
