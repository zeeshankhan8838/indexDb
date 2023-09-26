import { Injectable } from '@angular/core';
import Dexie, { TableSchema } from 'dexie';
import { Unit } from '../model/unit.model';
import { IUnit } from '../index-db-interfaces/unit.interface';
import { IUser } from '../index-db-interfaces/user.interface';
import { DBStores } from './idb.store.model';
import {
  IDexieTableSchema,
  ITableSchema,
} from '../index-db-interfaces/idb.interface';
import { LoadedStores } from '../model/loaded.store';

@Injectable({
  providedIn: 'root',
})
export class AppDatabase extends Dexie {
  User!: Dexie.Table<IUser, string>;
  Unit!: Dexie.Table<IUnit, string>;
  LoadedStores!: Dexie.Table<LoadedStores, number>;

  versionNumber: number = 1;
  private dbName: string = 'index-db-app';
  constructor() {
    super('index-db-app');
    this.setIndexDbTable();
    this.seedData();
  }

  seedData() {
    this.on('populate', async () => {
      await this.LoadedStores.add(new LoadedStores());
    });
  }

  setIndexDbTable() {
    this.version(this.versionNumber).stores(this.setTablesSchema());
    console.log('database initialized');
    this.User = this.table(DBStores.User.TableName);
    this.Unit = this.table(DBStores.Unit.TableName);
  }

  private setTablesSchema() {
    return Object.entries(DBStores).reduce((tables, [key, value]) => {
      tables[value.TableName] = value.Columns;
      return tables;
    }, {} as Record<string, string>);
  }

  async migrateDB() {
    if (await Dexie.exists(this.dbName)) {
      const declaredSchema = this.getCanonicalComparableSchema(this);
      const dynDb = new Dexie(this.dbName);
      const installedSchema = await dynDb
        .open()
        .then(this.getCanonicalComparableSchema);
      dynDb.close();
      if (declaredSchema !== installedSchema) {
        console.log('Db schema is not updated, so deleting the db.');
        await this.clearDB();
      }
    }
  }

  getCanonicalComparableSchema(db: Dexie): string {
    const tableSchemas: ITableSchema[] = db.tables.map((table) =>
      this.getTableSchema(table)
    );
    return JSON.stringify(
      tableSchemas.sort((a, b) => (a.name < b.name ? 1 : -1))
    );
  }

  getTableSchema(table: {
    name: string;
    schema: IDexieTableSchema;
  }): ITableSchema {
    const { name, schema } = table;
    const indexSources = schema.indexes.map((idx) => idx.src).sort();
    const schemaString = [schema.primKey.src, ...indexSources].join(',');
    return { name, schema: schemaString };
  }

  async clearDB() {
    console.log('deleting DB...');
    this.close();
    await this.delete();
    await this.open();
    console.log('DB deleted.');
  }
}
