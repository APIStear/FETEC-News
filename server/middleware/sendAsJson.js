let sendAsJson = () => async (err, req, res, next) => {
  if(process.env.NODE_ENV !== 'dev'){
    if(err.statusCode !== 500){
       return res.status(err.statusCode).json({code: err.statusCode, name: err.name, message: err.message})
      } else {
        return res.status(500).send("SERVER ERROR");
      }
    } else {
    return res.status(err.statusCode).json({code: err.statusCode, name: err.name, message: err.message})
  }
}


module.exports = sendAsJson;
