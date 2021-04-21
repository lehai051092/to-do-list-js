let toDoList = [
    {title: "Xin việc ở Google", status: 0},
    {title: "Mua biệt thự", status: 0},
    {title: "Cưới vợ", status: 1},
    {title: "Mua xe hơi", status: 0},
    {title: "Sinh con", status: 1},
    {title: "Đi du lịch vòng quanh thế giới", status: 0},
];


// show
function showToDoList() {
    let tdlList = document.getElementById('tdl-list');
    let html = "";

    for (let i = 0; i < toDoList.length; i++) {
        let tdlItem = toDoList[i];
        html += "<li class='tdl-item'>";
        html += "<input class='tdl-checkbox-" + i + "' type='checkbox' onchange='checkboxTest(" + i + ")' value='" + tdlItem.status + "' />";
        html += "<span class='tdl-title'>" + tdlItem.title + "</span>";
        html += "<button class='tdl-delete-btn' onclick='deleteByIndex(" + i + ")'><i class='ti-close'></i></button>";
        html += "<button class='tdl-edit-btn' onclick='editByIndex(" + i + ")'><i class='ti-reload'></i></button>";
        html += "</li>";
    }

    tdlList.innerHTML = html;
}

showToDoList();

// Btn Add onclick
document.getElementById('tdl-add-btn').onclick = function addItemTdl() {
    let tdlTitle = document.querySelector('#tdl-add-title');
    if (tdlTitle.value !== "") {
        toDoList.push({
            title: tdlTitle.value,
            status: 0
        });

        tdlTitle.value = "";
        showToDoList();
    }
}

// Delete
function deleteByIndex(index) {
    toDoList.splice(index, 1);
    showToDoList();
}

// Edit
function editByIndex(index) {
    toDoList[index].title = prompt("Enter a title: ");
    toDoList[index].status = 1;
    showToDoList();
}

//
function checkboxTest(index) {
    let btnCheckbox = document.querySelector(".tdl-checkbox-" + index);
}
