const Member = class {
    #id;
    #chat;
    #username;
    #nickname;

    constructor(id, chat, username, nickname) {
        this.#id = id;
        this.#chat = chat;
        this.#username = username;
        this.#nickname = nickname;
    }

    getId() {
        return this.#id;
    }

    getChat() {
        return this.#chat;
    }

    getUsername() {
        return this.#username;
    }
    setUsername(username) {
        this.#username = username;
    }

    getNickname() {
        return this.#nickname;
    }

    compare(otherMember) {
        if (this.#nickname < otherMember.getNickname()) return -1;
        else if (this.#nickname > otherMember.getNickname()) return 1;
        else return 0;
    }
}

export default Member;
