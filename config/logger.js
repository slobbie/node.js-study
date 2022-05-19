const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file'); // 로그파일 일자별로 생성
const appRoot = require('app-root-path');
const process = require('process');

const logDir = `${appRoot}/logs`; // logs 디렉토리 하위에 로그파일 저장

const { combine, timestamp, label, printf } = winston.format; // winston 으로 어떤 포맷으로 log를 저장해줄지에 대한 정의

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`; //log 출력 포맷 정의
});

// log Level
// error: 0, warn: 1, info: 2, http:3, verbose:4, debug:5, silly: 6

const logger = winston.createLogger({
  format: combine(
    label({
      label: 'LogTestSystem',
    }),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat // lo 출력 포맷
  ),
  transports: [
    // info 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: 'info',
      datePattern: 'YYY-MM-DD',
      dirname: logDir,
      filename: '%DATE%.log',
      maxFiles: 30, // 30일치 로그 파일 저장
      zippedArchive: true,
    }),
    // error 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: 'error',
      datePattern: 'YYY-MM-DD',
      dirname: logDir,
      filename: '%DATE%.error.log',
      maxFiles: 30, // 30일치 로그 파일 저장
      zippedArchive: true,
    }),
  ],
  exceptionHandlers: [
    // uncaughtException 발생시
    new winstonDaily({
      level: 'error',
      datePattern: 'YYY-MM-DD',
      dirname: logDir,
      filename: '%DATE%.exception.log',
      maxFiles: 30, // 30일치 로그 파일 저장
      zippedArchive: true,
    }),
  ],
});

// Profuction 환경이 아닌경우 (dev 등)

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // 색깔 넣어서 출력
        winston.format.simple() //  `${info.level}: ${info.message} JSON.stringify({...rest})` 포맷으로
      ),
    })
  );
}

module.exports = logger;
