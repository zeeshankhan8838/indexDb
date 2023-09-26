import { LoadedStores } from '../model/loaded.store';
import { Unit } from '../model/unit.model';
import { User } from '../model/user.model';

const userInstance = new User();
const unitInstance = new Unit();
const loadedStoresInstance = new LoadedStores();

// Define a generic function to generate columns with a constraint
function generateColumns<T extends Record<string, any>>(instance: T): string {
  return (Object.keys(instance) as (keyof T)[]).join(',');
}

export const DBStores = {
  User: {
    TableName: 'User',
    Columns: generateColumns(userInstance),
  },
  Unit: {
    TableName: 'Unit',
    Columns: generateColumns(unitInstance),
  },
  LoadedStores: {
    TableName: 'LoadedStores',
    Columns: generateColumns(loadedStoresInstance),
  },
};
