document.addEventListener("DOMContentLoaded", function(){

    buffer = document.createElement("canvas").getContext("2d", { alpha: false });
    context = document.querySelector("canvas").getContext("2d", { alpha: false });

    document.addEventListener("keydown", keyDown, false);
    document.addEventListener("keyup", keyUp, false);
    document.querySelector("#resume").addEventListener("click", resume, false);
    document.querySelector("#restart").addEventListener("click", restart, false);
    document.querySelector("#newGame").addEventListener("click", newGame, false);
    document.querySelector("#settings").addEventListener("click", settings, false);
    document.querySelector("#settings2").addEventListener("click", settings, false);
    document.querySelector("#continue").addEventListener("click", continueGame, false);
    document.querySelector("#keys").addEventListener("click", keys, false);
    document.querySelector("#back3").addEventListener("click", back3, false);
    document.querySelector("#back").addEventListener("click", back, false);
    document.querySelector("#exit1").addEventListener("click", function(){buttonSound(); isExit = true; cutScene();}, false);
    document.querySelector("#exit2").addEventListener("click", function(){buttonSound(); isExit = true; cutScene();}, false);
    document.querySelector("#exit3").addEventListener("click", function(){buttonSound(); isExit = true; cutScene();}, false);
    context.canvas.addEventListener("mouseup", mouseUp, false);
    context.canvas.addEventListener("mousedown", mouseDown, false);
    context.canvas.addEventListener("mousemove", mouseMove, false);


    let arrow_in_sound = document.querySelector("#arrow_in");
    let arrow_out_sound = document.querySelector("#arrow_out");
    let hit_sound = document.querySelector("#hit");
    let onTheGround_sound = document.querySelector("#onTheGround");
    let lose_sound = document.querySelector("#lose");
    let powerUp_sound = document.querySelector("#powerUp");

    let button_sound = document.querySelector("#button");

    let littleEnemyHit_sound = document.querySelector("#littleEnemyHit");
    let littleEnemyDead_sound = document.querySelector("#littleEnemyDead");

    let collect_sound = document.querySelector("#collect");

    let portalOpening_sound = document.querySelector("#portalOpening");
    let portalClosing_sound = document.querySelector("#portalClosing");
    let portal_sound = document.querySelector("#portalSound");

    let wing_sound = document.querySelector("#wing");
    let attack_sound = document.querySelector("#attack");
    let bossTeleport_sound = document.querySelector("#bossTeleportSound");
    let bossPortal_sound = document.querySelector("#bossPortalSound");
    let bossOnFire_sound = document.querySelector("#bossOnFire");

    let bossFight = document.querySelector("#bossFight");
    let darkSide = document.querySelector("#darkSide");
    let lightSide = document.querySelector("#lightSide");

    let sound_slider = document.getElementById("sound_range");
    sound_slider.value = JSON.parse(window.localStorage.getItem('soundVolume'));
    arrow_in_sound.volume = sound_slider.value/100;
	arrow_out_sound.volume = sound_slider.value/100;
	hit_sound.volume = sound_slider.value/100;
	onTheGround_sound.volume = sound_slider.value/100;
	lose_sound.volume = sound_slider.value/100;
	powerUp_sound.volume = sound_slider.value/100;
	button_sound.volume = sound_slider.value/100;
    littleEnemyHit_sound.volume = sound_slider.value/100;
    littleEnemyDead_sound.volume = sound_slider.value/100;
	collect_sound.volume = sound_slider.value/100;
	portalOpening_sound.volume = sound_slider.value/100;
	portalClosing_sound.volume = sound_slider.value/100;
	portal_sound.volume = sound_slider.value/100;
	wing_sound.volume = sound_slider.value/100;
	attack_sound.volume = sound_slider.value/100;
	bossTeleport_sound.volume = sound_slider.value/100;
    bossPortal_sound.volume = sound_slider.value/100;
    bossOnFire_sound.volume = sound_slider.value/100;
    

    let music_slider = document.getElementById("music_range");
    music_slider.value = JSON.parse(window.localStorage.getItem('musicVolume'));
    bossFight.volume = music_slider.value/100;
	darkSide.volume = music_slider.value/100;
    lightSide.volume = music_slider.value/100;
    
    music_slider.oninput = function(){
        window.localStorage.setItem('musicVolume', JSON.stringify(this.value));
        bossFight.volume = this.value/100;
        darkSide.volume = this.value/100;
        lightSide.volume = this.value/100;
    }

    sound_slider.oninput = function(){
        window.localStorage.setItem('soundVolume', JSON.stringify(this.value));
        arrow_in_sound.volume = this.value/100;
        arrow_out_sound.volume = this.value/100;
        hit_sound.volume = this.value/100;
        onTheGround_sound.volume = this.value/100;
        lose_sound.volume = this.value/100;
        powerUp_sound.volume = this.value/100;
        button_sound.volume = this.value/100;
        littleEnemyHit_sound.volume = this.value/100;
        littleEnemyDead_sound.volume = this.value/100;
        collect_sound.volume = this.value/100;
        portalOpening_sound.volume = this.value/100;
        portalClosing_sound.volume = this.value/100;
        portal_sound.volume = this.value/100;
        wing_sound.volume = this.value/100;
        attack_sound.volume = this.value/100;
        bossTeleport_sound.volume = this.value/100;
        bossPortal_sound.volume = this.value/100;
        bossOnFire_sound.volume = this.value/100;
    }

    document.querySelector("#switch").oninput = function(){
        isTestMode = document.getElementById("switch").checked;
        if(isTestMode){player.hp=5000}
        else{player.hp = levelManager.player_coor[2];}
    }

    


    let canvasWidth = context.canvas.width;
    let canvasHeight = context.canvas.height;
    context.imageSmoothingEnabled = false;
    
    size = 32;
    let WIDTH = buffer.canvas.width = 128 * size;
    let HEIGHT = buffer.canvas.height = 9 * size;

    let rect = context.canvas.getBoundingClientRect();
    let scaleY = canvasHeight / HEIGHT;


    const gravity = 450;
    const friction = 0.9999;

    let keycode = {
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        w: 87,
        a: 65,
        s: 83,
        d: 68,
        e: 69,
        esc: 27,
        enter: 13
    }

    let tile_x;
    let tile_y;

    let viewport_x = 0;
    let viewport_y = 0;
    let viewport_w = canvasWidth;
    let viewport_h = canvasHeight;
    let viewport_x_min;
    let viewport_y_min;
    let viewport_x_max;
    let viewport_y_max;

    let arrow_x;
    let arrow_y;
    let dirX = 0;
    let dirY = 0;
    let b;
    let c;
    let h;
    let pX;
    let pY;
    let pH;
    let flameDirX;
    let flameDirY;
    let degree;

    let chestX;
    let chestY;
    let chestW = 16;
    let chestH = 16;

    let delay;
    let frame_set;
    
    let timerUp;

    let secondPassed = 0;
    let oldTimeStamp = 0;
    let dt = 1/60.0;

    levelManager = {
        map : [],
        collision_map : [],
        map_width: 0,
        enemy_type: "",
        bg_type: "",
        player_coor: [],
        littleEnemy: [],
        snake_coor: [],
        coin_coor: [],
        chest_coor : [],
        tileset: "",
        portal_coor : []
    }

    let level;

    let isTestMode;

    let state;
    let PAUSED = "paused";
    let PLAYING = "playing";
    let MENU = "menu";

    function back(){
        buttonSound();
        if(state==PAUSED){
            document.querySelector(".menuInResume").style.display="block";
            document.querySelector(".settings").style.display="none";
        }
        else{
            document.querySelector(".mainMenu").style.display="block";
            document.querySelector(".settings").style.display="none";
        }
    
    }
    function settings(){
        buttonSound();
        document.querySelector(".menuInResume").style.display="none"; 
        document.querySelector(".mainMenu").style.display="none";
        document.querySelector("#save").style.display = "none";
        document.querySelector(".settings").style.display="block";
    }
    function exit(){
        document.querySelector("#placeHolder").className = "";
        document.querySelector(".cutScene").style.display = "none";

        document.querySelector(".menuInResume").style.display="none";
        document.querySelector(".menuInRestart").style.display="none";
        document.querySelector(".winState").style.display = "none";

        document.querySelector(".mainMenu").style.display="block";
    }
    function resume(){
        buttonSound();
        if(level==1 || level==3 || level==5){
            lightSideMusic_play();
        }
        else if(level==2 || level==4 || level==6){
            darkSideMusic_play();
        }
        else{
            bossFightMusic_play();
        }
        document.querySelector(".menuInResume").style.display="none"; 
        state = PLAYING;
    }
    function restart(){
        buttonSound();
        document.querySelector(".menuInRestart").style.display="none";
        startGame(); 
    }
    function continueGame(){
        buttonSound();
        level = JSON.parse(window.localStorage.getItem('level'));
        if(level == null){
            document.querySelector("#save").style.display = "block";
        }else{
            level -= 1;
            document.querySelector(".mainMenu").style.display="none";
            levelUp();
        }
    }
    function newGame(){
        buttonSound();
        level = 0;  
        document.querySelector(".mainMenu").style.display="none";
        document.querySelector("#save").style.display = "none";
        levelUp();
    }
    function keys(){
        buttonSound();
        document.querySelector(".settings").style.display="none";
        document.querySelector(".keyboard").style.display="block";
    }
    function back3(){
        buttonSound();
        document.querySelector(".settings").style.display="block";
        document.querySelector(".keyboard").style.display="none";
    }

    function gameLoop(timestamp){

        getDeltaTime(timestamp);

        if(state == PLAYING){
            collisionDetection();
            collisionDetection();

            movement();

            animUpdate();
            
            draw();
        }

        if(isLevelUp || game_over || winState){cutScene();}
        if(!game_over && !isLevelUp && !isExit && !winState){ engine = window.requestAnimationFrame(gameLoop);}
        if(pressEnter){
            switch(level){
            case 1:
                document.querySelector("#story1").style.display = "none";  
                document.querySelector("#story1").className = "";
                break;
            case 2:
                document.querySelector("#story2").style.display = "none";  
                document.querySelector("#story2").className = "";
                break;
            case 3:
                document.querySelector("#story3").style.display = "none";  
                document.querySelector("#story3").className = "";
                break;
            case 4:
                document.querySelector("#story4").style.display = "none";  
                document.querySelector("#story4").className = "";
                break;
            case 5:
                document.querySelector("#story5").style.display = "none";  
                document.querySelector("#story5").className = "";
                break;
            case 6:
                document.querySelector("#story6").style.display = "none";  
                document.querySelector("#story6").className = "";
                break;
            case 7:
                document.querySelector("#story7").style.display = "none";  
                document.querySelector("#story7").className = "";
                break;
            
            }
            state = PLAYING;
        } 
    }

    function drawMap(){
        viewport_x_min = Math.floor(viewport_x/ size);
        viewport_y_min = Math.floor(viewport_y / size);
        viewport_x_max = Math.ceil((viewport_x + viewport_w - 510 ) / size);
        viewport_y_max = Math.ceil((viewport_y + viewport_h + 510 ) / size);

        if(viewport_x_min < 0){viewport_x_min = 0;}
        if(viewport_x_max >= levelManager.map_width){endOfTheMap = true;}
        buffer.beginPath();
        for(var c = viewport_x_min; c < viewport_x_max; c++){
            for(var r = viewport_y_min; r < viewport_y_max; r++){
                let x = Math.floor(c * size - viewport_x);
                let y = Math.floor(r * size - viewport_y);
                let index = r * levelManager.map_width + c;
                let value = levelManager.map[(index)];
                if(value != 0){
                    value -= 1;
                }

                let source_x = (value % 16) * size;
                let source_y = Math.floor(value / 16 ) *size;
                
                buffer.drawImage(levelManager.tileset, source_x, source_y, size, size,  Math.floor(x), Math.floor(y), size, size);
            }
        }
    }
    function drawLayer1(){
        buffer.drawImage(bg.layer1.image, Math.floor(0 - viewport_x/6), Math.floor(0 - viewport_y/6), WIDTH, HEIGHT);
    }
    function drawLayer2(){
        buffer.drawImage(bg.layer2.image, Math.floor(0 - viewport_x/5), Math.floor(0 - viewport_y/5), WIDTH, HEIGHT);
    }
    function drawLayer3(){
        buffer.drawImage(bg.layer3.image, Math.floor(0 - viewport_x/4), Math.floor(0 - viewport_y/4), WIDTH, HEIGHT);
    }
    function drawLayer4(){ 
        buffer.drawImage(bg.layer4.image, Math.floor(0 - viewport_x/3), Math.floor(0 - viewport_y/3), WIDTH, HEIGHT);
    }
    function viewportScroll(){
        if(!endOfTheMap){
            viewport_x += (player.x - viewport_x) * deltaTime;
            viewport_x *= friction;
        }   
    }

    function Animation(){
        this.count = 0
        this.delay = delay;
        this.frame = 0;
        this.frame_index = 0;
        this.frame_set = frame_set;
        this.animStopped = false;
    }
    Animation.prototype.change = function(frame_set, delay){
        if(this.frame_set != frame_set){
            this.count = 0;
            this.delay = delay;
            this.frame_index = 0;
            this.frame_set = frame_set;
            this.frame = this.frame_set[this.frame_index];
        }
    }
    Animation.prototype.update = function(){        
        this.count ++;
            if(this.count >= this.delay){
                this.count = 0;
                this.frame_index =(this.frame_index == this.frame_set.length -1)?0: this.frame_index + 1;
                this.frame = this.frame_set[this.frame_index];
            }
    }
    Animation.prototype.updateOnce = function(){      
        if(!fxAnimStop){
            this.count ++;
            if(this.count >= this.delay){
                this.count = 0;
                this.frame_index =(this.frame_index == this.frame_set.length -1)?0: this.frame_index + 1;
                this.frame = this.frame_set[this.frame_index];
            }
            if(this.frame_index == 27){
                fxAnimStop = true;
            }
        }
    }
    Animation.prototype.updateOnce2 = function(){      
        if(!this.animStopped){
            this.count ++;
            if(this.count >= this.delay){
                this.count = 0;
                this.frame_index =(this.frame_index == this.frame_set.length -1)?0: this.frame_index + 1;
                this.frame = this.frame_set[this.frame_index];
            }
            if(this.frame_index == 6){
                this.animStopped = true;
            }
        }
    }
    Animation.prototype.updateOnce3 = function(){      
        if(!this.animStopped){
            this.count ++;
            if(this.count >= this.delay){
                this.count = 0;
                this.frame_index =(this.frame_index == this.frame_set.length -1)?0: this.frame_index + 1;
                this.frame = this.frame_set[this.frame_index];
            }
            if(this.frame_index == 9){
                this.animStopped = true;
            }
        }
    }
    Animation.prototype.bossUpdate = function(){
        this.count ++;
        if(this.count >= this.delay){
            this.count = 0;
            this.frame_index =(this.frame_index == this.frame_set.length -1)?0: this.frame_index + 1;
            this.frame = this.frame_set[this.frame_index];
        }
        if(this.frame_index == 7){
            this.animStopped = true;
        }
        else{
            this.animStopped = false;
        }
        
    }
    Animation.prototype.bossDeathUpdate = function(){
        if(!this.animStopped){
            this.count ++;
            if(this.count >= this.delay){
                this.count = 0;
                this.frame_index =(this.frame_index == this.frame_set.length -1)?0: this.frame_index + 1;
                this.frame = this.frame_set[this.frame_index];
            }
            if(this.frame_index == 59){
                this.animStopped = true;
            }
        }
    }
    function animationChange(character, animSprite, animDelay){
        character.image = animSprite.image;
        character.animation.change(animSprite.frame_set, animDelay);
    }
    function animUpdate(){
        playerAnimUpdate();
        bossAnimUpdate();
        littleEnemyAnimUpdate();
        coinAnimUpdate();
        snakeUpdate();
        butterflyUpdate();
        elixirEffectUpdate();
        portalUpdate();
        bossPortalUpdate();
        bossFireUpdate();
    }

    function Player(x, y,hp){
        this.animation = new Animation(),
        this.image = new Image(),
        this.x = x,
        this.y = y,
        this.oldX = x,
        this.oldY = y,
        this.lDir = -1,
        this.rDir = 1,
        this.width = size,
        this.height = 38,
        this.hp = hp,
        this.vX = 150,
        this.vY = 270,
        this.attackCounter = 0
        this.spriteW = 32,
        this.spriteH = 38
    }
    function playerDraw(){
        if(!playerTeleported){
            if(player.image == player_sprite_sheet.bend_left.image || player.image == player_sprite_sheet.bend_right.image){
                player.height = 32;
                player.spriteH = 32;
                buffer.drawImage(player.image, player.animation.frame * player.spriteW, 0, player.spriteW, player.spriteH,   Math.round(player.x - viewport_x), Math.round(player.y - viewport_y)+7, player.width, player.height);

            }
            else{
                player.height = 38;
                player.spriteH = 38;
                buffer.drawImage(player.image, player.animation.frame * player.spriteW, 0, player.spriteW, player.spriteH,   Math.round(player.x - viewport_x), Math.round(player.y - viewport_y), player.width, player.height);

            }
        }
    }
    function playerMoveRight(){
        player.oldX = player.x;
        player.x += player.vX * deltaTime * player.rDir;
        player.vX *= friction;
        movingRight = true;
        movingLeft = false;
        viewportScroll();
    }
    function playerMoveLeft(){
        player.oldX = player.x;
        player.x += player.vX * deltaTime * player.lDir;
        player.vX *= friction;
        movingRight = false;
        movingLeft = true;
    }
    function playerJump(){
        onTheGround = false;
        jumping = true;
        player.vY = 270;
        function jump(){
            player.y -= player.vY * deltaTime * 3;
            player.vY -= gravity * deltaTime * 3;
            player.vY *= friction;
            if(!game_over && state == PLAYING){timerUp = requestAnimationFrame(jump);}
        }
        jump();

        canJump = false;

        return;
    }
    function playerFall(){
        jumping = true;
        player.oldY = player.y;
        player.y += player.vY * deltaTime;
        player.vY  += gravity * deltaTime;
        player.vY  *= friction;
    }
    function playerMovement(){
        if(!onTheGround){
            if(movingRight){
                animationChange(player, player_sprite_sheet.jumpRight, 7);
            }
            else if (movingLeft){
                animationChange(player, player_sprite_sheet.jumpLeft, 7);
            }
            playerFall();
        }
        if(pressRight && player_shot && !isMouseDown && !playerDeath && !pressDown){
            if(!jumping){
                animationChange(player, player_sprite_sheet.runRight, 6);
            }
            playerMoveRight();
        }
        if(pressLeft && player_shot && !isMouseDown && !playerDeath && !pressDown){
            if(!jumping){
                animationChange(player, player_sprite_sheet.runLeft, 6);
            }
            playerMoveLeft();
        }
        if(pressUp && !jumping && canJump  && player_shot && !isMouseDown && !playerDeath && !pressDown){
            playerJump();
        }
        if(!pressRight && !pressLeft && player_shot && !playerDeath  && !pressDown ){
            if(jumping){
                return;
            }
            if(movingLeft){
                animationChange(player, player_sprite_sheet.idle_left, 15);
            }
            else if(movingRight){
                animationChange(player, player_sprite_sheet.idle_right, 15);
            }
            else{
                animationChange(player, player_sprite_sheet.idle_right, 15);
            }
        }
        if(playerDeath){
            if(movingRight){
                animationChange(player, player_sprite_sheet.deathRight, 15);
            }
            else{
                animationChange(player, player_sprite_sheet.deathLeft, 15);
            }
        }
        if(pressDown&&!jumping&& player_shot && !isMouseDown && !playerDeath){
            if(movingRight){
                animationChange(player, player_sprite_sheet.bend_right, 10);
            }else{
                animationChange(player, player_sprite_sheet.bend_left, 10);
            }
        }
    }
    function playerCollision(){

        if(player.x + player.width >= chestX && player.x <= chestX + chestW && player.y + player.height >= chestY && player.y <= chestY + chestH){
            chestCollision = true;
        }
        else{
            chestCollision = false;
        }

        if(player.x <= viewport_x){
            player.x = viewport_x;
        }
        if(player.y >= HEIGHT ){
            if(level == 1 || level == 3 || level == 5 || level == 7){
                game_over = true;
            }else{
                game_over = true;
            }
        }
        if(level == 2 || level == 4 || level == 6 || level == 7){
            if(level == 7){
                if(portalOpening.animation.animStopped){
                    if(portalLoop.x + portalLoop.width >= player.x && portalLoop.x + portalLoop.width*0.5 <= player.x + player.width && portalLoop.y + portalLoop.height >= player.y && portalLoop.y <= player.y + player.height){
                        playerTeleported = true;
                    }
                }
            }else{
                if(portalOpening.animation.animStopped){
                    if(portalLoop.x + portalLoop.width >= player.x && portalLoop.x + portalLoop.width*0.5 <= player.x + player.width && portalLoop.y + portalLoop.height >= player.y && portalLoop.y <= player.y + player.height){
                        playerTeleported = true;
                    }
                }
            }
        }

        tile_x = Math.floor((player.x + (player.width * 0.5)) / size);
        tile_y = Math.floor((player.y + player.height) / size);
        value_at_index = levelManager.collision_map[tile_y * levelManager.map_width + tile_x];
        if(value_at_index != 0){
            switch (value_at_index){
                case 1:
                    topTileCollision(tile_y);
                    break;
                case 2:
                    if(topTileCollision(tile_y)){return;};
                    rightTileCollision(tile_x);
                    break;
                case 3:
                    if(topTileCollision(tile_y)){return;};
                    leftTileCollision(tile_x);
                    break;
                case 4:
                    if(topTileCollision(tile_y)){return;};
                    if(leftTileCollision(tile_x)){return;};
                    rightTileCollision(tile_x);
                    break;
                case 5:
                    rightTileCollision(tile_x);
                    break;
                case 6:
                    leftTileCollision(tile_x);
                    break;
                case 7:
                    if(leftTileCollision(tile_x)){return;};
                    rightTileCollision(tile_x);
                    break;
                case 8:
                    topTileCollision(tile_y);
                    playerHitSound();
                    player.hp=0;
                    playerDeath = true;
                    break;                  
            }
        }
        else{
            if(levelManager.collision_map[(tile_y+1) * levelManager.map_width+tile_x] == 0){
                onTheGround = false;
            }
        }
    }
    function playerShoot(){
        player_shot = false;

        if(degree > 90 || degree < -90){
            movingLeft = true;
            movingRight = false;
            animationChange(player, player_sprite_sheet.normalAttackLeft, 3);

            setTimeout(function(){
                dirX = Math.cos(h) * 1000;
                dirY = Math.sin(h) * 1000;
        
                if(player.attackCounter >= 1 && !game_over){
                    let arrow = new Arrow(arrow_x, arrow_y, dirX, dirY);
                    arrowList.push(arrow);
                    player.attackCounter = 0;    
                    player_shot = true;   
                    arrowOutSound();     
                    
                }
                player_shot = true; 
            }, 500);
        }
        else{
            movingRight = true;
            movingLeft = false;
            animationChange(player, player_sprite_sheet.normalAttackRight, 3);
            
            setTimeout(function(){
                dirX = Math.cos(h) * 1000;
                dirY = Math.sin(h) * 1000;
        
                if(player.attackCounter >= 1 && !game_over){
                    let arrow = new Arrow(arrow_x, arrow_y, dirX, dirY);
                    arrowList.push(arrow);
                    player.attackCounter = 0;    
                    player_shot = true;
                    arrowOutSound();          
                    
                }
                player_shot = true; 
            }, 500);
        } 
    }
    function playerAnimUpdate(){
        if(playerDeath){
            player.animation.updateOnce3();
            if(player.animation.animStopped){
                game_over = true;
            }
        }
        else{
            player.animation.update();
        }
    }

    function Boss(x, y){
        this.animation = new Animation(),
        this.image = new Image(),
        this.x = x,
        this.y = y,
        this.anchorX = x,
        this.anchorY = y,
        this.width = 144,
        this.height = 144,
        this.dir = 0,
        this.range = 20,
        this.hp = 400,
        this.status = true
    }
    function bossMovement(){
        if(boss.status){
            if(player.x >= boss.x - 140 && level != 7){
                if(player.x > boss.x+ boss.width*0.5){
                    boss.image = boss_sprite_sheet.attack_right.image;
                    boss.animation.change(boss_sprite_sheet.attack_right.frame_set, 8);
                }else{
                    boss.image = boss_sprite_sheet.attack_left.image;
                    boss.animation.change(boss_sprite_sheet.attack_left.frame_set, 8);
                }

                boss.width = 210;
                boss.height = 170;
        
                if(boss.animation.animStopped){
                    attackSound();
                    pX = boss.x + boss.width /2 - player.x;
                    pY = boss.y + boss.height /2 - player.y;
                    pH = Math.sqrt(pX * pX + pY * pY);
        
                    flameDirX = ( pX / pH) * 800  * -1;
                    flameDirY = (pY / pH) * 800 * -1;
                    let flame = new Flame(boss.x + boss.width /2, boss.y + boss.height /2, flameDirX, flameDirY);
                    flameList.push(flame);
                    let flame1 = new Flame(boss.x + boss.width /2, boss.y + boss.height /2, flameDirX, flameDirY - 200);
                    flameList.push(flame1);
                    let flame2 = new Flame(boss.x + boss.width /2, boss.y + boss.height /2, flameDirX, flameDirY +200);
                    flameList.push(flame2);
                }
            }
            else if(player.x >= boss.x - 380 && level == 7 && boss.hp > 25){
                if(player.x > boss.x+ boss.width*0.5){
                    boss.image = boss_sprite_sheet.attack_right.image;
                    boss.animation.change(boss_sprite_sheet.attack_right.frame_set, 8);
                }
                else{
                    boss.image = boss_sprite_sheet.attack_left.image;
                    boss.animation.change(boss_sprite_sheet.attack_left.frame_set, 8);
                }

                boss.width = 210;
                boss.height = 170;

                if(pressDown){
                    if(boss.animation.animStopped){
                        attackSound();
                        pX = boss.x + boss.width /2 - player.x;
                        pY = boss.y + boss.height /2 - player.y-7;
                        pH = Math.sqrt(pX * pX + pY * pY);
            
                        flameDirX = ( pX / pH) * 800  * -1;
                        flameDirY = (pY / pH) * 800 * -1;
                        let flame = new Flame(boss.x + boss.width /2, boss.y + boss.height /2, flameDirX, flameDirY + 50);
                        flameList.push(flame);
                        let flame1 = new Flame(boss.x + boss.width /2, boss.y + boss.height /2, flameDirX, flameDirY - 100);
                        flameList.push(flame1);
                        let flame2 = new Flame(boss.x + boss.width /2, boss.y + boss.height /2, flameDirX, flameDirY + 100);
                        flameList.push(flame2);
                    }
                }else{
                    if(boss.animation.animStopped){
                        attackSound();
                        pX = boss.x + boss.width /2 - player.x;
                        pY = boss.y + boss.height /2 - player.y;
                        pH = Math.sqrt(pX * pX + pY * pY);
            
                        flameDirX = ( pX / pH) * 800  * -1;
                        flameDirY = (pY / pH) * 800 * -1;
                        let flame = new Flame(boss.x + boss.width /2, boss.y + boss.height /2, flameDirX, flameDirY);
                        flameList.push(flame);
                        let flame1 = new Flame(boss.x + boss.width /2, boss.y + boss.height /2, flameDirX, flameDirY - 100);
                        flameList.push(flame1);
                        let flame2 = new Flame(boss.x + boss.width /2, boss.y + boss.height /2, flameDirX, flameDirY + 100);
                        flameList.push(flame2);
                    }
                }
            }
            else if(boss.hp <= 25){
                boss.image = boss_sprite_sheet.attack_noBreath.image;
                boss.animation.change(boss_sprite_sheet.attack_noBreath.frame_set, 10);
            }
            else{
                if(viewport_x + 500 >= boss.x){
                    wingSound();
                }
                boss.image = boss_sprite_sheet.idle_left.image;
                boss.animation.change(boss_sprite_sheet.idle_left.frame_set, 8);
                boss.dir += 0.05;
                boss.x = boss.anchorX + Math.cos(boss.dir) * boss.range * 0.5;
                boss.y = boss.anchorY + Math.sin(boss.dir) * boss.range;
            }
        }else if(!boss.status && !boss.animation.animStopped){
            boss.image = bossGone_sprite_sheet.bossGone.image;
            boss.animation.change(bossGone_sprite_sheet.bossGone.frame_set, 1);
        }

    }
    function bossDraw(){
        if(boss.image == boss_sprite_sheet.attack_left.image || boss.image == boss_sprite_sheet.attack_right.image || boss.image == boss_sprite_sheet.attack_noBreath.image){
            boss.width = 210;
            boss.height = 170;
        }else{
            boss.width = 144;
            boss.height = 144;
        }
        if(boss.status){
            buffer.drawImage(boss.image, boss.animation.frame * boss.width, 0, boss.width, boss.height, Math.floor(boss.x - viewport_x), Math.floor(boss.y - viewport_y), boss.width , boss.height);

        }
        else if(!boss.status && !boss.animation.animStopped){
            buffer.drawImage(boss.image, boss.animation.frame * 133, 0, 133, 133, Math.floor(boss.x - viewport_x)+50, Math.floor(boss.y - viewport_y)+20, 133 , 133);

        }
    }
    function bossAnimUpdate(){
        if(boss.status){
            boss.animation.bossUpdate();
        }
        else if(!boss.status && !boss.animation.animStopped){
            boss.animation.bossDeathUpdate();
        }
    }

    function Flame(x, y, flameDirX, flameDirY){
        this.x = x,
        this.y = y,
        this.speedX = flameDirX,
        this.speedY = flameDirY,
        this.width = 6,
        this.height = 7,
        this.status = true
    }
    function flameMovement(){
        for(let i=0; i<flameList.length; i++){
            let flame = flameList[i];
            if(flame.status){
                flame.x += flame.speedX * deltaTime;
                flame.y += flame.speedY * deltaTime;
            }
        }
    }
    function flameCollision(){
        for(let i=0; i<flameList.length; i++){
            let flame = flameList[i];
            if(flame.status){
                // flame vs canvas borders
                if(flame.x >= WIDTH || flame.y >= HEIGHT || flame.x < 0 || flame.y < 0){ 
                    flame.status = false;
                }
                // flame vs player
                if(flame.x + flame.width >= player.x && flame.x <= player.x + player.width && flame.y + flame.height >= player.y && flame.y <= player.y + player.height){
                    if(level == 7){
                        flame.status = false;
                        if(player.hp <= 0){
                            game_over = true;
                        }
                        playerHitSound();
                        player.hp -= 1;
                        
                    }
                    else{playerHitSound(); isLevelUp = true;}
                }
                // flame vs tilemap
                let flame_tile_x = Math.floor((flame.x + flame.width * 0.5) / size);
                let flame_tile_y = Math.floor((flame.y + flame.height) / size);
                let index = levelManager.collision_map[flame_tile_y * levelManager.map_width + flame_tile_x];
                if(index != 0){
                    flame.status = false;
                }
            }
        }
    }
    function flameDraw(){
        for(let i=0; i<flameList.length; i++){
            let flame = flameList[i];
            if(flame.status){
                buffer.drawImage(flameImage, 0, 0, flame.width, flame.height, Math.floor(flame.x - viewport_x), Math.floor(flame.y - viewport_y), flame.width , flame.height);
            }
        }
    }

    function Arrow(arrow_x, arrow_y, dirX, dirY){
        this.x = arrow_x,
        this.y = arrow_y,
        this.speedX = dirX,
        this.speedY = dirY,
        this.width = 16,
        this.height = 4,
        this.status = true
    }
    Arrow.prototype = {
        updatePosition:function(){
            this.x += this.speedX * deltaTime;
            this.y += this.speedY * deltaTime;
        }
    }
    function arrowMovement(){
        for(let i=0; i<arrowList.length; i++){
            let arrow = arrowList[i];
            if(arrow.status){
                arrow.updatePosition();
            }
        }
    }
    function drawAimLine(){
        if(isMouseDown&&!playerDeath){
            arrow_x = player.x + size/4;
            arrow_y = player.y + size/2 - 10 ;
            b = mouseX - arrow_x;
            c = mouseY - arrow_y;
            h = Math.atan2(c, b);
            degree = h * 180 / Math.PI;

            if(degree > 90 || degree < -90){
                movingLeft = true;
                movingRight = false;
                animationChange(player, player_sprite_sheet.readyToAttack_left, 10);
            }
            else{
                movingRight = true;
                movingLeft = false;
                animationChange(player, player_sprite_sheet.readyToAttack_right, 10);
            }
            var grad = buffer.createLinearGradient(player.x + size/2 - viewport_x, player.y + size/2 - viewport_y, mouseX - viewport_x, mouseY - viewport_y);
            grad.addColorStop (0, "yellow");
            grad.addColorStop (1, "red");
            buffer.strokeStyle = grad;
            buffer.beginPath();
            buffer.setLineDash([5, 3, 3, 3]);
            buffer.moveTo(player.x + size/2 - viewport_x, player.y + size/2 - viewport_y - 10);
            buffer.lineTo(mouseX - viewport_x, mouseY - viewport_y);
            buffer.stroke();
        }
    }   
    function arrowDraw(){
        if(level == 1 || level == 3 || level == 5){
            arrowImage.src = "img/sprites/arrow/arrow.png";
        }else{arrowImage.src = "img/sprites/arrow/arrowV2.png";}
        for(let i=0; i<arrowList.length; i++){
            let arrow = arrowList[i];
            if(arrow.status){
                buffer.save();
				buffer.translate(arrow.x - viewport_x , arrow.y - viewport_y)
				buffer.rotate(h);
				buffer.translate(-1*(arrow.x - viewport_x ), -1*(arrow.y - viewport_y ));
				
                buffer.drawImage(arrowImage, 0, 0, 16, 7, Math.floor(arrow.x - viewport_x), Math.floor(arrow.y - viewport_y), arrow.width , arrow.height);
				buffer.restore();
            }
        }
    }
    function arrowCollision(){
        for(let i=0; i<arrowList.length; i++){
            let arrow = arrowList[i];
            if(arrow.status){
                //canvas borders
                if(arrow.x >= WIDTH || arrow.y >= HEIGHT || arrow.x < 0 || arrow.y < 0){ 
                    arrow.status = false;
                    arrowList.splice(i,1);
                }
                //little enemy hit
                for(let i=0; i<littleEnemyList.length; i++){
                    let enemy = littleEnemyList[i];
                    if(enemy.status){
                        if(arrow.x + arrow.width >= enemy.x && arrow.x <= enemy.x + enemy.width && arrow.y + arrow.height >= enemy.y && arrow.y <= enemy.y + enemy.height){
                          
                            enemy.hp -= 100;
                         
                            littleEnemyHitSound();
                            if(enemy.hp<=0){
                                littleEnemyDeadSound();
                                enemy.status = false;
                                arrow.status = false;
                            }
                            else{
                                if(enemy.movingRight){
                                    enemy.x -= 10;
                                }
                                if(enemy.movingLeft){
                                    enemy.x += 10;
                                }
                                arrow.status = false;
                            }
                        }
                    }
                }
                // boss collision
                if(level == 7){
                    if(boss.status){
                        if(arrow.x + arrow.width >= boss.x + boss.width *0.5 && arrow.x <= boss.x + boss.width && arrow.y + arrow.height >= boss.y+boss.height*0.5 && arrow.y <= boss.y + boss.height){
                            if(boss.hp <= 0){bossFightMusic_stop();bossOnFireSound_stop(); bossPortalSound_stop(); bossOnFireSound(); boss.status = false;}
                            boss.hp -= 25;
                            arrow.status = false;
                            bossOnFireSound();
                        }
                    }
                }
                //tilemap hit
                let arrow_tile_x = Math.floor((arrow.x + (arrow.width * 0.5)) / size);
                let arrow_tile_y = Math.floor((arrow.y + arrow.height) / size);
                let index = levelManager.collision_map[arrow_tile_y * levelManager.map_width + arrow_tile_x];
                if(index != 0){
                   
                    arrow.status = false;
                    arrowList.splice(i,1);
                }
            }

        }
    }

    function LittleEnemy(x, y){
        this.animation = new Animation(),
        this.image = new Image(),
        this.x = x,
        this.y = y,
        this.oldX = x,
        this.oldY = y,
        this.width = 32,
        this.height = 36,
        this.status = true,
        this.onTheGround = false,
        this.movingRight = false,
        this.movingLeft = false,
        this.animStopped = false,
        this.hp = 100,
        this.velocity = 60
    }
    function littleEnemyCreate(){
        for(let i = 0; i < levelManager.littleEnemy_coor.length; i++){
            let coor = levelManager.littleEnemy_coor[i];
            let littleEnemy = new LittleEnemy(coor[0], coor[1]);
            if(level == 1 || level == 2){littleEnemy.velocity = 60; littleEnemy.hp = 100;}
            else if(level == 3 || level == 4){littleEnemy.velocity = 70; littleEnemy.hp = 200;}
            else if(level == 5 || level == 6){littleEnemy.velocity = 80; littleEnemy.hp = 300;}
            littleEnemyList.push(littleEnemy);
        }
    }
    function littleEnemyDraw(){
        for(let i=0; i<littleEnemyList.length; i++){
            let enemy = littleEnemyList[i];
            if(enemy.status){
                buffer.drawImage(enemy.image, enemy.width * enemy.animation.frame, 0, enemy.width, enemy.height, Math.floor(enemy.x - viewport_x), Math.floor(enemy.y - viewport_y), enemy.width, enemy.height);
            }
            else if(!enemy.status&&!enemy.animation.animStopped){
                buffer.drawImage(enemy.image, 64 * enemy.animation.frame, 0, 64, 64, Math.floor(enemy.x - viewport_x)-5, Math.floor(enemy.y - viewport_y)-enemy.height, 64, 64);
            }
        }
    }
    function littleEnemyMovement(){
        for(let i=0; i<littleEnemyList.length; i++){
            let enemy = littleEnemyList[i];
            if(enemy.status){
                if(enemy.velocity > 0){
                enemy.image = littleEnemy_sprite_sheet.run_right.image;
                enemy.animation.change(littleEnemy_sprite_sheet.run_right.frame_set, 7);
                }else{
                    enemy.image = littleEnemy_sprite_sheet.run_left.image;
                    enemy.animation.change(littleEnemy_sprite_sheet.run_left.frame_set, 7);
                }
                 // left and right
                if(enemy.onTheGround){
                    if(enemy.x > enemy.oldX){
                        enemy.movingRight = true;
                        enemy.movingLeft = false;
                    }
                    else{
                        enemy.movingLeft = true;
                        enemy.movingRight = false;
                    }
                    enemy.oldX = enemy.x;
                    enemy.x += enemy.velocity * deltaTime;
                    
                }
                // fall 
                enemy.oldY = enemy.y;
                enemy.y += 1;
            }
            else if(!enemy.status&&!enemy.animation.animStopped){
                enemy.image = enemyDeath_sprite_sheet.enemyDeathFx.image;
                if(level == 1 || level == 3 || level == 5){enemy.image.src = "img/fx/enemyDeath1.png";}
                else{enemy.image.src = "img/fx/enemyDeath2.png";}
                enemy.animation.change(enemyDeath_sprite_sheet.enemyDeathFx.frame_set, 4);
            }
        }
        
    }
    function littleEnemyCollision(){
        for(let i=0; i<littleEnemyList.length; i++){
            let enemy = littleEnemyList[i];
            if(enemy.status){
                let littleEnemy_tile_x = Math.floor((enemy.x + (enemy.width * 0.5)) / size);
                let littleEnemy_tile_y = Math.floor((enemy.y + enemy.height) / size);
                let index = levelManager.collision_map[littleEnemy_tile_y * levelManager.map_width + littleEnemy_tile_x];

                if(index != 0){
                    switch (index){
                        case 1:
                            enemyTopTile();
                            break;
                        case 2:
                            enemyRightTile();
                            break;
                        case 3:
                            enemyLeftTile();
                            break;
                        case 4:
                            if(enemyRightTile()){return;}
                            enemyLeftTile();
                            break;
                        case 5:
                            enemyRightTile();
                            break;
                        case 6:
                            enemyLeftTile();
                            break;
                        case 7:
                            if(enemyRightTile()){return;}
                            enemyLeftTile();
                            break;
                        case 8:
                            enemyTopTile();
                            break;
                            
                    }
                }

                function enemyTopTile(){
                    if(enemy.y + enemy.height > littleEnemy_tile_y * size && enemy.oldY + enemy.height <= littleEnemy_tile_y * size){
                        enemy.onTheGround = true;
                        enemy.oldY = enemy.y = (littleEnemy_tile_y * size) - enemy.height - 0.01;
                        return true;
                    }
                    return false;
                }
                function enemyRightTile(){
                    var right = (littleEnemy_tile_x + 1 )* size;
                    if(enemy.x + enemy.width * 0.5 < right && enemy.oldX + enemy.width*0.5 >= right){
                        enemy.oldX = enemy.x = right - enemy.width * 0.5;
                        enemy.velocity *= -1;
                        return true;
                    }
                    return false;
                }
                function enemyLeftTile(){
                    var left = littleEnemy_tile_x * size;
                    if(enemy.x + enemy.width * 0.5 > left && enemy.oldX <= left){
                        enemy.oldX = enemy.x = left - enemy.width * 0.5 - 0.01;
                        enemy.velocity *= -1;
                        return true;
                    }
                    return false;
                }

                if(player.x + (player.width * 0.5) >= enemy.x && player.x <= enemy.x + (enemy.width * 0.5) && player.y + player.height >= enemy.y + 10 && player.y <= enemy.y - 10 + enemy.height){
                    if(!playerDeath){
                        playerHitSound();
                        player.hp -= 3;
                        if(enemy.movingRight){
                            player.x += player.vX * deltaTime * player.rDir;
                            enemy.x -= 10;
                        }
                        if(enemy.movingLeft){
                            player.x += player.vX * deltaTime * player.lDir;
                            enemy.x += 10;
                        }
                        if(player.hp <= 0 ){
                            playerDeath = true;
                        }
                    }
                }
            }
        }
    }
    function littleEnemyAnimUpdate(){
        for(let i=0; i<littleEnemyList.length; i++){
            let enemy = littleEnemyList[i];
            if(enemy.status){
                enemy.animation.update();
            }
            else if(!enemy.status&&!enemy.animation.animStopped){
                enemy.animation.updateOnce2();
            }
        }
    }

    function Coin(x, y){
        this.animation = new Animation(),
        this.image = new Image(),
        this.x = x,
        this.y = y,
        this.width = 15,
        this.height = 14,
        this.status = true
    }
    function coinCreate(){
        for(let i = 0; i < levelManager.coin_coor.length; i++){
            let coor = levelManager.coin_coor[i];
            let coin = new Coin(coor[0], coor[1]);
            coinList.push(coin);
        }
       
    }
    function coinDraw(){
        for(let i = 0; i < coinList.length; i++ ){
            let coin = coinList[i];
            if(coin.status){
                buffer.drawImage(coin.image, coin.width * coin.animation.frame, 0, coin.width, coin.height, Math.floor(coin.x - viewport_x), Math.floor(coin.y - viewport_y), coin.width, coin.height);
            }
        }
    }
    function coinMovement(){
        for(let i = 0; i < coinList.length; i++ ){
            let coin = coinList[i];
            if(coin.status){
                coin.image = coin_sprite_sheet.spin.image;
                coin.animation.change(coin_sprite_sheet.spin.frame_set, 9);
            }
        }
    }
    function coinAnimUpdate(){
        for(let i = 0; i < coinList.length; i++ ){
            let coin = coinList[i];
            if(coin.status){
                coin.animation.update();
            }
        }
    }
    function coinCollision (){
        for(let i = 0; i < coinList.length; i++ ){
            let coin = coinList[i];
            if(coin.status){
                if(player.x + player.width >= coin.x && player.x <= coin.x + coin.width && player.y + player.height >= coin.y && player.y <= coin.y + coin.height){
                    collectSound();
                    coin.status = false;
                    player.hp += 5;
                }
            }
        }
    }

    function Snake(x, y){
        this.image = new Image(),
        this.animation = new Animation();
        this.x = x,
        this.y = y,
        this.width = 12,
        this.height = 12

    }
    function drawSnake(){
        for(let i = 0; i<snakeList.length; i++){
            let snake = snakeList[i];
            buffer.drawImage(snake.image, snake.width * snake.animation.frame, 0, snake.width, snake.height, Math.floor(snake.x - viewport_x), Math.floor(snake.y - viewport_y), snake.width, snake.height);
        }
    }
    function snakeMovement(){
        for(let i = 0; i<snakeList.length; i++){
            let snake = snakeList[i];
            snake.image = snake_sprite_sheet.snake_idle.image;
            snake.animation.change(snake_sprite_sheet.snake_idle.frame_set, 10);
        }
    }
    function snakeCreate(){
        for(let i = 0; i < levelManager.snake_coor.length; i++ ){
            let coor = levelManager.snake_coor[i];
            let snake = new Snake(coor[0], coor[1]);
            snakeList.push(snake);
        }
    }
    function snakeUpdate(){
        for(let i = 0; i<snakeList.length; i++){
            let snake = snakeList[i];
            snake.animation.update();
        }
    }

    function Butterfly(x,y){
        this.image = new Image(),
        this.animation = new Animation();
        this.x = x,
        this.y = y,
        this.width = 28,
        this.height = 28

    }
    function drawButterfly(){
        for(let i = 0; i<butterflyList.length; i++){
            let butterfly = butterflyList[i];
            buffer.drawImage(butterfly.image, butterfly.width * butterfly.animation.frame, 0, butterfly.width, butterfly.height, Math.floor(butterfly.x - viewport_x), Math.floor(butterfly.y - viewport_y), butterfly.width, butterfly.height);
        }
    }
    function butterflyMovement(){
        for(let i = 0; i<butterflyList.length; i++){
            let butterfly = butterflyList[i];
            butterfly.image = butterfly_sprite_sheet.butterfly.image;
            butterfly.animation.change(butterfly_sprite_sheet.butterfly.frame_set, 7);

            butterfly.x -= 1;
        }
    }
    function butterflyCreate(){
        for(let i = 0; i < levelManager.butterfly_coor.length; i++ ){
            let coor = levelManager.butterfly_coor[i];
            let butterfly = new Butterfly(coor[0], coor[1]);
            butterflyList.push(butterfly);
        }
    }
    function butterflyUpdate(){
        for(let i = 0; i<butterflyList.length; i++){
            let butterfly = butterflyList[i];
            butterfly.animation.update();
        }
    }

    function ElixirEffect(x,y){
        this.image = new Image(),
        this.animation = new Animation(),
        this.x = x,
        this.y = y,
        this.width = 96,
        this.height = 96
    }
    function elixirEffectDraw(){
        if(isChestOpened){
            if(!fxAnimStop){
                powerUpSound();
                buffer.drawImage(elixirEffect_sprite_sheet.elixirEffectFx.image, elixirEffect.width * elixirEffect.animation.frame, 0, elixirEffect.width, elixirEffect.height, Math.floor(player.x - viewport_x)-size, Math.floor(player.y-viewport_y)-size, elixirEffect.width, elixirEffect.height); 
            }
        }
    }
    function elixirEffectMovement(){
        if(isChestOpened){
            elixirEffect.image = elixirEffect_sprite_sheet.elixirEffectFx.image;
            elixirEffect.animation.change(elixirEffect_sprite_sheet.elixirEffectFx.frame_set, 1);
        }
    }
    function elixirEffectUpdate(){
        if(isChestOpened){
            elixirEffect.animation.updateOnce();
        }
    }

    function Portal(x,y){
        this.image = new Image(),
        this.animation = new Animation(),
        this.x = x,
        this.y = y,
        this.width = 64,
        this.height = 64
    }
    function portalDraw(){
        if(isChestOpened&&fxAnimStop){
            if(!portalOpening.animation.animStopped){
                buffer.drawImage(portal_sprite_sheet.portalOpening.image, portalOpening.width * portalOpening.animation.frame, 0, portalOpening.width, portalOpening.height, Math.floor(portalOpening.x - viewport_x), Math.floor(portalOpening.y - viewport_y), portalOpening.width, portalOpening.height); 
            }
            else if(portalOpening.animation.animStopped && !playerTeleported){
                buffer.drawImage(portal_sprite_sheet.portalLoop.image, portalLoop.width * portalLoop.animation.frame, 0, portalLoop.width, portalLoop.height, Math.floor(portalOpening.x - viewport_x), Math.floor(portalOpening.y - viewport_y), portalLoop.width, portalLoop.height);
            }
            else if(playerTeleported && !portalClosing.animation.animStopped){
                buffer.drawImage(portal_sprite_sheet.portalClosing.image, portalClosing.width * portalClosing.animation.frame, 0, portalClosing.width, portalClosing.height, Math.floor(portalOpening.x - viewport_x), Math.floor(portalOpening.y - viewport_y), portalClosing.width, portalClosing.height);
            }
        }
        else if(!boss.status){
            if(!portalOpening.animation.animStopped){
                buffer.drawImage(portal_sprite_sheet.portalOpening.image, portalOpening.width * portalOpening.animation.frame, 0, portalOpening.width, portalOpening.height, Math.floor(portalOpening.x - viewport_x), Math.floor(portalOpening.y - viewport_y), portalOpening.width, portalOpening.height); 
            }
            else if(portalOpening.animation.animStopped && !playerTeleported){
                buffer.drawImage(portal_sprite_sheet.portalLoop.image, portalLoop.width * portalLoop.animation.frame, 0, portalLoop.width, portalLoop.height, Math.floor(portalOpening.x - viewport_x), Math.floor(portalOpening.y - viewport_y), portalLoop.width, portalLoop.height);
            }
            else if(playerTeleported && !portalClosing.animation.animStopped){
                buffer.drawImage(portal_sprite_sheet.portalClosing.image, portalClosing.width * portalClosing.animation.frame, 0, portalClosing.width, portalClosing.height, Math.floor(portalOpening.x - viewport_x), Math.floor(portalOpening.y - viewport_y), portalClosing.width, portalClosing.height);
            }
        }
    }
    function portalMovement(){
        if(isChestOpened&&fxAnimStop){
            if(!portalOpening.animation.animStopped){
                portalOpeningSound();
                portalOpening.image = portal_sprite_sheet.portalOpening.image;
                portalOpening.animation.change(portal_sprite_sheet.portalOpening.frame_set, 5);
            }
            else if(portalOpening.animation.animStopped && !playerTeleported){
                portalSound();
                portalLoop.image = portal_sprite_sheet.portalLoop.image;
                portalLoop.animation.change(portal_sprite_sheet.portalLoop.frame_set, 5);
            }
            else if(playerTeleported && !portalClosing.animation.animStopped){
                portalClosingSound();
                portalClosing.image = portal_sprite_sheet.portalClosing.image;
                portalClosing.animation.change(portal_sprite_sheet.portalClosing.frame_set, 5);
            }
        }
        else if(!boss.status){
            if(!portalOpening.animation.animStopped){
                // portalOpeningSound();
                portalOpening.image = portal_sprite_sheet.portalOpening.image;
                portalOpening.animation.change(portal_sprite_sheet.portalOpening.frame_set, 5);
            }
            else if(portalOpening.animation.animStopped && !playerTeleported){
                portalSound();
                portalLoop.image = portal_sprite_sheet.portalLoop.image;
                portalLoop.animation.change(portal_sprite_sheet.portalLoop.frame_set, 5);
            }
            else if(playerTeleported && !portalClosing.animation.animStopped){
                portalClosingSound();
                portalClosing.image = portal_sprite_sheet.portalClosing.image;
                portalClosing.animation.change(portal_sprite_sheet.portalClosing.frame_set, 5);
            }
        }
    }
    function portalUpdate(){
        if(isChestOpened&&fxAnimStop){
            if(!portalOpening.animation.animStopped){
                portalOpening.animation.updateOnce2();
            }
            else if(portalOpening.animation.animStopped && !playerTeleported){
                portalLoop.animation.update();
            }
            else if(playerTeleported && !portalClosing.animation.animStopped){
                portalClosing.animation.updateOnce2();
            }
            else if(portalClosing.animation.animStopped){
                isLevelUp = true;
            }
        }
        else if(!boss.status){
            if(!portalOpening.animation.animStopped){
                portalOpening.animation.updateOnce2();
            }
            else if(portalOpening.animation.animStopped && !playerTeleported){
                portalLoop.animation.update();
            }
            else if(playerTeleported && !portalClosing.animation.animStopped){
                portalClosing.animation.updateOnce2();
            }
            else if(portalClosing.animation.animStopped){
                winState = true;
            }
        }
        
    }

    function BossPortal(x,y){
        this.image = new Image(),
        this.animation = new Animation(),
        this.x = x,
        this.y = y,
        this.width = 192,
        this.height = 192
    }
    function bossPortalDraw(){
        if(boss.hp <=25 && level == 7 && boss.status){
            bossPortalSound();
            buffer.drawImage(bossPortal_sprite_sheet.bossPortal.image, bossPortal.width * bossPortal.animation.frame, 0, bossPortal.width, bossPortal.height, Math.floor(bossPortal.x - viewport_x)+10, Math.floor(bossPortal.y - viewport_y)+10, bossPortal.width, bossPortal.height); 
        }
        
    }
    function bossPortalMovement(){
        if(boss.hp <=25 && level == 7 && boss.status){
            bossPortal.image = bossPortal_sprite_sheet.bossPortal.image;
            bossPortal.animation.change(bossPortal_sprite_sheet.bossPortal.frame_set, 5);
        }
    }
    function bossPortalUpdate(){
        if(boss.hp <=25 && level == 7 && boss.status){
            bossPortal.animation.update();
        }
    }

    function BossFire(x,y){
        this.image = new Image(),
        this.animation = new Animation(),
        this.x = x,
        this.y = y,
        this.width = 64,
        this.height = 64
    }
    function bossFireDraw(){
        if(boss.hp <=25 && level == 7 && boss.status){
            bossOnFireSound();
            for(let i = 0; i<bossFireList.length; i++){
                let bossFire = bossFireList[i];
                buffer.drawImage(bossFire_sprite_sheet.bossFire.image, bossFire.width * bossFire.animation.frame, 0, bossFire.width, bossFire.height, Math.floor(bossFire.x - viewport_x), Math.floor(bossFire.y - viewport_y), bossFire.width, bossFire.height); 
            }
        }
        
    }
    function bossFireMovement(){
        if(boss.hp <=25 && level == 7 && boss.status){
            for(let i = 0; i<bossFireList.length; i++){
                let bossFire = bossFireList[i];
                bossFire.image = bossFire_sprite_sheet.bossFire.image;
                bossFire.animation.change(bossFire_sprite_sheet.bossFire.frame_set, 1);
            }
        }
    }
    function bossFireUpdate(){
        if(boss.hp <=25 && level == 7 && boss.status){
            for(let i = 0; i<bossFireList.length; i++){
                let bossFire = bossFireList[i];
                bossFire.animation.update();
            }
        }
    }
    function bossFireCreate(){
        let bossFire1 = new BossFire(400,100);
        bossFireList.push(bossFire1);
        let bossFire2 = new BossFire(450,100);
        bossFireList.push(bossFire2);
        let bossFire3 = new BossFire(425,70);
        bossFireList.push(bossFire3);
    }

    function Heart(x,y,max,half,empty){
        this.image = new Image(),
        this.x = x,
        this.y = y,
        this.height = 16,
        this.width = 16,
        this.max = max,
        this.half = half,
        this.empty = empty,
        this.status = true
    }
    function heartCreate(){
        let heart1 = new Heart(5,5,30,15,0);
        heartList.push(heart1);
        let heart2 = new Heart(26,5,60,45,31);
        heartList.push(heart2);
        let heart3 = new Heart(47,5,90,75,61);
        heartList.push(heart3);
        let heart4 = new Heart(68,5,120,115,91);
        heartList.push(heart4);
        let heart5 = new Heart(89,5,150,145,121);
        heartList.push(heart5);
    }
    function heartDraw(){
        for(let i = 0; i<heartList.length; i++){
            let heart = heartList[i];
            if(player.hp <= heart.empty){

            }
            else if(player.hp >= heart.empty && player.hp <= heart.half){
                buffer.drawImage(hearts.halfHeart.image, 0, 0, heart.width, heart.height, Math.floor(heart.x), Math.floor(heart.y), heart.width, heart.height);
            }
            else{
                buffer.drawImage(hearts.fullHeart.image, 0, 0, heart.width, heart.height, Math.floor(heart.x), Math.floor(heart.y), heart.width, heart.height);
            }
        }
    }

    function drawChest(){
        chestX = levelManager.chest_coor[0];
        chestY = levelManager.chest_coor[1];
        if(pressE && chestCollision ){
            isChestOpened = true;
            chestImage.src = "img/chest/chest_empty_open_anim_f2.png";
        }else {
            chestImage.src = "img/chest/chest_empty_open_anim_f0.png";
        }
        buffer.drawImage(chestImage, 0, 0, chestW, chestH, Math.floor(chestX- viewport_x), Math.floor(chestY- viewport_y), chestW, chestH);
    }
    function drawPotions(){
        //blue potion
        if(level != 1){
            if(level==2 && !isChestOpened){
                buffer.drawImage(potions.blue.transparent.image, 0, 0, 16, 16, Math.floor(445), Math.floor(5), 16, 16);
            }
            else{
                buffer.drawImage(potions.blue.normal.image, 0, 0, 16, 16, Math.floor(445), Math.floor(5), 16, 16);
            }
        }
        else{
            buffer.drawImage(potions.blue.transparent.image, 0, 0, 16, 16, Math.floor(445), Math.floor(5), 16, 16);
        }

        //red potion
        if(level != 1 && level != 2 && level != 3){
            if(level==4 && !isChestOpened){
                buffer.drawImage(potions.red.transparent.image, 0, 0, 16, 16, Math.floor(466), Math.floor(5), 16, 16);
            }
            else{
                buffer.drawImage(potions.red.normal.image, 0, 0, 16, 16, Math.floor(466), Math.floor(5), 16, 16);
            }
        }
        else{
            buffer.drawImage(potions.red.transparent.image, 0, 0, 16, 16, Math.floor(466), Math.floor(5), 16, 16);
        }

        //green potion
        if(level == 6 || level == 7){
            if(level==6 && !isChestOpened){
                buffer.drawImage(potions.green.transparent.image, 0, 0, 16, 16, Math.floor(487), Math.floor(5), 16, 16);
            }
            else{
                buffer.drawImage(potions.green.normal.image, 0, 0, 16, 16, Math.floor(487), Math.floor(5), 16, 16);
            }
        }
        else{
            buffer.drawImage(potions.green.transparent.image, 0, 0, 16, 16, Math.floor(487), Math.floor(5), 16, 16);
        }
    }
    function pressEWriting(){
        if(chestCollision && !isChestOpened && level == 2){
            buffer.font = "10px gameFont";
            buffer.fillStyle = "rgb(255,255, 255, 50%)";
            buffer.beginPath();
            buffer.fillText("Açmak için E'ye bas", Math.floor(chestX- viewport_x)-70, Math.floor(chestY- viewport_y)-50);
            buffer.closePath();
        }
    }

    function draw(){
        buffer.save();
        
        drawLayer1();
        drawLayer2();
        drawLayer3();
        drawLayer4();
        drawMap();
        coinDraw();
        littleEnemyDraw();
        bossPortalDraw();
        flameDraw();
        bossDraw();
        bossFireDraw();
        arrowDraw();
        drawChest();
        drawAimLine();
        playerDraw(); 
        drawSnake();
        drawButterfly(); 
        elixirEffectDraw(); 
        pressEWriting();  
        portalDraw();  
        heartDraw();
        drawPotions();
        
        var hRatio = canvasWidth / WIDTH;
        var vRatio = canvasHeight / HEIGHT;
        var ratio = Math.max(hRatio, vRatio);

        context.drawImage(buffer.canvas, 0, 0, WIDTH, HEIGHT, 0, 0, WIDTH*ratio, HEIGHT*ratio);
        buffer.restore();
    }
    function movement(){
        playerMovement();
        littleEnemyMovement();
        arrowMovement();
        bossMovement();
        flameMovement();
        coinMovement();
        snakeMovement();
        butterflyMovement();
        elixirEffectMovement();
        portalMovement();
        bossPortalMovement();
        bossFireMovement();
    }

    function collisionDetection(){ 
        littleEnemyCollision();
        arrowCollision();
        playerCollision();
        flameCollision();
        coinCollision();
    }
    function topTileCollision(tile_y){
        var top = (tile_y * size);
        if(player.y + player.height > top && player.oldY + player.height <= top){
            cancelAnimationFrame(timerUp);
            playerOnTheGroundSound();
            jumping = false;
            player.vY = 270;
            player.oldY = player.y = top - player.height - 0.01;
            onTheGround = true;
            return true;
        }
        return false;
    }
    function rightTileCollision(tile_x){
        var right = (tile_x + 1 )* size;
        if(player.x + player.width * 0.5 < right && player.oldX + player.width*0.5 >= right){
            player.oldX = player.x = right - player.width * 0.5;
            return true;
        }
        
        return false;
    }
    function leftTileCollision(tile_x){
        var left = tile_x * size;
        if(player.x + player.width * 0.5 > left && player.oldX <= left){
            player.oldX = player.x = left - player.width * 0.5 - 0.01;
            return true;
        }
        return false;
    }

    function keyDown(event){
        if(event.keyCode === keycode.right || event.keyCode === keycode.left || event.keyCode === keycode.up){
            event.preventDefault();
        }
        if(event.keyCode === keycode.right || event.keyCode === keycode.d){
            pressRight = true;
        }
        else if(event.keyCode === keycode.left || event.keyCode === keycode.a){
            pressLeft = true;
        }
        else if(event.keyCode === keycode.up || event.keyCode === keycode.w){
            pressUp = true;
        }
        else if(event.keyCode === keycode.esc){
            if(state == PLAYING){
                if(level==1||level==3||level==5){
                    lightSideMusic_stop();
                }
                else if(level==2||level==4||level==6){
                    darkSideMusic_stop();
                }
                else{
                    bossFightMusic_stop();
                }
                document.querySelector(".menuInResume").style.display="block"; 
                state = PAUSED;
            }
        }
        else if(event.keyCode === keycode.e){
            pressE = true;
        }
        else if(event.keyCode === keycode.enter){
            pressEnter = true;
            if(theEnd){
                document.querySelector("#story8").className = "";
                document.querySelector("#story8").style.display = "none"; 
                document.querySelector(".winState").style.display = "block";
            }
        }
        else if(event.keyCode === keycode.down || event.keyCode === keycode.s){
            pressDown = true;
        }
        else{
            return;
        }
    }
    function keyUp(event){
        if(event.keyCode === keycode.right || event.keyCode === keycode.d){
            pressRight = false;
        }
        else if(event.keyCode === keycode.left || event.keyCode === keycode.a){
            pressLeft = false;
        }
        else if(event.keyCode === keycode.up || event.keyCode === keycode.w){
            pressUp = false;
            canJump = true;  
        }
        else if(event.keyCode === keycode.e){
            pressE = false;
        }
         else if(event.keyCode === keycode.enter){
            pressEnter = false;
        }
        else if(event.keyCode === keycode.down || event.keyCode === keycode.s){
            pressDown = false;
        }
        else{
            return;
        }
    }
    function mouseUp(){
        isMouseDown = false;
        if(player_shot && !jumping && !playerDeath){
            arrowInSound();
            playerShoot();
        }
    }
    function mouseDown(event){
        isMouseDown = true;
        mouseX = (event.clientX - rect.left) / scaleY + viewport_x;
        mouseY = (event.clientY - rect.top) / scaleY + viewport_y;
    }
    function mouseMove(event){
        mouseX = (event.clientX - rect.left) / scaleY + viewport_x;
        mouseY = (event.clientY - rect.top) / scaleY + viewport_y;
    }
    function getDeltaTime(timestamp){
        secondPassed = (timestamp - oldTimeStamp) / 1000;
        oldTimeStamp = timestamp;
        deltaTime = Math.min(secondPassed, dt);
        frameCount++;
        if(frameCount % 50 === 0){
            player.attackCounter += 1;
        }
    }

    function levelUp(){
    level++;
    switch (level){
    case 1:
        levelManager = level01;
        window.localStorage.setItem('level', JSON.stringify(1));
        break;
    case 2:
        levelManager = level02;
        window.localStorage.setItem('level', JSON.stringify(2));
        break;
    case 3:
        levelManager = level03;
        window.localStorage.setItem('level', JSON.stringify(3));
        break;
    case 4:
        levelManager = level04;
        window.localStorage.setItem('level', JSON.stringify(4));
        break;
    case 5:
        levelManager = level05;
        window.localStorage.setItem('level', JSON.stringify(5));
        break;
    case 6:
        levelManager = level06;
        window.localStorage.setItem('level', JSON.stringify(6));
        break;
    case 7:
        levelManager = level07;
        window.localStorage.setItem('level', JSON.stringify(7));
        break;
    }
    switch (levelManager.bg_type){
        case "A":
            bg = bg1;
            break;
        case "B":
            bg = bg2;
            break;
        case "C":
            bg = bg3;
            break;
    }
    switch (levelManager.tileset){
        case "1":
            levelManager.tileset = tileset_sheet.tileset1.image;
            break;
        case "2":
            levelManager.tileset = tileset_sheet.tileset2.image;
            break;
        case "3":
            levelManager.tileset = tileset_sheet.tileset3.image;
            break;
    }
    switch (levelManager.enemy_type){
        case "A":
            littleEnemy_sprite_sheet.run_right.image.src = "img/sprites/littleEnemyA/littleEnemyA_right_run.png";
            littleEnemy_sprite_sheet.run_left.image.src = "img/sprites/littleEnemyA/littleEnemyA_left_run.png";
            break;
        case "B":
            littleEnemy_sprite_sheet.run_right.image.src = "img/sprites/littleEnemyB/littleEnemyB_right_run.png";
            littleEnemy_sprite_sheet.run_left.image.src = "img/sprites/littleEnemyB/littleEnemyB_left_run.png";
            break;
    }
    startGame();   
    }
    function gameOver(){
        
        document.querySelector(".menuInRestart").style.display="block"; 
        document.querySelector("#placeHolder").className = "";
        document.querySelector(".cutScene").style.display = "none"; 
        game_over = false; 
    }
    function startGame(){
        state = MENU;
        secondPassed = 0;
        frameCount = 0;
        viewport_x = 0;
        viewport_y = 0;

        mouseX = 0;
        mouseY = 0;
       
        pressLeft = false;
        pressRight = false;
        pressUp = false;
        pressDown = false;
        pressE = false;
        pressEnter = false;
        jumping = true;
        onTheGround = false;
        canJump = true;
        movingLeft = false;
        movingRight = true;
        endOfTheMap = false;
        game_over = false;
        player_shot = true;
        isMouseDown = false;
        isChestOpened = false;
        chestCollision = false;
        fxAnimStop = false;
        enemyFxAnimStop = false;
        isLevelUp = false;
        isExit = false;
        playerTeleported = false;
        winState = false;
        theEnd = false;
        playerDeath = false;

        flameImage = new Image();
        flameImage.src = "img/sprites/boss/flame.png";

        arrowImage = new Image();

        chestImage = new Image();

        arrowList = new Array();
        littleEnemyList = new Array();
        flameList = new Array();
        coinList = new Array();
        snakeList = new Array();
        butterflyList = new Array();
        bossFireList = new Array();
        heartList = new Array();

        bossPortal = new BossPortal(340,10);

        elixirEffect = new ElixirEffect(levelManager.player_coor[0], levelManager.player_coor[1]);
      
        portalOpening = new Portal(levelManager.portal_coor[0], levelManager.portal_coor[1]);
        portalLoop = new Portal(levelManager.portal_coor[0], levelManager.portal_coor[1]);
        portalClosing = new Portal(levelManager.portal_coor[0], levelManager.portal_coor[1]);

        player = new Player(levelManager.player_coor[0], levelManager.player_coor[1], levelManager.player_coor[2]);
        boss = new Boss(levelManager.boss_coor[0], levelManager.boss_coor[1]);

        littleEnemyCreate();
        coinCreate();
        snakeCreate();
        butterflyCreate();
        bossFireCreate();
        heartCreate();

        draw();
        beforeStart();
    }
    function engineStart(){
        engine = window.requestAnimationFrame(gameLoop);
    }
    function cutScene(){
        if(level==1||level==3||level==5){
            lightSideMusic_stop();
        }
        else if(level==2||level==4||level==6){
            darkSideMusic_stop();
        }
        else{
            bossFightMusic_stop();
        }
        if(game_over){
            loseSound();
        }
        document.querySelector("#placeHolder").className = "fade-in";
        
        document.querySelector(".cutScene").style.display = "block";
        
       if(game_over){
            setTimeout(gameOver, 4000);
       }
       else if(isLevelUp){
            setTimeout(levelUp, 4000);
       }
       else if(isExit){
            setTimeout(exit, 4000); 
       }
       else if(winState){
            setTimeout(win, 4000);
       }
    }
    function beforeStart(){
        document.querySelector("#placeHolder").className = "";
        document.querySelector(".cutScene").style.display = "none";  
        switch(level){
            case 1:
                lightSideMusic_play();
                document.querySelector("#story1").className = "fade-in";
                document.querySelector("#story1").style.display = "block"; 
                break;
            case 2:
                darkSideMusic_play();
                document.querySelector("#story2").className = "fade-in";
                document.querySelector("#story2").style.display = "block";   
                break;
            case 3:
                lightSideMusic_play();
                document.querySelector("#story3").className = "fade-in";
                document.querySelector("#story3").style.display = "block";  
                break;
            case 4:
                darkSideMusic_play();
                document.querySelector("#story4").className = "fade-in";
                document.querySelector("#story4").style.display = "block";  
                break;
            case 5:
                lightSideMusic_play();
                document.querySelector("#story5").className = "fade-in";
                document.querySelector("#story5").style.display = "block";  
                break;
            case 6:
                darkSideMusic_play();
                document.querySelector("#story6").className = "fade-in";
                document.querySelector("#story6").style.display = "block";  
                break;
            case 7:
                bossFightMusic_play();
                document.querySelector("#story7").className = "fade-in";
                document.querySelector("#story7").style.display = "block";  
                break;

        }  
        if(isTestMode){player.hp = 5000;}
        engineStart();
    }
    function win(){
        state = MENU;
        document.querySelector("#placeHolder").className = "";
        document.querySelector(".cutScene").style.display = "none";

        document.querySelector("#story8").className = "fade-in";
        document.querySelector("#story8").style.display = "block";  
        theEnd = true;

    }

    function arrowInSound(){
        arrow_in_sound.play();
    }
    function arrowOutSound(){
        arrow_out_sound.play();
    }
    function playerHitSound(){
        hit_sound.play();
    }
    function playerOnTheGroundSound(){
        onTheGround_sound.play();
    }
    function loseSound(){
        lose_sound.play();
    }
    function powerUpSound(){
        powerUp_sound.play();
    }
    function buttonSound(){
        let newAudio =  button_sound.cloneNode();
        newAudio.volume = sound_slider.value/100;
        newAudio.play();
    }

    function littleEnemyHitSound(){
        littleEnemyHit_sound.play();
    }
    function littleEnemyDeadSound(){
        let newAudio =  littleEnemyDead_sound.cloneNode();
        newAudio.volume = sound_slider.value/100;
        newAudio.play();
    }

    function collectSound(){
        let newAudio =  collect_sound.cloneNode();
        newAudio.volume = sound_slider.value/100;
        newAudio.play();
    }

    function portalOpeningSound(){
        portalOpening_sound.play();
    }
    function portalClosingSound(){
        portal_sound.pause();
        portalClosing_sound.play();
    }
    function portalSound(){
        portal_sound.play();
    }
    function wingSound(){
        wing_sound.play();
    }

    function attackSound(){
        attack_sound.play();
    }
    function bossPortalSound(){
        bossPortal_sound.play();
    }
    function bossPortalSound_stop(){
        bossPortal_sound.pause();
    }
    function bossTeleportSound(){
        bossTeleport_sound.play();
    }
    function bossOnFireSound(){
        bossOnFire_sound.load();
        bossOnFire_sound.play();
    }
    function bossOnFireSound_stop(){
        bossOnFire_sound.pause();
    }

    function darkSideMusic_play(){
        darkSide.load();
        darkSide.play();
        darkSide.loop = true;
    }
    function darkSideMusic_stop(){
        darkSide.pause();
    }
    function lightSideMusic_play(){
        lightSide.load();
        lightSide.play();
        lightSide.loop = true;
    }
    function lightSideMusic_stop(){
        lightSide.pause();
    }
    function bossFightMusic_play(){
        bossFight.load();
        bossFight.play();
        bossFight.loop = true;
    }
    function bossFightMusic_stop(){
        bossFight.pause();
    }
});
