//地鼠的坐标
const ROW = 2;
const COLUMN = 3; 
var myPoint = 0

//容纳地鼠的数组
var hole = [];

var imgarr = document.getElementsByTagName("img");
var start = document.getElementById("start")
var point = document.getElementById("points")
var time = document.getElementById("timer")
var board = document.getElementsByClassName('board')[0];
// 获取弹窗
var modal = document.getElementById('myModal');
//设置元素的自定义dataset属性,用来对应下下标
var index = 0 ;
for(var i = 0 ; i < ROW ; i++){
    for(var j = 0 ; j < COLUMN ; j++){ 
        imgarr[index].dataset.row = i;
        imgarr[index].dataset.col = j;
        index++;
    }
} 
//创造地鼠出现
function create(){
    const x = getNumber(0,1)
    const y = getNumber(0,2)
    //把随机出现的地鼠放入容器中
    hole.push({
        x : x,
        y : y,
    })
    //接下来就是控制老鼠的出现
    appearMouse(x,y);
    
    //老鼠出现之后会有两种情况 1.被鼠标点到 消失 2.规定的时间到了，没有敲打到 消失
    for(var a = 0 ; a < imgarr.length ; a++){
        if(imgarr[a].dataset.row == x && imgarr[a].dataset.col == y && imgarr[a].style.opacity =='1'){
                imgarr[a].onclick = function(){
                    hit(x,y)
                }
        }
    }
    setTimeout(function(){
        for(let i = 0 ; i < imgarr.length ; i++){
            if(imgarr[i].dataset.row == x && imgarr[i].dataset.col == y && imgarr[i].style.opacity =='1'){
                imgarr[i].style.opacity ='0';
                imgarr[i].style.transform = 'translateY(10px)'
            }
        }
    },2000)

}
//地鼠出现
function appearMouse(x,y){
    for(var a = 0 ; a < imgarr.length ; a++){
        if(imgarr[a].dataset.row == x && imgarr[a].dataset.col == y){
            if(imgarr[a].src == "file:///C:/Users/jack/Desktop/hit/Hit_Mouse-master/images/beat.png"){
                imgarr[a].src = './images/appear4.png';
            }
            imgarr[a].style.opacity ='1'
            imgarr[a].style.transform = 'translateY(-60px)'

        }
    }
}
//敲击函数\
function hit(x,y){
    let hited = false;
    for(let i = 0 ; i < hole.length ; i++){
        if(x == hole[i].x && y == hole[i].y){
            hited = true
            break
        }
    }

    if(hited){
        for(var j = 0 ; j < imgarr.length ;j++){
            if(imgarr[j].dataset.row == x && imgarr[j].dataset.col == y && imgarr[j].style.opacity =='1'){
                //打到了，地鼠非正常消失
                imgarr[j].src = './images/beat.png';
                imgarr[j].style.transform = 'translateY(10px)'
                myPoint++;
                point.innerHTML = myPoint;
            }
        }
    }
}

start.addEventListener('click',function(){
    var timer = 60;
    clearInterval(click)
    var click =  setInterval(() => {
        timer--;
        time.innerHTML = timer
        if(timer === 0  ){
            clearInterval(click);
            modal.style.display = 'block'
        }
        create()
    }, 1000); 
}) 
function restart(){
    history.go(0)
}
board.addEventListener('mousedown',function(){
    board.style.cursor = 'url("./images/bitbug_favicon (3).ico") 32 32,auto'
})
board.addEventListener('mouseup',()=>{
    board.style.cursor = 'url("./images/hammer1.ico") 32 32,auto'
})


// 获取 <span> 元素，用于关闭弹窗
var span = document.querySelector('.close');
span.addEventListener('click',()=>{
    modal.style.display = 'none'
})


// 打开弹窗的按钮对象
var btn = document.getElementById("myBtn");
btn.addEventListener('click',function(){
    modal.style.display = 'none'
    restart()
})
/**
 * 
 * @param {number} min -最小值
 * @param {number} max -最大值
 * @return {number} -函数返回的闭区间的随机值
 */
function getNumber(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}
