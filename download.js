const express = require('express');
const app = express();
var fs = require('fs');
var Bagpipe = require('bagpipe');
var request = require('request');
var path = require('path');



const cheerio = require('cheerio');

var count = 0;


let server = app.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Your App is running at http://%s:%s', host, port);
});

var cookieValue = "xxxxx";//cookie
var userAgent = 'xxxxx'//User-Agent

var imgFile = 'D:\\nodeCrawler\\img.txt';

// 引入所需要的第三方包
const superagent = require('superagent');


var array = fs.readFileSync(imgFile).toString().split("\r\n");

var bagpipe = new Bagpipe(10,{timeout: 100});


for(i in array) {
	var url = array[i];
   // console.log(array[i]);
   //downLoad(url);
   
   if(url!=null && url!=undefined && url.length > 0) {
	   bagpipe.push(downLoad, url, function(err, data){
    //
   });
   }
}




function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

function downLoad(url) {

  let urlArr = url.split('/');
  let fileName1 = urlArr[urlArr.length - 3];
  let fileName2 = urlArr[urlArr.length - 2];
  let fileName3 = urlArr[urlArr.length - 1];
  
  var path = 'D:\\nodeCrawler\\image\\' + fileName1 + '\\' + fileName2 + '\\';
  
  if (!fs.existsSync(path)) {
    
    mkdirsSync(path);
 
  }

  var file_path = path + fileName3;
  
	request(url).on('error', () => {

	  console.log('===================== 失败' + file_path);
	}).pipe(fs.createWriteStream(file_path)).on('close', () => {
	  console.log('成功'+file_path);
	});


}




