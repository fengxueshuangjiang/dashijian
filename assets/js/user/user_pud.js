var form = layui.form;
var layer = layui.layer;
// 定义验证规则
form.verify({
  username: function (value, item) {
    if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
      return '用户名不能有特殊字符';
    }
    if (/(^\_)|(\__)|(\_+$)/.test(value)) {
      return '用户名首尾不能出现下划线\'_\'';
    }
    if (/^\d+\d+\d$/.test(value)) {
      return '用户名不能全为数字';
    }
    if (value === 'cao') {
      return '用户名不能为敏感词';
    }
  },
  password1: [
    /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
  ],
  password2: (value, itme) => {
    let pas2 = $('.oldPwd').val();
    if (pas2 == value) {
      return '新旧密码不能相同'
    }
  },
  repassword1: (value, itme) => {
    let pas1 = $('.rePwd').val();
    if (pas1 != value) {
      return '两次输入的密码不一致'
    }
  }
});
// 监听表单提交事件,发送ajax请求,修改密码
$('.form01').on('submit', (e) => {
  e.preventDefault();
  $.ajax({
    method: 'POST',
    url: '/my/updatepwd',
    data: $('.form01').serialize(),
    success: (res) => {
      if (res.status !== 0) {
        return layui.layer.msg('修改密码失败')
      } else {
        $('.form01')[0].reset();
        return layui.layer.msg('修改密码成功')
      }
    }
  })
})