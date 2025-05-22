import sanitizeHtml from 'sanitize-html';

const sanitize = (obj) => {
    const options = {
        allowedTags: [],
        allowedAttributes: {}
    };

    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = sanitizeHtml(obj[key], options);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            obj[key] = sanitize(obj[key]);
        }
    }
    return obj;
};

const sanitizeMiddleware = (req, res, next) => {
    if (req.body) {
        req.body = sanitize(req.body);
    }
    next();
};
export default sanitizeMiddleware;