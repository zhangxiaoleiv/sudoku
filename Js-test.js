
let originElelist = document.querySelectorAll("#table span");
let eleList = new Array(9);
let log = console.log;

function pushNumList(index, ...rest) {
    eleList[index] = [];
    rest.forEach(function (i) {
        eleList[index].push(originElelist[i])
        //表格可编辑
        originElelist[i].setAttribute("contenteditable", "true");
    })
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


function initCube () {
    for (let i = 0; i < 9; i++) {

        numList[i] = [];

        for (let j = 0; j < 9; j++) {

            if (j === 2 || j === 5 || j === 8) {
                eleList[i][j].style.borderRight="1px solid #BBB"
            }

            if (i === 2 || i === 5 || i === 8) {
                eleList[i][j].style.borderBottom="1px solid #BBB"
            }

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
                ele : eleList[i][j],
            })
        }
    }
}

let numList = new Array(9);

initCube();

let num3RowLIst = [];

for (let i = 0; i < 9; i++) {
    let tmp3 = [];
    for (let j = 0; j < 9; j++) {
        tmp3.push(numList[i][j]);
        if (tmp3.length === 3) {
            num3RowLIst.push(tmp3);
            tmp3 = [];
        }
    }
}


//载入时初始化数据----------------


function exchangeValue (obj, strNum, base) {
    let d = base / (base * strNum.length);
    for (let i of strNum) {
        obj[i] += d
    }
}


function onlondCube(x, y, strNum, base) {

    exchangeValue(numList[x][y], strNum, base);
}

function compute() {
    readTable();
   computeRowCol();
   computeNine();
   computeThree();
}


function computeRowCol () {
    
    let tmp;
    
    for (let i = 0; i < 9; i++) {

        let rowList = [];

        for (let r = 0; r < 9; r ++) {

            if (numList[i][r][0] !== "") {

                rowList.push(numList[i][r][0])

                let t = numList[i][r][0];
                //当t为一个数字的时候
                for (let ri = 0; ri < 9; ri ++) {
                    numList[i][ri][t] = NaN;
                }
            } 
        }

        
        //纵向
        for (let c = 0; c < 9; c++) {

            let colList = [];
           
            if (numList[i][c][0] === "") {
                //横向
                for (let j = 0; j < 9; j++) {

                    if (numList[j][c][0] !== "") {

                        colList.push(numList[j][c][0]);

                        let t = numList[j][c][0];

                        for (let ri = 0; ri < 9; ri ++) {
                            numList[ri][c][t] = NaN;
                        }

                    }
                }
            }
    
            if (numList[i][c][0] === "") {
                tmp = comparePoint(rowList, colList).join("");
                onlondCube(i, c, tmp, 9);
            }
        }
    }
};

function computeNine () {
     //rowCube1
     simpleNine(0, 2, 0, 2);
     simpleNine(3, 5, 0, 2);
     simpleNine(6, 8, 0, 2);
     //rowCube2
     simpleNine(0, 2, 3, 5);
     simpleNine(3, 5, 3, 5);
     simpleNine(6, 8, 3, 5);
     //rowCube3
     simpleNine(0, 2, 6, 8);
     simpleNine(3, 5, 6, 8);
     simpleNine(6, 8, 6, 8);
 
}

function computeThree () {
    //row1
    search3(0, 4, 5, 7, 8);
    search3(1, 3, 5, 6, 8);
    search3(2, 3, 4, 6, 7);
    //row2
    search3(3, 1, 2, 7, 8);
    search3(4, 0, 2, 6, 8);
    search3(5, 0, 1, 6, 7);
    //row3
    search3(6, 1, 2, 4, 5);
    search3(7, 0, 2, 3, 5);
    search3(8, 0, 1, 3, 4);
    //row4
    search3(9, 13, 14, 16, 17);
    search3(10, 12, 14, 15, 17);
    search3(11, 12, 13, 15, 16);
    //row5
    search3(12, 10, 11, 16, 17);
    search3(13, 9, 11, 15, 17);
    search3(14, 9, 10, 15, 16);
    //row6
    search3(15, 10, 11, 13, 14);
    search3(16, 9, 11, 12, 14);
    search3(17, 9, 10, 12, 13);
    //row7
    search3(18, 22, 23, 25, 26);
    search3(19, 21, 23, 24, 26);
    search3(20, 21, 22, 24, 25);
    //row8
    search3(21, 19, 20, 25, 26);
    search3(22, 18, 20, 24, 26);
    search3(23, 18, 19, 24, 25);
    //row9
    search3(24, 19, 20, 22, 23);
    search3(25, 18, 20, 21, 23);
    search3(26, 18, 19, 21, 22);
    
}


//判断对象内打分是否唯一，如果是，返回唯一的值，如果不是，返回false
function onlyOne(objList) {
    let s = 0, index;
    for (let i = 1; i <= 9; i++) {
        if (!(isNaN(objList[i]))) {
            s += 1;
            index = i;
        }
        if (s > 1) { break }
    }
    return s === 1 ? index : false;
}


//检查结果是否合法，是true，否false
function checkResult() {

    let indexR, indexC, rowa, cola, count = 0;

    for (let i = 0; i < 9; i++) {

        rowa = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

        cola = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
       
        for (let j = 0; j < 9; j++) {
            indexR = rowa.indexOf(numList[i][j][0]);
            if (indexR === -1) {
                return false;
            } else {
                if (indexR > -1) {
                    rowa.splice(indexR, 1, undefined);
                }
            }
            indexC = cola.indexOf(numList[j][i][0]);
            if (indexC === -1) {
                return false;
            } else {
                if (indexC > -1) {
                    cola.splice(indexC, 1, undefined);
                }
            }
        }
        if (rowa.every((n) => n === undefined) && cola.every((n) => n === undefined)) {
            count += 1;
        } else {
            return false;
        }
    }
    return count === 9 ? true : false;
}


