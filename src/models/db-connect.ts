import { Sequelize } from 'sequelize-typescript';

import { appConfig } from '../config';
import { Url } from './url/url.entity';

let sequelize: Sequelize | null = null;

export const getConnection = async (): Promise<Sequelize> => {
  if (!sequelize) {
    sequelize = new Sequelize({
      dialect: 'mysql',
      host: appConfig.dbConfig.host,
      password: appConfig.dbConfig.password,
      database: appConfig.dbConfig.databaseName,
      username: appConfig.dbConfig.username,
      pool: {
        max: appConfig.dbConfig.poolSize,
      },
      sync: {
        force: !appConfig.isProduction,
        alter: !appConfig.isProduction,
      },
    });
    sequelize.addModels([Url]);
    await sequelize.authenticate();

    /**
     * TODO: по правильно тут потрібно використовувати міграції але в sequelize це доволі колюча тема))).
     * Оскільки вони не можуть запускатися автоматично з коробки і не тіпізовані 
     * тому тут потрібно було потратити пару годин щоб зробити їх типізованими і підключити umzug 
     * і подумати як це все буде працювати разом з докером і динамічними конфігом
     * Але не було на це часу нажаль))).
     */
    await sequelize.sync();
  }

  return sequelize;
};
