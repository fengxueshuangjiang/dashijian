wzlb();
var form = layui.form;

function wzlb() {
  $.ajax({
    method: 'GET',
    url: '/my/article/cates',
    success: (res) => {
      if (res.status !== 0) {
        return layui.layer.msg('获取分类信息失败')
      } else {
        var leibiao = template('scri001', res);
        $('.sel01').html(leibiao);
        //重新渲染列表
        form.render();
        return layui.layer.msg('获取分类信息成功')
      }
    }
  })
}
// 1. 初始化图片裁剪器
var $image = $('#image')

// 2. 裁剪选项
var options = {
  aspectRatio: 400 / 280,
  preview: '.img-preview'
}

// 3. 初始化裁剪区域
$image.cropper(options)

$('#btnChooseImage').on('click', () => {
  $('#coverFile').click();
})
$('#coverFile').on('change', (e) => {
  var files = e.target.files;
  if (files.length === 0) {
    return
  } else {
    var newUrl = URL.createObjectURL(files[0]);
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newUrl) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  }
})
//发布状态
let zhuangtai = '已发布';
$('#btnSave2').on('click', () => {
  zhuangtai = '草稿';
})
//触发发布事件
$('#form01').on('submit', (e) => {
  e.preventDefault();
  let fmd = new FormData($('#form01')[0])
  fmd.append('state', zhuangtai);
  $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 400,
      height: 280
    })
    .toBlob(function (blob) {
      // 将 Canvas 画布上的内容，转化为文件对象
      // 得到文件对象后，进行后续的操作
      // 将文件对象，存储到 fd 中
      fmd.append('cover_img', blob)
      //试数据
      // fmd.forEach(function (v, k) {
      //   console.log(k, v);
      // })
      // 发起 ajax 数据请求
      cunsj(fmd);
    })
})

function cunsj(fmd) {
  $.ajax({
    method: 'POST',
    url: '/my/article/add',
    data: fmd,
    contentType: false,
    processData: false,
    success: (res) => {
      if (res.status !== 0) {
        return layui.layer.msg('发布文章失败')
      } else {
        location.href = '/article/art_list.html'
        return layui.layer.msg('发布文章成功')
      }
    }
  })
}