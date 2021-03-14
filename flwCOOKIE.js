

//独立COOKIE文件     ck在``里面填写，多账号换行
let flwurlVal= `https://passport.fanli.com/mobileapi/v4/user/getUserInfo?ref=&userid=400832481&verify_code=56f6721b6d0bb6af94aa1bfd0836b40a&c_src=1&c_v=7.17.3.1&c_aver=1.0&devid=66264883887320&abtest=63809_b-320_a-154_b-876_b-316_b-8_e-140_b-22_a-708_b-104_a-1170_a-702_b-86_b-12_b-6_b-36_j-12_d-68_c-14_a-54_a-26_a-12_b-42_a-dff2

`
let flwheaderVal= `{"Accept-Encoding":"gzip, deflate, br","Cookie":"PHPS`
let flwspbodyVal= `content=pxUCN8pFFs9Nr1CvMJZZYvFT60UAtM0b`
let flwqwbodyVal= `content=pxUCN8pFFs9Nr1CvMJZZYtcfNbpfMbjRUOBATKxOJjlrD72k0bRwOp21fHL15tpxlY5tXhtV04bcYxdu2kb0VV0IraZy%2BGu7Ss3WHemReBS7J8cJHG1pPJgJtk2abDJbDCNnjFo46DndSZkRndUZVuUkwv%2FfVTgH0naQMonx2MiYqmj8QorcDNNvWZMxSUrtA5ZBsu8PzuQ8ZmYPyR0X20qatW%2BEBp9bvp3l%2F7aRUe7ukmlfJJSuTzC%2Bd1Ejz9cjS2banW20o%2BKIueA7wk4BRCJbdzw1Ax2NxGX%2B%2FRSlDBY%3D

`
let flwydbodyVal= ``


let flwcookie = {
  flwurlVal: flwurlVal,  
  flwheaderVal: flwheaderVal,  
  flwspbodyVal: flwspbodyVal, 
  flwqwbodyVal: flwqwbodyVal, 
  flwydbodyVal: flwydbodyVal, 

}

module.exports =  flwcookie
