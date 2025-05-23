
import { useState, useEffect } from 'react';

export const Clock = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  return (
    <div className="text-white text-right">
      <div className="text-sm font-medium">{formatTime(time)}</div>
      <div className="text-xs opacity-70">{formatDate(time)}</div>
    </div>
  );
};
