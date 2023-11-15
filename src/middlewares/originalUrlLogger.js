const originalUrlLogger = (request, response, next)=>{
    console.log(request.url);
    next();
}
module.exports = {originalUrlLogger};