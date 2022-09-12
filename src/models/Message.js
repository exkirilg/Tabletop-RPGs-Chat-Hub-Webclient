const Message = class {
    #id;
    #chatId;
    #authorId;
    #author;
    #dateTimeCreated;
    #textContent;
    #dicePoolRoll;

    constructor(id, chatId, authorId, author, dateTimeCreated, textContent, dicePoolRoll = []) {
        this.#id = id;
        this.#chatId = chatId;
        this.#authorId = authorId;
        this.#author = author;
        this.#dateTimeCreated = dateTimeCreated;
        this.#textContent = textContent;
        this.#dicePoolRoll = dicePoolRoll;
    }

    getId() {
        return this.#id;
    }

    getChatId() {
        return this.#chatId;
    }

    getAuthorId() {
        return this.#authorId;
    }

    getAuthor() {
        return this.#author;
    }

    getDateTimeCreated() {
        return this.#dateTimeCreated;
    }

    getTextContent() {
        return this.#textContent;
    }

    getDicePoolRoll() {
        return this.#dicePoolRoll;
    };

    compare(otherMsg) {
        if (this.#dateTimeCreated < otherMsg.getDateTimeCreated()) return -1;
        else if (this.#dateTimeCreated > otherMsg.getDateTimeCreated()) return 1;
        else return 0;
    }
}

export default Message;
