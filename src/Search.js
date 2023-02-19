const Data = require("./Data.json");

const fulldata = Data.MAIN_DATA;
const searchMapping = Data.SEARCH_MAPPING;
const nameIdMapping = Data.NAME_ID_MAPPING;


function markFalse(data, id) {
    for (let ele of data.children) {
        if (ele.id == id) {
            ele._collapsed = false;
        }
        if (ele.children) {
            markFalse(ele, id)
        }
    }
}

// helper function for markCollapsed 
function helperMarkCollapsed(id) {
    // a single id is passed here
    const temp = String(id);
    let data;
    // to get the ids to be marked as collapsed = false in data
    for (let element in searchMapping) {
        if (element == temp) {
            data = searchMapping[element]
            break
        }
    }
    data = data.split(",")
    // data => contains all the ids to be marked as false [1,2,3] --> this form
    for (let ele of data) {
        markFalse(fulldata, ele)
    }

}

// function to all the ids of the node
function markCollapsed(allIds) {
    // run for each particular id
    for (let ele of allIds) {
        helperMarkCollapsed(ele);
    }
}

//Main Search function
function search(name) {
    let allIds;
    let flag = true;
    // get the all the id of the given Name
    for (let ele in nameIdMapping) {
        if (ele == name) {
            allIds = nameIdMapping[ele];
            flag = false
            break
        }
    }
    if (flag) {
        return "NOT FOUND"
    }
    markCollapsed(allIds);
}

export default fulldata