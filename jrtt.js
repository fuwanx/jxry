/*
github：https://github.com/ZhiYi-N/script
boxjs：https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/ZhiYi-N.boxjs.json
转载留个名字，谢谢
邀请码：1344591998
我的--输入邀请码，立得一元，直接提现，谢谢
作者：执意ZhiYi-N
目前包含：
签到
开首页宝箱
读文章30篇（具体效果自测）
开农场宝箱
农场浇水
done 农场离线奖励(农场宝箱开完后，需要进农场再运行脚本才能开，有点问题)
##通过农场浇水激活上线，达到获取理想奖励目的，目前测试每天的离线奖励足够开启农场5个宝箱，不需要做其他任务，具体情况看后期是否需要，再添加除虫，开地，施肥，三餐奖励以及农场签到活动
20点睡觉，获取完全后（3600）或睡觉12小时，自动醒来（防止封号）
done自动收取睡觉金币action异常
##请重新获取signkey，目前已经修复(signkey)都要用Accept-Encoding开头
脚本初成，非专业人士制作，欢迎指正
#右上角签到即可获取签到cookie
#进一次农场即可获取农场cookie
#读文章弹出金币获取读文章cookie

action会出问题依旧，我一个停止睡觉不收金币，一个收金币不停止睡觉
可以在代理工具每天8点cron运行一下，确保万无一失
ACTION YML
JRTTSIGNURL-signurl
JRTTSIGNKEY-signkey（以x-tt-trace-id开头）
JRTTFARMURL-farmurl
JRTTFARMKEY-farmkey
JRTTREADURL-readurl
JRTTREADKEY-readkey
JRTTCOLLECT-signkey（以Accepting-Encoding开头）


[mitm]
hostname = api3-normal-c-*.snssdk.com
#圈x
[rewrite local]
^https:\/\/api3-normal-c-\w+\.snssdk\.com\/score_task\/v1\/task\/(sign_in|get_read_bonus) url script-request-header https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/Scripts/jrtt.js
^https:\/\/api3-normal-c-\w+\.snssdk\.com\/ttgame\/game_farm\/home_info url script-request-header https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/Scripts/jrtt.js
[task]
5,35 8-23 * * * https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/Scripts/jrtt.js, tag=今日头条极速版, enabled=true
#loon
http-request ^https:\/\/api3-normal-c-\w+\.snssdk\.com\/score_task\/v1\/task\/(sign_in|get_read_bonus) script-path=https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/Scripts/jrtt.js, requires-body=true, timeout=10, tag=今日头条极速版sign
http-request ^https:\/\/api3-normal-c-\w+\.snssdk\.com\/ttgame\/game_farm\/home_info script-path=https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/Scripts/jrtt.js, requires-body=true, timeout=10, tag=今日头条极速版farm
cron "5,35 8-23 * * *" script-path=https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/Scripts/jrtt.js, tag=今日头条极速版
#surge
jrttsign = type=http-request,pattern=^https:\/\/api3-normal-c-\w+\.snssdk\.com\/score_task\/v1\/task\/(sign_in|get_read_bonus),requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/Scripts/jrtt.js,script-update-interval=0
jrttfarm = type=http-request,pattern=^https:\/\/api3-normal-c-\w+\.snssdk\.com\/ttgame\/game_farm\/home_info,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/Scripts/jrtt.js,script-update-interval=0
jrtt = type=cron,cronexp="5,35 8-23 * * *",wake-system=1,script-path=https://raw.githubusercontent.com/ZhiYi-N/Private-Script/master/Scripts/jrtt.js,script-update-interval=0
*/
const jsname='今日头条极速版'
const $ = Env(jsname)
const notify = $.isNode() ?require('./sendNotify') : '';
const signurlArr = [],signkeyArr=[]
const farmurlArr = [],farmkeyArr=[]
const readurlArr = [],readkeyArr=[]
let signurl = $.getdata('version_code=8.2.2&caid1=aed1182d799519cc037b8a6c8c3d138d&tma_jssdk_version=2.5.0.2&app_name=news_article_lite&vid=D988F0EA-1FA0-46F0-965B-F302086A5D01&device_id=69250698476&channel=App%20Store&resolution=828*1792&aid=35&ab_version=1859936,668908,2678483,668905,2678447,668906,2678455,668904,2678438,668903,2678473,668907,2648771,2678479,2571774&review_flag=0&update_version_code=82208&openudid=f8baebedfc4290091877c9357be4cc8329c38c1f&pos=5pe9vb/88Pzt3vTp5L+9p72/dRAbdAo1v7GXvb2//vTp5L+9p72/dRAbdAo1v7GXvb2/8fLz+vTp6Pn4v72nvaysr7Ovra+sraSkrKqorqmqrrGXvb2/8fzp9Ono+fi/vae9rqyzramppK6trayura+tpa6osZe9vb/88Pzt0fzp9Ono+fi/vae9rqyzramppK6trayura+tpa6osZe9vb/88Pzt0fLz+vTp6Pn4v72nvaysr7Ovra+sraSkrKqorqmqrrGXvb2/8fL+/PHC8fzp+O7pwu3y7r+9p73ml729vb2/6fTw+O7p/PDtv72nvayrrKSrpaippKmzrKuprqyspLGXvb29vb/t7/Lr9PP++L+9p72/eyQLeBEKv7GXvb29vb/+9Onkv72nvb91EBt0CjW/sZe9vb29v/7y8u/59PP86fjL/PHo+O6/vae95pe9vb29vb2/8fLz+vTp6Pn4v72nvaysr7Ovra+sraSkrKqorqmqrrGXvb29vb29v/H86fTp6Pn4v72nva6ss62pqaSura2srq2vraWuqJe9vb294LGXvb29vb/8+fnv+O7uv72nvb97JAt4EQp6ARx1EBt0CjV4JR95JQF4MwB4ESe/l7294Jfg&cdid=EEEDEC32-0909-467D-ADFE-D1EABC917CCA&idfv=D988F0EA-1FA0-46F0-965B-F302086A5D01&ac=WIFI&os_version=14.4.2&ssmix=a&device_platform=iphone&caid2=&iid=2955936660728904&ab_client=a1,f2,f7,e1&device_type=iPhone%20XR&idfa=36495767-4E40-42B1-BF85-095CDFC92966')
let signkey = $.getdata('{"Accept-Encoding":"gzip, deflate","x-Tt-Token":"002599aeaf1ea85bccbe9193a412bc99c404ce6386df96e295f05bcc70ac209e2955d80cd9f5f9b260e53baefcf015a8df739eca07704f9599c743137dc7d4b3b0507fcc856a17090e38d9d64764848a55afb7d2a653935808064c837ed733e748c3c-1.0.1","Host":"api3-normal-lf.toutiaoapi.com","X-Ladon":"aiHfUC3KVwzsIth1jzfFKZK7JPCFbJq+9dA2QbeZTxmw6dDe","x-tt-dt":"AAAYOL2UITBYP45I7SNVVELPAGKZZOAKQKTAHN2YN3VHJRTTU7Z7BIYWABNCYG63QOK457P3ZU55O2CFMS55TBNWVPRPY6MZ7VKYXXWCUGGFUUZU722TJKMCDSJ3E","x-tt-trace-id":"00-1ccba9450a101fa9ccec7087931b0023-1ccba9450a101fa9-01","passport-sdk-version":"5.12.1","X-Khronos":"1619685779","Connection":"keep-alive","X-SS-Cookie":"d_ticket=ac2e41951ef6d0ba63c4af8fa673b9b49716a; n_mh=0jq_lk5fSaTeRLEQyaB_1I5Da_jSJahNCtDv7pppoRE; odin_tt=cff067feecb243e66d89cd0a653d8a37664968e4498356a1820a087fcbcbe484bd9c21529321c3db29ce6cfce420e9e6c1340dc42ee88a9aa07367a4f581a0da; sessionid=2599aeaf1ea85bccbe9193a412bc99c4; sessionid_ss=2599aeaf1ea85bccbe9193a412bc99c4; sid_guard=2599aeaf1ea85bccbe9193a412bc99c4%7C1619685557%7C5184000%7CMon%2C+28-Jun-2021+08%3A39%3A17+GMT; sid_tt=2599aeaf1ea85bccbe9193a412bc99c4; uid_tt=b6dbf58cf02e2315bfdd570831e09b42; uid_tt_ss=b6dbf58cf02e2315bfdd570831e09b42; passport_csrf_token=aaa438e25f830dbe358d987c03502d55; passport_csrf_token_default=aaa438e25f830dbe358d987c03502d55; install_id=2955936660728904; ttreq=1$6a841dc9fa48760b37aad50e50afa83cda7fbf7c","X-SS-STUB":"D41D8CD98F00B204E9800998ECF8427E","User-Agent":"NewsLite 8.2.2 rv:8.2.2.08 (iPhone; iOS 14.4.2; zh_CN) Cronet","Content-Type":"application/json; encoding=utf-8","X-Argus":"bNaq7+ldzMikYzIdVpvmH+RUp3SIeIJ+JzZACElBkTMwGPORppVjrmFdMq+N2/DzlctoUIBrG4aZJtYgX7Mc41KdCXf+apq5/egqYUibjHcSKkUmfCN2kKPWzI4mfW1Vk/HPUmzN32Z+dh4MeKzjdrYsZ8ZdAPzFZYxVJNzanDuv+G62mL3bwIqltfEMgH7nGHkExhxm1ER+L3xsDabeGBT28bFef2szRVUfWLlYRcf/dh4+m/rjeDymb5Lf9oNpXFs=","Accept":"application/json","sdk-version":"2","X-SS-DP":"35","tt-request-time":"1619685779402","Cookie":"install_id=2955936660728904; ttreq=1$6a841dc9fa48760b37aad50e50afa83cda7fbf7c; gftoken=MjY5MzIxNDM4NnwxNjE5Njg1NTQwOTN8fDAGBgYGBgY; passport_csrf_token_default=aaa438e25f830dbe358d987c03502d55; passport_csrf_token=aaa438e25f830dbe358d987c03502d55; n_mh=0jq_lk5fSaTeRLEQyaB_1I5Da_jSJahNCtDv7pppoRE; d_ticket=ac2e41951ef6d0ba63c4af8fa673b9b49716a; sid_guard=2599aeaf1ea85bccbe9193a412bc99c4%7C1619685557%7C5184000%7CMon%2C+28-Jun-2021+08%3A39%3A17+GMT; uid_tt=b6dbf58cf02e2315bfdd570831e09b42; uid_tt_ss=b6dbf58cf02e2315bfdd570831e09b42; sid_tt=2599aeaf1ea85bccbe9193a412bc99c4; sessionid=2599aeaf1ea85bccbe9193a412bc99c4; sessionid_ss=2599aeaf1ea85bccbe9193a412bc99c4; odin_tt=cff067feecb243e66d89cd0a653d8a37664968e4498356a1820a087fcbcbe484bd9c21529321c3db29ce6cfce420e9e6c1340dc42ee88a9aa07367a4f581a0da","Content-Length":"0","X-Gorgon":"8404e09a0000ac20926bb30dac648eb477a8be5610290e3dbd89"}')

