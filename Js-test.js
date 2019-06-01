
let originElelist = document.querySelectorAll("#table span");
let eleList = new Array(9);

function pushNumList(index, ...rest) {
    eleList[index] = [];
    rest.forEach(function (i) {
        eleList[index].push(originElelist[i])
        //表格可编辑
        originElelist[i].setAttribute("contenteditable", "true");
    })
}

let rowV32 = {
    1 : "00,01,02+10,11,12+20,21,22",
    2 : "03,04,05+13,14,15+23,24,25",
    3 : "06,07,08+16,17,18+26,27,28",

    4 : "30,31,32+40,41,42+50,51,52",
    5 : "33,34,35+43,44,45+53,54,55",
    6 : "36,37,38+46,47,48+56,56,58",

    7 : "60,61,62+70,71,72+80,81,82",
    8 : "63,64,65+73,74,75+83,84,85",
    9 : "66,67,68+76,77,78+86,87,88"
}




pushNumList(0, 0,1,2,9,10,11,18,19,20);
pushNumList(1, 3,4,5,12,13,14,21,22,23);
pushNumList(2, 6,7,8,15,16,17,24,25,26);
pushNumList(3, 27,28,29,36,37,38,45,46,47);
pushNumList(4, 30,31,32,39,40,41,48,49,50);
pushNumList(5, 33,34,35,42,43,44,51,52,53);
pushNumList(6, 54,55,56,63,64,65,72,73,74);
pushNumList(7, 57,58,59,66,67,68,75,76,77);
pushNumList(8, 60,61,62,69,70,71,78,79,80);

let n19 = ["1","2","3","4","5","6","7","8","9"];

function createNine () {
    return ["1","2","3","4","5","6","7","8","9"];
}

function comparePoint (listA, listB) {
    let n19 = createNine();
    let listAB = listB ? listA.concat(listB) : listA;
    for (let i = 0; i < listAB.length; i ++) {
        if (n19.indexOf(listAB[i]) !== -1) {
            n19.splice(n19.indexOf(listAB[i]), 1);
        }
    }
    return n19;
}




function fx (n) {
    return (n.toString().split("").map(function (n) {
        return +n;
    }));
}


xxxxnumList = [
    ["1", "2", "3",       "4", "5", "6",          "7", "8", ""],
    ["2", "", "",       "", "", "",          "", "", ""],
    ["3", "",  "",      "", "", "",          "", "", ""],

    ["4", "", "",       "", "", "",          "", "", ""],
    ["5", "", "",       "", "", "",          "", "", ""],
    ["6", "", "",       "", "", "",          "", "", ""],

    ["7", "", "",       "", "", "",          "", "", ""],
    ["8", "", "",       "", "", "",          "", "", ""],
    ["", "", "",       "", "", "",          "", "", ""],
];



function initCube () {
    for (let i = 0; i < 9; i++) {
        numList[i] = [];
        for (let j = 0; j < 9; j++) {
            numList[i].push({
                // 0 代表天选之子！
                0 : "",
                // 候选列表
                1 : 0,
                2 : 0,
                3 : 0,
                4 : 0,
                5 : 0,
                6 : 0,
                7 : 0,
                8 : 0,
                9 : 0,

                refresh : function () {

                },

                test : function () {
                    
                    let max = 0, index;
                    for (let i = 1; i <= 9; i++) {
                        if (this[i] > max) {
                            max = this[i];
                            index = i;
                        }
                    }
                    return [index, max];
                   
                }
            })
        }
    }
}

let numList = new Array(9);

//载入时初始化数据----------------
initCube();

function exchangeValue (obj, strNum, base) {
    let d = base / (base * strNum.length);
    for (let i of strNum) {
        obj[i] += d
    }
}


function onlondCube(x, y, strNum, base) {

    exchangeValue(numList[x][y], strNum, base);
}

