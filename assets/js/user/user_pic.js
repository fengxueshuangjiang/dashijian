// 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}
// 创建裁剪区域
$image.cropper(options);

//上传点击事件
$('#btn01').on('click', () => {
  $('#file').click();
  $('#file').on('change', (e) => {
    //拿到用户选择的文件
    const file = e.target.files[0];
    //将文件转化为路径
    const newImgURL = URL.createObjectURL(file);
    //重新初始化裁剪区
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })
})
$('#btn02').on('click', () => {
  var dataURL = $image
    // 创建一个 Canvas 画布
    .cropper('getCroppedCanvas', {
      width: 100,
      height: 100
    })
    .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
  $.ajax({
    method: 'POST',
    url: '/my/update/avatar',
    data: {
      avatar: dataURL
    },
    success: (res) => {
      if (res.status !== 0) {
        return layui.layer.msg('修改用户信息失败')
      } else {
        window.parent.userinfos();
        return layui.layer.msg('修改用户信息成功')
      }
    }
  })
})