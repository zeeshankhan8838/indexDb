import Dexie, { Collection } from 'dexie';
import { EntityStateEnum } from '../enum/idb.enum';

export interface ITableSchema {
  name: string;
  schema: string;
}

export interface IDexieTableSchema {
  name: string;
  primKey: { src: string };
  indexes: { src: string }[];
}

export interface IFilterDelegate {
  (dbSet: Dexie.Table): Collection;
}

export interface IEntitySyncDTO {
  Entity: object;
  State: EntityStateEnum;
  Table: string;
}
