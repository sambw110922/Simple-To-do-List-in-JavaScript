/*
    todolist .js
    03 July 2026
*/

//  The main task array.
//  Holds all of the tasks created.
var taskList = [];

//  The priority levels.
const lowPriority = 1;
const mediumPriority = 2;
const highPriority = 3;

const max_text = 200;
const min_text = 0;

//  The task class.
class TaskItem {
    
    //  Task id = the unique ID of the task.
    //  taskContent = the text content of the task.
    //  taskPriority = the priority of the task. 1 = low, 2 = medium, 3 = high.
    //  taskStatus = if a task is complete or not.
    constructor(taskId, taskContent, taskPriority, taskStatus){
        this.taskId = taskId;
        this.taskContent = taskContent;
        this.taskPriority = taskPriority;
        this.taskStatus = taskStatus;
    }

}

//  Refresh the list..
function RefreshList(){
    
    document.getElementById("taskContainer").remove();

    let taskContainer = document.createElement("div");
    taskContainer.id = "taskContainer";

    document.getElementById("taskList").appendChild(taskContainer);

     DisplayTasks();
}

//  Creates the HTML.
function GenerateTaskHTML(task){

    //  Create the root div.
    let taskItemRoot = document.createElement("div");
    taskItemRoot.id = task.taskId;
    taskItemRoot.className = "taskItem";

    //  The header.
    let taskItemContent = document.createElement("h2");
    taskItemContent.innerHTML = task.taskContent;
    taskItemContent.id = task.taskId + "Content";

    //  The priority badge.
    let taskPriorityBadge = document.createElement("p");
    taskPriorityBadge.id = task.taskId + "Priority";
    
    //  Check and assign priorities for the correct badge class.
    if(task.taskPriority == 1){
        taskPriorityBadge.className = "lowBadge";
        taskPriorityBadge.innerHTML = "Low";
    }

    if(task.taskPriority == 2){
        taskPriorityBadge.className = "mediumBadge";
        taskPriorityBadge.innerHTML = "Medium";
    }

    if(task.taskPriority == 3){
        taskPriorityBadge.className = "highBadge";
        taskPriorityBadge.innerHTML = "High";
    }

    //  The task status.
    let taskStatus = document.createElement("p");
    
    if(task.taskStatus == false){
        taskStatus.innerHTML = "Incomplete";
    } else {
        taskStatus.innerHTML = "Complete";
    }

    //  This is the complete button.
    let btnComplete = document.createElement("button");
    btnComplete.id = "btn" + task.taskId + "Complete";
    btnComplete.className = "completeButton";
    btnComplete.innerHTML = "&#10004;";
    btnComplete.dataset.taskId = task.taskId;

    //  The event listener for the complete button.
    btnComplete.addEventListener("click", function(){

        for(let i = 0; i < taskList.length; i++){

            if(this.dataset.taskId == taskList[i].taskId){
                taskList[i].taskStatus = true;
                break;
            }

        }

        RefreshList();

    });

    //  This is the delete button.
    let btnDelete = document.createElement("button");
    btnDelete.id = "btn" + task.taskId + "Delete";
    btnDelete.innerHTML = "&#10007;";
    btnDelete.className = "deleteButton";
    btnDelete.dataset.taskId = task.taskId;

    //  The event listener for the delete button.
    btnDelete.addEventListener("click", function(){

        for(let i = 0; i < taskList.length; i++){

            if(this.dataset.taskId == taskList[i].taskId){
                taskList.splice(i, 1);
                break;
            }

        }

        RefreshList();

    });

    //  The edit button.
    let btnEdit = document.createElement("button");
    btnEdit.id = "btn" + task.taskId + "Edit";
    btnEdit.innerHTML = "&#9998;";
    btnEdit.className = "editButton";
    btnEdit.dataset.taskId = task.taskId;

    //  The click event for the edit button.
    btnEdit.addEventListener("click", function(){
        
        //  create a div for the edit form.
        let editFormRoot = document.createElement("div");

        //  Creates the form.
        let editForm = document.createElement("form");

        //  =====================================
        
        //  Creates the content field.
        let fieldsetContent = document.createElement("fieldset");

        let labelContent = document.createElement("label");
        labelContent.innerHTML = "Edit content: ";

        let txtContent = document.createElement("input");
        txtContent.id = "txtContentUpdate" + this.dataset.taskId;
        txtContent.type = "text";

        fieldsetContent.appendChild(labelContent);
        fieldsetContent.appendChild(txtContent);

        //  =========================================

        //  Creates the priority field.
        let fieldsetPriority = document.createElement("fieldset");

        let labelPriority = document.createElement("label");
        labelPriority.innerHTML = "Edit priority: ";

        let drpPriority = document.createElement("select");
        drpPriority.id = "drpPriority" + task.taskId;

        let optionLow = document.createElement("option");
        optionLow.innerText = "Low";
        optionLow.value = 1;

        let optionMedium = document.createElement("option");
        optionMedium.innerText = "Medium";
        optionMedium.value = 2;

        let optionHigh = document.createElement("option");
        optionHigh.innerText = "High";
        optionHigh.value = 3;

        drpPriority.appendChild(optionLow);
        drpPriority.appendChild(optionMedium);
        drpPriority.appendChild(optionHigh);

        fieldsetPriority.appendChild(labelPriority);
        fieldsetPriority.append(drpPriority);

        //  ======================================

        //  Saves the changes.
        let btnSaveChanges = document.createElement("button");
        btnSaveChanges.textContent = "Save";
        btnSaveChanges.id = "btnSaveChanges" + task.taskId;
        btnSaveChanges.dataset.taskId = task.taskId;
        btnSaveChanges.className = "saveButton";

        //  The click event for the save button.
        btnSaveChanges.addEventListener("click", function(){
            
            if(document.getElementById("txtContentUpdate" + this.dataset.taskId)){
                
                let txtContentUpdate = document.getElementById("txtContentUpdate" + this.dataset.taskId).value;
                let drpPriority = document.getElementById("drpPriority" + this.dataset.taskId).value;

                if(txtContentUpdate.length > min_text && txtContentUpdate.length < max_text){

                    for(let i = 0; i < taskList.length; i++){

                        if(this.dataset.taskId == taskList[i].taskId){

                            taskList[i].taskContent = txtContentUpdate;
                            taskList[i].taskPriority = drpPriority;

                            break;
                        }

                    } 

                    RefreshList();

                } else {
                    window.alert("Please use the minimum length (0) and the maximum length (200).");
                }

            }

        });

        //  Cancels the changes.
        let btnCancelChanges = document.createElement("button");
        btnCancelChanges.textContent = "Cancel";
        btnCancelChanges.id = "btnCancelChanges" + task.taskId;
        btnCancelChanges.dataset.taskId = task.taskId;
        btnCancelChanges.className = "cancelButton";

        //  The click event for the cancel changes button.
        btnCancelChanges.addEventListener("click", function(){
            RefreshList();
        });

        //  ======================================

        editFormRoot.appendChild(fieldsetContent);
        editFormRoot.appendChild(fieldsetPriority);
        editFormRoot.appendChild(btnSaveChanges);
        editFormRoot.appendChild(btnCancelChanges);

        document.getElementById(this.dataset.taskId).appendChild(editFormRoot);

        //  Removes edit button so that the user isn't able to add another form.
        this.remove();

    });


    //  A small container for the buttons.
    let taskButtonsContainer = document.createElement("div");
    taskButtonsContainer.appendChild(btnComplete);
    taskButtonsContainer.appendChild(btnDelete);
    taskButtonsContainer.appendChild(btnEdit);

    //  Append items to the task item root.
    taskItemRoot.appendChild(taskItemContent);
    taskItemRoot.appendChild(taskPriorityBadge);
    taskItemRoot.appendChild(taskStatus);
    taskItemRoot.appendChild(taskButtonsContainer);

    return taskItemRoot;

}

