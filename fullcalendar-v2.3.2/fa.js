
$.fullCalendar.lang("fa", {
	buttonText: {
		month: "ماه",
		week: "هفته",
		day: "روز",
		list: "برنامه",
		today: "امروز",
	},
	allDayText: "تمام روز",
	monthNames:['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر',
		'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
	monthNamesShort:['January', 'February', 'March', 'April', 'May', 'شهر', 'July',
		'August', 'September', 'October', 'November', 'December'],
	dayNames: ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه',
	'پنجشنبه', 'جمعه', 'شنبه'],
	dayNamesShort:['یک', 'دو', 'سه', 'چهار', 'پنج', 'جمعه', 'شن'],
	weekNumberTitle:"هفته",
	eventLimitText:"بیشتر",


	eventLimitText: function(n) {
		return "بیش از " + n;
	}
});
