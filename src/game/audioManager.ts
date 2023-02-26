export class AudioManager {
    private sounds: HTMLAudioElement[] = [];

    constructor() {
        this.sounds.push(new Audio('../assets/sounds/gameover.wav'));
        this.sounds.push(new Audio('../assets/sounds/coin.wav'));
        this.sounds.push(new Audio('../assets/sounds/gamewon.wav'));
        this.sounds.push(new Audio('../assets/sounds/background-music.mp3'));
    }

    public playSound(sound: string, loop = false, volume = 0.5) {
        this.sounds.forEach((s) => {
            if (s.src.includes(sound)) {
                s.loop = loop;
                s.volume = volume;
                s.play();
            }
        });
    }
}