document.querySelector("#gogogo").addEventListener("click", function() {

    let tmp;

    //横竖
    

    for (let i = 0; i < 9; i++) {

        let rowList = [];

        for (let r = 0; r < 9; r ++) {
            if (numList[i][r][0] !== "") {
                rowList.push(numList[i][r][0])
            }
        }

        
        //横向遍历
        for (let c = 0; c < 9; c++) {

            let colList = [];
           
            if (numList[i][c][0] === "") {
                for (let j = 0; j < 9; j++) {
                    if (numList[j][c][0] !== "") {
                        colList.push(numList[j][c][0]);
                    }
                }
            }

            if (numList[i][c][0] === "") {
                tmp = comparePoint(rowList, colList).join("");
                onlondCube(i, c, tmp, 9);
            }
        }
    }

    

    //第一行
    simpleNine(0, 2, 0, 2);
    simpleNine(3, 5, 0, 2);
    simpleNine(6, 8, 0, 2);
   
    //第二行
    simpleNine(0, 2, 3, 5);
    simpleNine(3, 5, 3, 5);
    simpleNine(6, 8, 3, 5);
    //第三行
    simpleNine(0, 2, 6, 8);
    simpleNine(3, 5, 6, 8);
    simpleNine(6, 8, 6, 8);



    //交叉打分
    /*

    let vtmp;

    for (let i = 1; i <= 9; i++) {
        vtmp  = rowV32(i).split("+"); //3个数组
        for (let j = 0; j < 3; j++) {
            let tt = vtmp[j].split(",");
            for (let k = 0; k < 3; k++) {
                if (tt[k])
            }
        }
    }
    */



















},false);

















document.querySelector("#testShow").onclick = function () {
    for (let i = 0; i < 9; i ++) {
        for (let j = 0; j < 9; j ++) {
            if (numList[i][j][0] === "") {
                eleList[i][j].innerText = numList[i][j].test()[0];
                eleList[i][j].title = numList[i][j].test()[1];
                eleList[i][j].style.color = "blue";
            } else {
                eleList[i][j].innerText = numList[i][j][0];
            }
        }
    }
}



function simpleNine (rowStart, rowEnd, colStart, colEnd) {

    
    let nineList = [];

    for (let i = rowStart; i <= rowEnd; i++) {
        for (let j = colStart; j <= colEnd; j++) {
            if (numList[j][i][0] !== "") {
                nineList.push(numList[j][i][0])
            }
        }
    }


    let tmp = nineList.length ? comparePoint(nineList).join("") : false;

    if(tmp) {

        for (let i = rowStart; i <= rowEnd; i++) {
            for (let j = colStart; j <= colEnd; j++) {
                if (numList[j][i][0] === "") {
                    onlondCube(j, i, tmp, 9);
                }
            }
        }
    }
}

function foo(rowStart, rowEnd, colStart, colEnd) {

    for (let i = rowStart; i <= rowEnd; i++) {
        for (let j = colStart; j <= colEnd; j++) {
            log(j + " : " + i)
        }
    }
}

document.querySelector("#onloadAndSaveTemplate").onclick = function () {
    let tmp = new Array(9);
    for (let i = 0; i < eleList.length; i++) {
        tmp[i] = [];
        for (let j = 0; j < eleList[i].length; j++) {
            numList[i][j][0] = eleList[i][j].innerText;
            tmp[i].push(eleList[i][j].innerText);
        }
    }

    console.log(tmp);

    let fileId = document.querySelector("#fileId").value;

    if (templateData.data[fileId]) {

        alert("文件ID已存在")

    } else {

        templateData.data[fileId] = tmp;
        saveData(templateData);

        alert("保存文件成功")

    }

}




function saveData() {
    if (window.localStorage) {
        localStorage.setItem("templateData", JSON.stringify(templateData))
    } else {
        console.error("存储数据失败 程序未找到 window.localStorage")
    }
}


let templateData = JSON.parse(localStorage.getItem("templateData"));

if (templateData === null) {

    templateData = {
        data : {}
    }

}

function onloadTemplate() {

    let fileId = document.querySelector("#fileId").value;

    let tmpfile = templateData.data[fileId];

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            numList[i][j][0] = tmpfile[i][j];
            if (numList[i][j][0] !== undefined) {
                eleList[i][j].innerText = numList[i][j][0];
            }
        }
    }
}

//读入模版
document.querySelector("#onload").onclick = function () {
    onloadTemplate();
}


