let elixirEffect_sprite_sheet = {
    elixirEffectFx: {
        frame_set : [0, 1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27],
        image: new Image() 
    }
}
elixirEffect_sprite_sheet.elixirEffectFx.image.src = "img/fx/HolyExplosion_96x96.png";

let enemyDeath_sprite_sheet = {
    enemyDeathFx: {
        frame_set : [0, 1, 2, 3, 4, 5, 6],
        image: new Image() 
    }
}

let portal_sprite_sheet = {

    portalOpening: {
        frame_set : [0, 1, 2, 3, 4, 5, 6, 7],
        image: new Image() 
    },
    portalLoop: {
        frame_set : [0, 1, 2, 3, 4, 5, 6, 7],
        image: new Image() 
    },
    portalClosing: {
        frame_set : [0, 1, 2, 3, 4, 5, 6, 7],
        image: new Image() 
    }

}

portal_sprite_sheet.portalOpening.image.src = "img/fx/portal_left_opening.png";
portal_sprite_sheet.portalLoop.image.src = "img/fx/portal_left_loop.png";
portal_sprite_sheet.portalClosing.image.src = "img/fx/portal_left_closing.png";

let bossPortal_sprite_sheet = {
    bossPortal: {
        frame_set : [0, 1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14],
        image: new Image() 
    }
}
bossPortal_sprite_sheet.bossPortal.image.src = "img/fx/boss_portal.png";

let bossFire_sprite_sheet = {
    bossFire: {
        frame_set : [0, 1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],
        image: new Image() 
    }
}
bossFire_sprite_sheet.bossFire.image.src = "img/fx/FireBurst_64x64.png";

let bossGone_sprite_sheet = {
    bossGone: {
        frame_set : [0, 1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],
        image: new Image() 
    }
}
bossGone_sprite_sheet.bossGone.image.src = "img/fx/Explosion_3_133x133.png";