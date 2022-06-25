//定义规则
var form = layui.form;
var layer = layer.layer;
form.verify({
  nickname1: (val) => {
    if (val.length > 7) {
      return '昵称需要在1-7个字符之间';
    }
  }
})
//获取信息并给表单赋值
huoqu();
//设置重置按钮
$('.btn02').on('click', (e) => {
  e.preventDefault();
  huoqu();
})
$('.form01').on('submit', (e) => {
  e.preventDefault();
  fasong();
})

function huoqu() {
  $.ajax({
    method: "GET",
    url: '/my/userinfo',
    success: (res) => {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败')
      } else {
        // console.log(res);
        form.val('formuserinfo', res.data)
      }
    }
  })
}

function fasong() {
  $.ajax({
    method: "POST",
    url: '/my/userinfo',
    data: $('.form01').serialize(),
    success: (res) => {
      if (res.status !== 0) {
        return layui.layer.msg('修改用户信息失败')
      } else {
        window.parent.userinfos();
        return layui.layer.msg('修改用户信息成功')
      }
    }
  })
}