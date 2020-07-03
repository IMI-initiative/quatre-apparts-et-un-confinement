import { Background } from "../../objects/background";
import { Card } from "../card";
import { CardObject } from "../../objects/cardObject";
import { GrandmaCards } from "../../grandmaScene";

const GRANDMA_STATES = {
    IDLE: 0,
    BOOK_1: 1,
    BOOK_2: 2,
    BOOK_3: 3,
    PHONE: 4
};

const GRANDMA_POS = new Phaser.Math.Vector2(739, 1124);

/**
 * @brief Models a "Card" inside of a scene.
 * A card can be seen as a set of images that represent
 * a given interactive moment in a scene
 */
export class LivingRoomCard extends Card {
    /**
     * @brief Constructs a group of objects in the scene
     * @param parent_scene, the Scene which this card belongs to
     */
    constructor(parent_scene) {
        //Call base constructor
        super(parent_scene, []);

        //Initialize children array
        let children = [
            new Background(
                parent_scene,
                "sprites/GrandmaScene/bg.jpg",
                "grandmaBG"
            ),
            new CardObject(
                parent_scene,
                { name: "furniture", url: "sprites/GrandmaScene/furniture.png" },
                new Phaser.Math.Vector2(600, 777)
            ),
            new CardObject(
                parent_scene,
                { name: "book_01", url: "sprites/GrandmaScene/books_01.png" },
                new Phaser.Math.Vector2(469, 538),
                (card) => card.changeGrandma(GRANDMA_STATES.BOOK_1),
                this,
                -1,
                { name: "book_01_h", url: "sprites/GrandmaScene/books_01_h.png" }
            ),
            new CardObject(
                parent_scene,
                { name: "book_02", url: "sprites/GrandmaScene/books_02.png" },
                new Phaser.Math.Vector2(466, 708),
                (card) => card.changeGrandma(GRANDMA_STATES.BOOK_2),
                this,
                -1,
                { name: "book_02_h", url: "sprites/GrandmaScene/books_02_h.png" }
            ),
            new CardObject(
                parent_scene,
                { name: "book_03", url: "sprites/GrandmaScene/books_03.png" },
                new Phaser.Math.Vector2(469, 857),
                (card) => card.changeGrandma(GRANDMA_STATES.BOOK_3),
                this,
                -1,
                { name: "book_03_h", url: "sprites/GrandmaScene/books_03_h.png" }
            ),
            new CardObject(
                parent_scene,
                { name: "radio", url: "sprites/GrandmaScene/radio.png" },
                new Phaser.Math.Vector2(459, 993),
                (scene) => scene.nextCard(GrandmaCards.RADIO),
                parent_scene,
                -1,
                { name: "radio_h", url: "sprites/GrandmaScene/radio_h.png" }
            ),
            new CardObject(
                parent_scene,
                { name: "calendar", url: "sprites/GrandmaScene/calendar.png" },
                new Phaser.Math.Vector2(450, 1163),
                (scene) => scene.nextCard(GrandmaCards.CALENDAR),
                parent_scene,
                -1,
                { name: "calendar_h", url: "sprites/GrandmaScene/calendar_h.png" }
            ),
            new CardObject(
                parent_scene,
                { name: "phone", url: "sprites/GrandmaScene/phone.png" },
                new Phaser.Math.Vector2(1129, 1215),
                (card) => card.changeGrandma(GRANDMA_STATES.PHONE),
                this,
                -1,
                { name: "phone_h", url: "sprites/GrandmaScene/phone_h.png" }
            ),
            new CardObject(
                parent_scene,
                { name: "coffee_table", url: "sprites/GrandmaScene/coffee_table.png" },
                new Phaser.Math.Vector2(1043, 1342)
            )
        ];

        this.children = children;
    }

    preload() {
        super.preload();

        //Load in grandma sprites
        this.parent_scene.load.image("grandma_idle", "sprites/GrandmaScene/grandma_idle.png");
        this.parent_scene.load.image("grandma_phone", "sprites/GrandmaScene/grandma_phone.png");
        this.parent_scene.load.image("grandma_book1", "sprites/GrandmaScene/grandma_book_01.png");
        this.parent_scene.load.image("grandma_book2", "sprites/GrandmaScene/grandma_book_02.png");
        this.parent_scene.load.image("grandma_book3", "sprites/GrandmaScene/grandma_book_03.png");

        //Load the ring animation spritesheet
        this.parent_scene.load.spritesheet(
            'cat',
            'sprites/GrandmaScene/cat.png',
            { frameWidth: 320, frameHeight: 240 }
        );
    }

    /**
     * @brief Sets all of the animations related to the objects in the card
     */
    create() {
        super.create();

        //Add in the initial grandma
        this.grandma_sprite = this.parent_scene.add.image(GRANDMA_POS.x, GRANDMA_POS.y, "grandma_idle");

        //Bring the phone and the 
        this.children[this.children.length - 1].sprite.setDepth(2);
        this.children[this.children.length - 2].sprite.setDepth(3);
        this.children[this.children.length - 2].highlight_sprite.setDepth(3);

        //=========HANDLE_ANIMATIONS=========

        // Create ring sprites
        this.parent_scene.anims.create({
            key: 'cat-tail',
            frameRate: 15,
            frames: this.parent_scene.anims.generateFrameNames('cat'),
            repeat: -1
        });

        //Play the ring animation
        this.cat_anim = this.parent_scene.add.sprite(
            611,
            1477,
            'cat'
        ).play('cat-tail');
    }

    changeGrandma(state) {
        //Destroy the grandma
        if(this.grandma_sprite) {
            this.grandma_sprite.destroy();
        }

        switch(state) {
            case GRANDMA_STATES.IDLE:
                this.grandma_sprite = this.parent_scene.add.image(GRANDMA_POS.x, GRANDMA_POS.y, "grandma_idle");
                break;

            case GRANDMA_STATES.BOOK_1:
                this.grandma_sprite = this.parent_scene.add.image(GRANDMA_POS.x, GRANDMA_POS.y, "grandma_book1");
                break;

            case GRANDMA_STATES.BOOK_2:
                this.grandma_sprite = this.parent_scene.add.image(GRANDMA_POS.x, GRANDMA_POS.y, "grandma_book2");
                break;

            case GRANDMA_STATES.BOOK_3:
                this.grandma_sprite = this.parent_scene.add.image(GRANDMA_POS.x, GRANDMA_POS.y, "grandma_book3");
                break;

            case GRANDMA_STATES.PHONE:
                this.grandma_sprite = this.parent_scene.add.image(GRANDMA_POS.x, GRANDMA_POS.y, "grandma_phone");
                break;

            default:
                break;
        }
    }
}