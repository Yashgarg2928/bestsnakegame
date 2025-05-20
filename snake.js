var canvas = document.getElementById("game");
let score = document.getElementById("score");
var ctx = canvas.getContext("2d");
let startbtn = document.getElementById("start");
let snake, velocity, speed, gameloop;
let titlelen = 10;
let score_count;

startbtn.addEventListener("click", start);
function start(){
    let food = [];
    score_count = 0;
    canvas.style.display = "block";
    score.style.display = "block";
    score.textContent = "Score:" + score_count;
    snake = [{x:0,y:0}];
    velocity = {x:1,y:0};
    speed = 150;
    food_pos(4);
    clearInterval(gameloop);
    gameloop = setInterval(gameloopfn, speed);


    function food_pos(fs){ //it generates rendoem coordinates for food
        let f ={};
        for (let h = 0; h <fs;h++){
            do{
                f = {x : Math.floor(Math.random() * 40),y : Math.floor(Math.random() * 40)};
            } while(snake.some(part => part.x === food.x && part.y === food.y ) && food.some(foodprt => foodprt.x === f.x && foodprt.y === f.y))
            food.push(f);
        };
        
    };
    function sn_poschan(){
        let head;
        if ((snake[0].x === 0 && velocity.x === -1) || (snake[0].y === 0 && velocity.y === -1)){
            if (snake[0].x === 0 && velocity.x === -1){
                head = {x : 39, y : Math.abs((snake[0].y + velocity.y)%40)};
            } else if (snake[0].y === 0 && velocity.y === -1){
                head = {x : Math.abs((snake[0].x + velocity.x)%40), y : 39};
            }
        }else{
            head = {x : Math.abs((snake[0].x + velocity.x)%40), y : Math.abs((snake[0].y + velocity.y)%40)};
        }
        if (snake.some(sagment => sagment.x === head.x && sagment.y === head.y)){
            startbtn.style.display = "block";
            clearInterval(gameloop);
            return;
        };
        
        snake.unshift(head);
        snake.pop(head);
    };

    function draw(){
        ctx.fillStyle = "#b4b4b4";
        ctx.fillRect(0,0,400,400);
        ctx.fillStyle = "rgb(46, 46, 46)";
        ctx.fillRect(snake[0].x*titlelen,snake[0].y * titlelen, titlelen,titlelen);
        for (let i = 1 ; i < snake.length; i++){
            ctx.fillStyle = "#7c7c7c";
            ctx.fillRect((snake[i].x * titlelen),(snake[i].y * titlelen),titlelen,titlelen);
        };
        for (let j = 0 ; j < food.length; j++){
            ctx.fillStyle = "rgb(46, 46, 46)";
            ctx.fillRect(food[j].x *titlelen, food[j].y * titlelen , titlelen,titlelen,titlelen);
        };

    };

    function gameloopfn(){
        draw();
        sn_poschan();
        for (let fod = 0; fod < food.length; fod++){
            if (snake[0].x === food[fod].x && snake[0].y === food[fod].y){
                score_count++
                score.textContent = "Score:" + score_count;
                snake.unshift(food[fod]);
                food.splice(fod,1);
                food_pos(1);
                speed = speed - 5;
                clearInterval(gameloop);
                gameloop = setInterval(gameloopfn, speed)
            };
        };
    };

    document.addEventListener("keydown", (e) => {
        const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
        if (arrowKeys.includes(e.key)) {
            e.preventDefault(); // ⛔ stop browser scroll

            switch (e.key) {
                case "ArrowUp":
                    if (velocity.y === 0) velocity = { x: 0, y: -1 };
                    break;
                case "ArrowDown":
                    if (velocity.y === 0) velocity = { x: 0, y: 1 };
                    break;
                case "ArrowLeft":
                    if (velocity.x === 0) velocity = { x: -1, y: 0 };
                    break;
                case "ArrowRight":
                    if (velocity.x === 0) velocity = { x: 1, y: 0 };
                    break;
            }
        }
    });

};