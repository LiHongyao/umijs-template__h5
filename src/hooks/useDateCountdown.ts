import { useCallback, useEffect, useState } from 'react';

function useDateCountdown(targetDate: Date) {
  const [data, setData] = useState(['00', '00', '00', '00']);

  const formatNumber = useCallback((n: number) => {
    let nStr = n.toString();
    return nStr[1] ? nStr : '0' + nStr;
  }, []);

  useEffect(() => {
    let timer = setInterval(function() {
      let currentDate = new Date();
      let minus = targetDate.getTime() - currentDate.getTime();
      if (minus < 0) {
        clearInterval(timer);
        return;
      }
      let day = formatNumber(Math.floor(minus / 1000 / 60 / 60 / 24));
      let hours = formatNumber(Math.floor((minus / 1000 / 60 / 60) % 24));
      let minutes = formatNumber(Math.floor((minus / 1000 / 60) % 60));
      let seconds = formatNumber(Math.floor((minus / 1000) % 60));
      setData([day, hours, minutes, seconds]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return data;
}

export default useDateCountdown;
