/*
 * Jalali
 * Written by S.Mohammad Emami Razavi <emamirazavi@gmail.com>
 * @version 2.1.0
 * @created 2013-03-21 <emamirazavi@gmail.com>
 * @updated 2015-09-10 <emamirazavi@gmail.com>
 *
 *          Ya Mahdi Adrekni
 *          One day dear Christ alongside Mahdi,
 *          the son of the Muhammad prophet of Muslims
 *          will come, appear and make all of us really
 *          free.
 *
 * My text:
 * This project named jldate created by S.Mohammad Emami Razavi
 * In fact i wanted to create an emulator for JS Date class
 * to modify all calendars to support jalali dates very quick.
 * It uses the `BSD 3-Clause License`
 * Good luck and under God.
 *
 * BUG:
 * UTC methods of date class of JS have rewritten with fake.
 * you can help me to implement it correctly!!! :)
 *
 * TESTED previously with:
 * 1. bootstrap datetime picker
 * 2. jQuery datetime picker
 * 3. fullcalendar
 *
 * Now TESTED with:
 * 1. fullcalendar @see fullcalendar* folder
 * 2. somewhat moment
 *
 * HOW IT WORKS:
 * It's enough you replace jlDate with Date classname of JS
 * but you must escape from UTC methods, it's not implemented in jlDate for now
 * @see fullcalendar and moment sample
 */
/**
 * 
 * @param int year
 * @param int month
 * @param int day
 * @param int hours
 * @param int minutes
 * @param int seconds
 * @param int milliseconds
 * @returns jlDate
 */