let farmurl = $.getdata('device_id=69250698476&device_platform=iphone&aid=35&os_version=14.4.2&update_version_code=82208&tma_jssdk_version=2.5.0.2&sid=&version_code=8.2.2&install_id=2955936660728904&app_name=news_article_lite&device_type=iPhone%20XR&channel=App%20Store&host_app_name=undefined&activity_id=&credit_type=&use_tomato=0&ios_new_version=true')
let farmkey = $.getdata('{"X-SS-DP":"35","Connection":"keep-alive","x-tt-trace-id":"00-1ccb440e0a101fa9ccecf92ab6360023-1ccb440e0a101fa9-01","X-SS-Cookie":"MONITOR_WEB_ID=65662575-3d86-48f7-979b-4d6045d47987; d_ticket=ac2e41951ef6d0ba63c4af8fa673b9b49716a; n_mh=0jq_lk5fSaTeRLEQyaB_1I5Da_jSJahNCtDv7pppoRE; odin_tt=cff067feecb243e66d89cd0a653d8a37664968e4498356a1820a087fcbcbe484bd9c21529321c3db29ce6cfce420e9e6c1340dc42ee88a9aa07367a4f581a0da; sessionid=2599aeaf1ea85bccbe9193a412bc99c4; sessionid_ss=2599aeaf1ea85bccbe9193a412bc99c4; sid_guard=2599aeaf1ea85bccbe9193a412bc99c4%7C1619685557%7C5184000%7CMon%2C+28-Jun-2021+08%3A39%3A17+GMT; sid_tt=2599aeaf1ea85bccbe9193a412bc99c4; uid_tt=b6dbf58cf02e2315bfdd570831e09b42; uid_tt_ss=b6dbf58cf02e2315bfdd570831e09b42; passport_csrf_token=aaa438e25f830dbe358d987c03502d55; passport_csrf_token_default=aaa438e25f830dbe358d987c03502d55; install_id=2955936660728904; ttreq=1$6a841dc9fa48760b37aad50e50afa83cda7fbf7c","sdk-version":"2","Accept-Encoding":"gzip, deflate","Content-Type":"application/json","x-Tt-Token":"002599aeaf1ea85bccbe9193a412bc99c404ce6386df96e295f05bcc70ac209e2955d80cd9f5f9b260e53baefcf015a8df739eca07704f9599c743137dc7d4b3b0507fcc856a17090e38d9d64764848a55afb7d2a653935808064c837ed733e748c3c-1.0.1","X-Ladon":"bDyAYYQ0P1h1dz2zz11bDjGLiZmCP25e7wyfc9c7XjB/HDrU","X-Khronos":"1619685753","X-Argus":"qMOXWtK0OQ10qFXeK9boSYQjysRQqz5BVU9WhEY8yc5NXobbNy2AvOhd8ltKVl8ipHkOUJgSWj9hnKZFRaI16bBvCf4Msf7uOhss94COD0glJverd+sDj/OLISQ61PXRT2mnH1C2IilIv9IzHwgmqCDWIEqjxK47Lw0uixOboiAOvZnGJr7oAU+Qf2oEzloPN7T2CgO6Uy4kaFnu9uh4irL3H4VYeAFkbsjazrgFhXdZXrZx53kgX6AeccJFIniyhAY=","User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 NewsArticle/8.2.2.08 JsSdk/2.0 NetType/WIFI (NewsLite 8.2.2 14.400000) NewsLite/8.2.2 Mobile ToutiaoMicroApp/2.5.0.2","tt-request-time":"1619685753493","Cookie":"d_ticket=ac2e41951ef6d0ba63c4af8fa673b9b49716a;n_mh=0jq_lk5fSaTeRLEQyaB_1I5Da_jSJahNCtDv7pppoRE;odin_tt=cff067feecb243e66d89cd0a653d8a37664968e4498356a1820a087fcbcbe484bd9c21529321c3db29ce6cfce420e9e6c1340dc42ee88a9aa07367a4f581a0da;sessionid=2599aeaf1ea85bccbe9193a412bc99c4;sessionid_ss=2599aeaf1ea85bccbe9193a412bc99c4;sid_guard=2599aeaf1ea85bccbe9193a412bc99c4%7C1619685557%7C5184000%7CMon%2C+28-Jun-2021+08%3A39%3A17+GMT;sid_tt=2599aeaf1ea85bccbe9193a412bc99c4;uid_tt=b6dbf58cf02e2315bfdd570831e09b42;uid_tt_ss=b6dbf58cf02e2315bfdd570831e09b42;passport_csrf_token=aaa438e25f830dbe358d987c03502d55;passport_csrf_token_default=aaa438e25f830dbe358d987c03502d55;install_id=2955936660728904;ttreq=1$6a841dc9fa48760b37aad50e50afa83cda7fbf7c;MONITOR_WEB_ID=65662575-3d86-48f7-979b-4d6045d47987","Host":"api3-normal-lf.toutiaoapi.com","x-tt-dt":"AAAYOL2UITBYP45I7SNVVELPAGKZZOAKQKTAHN2YN3VHJRTTU7Z7BIYWABNCYG63QOK457P3ZU55O2CFMS55TBNWVPRPY6MZ7VKYXXWCUGGFUUZU722TJKMCDSJ3E","passport-sdk-version":"5.12.1","Referer":"https://tmaservice.developer.toutiao.com/?appid=tta539d3843a134f3d&version=1.2.28","X-Gorgon":"8404c049000009e2d28ba6237d6b432b35b4ca63bb987f661e87"}')

