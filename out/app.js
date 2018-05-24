"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const api = require("./api");
const cheerio = require("cheerio");
const fs = require("fs");
const go = () => __awaiter(this, void 0, void 0, function* () {
    const res = yield api.remote_get("http://www.gl-ns.com/");
    //加载HTML
    const $ = cheerio.load(res.text);
    let Contents = [];
    let news = [];
    let urls = [];
    let titles = [];
    let data = [];
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
                Url: "http://www.gl-ns.com" +
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
    fs.writeFile("./text.json", JSON.stringify(news), (err) => {
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
});
go();
//todo
class niumowang {
    constructor(body) {
        this.heard = body;
    }
    foot(wtf) {
        console.log(`这个人有${wtf}条腿`);
    }
}
let nmw = new niumowang("mmp");
console.log(nmw.heard);
