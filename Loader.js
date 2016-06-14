function preload() {
    game.load.spritesheet('mummy', 'Assets/Graphics/mummy.png', 37, 45, 18);

    game.load.image('book', 'Assets/Graphics/book.jpg');
    game.load.image('player', 'Assets/Graphics/player.jpg');
    game.load.image('scent', 'Assets/Graphics/scent.png');

    game.load.image('player_touch_object', 'Assets/Graphics/player_touch_object.jpg');
    game.load.image('scent_touch_object', 'Assets/Graphics/scent_touch_object.jpg');


    game.load.image('bunny', 'Assets/Graphics/bunny.png');
    game.load.image('contra2', 'Assets/Graphics/contra2.png');
    game.load.physics('physicsData', 'Assets/Scripts/sprites.json');

}