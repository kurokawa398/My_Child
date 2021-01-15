var tmp; //購入数の仮の保存場所

//ニフクラの準備
var application_key = "9cf230addad94f99ecfc7f4992bd9e111df0576aff15cc03ff5ab7c0c0de4913";
var client_key = "c7cb021c663553edafdca2a7629d396ec49dab6c76dbfd4f880eeec09a3999e0";
var ncmb = new NCMB(application_key, client_key);
var Playerdata = ncmb.DataStore("playerdata");
var playerdata = new Playerdata();


ons.ready(function() {
  //seの準備
  var se = document.getElementById("select2se");
  var se2 = document.getElementById("buyse");

  //ニフクラからデータを取得
  Playerdata.fetchAll().then(function(results){

  //所持金の表示を更新
  document.getElementById("money").innerHTML = "所持金："+results[0].money+"円";

  //戻るボタンが押された時の遷移
  document.getElementById("back").addEventListener('click',function(){
    window.location.href = './home.html'; 
  });

  //タイムプラスが選択されたら
  document.getElementById("plus").addEventListener('click',function(){
    se.play();
    Swal.fire({
      title: "タイムプラス",
      html:"制限時間を10秒延長する<br>値段　300円<br>所持数　"+parseInt(results[0].plus),
      imageUrl: './img/item/plus_icon.png',
      input : 'number',
      inputPlaceholder : '購入数を入力してね',
      showCancelButton : true,
      confirmButtonText : '購入',
      cancelButtonText : 'やめる',
      reverseButtons : true,
      allowOutsideClick : false,
    }).then(function(result){
      if(result.value){
        //購入数が正しい数字でかつアイテムが買える状態だったら
        if(result.value > 0 && results[0].money >= 300&&results[0].plus<99){
          //上限の99、金額に引っかかったら
          if(99-results[0].plus<result.value||results[0].money < result.value * 300){
            result.value = 99-results[0].plus;
            //金額に引っかかったら
            if(results[0].money < result.value * 300){
              result.value = Math.floor(results[0].money / 300);
            }
          }
          tmp = result.value;
          Swal.fire({
            title: "タイムプラスを"+result.value+"個購入しますか?",
            html:"必要金額　"+result.value * 300+"円",
            showCancelButton : true,
            confirmButtonText : 'はい',
            cancelButtonText : 'やめる',
            reverseButtons : true,
            allowOutsideClick : false,
          }).then(function(result){
            if(result.value){
              se2.play();
              Swal.fire({
                title: "購入しました",
                confirmButtonText : 'OK',
                reverseButtons : true,
                allowOutsideClick : false,
              })
              //ニフクラと画面表示の更新
              results[0].plus = parseInt(results[0].plus)+parseInt(tmp);
              results[0].money -= tmp*300;
              document.getElementById("money").innerHTML = "所持金："+results[0].money+"円";
              results[0].set("name", results[0].value)
                .set("money", results[0].money)
                .set("year", results[0].year)
                .set("month", results[0].month)
                .set("plus", results[0].plus)
                .set("fifty", results[0].fifty)
                .set("skip", results[0].skip)
                .set("algoritm", 0)
                .set("hardsoft", 0)
                .set("database", 0)
                .set("network", 0)
                .set("security", 0)
                .set("development", 0)
              return results[0].update();
            }
          });
        }
      }
    });
  });

  //ハーフチョイスが選択されたら
  document.getElementById("fifty").addEventListener('click',function(){
    se.play();
    Swal.fire({
      title: "ハーフチョイス",
      html:"選択肢を半分にする<br>値段　600円<br>所持数　"+parseInt(results[0].fifty),
      imageUrl: './img/item/fifty_icon.png',
      input : 'number',
      inputPlaceholder : '購入数を入力してね',
      showCancelButton : true,
      confirmButtonText : '購入',
      cancelButtonText : 'やめる',
      reverseButtons : true,
      allowOutsideClick : false,
    }).then(function(result){
      if(result.value){
        //購入数が正しい数字でかつアイテムが買える状態だったら
        if(result.value > 0 && results[0].money >= 600&&results[0].fifty<99){
          //上限の99、金額に引っかかったら
          if(99-results[0].fifty<result.value||results[0].money < result.value * 600){
            result.value = 99-results[0].fifty;
            //金額に引っかかったら
            if(results[0].money < result.value * 600){
              result.value = Math.floor(results[0].money / 600);
            }
          }
          tmp = result.value;
          Swal.fire({
            title: "ハーフチョイスを"+result.value+"個購入しますか?",
            html:"必要金額　"+result.value * 600+"円",
            showCancelButton : true,
            confirmButtonText : 'はい',
            cancelButtonText : 'やめる',
            reverseButtons : true,
            allowOutsideClick : false,
          }).then(function(result){
            if(result.value){
              se2.play();
              Swal.fire({
                title: "購入しました",
                confirmButtonText : 'OK',
                reverseButtons : true,
                allowOutsideClick : false,
              })
              //ニフクラと画面表示の更新
              results[0].fifty = parseInt(results[0].fifty)+parseInt(tmp);
              results[0].money -= tmp*600;
              document.getElementById("money").innerHTML = "所持金："+results[0].money+"円";
              results[0].set("name", results[0].value)
                .set("money", results[0].money)
                .set("year", results[0].year)
                .set("month", results[0].month)
                .set("plus", results[0].plus)
                .set("fifty", results[0].fifty)
                .set("skip", results[0].skip)
                .set("algoritm", 0)
                .set("hardsoft", 0)
                .set("database", 0)
                .set("network", 0)
                .set("security", 0)
                .set("development", 0)
              return results[0].update();
            }
          });
        }
      }
    });
  });

  document.getElementById("skip").addEventListener('click',function(){
    se.play();
    Swal.fire({
      title: "スキップ",
      html:"現在の問題を別の問題にする<br>値段　1000円<br>所持数　"+parseInt(results[0].skip),
      imageUrl: './img/item/skip_icon.png',
      input : 'number',
      inputPlaceholder : '購入数を入力してね',
      showCancelButton : true,
      confirmButtonText : '購入',
      cancelButtonText : 'やめる',
      reverseButtons : true,
      allowOutsideClick : false,
    }).then(function(result){
      if(result.value){
        //購入数が正しい数字でかつアイテムが買える状態だったら
        if(result.value > 0 && results[0].money >= 1000&&results[0].skip<99){
          //上限の99、金額に引っかかったら
          if(99-results[0].skip<result.value||results[0].money < result.value * 1000){
            result.value = 99-results[0].skip;
            //金額に引っかかったら
            if(results[0].money < result.value * 1000){
              result.value = Math.floor(results[0].money / 1000);
            }
          }
          tmp = result.value;
          Swal.fire({
            title: "スキップを"+result.value+"個購入しますか?",
            html:"必要金額　"+result.value * 1000+"円",
            showCancelButton : true,
            confirmButtonText : 'はい',
            cancelButtonText : 'やめる',
            reverseButtons : true,
            allowOutsideClick : false,
          }).then(function(result){
            if(result.value){
              se2.play();
              Swal.fire({
                title: "購入しました",
                confirmButtonText : 'OK',
                reverseButtons : true,
                allowOutsideClick : false,
              })
              //ニフクラと画面表示の更新
              results[0].skip = parseInt(results[0].skip)+parseInt(tmp);
              results[0].money -= tmp*1000;
              document.getElementById("money").innerHTML = "所持金："+results[0].money+"円";
              results[0].set("name", results[0].value)
                .set("money", results[0].money)
                .set("year", results[0].year)
                .set("month", results[0].month)
                .set("plus", results[0].plus)
                .set("fifty", results[0].fifty)
                .set("skip", results[0].skip)
                .set("algoritm", 0)
                .set("hardsoft", 0)
                .set("database", 0)
                .set("network", 0)
                .set("security", 0)
                .set("development", 0)
              return results[0].update();
            }
          });
        }
      }
    });
  });
  
    })

});