let readurl = $.getdata('version_code=8.2.2&caid1=aed1182d799519cc037b8a6c8c3d138d&tma_jssdk_version=2.5.0.5&app_name=news_article_lite&vid=D988F0EA-1FA0-46F0-965B-F302086A5D01&device_id=69250698476&channel=App%20Store&resolution=828*1792&aid=35&ab_version=1859936,668908,2678483,668905,2678447,668906,2678455,668904,2678438,668903,2678473,668907,2648771,2678479,2571774&review_flag=0&update_version_code=82208&openudid=f8baebedfc4290091877c9357be4cc8329c38c1f&pos=5pe9vb/88Pzt3vTp5L+9p72/dRAbdAo1v7GXvb2//vTp5L+9p72/dRAbdAo1v7GXvb2/8fLz+vTp6Pn4v72nvaysr7Ovra+sraSkrKqorqmqrrGXvb2/8fzp9Ono+fi/vae9rqyzramppK6trayura+tpa6osZe9vb/88Pzt0fzp9Ono+fi/vae9rqyzramppK6trayura+tpa6osZe9vb/88Pzt0fLz+vTp6Pn4v72nvaysr7Ovra+sraSkrKqorqmqrrGXvb2/8fL+/PHC8fzp+O7pwu3y7r+9p73ml729vb2/6fTw+O7p/PDtv72nvayrrKSrpaippKmzrKuprqyspLGXvb29vb/t7/Lr9PP++L+9p72/eyQLeBEKv7GXvb29vb/+9Onkv72nvb91EBt0CjW/sZe9vb29v/7y8u/59PP86fjL/PHo+O6/vae95pe9vb29vb2/8fLz+vTp6Pn4v72nvaysr7Ovra+sraSkrKqorqmqrrGXvb29vb29v/H86fTp6Pn4v72nva6ss62pqaSura2srq2vraWuqJe9vb294LGXvb29vb/8+fnv+O7uv72nvb97JAt4EQp6ARx1EBt0CjV4JR95JQF4MwB4ESe/l7294Jfg&cdid=EEEDEC32-0909-467D-ADFE-D1EABC917CCA&idfv=D988F0EA-1FA0-46F0-965B-F302086A5D01&ac=WIFI&os_version=14.4.2&ssmix=a&device_platform=iphone&caid2=&iid=2955936660728904&ab_client=a1,f2,f7,e1&device_type=iPhone%20XR&idfa=36495767-4E40-42B1-BF85-095CDFC92966&group_id=6956392162560852487')
let readkey = $.getdata('{"x-tt-trace-id":"00-1ccac64b0a101fa9cceca1a1ec780023-1ccac64b0a101fa9-01","Connection":"keep-alive","X-SS-DP":"35","X-SS-Cookie":"d_ticket=ac2e41951ef6d0ba63c4af8fa673b9b49716a; n_mh=0jq_lk5fSaTeRLEQyaB_1I5Da_jSJahNCtDv7pppoRE; odin_tt=cff067feecb243e66d89cd0a653d8a37664968e4498356a1820a087fcbcbe484bd9c21529321c3db29ce6cfce420e9e6c1340dc42ee88a9aa07367a4f581a0da; sessionid=2599aeaf1ea85bccbe9193a412bc99c4; sessionid_ss=2599aeaf1ea85bccbe9193a412bc99c4; sid_guard=2599aeaf1ea85bccbe9193a412bc99c4%7C1619685557%7C5184000%7CMon%2C+28-Jun-2021+08%3A39%3A17+GMT; sid_tt=2599aeaf1ea85bccbe9193a412bc99c4; uid_tt=b6dbf58cf02e2315bfdd570831e09b42; uid_tt_ss=b6dbf58cf02e2315bfdd570831e09b42; passport_csrf_token=aaa438e25f830dbe358d987c03502d55; passport_csrf_token_default=aaa438e25f830dbe358d987c03502d55; install_id=2955936660728904; ttreq=1$6a841dc9fa48760b37aad50e50afa83cda7fbf7c","sdk-version":"2","Accept-Encoding":"gzip, deflate","X-Ladon":"EW3OFfGNrwmeKgf8fRlKlsieeOxgyH48sVYC6q26rkADFkXP","x-Tt-Token":"002599aeaf1ea85bccbe9193a412bc99c404ce6386df96e295f05bcc70ac209e2955d80cd9f5f9b260e53baefcf015a8df739eca07704f9599c743137dc7d4b3b0507fcc856a17090e38d9d64764848a55afb7d2a653935808064c837ed733e748c3c-1.0.1","X-Khronos":"1619685721","X-Argus":"p7EzLiPsiAiYEIyWFlnkEMPNvlVDY5aPLxIaw+H9a1wEqGj4Gs7G5JSA6THTHw609H7Isj4a/E0W/qaK89c4C+oigDlULR9jpV0RF+4rqVA1Y6JvHqdoq+eRuTIDUU0gOatZ3TRNCnqq2sgblZNf+GRAYOkFW/asCwOqmnR4Qpb0f16/eQQ5/bdW2AiVRv/feCraBxtuXSqLEeXT6LognxYFLLFJxVXAdlvw9d/9TnY1hI35BpjzBX5//2SZpVz/Q9c=","User-Agent":"NewsLite 8.2.2 rv:8.2.2.08 (iPhone; iOS 14.4.2; zh_CN) Cronet","tt-request-time":"1619685721297","Cookie":"install_id=2955936660728904; ttreq=1$6a841dc9fa48760b37aad50e50afa83cda7fbf7c; gftoken=MjY5MzIxNDM4NnwxNjE5Njg1NTQwOTN8fDAGBgYGBgY; passport_csrf_token_default=aaa438e25f830dbe358d987c03502d55; passport_csrf_token=aaa438e25f830dbe358d987c03502d55; n_mh=0jq_lk5fSaTeRLEQyaB_1I5Da_jSJahNCtDv7pppoRE; d_ticket=ac2e41951ef6d0ba63c4af8fa673b9b49716a; sid_guard=2599aeaf1ea85bccbe9193a412bc99c4%7C1619685557%7C5184000%7CMon%2C+28-Jun-2021+08%3A39%3A17+GMT; uid_tt=b6dbf58cf02e2315bfdd570831e09b42; uid_tt_ss=b6dbf58cf02e2315bfdd570831e09b42; sid_tt=2599aeaf1ea85bccbe9193a412bc99c4; sessionid=2599aeaf1ea85bccbe9193a412bc99c4; sessionid_ss=2599aeaf1ea85bccbe9193a412bc99c4; odin_tt=cff067feecb243e66d89cd0a653d8a37664968e4498356a1820a087fcbcbe484bd9c21529321c3db29ce6cfce420e9e6c1340dc42ee88a9aa07367a4f581a0da","Host":"api3-normal-lf.toutiaoapi.com","x-tt-dt":"AAAYOL2UITBYP45I7SNVVELPAGKZZOAKQKTAHN2YN3VHJRTTU7Z7BIYWABNCYG63QOK457P3ZU55O2CFMS55TBNWVPRPY6MZ7VKYXXWCUGGFUUZU722TJKMCDSJ3E","passport-sdk-version":"5.12.1","X-Gorgon":"8404e03b00006af6032f686ebafb66a30ea5e230909e1fa8a528"}')
//var articles =''
let tz = ($.getval('tz') || '1');//0关闭通知，1默认开启
const invit=1;//新用户自动邀请，0关闭，1默认开启
const logs =0;//0为关闭日志，1为开启
var coins=''
var article =''
var collect = ''
var invited =''
var hour=''
var minute=''
if ($.isNode()) {
   hour = new Date( new Date().getTime() + 8 * 60 * 60 * 1000 ).getHours();
   minute = new Date( new Date().getTime() + 8 * 60 * 60 * 1000 ).getMinutes();
}else{
   hour = (new Date()).getHours();
   minute = (new Date()).getMinutes();
}
//CK运行

