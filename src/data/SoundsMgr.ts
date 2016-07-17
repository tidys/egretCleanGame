class SoundsMgr {
    private static bgSoundChannel:egret.SoundChannel = null;

    public static playBtn() {
        this.playMusic("button_mp3");
    }

    public static clickCell() {
        this.playMusic("dianji_mp3");
    }

    public static removeCell(len) {
        // 有声音顺序
        var soundArr = [
            "efx_combine_1_mp3",
            "efx_combine_2_mp3",
            "efx_combine_3_mp3",
            "efx_combine_4_mp3",
            "efx_combine_5_mp3",
            "efx_combine_6_mp3",
            "efx_combine_7_mp3"
        ];
        if (len >= 6) {
            len = 6;
        }
        this.playMusic(soundArr[len]);
    }

    public static win() {
        this.playMusic("win_mp3");
    }

    public static lose() {
        this.playMusic("lose_mp3");
    }

    private static playMusic(v) {
        var sound:egret.Sound = RES.getRes(v.toString());
        if (sound) {
            this.bgSoundChannel = sound.play(0, 1);
        }
    }
}
