let tileset_sheet = {
    tileset1 : {
        image: new Image()
    },
    tileset2 : {
        image: new Image()
    },
    tileset3 : {
        image: new Image()
    }
}

tileset_sheet.tileset1.image.src ="img/tilesheets/tileset1.png";
tileset_sheet.tileset2.image.src ="img/tilesheets/tileset2.png";
tileset_sheet.tileset3.image.src ="img/tilesheets/tileset3.png";

let bg1 = {
    layer1 : {image : new Image()},
    layer2 : {image : new Image()},
    layer3 : {image : new Image()},
    layer4 : {image : new Image()}
}
bg1.layer1.image.src = "img/bg1/layer1.png";
bg1.layer2.image.src = "img/bg1/layer4.png";
bg1.layer3.image.src = "img/bg1/layer2.png";
bg1.layer4.image.src = "img/bg1/layer3.png";

let bg2 = {
    layer1 : {image : new Image()},
    layer2 : {image : new Image()},
    layer3 : {image : new Image()},
    layer4 : {image : new Image()}
}
bg2.layer1.image.src = "img/bg2/layer01.png";
bg2.layer2.image.src = "img/bg2/layer02.png";
bg2.layer3.image.src = "img/bg2/layer03.png";
bg2.layer4.image.src = "img/bg2/layer04.png";

let bg3 = {
    layer1 : {image : new Image()},
    layer2 : {image : new Image()},
    layer3 : {image : new Image()},
    layer4 : {image : new Image()}
}
bg3.layer1.image.src = "img/bg3/layer1.png";
bg3.layer2.image.src = "img/bg3/layer1.png";
bg3.layer3.image.src = "img/bg3/layer1.png";
bg3.layer4.image.src = "img/bg3/layer2.png";

let hearts = {
    emptyHeart:{
        image: new Image()
    },
    halfHeart:{
        image: new Image()
    },
    fullHeart:{
        image: new Image()
    }
}

hearts.emptyHeart.image.src = "img/sprites/heart/ui_heart_empty.png";
hearts.halfHeart.image.src = "img/sprites/heart/ui_heart_half.png";
hearts.fullHeart.image.src = "img/sprites/heart/ui_heart_full.png";

let potions = {
    blue:{
        transparent : {
            image: new Image()
        },
        normal : {
            image: new Image()
        }
    },
    red:{
        transparent : {
            image: new Image()
        },
        normal : {
            image: new Image()
        }
    },
    green:{
        transparent : {
            image: new Image()
        },
        normal : {
            image: new Image()
        }   
    }
}

potions.blue.transparent.image.src = "img/sprites/potion/blue_potion_transparent.png";
potions.blue.normal.image.src = "img/sprites/potion/blue_potion.png";
potions.red.transparent.image.src = "img/sprites/potion/red_potion_transparent.png";
potions.red.normal.image.src = "img/sprites/potion/red_potion.png";
potions.green.transparent.image.src = "img/sprites/potion/green_potion_transparent.png";
potions.green.normal.image.src = "img/sprites/potion/green_potion.png";