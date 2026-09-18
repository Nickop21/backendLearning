const express=require("express")
const router=express.Router()

const {handleGenerateNewShortURL,handleGetAnalytics}=require("../controller/url")



router.route("/").post(handleGenerateNewShortURL)
router.route("/analytics/:shortId").get(handleGetAnalytics)



module.exports=router