//  Displays the task items.
function DisplayTasks(){

    if(taskList.length > 0){

        for(let i = 0; i < taskList.length; i++){
            let generatedTask = GenerateTaskHTML(taskList[i]);
            document.getElementById("taskContainer").appendChild(generatedTask);
        }

    }

}

//  Gets the user input.
function GetUserInput(){

    //  The task content.
    let txtTaskContent = document.getElementById("txtTask").value;

    //  The task priority.
    let taskPriority = 1;

    //  Checks the priority of radio buttons checked and assigns a priority value.
    if(document.getElementById("rdoLowPriority").checked == true){
        taskPriority = 1;
    }

    if(document.getElementById("rdoMediumPriority").checked == true){
        taskPriority = 2;
    }

    if(document.getElementById("rdoHighPriority").checked == true){
        taskPriority = 3;
    }

    //  Check to see if there is a value in txtTaskContent.
    if(txtTaskContent.length > min_text && txtTaskContent.length < max_text){

        let taskId = "ti" + taskList.length;

        let task = new TaskItem(
            taskId,
            txtTaskContent,
            taskPriority,
            false
        );

        taskList.push(task);

        //  Refresh the list..
        document.getElementById("taskContainer").remove();

        let taskContainer = document.createElement("div");
        taskContainer.id = "taskContainer";

        document.getElementById("taskList").appendChild(taskContainer);

        DisplayTasks();
        
    } else {
        window.alert("Please use the minimum length (0) and the maximum length (200).");
    }

}

