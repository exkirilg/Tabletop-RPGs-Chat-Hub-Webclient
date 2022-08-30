import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import appsettings from "../appsettings.json";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setConnection, setFailed } from "../state/slices/connection";

export function useEstablishConnection() {
    const dispatch = useDispatch();
    const connection = useSelector(state => state.connection.value);

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

        }

        if (!connection) {
            tryConnect();
        }
    
      }, [connection, dispatch])
}
