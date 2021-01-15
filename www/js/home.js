//就職先の初期値とパラメーター
var company = "なし"
var tmp = 50;

//ニフクラの準備
var application_key = "9cf230addad94f99ecfc7f4992bd9e111df0576aff15cc03ff5ab7c0c0de4913";
var client_key = "c7cb021c663553edafdca2a7629d396ec49dab6c76dbfd4f880eeec09a3999e0";
var ncmb = new NCMB(application_key, client_key);
var Playerdata = ncmb.DataStore("playerdata");
var first = false;
var playerdata = new Playerdata();


ons.ready(function(){
  //seの設定
  var selectse = document.getElementById("selectse");
  statusse = document.getElementById("select2se");
  
  //ニフクラからデータを取得
  Playerdata.fetchAll()
    .then(function(results){
      //データが無かったら名前を入力して初期値の設定
  if(results.length == 0){
    Swal.fire({
      title: '子供の名前を入力してね',
      showLoaderOnConfirm: true,
      input : 'text'
    }).then(function(result){
      var start = {name:result.value,money:0,year:0,month:3,plus:0,fifty:0,skip:0};
      localStorage.setItem("playerdata",JSON.stringify(start));
      playerdata.set("name", result.value)
         .set("money", 5000)
         .set("year", 0)
         .set("month", 3)
         .set("plus", 0)
         .set("fifty", 0)
         .set("skip", 0)
         .set("algoritm", 0)
         .set("hardsoft", 0)
         .set("database", 0)
         .set("network", 0)
         .set("security", 0)
         .set("development", 0)
         .save().then(function(gameScore){
            window.location.href = './home.html'; 
         })
      
    })    
  } 

  //画面の表示を更新
  document.getElementById("money").innerHTML = "所持金："+results[0].money+"円";
  document.getElementById("month").innerHTML = results[0].month+"月"

  //ステータスボタンが押されたら
  document.getElementById("status").addEventListener('click',function(){
    statusse.play();
    Swal.fire({
      title: 'ステータス',
      html: "<p>名前　　"+results[0].name+"</p>"+
            "<p>年齢　　"+results[0].year+"歳</p>"+
            "<p>内定先　　"+company+"</p>"+
            "<br><h3>パラメーター</h3>"+
            "<p>アルゴリズム　　"+results[0].algoritm+"</p>"+
            "<p>ハード・ソフトウェア　　"+results[0].hardsoft+"</p>"+
            "<p>データベース　　"+results[0].database+"</p>"+
            "<p>ネットワーク　　"+results[0].network+"</p>"+
            "<p>セキュリティ　　"+results[0].security+"</p>"+
            "<p>システム開発技術　　"+results[0].development+"</p>"

    })
  });

  //育成ボタンが押されたら
  document.getElementById("growing").addEventListener('click',function(){
    selectse.play();
    selectse.addEventListener('ended', function(){
        window.location.href = "./select.html";
    });
  });
  //ショップボタンが押されたら
  document.getElementById("shopping").addEventListener('click',function(){
    selectse.play();
    selectse.addEventListener('ended', function(){
        window.location.href = "./shop.html";
    }); 
  });
  //就職先の分岐
  if(results[0].algoritm >= tmp){
    company = "ALGORITMカンパニー";
    tmp = results[0].algoritm;
  }else if(results[0].hardsoft >= tmp){
    company = "HARDSOFTシステムズ";
    tmp = results[0].hardsoft;
  }else if(results[0].database >= tmp){
    company = "DATABASEファクトリー";
    tmp = results[0].database;
  }else if(results[0].network >= tmp){
    company = "NETWORKコーポレーション";
    tmp = results[0].network;
  }else if(results[0].security >= tmp){
    company = "SECURITYソリューション";
    tmp = results[0].security;
  }else if(results[0].development >= tmp){
    company = "DEVELOPMENTシステム";
    tmp = results[0].development;
  }else{
    company = "ABC病院(受付)";
  }
  if(results[0].year < 22){
    company = "なし";
  }

  if(results[0].year >= 23){
    window.location.href = "./clear.html";
  }
  })

  
})


