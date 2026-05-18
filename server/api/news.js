//실제 처리하는 곳(get.post.delete...)

const axios = require("axios");
const express = require("express") 
const router = express.Router(); 
const cheerio = require('cheerio')

router.get('/', async(req, res) => {
  const {keyword} = req.query;
  const d = await axios({
    url:`https://openapi.naver.com/v1/search/news.json?query=${keyword}&display=5&start=1&sort=date`,
    method:'get',
    headers:{
        "X-Naver-Client-Id":"YnP5nbMdum9vMOQS7r6_",
        "X-Naver-Client-Secret":"KkRs9Hvx4K"
    }
  })
  //res.send(d.data)//클라이언트쪽으로 data에 담에 보내줌

  const newsList = d.data.items;
  const results = await Promise.all(
        newsList.map(async (item) => {
            const res = await axios.get(item.link, {
                            headers: {
                                "User-Agent":
                                "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                            },
                        });
            const $ = cheerio.load(res.data);
            return {
                ...item,
                image: $('meta[property="og:image"]').attr("content") || null,
            };
        })
    );
  res.send(results);
})

router.get('/detail', async (req, res) => {
    const {url} = req.query; // url 파라미터로 받기
    console.log('url', url);    
     const result = 
     await axios.get(url, 
        {
        headers: {
            "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        },
        });
    const $ = cheerio.load(result.data);

    const title = $('meta[property="og:title"]').attr("content");
    const image = $('meta[property="og:image"]').attr("content");

    const selectors = [
        "#dic_area",
        "#newsct_article",
        "#articleBodyContents",
        ".article_body",
        ".article-body",
        ".article_view",
        ".news_end",
        "._article_body",
        ".cont-body",
        ".article_con",
        ".smartOutput",
        "#article-view-content-div"
    ];

    let content = "";

  
    
    
    
    for (const selector of selectors) {

        const a =  $(selector).html()
        if (!a) continue;

        const $$ = cheerio.load(a);
        $$('script').remove();
        $$('style').remove();
        $$('iframe').remove();
        $$('ins').remove();
        $$('figure').remove();
        $$('figcaption').remove();
        $$('noscript').remove();
        $$('svg').remove();
        $$('button').remove();
        $$('a').remove();


        
    const text = $$.text().trim();
    
    if (text.length > 200) {
        content = text;
        break;
    }
    }

    res.json({
      title,
      image,
      content,
    });

})


module.exports = router; 
