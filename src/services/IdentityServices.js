import appsettings from "../appsettings.json";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setIsAuthenticated, setToken, setName } from "../state/slices/identity";

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
            result.systemMessage = body.Authentication[0];
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

export function useRestoreIdentity() {
    
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(state => state.identity.isAuthenticated);

    useEffect(() => {

        const tryRestoreIdentity = () => {
            const identity = localStorage.getItem("identity");
            if (identity !== null) {
                const data = JSON.parse(identity);
                dispatch(setIsAuthenticated(true));
                dispatch(setToken(data.token));
                dispatch(setName(data.username));
            }
        }

        if (!isAuthenticated) {
            tryRestoreIdentity();
        }
    
    }, [isAuthenticated, dispatch])
}
