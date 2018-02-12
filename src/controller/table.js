'use strict';

import styles from '../index.css';

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
    this.search = document.createElement('div');
    this.paging = document.createElement('div');

    this.sortKey;
    this.flag = false;
  }

  init() {
    //создаём поле поиска
    this.search.className = "search";
    let searchTxt = document.createElement('span');
    searchTxt.innerText = 'Search:';
    this.search.appendChild(searchTxt);

    this.searchInput = document.createElement('input');

    let searchBtn = document.createElement('button');
    searchBtn.innerText = 'Search';
    searchBtn.onclick = () => {
      this.SearchRequest(this.searchInput.value);
    };

    this.search.appendChild(this.searchInput);
    this.search.appendChild(searchBtn);
    this.MainEl.appendChild(this.search);

    //создаем структуру таблицы
    // this.MainEl.appendChild(this.div);
    // this.div.appendChild(this.table);

    this.MainEl.appendChild(this.table);

    this.table.appendChild(this.thead);
    this.thead.appendChild(this.tr);
    this.table.appendChild(this.tbody);

    this.MainEl.appendChild(this.paging);
    this.paging.className = "paging";

    //записываем в неё данные
    this.renderHeader(this.headers);
    this.renderData();
  }

  SearchRequest(request = '') {
    this.searchRec = request;
    this.page = 1;
    this.renderData();
  }

  SortTable(item){
    let elem = document.getElementById(item);
    item = item.replace(/[^a-z]/g, '');
    if ( this.flag == 0 )  {
      elem.classList.add('desc');
      elem.classList.remove('asc','SortRow');
    } else {
      elem.classList.add('asc');
      elem.classList.remove('desc','SortRow');
    }
    this.sortKey = item;

    this.allData.sort((a, b) => {
      if(this.sortKey =="id" || this.sortKey =="salary" || this.sortKey =="extn"){  //отбработка числовых значений
        const El1 = a[this.sortKey].replace(/[^-0-9]/gim,'');
        const El2 = b[this.sortKey].replace(/[^-0-9]/gim,'');
        return !this.flag ? (El2 - El1) : (El1 - El2);
      }else{
        const El1 = a[this.sortKey];
        const El2 = b[this.sortKey];
        if(this.flag){
          return El1 < El2 ? -1 : El1 > El2 ? 1 : 0;
        }else{
          return El1 > El2 ? -1 : El1 < El2 ? 1 : 0;
        }
      }
    });
    this.renderData();
  }

  renderHeader() {
    this.headers.forEach((item, i) => {
    let th = document.createElement('th');
    th.id = item + '_' + i;
    th.dataset.sortKey = item;

    //this.SortTable(th.id);
    th.onclick = () => {
      if(this.flag){
        this.SortTable(th.id);//asc
        this.flag = 0;
      } else {
        this.SortTable(th.id);//desc
        this.flag = 1;
      }
    };

    let ItemId = item.replace("_"," ");
    ItemId = ItemId[0].toUpperCase()+ ItemId.slice(1);
    th.innerText = ItemId;
    th.classList.add('SortRow');
    this.tr.appendChild(th);
    });
  }

  renderData(page) {
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
          }
      }

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

        if (parseInt(item.dataset.page) !== this.page || this.page== this.NumPage) {
              this.paging.childNodes[this.page].classList.add('currentPage');
            } else {
              this.paging.childNodes[this.page].classList.remove('currentPage');
            }

        item.onclick = () => {
          this.renderData(parseInt(item.dataset.page));
        };
      });
    }
  };
