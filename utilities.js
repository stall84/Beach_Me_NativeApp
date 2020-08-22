// Utility Functions

// Time Converter function to take seconds from Google Distance data and convert to hours:min

export const timeConverter = (secs) => {
  let hours = secs / 3600;
  var rHours = Math.floor(hours);
  var minutes = (hours - rHours) * 60;
  var rMinutes = Math.round(minutes);
  return `${rHours} Hours and ${rMinutes} Minutes`;
};