let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
   GetCookie();
   $.done()
} 
if ($.isNode()) {
//sign
  if (process.env.JRTTSIGNURL && process.env.JRTTSIGNURL.indexOf('#') > -1) {
   signurl = process.env.JRTTSIGNURL.split('#');
   console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.JRTTSIGNURL && process.env.JRTTSIGNURL.indexOf('\n') > -1) {
   signurl = process.env.JRTTSIGNURL.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   signurl = process.env.JRTTSIGNURL.split()
  };
  if (process.env. JRTTSIGNKEY&& process.env.JRTTSIGNKEY.indexOf('#') > -1) {
   signkey = process.env.JRTTSIGNKEY.split('#');
  }
  else if (process.env.JRTTSIGNKEY && process.env.JRTTSIGNKEY.split('\n').length > 0) {
   signkey = process.env.JRTTSIGNKEY.split('\n');
  } else  {
   signkey = process.env.JRTTSIGNKEY.split()
  };
//farm
if (process.env.JRTTFARMURL && process.env.JRTTFARMURL.indexOf('#') > -1) {
   farmurl = process.env.JRTTFARMURL.split('#');
   console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.JRTTFARMURL && process.env.JRTTFARMURL.indexOf('\n') > -1) {
   farmurl = process.env.JRTTFARMURL.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   farmurl = process.env.JRTTFARMURL.split()
  };
  if (process.env. JRTTFARMKEY&& process.env.JRTTFARMKEY.indexOf('#') > -1) {
   farmkey = process.env.JRTTFARMKEY.split('#');
  }
  else if (process.env.JRTTFARMKEY && process.env.JRTTFARMKEY.split('\n').length > 0) {
   farmkey = process.env.JRTTFARMKEY.split('\n');
  } else  {
   farmkey = process.env.JRTTFARMKEY.split()
  };
//read
if (process.env.JRTTREADURL && process.env.JRTTREADURL.indexOf('#') > -1) {
   readurl = process.env.JRTTREADURL.split('#');
   console.log(`您选择的是用"#"隔开\n`)
  }
  else if (process.env.JRTTREADURL && process.env.JRTTREADURL.indexOf('\n') > -1) {
   readurl = process.env.JRTTREADURL.split('\n');
   console.log(`您选择的是用换行隔开\n`)
  } else {
   readurl = process.env.JRTTREADURL.split()
  };
  if (process.env. JRTTREADKEY&& process.env.JRTTREADKEY.indexOf('#') > -1) {
   readkey = process.env.JRTTREADKEY.split('#');
  }
  else if (process.env.JRTTREADKEY && process.env.JRTTREADKEY.split('\n').length > 0) {
   readkey = process.env.JRTTREADKEY.split('\n');
  } else  {
   readkey = process.env.JRTTREADKEY.split()
  };
//sign
  Object.keys(signurl).forEach((item) => {
        if (signurl[item]) {
          signurlArr.push(signurl[item])
        }
    });
    Object.keys(signkey).forEach((item) => {
        if (signkey[item]) {
          signkeyArr.push(signkey[item])
        }
    });
//farm
Object.keys(farmurl).forEach((item) => {
        if (farmurl[item]) {
          farmurlArr.push(farmurl[item])
        }
    });
    Object.keys(farmkey).forEach((item) => {
        if (farmkey[item]) {
          farmkeyArr.push(signkey[item])
        }
    });
//read
Object.keys(readurl).forEach((item) => {
        if (readurl[item]) {
          readurlArr.push(readurl[item])
        }
    });
    Object.keys(readkey).forEach((item) => {
        if (readkey[item]) {
          readkeyArr.push(readkey[item])
        }
    });
    console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
    console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
 } else {
    signurlArr.push($.getdata('signurl'))
    signkeyArr.push($.getdata('signkey'))
    farmurlArr.push($.getdata('farmurl'))
    farmkeyArr.push($.getdata('farmkey'))
    readurlArr.push($.getdata('readurl'))
    readkeyArr.push($.getdata('readkey'))
    let jrttcount = ($.getval('jrttcount') || '1');
  for (let i = 2; i <= jrttcount; i++) {
    signurlArr.push($.getdata(`signurl${i}`))
    signkeyArr.push($.getdata(`signkey${i}`))
    farmurlArr.push($.getdata(`farmurl${i}`))
    farmkeyArr.push($.getdata(`farmkey${i}`))
    readurlArr.push($.getdata(`readurl${i}`))
    readkeyArr.push($.getdata(`readkey${i}`))
  }
}
!(async () => {
if (!signurlArr[0]) {
    $.msg($.name, '【提示】请先获取今日头条极速版一cookie')
    return;
  }
   console.log(`------------- 共${signurlArr.length}个账号----------------\n`)
  for (let i = 0; i < signurlArr.length; i++) {
    if (signurlArr[i]) {
      other = ''
      signurl = signurlArr[i];
      signkey = signkeyArr[i];
      farmurl = farmurlArr[i];
      farmkey = farmkeyArr[i];
      readurl = readurlArr[i];
      readkey = readkeyArr[i];
      $.index = i + 1;
      console.log(`\n开始【今日头条极速版${$.index}】`)
      await invite()
      await userinfo()
      await profit()
      await sign_in()
      await openbox()
      await reading()
      await farm_sign_in()
      await openfarmbox()
      await landwarer()
      await double_reward()
      await sleepstatus()
      await control()
      //await sleepstart()
      //await sleepstop()
      //await collectcoins(coins)
      await showmsg()
  }
 }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
function GetCookie() {
 if($request&&$request.url.indexOf("info")>=0) {
  const farmurlVal = $request.url.split(`?`)[1]
    if (farmurlVal) $.setdata(farmurlVal,
'farmurl')
    $.log(`[${jsname}] 获取farm请求: 成功,farmirlVal: ${farmurl}`)
    $.msg(`获取farmurl: 成功🎉`, ``)
   const jrttfarmKey = JSON.stringify($request.headers)
$.log(jrttfarmKey)
  if(jrttfarmKey)        $.setdata(jrttfarmKey,'farmkey')
    $.log(`[${jsname}] 获取farm请求: 成功,jrttfarmKey: ${farmkey}`)
    $.msg(`获取farmkey: 成功🎉`, ``)
}
  if($request&&$request.url.indexOf("sign_in")>=0) {
  const signurlVal = $request.url.split(`?`)[1]
    if (signurlVal) $.setdata(signurlVal,
'signurl')
    $.log(`[${jsname}] 获取sign请求: 成功,signurlVal: ${signurl}`)
    $.msg(`获取signurl: 成功🎉`, ``)
   const jrttsignKey = JSON.stringify($request.headers)
//$.log(jrttsignKey)
  if(jrttsignKey.indexOf("STUB")>=0)
    $.setdata(jrttsignKey,'signkey')
    $.log(`[${jsname}] 获取sign请求: 成功,jrttsignKey: ${signkey}`)
    $.msg(`获取signkey: 成功🎉`, ``)
}

if($request&&$request.url.indexOf("get_read_bonus")>=0) {
  const readurlVal = $request.url.split(`?`)[1]

  //const article = readurlVal.replace(/\d{3}$/,Math.floor(Math.random()*1000));
//article = article.replace(/\d{3}$/, (Math.random()*1e3).toFixed(0).padStart(3,"0"));

    if(article) $.setdata(article,
'article')
    if (readurlVal) $.setdata(readurlVal,
'readurl')
    $.log(`[${jsname}] 获取read请求: 成功,readurlVal: ${readurl}`)
    $.msg(`获取readurl: 成功🎉`, ``)
   const jrttreadKey = JSON.stringify($request.headers)
$.log(jrttreadKey)
  if(jrttreadKey)        $.setdata(jrttreadKey,'readkey')
    $.log(`[${jsname}] 获取read请求: 成功,jrttreadKey: ${readkey}`)
    $.msg(`获取readkey: 成功🎉`, ``)
    }
  }
function sign_in() {
return new Promise((resolve, reject) => {
  let sign_inurl ={
    url: `https://api3-normal-c-lq.snssdk.com/score_task/v1/task/sign_in/?${signurl}`,
    headers :JSON.parse(signkey),
      timeout: 60000,
}

   $.post(sign_inurl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
      if(result.err_no == 0) {
          other +='📣首页签到\n'
          other +='签到完成\n'
          other +='获得'+result.data.score_amount+'金币\n'
          other +='连续签到'+result.data.sign_times+'天\n'
  
}else{
          other +='📣首页签到\n'
          other +='今日已完成签到\n'
           }
          resolve()
    })
   })
  } 

async function control(){
   if(collect == 0){
      await sleepstart();
   }
   if(collect == 1){
      await sleepstop();
      await collectcoins(coins);
   }
   if(collect == 2){
      //$.log('no opreation')
      other +='\n\n生前何必久睡，死后自会长眠\n'
   }
   if(collect == 3){
      await collectcoins(coins);
   }
   if(invited == 4 && invit== 1){
      await invitation();
   }
}
function invite() {
return new Promise((resolve, reject) => {
  let inviteurl ={
    url: `https://api3-normal-c-lq.snssdk.com/score_task/v1/user/new_tabs/?${signurl}`,
    headers :JSON.parse(signkey),
      timeout: 60000,
}

   $.get(inviteurl,(error, response, data) =>{
     const result = JSON.parse(data)
      if(logs)$.log(data)
      if(result.data.section[10].key=='mine_input_code') {
          invited=4;
           }else{
          invited=5;
}
          resolve()
    })
   })
  } 
function invitation() {
return new Promise((resolve, reject) => {
  let invitatonurl ={
    url: `https://api3-normal-c-lq.snssdk.com/luckycat/lite/v1/invite/post_invite_code/?_request_from=web&device_platform=ios&ac=4G&${signurl}`,
    headers :JSON.parse(farmkey),
      timeout: 60000,
    body: JSON.stringify({"invitecode" : "1980436898"})
}

   $.post(invitatonurl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs)$.log(data)
          resolve()
    })
   })
  } 

