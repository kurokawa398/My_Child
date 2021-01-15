var se //seのDOMを入れる変数;

ons.ready(function() {
  //効果音の設定
  se = document.getElementById("select2se");

  //戻るボタンが押された時の処理
  document.getElementById("back").addEventListener('click',function(){
    window.location.href = './home.html'; 
  });

  //アルゴリズムが押された時の処理
  document.getElementById("algorithm").addEventListener('click',function(){
    message(document.getElementById("algorithm"),'./json/algorithm.json');
  });
  
  //ハード・ソフトウェアがが押された時の処理
  document.getElementById("program").addEventListener('click',function(){
    message(document.getElementById("program"),'./json/hardsoft.json');
  });

  //データベースが押された時の処理
  document.getElementById("database").addEventListener('click',function(){
    message(document.getElementById("database"),'./json/database.json');
  });

  //ネットワークが押された時の処理
  document.getElementById("network").addEventListener('click',function(){
    message(document.getElementById("network"),'./json/network.json');
  });

  //セキュリティが押された時の処理
  document.getElementById("security").addEventListener('click',function(){
    message(document.getElementById("security"),'./json/security.json');
  });

  //システム開発技術が押された時の処理
  document.getElementById("development").addEventListener('click',function(){
    message(document.getElementById("development"),'./json/development.json');
  });


});

//メッセージを表示する関数
function message(id,json){
  se.play();
  Swal.fire({
    title: id.innerHTML+"に挑みますか?",
    showCancelButton : true,
    confirmButtonText : 'はい',
    cancelButtonText : 'やめる',
    reverseButtons : true,
    allowOutsideClick : false,
  }).then(function(result){
    if(result.value){
      //localStorageにjsonパスを保存して別のjsに受け渡し、画面の遷移
      localStorage.setItem('json', json);
      window.location.href = './quiz.html'; 
    }
        
  });
  
}