import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pointsInput, setPointsInput] = useState(5);
  const [circles, setCircles] = useState([]);
  const [nextClick, setNextClick] = useState(1);
  const [status, setStatus] = useState("LET'S PLAY");
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  // Vẽ Point
  const generateCircles = (count) => {
    const newCircles = [];
    const total = count || 0;
    for (let i = 1; i <= total; i++) {
      newCircles.push({
        id: i,
        top: Math.random() * 88 + '%',
        left: Math.random() * 90 + '%',
        state: 'normal',
        timeLeft: 3.0
      });
    }
    setCircles(newCircles.sort(() => Math.random() - 0.5));
  };

  // Vòng lặp đếm giờ
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setTime((t) => t + 0.1);
      }

      setCircles((prev) => {
        let isChanged = false;
        const updated = prev.map((c) => {
          if (c.state === 'fading') {
            isChanged = true;
            const newTime = Math.max(0, c.timeLeft - 0.1);
            if (newTime <= 0.05) return { ...c, state: 'cleared', timeLeft: 0 };
            return { ...c, timeLeft: newTime };
          }
          return c;
        });
        return isChanged ? updated : prev;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  //dieu kien
  useEffect(() => {
    if (circles.length > 0 && pointsInput > 0) {
      const allCleared = circles.every((c) => c.state === 'cleared');
      if (allCleared && status !== 'GAME OVER') {
        setStatus('ALL CLEARED');
        setIsPlaying(false);
      }
    }
  }, [circles, pointsInput, status]);

  // Logic Auto Play
  useEffect(() => {
    let autoInterval;
    if (isAutoPlay && isPlaying && nextClick <= (pointsInput || 0)) {
      autoInterval = setInterval(() => {
        handleCircleClick(nextClick);
      }, 1000);
    }
    return () => clearInterval(autoInterval);
  }, [isAutoPlay, isPlaying, nextClick, pointsInput]);

  const handleStartRestart = () => {
    setTime(0);
    setNextClick(1);
    setStatus("LET'S PLAY");
    setIsPlaying(true);
    setIsAutoPlay(false);
    generateCircles(pointsInput);
  };

  const handleCircleClick = (id) => {
    if (status === 'GAME OVER' || status === 'ALL CLEARED' || !isPlaying) return;

    if (id === nextClick) {
      setCircles((prev) =>
        prev.map((c) => (c.id === id ? { ...c, state: 'fading', timeLeft: 3.0 } : c))
      );
      setNextClick((prev) => prev + 1);

      if (id === (pointsInput || 0)) {
        setIsAutoPlay(false);
      }
    } else {
      setStatus('GAME OVER');
      setIsPlaying(false);
      setIsAutoPlay(false);
      setCircles((prev) =>
        prev.map((c) => (c.id === id ? { ...c, state: 'wrong' } : c))
      );
    }
  };

  //reset khi đổi point
  const handleInputChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    const numVal = val === '' ? '' : Number(val);
   
    setPointsInput(numVal);
    setIsPlaying(false);
    setTime(0);
    setNextClick(1);
    setStatus("LET'S PLAY");
    setCircles([]);
    setIsAutoPlay(false);
  };

  return (
    <div className="game-container">
      <h2 style={{ color: status === 'ALL CLEARED' ? 'green' : status === 'GAME OVER' ? 'red' : 'black' }}>
        {status}
      </h2>

      <div className="header-info">
        <div className="info-row">
          <label>Points:</label>
          <input
            type="text"
            value={pointsInput}
            onChange={handleInputChange}
            style={{ outline: 'none' }}
          />
        </div>
        <div className="info-row">
          <label>Time:</label>
          <span>{time.toFixed(1)}s</span>
        </div>
      </div>

      <div className="controls">
        <button onClick={handleStartRestart}>
          {circles.length === 0 ? 'Play' : 'Restart'}
        </button>
        {circles.length > 0 && status === "LET'S PLAY" && (
          <button onClick={() => setIsAutoPlay(!isAutoPlay)}>
            Auto Play {isAutoPlay ? 'OFF' : 'ON'}
          </button>
        )}
      </div>

      <div className="board">
        {circles.map((circle) => {
          if (circle.state === 'cleared') return null;
          return (
            <div
              key={circle.id}
              className={`circle ${circle.state === 'fading' ? 'fading' : ''} ${circle.state === 'wrong' ? 'wrong' : ''}`}
              style={{
                top: circle.top,
                left: circle.left,
                zIndex: (pointsInput || 0) - circle.id,
                opacity: circle.state === 'fading' ? circle.timeLeft / 3 : 1,
              }}
              onClick={() => handleCircleClick(circle.id)}
            >
              <div className="circle-id">{circle.id}</div>
              {circle.state === 'fading' && (
                <div className="circle-time">{circle.timeLeft.toFixed(1)}s</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="next-text">
        Next: {nextClick <= (pointsInput || 0) ? nextClick : ''}
      </div>
    </div>
  );
}

export default App;




