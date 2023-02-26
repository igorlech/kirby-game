export class Score {
    name: string;
    score: number;
    time: number;
    date: Date;

    constructor(name: string, score: number, time: number, date: Date) {
        this.name = name;
        this.score = score;
        this.time = time;
        this.date = date;
    }
}
