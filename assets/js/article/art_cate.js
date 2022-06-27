var form = layui.form;
wzhq();

//获取加载文章名称方法
function wzhq() {
  $.ajax({
    method: 'GET',
    url: '/my/article/cates',
    success: (res) => {
      if (res.status !== 0) {
        return layui.layer.msg('获取文章信息失败')
      } else {
        let shuju = template('scri01', res);
        $('tbody').html(shuju);
        return layui.layer.msg('获取文章信息成功')
      }
    }
  })
}

//添加文章名称
var tcc1 = null; //定义一个变量
$('.btn00').on('click', () => {
  tcc1 = layer.open({
    title: '修改文章类别',
    content: $('#scri02').html(),
    type: 1,
    area: ['450px', '250px']
  });
})
$('body').on('submit', '.form01', function (e) {
  e.preventDefault();
  $.ajax({
    method: 'POST',
    url: '/my/article/addcates',
    data: $(this).serialize(),
    success: (res) => {
      if (res.status !== 0) {
        return layui.layer.msg('新增分类信息失败')
      } else {
        wzhq();
        layui.layer.close(tcc1);
        return layui.layer.msg('新增分类信息成功')
      }
    }
  })
})

//修改文章名称--渲染数据
var tcc2 = null;
$('tbody').on('click', '.btn01', function (e) {
  e.preventDefault();
  tcc2 = layer.open({
    title: '修改文章类别',
    content: $('#scri03').html(),
    type: 1,
    area: ['450px', '250px']
  });
  var id = $(this).attr('data-id');
  $.ajax({
    method: 'GET',
    url: '/my/article/cates/' + id,
    success: (res) => {
      if (res.status !== 0) {
        return layui.layer.msg('获取分类信息失败')
      } else {
        form.val('form02', res.data)
        return layui.layer.msg('获取分类信息成功')
      }
    }
  })
})
//修改文章名称--修改数据
$('body').on('submit', '.form03', function (e) {
  e.preventDefault();
  $.ajax({
    method: 'POST',
    url: '/my/article/updatecate',
    data: $(this).serialize(),
    success: (res) => {
      if (res.status !== 0) {
        return layui.layer.msg('修改分类信息失败')
      } else {
        wzhq();
        layui.layer.close(tcc2);
        return layui.layer.msg('修改分类信息成功')
      }
    }
  })
})
//删除文章名称
$('tbody').on('click', '.btn02', function () {
  var id = $(this).attr('data-id')
  console.log(id);
  layer.confirm('确认删除?', {
    icon: 3,
    title: '提示'
  }, function (index) {
    $.ajax({
      method: 'GET',
      url: '/my/article/deletecate/' + id,
      success: (res) => {
        if (res.status !== 0) {
          return layui.layer.msg('删除分类信息失败')
        } else {
          wzhq();
          layer.close(index);
          return layui.layer.msg('删除分类信息成功')
        }
      }
    })
  })
})