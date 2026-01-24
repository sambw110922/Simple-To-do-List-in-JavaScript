
/*
    Simple Todo list JavaScript
    This is the main JavaScript for the simple todo list.
    17 January 2026
*/

//  The Global Todos list.
var globalTodos = [];

//  The number of todos.
var noTodos = 1;

//  Priority values
const lowPriority = 1;
const mediumPriority = 2;
const highPrioirty = 3;

//  Represents a class.
class MyTask {

    constructor(id, content, priority) {
        this.taskId = id;
        this.taskContent = content;
        this.taskPriority = priority;
        this.taskCompletionStatus = false;
    }

}

//  Gets the form data.
function GetFormData(){

    let textContent = document.getElementById("txtTask").value;
    
    let priority = lowPriority;

    if (document.getElementById("rdoLowPriority").checked == true) {

        priority = lowPriority;

    }

    if (document.getElementById("rdoMediumPriority").checked == true) {

        priority = mediumPriority;

    }

    if (document.getElementById("rdoHighPriority").checked == true) {

        priority = highPrioirty;

    }

    let taskId = noTodos + 1;

    let task = new MyTask(taskId, textContent, priority);

    globalTodos.push(task);

    noTodos++;

}


//  Sets a task to "complete"
function CompleteTask(taskId) {

    for (let i = 0; i < globalTodos.length; i++) {

        if (globalTodos[i].taskId == taskId) {

            globalTodos[i].taskCompletionStatus = true;

        }

    }

}

//  Removes a task from the array.
function DeleteTask(taskId) {

    for (let i = 0; i < globalTodos.length; i++) {

        if(globalTodos[i].taskId == taskId) {

            globalTodos.splice(i, 1);

        }

    }

}

//  Updates the task content
function UpdateTask(taskId, taskContent){

    for (let i = 0; i < globalTodos.length; i++) {

        if (globalTodos[i].taskId == taskId) {

            globalTodos[i].taskContent = taskContent;

        }

    }

}

//  Produces the HTML for each task
function TaskFactory(todo) {

    //  The root task div
    let mainTodo = document.createElement("div");

    mainTodo.id = "task" + todo.taskId;

    //  The header element, displays the content
    let todoHeader = document.createElement("h3");
    todoHeader.textContent = todo.taskContent;

    mainTodo.appendChild(todoHeader);

    //  Displays the complete/incomplete
    let statusDisplay = document.createElement("p");
    
    if (todo.taskCompletionStatus == true) {

        statusDisplay.textContent = "Status: Complete";

    } else {

        statusDisplay.textContent = "Status: Incomplete";

    }

    //  Displays "high, medium, low" priority
    let priorityDisplay = document.createElement("p");

    switch (todo.taskPriority) {

        case lowPriority:
            
            priorityDisplay.textContent = "Priority: Low";

            mainTodo.classList.add("task");
            mainTodo.classList.add("taskLowPriority");

            break;

        case mediumPriority:

            priorityDisplay.textContent = "Priority: Medium";

            mainTodo.classList.add("task");
            mainTodo.classList.add("taskMediumPriority");

            break;

        case highPrioirty:

            priorityDisplay.textContent = "Priority: High";

            mainTodo.classList.add("task");
            mainTodo.classList.add("taskHighPriority");

            break;

    }

    //  The edit button for the task. Shows the edit text area when clicked
    let editButton = document.createElement("button");

    editButton.className = "taskButtonStyle";
    editButton.textContent = "Edit";
    editButton.setAttribute("data-taskId", todo.taskId);

    //  Contains the edit text area and save button 
    let editControls = document.createElement("div");

    //  The updated text
    let editText = document.createElement("textarea");

    editText.textContent = todo.taskContent;
    editText.id = "txtTask" + todo.taskId;

    //  Save the update
    let editSave = document.createElement("button");

    editSave.className = "taskButtonStyle";
    editSave.setAttribute("data-taskId", todo.taskId);
    editSave.textContent = "Save";

    //  Save function
    editSave.addEventListener("click", function(){

        let textAreaId = "txtTask" + this.getAttribute("data-taskId")
        let updatedText = document.getElementById(textAreaId).value;

        UpdateTask(this.getAttribute("data-taskId"), updatedText);
        DisplayTodoList(globalTodos);

    });

    editControls.appendChild(editText);
    editControls.appendChild(editSave);

    //  Displays the edit controls for the task
    editButton.addEventListener("click", () => {

        mainTodo.appendChild(editControls);

    });

    mainTodo.appendChild(editButton); 
    mainTodo.appendChild(statusDisplay);
    mainTodo.appendChild(priorityDisplay);
    
    //  The task has been completed
    let completeButton = document.createElement("button");

    completeButton.className = "taskButtonStyle";
    completeButton.textContent = "Complete";
    completeButton.setAttribute("data-taskId", todo.taskId);

    //  Event for the complete button
    //  Changes completion status to true.
    completeButton.addEventListener("click", function(){

        CompleteTask(this.getAttribute("data-taskId"));
        DisplayTodoList(globalTodos);

    });

    mainTodo.appendChild(completeButton);

    //  Removes the task from the array
    let deleteButton = document.createElement("button");

    deleteButton.className = "taskButtonStyle";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("data-taskId", todo.taskId);

    //  Event for the delete button
    //  Removes the task from array.
    deleteButton.addEventListener("click", function(){

        DeleteTask(this.getAttribute("data-taskId"));
        DisplayTodoList(globalTodos);

    });

    mainTodo.appendChild(deleteButton);

    if (todo.taskCompletionStatus == true) {

        mainTodo.classList.add("taskCompleted");

    }

    return mainTodo;

}


