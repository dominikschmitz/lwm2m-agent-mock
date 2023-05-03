
import { JSONFile } from 'lowdb/node';
import { Low } from 'lowdb';
import { fileURLToPath } from 'url';
import { join, dirname} from 'path';
import { chain, get } from 'lodash-es';

export type Data = {
  devices: any[]
};

export type Configuration = {
  id: string,
  [key: string]: any
}

export class LowWithLodash<T> extends Low<T> {
  chain = chain(this).get('data');
  getDeviceById = (id: string) => {
    if (!id || id.length === 0) {
      throw new Error('invalid id');
    }
    const devices = get(this.data, 'devices', []);
    const index = (devices as any[]).findIndex(device => device.id === id);
    return { index, device: index >= 0 ? devices[index] : undefined };
  };
}

const __dirname = dirname(fileURLToPath(import.meta.url));
let db;

export async function createDatabase() {
  if (db) {
    console.log('Database already created. Use getDatabase instead!');
  } {
    const file = join(__dirname, './db.json');
    const adapter = new JSONFile<Data>(file);
    db = new LowWithLodash(adapter);
    await db.read();
  
    db.data ||= { devices: [{ id: "191203", deviceSettings: { endpointId: 'low-db' } }] }
  
    await db.write();
    console.log('=== lowdb connected ===');
  }
}

export const getDatabase = () => db;



