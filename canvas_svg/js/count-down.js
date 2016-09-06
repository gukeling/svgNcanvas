
/*
 * CenterX : x + j*2*(R + spacex) + (R + spacex)
 * CenterY : y + i*2*(R + spacey) + (R + spacey)
 * (i,j从0开始)
 * */


var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

//const  endTime = new Date(2016, 3, 21, 18, 47, 52);//截止时间（月份从0开始）
const  endTime = new Date(2016, 6, 31, 18, 47, 52);//截止时间（月份从0开始）
var curShowTimeSeconds = 0;

var balls = [];
var colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"];

//var ball = { x : 512, y : 100, r : 20, g : 2, vx : -4, vy : -10, color : "#005588", resistance:0.5};

var _config = {
    "spacex" : 1,
    "spacey" : 1
};


window.onload = function(){

    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;

    MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);

    var digit_width = digit[0][1].length;//单个数字的宽度
    var colon_width = digit[10][1].length;//冒号宽度
    var num = digit_width * 6 + colon_width * 2;

    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 /( num * 2 + 8)) - _config.spacex;

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();

    render( context );

    setInterval(function(){
        render( context );
        update();
    },50);

}

function getCurrentShowTimeSeconds(){
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round(ret/1000);

    return ret >=0 ? ret : 0;
}

function render(cxt){
    /*
     * clearRect:对一个矩形空间内的图像刷新
     * */
    //cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    cxt.clearRect(0, 0, cxt.canvas.width, cxt.canvas.height);

    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
    var seconds = curShowTimeSeconds % 60;

    var digit_width = digit[0][1].length * 2 * (RADIUS + _config.spacex);//单个数字的宽度
    var colon_width = digit[10][1].length * 2 *(RADIUS + _config.spacex);//冒号宽度
    var distance = RADIUS + _config.spacex ;//两个数字的间距计算(相隔)

    renderDigit( MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10), cxt);
    renderDigit( MARGIN_LEFT + digit_width + distance, MARGIN_TOP, parseInt(hours%10), cxt);
    renderDigit( MARGIN_LEFT + (digit_width + distance)*2, MARGIN_TOP, 10, cxt);
    renderDigit( MARGIN_LEFT + (digit_width + distance)*2 + (colon_width + distance), MARGIN_TOP, parseInt(minutes/10), cxt);
    renderDigit( MARGIN_LEFT + (digit_width + distance)*3 + (colon_width + distance), MARGIN_TOP, parseInt(minutes%10), cxt);
    renderDigit( MARGIN_LEFT + (digit_width + distance)*4 + (colon_width + distance), MARGIN_TOP, 10, cxt);
    renderDigit( MARGIN_LEFT + (digit_width + distance)*4 + (colon_width + distance)*2, MARGIN_TOP, parseInt(seconds/10), cxt);
    renderDigit( MARGIN_LEFT + (digit_width + distance)*5 + (colon_width + distance)*2, MARGIN_TOP, parseInt(seconds%10), cxt);


    for(var i = 0; i<balls.length; i++){
        cxt.fillStyle = balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI,true);
        cxt.closePath();

        cxt.fill();
    }

}

/*
*画单个数字
* params
*   x:画面起点的x坐标
*   y:画面起点的y坐标
*   num:要绘制的数字
*   cxt:canvas的绘图上下文环境
* */
function renderDigit(x, y, num, cxt){


    var _cx, _cy;//小球圆心的x坐标和y坐标
    cxt.fillStyle = "rgb(0,102,153)";

    for(var i = 0; i < digit[num].length; i ++){
        for(var j = 0 ; j < digit[num][i].length; j++){
            if(digit[num][i][j] == 1){
                _cx = x + j*2*(RADIUS + _config.spacex) + (RADIUS + _config.spacex);
                _cy = y + i*2*(RADIUS + _config.spacey) + (RADIUS + _config.spacey);
                cxt.beginPath();
                cxt.arc( _cx, _cy, RADIUS, 0, 2*Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}

function update(){

    var nextShowTimeSeconds = getCurrentShowTimeSeconds();
    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
    var nextSeconds = nextShowTimeSeconds % 60;

    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
    var curSeconds = curShowTimeSeconds % 60;

    if(nextSeconds != curSeconds){
        curShowTimeSeconds = nextShowTimeSeconds;

        var digit_width = digit[0][1].length * 2 * (RADIUS + _config.spacex);//单个数字的宽度
        var colon_width = digit[10][1].length * 2 *(RADIUS + _config.spacex);//冒号宽度
        var distance = RADIUS + _config.spacex ;//两个数字的间距计算(相隔)


        if(parseInt(curHours/10) != parseInt(nextHours/10)){
            addBalls( MARGIN_LEFT, MARGIN_TOP, parseInt(curHours/10));
        }
        if(parseInt(curHours%10) != parseInt(nextHours%10)){
            addBalls( MARGIN_LEFT + digit_width + distance, MARGIN_TOP, parseInt(curHours%10));
        }

        if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
            addBalls( MARGIN_LEFT + (digit_width + distance)*2 + (colon_width + distance), MARGIN_TOP, parseInt(curMinutes/10));
        }
        if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
            addBalls( MARGIN_LEFT + (digit_width + distance)*3 + (colon_width + distance), MARGIN_TOP, parseInt(curMinutes%10));
        }

        if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
            addBalls( MARGIN_LEFT + (digit_width + distance)*4 + (colon_width + distance)*2, MARGIN_TOP, parseInt(curSeconds/10));
        }
        if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
            addBalls( MARGIN_LEFT + (digit_width + distance)*5 + (colon_width + distance)*2, MARGIN_TOP, parseInt(curSeconds%10));
        }



    }
    updateBalls();

}


function addBalls(x, y, num){

    for(var i = 0; i < digit[num].length; i ++){
        for(var j = 0 ; j < digit[num][i].length; j++){

            if(digit[num][i][j] == 1){
                var aBall = {
                    x : x + j*2*(RADIUS + _config.spacex) + (RADIUS + _config.spacex),
                    y : y + i*2*(RADIUS + _config.spacey) + (RADIUS + _config.spacey),
                    g : 1.5 + Math.random(),
                    vx : Math.pow(-1, Math.ceil(Math.random()*1000))*4,//Math.pow(a,b):计算a的b次方
                    vy : -5,
                    color : colors[Math.floor( Math.random()*colors.length)],
                    resistance : (Math.random()*0.85).toFixed(2)//.toFixed(x)保留x位小数x取0~20
                };

                balls.push(aBall);

            }
        }
    }

}

function updateBalls(){

    for(var i = 0; i< balls.length; i++){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        if(balls[i].y >= WINDOW_HEIGHT - RADIUS){
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = - balls[i].vy * balls[i].resistance;
        }
    }

    /*-----------以下两个循环属于性能优化----------*/
    /*遍历一次，把还在屏幕内的小球替换到数组的前边，并且计算出还在屏幕内小球的个数*/
    var cnt = 0;
    for(var i = 0; i< balls.length; i++){
        if(balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH){
            balls[cnt++] = balls[i];
        }
    }

    /*遍历数组，将第cnt个后边的小球移除（cnt > 300 时只保留300个小球）*/
    while(balls.length > Math.min(300, cnt)){
        /*pop() 方法将删除 arrayObject 的最后一个元素，把数组长度减 1，并且返回它删除的元素的值。*/
        balls.pop();
    }

}

