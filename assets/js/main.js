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
        let tiCheckbox = (tdlItem.status === 1) ? "<i class='ti-check'></i>" : "";

        html += "<li class='tdl-item'>";
        html += "<span class='tdl-done'>" + tiCheckbox + "</span>";
        html += "<span class='tdl-title'>" + tdlItem.title + "</span>";
        html += "<a class='tdl-delete-btn' onclick='deleteByIndex(" + i + ")'><i class='ti-close'></i></a>";
        html += "<a class='tdl-edit-btn' onclick='modalFormEdit(" + i + ")'><i class='ti-reload'></i></a>";
        html += "</li>";
    }

    tdlList.innerHTML = html;
}

window.onload = function () {
    showToDoList();
}

// Btn Add onclick
document.getElementById('tdl-add-btn').onclick = function addItemTdl() {
    let tdlTitle = document.querySelector('#tdl-add-title');
    let tdlStatus = document.querySelector('#tdl-status');
    if (tdlTitle.value !== "") {
        toDoList.push({
            title: tdlTitle.value,
            status: (tdlStatus.checked) ? 1 : 0
        });

        tdlTitle.value = "";
        tdlStatus.checked = false;
        showToDoList();
    }
}

// Delete
function deleteByIndex(index) {
    let conf = confirm("You want to delete " + toDoList[index].title + "?");
    if (conf) {
        toDoList.splice(index, 1);
        showToDoList();
    }
}

// Edit
function modalFormEdit(index) {
    let currentModal = document.querySelectorAll('.modal');

    if (currentModal.length > 0) {
        currentModal[0].remove();
    }

    createModal(index);
}

function createModal(index) {
    let modalContainer = document.querySelector('#modal-container');
    let modalElement = document.createElement('div');
    let modalContentElement = document.createElement('div');
    let modalHeaderElement = document.createElement('div');
    let modalBodyElement = document.createElement('div');
    let modalFooterElement = document.createElement('div');
    let modalH2Element = document.createElement('h2');
    let modalH3Element = document.createElement('h3');
    let modalSectionElement = document.createElement('section');
    let modalSpanElement = document.createElement('span');
    let modalBtnElement = document.createElement('input');
    let html = `
        <label for="tdl-edit-title">Title</label><input type="text" placeholder="...Title" id="tdl-edit-title">
        <label for="tdl-edit-status">
            Status
            <input id="tdl-edit-status" type="checkbox">
        </label>`;

    // Add Elements
    modalContainer.appendChild(modalElement);
    modalElement.appendChild(modalContentElement);
    modalContentElement.appendChild(modalHeaderElement);
    modalContentElement.appendChild(modalBodyElement);
    modalContentElement.appendChild(modalFooterElement);
    modalHeaderElement.appendChild(modalSpanElement);
    modalHeaderElement.appendChild(modalH2Element);
    modalBodyElement.appendChild(modalSectionElement);
    modalBodyElement.appendChild(modalBtnElement);
    modalFooterElement.appendChild(modalH3Element);

    // Add Class and id to elements
    modalElement.id = "modal-" + index;
    modalElement.classList.add('modal');
    modalContentElement.classList.add('modal-content');
    modalHeaderElement.classList.add('modal-header');
    modalSpanElement.classList.add('close');
    modalBodyElement.classList.add('modal-body');
    modalFooterElement.classList.add('modal-footer');
    modalBtnElement.id = "tdl-edit-btn";

    // Add text and value to elements
    modalSpanElement.innerText = "x";
    modalH2Element.innerText = "Form Update Index " + toDoList[index].title;
    modalSectionElement.innerHTML = html;
    modalH3Element.innerText = "Modal Footer";
    modalBtnElement.type = "button";
    modalBtnElement.value = "Update";

    // Add action modal
    modalElement.style.display = "block";

    modalSpanElement.onclick = function () {
        modalElement.style.display = "none";
    }

    modalBtnElement.onclick = function () {
        editByIndex(index);
        modalElement.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target === modalElement) {
            modalElement.style.display = "none";
        }
    }
}

function editByIndex(index) {
    let tdlEditTitle = document.querySelector('#tdl-edit-title');
    let tdlEditStatus = document.querySelector('#tdl-edit-status');

    if (tdlEditTitle.value !== "") {
        toDoList[index].title = tdlEditTitle.value;
        toDoList[index].status = (tdlEditStatus.checked) ? 1 : 0;
        showToDoList();
    }
}
