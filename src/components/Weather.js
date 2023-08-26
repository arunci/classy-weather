import Day from "./Day";
export default function Weather({ weather, location }) {
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;
  return (
    <div>
      <h2>Weather {location}</h2>
      <ul className="weather">
        {dates.map((date, i) => (
          <Day
            date={date}
            max={max[i]}
            min={min[i]}
            code={codes[i]}
            key={date}
            isToday={i === 0}
          />
        ))}
      </ul>
    </div>
  );
}
