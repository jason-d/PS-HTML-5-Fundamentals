(function () {

    $(function () {

        var video = document.querySelector('#vid'); //Need to get the raw element, so cannot use jQuery here
        var remainingTime = $('#remainingTime');
        var totalTime = $('#totalTime');
        var playPause = $('#playPause');
        var stop = $('#stop');
        var rewind = $('#rewind');
        var begin = $('#begin');
        var end = $('#end');
        var fastForward = $('#fastForward');
        var volume = $('#volume');
        var mute = $('#mute');
        var scrubber = $('#scrubber');
        var playbackRate = $('#playbackRate');

        var TIME_STEP = 5;

        var formatTime = function (seconds) {

            seconds = Math.round(seconds);
            var minutes = 0;
            if (seconds >= 60) {
                minutes = Math.floor(seconds / 60);
                seconds = (seconds - (minutes * 60));
            }

            seconds = seconds + '';
            if (seconds.length == 1) {
                seconds = '0' + seconds;
            }

            return minutes + ':' + seconds;
        }

        playPause.click(function () {

            if (video.paused || video.ended) {
                video.play();
                playPause.text('Pause');
            } else {
                video.pause();
                playPause.text('Play');
            }
        });

        stop.click(function () {

            video.pause();
            video.currentTime = 0;
            playPause.text('Play');
            video.playbackRate = 1;
            playbackRate.val(1);
        });

        begin.click(function () {

            video.currentTime = 0;
        });

        rewind.click(function () {

            video.currentTime -= TIME_STEP;
        });

        fastForward.click(function () {

            video.currentTime += TIME_STEP;
        });

        end.click(function () {

            video.currentTime = video.duration;
            playPause.text('Play');
        });

        volume.change(function () {

            video.volume = this.value;
        });

        mute.click(function () {

            var vol = 0;

            if (!video.muted) {
                vol = volume.val();
            }

            video.muted = !video.muted;

            if (!video.muted) {
                volume.val(vol);
                mute.text('Mute');
            } else {
                volume.val(0);
                mute.text('Unmute');
            }
        });

        scrubber.change(function () {

            video.currentTime = this.value * video.duration;
        });

        playbackRate.change(function () {

            video.playbackRate = this.value;
        });

        video.addEventListener('play', function () {

            totalTime.text(formatTime(video.duration));
        });

        video.addEventListener('timeupdate', function () {

            remainingTime.text(formatTime(video.currentTime));

            scrubber.val(video.currentTime / video.duration);
        });

        video.addEventListener('ended', function () {

            playPause.text('Play');
        });

        video.addEventListener('loadstart', function () {
            scrubber.val(0);
            volume.val(video.volume);
            playbackRate.val(video.playbackRate);
        });
    });
}());