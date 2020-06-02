import monthsData from './monthsData';

const today = new Date();

const initialData = {
  displayDate: new Date(today.getFullYear(),
    today.getMonth(), 1),
  monthName: monthsData[today.getMonth()].monthName,
  dueDates: {},
  dates: [[], [], [], [], [], []],
};

for (let i = 0; i < 42; i += 1) {
  initialData.dates[Math.floor(i / 7)].push(`date-${i}`);
}

const calendarReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case 'CHANGE_MONTH':
      return {
        ...state,
        displayDate: payload,
        monthName: monthsData[payload.getMonth()].monthName,
      };

    default:
      return state;
  }
};

export default calendarReducer;
