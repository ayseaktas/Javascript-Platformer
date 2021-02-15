let boss_sprite_sheet = {
    idle_right: {
        frame_set:[0, 1, 2, 3, 4, 5],
        image: new Image()
    },
    idle_left: {
        frame_set:[0, 1, 2, 3, 4, 5],
        image: new Image()
    },
    attack_left: {
        frame_set:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        image: new Image()
    },
    attack_right: {
        frame_set:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        image: new Image()
    },
    attack_noBreath: {
        frame_set:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        image: new Image()
    }
}

boss_sprite_sheet.idle_right.image.src = "img/sprites/boss/boss_right_idle.png";
boss_sprite_sheet.idle_left.image.src = "img/sprites/boss/boss_left_idle.png";
boss_sprite_sheet.attack_left.image.src = "img/sprites/boss/boss_left_attack.png";
boss_sprite_sheet.attack_right.image.src = "img/sprites/boss/boss_right_attack.png";
boss_sprite_sheet.attack_noBreath.image.src = "img/sprites/boss/boss_left_noBreath.png";

let littleEnemy_sprite_sheet = {
    run_right: {
        frame_set : [0, 1, 2, 3],
        image : new Image()
    },
    run_left: {
        frame_set : [0, 1, 2, 3],
        image : new Image()
    }
}
