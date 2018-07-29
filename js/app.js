var App = new function () {
    self = this;

    // video object.
    this.vid = document.getElementById("myVideo");

    // loading object.
    this.loading = document.getElementById("loading");

    // attention level object.
    this.attentionLevel = document.getElementById("attention-level");

    // attention level meter.
    this.attentionLevelMeter = document.getElementById("attention-level-meter");

    // connect to device.
    this.connection = new WebSocket('ws://localhost:8080');

    this.videoIsPlaying = false;

    this.init = function () {
        self.stopVideo();
        this.connection.onmessage = function (e) { self.processData(e) }
    }

    // do something with the mindwave data.
    this.processData = function (e) {
        var data = JSON.parse(e.data);
        if (data.poorSignalLevel == 200) {
            self.stopVideo();
            return;
        }
        self.restartVideo();
        self.setVolume(data);
        self.setAttentionLevel(data);
    }

    // stop video and show loading screen.
    this.stopVideo = function () {
        self.videoIsPlaying = false;
        self.vid.pause();

        setTimeout(function() {
            self.vid.currentTime = 0;
        },1000);
        
        self.loading.style.display = "block";

        self.vid.classList.add("fadeOut");
        self.vid.classList.add("animated");

        self.attentionLevel.style.display = "none";
    }

    // restart the video.
    this.restartVideo = function () {
        if(!self.videoIsPlaying)
        {
            self.videoIsPlaying = true;
            self.vid.play();
            self.vid.style.display = "block";
            self.loading.style.display = "none";
            
            self.vid.classList.remove("fadeOut");
            self.vid.classList.add("animated");
            self.vid.classList.add("fadeIn");
        }
    }

    // set the volume of the video.
    this.setVolume = function (data) {
        try {
            var attention = data.eSense.attention;
            var volume = attention / 100;
            self.vid.volume = volume;
        } catch (err) { return; }
    }

    // set attention level.
    this.setAttentionLevel = function (data) {
        try {
            var attention = data.eSense.attention;
            self.attentionLevelMeter.value = attention / 100;
        } catch (err) { return; }
    }
}