function userinfo() {
return new Promise((resolve, reject) => {
  let userinfourl ={
    url: `https://api3-normal-c-hl.snssdk.com/passport/account/info/v2/?${signurl}`,
    headers :JSON.parse(signkey),
      timeout: 60000,
}

   $.get(userinfourl,(error, response, data) =>{
     const result = JSON.parse(data)
      //$.log(signurl+'\n'+signkey+'\n'+farmurl+'\n'+farmkey+'\n'+readurl+'\n'+readkey)
       if(logs) $.log(data)
      if(result.message == 'success') {
          other +='🎉'+result.data.name+'\n'
  
}     else if(result.message == 'error'){
          other += '⚠️异常:'+result.data.description+'\n'
           }else{
          other += '⚠️异常'
}
          resolve()
    })
   })
  } 

function profit() {
return new Promise((resolve, reject) => {
  let profiturl ={
    url: `https://api3-normal-c-lq.snssdk.com/score_task/v1/user/info/?${signurl}`,
    headers :JSON.parse(signkey),
      timeout: 60000,
}

   $.get(profiturl,(error, response, data) =>{
     const result = JSON.parse(data)
        if(logs)$.log(data)
      if(result.err_no == 0) {
          other +='🎉金币收益:'+result.data.score.amount+'\n🎉估计兑换现金:'+(result.data.score.amount/30000).toFixed(2)+'\n🎉'+'现金收益:'+result.data.cash.amount+'\n'      
}else{
          other += '⚠️异常\n'
           }
          resolve()
    })
   })
  } 

