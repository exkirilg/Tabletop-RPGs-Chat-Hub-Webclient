const Message = class {
    #id;
    #chatId;
    #author;
    #dateTimeCreated;
    #textContent;

    constructor(id, chatId, author, dateTimeCreated, textContent) {
        this.#id = id;
        this.#chatId = chatId;
        this.#author = author;
        this.#dateTimeCreated = dateTimeCreated;
        this.#textContent = textContent;
    }

    getId() {
        return this.#id;
    }

    getChatId() {
        return this.#chatId;
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

    compare(otherMsg) {
        if (this.#dateTimeCreated < otherMsg.getDateTimeCreated()) return -1;
        else if (this.#dateTimeCreated > otherMsg.getDateTimeCreated()) return 1;
        else return 0;
    }
}

export default Message;
