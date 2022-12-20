
async function taskDone(taskId) {
    await fetch('http://localhost:3006/done', {
        method: 'POST',
        body: `taskId=${taskId}`,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    if(window.getComputedStyle(document.getElementById('id' + taskId + 'span')).textDecoration.includes('line-through')) {
        document.getElementById('id' + taskId + 'span').setAttribute("style", "text-decoration: none");
    }
    else {
        document.getElementById('id' + taskId + 'span').setAttribute("style", "text-decoration: line-through");
    }
    toggleRows();
    return;
}

async function deleteTask(taskId) {
    event.stopPropagation();
    await fetch('http://localhost:3006/delete', {
        method: 'POST',
        body: `taskId=${taskId}`,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    document.getElementById('id' + taskId).remove();
    return;
}

function toggleRows() {
    let listElements = document.getElementById("taskList").getElementsByTagName("li");
    Array.from(listElements).forEach(function(element) { // https://www.geeksforgeeks.org/htmlcollection-for-loop/
        if(document.getElementById('checkbox').checked) {
            if(element.getElementsByTagName('span')[0]['style']['textDecoration'] == 'line-through') {
                element['style']['display'] = 'none';
            }
        }
        else {
            element['style']['display'] = 'flex';
        }
        
    });
}