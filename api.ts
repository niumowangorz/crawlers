import superagent = require('superagent');
import cheerio = require('cheerio');

export const remote_get = function (url: string) {

  const promise = new Promise<superagent.Response>(function (resolve, reject) {
    superagent.get(url)
      .end(function (err, res) {
        if (!err) {
          resolve(res);
        } else {
          console.log(err)
          reject(err);
        }
      });
  });
  return promise;
}