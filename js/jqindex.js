$(function() {
    // 叉号
    $(".enter_password .close").click(function() {
        $(".mask").stop().hide();
        $(".enter_password").stop().hide();
    });

    // 侧边框
    var sidebar = document.querySelector('.sidebar');
    var nav = document.querySelector('.nav');
    var main = document.querySelector('#life');
    var return_top = document.querySelector(".sidebar .return_top");
    nav_offsetTop = nav.offsetTop - 44;
    main_top = main.offsetTop - 44
        // 这是上下移动函数
    function slide(obj, target) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            var offset_top = obj.offsetTop;
            var step = target - offset_top >= 0 ? 1 : -1
            var margin = parseInt(window.getComputedStyle(obj, null).getPropertyValue("margin-top"));
            if (offset_top == target) {
                clearInterval(obj.timer)
            } else {
                obj.style.marginTop = margin + step * 1 + 'px';
            }
        }, 3)
    };
})