//  Displays the todo list
function DisplayTodoList(todoList) {

    document.getElementById("tasksList").replaceChildren();

    for (let i = 0; i < todoList.length; i++) {

        document.getElementById("tasksList").appendChild(TaskFactory(todoList[i]));

    }

}

//  This function sorts tasks by priority high to low.
//  Uses bubble sort algorithm.
function SortHighLow() {

    let sortedList = globalTodos;

    for (let i = 0; i < sortedList.length; i++) {

        for (let j = 0; j < sortedList.length; j++) {

            let a = "none";
            let b = "none";

            if (sortedList[j].taskPriority < sortedList[i].taskPriority ) {

                a = sortedList[i];
                b = sortedList[j];

                sortedList[i] = b;
                sortedList[j] = a;

            }

        }

    }

    return sortedList;

}

//  This function sorts tasks by prioity low to high.
//  Uses bubble sort algorithm.
function SortLowHigh() {

    let sortedList = globalTodos;

    for (let i = 0; i < sortedList.length; i++) {

        for (let j = 0; j < sortedList.length; j++) {

            let a = "none";
            let b = "none";

            if (sortedList[j].taskPriority > sortedList[i].taskPriority) {

                a = sortedList[i];
                b = sortedList[j];

                sortedList[i] = b;
                sortedList[j] = a;

            }

        }


    }

    return sortedList;

}

//  Returns tasks by status.
function SortByStatus(status) {

    let sortedList = [];

    for (i = 0; i < globalTodos.length; i++) {

        if (globalTodos[i].taskCompletionStatus == status) {

            sortedList.push(globalTodos[i]);

        }

    }

    return sortedList;

}


//  Runs the app
function init(){

    //  A default task 
    let task1 = new MyTask(1, "Hello, world!", 1);
    globalTodos.push(task1);

    DisplayTodoList(globalTodos);

    //  The submit button for the form.
    document.getElementById("btnSubmit").addEventListener("click", function(e) {

        e.preventDefault();

        GetFormData();

        DisplayTodoList(globalTodos);


    });

    //  When the filter is changed
    document.getElementById("drpFilter").addEventListener("change", function(){

        let drpFilter = document.getElementById("drpFilter").value;

        switch (drpFilter) {

            case "all":

                DisplayTodoList(globalTodos);

                break;

            case "complete":

                var sortedList = SortByStatus(true);
                DisplayTodoList(sortedList);

                break;

            case "inProgress":

                var sortedList = SortByStatus(false);
                DisplayTodoList(sortedList);

                break;

            case "lowHigh":

                var sortedList = SortLowHigh();
                DisplayTodoList(sortedList);

                break;

            case "highLow":

                var sortedList = SortHighLow();
                DisplayTodoList(sortedList);

                break;

        }

    });

}

//  Runs the app
init();