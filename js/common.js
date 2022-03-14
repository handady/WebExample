window.onload = function() {
    // 鼠标效果
    var mouse_effect = document.querySelector('.mouse_effect');
    var timer = null;
    $(document).on('mousemove', function(e) {
        if (timer) {
            return
        }
        timer = setTimeout(function() {
            var scrollX = window.pageXOffset
            var scrollY = window.pageYOffset
            var x = e.pageX - scrollX;
            var y = e.pageY + 3 - scrollY;
            mouse_effect.style.top = y + 'px';
            mouse_effect.style.left = x + 'px';
            timer = null
        }, 15)
    })
}