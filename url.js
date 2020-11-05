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

var cookieValue = "xxxxxx";//cookie
var userAgent = 'xxxxxxx'//User-Agent

var imgUrlFilePath = 'D:\\nodeCrawler';
var imgUrlFileName = 'img.txt';
var imgFullPath = imgUrlFilePath + '\\' + imgUrlFileName;

// 引入所需要的第三方包
const superagent = require('superagent');




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



function countpost(count1) {
  for (var index = 1; index <=count1; index++) {
    
    superagent.post('xxxxx')//Request URL
      .set('Cookie', cookieValue)
      .set('Content-Type', 'xxxxx')//Content-Type
	  .set('User-Agent', userAgent)
      .send('pageNo=' + index)
      .send('pageSize=10')
      .end((err, res) => {
        if(res) {

          let $ = cheerio.load(res.text);

          var imgArray = [];
          $('#contentTable tbody tr td a').each((idx, ele) => {
            if ($(ele).children('img').attr('src')) {
              var href = $(ele).children('img').attr('src');
			  
              if (href.indexOf("/handle.jpg") != -1) {
                imgArray.push('xxxxxxx' + href);//xxxx图片地址
              }
            }
  
          });
  
          ///下载图片
          downLoads(imgArray);
		};
	  });
  }
}


if (!fs.existsSync(imgUrlFilePath)) {
    
    mkdirsSync(imgUrlFilePath);
 
  }

/**
 * index.js
 * [description] - 使用superagent.get()方法来访问百度新闻首页
 */
superagent.post('xxxxxxx')//Request URL
  .set('Cookie', cookieValue)
  .set('Content-Type', 'xxxxxxx')//Content-Type
  .set('User-Agent', userAgent)
  .send('pageNo=1')
  .send('pageSize=10')
  .end((err, res) => {
	  //console.log(res);
    if (err) {
      console.log(`抓取失败 - ${err}`)
    } else {
      let $ = cheerio.load(res.text);
	  console.log($('span[class="pagination-info"]').html());
      var countDes = $('span[class="pagination-info"]').html().split(' ')[5];
      count = Math.ceil(countDes / 10.0);
       console.log(countDes);  
      countpost(count);
    }
  });





// function documents(imgArray) {
//   imgArray.forEach(url => {
//     document(url);
//   });
// }



function downLoads(imgArray) {
  imgArray.forEach(url => {
    //downLoad(url);
	console.log(url);
   fs.writeFile(imgFullPath, url+'\r\n', { 'flag': 'a' }, function(err){
		if(err){
			console.log("write file field,");
		};
		
	})
  });
}

