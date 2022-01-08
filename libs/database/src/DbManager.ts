import {
    baseOrmConfig
} from '@hapel/database';

import { 
    Connection,
    ConnectionManager,
    ConnectionOptions,
    createConnection,
    getConnectionManager 
} from 'typeorm';

export default class DbManager {
  private connectionManager: ConnectionManager;
  
  constructor() {
    this.connectionManager = getConnectionManager();
  }

  async getConnection(): Promise<Connection> {
    const CONNECTION_NAME = 'default';

    let connection: Connection;

    if (this.connectionManager.has(CONNECTION_NAME)) {
      console.log('has default conn');
      connection = await this.connectionManager.get(CONNECTION_NAME);

      if (!connection.isConnected) {
        connection = await connection.connect();
      }
    } else {
      console.log('create new conn');
      const connectionOptions: ConnectionOptions = {
        name: CONNECTION_NAME,
        ...baseOrmConfig(),
        entities: [
        ],
      };

      connection = await createConnection(connectionOptions);
    }

    return connection;
  }
}