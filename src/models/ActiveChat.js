const ActiveChat = class {
    #id;
    #name;
    #author;
    #description;
    #member;

    constructor(id, name, author, description) {
        this.#id = id;
        this.#name = name;
        this.#author = author;
        this.#description = description;
        this.#member = null;
    }

    getId() {
        return this.#id;
    }

    getName() {
        return this.#name;
    }

    getAuthor() {
        return this.#author;
    }

    getDescription() {
        return this.#description;
    }

    getMember() {
        return this.#member;
    }
    setMember(member) {
        this.#member = member;
    }

    compare(otherChat) {
        if (this.#name < otherChat.getName()) return -1;
        else if (this.#name > otherChat.getName()) return 1;
        else return 0;
    }
}

export default ActiveChat;
