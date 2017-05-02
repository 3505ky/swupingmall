module.exports = function(app,fs)
{
  //키보드
  app.get('/keyboard', function(req, res){
        fs.readFile( "./data/" + "keyboard.json", 'utf8', function (err, data) {
           console.log(data);
           res.end(data);
        });
    });
    // 메시지
  	app.post('/message', function(req, res){
  		var result = {  };

  		// CHECK REQ VALIDITY/
          if(!req.body["user_key"] || !req.body["type"] || !req.body["content"]){
              result["success"] = 0;
              result["error"] = "invalid request";
              res.json(result);
              return;
          }

          if(req.body["content"] == "사용법" || req.body["content"] == "고고") {
            fs.readFile("./data/"+"message.json",'utf8', function(err,data){
              var messages = JSON.parse(data);
              console.log(data);

              if(req.body["content"] == "사용법"){
                messages["message"] = {"text" : "언제든지 \"고고\"를 외쳐주시면 고객센터가 시작됩니다.\n\n그 외에 이전 단계로 가시려면 \"이전\" 다른 쇼핑몰을 검색하시려면 \"처음으로\"를 입력해주세요~\n\n이용을 마치신다면 \"끝\"을 입력해주세요~아무 입력도 없을 시 10분 후 초기화됩니다.\n\nswu핑몰 고객센터에 대한 불편 사항은 \"불편사항\"을 입력해주시면 안내해드리도록 하겠습니다.\n\n즐거운 쇼핑되세요~(쑥스)"};
              }
              else {
                messages["message"] = {"text" : "문의하실 쇼핑몰 이름을 말씀해주세요.\n예시)swu핑몰"};
              }
              fs.writeFile("./data/message.json",JSON.stringify(messages,null,'\t'),"utf8",function(err,data){
                if(err){
                  console.log(err);
                }
              })
              fs.readFile("./data/message.json",'utf8',function(err,data){
                console.log(data);
                res.end(data);
                return;
              })
            })
          }
          else {
            fs.readFile("./data/"+"message.json",'utf8', function(err,data){
              var messages = JSON.parse(data);
              console.log(data);

              messages["message"] = {"text" : "끼엮"};

              fs.writeFile("./data/message.json",JSON.stringify(messages,null,'\t'),"utf8",function(err,data){
                if(err){
                  console.log(err);
                }
              })
              fs.readFile("./data/message.json",'utf8',function(err,data){
                console.log(data);
                res.end(data);
                return;
              })
          })
        }
        })
      }
