function htmlHeaderMiddleWare(req, res, next) {
    res.set('Content-Type', 'text/html; charset=utf-8');
    next();
}

module.exports = {
    htmlHeaderMiddleWare
}