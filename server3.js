var http = require("http");
var express = require("express");
var app = express();

var items=[
  { name:"우유",
    price:2000
  },
  { name:"홍차",
    price:5000
  },{ name:"커피",
    price:5000
  }
];

app.use(express.static("public"));
app.use(express.bodyParser());
app.use(app.router);

app.all("/data.html",function(request, respone){
  var output = "";
  output += "<!DOCTYPE html>";
  output += "<html>";
  output += "<head>";
  output += "<title>Data HTML</title>";
  output += "<body>";
  items.forEach(function(item){
    output += "<div>";
    output += "<h1>"+item.name+"</h1>";
    output += "<h2>"+item.price+"</h2>";
    output += "</div>";
  });
  output += "</body>";
  output += "</head>";
  output += "</html>";
  respone.send(output);
});

app.all("/data.json",function(request, respone){
  respone.send(items);
});

app.get("/products/:id",function(request, response){
  var id = Number(request.param("id"));
  if(isNaN(id)){
      response.send({error:"숫자를 입력하세요"})
  }else if(items[id]){
      response.send(items[id]);
  }else{
    response.send({error:"상품의 인덱스를 확인하세요"})
  }

  // response.send(items[id]);
});

app.post("/products", function(request, response){
  try{
      var name = request.param("name");
      var price = request.param("price");
      console.log("상품명:"+name);
      console.log("상품각격:"+price);
      var item = {name:name, price:price};
      items.push(item);

      response.send({message:"데이터를 추가했습니다",
                      data:items});
  }catch(ex){
    console.log(ex);
  }
});





app.all("/data.xml",function(request, respone){
    respone.type("text/xml");
    var output = "";
    output += '<?xml version="1.0" encoding="UTF-8"?>';
    output += "<products>";
    items.forEach(function(item){
      output += "<product>";
      output += "<name>"+item.name+"</name>";
      output += "<price>"+item.price+"</price>";
      output += "</product>";
    });

    output += "</products>";
    respone.send(output);
});

http.createServer(app).listen(52273, function(){
  console.log("서버가 가동되었습니다.");
});
