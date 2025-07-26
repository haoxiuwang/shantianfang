export class IDB {
  constructor(name, version, stores = {}) {
    this.name = name;
    this.version = version;
    this.stores = stores; // 例如: { audios: { keyPath: 'id' }, books: { autoIncrement: true } }
    this.db = null;
  }

  async open() {
    if (this.db) return this.db;
    this.db = await new Promise((resolve, reject) => {
      const request = indexedDB.open(this.name, this.version);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        for (const storeName in this.stores) {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, this.stores[storeName]);
          }
        }
      };
    });
    return this.db;
  }

  async _withStore(storeName, mode, callback) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, mode);
      const store = tx.objectStore(storeName);
      const result = callback(store);
      tx.oncomplete = () => resolve(result);
      tx.onerror = () => reject(tx.error);
    });
  }

  // ===== 常用操作 =====

  async add(store, value, key) {
    return this._withStore(store, 'readwrite', s => s.add(value, key));
  }

  async put(store, value, key) {
    return this._withStore(store, 'readwrite', s => s.put(value, key));
  }

  async get(store, key) {
    return this._withStore(store, 'readonly', s =>
      new Promise((resolve, reject) => {
        const req = s.get(key);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      })
    );
  }

  async getAll(store) {
    return this._withStore(store, 'readonly', s =>
      new Promise((resolve, reject) => {
        const req = s.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      })
    );
  }

  async delete(store, key) {
    return this._withStore(store, 'readwrite', s => s.delete(key));
  }

  async clear(store) {
    return this._withStore(store, 'readwrite', s => s.clear());
  }

  async count(store) {
    return this._withStore(store, 'readonly', s =>
      new Promise((resolve, reject) => {
        const req = s.count();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      })
    );
  }

  async getAllKeys(store) {
    return this._withStore(store, 'readonly', s =>
      new Promise((resolve, reject) => {
        const req = s.getAllKeys();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      })
    );
  }

  async close() {
    if (this.db) this.db.close();
    this.db = null;
  }

  async deleteDB() {
    this.close();
    return new Promise((resolve, reject) => {
      const req = indexedDB.deleteDatabase(this.name);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
      req.onblocked = () => reject(new Error('Delete blocked by open connection'));
    });
  }
}
