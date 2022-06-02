const getHistory = () => {
    let history = window.localStorage.getItem("history");
    try{
        history = JSON.parse(history);
    }catch{
        history = [];
        window.localStorage.setItem("history","[]");
    }
    if(!history) {
        history = [];
    }

    return history;
}
const addToHistory = (name) => {
    let history;
    if(name == "New_Article") return;
    try{
        history = JSON.parse(window.localStorage.getItem("history"));
        let index = history.indexOf(name);
        if(index > -1)
        {history.splice(index, 1)};
    }catch{
        history = [];
    }
        history.unshift(name)
        window.localStorage.setItem("history", JSON.stringify(history));
}

export {addToHistory, getHistory}