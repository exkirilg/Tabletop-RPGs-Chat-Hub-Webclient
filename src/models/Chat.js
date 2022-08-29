const Chat = class {
    #id;
    #name;
    #members;
    #messages;

    constructor(id, name, members = [], messages = []) {
        this.#id = id;
        this.#name = name;
        this.#members = members;
        this.#messages = messages;
    }

    getId() {
        return this.#id;
    }

    getName() {
        return this.#name;
    }

    getMembers() {
        return this.#members;
    }
    addMember(member) {
        this.#members = [...this.#members, member].sort((a, b) => a.compare(b));
    }
    removeMember(memberId) {
        this.#members = this.#members.filter(m => m.id !== memberId);
    }

    getMessages() {
        return this.#messages;
    }
    addMessage(msg) {
        this.#messages = [...this.#messages, msg].sort((a, b) => a.compare(b));
    }

    compare(otherChat) {
        if (this.#name < otherChat.getName()) return -1;
        else if (this.#name > otherChat.getName()) return 1;
        else return 0;
    }
}

export default Chat;
