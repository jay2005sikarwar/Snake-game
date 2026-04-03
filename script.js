//Logic to calculate the total no of grid:
const board =document.querySelector('.board');
const startButton=document.querySelector(".btn-start")
const modal=document.querySelector(".modal")
const startGameModal=document.querySelector(".start-game")
const gameOverModal=document.querySelector(".game-over")
const restartButton=document.querySelector(".btn-restart")

//select score highscore element
const highScoreElement=document.querySelector("#high-score")
const ScoreElement=document.querySelector("#score")
const timeElement=document.querySelector("#time")

//each block size
const blockHeight=80;
const blockWidth=80;

//assign initial values
let highScore=localStorage.getItem("highScore") || 0
let score=0
let time=`00-00`

highScoreElement.innerText = highScore

const cols=Math.floor(board.clientWidth/blockWidth);
const rows=Math.floor(board.clientHeight/blockHeight);

let intervalId=null;
let timeIntervalID=null;
let food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}



const blocks=[]
let snake=[
    {

        x:1,y:3
    }

]


//starting state of snake 
let direction ='down'

//maily we create the 2d array to make this grid bx 
for(let row=0;row<rows;row++){
    for(let col=0;col<cols;col++){
        const block=document.createElement('div');
        block.classList.add("block");
        board.appendChild(block);
        
        blocks[ `${row}-${col}` ]= block

    }
}



function render(){
    let head = null
    //Add food
    blocks[ `${food.x}-${food.y}`].classList.add("food")

    //how we go when see direction 
    if(direction == "left"){
        head={x:snake[0].x,y:snake[0].y-1}
    }
    else if(direction=="right"){
        head={x:snake[0].x,y:snake[0].y+1}

    }
    else if(direction=="down"){
        head={x:snake[0].x+1,y:snake[0].y}

    }
    else if(direction=="up"){
        head={x:snake[0].x-1,y:snake[0].y}

    }
    
    //if snake touch the boundary we say game over 
    if(head.x<0 || head.x>=rows || head.y<0 || head.y>=cols){
        // alert("Game Over")
        clearInterval(intervalId)
        modal.style.display="flex"
        startGameModal.style.display="none"
        gameOverModal.style.display="flex"
        return
    }

    //we add food and reove food-FOOD CONSUME LOGIC
    if(head.x==food.x && head.y==food.y){
        blocks[ `${food.x}-${food.y}`].classList.remove("food")
        food = {
            x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)
        }
        blocks[ `${food.x}-${food.y}`].classList.add("food")

        snake.unshift(head)
        score+=10
        ScoreElement.innerText=score
        if(score>highScore){
            highScore=score
            localStorage.setItem("highScore",highScore.toString())

        }


    }

    snake.forEach(segment =>{
        blocks[ `${segment.x}-${segment.y}` ].classList.remove("fill")
    })
    snake.unshift(head)
    snake.pop()
    snake.forEach(segment =>{
        blocks[ `${segment.x}-${segment.y}` ].classList.add("fill")
    })
}



startButton.addEventListener("click",()=>{
    modal.style.display="none"
    intervalId=setInterval(()=>{render()},300)
    timeIntervalID=setInterval(()=>{
        let [min,sec]=time.split("-").map(Number)
        if(sec==59){
            min+=1
            sec=0
        }
        else{
            sec+=1
        }
        time=`${min}-${sec}`
        timeElement.innerText=time
    },1000)

})

restartButton.addEventListener("click",restartgame)

//function of restat game
function restartgame(){
    blocks[ `${food.x}-${food.y}`].classList.remove("food")

    snake.forEach(segment =>{
        blocks[ `${segment.x}-${segment.y}` ].classList.remove("fill")
    })
    score=0
    time=`00-00`

    ScoreElement.innerText=score
    timeElement.innerText=time
    highScoreElement.innerText=highScore



    modal.style.display="none"
    direction="down"
    snake=[{x:1,y:3}]
    food = {
        x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)
    }
    intervalId=setInterval(()=>{render()},300)

}



//we control the snake 
addEventListener("keydown",(event)=>{
    if(event.key=="ArrowUp"){
        direction="up"
    }
    else if(event.key=="ArrowDown"){
        direction="down"
    }
    else if(event.key=="ArrowLeft"){
        direction="left"
    }
    else if(event.key=="ArrowRight"){
        direction="right"
    }
    
})