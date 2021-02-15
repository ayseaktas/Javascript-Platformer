
let coin_sprite_sheet = {
    spin: {
        frame_set : [0, 1, 2, 3, 4, 5],
        image: new Image()
    }
}

let snake_sprite_sheet = {
    snake_idle: {
        frame_set : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        image: new Image()
    }
}

let butterfly_sprite_sheet = {
    butterfly: {
        frame_set : [0, 1, 2, 3, 4, 5, 6, 7],
        image: new Image() 
    }
}

snake_sprite_sheet.snake_idle.image.src = "img/sprites/snake/snake_idle.png";

butterfly_sprite_sheet.butterfly.image.src = "img/sprites/butterfly/butterfly.png";

coin_sprite_sheet.spin.image.src = "img/sprites/coins/coin.png";