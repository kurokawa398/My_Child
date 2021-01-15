var canvas; //制限時間のキャンバス
var ctx; //制限時間のキャンバス
var canvas_score; //スコアのキャンバス
var ctx_score; //スコアのキャンバス
var count; //残り時間
var randoms = []; //乱数の制御
var ram; //どのクイズを出すかの乱数
var time; //残り時間を表示するための変数
var timer; //制限時間のタイマー
var score = 0; //現在の得点
var questioncnt = 1; //現在の問題数
var correctcnt = 0; //現在の正解数
var json; //選択したジャンルのjsonファイル
var fifty_flg = true; //ハーフチョイスを使ったかの判定
var miss; //間違えたときの効果音
var correctse; //正解した時の効果音
var questionse; //問題を出すときの効果音

//ニフクラの設定
var application_key = "9cf230addad94f99ecfc7f4992bd9e111df0576aff15cc03ff5ab7c0c0de4913";
var client_key = "c7cb021c663553edafdca2a7629d396ec49dab6c76dbfd4f880eeec09a3999e0";
var ncmb = new NCMB(application_key, client_key);
var Playerdata = ncmb.DataStore("playerdata");
var playerdata = new Playerdata();

//ニフクラからデータを取得
Playerdata.fetchAll().then(function(results){
ons.ready(function() {
  //seの設定
  miss = document.getElementById("miss");
  correctse = document.getElementById("correct");
  questionse = document.getElementById("questionse");
  tap = document.getElementById("select2se");
  //jsonの設定
  json = localStorage.getItem('json');
  //canvasの初期設定
  canvas = document.getElementById('canvas');
  canvas.width = document.getElementById("question").clientWidth;
  ctx = canvas.getContext('2d');
  //canvas_scoreの初期設定
  canvas_score = document.getElementById('score');
  ctx_score = canvas_score.getContext('2d');
  //初回のクイズのロード
  questionse.play();
  Swal.fire({
        type:"question",
        title: "問題",
        html : questioncnt +' / 10',
        showConfirmButton : false,
        allowOutsideClick : false,
        timer : '1500' 
      }).then(function(result){
        loader();
  });

  //一時停止ボタンが押されたら
  document.getElementById("stop").addEventListener('click',function(){
    tap.play();
    Swal.fire({
        type:"question",
        title: "ジャンル選択に戻りますか？",
        showCancelButton : true,
        confirmButtonText : 'はい',
        cancelButtonText : 'いいえ',
        reverseButtons : true,
        allowOutsideClick : false,
      }).then(function(result){
        if(result.value){
          window.location.href = './select.html';
        }        
    });
  });

  //選択肢が押されたら
  document.getElementById("answer1").addEventListener('click',function(){
    judge(document.getElementById("answer1"));
  });

  document.getElementById("answer2").addEventListener('click',function(){
    judge(document.getElementById("answer2"));
  });

  document.getElementById("answer3").addEventListener('click',function(){
    judge(document.getElementById("answer3"));
  });

  document.getElementById("answer4").addEventListener('click',function(){
    judge(document.getElementById("answer4"));
  });

  //タイムプラスが押されたら
  document.getElementById("plus").addEventListener('click',function(){
    timeplus();
  });

   //ハーフチョイスが押されたら 
  document.getElementById("fifty").addEventListener('click',function(){
    fifty();
  });

  //スキップが押されたら
  document.getElementById("skip").addEventListener('click',function(){
    skip();
  });

  //アイテム所持数の表示
  document.getElementById("plus").innerHTML ='<i class="plus fa fa-plus"></i>'+("0000"+results[0].plus).slice(-2);

  document.getElementById("fifty").innerHTML ='<i class="fifty fa fa-balance-scale"></i>'+("0000"+results[0].fifty).slice(-2);

  document.getElementById("skip").innerHTML ='<i class="skip fa fa-angle-double-right"></i>'+("0000"+results[0].skip).slice(-2);

});

 
//クイズのロード
function loader(){
  questioncnt++;
  fifty_flg = true;
  document.getElementById("answer1").disabled = false;
  document.getElementById("answer2").disabled = false;
  document.getElementById("answer3").disabled = false;
  document.getElementById("answer4").disabled = false;
  //jsonの取得
  $.getJSON(json, function(result){
    count = 20.0;
    //ランダムで問題を決める
    var questioins = result.length;
    while(true){
      ram = Math.floor(Math.random() * questioins);
      if(!randoms.includes(ram)){
        randoms.push(ram);
        break;
      }
    }
    
    document.getElementById("question").innerHTML = result[ram].question;
    document.getElementById("answer1").innerHTML = result[ram].answer1;
    document.getElementById("answer2").innerHTML = result[ram].answer2;
    document.getElementById("answer3").innerHTML = result[ram].answer3;
    document.getElementById("answer4").innerHTML = result[ram].answer4;
    //制限時間のためのタイマー
    timer = setInterval(function(){
    if(count<=0.01){
      timeover();
    }else{
      count -= 0.02;
    }
   
    if(count>=10){
      time = count.toFixed(2);
    }else{
      time = '0'+count.toFixed(2);
    }
   if(count >= 5){
    ctx.fillStyle = 'blue';
    ctx.clearRect(0, 0, 2000, 2000);
    ctx.fillRect(90, 9, document.getElementById("question").clientWidth*count/27, 20);
    ctx.font = "32px serif";
    ctx.fillText(time,0,30 );
   }else{
    ctx.fillStyle = 'red';
    ctx.clearRect(0, 0, 2000, 2000);
    ctx.fillRect(90, 9, document.getElementById("question").clientWidth*count/27, 20);
    ctx.font = "32px serif";
    ctx.fillText(time,0,30 );
   }
  ctx_score.clearRect(0, 0, 2000, 2000);
  ctx_score.font = "32px serif";
  ctx_score.fillText(("0000"+score).slice(-5),0,30 );
   

  },20);
  });
}

//タイムプラスの処理
function timeplus(){
  if(results[0].plus > 0){
    tap.play();
    count += 10.0;
    results[0].plus--;
    document.getElementById("plus").innerHTML ='<i class="plus fa fa-plus"></i>'+("0000"+results[0].plus).slice(-2);
  }
}

//ハーフチョイスの処理
function fifty(){
  if(fifty_flg && results[0].fifty > 0){
    tap.play();
    fifty_flg = false;
    results[0].fifty--;
    document.getElementById("fifty").innerHTML ='<i class="fifty fa fa-balance-scale"></i>'+("0000"+results[0].fifty).slice(-2);
  $.getJSON(json, function(result){
    var cnt = 0;
    var rnd;
    var tmp = 0;
    while(cnt<2){
      while(true){
        rnd = Math.floor(Math.random() * 4);
        if(cnt ==0){
          tmp = rnd;
          break;
        }else{
          if(tmp != rnd){
            break;
          }
        }
      }
      if(rnd==0){
        if(document.getElementById("answer1").innerHTML != result[ram].correct){
          cnt++;
          document.getElementById("answer1").innerHTML ="";
          document.getElementById("answer1").disabled = true;
        }
      }else if(rnd==1){
        if(document.getElementById("answer2").innerHTML != result[ram].correct){
          cnt++;
          document.getElementById("answer2").innerHTML ="";
          document.getElementById("answer2").disabled = true;
        }
      }else if(rnd == 2){
        if(document.getElementById("answer3").innerHTML != result[ram].correct){
          cnt++;
          document.getElementById("answer3").innerHTML ="";
          document.getElementById("answer3").disabled = true;
        }
      }else if(rnd == 3){
        if(document.getElementById("answer4").innerHTML != result[ram].correct){
          cnt++;
          document.getElementById("answer4").innerHTML ="";
          document.getElementById("answer4").disabled = true;
        }
      }
    }
  });
  }
}

//スキップの処理
function skip(){
  if(results[0].skip > 0){
    tap.play();
    clearInterval(timer);
    questioncnt--;
    loader();
    results[0].skip--;
    document.getElementById("skip").innerHTML ='<i class="skip fa fa-angle-double-right"></i>'+("0000"+results[0].skip).slice(-2);
  }
}

//クイズの正誤判定
function judge(button){
  $.getJSON(json, function(result){
    if(button.innerHTML == result[ram].correct){
      /*var age = 0;//results[0].year;
      if(age <= 3){
      document.getElementById("area2").innerHTML =
        "<img src=\"img/baby/babyS.png\"/>";
      }*/
      clearInterval(timer);
      correctse.play();
      score += Math.floor(count * 100);
      correctcnt++;
      ctx_score.clearRect(0, 0, 2000, 2000);
      ctx_score.font = "32px serif";
      ctx_score.fillText(("0000"+score).slice(-5),0,30 );
      Swal.fire({
        type:"success",
        title: "正解",
        showConfirmButton : false,
        allowOutsideClick : false,
        timer : '2000' 
      }).then(function(result){
        if(questioncnt > 10){
          Swal.fire({
            title: "リザルト",
            html:"正解数　　 "+correctcnt+" / 10<br>スコア　　 "+score+"<br><br>"+Math.floor(score/10)+"円獲得",
            allowOutsideClick : false,
          }).then(function(result){
            parameter();
            results[0].money += Math.floor(score/10);
            if(results[0].month >= 12){
              results[0].month = 3;
              results[0].year++;
            }else{
              results[0].month += 3;
            }
            results[0].set("name", results[0].value)
                .set("money", results[0].money)
                .set("year", results[0].year)
                .set("month", results[0].month)
                .set("plus", parseInt(results[0].plus))
                .set("fifty", parseInt(results[0].fifty))
                .set("skip", parseInt(results[0].skip))
                .set("algoritm", results[0].algoritm)
                .set("hardsoft", results[0].hardsoft)
                .set("database", results[0].database)
                .set("network", results[0].network)
                .set("security", results[0].security)
                .set("development", results[0].development)
            return results[0].update().then(function(results){
              window.location.href = './home.html';
            })
             
          })
        }else{
        questionse.play();
        Swal.fire({
        type:"question",
        title: "問題",
        html : questioncnt +' / 10',
        showConfirmButton : false,
        allowOutsideClick : false,
        timer : '1500' 
      }).then(function(result){
        loader();
  });
        }
  });
    }else{
      clearInterval(timer);
      miss.play();
      Swal.fire({
        type:"error",
        title: "不正解",
        html:"正解：　"+result[ram].correct,
        showConfirmButton : false,
        allowOutsideClick : false,
        timer : '2000' 
      }).then(function(result){
        if(questioncnt > 10){
          Swal.fire({
            title: "リザルト",
            html:"正解数　　 "+correctcnt+" / 10<br>スコア　　 "+score+"<br><br>"+Math.floor(score/10)+"円獲得",
            allowOutsideClick : false,
          }).then(function(result){
            parameter();
            results[0].money += Math.floor(score/10);
            if(results[0].month >= 12){
              results[0].month = 3;
              results[0].year++;
            }else{
              results[0].month += 3;
            }
            results[0].set("name", results[0].value)
                .set("money", results[0].money)
                .set("year", results[0].year)
                .set("month", results[0].month)
                .set("plus", parseInt(results[0].plus))
                .set("fifty", parseInt(results[0].fifty))
                .set("skip", parseInt(results[0].skip))
                .set("algoritm", results[0].algoritm)
                .set("hardsoft", results[0].hardsoft)
                .set("database", results[0].database)
                .set("network", results[0].network)
                .set("security", results[0].security)
                .set("development", results[0].development)
            return results[0].update().then(function(results){
              window.location.href = './home.html';
            }) 
          })
        }else{
        questionse.play();
        Swal.fire({
        type:"question",
        title: "問題",
        html : questioncnt +' / 10',
        showConfirmButton : false,
        allowOutsideClick : false,
        timer : '1500' 
      }).then(function(result){
        loader();
  });
        }
      });
    }
    
  });
}

//時間切れの場合の判定
function timeover(){
  clearInterval(timer);
  miss.play();
  Swal.fire({
    type:"error",
    title: "時間切れ",
    showConfirmButton : false,
    allowOutsideClick : false,
    timer : '2000' 
  }).then(function(result){
    if(questioncnt >10){
      Swal.fire({
        title: "リザルト",
        html:"正解数　　 "+correctcnt+" / 10<br>スコア　　 "+score+"<br><br>"+Math.floor(score/10)+"円獲得",
        allowOutsideClick : false,
      }).then(function(result){
        parameter();
        results[0].money += Math.floor(score/10);
        if(results[0].month >= 12){
          results[0].month = 3;
          results[0].year++;
        }else{
          results[0].month += 3;
        }
        results[0].set("name", results[0].value)
                .set("money", results[0].money)
                .set("year", results[0].year)
                .set("month", results[0].month)
                .set("plus", parseInt(results[0].plus))
                .set("fifty", parseInt(results[0].fifty))
                .set("skip", parseInt(results[0].skip))
                .set("algoritm", results[0].algoritm)
                .set("hardsoft", results[0].hardsoft)
                .set("database", results[0].database)
                .set("network", results[0].network)
                .set("security", results[0].security)
                .set("development", results[0].development)
            return results[0].update().then(function(results){
              window.location.href = './home.html';
            })
      })
    }else{
      questionse.play();
        Swal.fire({
        type:"question",
        title: "問題",
        html : questioncnt +' / 10',
        showConfirmButton : false,
        allowOutsideClick : false,
        timer : '1500' 
      }).then(function(result){
        loader();
  });
    }
      });
}

  //パラメータの更新
  function parameter(){
    if(json == './json/algorithm.json'){
      results[0].algoritm += correctcnt;
    }else if(json == './json/hardsoft.json'){
      results[0].hardsoft += correctcnt;
    }else if(json == './json/database.json'){
      results[0].database += correctcnt;
    }else if(json == './json/network.json'){
      results[0].network += correctcnt;
    }else if(json == './json/security.json'){
      results[0].security += correctcnt;
    }else if(json == './json/development.json'){
      results[0].development += correctcnt;
    }
  }


})

