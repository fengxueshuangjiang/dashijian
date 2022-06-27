let form = layui.form;
var laypage = layui.laypage;
var datas = {
  pagenum: 1,
  pagesize: 2,
  cate_id: '',
  state: ''
}
wzsj();
wzfl();
// 初始化时间
template.defaults.imports.sjglq = function (date) {
  const dt = new Date(date);
  var y = dt.getFullYear();
  var m = zero(dt.getMonth() + 1);
  var d = zero(dt.getDate());
  var hh = zero(dt.getHours());
  var mm = zero(dt.getMinutes());
  var ss = zero(dt.getSeconds());
  return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
}
// 补零
function zero(n) {
  return n > 9 ? n : '0' + n;
}
//获取数据+渲染数据
function wzsj() {
  $.ajax({
    method: 'GET',
    url: '/my/article/list',
    data: datas,
    success: (res) => {
      if (res.status !== 0) {
        return layui.layer.msg('获取分类信息失败')
      } else {
        let shuju = template('scri001', res)
        $('tbody').html(shuju);
        wzfy(res.total)
        return layui.layer.msg('获取分类信息成功')
      }
    }
  })
}
//初始化文章分类
function wzfl() {
  $.ajax({
    method: 'GET',
    url: '/my/article/cates',
    success: (res) => {
      if (res.status !== 0) {
        return layui.layer.msg('获取分类信息失败')
      } else {
        var htmlStr = template('scri002', res)
        $('.sel01').html(htmlStr);
        form.render();
        return layui.layer.msg('获取分类信息成功')
      }
    }
  })
}
//根据筛选条件初始化文章列表
$('#form01').on('submit', (e) => {
  e.preventDefault();
  var cate_id = $('.sel01').val();
  var state = $('.sel02').val();
  datas.cate_id = cate_id;
  datas.state = state;
  wzsj();
})
//定义分页方法
function wzfy(total) {
  laypage.render({
    layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
    elem: 'test1', //分页容器的id
    count: total, //总条数
    limit: datas.pagesize, //每页显示几条
    curr: datas.pagenum, //默认选中
    limits: [2, 3, 4, 5, 10],
    jump: function (obj, first) { //obj包含了当前分页的所有参数
      datas.pagenum = obj.curr; //得到当前页，以便向服务端请求对应页的数据
      datas.pagesize = obj.limit;
      //first值为true,证明是方式二触发的
      if (!first) { //若不是第二种方式触发的话,则触发wzsj函数
        wzsj();
      }
    }
  });
}
//点击删除删除文章
$('tbody').on('click', '.btn-del', function () {
  var delsum = $('.btn-del').length;
  // console.log(delsum);
  var id = $(this).attr('data-id')
  layer.confirm('确认删除?', {
    icon: 3,
    title: '提示'
  }, function (index) {
    $.ajax({
      method: 'GET',
      url: '/my/article/delete/' + id,
      success: (res) => {
        if (res.status !== 0) {
          return layui.layer.msg('删除文章失败')
        } else {
          if (delsum === 1) {
            datas.pagenum = datas.pagenum == 1 ? datas.pagenum : datas.pagenum - 1;
          }
          //当最后一个页码数据删除完成时,页码虽然会向前跳-1,但是
          // 此时wzsj查询的页码还是原来的数所以需要判断此时该页码上面还
          // 有没有数据,如果没有,页码值自动就-1
          wzsj();
          return layui.layer.msg('删除文章成功')
        }
      }
    })
    layer.close(index);
  })
})
$('tbody').on('click', '.btn-insert', function () {
  var id = $(this).attr('data-id')
  $.ajax({
    method: 'GET',
    url: '/my/article/' + id,
    success: (res) => {
      if (res.status !== 0) {
        return layui.layer.msg('获取文章失败')
      } else {
        // console.log(res);
        var htmlStr = template('scri003', res)
        $('.d02').html(htmlStr);
        return layui.layer.msg('获取文章成功')
      }
    }
  })
})