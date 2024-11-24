const timer = (deadline) => {
    try {
        const countdowns = document.querySelectorAll('.countdown');
        const dateStop = new Date(deadline).getTime();
        let idInterval;

        const getTime = () => {
            const dateNow = new Date().getTime();
            const remains = (dateStop - dateNow) / 1000;
            if (remains <= 0) return {
                interval: false,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            }
            const days = Math.floor(remains / 86400);
            const hours = Math.floor((remains % 86400) / 3600);
            const minutes = Math.floor((remains % 3600) / 60);
            const seconds = Math.floor(remains % 60);
            return {
                interval: true,
                days,
                hours,
                minutes,
                seconds
            }
        }
        const updateClock = () => {
            const counter = getTime();
            if (!counter.interval) clearInterval(idInterval);
            if (counter.days < 10) counter.days = '0' + counter.days;
            if (counter.hours < 10) counter.hours = '0' + counter.hours;
            if (counter.minutes < 10) counter.minutes = '0' + counter.minutes;
            if (counter.seconds < 10) counter.seconds = '0' + counter.seconds;
            countdowns.forEach(countdown => {
                const counts = countdown.querySelectorAll('.count span');
                counts[0].textContent = counter.days;
                counts[1].textContent = counter.hours;
                counts[2].textContent = counter.minutes;
                counts[3].textContent = counter.seconds;
            });
        }
        updateClock();
        idInterval = setInterval(updateClock, 1000);
    } catch (error) {
        console.log(error);
    }
}
export default timer;