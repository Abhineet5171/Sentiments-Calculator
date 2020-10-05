exports.get404 = (req, res, next) => {
    res.status(404).send('404: PAGE NOT FOUND');
};

exports.get403 = (req, res, next) => {
    res.status(403).send('403: Forbidden');
};

exports.get401 = (req,res, next) => {
    res.status(401).send('401: Unauthorized Request')
}