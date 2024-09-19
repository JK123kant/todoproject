const input_box = document.getElementById("input");
const list = document.getElementById("list");
let editMode = false; // Variable to track if edit mode is active
let taskToEdit = null; // Variable to store the task that needs to be edited

function addtask() {
    if (input_box.value === '') {
        alert("Enter Some task!");
    } else {
        if (editMode) {
            // If in edit mode, update the existing task
            taskToEdit.firstChild.textContent = input_box.value; // Only update text, leave checked/unchecked status unchanged
            editMode = false;
            taskToEdit = null;
        } else {
            // Adding a new task
            let li = document.createElement("li");
            li.innerHTML = input_box.value;
            list.appendChild(li);

            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
        }
        input_box.value = "";
        storedata();
    }
}

// Click event listener for both checking and editing
list.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        // Handle checking/unchecking the task
        if (!editMode) { // Prevent toggling checked state while editing
            e.target.classList.toggle("checked");
        }
    } else if (e.target.tagName === "SPAN") {
        // Handle deleting the task
        e.target.parentElement.remove();
        storedata();
    }
}, false);

// Double click event listener to enter edit mode
list.addEventListener("dblclick", function (e) {
    if (e.target.tagName === "LI") {
        // Enter edit mode on double click
        input_box.value = e.target.firstChild.textContent; // Populate input box with the task text
        editMode = true;
        taskToEdit = e.target; // Store the task for editing
    }
}, false);

// Store data in localStorage
function storedata() {
    localStorage.setItem("data", list.innerHTML);
}

// Retrieve stored data from localStorage on page load
function showdata() {
    list.innerHTML = localStorage.getItem("data");
    if (list.innerHTML === null) list.innerHTML = ''; // Handle case if nothing is stored
}
showdata();
