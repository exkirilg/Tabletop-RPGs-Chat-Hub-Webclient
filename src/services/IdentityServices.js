import appsettings from "../appsettings.json";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setIdentityIsRestored, setIsAuthenticated, setToken, setUsername, setNickname } from "../state/slices/identity";
import { setActiveChats } from "../state/slices/activeChats";
import { getActiveChats } from "./APIServices";

export function useRestoreIdentity() {
    
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(state => state.identity.isAuthenticated);

    useEffect(() => {

        const tryRestoreIdentity = async () => {
            const identity = localStorage.getItem("identity");
            if (identity !== null) {
                const data = JSON.parse(identity);

                dispatch(setIsAuthenticated(true));
                dispatch(setToken(data.token));
                dispatch(setUsername(data.username));
                dispatch(setNickname(data.username));

                dispatch(setActiveChats(await getActiveChats({ authToken: data.token })));
            }
        }

        if (!isAuthenticated) {
            tryRestoreIdentity();
            dispatch(setIdentityIsRestored(true));
        }
    
    }, [isAuthenticated, dispatch])
}

export async function signin ({email, password}) {

    let result = {
        "succeeded": false,
        "systemMessage": "",
        "token": "",
        "username": ""
    }

    const request = new Request(
        `${appsettings.APIServerUrl}/identity/signin`,
        {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "email": email, "password": password })
        }
    );

    const response = await fetch(request);

    let body = null;
    try {
        body = await response.json();
    } catch {}

    if (response.ok) {
        result.succeeded = true;
        result.token = body.token;
        result.username = body.username;
    }
    else if (body !== null) {
        try {
            result.systemMessage = body.errors.Authentication[0];
        } catch {}
    }

    return result;
}

export async function signup ({email, name, password, passwordConfirmation}) {

    let result = {
        "succeeded": false,
        "systemMessage": "",
        "token": "",
        "username": ""
    }

    const request = new Request(
        `${appsettings.APIServerUrl}/identity/signup`,
        {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "email": email, "name": name, "password": password, "passwordConfirmation": passwordConfirmation })
        }
    );

    const response = await fetch(request);

    let body = null;
    try {
        body = await response.json();
    } catch {}

    if (response.ok) {
        result.succeeded = true;
        result.token = body.token;
        result.username = body.username;
    }
    else if (body !== null) {
        try {
            result.systemMessage = body.errors.Authentication[0];
        } catch {}
    }

    return result;
}

export async function signout () {  
    removeIdentity();
}

export function saveIdentity({token, username}) {
    localStorage.setItem(
        "identity",
        JSON.stringify({ token: token, username: username }));
}

export function removeIdentity() {
    localStorage.removeItem("identity");
}

export async function removeMember (memberId) {
    const request = new Request(
        `${appsettings.APIServerUrl}/members/remove/${memberId}`,
        {
            method: "post",
            headers: { "Content-Type": "application/json" }
        }
    );

    await fetch(request);
}
