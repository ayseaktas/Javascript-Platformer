let player_sprite_sheet = {
    normalAttackRight: {
        frame_set:[0, 1, 2, 3, 4, 5, 6, 7, 8],
        image: new Image()
    },
    normalAttackLeft:{
        frame_set:[0, 1, 2, 3, 4, 5, 6, 7, 8],
        image: new Image()
    },
    readyToAttack_right:{
        frame_set:[0],
        image: new Image()
    },
    readyToAttack_left:{
        frame_set:[0],
        image: new Image()
    },
    bend_left:{
        frame_set:[0],
        image: new Image()
    },
   bend_right:{
        frame_set:[0],
        image: new Image()
    },
    deathRight:{
        frame_set:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        image: new Image()
    },
    deathLeft:{
        frame_set:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        image: new Image()
    },
    idle_right:{
        frame_set:[0, 1],
        image: new Image()
    },
    idle_left:{
        frame_set:[0, 1],
        image: new Image()
    },
    jumpRight:{
        frame_set:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        image: new Image()
    },
   jumpLeft:{
        frame_set:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        image: new Image()
    },
    runRight:{
        frame_set:[0, 1, 2, 3, 4, 5, 6, 7],
        image: new Image()
    },
    runLeft:{
        frame_set:[0, 1, 2, 3, 4, 5, 6, 7],
        image: new Image()
    }
}

player_sprite_sheet.readyToAttack_right.image.src = "img/sprites/archer/readyToAttack_right.png";    
player_sprite_sheet.readyToAttack_left.image.src = "img/sprites/archer/readyToAttack_left.png";  
player_sprite_sheet.normalAttackRight.image.src = "img/sprites/archer/normalAttack_right.png";
player_sprite_sheet.normalAttackLeft.image.src = "img/sprites/archer/normalAttack_left.png";
player_sprite_sheet.deathRight.image.src = "img/sprites/archer/death_right.png";
player_sprite_sheet.deathLeft.image.src = "img/sprites/archer/death_left.png";
player_sprite_sheet.idle_right.image.src = "img/sprites/archer/idle_right.png";
player_sprite_sheet.idle_left.image.src = "img/sprites/archer/idle_left.png";
player_sprite_sheet.jumpRight.image.src = "img/sprites/archer/jump_right.png";
player_sprite_sheet.jumpLeft.image.src = "img/sprites/archer/jump_left.png";
player_sprite_sheet.runRight.image.src = "img/sprites/archer/run_right.png";
player_sprite_sheet.runLeft.image.src = "img/sprites/archer/run_left.png";
player_sprite_sheet.bend_right.image.src = "img/sprites/archer/bend_right.png";
player_sprite_sheet.bend_left.image.src = "img/sprites/archer/bend_left.png";