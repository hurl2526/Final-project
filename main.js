





    const booksApp = new function () {

        // objects array
        this.myBooks = [
            {Title: 'The Hobbit', Started: 'January', Pages: 125 , Rating: 5},
            {Title: 'War and Peace', Started: 'February', Pages: 56, Rating: 5},
            {Title: 'The Great Gatsby', Started: 'April', Pages: 210, Rating: 5 }
        ]
        this.header = ['Title', 'Started', 'Pages', 'Rating'];

              // CREATE A TABLE.
            this.createTable = function () {
            const table = document.createElement('table');
            table.setAttribute('id', 'booksTable'); 

            let tr = table.insertRow();               // CREATE A ROW (FOR HEADER).
            for (let h = 0; h < this.header.length; h++) {
                let th = document.createElement('th');
                th.innerHTML = this.header[h];
                tr.appendChild(th);
            }

            // ADD ROWS
            for (let i = 0; i < this.myBooks.length; i++) {
                tr = table.insertRow();           // CREATE A NEW ROW.
                for (let j = 0; j < this.header.length; j++) {
                    let tabCell = tr.insertCell();
                    tabCell.innerHTML = this.myBooks[i][this.header[j]]; //GRABBING THE BOOKS ARRAY AT .TITLE, THEN .STARTED
                }

                // DYNAMICALLY CREATE AND ADD ELEMENTS TO TABLE CELLS WITH EVENTS.

                this.td = document.createElement('td');

                // *** CANCEL OPTION.
                tr.appendChild(this.td);
                let lblCancel = document.createElement('label');
                lblCancel.innerHTML = '✖';
                lblCancel.setAttribute('onclick', 'booksApp.Cancel(this)');
                lblCancel.setAttribute('style', 'display:none;');
                lblCancel.setAttribute('title', 'Cancel');
                lblCancel.setAttribute('id', 'lbl' + i);
                this.td.appendChild(lblCancel);

                // *** SAVE.
                tr.appendChild(this.td);
                let btSave = document.createElement('input');

                btSave.setAttribute('type', 'button');      // SET ATTRIBUTES.
                btSave.setAttribute('value', 'Save');
                btSave.setAttribute('id', 'Save' + i);
                btSave.setAttribute('style', 'display:none;');
                btSave.setAttribute('onclick', 'booksApp.Save(this)');       // ADD THE BUTTON's 'onclick' EVENT.
                this.td.appendChild(btSave);

                // *** UPDATE.
                tr.appendChild(this.td);
                let btUpdate = document.createElement('input');

                btUpdate.setAttribute('type', 'button');    // SET ATTRIBUTES.
                btUpdate.setAttribute('value', 'Update');
                btUpdate.setAttribute('id', 'Edit' + i);
                btUpdate.setAttribute('style', 'background-color:#44CCEB;');
                btUpdate.setAttribute('onclick', 'booksApp.Update(this)');   // ADD THE BUTTON's 'onclick' EVENT.
                this.td.appendChild(btUpdate);

                // *** DELETE.
                this.td = document.createElement('th');
                tr.appendChild(this.td);
                let btDelete = document.createElement('input');
                btDelete.setAttribute('type', 'button');    // SET INPUT ATTRIBUTE.
                btDelete.setAttribute('value', 'Delete');
                btDelete.setAttribute('style', 'background-color:#ED5650;');
                btDelete.setAttribute('onclick', 'booksApp.Delete(this)');   // ADD THE BUTTON's 'onclick' EVENT.
                this.td.appendChild(btDelete);
            }

                // ADD A ROW AT THE END WITH BLANK TEXTBOXES AND A DROPDOWN LIST (FOR NEW ENTRY).

                tr = table.insertRow();           // CREATE THE LAST ROW.

                for (let j = 0; j < this.header.length; j++) {
                    let newCell = tr.insertCell();
                    if (j >= 0) {
                            let tBox = document.createElement('input');          // CREATE AND ADD A TEXTBOX.
                            tBox.setAttribute('type', 'text');
                            tBox.setAttribute('value', '');
                            newCell.appendChild(tBox);
                        }
                }
    
                this.td = document.createElement('td');
                tr.appendChild(this.td);
    
                let btNew = document.createElement('input');
    
                btNew.setAttribute('type', 'button');       // SET ATTRIBUTES.
                btNew.setAttribute('value', 'Create');
                btNew.setAttribute('style', 'background-color:#207DD1;');
                btNew.setAttribute('onclick', 'booksApp.CreateNew(this)');       // ADD THE BUTTON's 'onclick' EVENT.
                this.td.appendChild(btNew);
    
                let div = document.getElementById('container');
                div.innerHTML = '';
                div.appendChild(table);
            };

            // CREATE NEW FUNCTION. Ask for help with this!!!!
        this.CreateNew = function (button) {
            let activeRow = button.parentNode.parentNode.rowIndex;
            let tab = document.getElementById('booksTable').rows[activeRow];
            let obj = {};

            // ADD NEW VALUE TO myBooks ARRAY.
            for (let i = 0; i < this.header.length; i++) {
                let td = tab.getElementsByTagName("td")[i];
                if (td.childNodes[0].getAttribute('type') == 'text') {      // CHECK IF ELEMENT IS A TEXTBOX
                    let txtVal = td.childNodes[0].value;
                    if (txtVal != '') {
                        obj[this.header[i]] = txtVal.trim();
                    }
                    else {
                        obj = '';
                        alert('must fill our all fields');
                        break;
                    }
                }
            }
                this.myBooks.push(obj);             // PUSH DATA TO THE ARRAY.
                this.createTable();                 // REFRESH THE TABLE.
        }



        // The Rubric says able to edit data but we never really went over how to edit very much so this code is all stolen to make the app more functional.

        // CANCEL.
        this.Cancel = function (button) {

            // HIDE THIS BUTTON.
            button.setAttribute('style', 'display:none; float:none;');

            let activeRow = button.parentNode.parentNode.rowIndex;

            // HIDE THE SAVE BUTTON.
            let btSave = document.getElementById('Save' + (activeRow - 1));
            btSave.setAttribute('style', 'display:none;');

            // SHOW THE UPDATE BUTTON AGAIN.
            let btUpdate = document.getElementById('Edit' + (activeRow - 1));
            btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#44CCEB;');

            let tab = document.getElementById('booksTable').rows[activeRow];

            for (let i = 0; i < this.header.length; i++) {
                let td = tab.getElementsByTagName("td")[i];
                td.innerHTML = this.myBooks[(activeRow - 1)][this.header[i]];
            }
        }


        //edit
        this.Update = function (button) {
            let activeRow = button.parentNode.parentNode.rowIndex;
            let tab = document.getElementById('booksTable').rows[activeRow];
            for (let i = 1; i < 4; i++) {
                if (i == 2 || i === 3) {
                    let td = tab.getElementsByTagName("td")[i];
                    let ele = document.createElement('input');      // TEXTBOX.
                    ele.setAttribute('type', 'text');
                    ele.setAttribute('value', td.innerText);
                    td.innerText = '';
                    td.appendChild(ele);
                }
            }

            let lblCancel = document.getElementById('lbl' + (activeRow - 1));
            lblCancel.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position: absolute;');

            let btSave = document.getElementById('Save' + (activeRow - 1));
            btSave.setAttribute('style', 'display:block; margin-left:30px; float:left; background-color:#2DBF64;');

            // HIDE THIS BUTTON.
            button.setAttribute('style', 'display:none;');
        };


        // // DELETE DATA.
        this.Delete = function (button) {
            let activeRow = button.parentNode.parentNode.rowIndex;
            this.myBooks.splice((activeRow - 1), 1);    // DELETE THE ACTIVE ROW.
            this.createTable();                         // REFRESH THE TABLE.
        };

        // SAVE DATA.
        this.Save = function (button) {
            let activeRow = button.parentNode.parentNode.rowIndex;
            let tab = document.getElementById('booksTable').rows[activeRow];

            // UPDATE myBooks ARRAY WITH VALUES.
            for (let i = 1; i < this.header.length; i++) {
                let td = tab.getElementsByTagName("td")[i];
                if (td.childNodes[0].getAttribute('type') == 'text') {  // CHECK IF ELEMENT IS A TEXTBOX
                    this.myBooks[(activeRow - 1)][this.header[i]] = td.childNodes[0].value;      // SAVE THE VALUE.
                }
            }
            this.createTable();     // REFRESH THE TABLE.
        }
      }

        // ****** OPERATIONS END.
    

    booksApp.createTable();