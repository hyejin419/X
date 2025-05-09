import dotenv from "dotenv";
dotenv.config();
function required(key, defaultValue = undefined) {
    const value = process.env[key] || defaultValue;
    if (value == null) {
        throw new Error(`키 ${key}는 undefined!!`);
    }
    return value;
}
export const config = {
    jwt: {
        secretKey: required("JWT_SECRET"),
        expiresInSec: parseInt(required("JWT_EXPIRES_SEC", 86400)),
    },
    bcrypt: {
        saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 10)),
    },
    host: {
        port: parseInt(required("HOST_PORT", 8080)),
    },
    db: {
        host: required("DB_HOST"),
        user: required("DB_USER"),
        password: required("DB_PASSWORD"),
        database: required("DB_DATABASE"),
        port: required("DB_PORT"),
    },
};

/*
config는 보통 **설정 파일(configuration file)**을 뜻한다.
즉, 프로젝트에서 환경 설정이나 중요한 값들을 관리하기 위해 사용하는 파일이나 객체를 말한다.
예) config.jwt.secretKey → JWT를 검증할 때 필요한 비밀 키
config.jwt.expiresInSec → 토큰 만료 시간
config.db → 데이터베이스 접속 정보

이런 식으로 설정 값들을 한 곳(config.js)에 모아두면,
코드가 깔끔해지고
여러 파일에서 설정을 공유하기 편하고
나중에 환경에 따라 설정을 쉽게 변경할 수 있습니다.
→그리고 이걸 import { config } from './config.js';로 불러와서 사용한다.
*/
