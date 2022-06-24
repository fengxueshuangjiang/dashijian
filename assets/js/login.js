$(function () {
  // 点击去注册,显示去注册
  $('#link-reg').on('click', () => {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  // 点击去登陆,显示去登陆
  $('#link-login').on('click', () => {
    $('.login-box').show()
    $('.reg-box').hide()
  })
})
//定义验证规则
var form = layui.form;
var layer = layui.layer;
form.verify({
  username: function (value, item) { //value：表单的值、item：表单的DOM对象
    if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
      return '用户名不能有特殊字符';
    }
    if (/(^\_)|(\__)|(\_+$)/.test(value)) {
      return '用户名首尾不能出现下划线\'_\'';
    }
    if (/^\d+\d+\d$/.test(value)) {
      return '用户名不能全为数字';
    }

    //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
    if (value === 'cao') {
      return '用户名不能为敏感词';
    }
  },
  password1: [
    /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
  ],
  repassword1: (value, itme) => {
    let pas1 = $('.password1').val();
    if (pas1 != value) {
      return '两次输入的密码不一致'
    }
  }
});
$('#form_reg').on('submit', (e) => {
  e.preventDefault();
  // console.log($('.username1').val());
  // console.log($('.password1').val());
  $.post('/api/reguser', {
    username: $('.username1').val(),
    password: $('.password1').val()
  }, (res) => {
    if (res.status !== 0) {
      return layer.msg(res.message)
    } else {
      layer.msg('注册成功')
    }
  })
})
$('#form_login').on('submit', (e) => {
  e.preventDefault();
  // console.log($('.username1').val());
  // console.log($('.password1').val());
  $.post('/api/login', {
    username: $('.username2').val(),
    password: $('.password2').val()
  }, (res) => {
    if (res.status !== 0) {
      return layer.msg(res.message)
    } else {
      layer.msg('登陆成功');
      //存token字符串
      localStorage.setItem('token', res.token);
      location.href = '../../index.html'
    }
  })
})