//ニフクラの準備
var application_key = "9cf230addad94f99ecfc7f4992bd9e111df0576aff15cc03ff5ab7c0c0de4913";
var client_key = "c7cb021c663553edafdca2a7629d396ec49dab6c76dbfd4f880eeec09a3999e0";
var ncmb = new NCMB(application_key, client_key);
var Playerdata = ncmb.DataStore("playerdata");
var playerdata = new Playerdata();

//ニフクラからデータを取得
Playerdata.fetchAll()
    .then(function(results){
ons.ready(function(){
  var age = results[0].year;
  //年齢によって子供の画像を変化
  if(age <= 3){
    document.getElementById("area1").innerHTML =
    "<div class=\"babyAll\"><img class=\"baby\"src=\"img/baby/baby.png\"/><div><div class=\"swing\"><img class=\"baby2\"src=\"img/baby/baby2.png\" /></div><div class=\"swing2\"><img class=\"baby3\"src=\"img/baby/baby3.png\"/></div></div></div>";
  }else if(age > 3 && age <= 5){
    document.getElementById("area1").innerHTML =
    "<img src=\"img/n/n.png\" class=\"n\" width=\"70%\"/><img src=\"img/n/n.png\" id=\"eye1\" class=\"eye4\" width=\"70%\"/><img src=\"img/n/n.png\" id=\"eye2\" class=\"eye4\" width=\"70%\"/><img src=\"img/n/n2.png\" id=\"eye3\" class=\"eye4\" width=\"70%\"/>";
  }else if(age > 5 && age <= 11){
    document.getElementById("area1").innerHTML =
    "<img src=\"img/js/js.png\" class=\"js\" width=\"80%\"/><img src=\"img/js/js.png\" id=\"eye1\" class=\"eye\" width=\"80%\"/><img src=\"img/js/js.png\" id=\"eye2\" class=\"eye\" width=\"80%\"/><img src=\"img/js/js2.png\" id=\"eye3\" class=\"eye\" width=\"80%\"/>";
  }else if(age > 11 && age <= 14){
    document.getElementById("area1").innerHTML =
    "<img src=\"img/jc/jc.png\" class=\"jc\" width=\"80%\"/><img src=\"img/jc/jc.png\" id=\"eye1\" class=\"eye\" width=\"80%\"/><img src=\"img/jc/jc.png\" id=\"eye2\" class=\"eye\" width=\"80%\"/><img src=\"img/jc/jc2.png\" id=\"eye3\" class=\"eye\" width=\"80%\"/>";
  }else if(age > 14 && age <= 17){
    document.getElementById("area1").innerHTML =
    "<img src=\"img/jk/jk.png\" class=\"jk\" width=\"70%\"/><img src=\"img/jk/jk.png\" id=\"eye1\" class=\"eye\" width=\"70%\"/><img src=\"img/jk/jk.png\" id=\"eye2\" class=\"eye\" width=\"70%\"/><img src=\"img/jk/jk2.png\" id=\"eye3\" class=\"eye\" width=\"70%\"/>";
  }else if(age > 17 && age <= 21){
    document.getElementById("area1").innerHTML =
    "<img src=\"img/jd/jd.png\" class=\"jd\" width=\"70%\"/><img src=\"img/jd/jd.png\" id=\"eye1\" class=\"eye\" width=\"70%\"/><img src=\"img/jd/jd.png\" id=\"eye2\" class=\"eye\" width=\"70%\"/><img src=\"img/jd/jd2.png\" id=\"eye3\" class=\"eye\" width=\"70%\"/>";
  }else if(age >= 22){
    document.getElementById("area1").innerHTML =
    "<img src=\"img/s/s.png\" class=\"jc\" width=\"80%\"/><img src=\"img/s/s.png\" id=\"eye1\" class=\"eye\" width=\"80%\"/><img src=\"img/s/s.png\" id=\"eye2\" class=\"eye\" width=\"80%\"/><img src=\"img/s/s2.png\" id=\"eye3\" class=\"eye\" width=\"80%\"/>";
  }
 });
})