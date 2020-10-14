const employees = [
    {"id":1,"dept_id":3,"name":"Vickie Smullen","phone":"181-305-3538","salary":5340},
    {"id":2,"dept_id":4,"name":"Hesther Philpot","phone":"333-304-5128","salary":3420},
    {"id":3,"dept_id":4,"name":"Amalia Kimmitt","phone":"911-490-1470","salary":4350},
    {"id":4,"dept_id":5,"name":"Sharon Jellybrand","phone":"856-847-0847","salary":2130},
    {"id":5,"dept_id":5,"name":"Franchot Mattevi","phone":"976-651-6090","salary":2300},
    {"id":6,"dept_id":5,"name":"Burk Di Bartolommeo","phone":"258-100-8106","salary":4330},
    {"id":7,"dept_id":5,"name":"Wynnie Cluse","phone":"682-987-5685","salary":1920},
    {"id":8,"dept_id":5,"name":"Hollie Episcopi","phone":"419-757-4795","salary":5120},
    {"id":9,"dept_id":5,"name":"Bibbie Kinloch","phone":"397-750-8723","salary":3450},
    {"id":10,"dept_id":5,"name":"Rheba Treby","phone":"462-204-4389","salary":2350},
    {"id":11,"dept_id":6,"name":"Adrien Peever","phone":"970-514-6082","salary":4790},
    {"id":12,"dept_id":7,"name":"Harlene Spurryer","phone":"306-110-6490","salary":6540},
    {"id":13,"dept_id":7,"name":"Casper Klimochkin","phone":"197-452-8502","salary":3210},
    {"id":14,"dept_id":8,"name":"Sutherlan Conkling","phone":"131-873-2829","salary":3200},
    {"id":15,"dept_id":8,"name":"Candis Filgate","phone":"209-232-3285","salary":4300},
    {"id":16,"dept_id":8,"name":"Gordan Yurocjhin","phone":"143-644-3404","salary":5430},
    {"id":17,"dept_id":8,"name":"Sib Laetham","phone":"800-876-8767","salary":3890},
    {"id":18,"dept_id":8,"name":"Libbie Thrush","phone":"213-281-1149","salary":5320},
    {"id":19,"dept_id":9,"name":"Elissa Debold","phone":"394-734-6532","salary":2990},
    {"id":20,"dept_id":9,"name":"Lynn Renals","phone":"648-373-4164","salary":3990},
];

let salaries = []
function salaryList () {
    for (let i = 0; i < employees.length; i++) {
        salaries.push(employees[i].salary)
    }
    console.log(salaries)
}
salaryList()

let selectedEmployeeTreeItem = null;

const deptIds = [];
employees.forEach(e => {
    if (!deptIds.includes(e.dept_id)) {
        deptIds.push(e.dept_id);
    }
});

const company = [{
    id: 0,
    parent_id: null,
    name: 'ABC',
}, {
    id: 1,
    parent_id: 0,
    name: 'IT dept'
}, {
    id: 2,
    parent_id: 0,
    name: 'QA dept' 
}, {
    id: 3,
    parent_id: 1,
    name: 'IT Head'
}, {
    id: 4,
    parent_id: 3,
    name: 'Tech lead'
}, {
    id: 5,
    parent_id: 4,
    name: 'Software Engineer'
}, {
    id: 6,
    parent_id: 2,
    name: 'QA Head'
}, {
    id: 7,
    parent_id: 6,
    name: 'QA Lead'
}, {
    id: 8,
    parent_id: 7,
    name: 'QA Engineer'
}, {
    id: 9,
    parent_id: 7,
    name: 'Trainee'
},];

function makeTree(originalArr) {
    const arr = stringClone(originalArr);

    for (let i = 0; i < arr.length; i++) {
        const potentialParent = arr[i];

        for (let j = 0; j < arr.length; j++) {
            const potentialChild = arr[j];

            if (potentialChild.parent_id === potentialParent.id) {
                if (!potentialParent.children) {
                    potentialParent.children = [];
                }

                potentialParent.children.push(potentialChild);
            }
        }
    }

    return arr.filter(item => item.parent_id === null);
}

function createDOMTree(collection, containerEl) {
    const rootEl = document.createElement('ul');
    buildTree(collection, rootEl);

    containerEl.appendChild(rootEl);
}

