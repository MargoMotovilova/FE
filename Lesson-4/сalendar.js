function getRenderedDays (monthIndex, year) {
    const days = [];
    const firstDayOfMonth = new Date (year, monthIndex, 1, 12, 0, 0, 0);
    const firstWeekDayOfMonth = firstDayOfMonth.getDay();
    const startDayShift = (6 + firstWeekDayOfMonth) % 7;
    const lastDayOfMonth = new Date (year, monthIndex + 1, 0, 12, 0, 0, 0);
    const lastWeekDayOfMonth = lastDayOfMonth.getDay();
    const endDayShift = (7 - lastWeekDayOfMonth) % 7;
    const firstRenderedDay = new Date(year, monthIndex, 1 - startDayShift, 12, 0, 0, 0,);
    const lastRenderedDay = new Date (year, monthIndex + 1, endDayShift, 12, 0, 0, 0,);


    for (let day = new Date(firstRenderedDay); day <= lastRenderedDay ; day.setDate( day.getDate() + 1 ) ) {
        days.push(new Date(day));
    }

    return days;
}

const MONTHES = [
'January', 
'February', 
'March', 
'April', 
'May', 
'June',
'July',
'August',
'September',
'October',
'November',
'December',
];

const currentDay = getCurrentDay();
const calendar = {
    year: currentDay.getFullYear(),
    monthIndex: currentDay.getMonth(),
    $title: document.querySelector('.calendar__title'),
    $prev: document.querySelector('.calendar__btn--prev'),
    $next: document.querySelector('.calendar__btn--next'),
    $days: document.querySelector('.calendar__days'),
}

const shownEvents = {
    shownDay: getShownDay(),
    $title: document.querySelector('.main__title'),
    $events: document.querySelector('.timeline__events'),
}
console.log({ events, calendar, shownEvents });
renderCalendar(calendar);
renderShownEvents(shownEvents);

calendar.$prev.addEventListener('click', function () {
    const prevMonth = new Date(calendar.year, calendar.monthIndex - 1, 1, 12, 0, 0, 0);
    calendar.year = prevMonth.getFullYear();
    calendar.monthIndex = prevMonth.getMonth();
    renderCalendar(calendar);
});

calendar.$next.addEventListener('click', function (){
    const nextMonth = new Date(calendar.year, calendar.monthIndex +1, 1, 12, 0, 0, 0);
    calendar.year = nextMonth.getFullYear();
    calendar.monthIndex = nextMonth.getMonth();
    renderCalendar(calendar);
});
function getCurrentDay() {
    const currentDay = new Date();
    currentDay.setHours(12);
    currentDay.setMinutes(0);
    currentDay.setSeconds(0);
    currentDay.setMilliseconds(0);
    return currentDay;
}
function getShownDay() {
    const { search } = location;
    const params = new URLSearchParams(search);
    const day = params.get('day') || (new Date()).toJSON();
    const shownDay = new Date(day);
    shownDay.setHours(12);
    shownDay.setMinutes(0);
    shownDay.setSeconds(0);
    shownDay.setMilliseconds(0);
    return shownDay;
}

function getCalendarTitle({year, monthIndex}) {
    return `${MONTHES[monthIndex]} ${year}`;
}

function renderDay(day, monthIndex) {
    const $li = document.createElement('li');
    const $link = document.createElement('a');
    $li.className = 'calendar__day';
    $link.className = 'calendar__day-link';
    $link.setAttribute('aria-label', day.toDateString());
    $link.href = `?day=${day.toJSON().split('T')[0]}`;
    $link.inerText = day.getDate();
    $li.append($link);
    if (day.getMonth() !=monthIndex){
        $li.classList.add('calendar__day--not-in-month');
    }
    return $li;
}

function renderCalendar(calendar) {
    calendar.$title.innerText = getCalendarTitle(calendar);
    calendar.$days.innerText = '';
    const currentDay = getCurrentDay();
    const shownDay = getShownDay();
    const days = getRenderedDays(calendar);
    const renderDays = days.map(day => {
        const $li = renderDay(day, calendar.monthIndex);
        if (currentDay.getTime() === day.getTime()) {
            $li.classList.add('calendar__day--current');
        }
        if (shownDay.getTime() === day.getTime()) {
            $li.classList.add('calendar__day--shown');
        }
        return $li;
    });
    calendar.$days.append(...renderDays);
}

function getTime(d = new Date()) {
    return [
        d.getHours().toString().padStart('0', 2),
        d.getMinutes().toString().padStart('0', 2)
    ].join(':');
}
function renderShownEvents(config) {
    const dayKey = config.shownDay.toJSON().split('T')[0];
    const shownEvents = events[dayKey];
    config.$title.innerText = `${config.shownDay.getDate()} ${MONTHES[config.shownDay.getMonth()]}, ${config.shownDay.getFullYear()}`;
    config.$events.innerText = '';
    if (!shownEvents) {
        return null;
    }

const renderedEvents = shownEvents.map(event => {
const $li = document.createElement('li');
const startTime = new Date(event.start);
const endTime = new Date(startTime);
const startDay = new Date(startTime);
endTime.setMinutes( endTime.getMinutes() + event.durationInMinutes );
startDay.setHours(9);
startDay.setMinutes(0);
startDay.setMilliseconds(0);
const eventStart = (startTime - startDay) / (60*60000);
const eventDuration = event.durationInMinutes / 60;
$li.className = 'time__event';
$li.style.setProperty('--event-duration', eventDuration.toFixed(3));
$li.style.setProperty('--event-start', eventStart.toFixed(3));
if (event.category) {
    $li.classList.add(`timeline__event--${event.category.toLowerCase()}`);
}
$li.innerHTML = `
    <div class="timeline__event-time">${getTime(startTime)} - ${getTime(endTime)}</div>
    <div class="timeline__event-title">${event.title}</div>
`;
return $li;
});
config.$events.append(...renderedEvents);
}