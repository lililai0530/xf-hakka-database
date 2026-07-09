let data = [];

let filteredData = [];

let currentPage = 1;

const pageSize = 20;


let tableBody;
let initialSelect;
let finalSelect;
let toneSelect;
let charSearch;
let pageInfo;




// 加载JSON
fetch("data/syllables.json")

.then(response=>response.json())

.then(result=>{

    data=result.map((item,index)=>{

        return {
            ...item,
            "编号": index + 1
        };

    });

    filteredData=data;

    createOptions();

    render();

})

.catch(error=>{

    alert("JSON加载失败，请检查文件路径");

    console.log(error);

});




// 创建筛选选项

function createOptions(){


let initials =
[...new Set(data.map(item=>item["声母"]))];


let finals =
[...new Set(data.map(item=>item["韵母"]))];


let tones =
[...new Set(data.map(item=>item["声调"]))];



initials.forEach(i=>{

    let option=document.createElement("option");

    option.value=i;

    option.textContent=i;

    initialSelect.appendChild(option);

});



finals.forEach(i=>{

    let option=document.createElement("option");

    option.value=i;

    option.textContent=i;

    finalSelect.appendChild(option);

});



tones.forEach(i=>{

    let option=document.createElement("option");

    option.value=i;

    option.textContent=i;

    toneSelect.appendChild(option);

});


}




// 查询

function searchData(){


let keyword = charSearch.value.trim();


filteredData = data.filter(item=>{


let matchInitial =
initialSelect.value === "" ||
String(item["声母"]).trim() === String(initialSelect.value).trim();


let matchFinal =
finalSelect.value === "" ||
String(item["韵母"]).trim() === String(finalSelect.value).trim();


let matchTone =
toneSelect.value === "" ||
String(item["声调"]).trim() === String(toneSelect.value).trim();


let matchCharacter =
keyword === "" ||
item["例字"].includes(keyword);



return (
    matchInitial &&
    matchFinal &&
    matchTone &&
    matchCharacter
);


});


currentPage = 1;

render();

}



// 声母、韵母、声调改变时自动查询

document.getElementById("initialSelect")
.addEventListener("change", searchData);


document.getElementById("finalSelect")
.addEventListener("change", searchData);


document.getElementById("toneSelect")
.addEventListener("change", searchData);


document.getElementById("charSearch")
.addEventListener("input", searchData);




// 渲染表格

function render(){


tableBody.innerHTML="";


let start =
(currentPage-1)*pageSize;


let end =
start+pageSize;


let pageData =
filteredData.slice(start,end);



pageData.forEach((item,index)=>{


let audioNumber =
String(item["编号"]).padStart(3,"0");



let row=document.createElement("tr");


row.innerHTML=`

<td>${audioNumber}</td>

<td>${item["声母"]}</td>

<td>${item["韵母"]}</td>

<td>${item["声调"]}</td>

<td>${item["例字"]}</td>

<td>${item["注释"]}</td>

<td>

<audio controls>

<source src="audio/${audioNumber}.mp3">

</audio>

</td>

`;



tableBody.appendChild(row);


});



let totalPages =
Math.ceil(filteredData.length/pageSize);


pageInfo.textContent =
`${currentPage} / ${totalPages} 页`;



}




// 翻页

document
.getElementById("prevBtn")
.onclick=function(){


if(currentPage>1){

currentPage--;

render();

}

};



document
.getElementById("nextBtn")
.onclick=function(){


let totalPages =
Math.ceil(filteredData.length/pageSize);


if(currentPage<totalPages){

currentPage++;

render();

}

};
document.addEventListener("DOMContentLoaded", function(){

    tableBody = document.getElementById("tableBody");

    initialSelect = document.getElementById("initialSelect");

    finalSelect = document.getElementById("finalSelect");

    toneSelect = document.getElementById("toneSelect");

    charSearch = document.getElementById("charSearch");

    pageInfo = document.getElementById("pageInfo");

});