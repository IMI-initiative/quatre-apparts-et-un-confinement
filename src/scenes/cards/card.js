/**
 * @brief Represents the card's current state
 * meaning whether it has finished loading or not and 
 * whether the card is still in use or not
 */
export const CardState = {
    INIT: 0,
    LOADED: 1,
    DONE: 2
};

/**
 * @brief Models a "Card" inside of a scene.
 * A card can be seen as a set of images that represent 
 * a given interactive moment in a scene
 */
export class Card {
    /**
     * @brief Constructs a group of objects in the scene
     * @param {Phaser.Scene} parent_scene, the Scene which this card belongs to
     * @param {array} children, the objects that are in the card
     * @param character, the scene's character (if any)
     * @param {boolean} dialogueSensitive whether or not the card should end when the dialogue ends
     */
    constructor(parent_scene, children, character=null, dialogueSensitive=null) {
        //Initialize attributes
        this.children = children;
        this.parent_scene = parent_scene;
        this.cur_state = CardState.INIT;

        //Store the card's character
        this.character = character;

        //Store the dialogue sensitivity field
        this.dialogueSensitive = dialogueSensitive;
    }

    /**
     * @brief Tells us whether or not the current scene has a character
     * @returns {boolean} true if there is a character, false otherwise
     */
    hasCharacter() {
        return this.character !== null;
    }

    /**
     * @brief Tells us whether or not the current card is changed by dialogue
     * @returns {boolean} true if the current card is dialogue sensitive, false otherwise
     */
    isDialogueSensitive() {
        if(this.dialogueSensitive !== null) {
            return this.dialogueSensitive;
        } 
        return false;
    }

    /**
     * @brief Handles a dialogue end notification
     */
    notifyDialogueEnd() {
        this.endCard();
        this.parent_scene.nextCard();
    }

    /**
     * @brief getter for the card's state
     * @return {CardState} The card's current state
     */
    getState() {
        return this.cur_state;
    }

    /**
     * @brief Checks if the card has been loaded yet
     * @return {boolean} Whether the card has been loaded or not
     */
    isLoaded() {
        return this.cur_state !== CardState.INIT;
    }

    /**
     * @brief Checks if the card has finished doing its thing
     * @return {boolean} Whether the card is done or not
     */
    isDone() {
        return this.cur_state === CardState.DONE;
    }

    /**
     * @brief Ends the current card
     */
    endCard() {
        this.cur_state = CardState.DONE;
    }

    /**
     * @brief Preloads all of the elements in the group
     * Assumes that all objects are images
     */
    preload() {
        this.children.forEach(child => child.preload());
        this.cur_state = CardState.LOADED;
    }

    /**
     * @brief Creates all of the elements in the group
     * Assumes that all objects are images
     */
    create() {
        this.children.forEach(child => child.create());
    }

    /**
     * @brief Updates the sate of the card
     */
    update() {
        this.children.forEach(child => child.update());
    }

    /**
     * @breif Unloads all the different elements of the card from memory
     */
    destroy() {
        this.children.forEach(child => child.destroy());
    }
}