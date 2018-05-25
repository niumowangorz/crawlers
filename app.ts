import api = require("./api");
import cheerio = require("cheerio");
import fs = require("fs");

export class Channel {
  ChannelName: string;
  Contents: Content[];
}
export class Content {
  Url: string;
  Title: string;
  CreateTime: string;
}

const go = async () => {
  const res = await api.remote_get("http://www.gl-ns.com/");
  //加载HTML
  const $ = cheerio.load(res.text);
  let news: Channel[] = [];

  for (let i = 0; i < $(".new").length; i++) {
    $(".new")
      .eq(i)
      .each((index, element) => {
        news.push({
          ChannelName: $(element)
            .find(".l")
            .first()
            .text()
            .trim(),
          Contents: []
        });

        $(element)
          .find("li")
          .each((idx, emt) => {
            news[i].Contents.push({
              Url:
                "http://www.gl-ns.com" +
                $(emt)
                  .find("a")
                  .first()
                  .attr("href"),
              Title: $(emt)
                .find("a")
                .first()
                .text()
                .trim(),
              CreateTime: $(emt)
                .find(".time")
                .first()
                .text()
                .trim()
            });
          });
      });
  }

  console.log(news);

  fs.writeFile("./text.json", JSON.stringify(news), (err: object) => {
    if (err) {
      return console.error(err);
    }
    fs.readFile("./text.json", (err, data) => {
      if (err) {
        return console.error(err);
      }
    });
  });
};
go();
