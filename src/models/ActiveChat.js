const ActiveChat = class {
    #id;
    #name;
    #author;
    #description;
    #member;
    #members;
    #messages;
    #hasUnreadMessages;

    constructor(id, name, author, description) {
        this.#id = id;
        this.#name = name;
        this.#author = author;
        this.#description = description;
        this.#member = null;
        this.#members = [];
        this.#messages = [];
        this.#hasUnreadMessages = false
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

    getHasUnreadMessages() {
        return this.#hasUnreadMessages;
    }
    setHasUnreadMessages(value) {
        this.#hasUnreadMessages = value;
    }

    compare(otherChat) {
        if (this.#name < otherChat.getName()) return -1;
        else if (this.#name > otherChat.getName()) return 1;
        else return 0;
    }
}

export default ActiveChat;
