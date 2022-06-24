$.ajaxPrefilter((val) => {
  //拼接路径
  val.url = 'http://www.liulongbin.top:3007' + val.url;
  // console.log(val.url);
  //路径中有/my/字符串的拼接请求头
  if (val.url.indexOf('/my/') !== -1) {
    val.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
  val.complete = (res) => {
    if (res.responseJSON.status === 1) {
      location.href = '../../login.html';
      localStorage.removeItem('token');
    }
  }
})