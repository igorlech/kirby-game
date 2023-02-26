import { Score } from './model/Score';
import { IndexedDb } from './indexedDb';

export class Leaderboard {
    private indexedDb: IndexedDb;
    private hasAddedScore = false;

    constructor() {
        this.indexedDb = new IndexedDb();
    }

    public async addScoreToLeaderboard(timer: number, timeLeft: number): Promise<void> {
        const btn = document.getElementById('btn-add-score') as HTMLButtonElement;
        const inputValue = document.getElementById('name') as HTMLInputElement;
        const name = inputValue.value;
        if (name === '') {
            return;
        }
        if (this.hasAddedScore) {
            return;
        }
        await this.indexedDb.addScore(name, 15, timer - timeLeft);
        this.hasAddedScore = true;
        await this.displayLeaderboard('.leaderboard-table-body-won');
        btn.disabled = true;
        btn.style.backgroundColor = 'grey';
    }
    public async displayLeaderboard(leaderBoardClass: string): Promise<void> {
        const scores = await this.indexedDb.getTop10Scores();
        this.insertIntoTable(scores, leaderBoardClass);
    }

    private insertIntoTable(result: Array<Score>, tableClass: string): void {
        const table: HTMLTableElement = document.querySelector(tableClass);
        table.innerHTML = '';

        for (let i = 0; i < result.length; i++) {
            const row = table.insertRow(i);
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);

            cell1.innerHTML = (i + 1).toString();
            cell2.innerHTML = result[i].name;
            cell3.innerHTML = (result[i].time / 10).toString();
            cell4.innerHTML = result[i].date.toLocaleDateString('da-DK', { month: '2-digit', year: 'numeric', day: '2-digit' });
        }

        table.insertRow(0).innerHTML = '<th></th><th>Name</th><th>Time (s)</th><th>Date</th>';
    }
}
