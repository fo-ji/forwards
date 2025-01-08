'use client';

// import { useEffect } from 'react';

import { driver } from 'driver.js';

import 'driver.js/dist/driver.css';

const startTour = () => {
  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        element: '#step1',
        popover: {
          title: 'Step 1',
          description: 'これは最初のステップです。',
        },
      },
      {
        element: '#step2',
        popover: {
          title: 'Step 2',
          description: '次に進むステップです。',
        },
      },
      {
        element: '#step3',
        popover: {
          title: 'Step 3',
          description: '最後のステップです。',
        },
      },
    ],
  });

  driverObj.drive();
};

export const Tour = () => {
  // useEffect(() => {
  //   startTour();
  // }, []);

  return (
    <div className="space-y-8">
      <div id="step1">ツアーを開始します。</div>
      <div id="step2">ツアーでこの要素を案内します。</div>
      <div id="step3">ツアーを終了します。</div>
      <button className="rounded border p-2" onClick={startTour}>
        ツアーを開始
      </button>
    </div>
  );
};