//  The start up.
function startTodo(){

    //  Create a dummy task.
    var dummyTask = new TaskItem(
        "ti0",
        "Dummy Task 1",
        lowPriority,
        false
    );

    var dummyTask2 = new TaskItem(
        "ti1",
        "Dummy Task 2",
        mediumPriority,
        false
    );

    var dummyTask3 = new TaskItem(
        "ti3",
        "Dummy Task 3",
        highPriority,
        true
    );

    //  Add the dummy task.
    taskList.push(dummyTask);
    taskList.push(dummyTask2);
    taskList.push(dummyTask3);

    DisplayTasks();

    document.getElementById("btnSubmit").addEventListener("click", function(e){

        //  Prevents the form from trying to submit to a server.
        e.preventDefault();

        if(taskList.length > 20){
            window.alert("Can only have 20 todos at a time.");
        } else {
            //  Get what the user entered in the form.
            GetUserInput();
        }

    });

    //  todo: add the sort.

    //  Sort by high priority.
    document.getElementById("btnHighLow").addEventListener("click", function(){

        let highPriorityTasks = [];
        let mediumPriorityTasks = [];
        let lowPriorityTasks = [];

        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].taskPriority == highPriority){
                highPriorityTasks.push(taskList[i]);
            }
        }

        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].taskPriority == mediumPriority){
                mediumPriorityTasks.push(taskList[i]);
            }
        }

        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].taskPriority == lowPriority){
                lowPriorityTasks.push(taskList[i]);
            }
        }

        //  this could be the point of error.
        let sortedHighLow = highPriorityTasks.concat(mediumPriorityTasks, lowPriorityTasks);

        document.getElementById("taskContainer").remove();

        let taskContainer = document.createElement("div");
        taskContainer.id = "taskContainer";

        document.getElementById("taskList").appendChild(taskContainer);

        for(let i = 0; i < sortedHighLow.length; i++){
            let generatedTask = GenerateTaskHTML(sortedHighLow[i]);
            document.getElementById("taskContainer").appendChild(generatedTask);
        }


    });

    //  Sort by low priority.
    document.getElementById("btnLowHigh").addEventListener("click", function(){

        let highPriorityTasks = [];
        let mediumPriorityTasks = [];
        let lowPriorityTasks = [];

        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].taskPriority == highPriority){
                highPriorityTasks.push(taskList[i]);
            }
        }

        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].taskPriority == mediumPriority){
                mediumPriorityTasks.push(taskList[i]);
            }
        }

        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].taskPriority == lowPriority){
                lowPriorityTasks.push(taskList[i]);
            }
        }

        let sortedLowHigh = lowPriorityTasks.concat(mediumPriorityTasks, highPriorityTasks);

        document.getElementById("taskContainer").remove();

        let taskContainer = document.createElement("div");
        taskContainer.id = "taskContainer";

        document.getElementById("taskList").appendChild(taskContainer);

        for(let i = 0; i < sortedLowHigh.length; i++){
            let generatedTask = GenerateTaskHTML(sortedLowHigh[i]);
            document.getElementById("taskContainer").appendChild(generatedTask);
        }

    });

    //  Sort by complete.
    document.getElementById("btnSortComplete").addEventListener("click", function(){

        let completedItems = [];
        let incompleteItems = [];

        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].taskStatus == true){
                completedItems.push(taskList[i]);
            }
        }

        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].taskStatus == false){
                incompleteItems.push(taskList[i]);
            }
        }

        let sortComplete = completedItems.concat(incompleteItems);

        document.getElementById("taskContainer").remove();

        let taskContainer = document.createElement("div");
        taskContainer.id = "taskContainer";

        document.getElementById("taskList").appendChild(taskContainer);

        for(let i = 0; i < sortComplete.length; i++){
            let generatedTask = GenerateTaskHTML(sortComplete[i]);
            document.getElementById("taskContainer").appendChild(generatedTask);
        }


    });

    //  Sort by incomplete.
    document.getElementById("btnSortIncomplete").addEventListener("click", function(){

        let completedItems = [];
        let incompleteItems = [];

        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].taskStatus == true){
                completedItems.push(taskList[i]);
            }
        }

        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].taskStatus == false){
                incompleteItems.push(taskList[i]);
            }
        }

        let sortIncomplete = incompleteItems.concat(completedItems);

        document.getElementById("taskContainer").remove();

        let taskContainer = document.createElement("div");
        taskContainer.id = "taskContainer";

        document.getElementById("taskList").appendChild(taskContainer);

        for(let i = 0; i < sortIncomplete.length; i++){
            let generatedTask = GenerateTaskHTML(sortIncomplete[i]);
            document.getElementById("taskContainer").appendChild(generatedTask);
        }

    });

}

startTodo();
