var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/',function(req,res,next){
    res.render('index',{title:'API Search Engine'});
});
router.post('/queryApis', function(req,res){
    var db = req.db;
    var collection = db.get('apis');
    var info = createDictionary(req,'apis');
    collection.find(info, {}, function(err, docs){
    res.render('Results',{"queryRes":docs,title:'API Results'});
       
    });
});
router.post('/queryMashup', function(req,res){
    var db = req.db;
    var collection = db.get('mashup');
    var info = createDictionary(req,'mashup');
   
    collection.find(info, {}, function(err, docs){
    res.render('Results',{"queryRes":docs,title:'MashUp Results'});
       
    });
});
function createDictionary(req, type) {
    if(req.body.keyword){
            var keyList = ["title","summary","description"];
            var input = [req.body.keyword];
            var dict = {};
    }
    else if(type === 'apis') {
        var dict = {}; 
        var keyList = ["dateModified","protocols","category","Tags"];
        var input = [req.body.year,req.body.protocol,req.body.category,req.body.Tags];
        if(req.body.rating) {
            var choice = req.body.choice;
            var rate = req.body.rating;
            var rating = [];
                if(choice === "="){
                    rating.push("$eq");
                } else if(choice === ">=") {
                    rating.push("$gte");
                } else {
                    rating.push("$lte");
                }


            var data = {};
            data[rating[0]] = rate;
            dict["rating"] = data;
        }
    }
    else if(type === 'mashup') {
            var keyList = ["dateModified","APIs","tags"];
            var input = [req.body.year,req.body.apis,req.body.Tags];
            var dict = {}; 
    }
        var index = 0;
        for(var item in input){
            var data = [input[item]];

            if(data[0]){
                dict[keyList[index]] = {$regex : data[0], $options : 'i'};  
            }
            index++;
        }
    return dict;
};

//    console.log(protocol);
//    console.log("year = ", year);

//router.post('/', function (req, res) {
//    console.log(req.body.title);
//    console.log(req.body.description);
//    res.send('Post page');
//});

module.exports = router;
