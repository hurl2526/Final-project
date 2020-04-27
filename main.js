





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
            for (var i = 0; i < this.myBooks.length; i++) {
                tr = table.insertRow();           // CREATE A NEW ROW.
                for (var j = 0; j < this.header.length; j++) {
                    var tabCell = tr.insertCell();
                    tabCell.innerHTML = this.myBooks[i][this.header[j]]; //ask about this!!!
                }

                // DYNAMICALLY CREATE AND ADD ELEMENTS TO TABLE CELLS WITH EVENTS.

                // this.td = document.createElement('td');

                // // *** CANCEL OPTION.
                // tr.appendChild(this.td);
                // var lblCancel = document.createElement('label');
                // lblCancel.innerHTML = '✖';
                // lblCancel.setAttribute('onclick', 'booksApp.Cancel(this)');
                // lblCancel.setAttribute('style', 'display:none;');
                // lblCancel.setAttribute('title', 'Cancel');
                // lblCancel.setAttribute('id', 'lbl' + i);
                // this.td.appendChild(lblCancel);

                // // *** SAVE.
                // tr.appendChild(this.td);
                // var btSave = document.createElement('input');

                // btSave.setAttribute('type', 'button');      // SET ATTRIBUTES.
                // btSave.setAttribute('value', 'Save');
                // btSave.setAttribute('id', 'Save' + i);
                // btSave.setAttribute('style', 'display:none;');
                // btSave.setAttribute('onclick', 'booksApp.Save(this)');       // ADD THE BUTTON's 'onclick' EVENT.
                // this.td.appendChild(btSave);

                // // *** UPDATE.
                // tr.appendChild(this.td);
                // var btUpdate = document.createElement('input');

                // btUpdate.setAttribute('type', 'button');    // SET ATTRIBUTES.
                // btUpdate.setAttribute('value', 'Update');
                // btUpdate.setAttribute('id', 'Edit' + i);
                // btUpdate.setAttribute('style', 'background-color:#44CCEB;');
                // btUpdate.setAttribute('onclick', 'booksApp.Update(this)');   // ADD THE BUTTON's 'onclick' EVENT.
                // this.td.appendChild(btUpdate);

                // // *** DELETE.
                // this.td = document.createElement('th');
                // tr.appendChild(this.td);
                // var btDelete = document.createElement('input');
                // btDelete.setAttribute('type', 'button');    // SET INPUT ATTRIBUTE.
                // btDelete.setAttribute('value', 'Delete');
                // btDelete.setAttribute('style', 'background-color:#ED5650;');
                // btDelete.setAttribute('onclick', 'booksApp.Delete(this)');   // ADD THE BUTTON's 'onclick' EVENT.
                // this.td.appendChild(btDelete);
            }

                // ADD A ROW AT THE END WITH BLANK TEXTBOXES AND A DROPDOWN LIST (FOR NEW ENTRY).

                tr = table.insertRow();           // CREATE THE LAST ROW.

                for (var j = 0; j < this.header.length; j++) {
                    var newCell = tr.insertCell();
                    if (j >= 0) {
                            var tBox = document.createElement('input');          // CREATE AND ADD A TEXTBOX.
                            tBox.setAttribute('type', 'text');
                            tBox.setAttribute('value', '');
                            newCell.appendChild(tBox);
                        }
                }
    
                this.td = document.createElement('td');
                tr.appendChild(this.td);
    
                var btNew = document.createElement('input');
    
                btNew.setAttribute('type', 'button');       // SET ATTRIBUTES.
                btNew.setAttribute('value', 'Create');
                btNew.setAttribute('style', 'background-color:#207DD1;');
                btNew.setAttribute('onclick', 'booksApp.CreateNew(this)');       // ADD THE BUTTON's 'onclick' EVENT.
                this.td.appendChild(btNew);
    
                var div = document.getElementById('container');
                div.innerHTML = '';
                div.appendChild(table);
            };

            // CREATE NEW FUNCTION. Ask for help with this!!!!
        this.CreateNew = function (button) {
            var activeRow = button.parentNode.parentNode.rowIndex;
            var tab = document.getElementById('booksTable').rows[activeRow];
            var obj = {};

            // ADD NEW VALUE TO myBooks ARRAY.
            for (let i = 0; i < this.header.length; i++) {
                var td = tab.getElementsByTagName("td")[i];
                if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {      // CHECK IF ELEMENT IS A TEXTBOX OR SELECT.
                    var txtVal = td.childNodes[0].value;
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
        // this.Cancel = function (button) {

        //     // HIDE THIS BUTTON.
        //     button.setAttribute('style', 'display:none; float:none;');

        //     var activeRow = button.parentNode.parentNode.rowIndex;

        //     // HIDE THE SAVE BUTTON.
        //     var btSave = document.getElementById('Save' + (activeRow - 1));
        //     btSave.setAttribute('style', 'display:none;');

        //     // SHOW THE UPDATE BUTTON AGAIN.
        //     var btUpdate = document.getElementById('Edit' + (activeRow - 1));
        //     btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#44CCEB;');

        //     var tab = document.getElementById('booksTable').rows[activeRow];

        //     for (i = 0; i < this.header.length; i++) {
        //         var td = tab.getElementsByTagName("td")[i];
        //         td.innerHTML = this.myBooks[(activeRow - 1)][this.header[i]];
        //     }
        // }


        // EDIT DATA.
        // this.Update = function (button) {
        //     var activeRow = button.parentNode.parentNode.rowIndex;
        //     var tab = document.getElementById('booksTable').rows[activeRow];

        //     // SHOW A DROPDOWN LIST WITH A LIST OF CATEGORIES.
        //     for (i = 1; i < 4; i++) {
        //         if (i == 2) {
        //             var td = tab.getElementsByTagName("td")[i];
        //             var ele = document.createElement('select');      // DROPDOWN LIST.
        //             ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
        //             for (k = 0; k < this.category.length; k++) {
        //                 ele.innerHTML = ele.innerHTML +
        //                     '<option value="' + this.category[k] + '">' + this.category[k] + '</option>';
        //             }
        //             td.innerText = '';
        //             td.appendChild(ele);
        //         }
        //         else {
        //             var td = tab.getElementsByTagName("td")[i];
        //             var ele = document.createElement('input');      // TEXTBOX.
        //             ele.setAttribute('type', 'text');
        //             ele.setAttribute('value', td.innerText);
        //             td.innerText = '';
        //             td.appendChild(ele);
        //         }
        //     }

        //     var lblCancel = document.getElementById('lbl' + (activeRow - 1));
        //     lblCancel.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position: absolute;');

        //     var btSave = document.getElementById('Save' + (activeRow - 1));
        //     btSave.setAttribute('style', 'display:block; margin-left:30px; float:left; background-color:#2DBF64;');

        //     // HIDE THIS BUTTON.
        //     button.setAttribute('style', 'display:none;');
        // };


        // // DELETE DATA.
        // this.Delete = function (button) {
        //     var activeRow = button.parentNode.parentNode.rowIndex;
        //     this.myBooks.splice((activeRow - 1), 1);    // DELETE THE ACTIVE ROW.
        //     this.createTable();                         // REFRESH THE TABLE.
        // };

        // // SAVE DATA.
        // this.Save = function (button) {
        //     var activeRow = button.parentNode.parentNode.rowIndex;
        //     var tab = document.getElementById('booksTable').rows[activeRow];

        //     // UPDATE myBooks ARRAY WITH VALUES.
        //     for (i = 1; i < this.header.length; i++) {
        //         var td = tab.getElementsByTagName("td")[i];
        //         if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {  // CHECK IF ELEMENT IS A TEXTBOX OR SELECT.
        //             this.myBooks[(activeRow - 1)][this.header[i]] = td.childNodes[0].value;      // SAVE THE VALUE.
        //         }
        //     }
        //     this.createTable();     // REFRESH THE TABLE.
        // }

        // ****** OPERATIONS END.
    }

    booksApp.createTable();