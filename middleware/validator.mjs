import { validationResult } from "express-validator";

//유효성 검사 결과를 확인하는 미들웨어
export const validate = (req, res, next) => {
    const errors = validationResult(req); //요청 객체에서 validation 결과를 추출
    if (errors.isEmpty()) {
        //에러가 없으면
        return next(); //다음 미들웨어or라우터핸들러로 진행
    }
    //에러가 있을 경우, 첫 번째 에러 메시지를 반환
    return res.status(400).json({ message: errors.array()[0].msg });
};
