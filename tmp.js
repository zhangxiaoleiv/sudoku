/*
function guess(not, move) {

    if (checkResult()) {
        alert("成功！")

    } else if (!(isOk() && (!move))) {
        goBack(move);
        return not;

    } else {
        //获取一个最大值
        let max = getMax(not);
        //设定
        setItem(max);
        //打分初始
        setZero();
        //move如果为空，说明没有进展
        let move = compute();
        let tmp = guess(not, move);
        if (Array.isArray(tmp)) {
            log("isArray")
            guess(tmp);
        }
    }
}
*/

/*
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
log(numList);
*/