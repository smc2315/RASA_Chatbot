const express = require("express");
const morgan = require("morgan");
const apirouter = require('./routes/api');
const news = require('./routes/news');
const notice = require('./routes/notice');
const weather = require('./routes/weather');



const app = express();
app.set("port", process.env.PORT || 3001);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use("/",apirouter);
app.use("/news",news);
app.use("/notice",notice);
app.use("/weather",weather);

app.use((req,res,next)=>{
    const error = new Error(`${req.method} ${req.url}라우터가 없습니다`);
    error.status = 404;
    next(error);
});

app.use((err,req,res,next)=>{
    res.status(err.status || 500).send(err.message);
});

app.listen(app.get("port"), ()=>{
    console.log(app.get("port"),"번 포트에서 대기 중");
});
