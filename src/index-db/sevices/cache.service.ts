import { Injectable } from '@angular/core';
import { DexieCrudService } from './dexie-crud.service';
import { IUser } from '../index-db-interfaces/user.interface';
import { IUnit } from '../index-db-interfaces/unit.interface';
import { AppDatabase } from './init.idb.service';
import { LoadedStores } from '../model/loaded.store';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  User!: DexieCrudService<IUser, string>;
  Unit!: DexieCrudService<IUnit, string>;
  LoadedStores!: DexieCrudService<LoadedStores, number>;

  constructor(appDatabase: AppDatabase) {
    this.User = new DexieCrudService<IUser, string>(appDatabase.User);
    this.Unit = new DexieCrudService<IUnit, string>(appDatabase.Unit);
    this.LoadedStores = new DexieCrudService<LoadedStores, number>(
      appDatabase.LoadedStores
    );
  }
}
