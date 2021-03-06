import Phaser from "phaser";
import { DialogueController } from "../core/dialogueController.js";
import { Card } from "./cards/card.js";
import { CardObject } from "./objects/cardObject.js";
import { Background } from "./objects/background.js";
import { player } from "../index.js";
import { Scenes } from "../core/player.js";
import { WindowState, Months } from "./buildingScene.js";
import { IndepCards } from "./indepScene.js";

export const HallwayCards = {
    DAMIEN_CLOSED: 0,
    DAMIEN_OPEN: 1,
    INDEP_CLOSED: 2,
    INDEP_OPEN: 3,
    INDEP_GRANDMA: 4
};

const NUM_CARDS = 5;

export class HallwayScene extends Phaser.Scene {
    /**
     * @brief initializes the different cards needed in the scene
     * and the index that will be used to know which card we are at
     * in said scene
     */
    constructor() {
        super({ key: Scenes.HALLWAY });

        this.damien_closed_card = new Card(
            this,
            [
                new Background(
                    this,
                    "sprites/HallwayScenes/Palier-Etudiant-Ferme/bg.jpg",
                    "damienHallwayBGClosed"
                ),
                new CardObject(
                    this,
                    { name: "damienHallwayDoor", url: "sprites/HallwayScenes/Palier-Etudiant-Ferme/door.png" },
                    new Phaser.Math.Vector2(-215, -80),
                    (scene) => {
                        if(player.damien_gone) {
                            scene.dialogue.display("damienAway");
                            scene.damien_closed_card.dialogueSensitive = true;
                        } else {
                            scene.endCard();
                            scene.nextCard();
                        }
                    },
                    this,
                    0,
                    {
                        name: 'damien_hallway_door_h',
                        url: "sprites/UI/01_Interactions/03_Palier/02_Spritesheets/01-Palier-Frapper-Spritesheet_255x188.png",
                        size: { frameWidth: 225, frameHeight: 188 },
                        pos: new Phaser.Math.Vector2(-107, -466)
                    }
                ),
                new CardObject(
                    this,
                    { name: "grandmaHallwayDamien", url: "sprites/HallwayScenes/Palier-Etudiant-Ferme/grandma.png" },
                    new Phaser.Math.Vector2(101, 132)
                ),
            ]
        );

        this.damien_open_card = new Card(
            this,
            [
                new Background(
                    this,
                    "sprites/HallwayScenes/Palier-Etudiant-Ouvert/bg.jpg",
                    "damienHallwayBGOpen"
                ),
                new CardObject(
                    this,
                    { name: "damienHallway", url: "sprites/HallwayScenes/Palier-Etudiant-Ouvert/damien.png" },
                    new Phaser.Math.Vector2(-203, -3)
                ),
                new CardObject(
                    this,
                    { name: "grandmaHallwayDamienOpen", url: "sprites/HallwayScenes/Palier-Etudiant-Ouvert/grandma.png" },
                    new Phaser.Math.Vector2(101, 132)
                )
            ],
            null,
            true
        );

        this.indep_closed_card = new Card(
            this,
            [
                new Background(
                    this,
                    "sprites/HallwayScenes/Palier-Independant-Ferme/bg.jpg",
                    "indepHallwayClosedBG"
                ),
                new CardObject(
                    this,
                    { name: "indepHallwayDoor", url: "sprites/HallwayScenes/Palier-Independant-Ferme/door.png" },
                    new Phaser.Math.Vector2(247, -33),
                    null,
                    null,
                    0,
                    {
                        name: 'indep_hallway_door_h',
                        url: "sprites/UI/01_Interactions/03_Palier/02_Spritesheets/02-Palier-Frapper-Spritesheet_250x150.png",
                        size: { frameWidth: 250, frameHeight: 150 },
                        pos: new Phaser.Math.Vector2(23, -456)
                    }
                ),
                new CardObject(
                    this,
                    { name: "grandmaHallwayIndep", url: "sprites/HallwayScenes/Palier-Independant-Ferme/grandma.png" },
                    new Phaser.Math.Vector2(-123, 185)
                ),
            ]
        );

        this.indep_open_card = new Card(
            this,
            [
                new Background(
                    this,
                    "sprites/HallwayScenes/Palier-Independant-Ouvert/bg.jpg",
                    "indepHallwayBGOpen"
                ),
                new CardObject(
                    this,
                    { name: "indepHallway", url: "sprites/HallwayScenes/Palier-Independant-Ouvert/indep.png" },
                    new Phaser.Math.Vector2(287, 82)
                ),
                new CardObject(
                    this,
                    { name: "grandmaHallwayIndepOpen", url: "sprites/HallwayScenes/Palier-Independant-Ouvert/grandma.png" },
                    new Phaser.Math.Vector2(-123, 185)
                )
            ],
            null,
            true
        );

        this.indep_grandma_card = new Card(
            this,
            [
                new Background(
                    this,
                    "sprites/HallwayScenes/Palier-Grand-Mere-Ouvert/bg.jpg",
                    "indepGrandmaHallwayBG"
                ),
                new CardObject(
                    this,
                    { name: "grandmaHallway", url: "sprites/HallwayScenes/Palier-Grand-Mere-Ouvert/grandma.png" },
                    new Phaser.Math.Vector2(207, 57)
                ),
                new CardObject(
                    this,
                    { name: "indepGrandmaHallway", url: "sprites/HallwayScenes/Palier-Grand-Mere-Ouvert/indep.png" },
                    new Phaser.Math.Vector2(-110, 114)
                )
            ],
            null,
            true
        );

        this.cards = [
            this.damien_closed_card,
            this.damien_open_card,
            this.indep_closed_card,
            this.indep_open_card,
            this.indep_grandma_card
        ];

        //Keep track of wich card is displayed
        this.cardIdx = HallwayCards.DAMIEN_CLOSED;
        this.current_card = this.damien_closed_card;

        //Create the dialogue controller
        this.dialogue = new DialogueController(this, "hallwayDialog");
    }

