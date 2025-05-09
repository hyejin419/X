/*
    Authorization
    - 본인의 신원을 증명하는 과정
    
    Authorization 헤더
    - http 요청을 보낼 때 헤더라는 곳에 "추가 정보"를 담을 수 있음
    - 인증정보를 담는 표준 위치가 Authorization 헤더임

    Bearer
    - Authorization에 실을 수 있는 방식(타입) 중 하나
    - Bearer는 토큰을 가지고 있다는 것 자체로 인증함
        Authorizaiton: Bearer <토큰>
*/

import jwt from "jsonwebtoken";
import * as authRepository from "../data/auth.mjs";
import { config } from "../config.mjs";

const AUTH_ERROR = { message: "인증에러" };
export const isAuth = async (req, res, next) => {
    const authHeader = req.get("Authorization"); //Authorization 헤더 가져오기
    console.log(authHeader);
    if (!(authHeader && authHeader.startsWith("Bearer "))) {
        console.log("헤더 에러"); //Authorization 헤더가 없거나 "Bearer"로 시작하지 않으면 인증 에러 반환
        return res.status(401).json(AUTH_ERROR);
    }
    const token = authHeader.split(" ")[1]; //토큰 추출
    console.log(token);
    jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
        //wt.verify(token, secretKey, callback)을 이용해 토큰을 검증
        if (error) {
            console.log("토큰 에러");
            return res.status(401).json(AUTH_ERROR);
        }
        console.log(decoded.idx);
        const user = await authRepository.findByid(decoded.idx);
        //토큰 안의 decoded.id를 이용해 데이터베이스에서 사용자를 조회.
        if (!user) {
            console.log("아이디 없음"); //사용자가 없으면 에러 반환
            return res.status(401).json(AUTH_ERROR);
        }
        console.log("user.idx: ", user.idx);
        console.log("user.userid: ", user.userid);
        req.useridx = user.idx;
        next();
    });
};

/*
[요청] 
 → Authorization 헤더 확인
   → Bearer 토큰 추출
     → 토큰 검증
       → 사용자 확인
         → 성공: req에 사용자 정보 추가 후 next()
         → 실패: 401 에러 반환
*/
