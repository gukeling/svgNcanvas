/**
 * Created by Administrator on 2016/4/7.
 */

window.onload = function(){

    var canvas = document.getElementById('canvas');
    canvas.width = 1024;
    canvas.height = 768;

    //判断浏览器是否支持canvas,不为空表示支持
    if(!canvas.getContext('2d')){
        alert('不支持canvas');
        return;
    }

    //获取绘图上下文
    var context = canvas.getContext('2d');

    context.beginPath();

    //画一条直线
    context.moveTo(100,100);
    context.lineTo(700,700);
    context.lineTo(100,700);
    context.lineTo(100,100);

    context.closePath();

    /*着色*/
    context.fillStyle = "rgb(2,100,30)";
    context.fill();


    /*画直线*/
    context.lineWidth = 5;
    context.strokeStyle = "#005588";
    context.stroke();

    context.beginPath();

    context.moveTo(200,100);
    context.lineTo(700,600);

    context.closePath();


    context.strokeStyle = "black";
    context.stroke();

    /*
     *context.arc(centerX, centerY, radius, startingAngle, endingAngle, anticlockwise);
     * 绘制弧线的方法
     * params:
     *       centerX : 圆心的x坐标
     *       centerY : 圆心的y坐标
     *       radius : 半径
     *       startingAngle : 起始位置的角度（起始位置为圆的3点钟位置开始）
     *       endingAngle :   终止位置的角度（角度用pi表示）
     *       anticlockwise : 顺时针绘制还是逆时针绘制 (默认false表示顺时针)
     * */
    context.beginPath();
    context.arc(300, 300, 200, 0, 1.5 * Math.PI);
    context.closePath();

    context.strokeStyle = "#8A6E4F";
    context.stroke();

    for(var i = 0; i < 10; i++){
        context.beginPath();
        context.arc(50 + i *100, 180, 40, 0, 2* Math.PI*(i+1)/10);
        context.stroke();
    }


    context.fillStyle = "#005588";
    for(var i = 0; i < 10; i++){
        context.beginPath();
        context.arc(50 + i *100, 540, 40, 0, 2* Math.PI*(i+1)/10, true);
        context.closePath();
        context.stroke();
        context.fill();
    }



    setInterval(function(){

    });

}
