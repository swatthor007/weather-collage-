function WeatherCard(props) {
  return (
    <div className="weather-card">
      <h2>{props.city}</h2>

      <img
        src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`}
        alt={props.condition}
      />

      <p className="temperature">{Math.round(props.temperature)}°C</p>
      <p className="condition">{props.condition}</p>

      <div className="details">
        <div className="detail-box">
          <span>💧 Humidity</span>
          <strong>{props.humidity}%</strong>
        </div>
        <div className="detail-box">
          <span>💨 Wind Speed</span>
          <strong>{props.windSpeed} m/s</strong>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