function getBulletEl() {
    const iEl = document.createElement('i');
    iEl.classList.add('collapsed');

    return iEl;
}

function buildTree(arr, rootEl) {
    for (let i = 0; i < arr.length; i++) {
        const branchEl = arr[i];

        const liEl = document.createElement('li');

        if (branchEl.children) {
            liEl.appendChild(getBulletEl());
        }

        const spanEl = document.createElement('span');
        spanEl.innerText = branchEl.name;
        spanEl.dataset.deptId = branchEl.id;

        if (!deptIds.includes(branchEl.id)) {
            spanEl.classList.add('disabled-tree-item');
        }

        liEl.appendChild(spanEl);

        rootEl.appendChild(liEl);

        if (branchEl.children) {
            const ulEl = document.createElement('ul');
            liEl.appendChild(ulEl);
            buildTree(branchEl.children, ulEl);
        }
    }
}

const jsTree = makeTree(company);
const containerEl = document.getElementById('branchContainer');
createDOMTree(jsTree, containerEl);

containerEl.addEventListener('click', (event) => {
    if (event.target.tagName === 'SPAN') {
        const filteredEmployees =
            getEmployeesByDeptId(employees, +event.target.dataset.deptId);

        displayEmployeesData(filteredEmployees);

        selectTreeItem(event.target);
        return;
    }

    if (event.target.tagName === 'I') {
        const elToHide = event.target.parentElement.getElementsByTagName('ul')[0];
        elToHide.classList.toggle('hidden');
    }
});

function stringClone(collection) {
    return JSON.parse(JSON.stringify(collection));
}

function getEmployeesByDeptId(employeesCollection, id) {
    return employeesCollection.filter(employee => employee.dept_id === id);
}

function displayEmployeesData(employees) {
    clearTable();
    const fields = ['id', 'name', 'phone', 'salary'];
    const tBody = getTableBody();

    employees.forEach(e => {
        const tRow = document.createElement('tr');

        for (let i = 0; i < fields.length; i++) {
            const tD = document.createElement('td');
            const fieldName = fields[i];
            tD.innerText = e[fieldName];
            tRow.appendChild(tD);
        }

        tBody.appendChild(tRow);
    });
}

function getTableBody() {
    const tbodyEl = document.getElementsByTagName('tbody')[0];

    if (tbodyEl) {
        return tbodyEl;
    }

    const table = document.getElementsByTagName('table')[0];
    const newTbodyEl = document.createElement('tbody');

    table.appendChild(newTbodyEl);

    return newTbodyEl;
}

function clearTable() {
    const tBody = document.getElementsByTagName('tbody')[0];
    const table = document.getElementsByTagName('table')[0];

    if (tBody) {
        table.removeChild(tBody);
    }
}

function selectTreeItem(selectedItem) {
    clearTreeSelection();

    selectedEmployeeTreeItem = selectedItem;
    selectedItem.classList.add('selected-tree-item');
}

function clearAll() {
    clearTable();
    clearTreeSelection();
}

function clearTreeSelection() {
    if (selectedEmployeeTreeItem) {
        selectedEmployeeTreeItem.classList.remove('selected-tree-item');
    }
}

let currencyRates = [1]

async function switchCurrency () {
    let responseUSD = await fetch(`https://www.nbrb.by/api/exrates/rates/145`)
    let responseEUR = await fetch(`https://www.nbrb.by/api/exrates/rates/292`)
    let responseRUB = await fetch(`https://www.nbrb.by/api/exrates/rates/298`)
    let resultUSD = await responseUSD.json();
    let resultEUR = await responseEUR.json();
    let resultRUB = await responseRUB.json();
    let curRateUSD = resultUSD.Cur_OfficialRate;
    let curRateEUR = resultEUR.Cur_OfficialRate;
    let curRateRUB = resultRUB.Cur_OfficialRate;
    currencyRates.push(curRateUSD)
    currencyRates.push(curRateEUR)
    currencyRates.push(curRateRUB)
}
switchCurrency ()

let selected = document.querySelector('#selector')
selected.addEventListener('change', () => {
    clearTable();

    let valueNum = +selected.value
    for (let i = 0; i < employees.length; i++) {
        employees[i].salary = (salaries[i] / currencyRates[valueNum]).toFixed(2)
    }
})
