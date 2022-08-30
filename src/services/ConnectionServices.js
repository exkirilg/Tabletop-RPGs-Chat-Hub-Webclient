import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import appsettings from "../appsettings.json";

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

export default establishConnection;
