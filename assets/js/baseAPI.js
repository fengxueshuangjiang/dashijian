$.ajaxPrefilter((val) => {
  //拼接路径
  val.url = 'http://www.liulongbin.top:3007' + val.url;
  //路径中有/my/字符串的拼接请求头
  if (val.url.indexOf('/my/') !== -1) {
    val.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
})