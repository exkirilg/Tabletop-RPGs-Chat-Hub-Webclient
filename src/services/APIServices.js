import appsettings from "../appsettings.json";
import ActiveChat from "../models/ActiveChat";
import Member from "../models/Member";

export async function createNewChat({name, description, authToken}) {
    let result = { "succeeded": false, "systemMessage": "" }

    const request = new Request(
        `${appsettings.APIServerUrl}/chats/new`,
        {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authToken
            },
            body: JSON.stringify({ "name": name, "description": description })
        }
    );

    const response = await fetch(request);

    let body = null;
    try {
        body = await response.json();
    } catch {}

    if (response.ok) {
        result.succeeded = true;
    }
    else if (body !== null) {
        result.systemMessage = ParceResponseBodyErrors(body.errors, ["Name", "Description", "Chat", "MaxNumberOfOwnChats"])
    }

    return result;
}

export async function removeChat({chatId, authToken}) {
    let result = { "succeeded": false, "systemMessage": "" }

    const request = new Request(
        `${appsettings.APIServerUrl}/chats/remove/${chatId}`,
        {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authToken
            }
        }
    );

    const response = await fetch(request);

    let body = null;
    try {
        body = await response.json();
    } catch {}

    if (response.ok) {
        result.succeeded = true;
    }
    else if (body !== null) {
        result.systemMessage = ParceResponseBodyErrors(body.errors, ["Chat"])
    }

    return result;
}

export async function getChatInfo(id) {
    let result = { "succeeded": false, "info": null }

    const request = new Request(
        `${appsettings.APIServerUrl}/chats/${id}`,
        {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    const response = await fetch(request);

    let body = null;
    try {
        body = await response.json();
    } catch {}

    if (response.ok) {
        result.succeeded = true;
        result.info = body;
    }

    return result;
}

export async function getActiveChats({authToken}) {
    const getMembersResult = await getMembers({ authToken: authToken });
    let result = [];
    if (getMembersResult.succeeded) {

        await Promise.all(getMembersResult.members.map(async (member) => {
            const getChatResult = await getChatInfo(member.chatId);
            if (getChatResult.succeeded) {
                const chat = new ActiveChat(getChatResult.info.id, getChatResult.info.name, getChatResult.info.author, getChatResult.info.description);
                chat.setMember(new Member(member.id, chat, member.username, member.nickname));
                result = [...result, chat];
            }
        }))
    }
    return result;
}

export async function getMembers({authToken}) {
    let result = { "succeeded": false, "members": null }

    const request = new Request(
        `${appsettings.APIServerUrl}/members`,
        {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authToken
            }
        }
    );

    const response = await fetch(request);

    let body = null;
    try {
        body = await response.json();
    } catch {}

    if (response.ok) {
        result.succeeded = true;
        result.members = body;
    }

    return result;
}

export async function getMemberInfo(id) {
    let result = { "succeeded": false, "info": null }

    const request = new Request(
        `${appsettings.APIServerUrl}/members/${id}`,
        {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    const response = await fetch(request);

    let body = null;
    try {
        body = await response.json();
    } catch {}

    if (response.ok) {
        result.succeeded = true;
        result.info = body;
    }

    return result;
}

export async function createNewMember({chatId, nickname, authToken}) {
    let result = { "succeeded": false, "systemMessage": "", "info": null }

    const request = new Request(
        `${appsettings.APIServerUrl}/members/new`,
        {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken === "" ? "" : "Bearer " + authToken
            },
            body: JSON.stringify({ "chatId": chatId, "nickname": nickname })
        }
    );

    const response = await fetch(request);

    let body = null;
    try {
        body = await response.json();
    } catch {}

    if (response.ok) {
        result.succeeded = true;
        result.info = body;
    }
    else if (body !== null) {
        result.systemMessage = ParceResponseBodyErrors(body.errors, ["Nickname", "Member"])
    }

    return result;
}

export async function updateMember({memberId, authToken}) {
    let result = { "succeeded": false, "systemMessage": "" }

    const request = new Request(
        `${appsettings.APIServerUrl}/members/update/${memberId}`,
        {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authToken
            }
        }
    );

    const response = await fetch(request);

    let body = null;
    try {
        body = await response.json();
    } catch {}

    if (response.ok) {
        result.succeeded = true;
    }
    else if (body !== null) {
        result.systemMessage = ParceResponseBodyErrors(body.errors, ["Id"])
    }

    return result;
}

export async function removeMember({memberId, authToken}) {
    let result = { "succeeded": false, "systemMessage": "" }

    const request = new Request(
        `${appsettings.APIServerUrl}/members/remove/${memberId}`,
        {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authToken === "" ? "" : "Bearer " + authToken
            }
        }
    );

    const response = await fetch(request);

    let body = null;
    try {
        body = await response.json();
    } catch {}

    if (response.ok) {
        result.succeeded = true;
    }
    else if (body !== null) {
        result.systemMessage = ParceResponseBodyErrors(body.errors, ["Nickname", "Member"])
    }

    return result;
}

function ParceResponseBodyErrors(errors, errorsTypes) {
    let result = "";
    
    errorsTypes.forEach(errorType => {
        if (errors[errorType]) {
            result += (result === "" ? "" : "\n") + errors[errorType];
        }
    });

    return result;
}
