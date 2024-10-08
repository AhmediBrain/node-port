// import React, { useState } from 'react';
// import './App.css';

// function ClockInClockOut() {
//   const [isClockedIn, setIsClockedIn] = useState(false);
//   const [startTime, setStartTime] = useState(null);
//   const [endTime, setEndTime] = useState(null);
//   const [logs, setLogs] = useState([]);
//   const [location, setLocation] = useState({ lat: null, lng: null });

//   const handleClockInOut = () => {
//     if (isClockedIn) {
//       const end = new Date();
//       setEndTime(end);
//       setLogs([...logs, { start: startTime, end, location }]);
//       setIsClockedIn(false);
//       setLocation({ lat: null, lng: null });
//     } else {
//       const start = new Date();
//       setStartTime(start);
//       setEndTime(null);
//       getLocation();
//       setIsClockedIn(true);
//     }
//   };

//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (error) => {
//           console.error("Error fetching location:", error);
//           alert("Could not fetch location. Please enable location services.");
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   const formatTime = (date) => {
//     return date ? date.toLocaleTimeString() : '--:--:--';
//   };

//   const calculateDuration = (start, end) => {
//     if (!start || !end) return '00:00:00';
//     const duration = (end - start) / 1000; // duration in seconds
//     const hours = String(Math.floor(duration / 3600)).padStart(2, '0');
//     const minutes = String(Math.floor((duration % 3600) / 60)).padStart(2, '0');
//     const seconds = String(Math.floor(duration % 60)).padStart(2, '0');
//     return `${hours}:${minutes}:${seconds}`;
//   };

//   const formatLocation = (location) => {
//     if (!location.lat || !location.lng) return 'Location not available';
//     return `Lat: ${location.lat.toFixed(2)}, Lng: ${location.lng.toFixed(2)}`;
//   };

// //   const formatLocation = (location) => {
// //     if (!location || location.lat == null || location.lng == null) {
// //       return 'Location not available';
// //     }

// //     // Check if lat is 40.78 or lng is -73.95
// //     if (location.lat === 40.69 || location.lng === -73.79) {
// //       return 'You are not allowed to clock in at this location';
// //     }

// //     return `Lat: ${Number(location.lat).toFixed(2)}, Lng: ${Number(location.lng).toFixed(2)}`;
// // };



//   return (
//     <div className="App">
//       <h1>Clock-In Clock-Out App</h1>
//       <div className="clock-in-out">
//         <button onClick={handleClockInOut}>
//           {isClockedIn ? 'Clock Out' : 'Clock In'}
//         </button>
//       </div>
//       <div className="time-display">
//         <p>Start Time: {formatTime(startTime)}</p>
//         <p>End Time: {formatTime(endTime)}</p>
//         <p>Duration: {calculateDuration(startTime, endTime)}</p>
//         {isClockedIn && <p>Current Location: {formatLocation(location)}</p>}
//       </div>
//       <div className="log-display">
//         <h2>Log</h2>
//         <ul>
//           {logs.map((log, index) => (
//             <li key={index}>
//               Start: {formatTime(log.start)}, End: {formatTime(log.end)}, Duration: {calculateDuration(log.start, log.end)}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default ClockInClockOut;

import React, { useState } from 'react';
import './App.css';

function ClockInClockOut() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [logs, setLogs] = useState([]);
  const [location, setLocation] = useState({ lat: null, lng: null });

  const handleClockInOut = () => {
    if (isClockedIn) {
      // Clock out logic
      const end = new Date();
      setEndTime(end);
      setLogs([...logs, { start: startTime, end, location }]);
      setIsClockedIn(false);
      setLocation({ lat: null, lng: null });
    } else {
      // Clock in logic
      getLocation();
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log('Current Location', currentLocation);
          setLocation(currentLocation);
          // Check location before allowing clock in 40.7798757 -73.9469268 40.78 -73.95
          if (currentLocation.lat !== 40.7798757 || currentLocation.lng !== -73.9469268) {
            alert('You are not allowed to clock in at this location');
          } else {
            const start = new Date();
            setStartTime(start);
            setEndTime(null);
            setIsClockedIn(true);
          }
        },
        (error) => {
          console.error('Error fetching location:', error);
          alert('Could not fetch location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const formatTime = (date) => {
    return date ? date.toLocaleTimeString() : '--:--:--';
  };

  const calculateDuration = (start, end) => {
    if (!start || !end) return '00:00:00';
    const duration = (end - start) / 1000; // duration in seconds
    const hours = String(Math.floor(duration / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((duration % 3600) / 60)).padStart(2, '0');
    const seconds = String(Math.floor(duration % 60)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatLocation = (location) => {
    if (!location || location.lat == null || location.lng == null) {
      return 'Location not available';
    }

    return `Lat: ${Number(location.lat).toFixed(2)}, Lng: ${Number(location.lng).toFixed(2)}`;
  };

  return (
    <div className="App">
      <h1>Clock-In Clock-Out App</h1>
      <div className="clock-in-out">
        <button onClick={handleClockInOut}>
          {isClockedIn ? 'Clock Out' : 'Clock In'}
        </button>
      </div>
      <div className="time-display">
        <p>Start Time: {formatTime(startTime)}</p>
        <p>End Time: {formatTime(endTime)}</p>
        <p>Duration: {calculateDuration(startTime, endTime)}</p>
        {isClockedIn && <p>Current Location: {formatLocation(location)}</p>}
      </div>
      <div className="log-display">
        <h2>Log</h2>
        <ul>
          {logs.map((log, index) => (
            <li key={index}>
              Start: {formatTime(log.start)}, End: {formatTime(log.end)}, Duration: {calculateDuration(log.start, log.end)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ClockInClockOut;
