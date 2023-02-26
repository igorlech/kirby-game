import { Score } from './model/Score';

export class IndexedDb {
    private SCORES = 'scores' as const;
    private DBNAME = 'kirby-game' as const;
    private request: IDBOpenDBRequest;
    private db: IDBDatabase;

    // TODO: Consider versioning the database and upgrading it if needed.

    constructor() {
        this.createObjectStore();
    }

    public createObjectStore() {
        this.request = window.indexedDB.open(this.DBNAME, 1);
        this.request.onerror = () => {
            console.log('Error creating ObjectStore');
        };
        this.request.onupgradeneeded = () => {
            this.db = this.request.result;
            const objectStore = this.db.createObjectStore(this.SCORES, { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex('name', 'name', { unique: false });
            objectStore.createIndex('score', 'score', { unique: false });
            objectStore.createIndex('time', 'time', { unique: false });
            objectStore.createIndex('date', 'date', { unique: false });
        };
    }

    public async addScore(name: string, score: number, time: number): Promise<void> {
        try {
            await this.addScoreToDatabase(name, score, time);
        } catch (error) {
            console.log('Error adding score');
        }
    }

    private addScoreToDatabase(name: string, score: number, time: number): Promise<void> {
        // We need to return a promise here because we need to wait for the transaction to complete before doing anything else.
        return new Promise((resolve, reject) => {
            this.db = this.request.result;
            const transaction = this.db.transaction([this.SCORES], 'readwrite');
            const objectStore = transaction.objectStore(this.SCORES);
            const date = new Date();
            const request = objectStore.add({
                name,
                score,
                time,
                date,
            });
            request.onsuccess = () => {
                console.log('Score added');
                // Resolve the promise so we can continue.
                resolve();
            };
            request.onerror = () => {
                console.log('Error adding score');
                reject();
            };
        });
    }

    public async getTop10Scores(): Promise<Score[]> {
        try {
            return await this.getTop10ScoresFromDatabase();
        } catch (error) {
            console.log('Error getting top 10 scores');
            return [];
        }
    }

    private getTop10ScoresFromDatabase(): Promise<Score[]> {
        // We need to return a promise here because we need to wait for the transaction to complete before returning the scores.
        return new Promise((resolve, reject) => {
            this.db = this.request.result;
            const transaction = this.db.transaction([this.SCORES], 'readonly');
            const objectStore = transaction.objectStore(this.SCORES);
            const scoreIndex = objectStore.index('score');
            const request = scoreIndex.getAll(15);
            request.onsuccess = () => {
                const scores = request.result as Score[];
                scores.sort((a, b) => a.time - b.time);
                resolve(scores.slice(0, 10));
            };

            request.onerror = () => {
                console.log('Error getting top 10 scores');
                reject([]);
            };
        });
    }
}
