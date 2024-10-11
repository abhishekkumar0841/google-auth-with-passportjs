module.exports = errorResponse = (res, status, message)=>{
    return res.status(status).json({
        success: false,
        message: message
    })
}