import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

import Chat from "../models/Chat";

import appsettings from "../appsettings.json";
import { setConnection, setFailed } from "../state/slices/connection";
import { setChats } from "../state/slices/activeChats";

export function useEstablishConnection() {
    const dispatch = useDispatch();
    const connection = useSelector(state => state.connection.value);

    // Establish connection
    useEffect(() => {

        const tryConnect = async () => {
            try {
                dispatch(setConnection(await establishConnection()));
                dispatch(setFailed(false));
            }
            catch (e) {
                console.log(e);
                dispatch(setFailed(true));
            }
        }

        const establishConnection = async () => {
            let connection = new HubConnectionBuilder()
                .withUrl(appsettings.ChatServerUrl)
                .configureLogging(LogLevel.Information)
                .build();
        
            await configureConnection(connection);
        
            await connection.start();

            return connection;
        }

        const configureConnection = async (connection) => {
            connection.on(appsettings.ClientMethods.ReceiveChatsInfoMethod, (chatsInfo) => handleChatsInfoReceived(chatsInfo));
        }

        const handleChatsInfoReceived = (chatsInfo) => {
            dispatch(
                setChats(
                    chatsInfo.map((data) => {
                        return new Chat(data.id, data.name);
                    })
                )
            );
        }

        if (!connection) {
            tryConnect();
        }
    
    }, [connection, dispatch])

    // Active chats request
    useEffect(() => {

        if (connection) {
            connection.invoke(
                appsettings.ChatHubMethods.ChatsInfoRequestMethod,
                Number(appsettings.MaxNumberOfChatsDisplayed), null
            )
        }

    }, [connection])
}
