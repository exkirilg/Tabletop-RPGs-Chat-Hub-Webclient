const Member = class {
    #id;
    #name;
    #chat;

    constructor(id, name, chat) {
        this.#id = id;
        this.#name = name;
        this.#chat = chat;
    }

    getId() {
        return this.#id;
    }

    getName() {
        return this.#name;
    }

    getChat() {
        return this.#chat;
    }

    compare(otherMember) {
        if (this.#name < otherMember.getName()) return -1;
        else if (this.#name > otherMember.getName()) return 1;
        else return 0;
    }
}

export default Member;
