import './App.css';
import { useState } from 'react';
import Screen1 from "./components/Screen1";
import Screen2 from "./components/Screen2";

import { Button } from 'primereact/button';



function App() {
  const [screen, setScreen] = useState(1);

  return (
    <div className='App'>
      <div className="btn-container">
        <Button
          label="Screen 1"
          severity="help" raised
          rounded
          onClick={() => setScreen(1)}
        />
        <Button
          label="Screen 2"
          severity="help" raised
          rounded
          onClick={() => setScreen(2)}
        />
      </div>

      <div className='screen-container'>
        {screen === 1 && <Screen1 />}
        {screen === 2 && <Screen2 />}
      </div>
    </div>

  );
}

export default App;
