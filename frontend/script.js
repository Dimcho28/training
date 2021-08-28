const request = (path, type, success, data) => {
    $.ajax({
        url:`http://localhost:3000/${path}`,
        type: type,
        dataType: "json",
        data: JSON.stringify(data),
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        contentType: "application/json",
        success: success,
        error: () => {
            console.log("Somting went wrong");
        }
    });
};

const getWords = () =>{
    request ("getWords", "GET", (results) => {
        const delS = document.getElementById("del_words");
        delS.innerHTML="";
        for(const result of results){
            delS.innerHTML+=`<option value="${result.id}">${result.EN}-${result.BG}</option>`
        }
    });
};

const addWord = () =>{
    const add_en = document.getElementById("add_en").value;
    const add_bg = document.getElementById("add_bg").value;
    clear()
    request ("addWord", "POST", () => {
        getWords();
    }, {
        EN: add_en,
        BG: add_bg
    });
};

const delWord = () => {
    const del = document.getElementById("del_words").value;
    clear()
    request ("deleteWord", "POST", () => {
        getWords();
    }, {
        id: del
    });
};

const clear = () => {
    document.getElementById("en").value="";
    document.getElementById("bg").value="";
    document.getElementById("add_en").value=""
    document.getElementById("add_bg").value=""
};

const rollEn = () => {
    clear();
    request ("roll", "GET", (res) =>{
        document.getElementById("en").value=res.EN;
    }, {});
};

const rollBg = () => {
    clear();
    request ("roll", "GET", (res) =>{
        document.getElementById("bg").value=res.BG;
    }, {});
};

const submit = () => {
    const en = document.getElementById("en").value;
    const bg = document.getElementById("bg").value;
    request ("compare", "POST", (res) =>{
        if(res.length > 0){
            document.getElementById("result").innerHTML="Vqrno"
        }else{
            document.getElementById("result").innerHTML="Greshno"
        }
    },{
        BG: bg,
        EN: en
    })
};