//计算并处理结果
document.querySelector("#testShow").onclick = function () {

    let stop = 0;

    readTable();

    let tmp;

    while (!checkResult()) {

        stop += 1;

        if (stop > 200) {
            alert ("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
            return;
        }

        compute();

        for (let i = 0; i < 9; i ++) {
            for (let j = 0; j < 9; j ++) {
                tmp = onlyOne(numList[i][j])
                if (tmp && numList[i][j][0] === "") {
                    numList[i][j][0] = tmp + "";
                    eleList[i][j].innerText = tmp;
                    eleList[i][j].style.fontWeight = "bold";
                    eleList[i][j].style.color = "blue";
                }
            }
        }
    }

  


    alert("计算并验证通过！");
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
                } else {
                    //有数字
                    let t = numList[j][i][0];
                    for (let i = rowStart; i <= rowEnd; i++) {
                        for (let j = colStart; j <= colEnd; j++) {
                            numList[j][i][t] = NaN;
                        }
                    }
                }
            }
        }
    }
}


//test
function foo(rowStart, rowEnd, colStart, colEnd) {
    for (let i = rowStart; i <= rowEnd; i++) {
        for (let j = colStart; j <= colEnd; j++) {
            log(j + " : " + i)
        }
    }
}

//读取模版并保存模版
document.querySelector("#onloadAndSaveTemplate").onclick = function () {

    let tmp = new Array(9);

    for (let i = 0; i < eleList.length; i++) {
        tmp[i] = [];
        for (let j = 0; j < eleList[i].length; j++) {
            numList[i][j][0] = eleList[i][j].innerText;
            tmp[i].push(eleList[i][j].innerText);
        }
    }

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

//读取模版
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


function readTable () {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            numList[i][j][0] = eleList[i][j].innerText;
        }
    }
}



//-----------------------------------------------

function tmpFunc (val, arr) {
    for (let i = 1; i <=9; i++) {
        if (i != val) {
            arr[i] = NaN;
        }
    }
}


function seekThree(val, alt, art, alb, arb) {

    let lt = false, rt = false, lb = false, rb = false;

    let vlt = 0, vrt = 0, vlb = 0, vrb = 0;

    for (let i = 0; i < 3; i++) {
        //左上
        if (alt[i][0] === val) {
            lt = true;
        } else if (alt[i][0] === "") {
            vlt += 1;
        }
        //右上
        if (art[i][0] === val) {
            rt = true;
        } else if (art[i][0] === "") {
            vrt += 1;
        }
        //左下
        if (alb[i][0] === val) {
            lb = true;
        } else if (alb[i][0] === "") {
            vlb += 1;
        }
        //右下
        if (arb[i][0] === val) {
            rb = true;
        } else if (arb[i][0] === "") {
            vrb += 1;
        }
    }

    //log(vlt + ":" + vrt + ":" + vlb + ":" + vrb);

    if (lt || rt || lb || rb) {
        
        //左上对右下
        if (lt === true && rb === false) {
            for (let i = 0; i < 3; i++) {
                if (arb[i][0] === "" && vrb === 1) {
                   // arb[i][0] = val;
                    tmpFunc(val, arb[i]);
                } else if (arb[i][0] === "") {
                arb[i][val] += 3 / (3 * vrb);
                }
            }
        }
        //右上对左下
        if (rt === true && lb === false) {
            for (let i = 0; i < 3; i++) {
                if (alb[i][0] === "" && vlb === 1) {
                    //alb[i][0] = val;
                   tmpFunc(val, alb[i]);
                } else if (alb[i][0] === "") {
                alb[i][val] += 3 / (3 * vlb);
                }
            }
        }
        //左下对右上
        if (lb === true && rt === false) {
            for (let i = 0; i < 3; i++) {
                if (art[i][0] === "" && vrt === 1) {
                   // art[i][0] = val;
                   tmpFunc(val, art[i]);
                } else if (art[i][0] === "") {
                art[i][val] += 3 / (3 * vrt);
                }
            }
        }
        //右下对左上
        if (rb === true && lt === false) {
            for (let i = 0; i < 3; i++) {
                if (alt[i][0] === "" && vlt === 1) {
                    //alt[i][0] = val;
                   tmpFunc(val, alt[i]);
                } else if (alt[i][0] === "") {
                alt[i][val] += 3 / (3 * vlt);
                }
            }
        }

    } else {
        search3_s(val, alt, vlt);
        search3_s(val, art, vrt);
        search3_s(val, alb, vlb);
        search3_s(val, arb, vrb);
    }

}


function search3_s (val, arr, empty) {
    arr.forEach(function (obj) {
        if (obj[0] === "") {
            obj[val] += 3 / (3 * empty);
        }
    })
}


function search3 (arrId, ilt, irt, ilb, irb) {
    num3RowLIst[arrId].forEach(function (obj) {
        if (obj[0] !== "") {
            seekThree(obj[0], num3RowLIst[ilt], num3RowLIst[irt], num3RowLIst[ilb], num3RowLIst[irb])
        }      
    })
}

document.querySelector("#gogogo").onclick = function () {
    compute();
    for (let i = 0; i < 9; i ++) {
        for (let j = 0; j < 9; j ++) {
            tmp = onlyOne(numList[i][j])
            if (tmp && numList[i][j][0] === "") {
                numList[i][j][0] = tmp + "";
                eleList[i][j].innerText = tmp;
                eleList[i][j].style.fontWeight = "bold";
                eleList[i][j].style.color = "blue";
            }
        }
    }
    console.log("调试运行")
}




