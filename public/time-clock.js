class WorldClock {
    constructor() {
        this.userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log('Detected timezone:', this.userTimeZone);
        
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
    }
    
    getWeekNumber(date) {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    }
    
    getDayName(date) {
        const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
        return days[date.getDay()];
    }
    
    updateTime() {
        const now = new Date();
        
        // Format time as HH:MM:SS
        const timeString = now.toLocaleTimeString('tr-TR', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        // Determine if it's day or night
        const hour = now.getHours();
        const isNightTime = hour >= 17 || hour < 6; // 17:00-05:59 is night, 06:00-16:59 is day
        
        // Choose appropriate icon (night-sky for night, sun for day)
        const svgIcon = isNightTime ? 
            '<img src="./visuals/night-sky-svgrepo-com.png" style="width: 20px; height: 24px; margin-left: 10px; margin-bottom: 5px; vertical-align: middle;">' :
            '<img src="./visuals/sun-svgrepo-com.png" style="width: 20px; height: 24px; margin-left: 10px; margin-bottom: 5px; vertical-align: middle;">';
        
        // Update time display with icon on the right
        const timeDisplay = document.querySelector('.time-display');
        if (timeDisplay) {
            timeDisplay.innerHTML = timeString + svgIcon;
        }
        
        // Get elements
        const dateDayInfo = document.querySelector('.date-day-info');
        const weekSpan = document.querySelector('.week');
        const monthSpan = document.querySelector('.month');
        const yearSpan = document.querySelector('.year');
        
        // Update combined date and day display
        if (dateDayInfo) {
            const day = now.getDate().toString().padStart(2, '0');
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const year = now.getFullYear();
            const dayName = this.getDayName(now);
            dateDayInfo.textContent = `${day}.${month}.${year} - ${dayName}`;
        }
        
        // Update week, month, year with new format
        if (weekSpan) {
            const weekNumber = this.getWeekNumber(now);
            weekSpan.textContent = `${weekNumber}. Hafta`;
        }
        
        if (monthSpan) {
            const month = now.getMonth() + 1;
            monthSpan.textContent = `${month}. Ay`;
        }
        
        if (yearSpan) {
            yearSpan.textContent = now.getFullYear().toString();
        }
    }
}

// Initialize world clock when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new WorldClock();
});
            
            // Update day name
            if (dayInfo) {
                const dayName = this.getDayName(now, this.currentTimeZone);
                dayInfo.textContent = dayName;
            }
            
            // Get local date in selected timezone for week/month/year calculation
            const localDateString = now.toLocaleDateString("en-CA", {timeZone: this.currentTimeZone});
            const localDate = new Date(localDateString);
            
            if (weekSpan) {
                const weekNumber = this.getWeekNumber(localDate);
                weekSpan.textContent = `Hafta ${weekNumber}`;
            }
            
            if (monthSpan) {
                const month = localDate.getMonth() + 1;
                monthSpan.textContent = `Ay ${month}`;
            }
            
            if (yearSpan) {
                yearSpan.textContent = localDate.getFullYear().toString();
            }

// Initialize world clock when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new WorldClock();
});
