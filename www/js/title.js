
ons.ready(function(){
  //seの準備
  var start = document.getElementById("se");

  //画面のどこかがタップされた時の処理
  document.getElementById("start").addEventListener('click',function(){
    
    //seの再生
    start.play();
    
    //画面の遷移
    start.addEventListener('ended', function(){
        window.location.href = "./home.html";
    });
    
  });
})


