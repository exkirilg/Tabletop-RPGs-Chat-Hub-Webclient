const Chat = class {
    #id;
    #name;
    #author;
    #description;
    #members;
    #messages;
    #hasUnreadMessages;

    constructor(id, name, author, description, members = [], messages = [], hasUnreadMessages = false) {
        this.#id = id;
        this.#name = name;
        this.#author = author;
        this.#description = description;
        this.#members = members;
        this.#messages = messages;
        this.#hasUnreadMessages = hasUnreadMessages
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

export default Chat;
