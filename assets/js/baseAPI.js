$.ajaxPrefilter((val) => {

  val.url = 'http://www.liulongbin.top:3007' + val.url;
  console.log(val.url);
})