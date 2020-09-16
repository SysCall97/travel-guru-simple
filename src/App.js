import React, { useState } from 'react';
import './App.css';
import View from './components/View/View';
import 'bootstrap/dist/css/bootstrap.min.css';

export const userContext = React.createContext();

function App() {
  const [loggedinUser, setLoggedinUser] = useState({});
  const [bookingDetails, setBookingDetails] = useState({});
  const [whiteBg, setWhiteBg] = useState(false);
  return (
    <userContext.Provider 
      value={{
        user: [loggedinUser, setLoggedinUser], 
        booking: [bookingDetails, setBookingDetails],
        background: [whiteBg, setWhiteBg]
    }}>
      <View />
    </userContext.Provider>
  );
}

export default App;
