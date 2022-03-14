window.addEventListener('load', function() {
    var body_height = document.body.scrollHeight;
    var mask = document.querySelector('.mask');
    mask.style.height = body_height + 'px';

    // 拖动模态框
    var h3 = document.querySelector('.enter_password h3');
    var enter_password = document.querySelector('.enter_password');

    h3.addEventListener('mousedown', function(e) {
        var x = e.pageX - enter_password.offsetLeft;
        var y = e.pageY - enter_password.offsetTop;

        function move(e) {
            enter_password.style.left = e.pageX - x + 'px';
            enter_password.style.top = e.pageY - y + 'px';
        }
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', move)
        })
    });

    // // 叉号
    // var close = document.querySelector('.enter_password .close');
    // close.addEventListener('click', function() {
    //     mask.style.display = 'none';
    //     enter_password.style.display = 'none';
    // });

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

    // 这是回到顶部函数
    function window_move(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            var window_offset_top = window.pageYOffset;
            var step = (target - window_offset_top) / 10;
            step = step >= 0 ? Math.ceil(step) : Math.floor(step);
            if (window_offset_top == target) {
                clearInterval(obj.timer);
                if (callback) {
                    callback();
                }
            } else {
                //obj.style.left = obj.offsetLeft + step + 'px'
                window.scroll(0, window.pageYOffset + step)
            }
        }, 15)
    };
    return_top.addEventListener('click', function() {
        window_move(window, 0);
    });
    // -----------------------------------------------------------------
    document.addEventListener('scroll', function() {
        if (window.pageYOffset >= nav_offsetTop) {
            sidebar.style.position = 'fixed';
            sidebar.style.top = '44px';
        } else if (window.pageYOffset < nav_offsetTop) {
            sidebar.style.position = 'absolute';
            sidebar.style.top = '740px';
        }
        if (window.pageYOffset >= main_top) {
            slide(return_top, 123)
        } else if (window.pageYOffset < main_top) {
            slide(return_top, 62)
        }
    });

    // 轮播图---------------------------------------------------------
    var carousel = document.querySelector(".carousel");
    var arrow_right = document.querySelector(".arrow_right");
    var arrow_left = document.querySelector(".arrow_left");
    var carousel_ul = document.querySelector('.carousel ul');
    var carousel_ol = document.querySelector(".carousel ol");
    var carousel_width = carousel.offsetWidth;
    var num = 0;
    var circle = 0;
    var circle_time = 5250;
    var flag = true;

    // 这是左右移动函数
    function animate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            var offset_left = obj.offsetLeft;
            var step = (target - offset_left) / 10;
            step = step >= 0 ? Math.ceil(step) : Math.floor(step);
            if (offset_left == target) {
                clearInterval(obj.timer);
                if (callback) {
                    callback();
                }
            } else {
                obj.style.left = obj.offsetLeft + step + 'px'
            }
        }, 22);
    }
    // 1.鼠标经过显示左右按钮
    carousel.addEventListener('mouseenter', function() {
        arrow_right.style.display = 'inline-block';
        arrow_left.style.display = 'inline-block';
        clearInterval(timer_autoplay);
        timer_autoplay = null;
    })

    carousel.addEventListener('mouseleave', function() {
        arrow_right.style.display = 'none';
        arrow_left.style.display = 'none';
        timer_autoplay = setInterval(function() {
            arrow_right.click();
        }, circle_time);
    });

    //克隆一个第一图片
    var first_pic = carousel_ul.children[0].cloneNode(true);
    carousel_ul.appendChild(first_pic);

    // 图片循环
    for (var i = 0; i < carousel_ul.children.length - 1; i++) {

        //生成小圆圈
        var ol_a = document.createElement('a');
        ol_a.href = 'javascript:;'
        carousel_ol.appendChild(ol_a);
        // 加index
        ol_a.setAttribute('index', i);
        // 点小圆圈变色 和移动
        ol_a.addEventListener('click', function() {
            for (var i = 0; i < carousel_ol.children.length; i++) {
                carousel_ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            //点了某个li把index赋值给他们
            num = index;
            circle = index;
            animate(carousel_ul, -index * carousel_width);
        })
    };
    carousel_ol.children[0].className = 'current';

    // 2.点击左右按钮，图片往左右移动一张
    function current_circle() {
        for (var i = 0; i < carousel_ol.children.length; i++) {
            carousel_ol.children[i].className = '';
        }
        carousel_ol.children[circle].className = 'current';
    }
    // 右边
    arrow_right.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == carousel_ul.children.length - 1) {
                carousel_ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(carousel_ul, -num * carousel_width, function() {
                flag = true;
            });
            if (circle == carousel_ol.children.length - 1) {
                circle = -1;
            }
            circle++;
            current_circle();
        }
    });
    // 左边
    arrow_left.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                carousel_ul.style.left = -(carousel_ul.children.length - 1) * carousel_width + 'px';
                num = carousel_ul.children.length - 1
            }
            num--;
            animate(carousel_ul, -num * carousel_width, function() {
                flag = true;
            });
            circle--;
            if (circle == -1) {
                circle = carousel_ol.children.length - 1
            }
            current_circle();
        }
    });

    //自动播放
    var timer_autoplay = setInterval(function() {
        arrow_right.click();
    }, circle_time);
    // ------------------------------------------------------------------------------------------


})