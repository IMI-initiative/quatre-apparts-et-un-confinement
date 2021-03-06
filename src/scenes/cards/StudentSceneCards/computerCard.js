import Phaser from "phaser";
import { Background } from "../../objects/background";
import { ProtoGuy, ProtoGuyCard } from "../../../characters/protoGuy";
import { CardObject } from "../../objects/cardObject";
import { Card } from "../card";
import { Scenes } from "../../../core/player";

const CLASS_ID = {
    MARCH: "zoom",
    INIT: "init"
};

/**
 * @brief Models a "Card" inside of a scene.
 * A card can be seen as a set of images that represent
 * a given interactive moment in a scene
 */
export class ComputerCard extends Card {
    /**
     * @brief Constructs a group of objects in the scene
     * @param {Phaser.Scene} parent_scene, the Scene which this card belongs to
     * @param {Scenes} scene_key the name of the scene which this card belongs to
     */
    constructor(parent_scene, scene_key) {
        //Store the card's character
        let character = new ProtoGuy(parent_scene, 196, 132, ProtoGuyCard.COMPUTER);

        //Initialize children array
        const children = [
            new Background(parent_scene, "sprites/StudentScene/ComputerCard/bg.jpg", "ComputerBG"),
            character,
            new CardObject(
                parent_scene,
                { name: "Bureau", url: "sprites/StudentScene/ComputerCard/bureau.png" },
                new Phaser.Math.Vector2(-1, 143)
            ),
            new CardObject(
                parent_scene,
                { name: "toast", url: "sprites/StudentScene/ComputerCard/toast.png" },
                new Phaser.Math.Vector2(387, 706)
            ),
            new CardObject(
                parent_scene,
                { name: "yoghourt", url: "sprites/StudentScene/ComputerCard/yoghourt.png" },
                new Phaser.Math.Vector2(380, 564)
            ),
            new CardObject(
                parent_scene,
                { name: "verre", url: "sprites/StudentScene/ComputerCard/verre.png" },
                new Phaser.Math.Vector2(141, 641)
            )
        ];

        //Call base constructor
        super(parent_scene, children, character, true);

        this.scene_key = scene_key;
    }

    /**
     * @brief Creates the card and shows the text
     */
    create() {
        super.create();

        const id = this.scene_key === Scenes.DAMIEN_INIT ? CLASS_ID.INIT : CLASS_ID.MARCH;

        //Show the dialogue
        this.parent_scene.dialogue.display(id);
    }

    /**
     * @brief Shows one of the items
     * @param {Number} choice the choice that was made to get here
     */
    showItem(choice=-1) {
        let destructs = [];
        switch(choice) {
        case 0:
            destructs = [this.children[4], this.children[5]];
            destructs.forEach(child => child.destroy());
            break;

        case 1:
            destructs = [this.children[3], this.children[5]];
            destructs.forEach(child => child.destroy());
            break;

        case 2:
            destructs = [this.children[3], this.children[4]];
            destructs.forEach(child => child.destroy());
            break;

        default:
            destructs = [this.children[3], this.children[4], this.children[5]];
            destructs.forEach(child => child.destroy());
            break;
        }
    }
}
