import api = require("./api");
import cheerio = require("cheerio");
import fs = require("fs");
const go = async () => {
  const res = await api.remote_get("http://www.gl-ns.com/");
  //加载HTML
  const $ = cheerio.load(res.text);
  let Contents: object[] = [];
  let news: object[] = [];
  let urls: string[] = [];
  let titles: string[] = [];
  let data: string[] = [];

  $(".new").eq(0).each((index, element) => {
    news.push({
      ChannelName: $(element)
        .find(".l")
        .first()
        .text()
        .trim(),
      Contents: Contents
    });

    // console.log(news[index].Contents);
    $(element)
      .find("li")
      .each((ind, elet) => {
        // for (let i = 0; i < news.length; i++) {
        //   const item = news[i].Contents;
        // }
        // console.log(ind);
        Contents.push({
          Url:
            "http://www.gl-ns.com" +
            $(elet)
              .find("a")
              .first()
              .attr("href"),
          Title: $(elet)
            .find("a")
            .first()
            .text()
            .trim(),
          CreateTime: $(elet)
            .find(".time")
            .first()
            .text()
            .trim()
        });
      });
  });
  // console.log(news);
  fs.writeFile("./text.json", JSON.stringify(news), (err: object) => {
    if (err) {
      return console.error(err);
    }
    console.log("文件写入成功");
    fs.readFile("./text.json", (err, data) => {
      if (err) {
        return console.error(err);
      }
      // console.log(data.toString());
    });
  });
};
go();

//todo
class niumowang {
  heard: string;
  constructor(body: string) {
    this.heard = body;
  }
  foot(wtf: number) {
    console.log(`这个人有${wtf}条腿`);
  }
}
let nmw = new niumowang("mmp");
console.log(nmw.heard);
