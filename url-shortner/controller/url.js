const {nanoid} = require("nanoid");
const URL = require("../models/url");
const id=nanoid(8)

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({
      err: "url is required",
    });
  }

  await URL.create({
    shortId:id,
    redirectURl:body.url,
    vistHistory:[]
  })

  res.json({
    id:id
  })
}

async function handleGetAnalytics(req,res) {
    const shortId=req.params.shortId
    const result=await URL.findOne({shortId})
    return res.json({totalCLicks:result.vistHistory.length,analytics:result.vistHistory})
    
}

module.exports={handleGenerateNewShortURL,handleGetAnalytics}