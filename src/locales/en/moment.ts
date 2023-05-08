import moment from "moment";

export default moment.defineLocale("en", {
  months: [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ],
  monthsShort: [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ],
  weekdays: [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday"
  ],
  weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  weekdaysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  longDateFormat: {
  LT: "h:mm A",
  LTS: "h:mm:ss A",
  L: "MM/DD/YYYY",
  LL: "MMMM Do YYYY",
  LLL: "MMMM Do YYYY LT",
  LLLL: "dddd, MMMM Do YYYY LT",
  },
  calendar: {
  sameDay: "[Today] LT",
  nextDay: "[Tomorrow] LT",
  nextWeek: "dddd LT",
  lastDay: "[Yesterday] LT",
  lastWeek: "[Last] dddd LT",
  sameElse: "L",
  },
  relativeTime: {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "%d seconds",
  m: "a minute",
  mm: "%d minutes",
  h: "an hour",
  hh: "%d hours",
  d: "a day",
  dd: "%d days",
  w: "a week",
  ww: "%d weeks",
  M: "a month",
  MM: "%d months",
  y: "a year",
  yy: "%d years",
  },
  ordinal: function (number) {
  var b = number % 10,
  output = ~~((number % 100) / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
  return number + output;
  },
  week: {
  dow: 1,
  doy: 4,
  },
  });