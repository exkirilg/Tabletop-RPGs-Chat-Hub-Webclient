const Message = class {
    #id;
    #chat;
    #author;
    #dateTimeCreated;
    #textContent;

    constructor(id, chat, author, dateTimeCreated, textContent) {
        this.#id = id;
        this.#chat = chat;
        this.#author = author;
        this.#dateTimeCreated = dateTimeCreated;
        this.#textContent = textContent;
    }

    getId() {
        return this.#id;
    }

    getChat() {
        return this.#chat;
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
