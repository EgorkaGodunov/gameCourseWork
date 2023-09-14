class Dialog extends Phaser.GameObjects.Sprite {
    constructor(scene, key) {
        super(scene, key);
        this.scene = scene;
        this.setData("state", false);
    }
    spawn(){
        this.scene.add.sprite(100,400,"tab").setOrigin(0,0);  
    }
}
class Entity extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, key, type) {
        super(scene, x, y, key)
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.setData("type", type);
        this.setData("isDead", false);
    }
}
class People extends Entity {
    constructor(scene, x, y, key,dialog) {
        super(scene, x, y, key, "People")
        this.setData("speed", 200)
        this.dialog = dialog
        this.talkboard = []
    }
    talk() {
        this.scene.add.sprite(100,400,"tab").setOrigin(0,0);
        var currentDialogue = this.dialog;
        this.replica = this.scene.add.text(150,420,currentDialogue['text'], {
            fontFamily: 'Arial',
            fontSize: '16px',
            color: '#000000'
        })
        this.talkboard.push(this.replica)
        this.height = 450
        for (var i = 0; i < currentDialogue.options.length; i++) {
            var option = currentDialogue.options[i];
            this.answer = this.scene.add.text(200,this.height,option["text"], {
                fontFamily: 'Arial',
                fontSize: '16px',
                color: '#000000'
            })
            this.height += 20
            this.talkboard.push(this.answer)
        
        }
    }
}
class Player extends Entity {
    constructor(scene, x, y, key) {
        super(scene, x, y, key, "Player")
        this.setData("speed", 200)
    }
    moveUp() {
        this.body.velocity.y = -this.getData("speed");
      }
      
    moveDown() {
        this.body.velocity.y = this.getData("speed");
      }
      
    moveLeft() {
        this.body.velocity.x = -this.getData("speed");
      }
      
    moveRight() {
        this.body.velocity.x = this.getData("speed");
      }
    update() {
        this.body.setVelocity(0, 0);
        this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
        this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);
    }
}
