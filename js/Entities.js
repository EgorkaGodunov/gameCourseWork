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
    constructor(scene, x, y, key, dialog) {
        super(scene, x, y, key, "People")
        this.setData("speed", 200)
        this.dialog = dialog
        this.buffer = []
        this.step = 20
        this.textOptions = {
            fontFamily: 'Arial',
            fontSize: '16px',
            color: '#000000',
            wordWrap: {width: 580}
        }

    }

    showDialogue(currentIndex) {
        this.step = 20
        this.buffer.push(this.scene.add.sprite(100,400,"tab").setOrigin(0,0))
        this.question = this.scene.add.text(150,420,this.dialog[currentIndex]['text'], this.textOptions)
        this.buffer.push(this.question)
       
        for (var i = 0; i < this.dialog[currentIndex].options.length; i++) {
            var option = this.dialog[currentIndex].options[i];
            this.answer = this.scene.add.text(200,this.question.y + this.question.height +this.step ,option["text"], this.textOptions)
            this.answer.setInteractive()
            this.buffer.push(this.answer)

            this.answer.on('pointerdown', (index => () => {
                this.handleOptionClick(index)
            })(option['next']), this)
            this.step += 20
        }
    }
    handleOptionClick(option){
        var nextDialogueIndex = option;
        if (nextDialogueIndex === -1) {
            // Скройте диалоговое окно или верните управление игроку
            this.buffer.forEach(function(element){
                element.destroy()
            })
        } else {
            this.buffer.forEach(function(element){
                element.destroy()
            })
            this.showDialogue(nextDialogueIndex);
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
