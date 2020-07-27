import Phaser from "phaser";
import { Scenes } from "../core/player.js";
import { Months } from "./buildingScene.js";
import { IndepComputerCards } from "./indepComputerScene.js";

export class SelectScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Select' });

        this.levels = [
            { key: Scenes.STORE, data: {month: Months.MARCH}, text: "Store Patrick" },
            { key: Scenes.STORE, data: {month: Months.MAY}, text: "Store Damien" },
            { key: Scenes.INDEP_COMPUTER, data: {cardIdx: IndepComputerCards.IDLE_CARD}, text: "Patrick April" }
        ];

        this.texts = [];
    }

    preload() {}

    create() {
        this.cameras.main.centerOn(0, 0);
        this.cameras.main.fadeIn(1000);
        this.cameras.main.setBackgroundColor("#f4e1c5");

        const offset = window.innerHeight/(this.levels.length + 2);
        let y_offset = offset - window.innerHeight/2;

        this.levels.forEach(level => {
            const text = this.add.text(
                0,
                y_offset,
                level.text,
                {font: 55 + "px OpenSans", fill: "#27303A"}
            );

            y_offset += offset;

            text.setOrigin(0.5, 0.5);
            text.setInteractive().on('pointerdown', () => this.scene.start(level.key, level.data));

            this.texts.push();
        });
    }
    
    destroy() {
        this.texts.forEach(text => text.destroy());
    }

}
