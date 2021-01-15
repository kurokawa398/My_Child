//ニフクラの準備
var application_key = "9cf230addad94f99ecfc7f4992bd9e111df0576aff15cc03ff5ab7c0c0de4913";
var client_key = "c7cb021c663553edafdca2a7629d396ec49dab6c76dbfd4f880eeec09a3999e0";
var ncmb = new NCMB(application_key, client_key);
var Playerdata = ncmb.DataStore("playerdata");
document.addEventListener( 'DOMContentLoaded', function(){
  //ニフクラからデータを取得
  Playerdata.fetchAll()
    .then(function(results){
      var tmp = 50; //就職先のためのパラメータの初期値
      var company = "ABC病院(受付)"; //初期の就職先
      if(results[0].algoritm >= tmp){
        tmp = results[0].algoritm;
        company = "ALGORITMカンパニー";
      }
      if(results[0].hardsoft >= tmp){
        tmp = results[0].hardsoft;
        company = "HARDSOFTシステムズ";
      }
      if(results[0].database >= tmp){
        tmp = results[0].database;
        company = "DATABASEファクトリー";
      }
      if(results[0].network >= tmp){
        tmp = results[0].network;
        company = "NETWORK<br>コーポレーション";
      }
      if(results[0].security >= tmp){
        tmp = results[0].security;
        company = "SECURITY<br>ソリューション";
      }
      if(results[0].development >= tmp){
        tmp = results[0].development;
        company = "DEVELOPMENTシステム";
      }
      //テキストの表示
      document.getElementById("text").innerHTML = "<div style=\"padding-top:10%;font-size:2em;text-align:center;line-height:0.95em;ont-weight:bold;color: transparent;background : rgba(0,0,0,1);text-shadow : 0 0 0.1em rgba(255,255,255,0.05),0.01em 0.04em 0.03em rgba(255,255,255,0.4);-webkit-background-clip : text;\">"+company+"<br>就職";
      //数秒後にエンドロールに遷移するためのタイマー
      setTimeout(function(){
        window.location.href = 'end.html';
      }, 5*1000);
    })

    //タップしたらエンドロールに遷移
    document.getElementById("tap").addEventListener('click',function(){
      window.location.href = "./end.html";
    })
})