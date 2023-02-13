// 디테일 페이지 시간 조회
export const DetailTime = (time: string) => {
  let nowTime = new Date();
  let createdTime = new Date(time);
  let elapsedMsec = nowTime.getTime() - createdTime.getTime();
  let result = '';

  // 경과 시간
  const elsTime = {
    elapsedSec: elapsedMsec / 1000,
    elapsedMin: elapsedMsec / 1000 / 60,
    elapsedHour: elapsedMsec / 1000 / 60 / 60,
    elapsedDay: elapsedMsec / 1000 / 60 / 60 / 24,
  };
  if (elsTime.elapsedDay < 1) {
    if (elsTime.elapsedHour >= 1 && elsTime.elapsedHour < 24) {
      if (Math.floor(elsTime.elapsedHour) === 1) {
        result = Math.floor(elsTime.elapsedHour) + ' 한 시간 전';
      } else {
        result = Math.floor(elsTime.elapsedHour) + ' 시간 전';
      }
    }
  }
  if (elsTime.elapsedHour < 1) {
    if (elsTime.elapsedMin >= 1 && elsTime.elapsedMin < 60) {
      if (Math.floor(elsTime.elapsedMin) === 1) {
        result = Math.floor(elsTime.elapsedMin) + ' 1분 전';
      } else {
        result = Math.floor(elsTime.elapsedMin) + ' 분 전';
      }
    }
  }
  if (elsTime.elapsedMin < 1) {
    if (elsTime.elapsedSec >= 0 && elsTime.elapsedSec < 60) {
      if (Math.floor(elsTime.elapsedSec) === 1) {
        result = Math.floor(elsTime.elapsedSec) + ' 1초 전';
      } else {
        result = Math.floor(elsTime.elapsedSec) + '방금전';
      }
    }
  }
  if (elsTime.elapsedDay >= 1 && elsTime.elapsedDay < 2) {
    result = Math.floor(elsTime.elapsedDay) + ' 어제';
  } else if (elsTime.elapsedDay >= 2 && elsTime.elapsedDay < 3) {
    result = Math.floor(elsTime.elapsedDay) + ' 일 전';
  } else if (elsTime.elapsedDay >= 3) {
    let tmpResult = createdTime.toLocaleString('en-GB');
    result = tmpResult.slice(0, 10);
  }

  return result;
};
