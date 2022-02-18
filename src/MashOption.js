export default class MashOption {
    constructor(value, type) {
        this.value = value;
        this.type = type;
        this.chosen = false;
        this.crossedOut = false;
    }
}
