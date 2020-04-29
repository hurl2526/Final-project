const booksApp = new function () {

  // objects array
  this.myBooks = [{
      Title: 'The Hobbit',
      Author: 'J. R. R. Tolkien',
      Started: 'January',
      Pages: 125
    },
    {
      Title: 'War and Peace',
      Author: 'Leo Tolstoy',
      Started: 'February',
      Pages: 56
    },
    {
      Title: 'The Great Gatsby',
      Author: 'F. Scott Fitzgerald',
      Started: 'April',
      Pages: 210
    }
  ];
  this.header = ['Title', 'Author', 'Started', 'Pages'];

  // CREATE A TABLE.
  this.createTable = function () {
    const table = document.createElement('table');
    table.setAttribute('id', 'booksTable');

    // CREATE A ROW FOR HEADER.
    let tr = table.insertRow();
    for (let h = 0; h < this.header.length; h++) {
      let th = document.createElement('th');
      th.innerHTML = this.header[h];
      tr.appendChild(th);
    }

    // ADD ROWS
    for (let i = 0; i < this.myBooks.length; i++) {
      tr = table.insertRow(); // CREATE A NEW ROW.
      for (let j = 0; j < this.header.length; j++) {
        let tabCell = tr.insertCell();
        tabCell.innerHTML = this.myBooks[i][this.header[j]]; //GRABBING THE BOOKS ARRAY AT .TITLE, THEN .STARTED
      }

      // DYNAMICALLY CREATE AND ADD ELEMENTS TO TABLE CELLS WITH EVENTS.

      this.td = document.createElement('td');

      //CANCEL OPTION.
      tr.appendChild(this.td);
      let cancel = document.createElement('label');
      cancel.innerHTML = '✖';
      cancel.setAttribute('onclick', 'booksApp.Cancel(this)');
      cancel.setAttribute('style', 'display:none;');
      cancel.setAttribute('title', 'Cancel');
      cancel.setAttribute('id', 'cancel' + i);
      this.td.appendChild(cancel);

      //SAVE.
      tr.appendChild(this.td);
      let save = document.createElement('input');

      save.setAttribute('type', 'button'); // SET ATTRIBUTES.
      save.setAttribute('value', 'Save');
      save.setAttribute('id', 'Save' + i);
      save.setAttribute('style', 'display:none;');
      save.setAttribute('onclick', 'booksApp.Save(this)'); // ADD THE BUTTON's 'onclick' EVENT.
      this.td.appendChild(save);

      //UPDATE.
      tr.appendChild(this.td);
      let update = document.createElement('input');

      update.setAttribute('type', 'button'); // SET ATTRIBUTES.
      update.setAttribute('value', 'Update');
      update.setAttribute('id', 'Edit' + i);
      update.setAttribute('style', 'background-color:#44CCEB;');
      update.setAttribute('onclick', 'booksApp.Update(this)'); // ADD THE BUTTON's 'onclick' EVENT.
      this.td.appendChild(update);

      //DELETE.
      this.td = document.createElement('th');
      tr.appendChild(this.td);
      let btDelete = document.createElement('input');
      btDelete.setAttribute('type', 'button'); // SET INPUT ATTRIBUTE.
      btDelete.setAttribute('value', 'Delete');
      btDelete.setAttribute('style', 'background-color:#ED5650;');
      btDelete.setAttribute('onclick', 'booksApp.Delete(this)'); // ADD THE BUTTON's 'onclick' EVENT.
      this.td.appendChild(btDelete);
    }

    // ADD A ROW AT THE END WITH BLANK TEXTBOXES


    tr = table.insertRow(); // CREATE THE LAST ROW.

    for (let j = 0; j < this.header.length; j++) {
      let newCell = tr.insertCell();
      if (j >= 0) {
        let tBox = document.createElement('input'); // CREATE AND ADD A TEXTBOX.
        tBox.setAttribute('type', 'text');
        tBox.setAttribute('value', '');
        newCell.appendChild(tBox);
      }
    }

    this.td = document.createElement('td');
    tr.appendChild(this.td);

    let btNew = document.createElement('input');

    btNew.setAttribute('type', 'button'); // SET ATTRIBUTES.
    btNew.setAttribute('value', 'Create');
    btNew.setAttribute('style', 'background-color:#207DD1;');
    btNew.setAttribute('onclick', 'booksApp.CreateNew(this)'); // ADD THE BUTTON's ONCLICK EVENT.
    this.td.appendChild(btNew);

    let div = document.getElementById('container');
    div.innerHTML = '';
    div.appendChild(table);
  }; //END OF CREATE TABLE FUNCTION

  // CREATE NEW FUNCTION
  this.CreateNew = function (button) {
    let activeRow = button.parentNode.parentNode.rowIndex;
    let tab = document.getElementById('booksTable').rows[activeRow];
    let obj = {};

    // ADD NEW VALUE TO MYBOOKS ARRAY.

    document.getElementById('booksTable').rows[activeRow];
    for (let i = 0; i < this.header.length; i++) {
      let td = tab.getElementsByTagName("td")[i];
      let txtVal = td.childNodes[0].value;
      if (txtVal != '') {
        obj[this.header[i]] = txtVal;
      } else {
        obj = '';
        alert('must fill out all fields');
        break;
      }
    }
    if (obj !== '') {
      this.myBooks.push(obj); // PUSH DATA TO THE ARRAY.
    }
    this.createTable(); // REFRESH THE TABLE.
  };

  // CANCEL.
  this.Cancel = function (button) {
    let activeRow = button.parentNode.parentNode.rowIndex;
    
    let cancel = document.getElementById('cancel' + (activeRow - 1));
    cancel.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position: absolute;');

    // HIDE THIS BUTTON.
    button.setAttribute('style', 'display:none; float:none;');


    // HIDE THE SAVE BUTTON.
    let save = document.getElementById('Save' + (activeRow - 1));
    save.setAttribute('style', 'display:none;');

    // SHOW THE UPDATE BUTTON AGAIN.
    let update = document.getElementById('Edit' + (activeRow - 1));
    update.setAttribute('style', 'display:block; margin:0 auto; background-color:#44CCEB;');

    let tab = document.getElementById('booksTable').rows[activeRow];

    for (let i = 0; i < this.header.length; i++) {
      let td = tab.getElementsByTagName("td")[i];
      td.innerHTML = this.myBooks[(activeRow - 1)][this.header[i]];
    }
  };
  //edit
  this.Update = function (button) {
    let activeRow = button.parentNode.parentNode.rowIndex;
    let tab = document.getElementById('booksTable').rows[activeRow];
    for (let i = 1; i < 4; i++) {
      if (i == 3) {
        let td = tab.getElementsByTagName("td")[i];
        let ele = document.createElement('input'); // TEXTBOX.
        ele.setAttribute('type', 'text');
        ele.setAttribute('value', td.innerText);
        td.innerText = '';
        td.appendChild(ele);
      }
    }
    let cancel = document.getElementById('cancel' + (activeRow - 1));
    cancel.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position: absolute;');

    let save = document.getElementById('Save' + (activeRow - 1));
    save.setAttribute('style', 'display:block; margin-left:30px; float:left; background-color:#2DBF64;');

    // HIDE THIS BUTTON.
    button.setAttribute('style', 'display:none;');
  }

  // // DELETE DATA.
  this.Delete = function (button) {
    let activeRow = button.parentNode.parentNode.rowIndex;
    this.myBooks.splice((activeRow - 1), 1); // DELETE THE ACTIVE ROW.
    this.createTable(); // REFRESH THE TABLE.
  };

  // SAVE DATA.
  this.Save = function (button) {
    for (let i = 3; i < this.header.length; i++) {
      let activeRow = button.parentNode.parentNode.rowIndex;
      let tab = document.getElementById('booksTable').rows[activeRow];
      let td = tab.getElementsByTagName("td")[i];
      console.log(td.childNodes[0]);
      if (td.childNodes[0].getAttribute('type') === 'text') { // CHECK IF ELEMENT IS A TEXTBOX
        this.myBooks[(activeRow - 1)][this.header[i]] = td.childNodes[0].value; // SAVE THE VALUE.
        this.createTable(); // REFRESH THE TABLE.
      }
    }
    this.createTable(); 
  };
};


booksApp.createTable();