//文章阅读30篇每天
function reading() {
const articles = readurl.replace(/\d{3}$/,Math.floor(Math.random()*1000));
return new Promise((resolve, reject) => {
  let readurl ={
    url: `https://api3-normal-c-lq.snssdk.com/score_task/v1/task/get_read_bonus/?${articles}`,
    headers :JSON.parse(signkey),
      timeout: 60000,
}

   $.post(readurl,(error, response, data) =>{
     const result = JSON.parse(data)
      if(logs)  $.log(data)
      other +='📣文章阅读\n'
      if(result.err_no == 0) {
          other +='阅读完成'
          other +='获得'+result.data.score_amount+'金币\n'
          other +='阅读进度'+result.data.icon_data.done_times+'/'+result.data.icon_data.read_limit+'\n'
      }
       if(result.err_no == 4){
          other +='文章阅读已达上限\n'
        }
       if(result.err_no == 1028){
          other +='这篇文章已经读过了\n'
        }
          resolve()
    })
   })
  } 
//农场签到
function farm_sign_in() {
return new Promise((resolve, reject) => {
  let farm_sign_inurl ={
    url: `https://api3-normal-c-lq.snssdk.com/ttgame/game_farm/reward/sign_in?watch_ad=1&${signurl}`,
    headers :JSON.parse(farmkey),
      timeout: 60000,
}

   $.get(farm_sign_inurl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
       other +='📣农场签到\n'
      if(result.status_code == 0) {
          other +='签到完成\n'
         
}else{
          other +=result.message+'\n'
           }
          resolve()
    })
   })
  } 

