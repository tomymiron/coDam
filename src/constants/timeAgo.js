export function timeSince(date) {
  var seconds = Math.floor((new Date() - date.toDate()) / 1000);
  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " años";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " meses";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return interval < 2
      ? Math.floor(interval) + " dia"
      : Math.floor(interval) + " dias";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return interval < 2
      ? Math.floor(interval) + " hora"
      : Math.floor(interval) + " horas";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return interval < 2
      ? Math.floor(interval) + " minuto"
      : Math.floor(interval) + " minutos";
  }
  return Math.abs(Math.floor(seconds)) === 1
    ? Math.abs(Math.floor(seconds)) + " segundo"
    : Math.abs(Math.floor(seconds)) + " segundos";
}

export function dateFormatter(date) {
  function join(date, options, separator) {
    function format(option) {
      let formatter = new Intl.DateTimeFormat("es", option);
      return formatter.format(date);
    }
    return options.map(format).join(separator);
  }
  let options = [{ day: "numeric" }, { month: "numeric" }, { year: "numeric" }];
  let dateSta = join(new Date(date), [{ weekday: "long" }], " ");
  let dateMid = join(new Date(date), options, "/");
  let dateEnd = date.slice(-8, -3);
  let eventDate = dateSta.charAt(0).toUpperCase() + dateSta.slice(1) + " " + dateMid + " -- " + dateEnd + "hs";
  return eventDate;
}

export function locationShorter(location){
  if(location.length > 24){
    return location.slice(0, 24) + "...";
  }
  return location;
}