import React, { useState, useEffect, useRef } from 'react';
import { Clock, RefreshCw, X } from 'lucide-react';

export default function IdleAttractTimer({ isAttractScreen, onTimeout, idleSeconds = 60 }) {
  const [secondsRemaining, setSecondsRemaining] = useState(idleSeconds);
  const [showWarning, setShowWarning] = useState(false);
  const lastActivityRef = useRef(Date.now());

  useEffect(() => {
    if (isAttractScreen) {
      setShowWarning(false);
      return;
    }

    const resetActivity = () => {
      lastActivityRef.current = Date.now();
      setSecondsRemaining(idleSeconds);
      setShowWarning(false);
    };

    // Events to monitor on touch kiosk
    const events = ['touchstart', 'touchend', 'touchmove', 'mousedown', 'mousemove', 'keydown', 'scroll'];
    events.forEach(evt => window.addEventListener(evt, resetActivity, { passive: true }));

    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - lastActivityRef.current) / 1000);
      const remaining = Math.max(idleSeconds - elapsed, 0);
      setSecondsRemaining(remaining);

      // Show countdown warning during the final 10 seconds of inactivity
      if (remaining <= 10 && remaining > 0) {
        setShowWarning(true);
      } else if (remaining === 0) {
        setShowWarning(false);
        onTimeout();
      } else {
        setShowWarning(false);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      events.forEach(evt => window.removeEventListener(evt, resetActivity));
    };
  }, [isAttractScreen, idleSeconds, onTimeout]);

  if (!showWarning || isAttractScreen) return null;

  return (
    <div 
      onClick={() => {
        lastActivityRef.current = Date.now();
        setShowWarning(false);
      }}
      className="fixed bottom-6 right-6 z-50 bg-[#0B1F5C] text-white p-5 rounded-3xl shadow-2xl border-2 border-amber-400 max-w-sm cursor-pointer animate-bounce select-none"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 font-mono font-bold flex items-center justify-center text-lg">
          {secondsRemaining}
        </div>
        <div>
          <h4 className="text-sm font-bold text-amber-300">
            Kiosk Inactivity Warning
          </h4>
          <p className="text-xs text-blue-200 mt-0.5">
            Returning to Attract Screen. Touch anywhere to continue browsing.
          </p>
        </div>
      </div>
    </div>
  );
}
