

//独立COOKIE文件     ck在``里面填写，多账号换行
let GetUserInfoheaderVal= `{"Cookie":"area=420802; autoid=119a5debcca77acb1607d47ab66804ba; ref=0%7C0%7C0%7C0%7C2021-01-31+09%3A32%3A11.126%7C2021-01-06+08%3A57%3A48.123; sessionvid=A7B88F96-6DC1-4318-A0C8-2E6DB9CB1DE1; v_no=1; visit_info_ad=E243A6C5-A048-463C-B984-BD58188410F6||A7B88F96-6DC1-4318-A0C8-2E6DB9CB1DE1||-1||-1||1; ahpvno=5; app_cityid=420800; app_provinceid=420000; app_deviceid=8e88be8714ef1b48f521b809f0b1511b18c323c4; app_devicename=iPhone; app_key=autospeed_ios; app_platform=iPhone; app_sign=CC9CFE24284732C565D5DCA65C0AE3D4; app_sysver=14.3; app_userid=208386105; app_ver=1.7.1; device_standard=iPhone11,8; pcpopclub=f6c0566e28634b108cbe6c26574c848d0c6bb839; sessionlogin=f6c0566e28634b108cbe6c26574c848d0c6bb839; __ah_uuid_ng=u_208386105; sessionip=111.182.96.172; cookieCityId=420800; ahpau=1; fvlid=1609894667879b0U4z1lz9K; sessionid=E243A6C5-A048-463C-B984-BD58188410F6%7C%7C2021-01-06+08%3A57%3A48.123%7C%7C0; clubUserShow=208386105|0|2|%e8%8d%86%e9%97%a8%e8%bd%a6%e5%8f%8bbqxvge|0|0|0||2021-01-06 08:53:04|0","apisign":"1|8e88be8714ef1b48f521b809f0b1511b18c323c4|autohomebrush|1612056735|B0A652A7F534196639920B68A59FDA19","reqid":"8e88be8714ef1b48f521b809f0b1511b18c323c4/1612056736668/793","Accept":"*/*","Accept-Encoding":"gzip, deflate, br","Host":"mobile.app.autohome.com.cn","User-Agent":"iPhone\t14.3\tautohome\t1.7.1\tiPhone","Connection":"keep-alive","Accept-Language":"zh-Hans;q=1"}

`
let taskbodyVal= `_sign=3789840327DE41E322C907F64788E17D&a=18&auth=f6c0566e28634b108cbe6c26574c848d0c6bb839&autohomeua=iPhone%0914.3%09autohome%091.7.1%09iPhone&deviceid=8e88be8714ef1b48f521b809f0b1511b18c323c4&model=1&pm=1&timestamp=1612056837&v=1.7.1

`
let activitybodyVal= `_sign=FFA07084B68399EE33EDCEA1E100429E&a=18&abtest=a&auth=f6c0566e28634b108cbe6c26574c848d0c6bb839&autohomeua=iPhone%0914.3%09autohome%091.7.1%09iPhone&deviceid=8e88be8714ef1b48f521b809f0b1511b18c323c4&pm=1&svs=1&timestamp=1612056837&v=1.7.1

`
let addCoinbodyVal= `_sign=EA425808634DC1154366A2C76F3CE36F&_timestamp=1612056667&a=18&autohomeua=iPhone%0914.3%09autohome%091.7.1%09iPhone&deviceid=8e88be8714ef1b48f521b809f0b1511b18c323c4&moreflag=0&pm=1&source_channel_id=3503&user_id=208386105&v=1.7.1

`
let addCoin2bodyVal= `_sign=DBD514C3625C0E81B1AED19B04769372&_timestamp=1612057137&a=18&autohomeua=iPhone%0914.3%09autohome%091.7.1%09iPhone&deviceid=8e88be8714ef1b48f521b809f0b1511b18c323c4&moreflag=1&pm=1&source_channel_id=3503&user_id=208386105&v=1.7.1

`


let qczjcookie = {
  GetUserInfoheaderVal: GetUserInfoheaderVal,  
  taskbodyVal: taskbodyVal,
  activitybodyVal: activitybodyVal,
  addCoinbodyVal: addCoinbodyVal,
  addCoin2bodyVal: addCoin2bodyVal,    

}

module.exports =  qczjcookie
  


