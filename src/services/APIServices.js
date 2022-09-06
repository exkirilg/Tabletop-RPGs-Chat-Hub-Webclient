import appsettings from "../appsettings.json";

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

function ParceResponseBodyErrors(errors, errorsTypes) {
    let result = "";
    
    errorsTypes.forEach(errorType => {
        if (errors[errorType]) {
            result += (result === "" ? "" : "\n") + errors[errorType];
        }
    });

    return result;
}
