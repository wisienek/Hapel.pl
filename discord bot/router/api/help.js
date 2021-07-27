const express = require('express');
const helpRouter = express.Router();

const { p_hplcon } = require('../../databases');


helpRouter.route('/daily')
.get(async (req, res) => {
    // const { day, month, year } = req.query;

    const [ daily,, err ] = await p_hplcon.query(`SELECT DATE_FORMAT(data ,'%d.%m.%Y') AS date, ilosc, czas FROM em411_cnpc.online;`);
    if( err ){
        console.error(`get daily : ${err}`);
        return res.status(503).send({ type: "danger", error: "Coś poszło nie tak w fetchowaniu online!" });
    }

    return res.status(200).send( daily );
});

helpRouter.route('/online')
.get(async (req, res) => {


})
.post( async (req, res) => {
    console.log(req.body);

    res.status(200).end();
});

helpRouter.route('/log')
.post(async (req, res) => {
    const { query, body, params } = req;
    console.log("Query: ",query);
    console.log("Params: ",params);
    console.log("Body: ",body);

    return res.status(200).end();
});



module.exports = helpRouter;