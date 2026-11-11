   const category = [
      { id: 1, name: 'Food' },
      { id: 2, name: 'Transport' },
      { id: 3, name: 'Shopping' },
      { id: 4, name: 'Bills' },
 ];
 const STORAGE_KEY = 'expense_tracker_data';
 
let expenses = []; 
const totalSpentEl = document.getElementById('totalSpent');
 const expenseCountEl = document.getElementById('expenseCount');
const biggestExpenseEl = document.getElementById('biggestExpense');


const selectElement = document.getElementById("category");

// fil select category in form
category.forEach((item) => {
    const option = document.createElement("option");

    option.value = item.id;
    option.textContent = item.name;

    selectElement.appendChild(option);
});
// fil select category in form
const selectElement1 = document.getElementById("category2");

category.forEach((item) => {
    const option = document.createElement("option");

    option.value = item.id;
    option.textContent = item.name;

    selectElement1.appendChild(option);
});


// add to table
const addtable = document.getElementById('expenseTableBody');
const form = document.getElementById('add-from');
// save in local storage 
function loadFromStorage() {
        const storedExpenses = localStorage.getItem(STORAGE_KEY);
        if (storedExpenses) {
          try {
            expenses = JSON.parse(storedExpenses);
            if (!Array.isArray(expenses)) expenses = [];
          } catch (e) {
            expenses = [];
          }
        } else {
          expenses = [];
        }
        
      }
     // call the function 
      loadFromStorage()
         
      // update 3 card 
         function renderCards() {
        const total = expenses.reduce((sum, exp) => sum +Number(exp.amount) , 0);
        const count = expenses.length;
        const biggest = expenses.length ? Math.max(...expenses.map(e => e.amount)) : 0;

         totalSpentEl.textContent = total;
        expenseCountEl.textContent = count;
        biggestExpenseEl.textContent = biggest;
       
      }



      function deleteExpense(index) {
        const exp = expenses[index];
        if (!exp) return;
        if (confirm(`Delete expense "${exp.description}" of ${formatCurrency(exp.amount)}?`)) {
          expenses.splice(index, 1);
        }}

      // ---------- RENDER TABLE  ----------
      function renderTable() {
        
        let filtered = [...expenses];
       
        // clear table
        addtable.innerHTML = '';
        // build rows
        filtered.forEach((exp ) => {
          // find original index in expenses array (to handle edit/delete)
          const originalIndex = expenses.findIndex(e =>
              e.description === exp.exp &&
            e.amount === exp.amount &&
            e.category === exp.categoryName &&
            e.date === exp.date
          ); 
          const row = document.createElement('tr');

          // Description
          const descCell = document.createElement('td');
          descCell.textContent = exp.exp;
          row.appendChild(descCell);

          // Amount
          const amountCell = document.createElement('td');
          amountCell.textContent = exp.amount;
          row.appendChild(amountCell);

          // Category
          const catCell = document.createElement('td');
           catCell.textContent = exp.categoryName;
          
          row.appendChild(catCell);

          // Date
          const dateCell = document.createElement('td');
          dateCell.textContent = exp.date;
          row.appendChild(dateCell);

          // Actions: edit + delete
          const actionCell = document.createElement('td');
          // Edit button
          const editBtn = document.createElement('button');
          editBtn.className = 'edit-btn ';
         editBtn.textContent = 'Edit';
          actionCell.appendChild(editBtn);

          // Delete button
          const deleteBtn = document.createElement('button');
          deleteBtn.className = 'action-btn';
          deleteBtn.textContent = 'Delete';
          


         actionCell.appendChild(deleteBtn);
          row.appendChild(actionCell);
          addtable.appendChild(row);
        });

        // update cards after render
        renderCards();
      }


// generate id
const newId = expenses.length +1

form.addEventListener('submit',(e)=>{
e.preventDefault();
/// add description
  const exp = form.elements.description.value.trim();
  const row=document.createElement('tr');
  const decell=document.createElement('td');
    decell.textContent =exp;
    row.appendChild(decell);
/// add amount
    const amount = form.elements.amount.value;
    const amountcell=document.createElement('td');
     amountcell.textContent=Number(amount);
     ///console.log(amountcell);
      row.appendChild(amountcell);
      
      // add category
   const categoryId = Number(form.elements.category.value);
const selectedCategory = category.find(item => item.id === categoryId);
const categoryName = selectedCategory.name;
const categorycell = document.createElement('td');
categorycell.textContent = categoryName;
row.appendChild(categorycell);
// add date
const date = form.elements.date.value;

const datecell = document.createElement('td');
datecell.textContent = date;

row.appendChild(datecell);

const actionCell = document.createElement('td');
 const editBtn = document.createElement('button');
 editBtn.textContent = 'Edit';
 row.appendChild(editBtn);

const actionCell1 = document.createElement('td');
const delBtn = document.createElement('button');
  delBtn.textContent = 'delete';
  row.appendChild(delBtn);
addtable.appendChild(row)

expenses.push({ newId:expenses.length+1 ,exp, amount, categoryName, date });
 localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
console.log(expenses);
form.reset();
renderTable();
renderCards()


});


       
      renderTable();