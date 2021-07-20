// This is a JavaScript programme to run  a simple web Server 
var express = require("express");
var app = express();
app.set('view engine', 'ejs');

// Child Process
const { exec } = require('child_process');

// Body Parser - To clean up the service
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

// Importing the questions and right answers
var data = require('./questions/data.json');
var questions = Object.keys(data);
var correct_answers  = Object.values(data);
// Stripping and lower casing the Correct Answers
var stripped_correct_answers = correct_answers.map((value)=>{return value.toLowerCase()});



// Check Answers Function 
function CheckAnswers (y_true, y_pred){
    var result = [];
    var score = 0;
for (i=0; i<y_true.length; i=i+1){
	if (y_true[i] == y_pred[i]) {
  result.push("right");
  score = score+1;
}
  else {
  result.push("wrong")
  };
  
};
	return [result, score]
}
// Creating a Save File
function Save_Data(dates, stripped_correct_answers, stripped_user_answers, score) {
    save_file = {};
    save_file["dates"] =  dates;
    save_file["RightAnswers"] = stripped_correct_answers;
    save_file["UserAnswers"] = stripped_user_answers;
    save_file["score"] = score;
    save_file["timestamp"] = new Date().toLocaleString();
    json_save_file = JSON.stringify(save_file);
    return json_save_file
    }

// Save Results Function
var fs = require('fs');
function Write_Data(JSON_save_file, file_name, save_location = 'data/'){
    var save_path = save_location+file_name+".json";
    fs.writeFile(save_path, JSON_save_file, (err)=>{console.log(err)});
};

// Read Questions Function 

var readJson = (path, cb) => {
  fs.readFile(require.resolve(path), (err, data) => {
    if (err)
      cb(err)
    else
      cb(null, JSON.parse(data))
  });
};

// Web Application 
app.use('/index', (req, res)=>{
    exec('python Quiz.py');
    // Importing the questions and right answers
    data_temp = fs.readFileSync('./questions/data.json');
    data = JSON.parse(data_temp);
    questions = Object.keys(data);
    correct_answers  = Object.values(data);
    // Stripping and lower casing the Correct Answers
    stripped_correct_answers = correct_answers.map((value)=>{return value.toLowerCase()});
    res.render("QuizHomeNew", {questions:questions});
});


app.use('/answers', (req, res)=>{
    
    var body = req.body;
    var user_answers = Object.values(body);
    var stripped_user_answers = user_answers.map((value)=>{return value.toLowerCase()});
    var Checks = CheckAnswers(stripped_correct_answers, stripped_user_answers);
    var results = Checks[0];
    var score = Checks[1];

    save_file_json = Save_Data(questions, stripped_correct_answers, stripped_user_answers, score);
    var TimeNow = (new Date()).getTime();
    Write_Data(save_file_json, TimeNow);
    res.render('Answers.ejs', {user_answers:user_answers, result:results, test_score:score, correct_answers:correct_answers});

});

app.listen(4000, (req, res)=>{
    console.log("Listening on port 4000 .....");
    
});