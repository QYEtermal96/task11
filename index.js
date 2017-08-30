var readlineSync = require('readline-sync');

function printOption() {
    console.log("1. 添加学生");
    console.log("2. 生成成绩单");
    console.log("3. 退出");
    var answer = readlineSync.question('请输入你的选择 :');
    return answer;
}
var answer = printOption();
var result = [];

function getOneStudentInformation() {
    var score = [];
    var student = readlineSync.question("请输入要打印的学生信息（格式 ：姓名，学号，班级，数学成绩，语文成绩，英语成绩，编程）,按回车提交:\n");
    score = student.split(",");
    for (; score.length !== 7;) {
        var student = readlineSync.question("请按正确格式输入要打印的学生信息（格式 ：姓名，学号，班级，数学成绩，语文成绩，英语成绩，编程）,按回车提交:\n");
        score = student.split(",");
    }
    return score;
}

function getStudentObject(score) {
    var stu = {};
    stu.name = score[0];
    stu.id = score[1];
    stu.clazz = score[2];
    stu.math = score[3];
    stu.chinese = score[4];
    stu.english = score[5];
    stu.program = score[6];
    return stu;
}

function addStudent() {
    var score = getOneStudentInformation();
    var stu = getStudentObject(score);
    return stu;
}

function selectArrayById() {
    var res = []
    var selectId = readlineSync.question("请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：\n");
    var arrayId = selectId.split(",");
    arrayId.forEach((e) => {
        for (var value of result) {
            if (e === value.id) {
                res.push(value);
            }
        }
    })
    return res;
}

function printSelectStudent(value) {
    var amount = parseInt(value.math) + parseInt(value.chinese) + parseInt(value.english) + parseInt(value.program);
    console.log(value.name + "|" + value.math + "|" + value.chinese + "|" + value.english + "|" + value.program + "|" + (amount / 4) + "|" + amount);
}

function printResArray(res) {
    console.log("成绩单：\n");
    console.log("姓名|数学|语文|英语|编程|平均分|总分");
    console.log("========================");
    for (var value of res) {
        printSelectStudent(value);
    }
    console.log("========================");
}

function computeScore() {
    var sum = 0;
    var scoreArray = []
    result.forEach((e) => {
        e.amountScore = parseInt(e.math) + parseInt(e.chinese) + parseInt(e.english) + parseInt(e.program);
        sum += e.amountScore;
        scoreArray.push(e.amountScore);
    })
    return {sum, scoreArray};
}

function printMedian() {
    scoreArray.sort((a, b) => {
        return a - b;
    })
    var string = "全班总分中位数：";
    if (scoreArray.length % 2 === 0) {
        var i = scoreArray.length / 2 - 1;
        string += (scoreArray[i] + scoreArray[i + 1]) / 2;
    } else {
        var i = (scoreArray.length - 1) / 2;
        string += scoreArray[i];
    }
    console.log(string);
}

for(;answer !== "3";){
    if(answer === "1"){
        var stu = addStudent();
        result.push(stu);
        console.log("学生" + stu.name + "的成绩被添加")
    }
    if(answer === "2"){
        var res = selectArrayById();
        printResArray(res);
        var {sum, scoreArray} = computeScore();
        console.log("全班总分平均数："+ sum/result.length);
        printMedian();
    }
    answer = printOption();
}