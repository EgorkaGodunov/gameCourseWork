import { dialog1 } from "./dialogs.js";

export class SceneMain extends Phaser.Scene {
    constructor() {
      super({ key: "SceneMain" });
    }
    preload() {
        this.tab = this.load.image("tab", "content/tab.png")
    }
    create() {
        this.nowTalk = false
        this.player = new Player(
            this, 
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "player"
        )
        this.npc = new People(this,
            100,
            100,
            "teacher",
            dialog1

        )
        this.physics.world.setBounds(0, 0, 1600, 1200); // Здесь 800x600 - размер фона

        this.camera = this.cameras.main
        this.camera.setBounds(0, 0, 1600, 1200)
        this.camera.startFollow(this.player)

        

        this.buttonClicked = false
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.keyTab = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB)

        this.input.keyboard.on('keyup-TAB', () => {
            if (this.buttonClicked) {
                this.npc.showDialogue(0)
            }
            this.buttonClicked = false
        },this);
        this.input.keyboard.on('keydown-TAB', () => {
            this.buttonClicked = true
        },this);
    }
    update() {
      if(!this.nowTalk){

        this.player.update();
        
        if (this.keyW.isDown) {
          this.player.moveUp();
        }
        else if (this.keyS.isDown) {
          this.player.moveDown();
        }
        if (this.keyA.isDown) {
          this.player.moveLeft();
        }
        else if (this.keyD.isDown) {
          this.player.moveRight();
        }
      }else{
        this.player.stop()

      }
      
    }
    
  }