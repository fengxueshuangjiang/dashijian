// 发送Ajax请求
$.ajax({
  method: 'GET',
  url: '/my/userinfo',

  success: function (res) {
    // console.log(res);
    if (res.status !== 0) {
      return layui.layer.msg('获取信息失败')
    }
    // 调用函数
    touxiang(res.data);
  },
  // //成功或者失败都会调用complete函数
  // complete: (res) => {
  //   if (res.responseJSON.status === 1) {
  //     location.href = '../../login.html';
  //     localStorage.removeItem('token');
  //   }
  // }
})
//转换头像和欢迎名字
function touxiang(user) {
  var name = user.nickname || user.username;
  $('.span01').html(name);
  if (user.user_pic !== null) {
    $('.text_avatar').hide();
    $('.layui-nav-img').show().attr('src', 'user_pic');
  } else {
    $('.layui-nav-img').hide();
    var first = name[0].toUpperCase();
    $('.text_avatar').show().text(first);
  }
}
//退出登陆的功能(提示和退出)
$('.span02').on('click', () => {
  layer.confirm('确认退出登陆?', {
    icon: 3,
    title: '提示'
  }, function (index) {
    localStorage.removeItem('token')
    location.href = '../../login.html'
    layer.close(index);
  })
})