    /**
     * @brief Preloads the scene using saved data (if any)
     * @param {JSON} data { cardIdx, damien_gone }
     */
    init(data) {
        //Check if any saved data exists
        if(data) {

            //Set the correct card
            switch(data.cardIdx) {
            case HallwayCards.DAMIEN_CLOSED:
                this.cardIdx = HallwayCards.DAMIEN_CLOSED;
                this.current_card = this.damien_closed_card;
                break;

            case HallwayCards.DAMIEN_OPEN:
                this.cardIdx = HallwayCards.DAMIEN_OPEN;
                this.current_card = this.damien_open_card;
                break;

            case HallwayCards.INDEP_CLOSED:
                this.cardIdx = HallwayCards.INDEP_CLOSED;
                this.current_card = this.indep_closed_card;
                break;

            case HallwayCards.INDEP_OPEN:
                this.cardIdx = HallwayCards.INDEP_OPEN;
                this.current_card = this.indep_open_card;
                break;

            case HallwayCards.INDEP_GRANDMA:
                this.cardIdx = HallwayCards.INDEP_GRANDMA;
                this.current_card = this.indep_grandma_card;
                break;

            default:
                break;
            }
        }
    }

    /**
     * @brief Notifies the protoGuy that his clothes have changed
     * @param {ProtoGuyClothes} clothes the protoguy's new clothes
     */
    changeClothes(clothes) {
        if(this.current_card.hasCharacter()) {
            this.clothes = clothes;
            this.current_card.character.notifyClothesChange();
        }
    }

    /**
     * @brief preload all of the elements of all of the cards
     * that will be shown in the scene
     */
    preload() {
        //Preload the dialogue controller
        this.dialogue.preload();

        //Preload all of the cards
        this.cards.forEach(card => card.preload());

        this.load.audio("door", ["sounds/hallway/door.wav", "sounds/hallway/door.mp3"]);
        this.load.audio("doorBell", ["sounds/hallway/doorBell.wav", "sounds/hallway/doorBell.mp3"]);
    }

    /**
     * @brief create all of the elements of the first card
     * in the scene.
     */
    create() {

        this.cameras.main.centerOn(0, 0);
        this.cameras.main.fadeIn(1000);

        if(this.current_card.isLoaded()) {
            this.current_card.create();
        }

        if(this.cardIdx === HallwayCards.INDEP_GRANDMA) {
            this.dialogue.display("patrickReturn");
        }

        //Update the saved data
        player.cur_scene = Scenes.HALLWAY;

        //Data that will be saved
        const savable_data = {
            cardIdx: this.cardIdx
        };

        player.setData(savable_data);
        player.saveGame();
    }

    /**
     * @brief Update the scene
     */
    update() {
        if(this.current_card.isLoaded()) {
            this.current_card.update();
        }
    }

    /**
     * @brief Ends the current card
     */
    endCard() {
        this.current_card.endCard();
    }

    /**
     * @brief Notifies the current card that the dialogue has ended
     */
    notifyDialogueEnd() {
        //Notify the current card if it is interested
        if(this.current_card.isDialogueSensitive()) {
            this.current_card.notifyDialogueEnd();
        }
    }

    /**
     * @brief moves to the next card
     * @param {Number} choice the choice that was made
     */
    nextCard(choice=-1) {
        console.log("PLAYER_DAMIEN_GONE HALLWAY: " + player.damien_gone);

        if(this.current_card.isDone()) {
            this.current_card.destroy();

            switch(this.cardIdx) {

            case HallwayCards.DAMIEN_CLOSED:
                let callback = () => {};

                //Check if Damien is home or not
                if(player.damien_gone) {
                    this.cardIdx = HallwayCards.INDEP_CLOSED;
                    this.current_card = this.indep_closed_card;

                } else {
                    this.cardIdx = HallwayCards.DAMIEN_OPEN;
                    this.current_card = this.damien_open_card;

                    this.door = this.sound.add("door");
                    this.door.play();

                    callback = () => this.dialogue.display("damienHome");
                }

                //Load the next card
                this.current_card.create();
                callback();

                break;

            case HallwayCards.DAMIEN_OPEN:
                this.cardIdx = HallwayCards.INDEP_CLOSED;
                this.current_card = this.indep_closed_card;

                //Load the next card
                this.current_card.create();
                break;

            case HallwayCards.INDEP_CLOSED:
                this.cardIdx = HallwayCards.INDEP_OPEN;
                this.current_card = this.indep_open_card;

                this.door = this.sound.add("door");
                this.door.play();

                //Load the next card
                this.current_card.create();
                this.dialogue.display("PatrickHome", true);
                break;

            case HallwayCards.INDEP_OPEN:
                this.nextScene(HallwayCards.INDEP_OPEN);
                break;

            case HallwayCards.INDEP_GRANDMA:
                this.nextScene(HallwayCards.INDEP_GRANDMA);
                break;

            default:
                break;
            }
        }
    }

    /**
     * @brief Triggers the next scene
     * @param {HallwayCards} cardIdx
     */
    nextScene(cardIdx) {
        switch(cardIdx) {
        case HallwayCards.INDEP_OPEN:
            this.scene.start(Scenes.STORE_EXT);
            break;

        case HallwayCards.INDEP_GRANDMA:
            this.scene.start(Scenes.MOTHER_KITCHEN);
            break;

        default:
            break;
        }
    }

    /**
     * @brief destroys the scene
     */
    destroy() {
        this.current_card.destroy();
    }
}
