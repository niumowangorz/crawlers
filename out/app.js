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
class Channel {
}
exports.Channel = Channel;
class Content {
}
exports.Content = Content;
const go = () => __awaiter(this, void 0, void 0, function* () {
    const res = yield api.remote_get("http://www.gl-ns.com/");
    //加载HTML
    const $ = cheerio.load(res.text);
    let news = [];
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
                    Url: "http://www.gl-ns.com" +
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
    fs.writeFile("./text.json", JSON.stringify(news), (err) => {
        if (err) {
            return console.error(err);
        }
        fs.readFile("./text.json", (err, data) => {
            if (err) {
                return console.error(err);
            }
        });
    });
});
go();
