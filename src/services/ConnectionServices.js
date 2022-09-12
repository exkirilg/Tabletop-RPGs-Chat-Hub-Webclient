import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useNavigate } from "react-router-dom";

import Chat from "../models/Chat";
import Message from "../models/Message";
import DiceRoll from "../models/DiceRoll";

import appsettings from "../appsettings.json";
import { setConnection, setProcessing, setFailed, setIsAuthenticated } from "../state/slices/connection";
import { setStatistics } from "../state/slices/statistics";
import { removeActiveChat } from "../state/slices/activeChats";
import { removeChat, setChats } from "../state/slices/chats";
import { setOwnChats } from "../state/slices/ownChats";
import { setMessages, addMessage } from "../state/slices/messages";

export function useEstablishConnection() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const connection = useSelector(state => state.connection.value);
    const processing = useSelector(state => state.connection.processing);
    const connectionIsAuthenticated = useSelector(state => state.connection.isAuthenticated);

    const search = useSelector(state => state.chats.search);

    const isAuthenticated = useSelector(state => state.identity.isAuthenticated);
    const token = useSelector(state => state.identity.token);
    const identityIsRestored = useSelector(state => state.identity.identityIsRestored);

    const activeChats = useSelector(state => state.activeChats.value);

    // Establish connection
    useEffect(() => {

        const disconnect = async () => {
            dispatch(setProcessing(true));
            try {
                await connection.stop();
                dispatch(setConnection(null));
                dispatch(setIsAuthenticated(false));
            }
            finally {
                dispatch(setProcessing(false));
            }
        }

        const connect = async (isAuthenticated, token) => {
            dispatch(setProcessing(true));
            try {
                dispatch(setConnection(await establishConnection(isAuthenticated, token)));
                dispatch(setFailed(false));
                dispatch(setIsAuthenticated(isAuthenticated));
            }
            catch (e) {
                console.log(e);
                dispatch(setFailed(true));
            }
            finally {
                dispatch(setProcessing(false));
            }
        }

        const establishConnection = async (isAuthenticated, token) => {
            let connection;

            if (isAuthenticated) {
                connection = new HubConnectionBuilder()
                    .withUrl(appsettings.ChatServerUrl, {accessTokenFactory: () => token})
                    .configureLogging(LogLevel.Information)
                    .build();
            }
            else {
                connection = new HubConnectionBuilder()
                    .withUrl(appsettings.ChatServerUrl)
                    .configureLogging(LogLevel.Information)
                    .build();
            }

            await configureConnection(connection);
        
            await connection.start();

            for (const chat of activeChats) {
                connection.invoke(appsettings.ChatHubMethods.JoinChatRequestMethod, chat.getMember().getId());
            }

            return connection;
        }

        const configureConnection = async (connection) => {
            connection.on(appsettings.ClientMethods.ReceiveStatisticsMethod, (statistics) => handleStatisticsReceived(statistics));
            connection.on(appsettings.ClientMethods.ReceiveChatsInfoMethod, (chatsInfo) => handleChatsInfoReceived(chatsInfo));
            connection.on(appsettings.ClientMethods.ReceiveOwnChatsInfoMethod, (chatsInfo) => handleOwnChatsInfoReceived(chatsInfo));
            connection.on(appsettings.ClientMethods.ReceiveOthersChatsInfoMethod, (chatsInfo) => handleOthersChatsInfoReceived(chatsInfo));
            connection.on(appsettings.ClientMethods.ReceiveChatHasBeenRemovedMethod, (chatsInfo) => handleChatHasBeenRemovedReceived(chatsInfo));
            connection.on(appsettings.ClientMethods.ReceiveMessagesMethod, (chatId, msgs) => handleMessagesReceived(chatId, msgs));
            connection.on(appsettings.ClientMethods.ReceiveSystemMessageMethod, (msg) => handleNewMessageReceived(msg));
            connection.on(appsettings.ClientMethods.ReceiveUserMessageMethod, (msg) => handleNewMessageReceived(msg));
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
                        return new Chat(data.id, data.name, data.author, data.description);
                    })
                )
            );
            dispatch(setOwnChats([]));
        }

        const handleOwnChatsInfoReceived = (chatsInfo) => {
            dispatch(
                setOwnChats(
                    chatsInfo.map((data) => {
                        return new Chat(data.id, data.name, data.author, data.description);
                    })
                )
            );
        }

        const handleOthersChatsInfoReceived = (chatsInfo) => {
            dispatch(
                setChats(
                    chatsInfo.map((data) => {
                        return new Chat(data.id, data.name, data.author, data.description);
                    })
                )
            );
        }

        const handleChatHasBeenRemovedReceived = (chatInfo) => {
            if (window.location.href.endsWith(chatInfo.id)) {
                dispatch(removeChat(chatInfo.id));
                dispatch(removeActiveChat(chatInfo.id));
                navigate("/");
            }
        }

        const handleMessagesReceived = (chatId, msgs) => {
            dispatch(setMessages({
                chatId: chatId,
                msgs: msgs.map((msg) => {
                    return new Message(
                        msg.id,
                        msg.chatId,
                        msg.authorId,
                        msg.author,
                        new Date(msg.dateTimeCreated),
                        msg.textContent,
                        msg.dicePoolRoll.map((roll) => {
                            return new DiceRoll(roll.position, roll.dice, roll.result)
                        }).sort((a, b) => a.compare(b))
                    )
                })
            }));
        }

        const handleNewMessageReceived = (msg) => {
            dispatch(addMessage(new Message(
                msg.id,
                msg.chatId,
                msg.authorId,
                msg.author,
                new Date(msg.dateTimeCreated),
                msg.textContent,
                msg.dicePoolRoll.map((roll) => {
                    return new DiceRoll(roll.position, roll.dice, roll.result)
                }).sort((a, b) => a.compare(b))
                )
            ));
        }

        if (!identityIsRestored) return;

        if (processing) return;

        if (connection === null) {
            connect(isAuthenticated, token);
        }
        else if (isAuthenticated !== connectionIsAuthenticated) {
            disconnect();
        }

    }, [identityIsRestored, connection, processing, connectionIsAuthenticated, isAuthenticated, token, activeChats, dispatch])

    // Requests on connection
    useEffect(() => {

        if (processing) return;

        if (connection && connection.state === "Connected") {
            
            connection.invoke(appsettings.ChatHubMethods.StatisticsRequestMethod);
            
            if (connectionIsAuthenticated) {
                connection.invoke(
                    appsettings.ChatHubMethods.OwnChatsInfoRequestMethod
                );
                connection.invoke(
                    appsettings.ChatHubMethods.OthersChatsInfoRequestMethod,
                    search
                );
            }
            else {
                connection.invoke(
                    appsettings.ChatHubMethods.ChatsInfoRequestMethod,
                    search
                );
            }
        }

    }, [connection, connectionIsAuthenticated, processing, search])
}