function jlDate(year, month, day, hours, minutes, seconds, milliseconds)
{
	jldate = this;
	this.prototype = {};
	this.date;

    // convert 1970-01-01 to jalali
	this.year=1348;
	this.month=9;
	this.day=11;

	this.hours=0;
	this.minutes=0;
	this.seconds=0;
	this.milliseconds=0;

    this.timestamp=0;

    this.g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	this.j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];	
	this.j_days_in_month_leap = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30];	
	
	jlDate.prototype.setYear = function(year)
	{
		this.setFullYear(year);
	}
	
	jlDate.prototype.setFullYear = function(year)
	{
		this.year = year;
		this.setAP(this.jToG());
	}
	
    jlDate.prototype.calculateChangesByMonth = function(month)
    {
        var yChange = 0;
        var mChange = 0;
        if (month > 11) {
            yChange += parseInt(month/12);
            mChange -= parseInt(month/12) * 12;
        } else if (month < 0) {
            yChange += parseInt((month-11)/12);
            mChange -= parseInt((month-11)/12) * 12;
        }
        return [yChange, mChange];
    }

	jlDate.prototype.setMonth = function(month, day)//set 0 to 11
	{
        var change = this.calculateChangesByMonth(month);
        this.year += change[0];
		this.month = month + change[1];
		if(day!=null) this.setDate(day);
		this.setAP(this.jToG());
	}

    jlDate.prototype.em_isLeap = function(Year){
        return new Date(Year,1,29).getDate() == 29;
    }

    jlDate.prototype.setDate = function(day)
    {
        if(day==null || isNaN(day)) return false;

        var yearChange = parseInt(day / 365);
        var monthChange = 0;
        day -= 365 * yearChange;
        var restDay = day;
        var greDate = this.jToG(this.year, 0, 1);
        var j_days_in_month = [];
        var leapStandardYear = greDate.getFullYear();
        
        if (day < 1 && this.month == 0) {
            leapStandardYear--;
        }
        j_days_in_month = this.em_isLeap(leapStandardYear) ? this.j_days_in_month_leap : this.j_days_in_month;

        var i = this.month;
        if(restDay > j_days_in_month[i]) {
            monthChange++;
            restDay -= j_days_in_month[i];
        } else if ( restDay < 1) {
            monthChange--;
            if ( i == 0 ) {
                //return false;
                i = 12;
            }
            restDay += j_days_in_month[i-1];
        }

        month = this.month;
        if (monthChange + this.month > 11) {
            yearChange++;
            month += monthChange - 12;
        } else if (monthChange + this.month < 0) {
            yearChange--;
            month += monthChange + 12;
        } else {
            month += monthChange;
        }

        this.day = (restDay == 0) ? 1 : restDay;
        this.year = yearChange + this.year;
        this.month = month;
        this.setAP(this.jToG());
    }

    jlDate.prototype.setHours = function(hours)
    {
        this.hours = hours;
        this.setAP(this.jToG());
    }

    jlDate.prototype.setMilliseconds = function(millisec)
    {
        this.milliseconds = millisec;
        this.setAP(this.jToG());
    }

    jlDate.prototype.setMinutes = function(minutes)
    {
        this.minutes = minutes;
        this.setAP(this.jToG());
    }

    jlDate.prototype.setSeconds = function(sec)
    {
        this.seconds = sec;
        this.setAP(this.jToG());
    }

    jlDate.prototype.setTime = function(time)
    {
        var date = new Date(time);
        this.setAP(date);
    }

    jlDate.prototype.getTime = function()
    {
        return this.timestamp;
    }

    jlDate.prototype.getDate = function()
    {
        return this.day;
    }

    jlDate.prototype.getMonth = function()
    {
        return this.month;
    }

    jlDate.prototype.getFullYear = function()
    {
        return this.year;
    }

    jlDate.prototype.getDay = function()
    {
        var getday = this.date.getDay();
        return getday;
    }

    jlDate.prototype.getHours = function()
    {
        return this.hours;
    }

    jlDate.prototype.getMinutes = function()
    {
        return this.minutes;
    }

    jlDate.prototype.getSeconds = function()
    {
        return this.seconds;
    }

    jlDate.prototype.getMilliseconds = function()
    {
        return this.milliseconds;
    }

    jlDate.prototype.jToG = function(year, month, day, hours, minutes, seconds, milliseconds)
    {
        year=year==null?this.year:year;
        month=month==null?this.month:month;
        day=day==null?this.day:day;

        hours=hours==null?this.hours:hours;
        minutes=minutes==null?this.minutes:minutes;		
        seconds=seconds==null?this.seconds:seconds;		
        milliseconds=milliseconds==null?this.milliseconds:milliseconds;
        if (year<1600) {
            greDate = this.jalali_to_gregorian(year, month, day);
            return new Date(greDate[0], greDate[1], greDate[2], hours, minutes, seconds, milliseconds);
        } else {
            
            return new Date(year, month, day, hours, minutes, seconds, milliseconds);
        }
    }

    jlDate.prototype.setAP = function(date)
    {
            this.setAllTimePropsByDate(date);
    }

    jlDate.prototype.setAllTimePropsByDate = function(date)
    {
            this.date = date;//new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var jDate = this.gregorian_to_jalali(date.getFullYear(), date.getMonth(), date.getDate());
            
            this.year = jDate[0];
            this.month = jDate[1];
            this.day = jDate[2];
            this.hours = date.getHours();
            this.minutes = date.getMinutes();
            this.seconds = date.getSeconds();
            this.milliseconds = date.getMilliseconds();
            this.timestamp = parseInt(date.getTime());
    }

    jlDate.prototype.em_div = function(n1,n2){
            return parseInt(n1/n2);
    }

    jlDate.prototype.gregorian_to_jalali = function(g_y, g_m, g_d) 
    {
        var g_days_in_month=this.g_days_in_month;
        var j_days_in_month=this.j_days_in_month;

        var gy = g_y-1600;
        var gm = g_m;//var gm = g_m-1;
        var gd = g_d-1;

        var g_day_no = 365*gy+this.em_div(gy+3,4)-this.em_div(gy+99,100)+this.em_div(gy+399,400);

        for (i=0; i < gm; ++i)
              g_day_no += g_days_in_month[i];
        if (gm>1 && ((gy%4==0 && gy%100!=0) || (gy%400==0)))
            /* leap and after Feb */
            g_day_no++;
        g_day_no += gd;

        j_day_no = g_day_no-79;

        j_np = this.em_div(j_day_no, 12053); /* 12053 = 365*33 + 32/4 */
        j_day_no = j_day_no % 12053;

        jy = 979+33*j_np+4*this.em_div(j_day_no,1461); /* 1461 = 365*4 + 4/4 */

        j_day_no %= 1461;

        if (j_day_no >= 366) {
            jy += this.em_div(j_day_no-1, 365);
            j_day_no = (j_day_no-1)%365;
        }

        for (i = 0; i < 11 && j_day_no >= j_days_in_month[i]; ++i)
            j_day_no -= j_days_in_month[i];
        jm=i;//jm = i+1;
        jd = j_day_no+1;

        return [jy, jm, jd];
    } 

    jlDate.prototype.jalali_to_gregorian = function(j_y, j_m, j_d) 
    {
        var g_days_in_month=this.g_days_in_month;
        var j_days_in_month=this.j_days_in_month;

        jy = j_y-979;
        jm = j_m;//jm = j_m-1;
        jd = j_d-1;

        j_day_no = 365*jy + this.em_div(jy, 33)*8 + this.em_div(jy%33+3, 4);
        for (i=0; i < jm; ++i)
            j_day_no += j_days_in_month[i];

        j_day_no += jd;

        g_day_no = j_day_no+79;

        gy = 1600 + 400*this.em_div(g_day_no, 146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
        g_day_no = g_day_no % 146097;

        leap = true;
        if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */
        {
            g_day_no--;
            gy += 100*this.em_div(g_day_no,  36524); /* 36524 = 365*100 + 100/4 - 100/100 */
            g_day_no = g_day_no % 36524;
            if (g_day_no >= 365)
                g_day_no++;
            else
                leap = false;
        }

        gy += 4*this.em_div(g_day_no, 1461); /* 1461 = 365*4 + 4/4 */
        g_day_no %= 1461;
        if (g_day_no >= 366) {
            leap = false;

            g_day_no--;
            gy += this.em_div(g_day_no, 365);
            g_day_no = g_day_no % 365;
        }

        for (i = 0; g_day_no >= g_days_in_month[i] + (i == 1 && leap); i++)
            g_day_no -= g_days_in_month[i] + (i == 1 && leap);
        gm = i;
        gd = g_day_no+1;

        return [gy, gm, gd];
    }

    jlDate.prototype.isInteger = function(s){
        return (s.toString().search(/^-?[0-9]+$/) == 0);
    }

    jlDate.prototype.init = function(year, month, day, hours, minutes, seconds, milliseconds)
    {
        this.date = new Date();
        if (typeof year == 'undefined' || isNaN(year)) {
            year = null;
        }
        if (typeof month == 'undefined' || isNaN(month)) {
            month = null;
        }
        if (typeof day == 'undefined' || isNaN(day)) {
            day = null;
        }
        if (typeof hours == 'undefined' || isNaN(hours)) {
            hours = null;
        }
        if (typeof minutes == 'undefined' || isNaN(minutes)) {
            minutes = null;
        }
        if (typeof seconds == 'undefined' || isNaN(seconds)) {
            seconds = null;
        }
        if (typeof milliseconds == 'undefined' || isNaN(milliseconds)) {
            milliseconds = null;
        }
        
        if(year==null && month==null && day==null && hours==null && minutes==null && seconds==null && milliseconds==null)
        {
            //this.date = new Date();
            this.setAP(this.date);
        }
        else if(year!=null && month!=null && day!=null)
        {
            if(hours==null) hours=0;
            if(minutes==null) minutes=0;
            if(seconds==null) seconds=0;
            if(milliseconds==null) milliseconds=0;
            var ap;
            var change = this.calculateChangesByMonth(month);
            year += change[0];
            month += change[1];
            ap = this.jToG(year, month, 1, hours, minutes, seconds, milliseconds);
            this.setAP(ap);
            this.setDate(day);
        }
        else if(!this.isInteger(year))
        {
            //You or i can code this part in the future with our locale languages! year=October 13, 1975 11:13:00
        }
        else if(this.isInteger(year))
        {
            // i assume just year has been set
            if (year > 0 && year < 1450) {
                // you should set other propeties like month and day
                ap = this.jToG(year, 0, 1, 0, 0, 0, 0);
                this.setAP(ap);
            } else {
                this.setAllTimePropsByDate(new Date(year));
            }
        }
    }

    jlDate.prototype.toString = function()
    {
        return this.date.toString();
    }

    jlDate.prototype.valueOf = function()
    {
        return this.date.valueOf();
    }

    jlDate.prototype.toTimeString = function()
    {
        return this.date.toTimeString();
    }

    jlDate.prototype.getTimezoneOffset = function()
    {
        return this.date.getTimezoneOffset();
    }
    
    /**
     * correct utc problems in flot time plugin
     */
    jlDate.prototype.setUTCSeconds = function(second)
    {
        return this.date.setUTCSeconds(second);
    }

    jlDate.prototype.getUTCSeconds = function()
    {
        return this.date.getUTCSeconds();
    }

    jlDate.prototype.setUTCMonth = function(month)
    {
        return this.date.setUTCMonth(month);
    }

    jlDate.prototype.getUTCMonth = function()
    {
        return this.date.getUTCMonth();
    }

    jlDate.prototype.setUTCMinutes = function(min)
    {
        return this.date.setUTCMinutes(min);
    }

    jlDate.prototype.getUTCMinutes = function()
    {
        return this.date.getUTCMinutes();
    }

    jlDate.prototype.setUTCMilliseconds = function(millisec)
    {
        return this.date.setUTCMilliseconds(millisec);
    }

    jlDate.prototype.getUTCMilliseconds = function()
    {
        return this.date.getUTCMilliseconds();
    }

    jlDate.prototype.setUTCHours = function(hour)
    {
        return this.date.setUTCHours(hour);
    }

    jlDate.prototype.getUTCHours = function()
    {
        return this.date.getUTCHours();
    }

    jlDate.prototype.setUTCFullYear = function(fullYear)
    {
        return this.date.setUTCFullYear(fullYear);
    }

    jlDate.prototype.getUTCFullYear = function()
    {
        return this.date.getUTCFullYear();
    }

    jlDate.prototype.setUTCDay = function(day)
    {
        return this.date.setUTCDay(day);
    }

    jlDate.prototype.getUTCDay = function()
    {
        // run from utc for now!
        return this.date.getDay();
        //return this.date.getUTCDay();
    }

    jlDate.prototype.setUTCDate = function(date)
    {
        return this.date.setUTCDate(date);
    }

    jlDate.prototype.getUTCDate = function()
    {
        return this.day;
        //return this.date.getUTCDate();
    }
    jlDate.prototype.day = function()
    {
        return this.day;
    }

    jldate.init(year, month, day, hours, minutes, seconds, milliseconds);

    return this.timeStamp;
}
