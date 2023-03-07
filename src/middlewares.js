export const localsMiddleware = (req, res, next) => {
    /**req.session.loggedIn은 유저가 로그인 할 때, serssion에 저장되는 정보  */
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = 'Wetube';
    res.locals.loggedInUser = req.session.user || {};
    console.log(res.locals.loggedIn);
    next();
};

export const protectorMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        return res.redirect('/login');
    }
};

export const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        return next();
    } else {
        return res.redirect('/');
    }
};