function openbox() {
return new Promise((resolve, reject) => {
  let openboxurl ={
    url: `https://it-lq.snssdk.com/score_task/v1/task/open_treasure_box/?${signurl}`,
    headers :JSON.parse(signkey),
      timeout: 60000,
}

   $.post(openboxurl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
       other +='📣首页宝箱\n'
      if(result.err_no == 0) {
        other += '开启成功'
        other += '获得金币'+result.data.score_amount+'个\n'
        }
      else{
         if(result.err_no == 9){
        other += result.err_tips+'\n'
        }else{
        other +="不在开宝箱时间\n"
           }
    }
          resolve()
    })
   })
  }  


function openfarmbox() {
return new Promise((resolve, reject) => {
  let openfarmboxurl ={
    url: `https://api3-normal-c-lq.snssdk.com/ttgame/game_farm/box/open?${farmurl}`,
    headers :JSON.parse(farmkey),
      timeout: 60000,
}

   $.get(openfarmboxurl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
       other +='📣农场宝箱\n'
      if(result.status_code == 0) {
        other += "第"+(5-result.data.box_num)+"开启成功"
        other += "还可以开启"+result.data.box_num+"个\n"
        }
      else if(result.status_code == 5003){
        other +="已全部开启\n"
        }
          resolve()
    })
   })
  }  
function landwarer() {
return new Promise((resolve, reject) => {
  let landwaterurl ={
    url: `https://api3-normal-c-lq.snssdk.com/ttgame/game_farm/land_water?tentimes=0${farmurl}`,
    headers :JSON.parse(farmkey),
      timeout: 60000,
}

   $.get(landwaterurl,(error, response, data) =>{
     const result = JSON.parse(data)
        if(logs)$.log(data)
       other +='📣农场浇水\n'
      if(result.status_code == '0') {
        other += result.message+'\n'
        other += '💧水滴剩余'+result.data.water+'\n'
        }
      else{
        other +=result.message+'\n'
           }
          resolve()
    })
   })
  } 
