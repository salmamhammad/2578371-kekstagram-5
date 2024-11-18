function checklengthstring (string, length) {
if(string.length<=length){
   return true;}
   else{
    return false;

   }
}


function isStringPalindrome(string) {
  //  convert to lowercase
  const cleanedStr = string.toLowerCase();
  // Check if the cleaned string is equal to its reverse
  if(cleanedStr === cleanedStr.split('').reverse().join('')){
    return true;}
    else{
     return false;

    }

}

function extractDigitsfromString(input) {
  // Convert the argument to a string (in case it is a number)
  const str = String(input);

 // Extract all digits from 0 to 9
  const digits = str.match(/\d/g);

 // If digits are found, concatenate them into a string, convert them to a number and return them
 // If there are no digits, return NaN
  return digits ? parseInt(digits.join(''), 10) : NaN;
}

function isMeetingWithinWorkingHours(startWork, endWork, startMeeting, meetingDuration) {
  // Преобразует время в формате "часы:минуты" в минуты с начала суток
  const timeToMinutes = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
  };

  // Преобразование входных параметров
  const workStartMinutes = timeToMinutes(startWork);
  const workEndMinutes = timeToMinutes(endWork);
  const meetingStartMinutes = timeToMinutes(startMeeting);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  // Проверяем, находится ли встреча в рамках рабочего времени
  return (
      meetingStartMinutes >= workStartMinutes &&
      meetingEndMinutes <= workEndMinutes
  );
}
