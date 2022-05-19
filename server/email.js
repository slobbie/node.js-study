const nodemailer = require('nodemailer');
const email = {
  host: 'smtp.mailtrap.io',
  post: 2525,
  auth: {
    user: '82e975b2fa894a',
    pass: 'ce751d6a98d2e7',
  },
};
//메일 서비스를 대행해주는 mailtrap.io
const send = async (option) => {
  nodemailer.createTransport(email).sendMail(option, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
      return info.response;
    }
  });
};

let email_data = {
  from: 'haeru9410@gmail.com',
  to: 'jungghs9550@naver.com',
  subject: '테스트 메일 입니다.',
  text: 'nodejs 메일 기능 테스트 입니다.',
};

send(email_data);