//done 这个离线奖励当宝箱全部开完后，需要进入农场再运行脚本，才能获取离线奖励，应该有一个判定，目前没有找到
//利用浇水激活进农场状态获取离线奖励，目前测试每天离线奖励足够开启农场5个宝箱，不需要做游戏加快生产，具体情况看后期是否需要，再考虑加做除虫，开地，三餐奖励
function double_reward() {
return new Promise((resolve, reject) => {
  let double_rewardurl ={
    url: `https://api3-normal-c-lq.snssdk.com/ttgame/game_farm/double_reward?watch_ad=1&${farmurl}`,
    headers :JSON.parse(farmkey),
      timeout: 60000,
}

   $.get(double_rewardurl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
        other +='📣农场视频双倍离线奖励\n'
      if(result.status_code == 0) {
        other += '获得成功\n'
        }else if(result.status_code==5033){
            other += result.message+'\n'
          }
        else{
        other +='📣农场视频双倍离线奖励\n'
        other +="无离线产量可领取\n"
           }
          resolve()
    })
   })
  }  


//睡觉状态
function sleepstatus() {
return new Promise((resolve, reject) => {
  let sleepstatusurl ={
    url: `https://api3-normal-c-lq.snssdk.com/luckycat/lite/v1/sleep/status/?_request_from=web&${signurl}`,
    headers :JSON.parse(signkey),
      timeout: 60000,
}

   $.get(sleepstatusurl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs)$.log(data)
      if(result.err_no == 0) {
          other +='📣查询睡觉状态\n🎉查询'+result.err_tips+'\n'
           }
      if(result.data.sleeping == false){
          other +='当前状态:清醒着呢\n'
        if(hour >= 20||hour<=2){
           collect=0 //await sleepstart()
           }else{
if(result.data.history_amount!==0){ 
//即使没有满足3600也在睡觉12小时后停止，以防封号
         coins=result.data.history_amount
         collect =3 //collect coins
          }else{
         collect=2
}
}}
          else{
         other  +='当前状态:酣睡中,已睡'+parseInt(result.data.sleep_last_time/3600)+'小时'+parseInt((result.data.sleep_last_time%3600)/60)+'分钟'+parseInt((result.data.sleep_last_time%3600)%60)+'秒\n'
          other +='预计可得金币'+result.data.sleep_unexchanged_score+'\n'
          coins=result.data.sleep_unexchanged_score
         if(result.data.sleep_unexchanged_score == 3600 || parseInt(result.data.sleep_last_time/3600) == 12){ 
//即使没有满足3600也在睡觉12小时后停止，以防封号
         collect =1 //collect coins&sleepstop
          }else{
         collect =2
}
   
     }
          resolve()
    })
   })
  } 
//开始睡觉
function sleepstart() {
return new Promise((resolve, reject) => {
  let sleepstarturl ={
    url: `https://api3-normal-c-lq.snssdk.com/luckycat/lite/v1/sleep/start/?_request_from=web&${signurl}`,
    headers :JSON.parse(signkey),
      timeout: 60000,
}

   $.post(sleepstarturl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
      if(result.err_no == 0) {
          other +='📣开始睡觉\n该睡觉了，开始睡觉'+result.err_tips+'\n'
  
}     else if(result.err_no == 1052){
          other +='📣开始睡觉\n'+result.err_tips+'\n'
           }else{
          other += '📣开始睡觉:'+'⚠️异常'
}
          resolve()
    })
   })
  } 
//停止睡觉
function sleepstop() {
return new Promise((resolve, reject) => {
  let sleepstopurl ={
    url: `https://api3-normal-c-lq.snssdk.com/luckycat/lite/v1/sleep/stop/?_request_from=web&${signurl}`,
    headers :JSON.parse(signkey),
      timeout: 60000,
}

   $.post(sleepstopurl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs) $.log(data)
      if(result.err_no == 0) {
          other +='📣停止睡觉\n'+result.err_tips+'\n'
          
}     else if(result.err_no == 1052){
          other += '📣停止睡觉\n'+'还没开始睡觉\n'
           }else{
          other +='📣停止睡觉:'+'\n⚠️异常'
}
          resolve()
    })
   })
  } 
//收取睡觉金币
function collectcoins(coins) {
return new Promise((resolve, reject) => {
  let collectcoinsurl ={
    url: `https://api3-normal-c-lq.snssdk.com/luckycat/lite/v1/sleep/done_task/?_request_from=web&device_platform=undefined&${signurl}`,
    headers :JSON.parse(farmkey),
      timeout: 60000,
    body :JSON.stringify({score_amount: coins}),

}

   $.post(collectcoinsurl,(error, response, data) =>{
     const result = JSON.parse(data)
       if(logs)$.log(data)
      if(result.err_no == 0) {
          other +='📣收取金币\n'+result.err_tips+'     获得金币:'+coins
          
}     else{
          other +='📣收取金币:'+'\n⚠️异常:'+result.err_tips+''
}
          resolve()
    })
   })
  } 
var Time = new Date(new Date().getTime() + 8 * 60 * 60 * 1000);
async function showmsg(){
if(tz==1){
    if ($.isNode()&& (Time.getHours() == 12 && Time.getMinutes() <= 20) || (Time.getHours() == 23 && Time.getMinutes() >= 40)) {
       await notify.sendNotify($.name,other)
     }else{
       $.msg(jsname,'',other)
}
   }else{
      $.log(jsname,'',other)
     }

}
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}