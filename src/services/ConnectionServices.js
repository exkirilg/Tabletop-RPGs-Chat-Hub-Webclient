import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

import Chat from "../models/Chat";

import appsettings from "../appsettings.json";
import { setConnection, setFailed } from "../state/slices/connection";
import { setStatistics } from "../state/slices/statistics";
import { setChats } from "../state/slices/chats";

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
            connection.on(appsettings.ClientMethods.ReceiveStatisticsMethod, (statistics) => handleStatisticsReceived(statistics));
            connection.on(appsettings.ClientMethods.ReceiveChatsInfoMethod, (chatsInfo) => handleChatsInfoReceived(chatsInfo));
        }

        const handleStatisticsReceived = (statistics) => {
            dispatch(
                setStatistics(statistics)
            );
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

    // Requests on connection
    useEffect(() => {

        if (connection) {
            
            connection.invoke(appsettings.ChatHubMethods.StatisticsRequestMethod);
            
            connection.invoke(
                appsettings.ChatHubMethods.ChatsInfoRequestMethod,
                Number(appsettings.MaxNumberOfChatsDisplayed), null
            );

        }

    }, [connection])
}
