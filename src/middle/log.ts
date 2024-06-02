import asynchandler from 'express-async-handler';
export const logger = asynchandler(async (req:any,res:any,next:any) => {
    let date =  new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Bangkok'
      });;
    console.log(`${date} || Request path : ${req.path}`);
    next()
})  