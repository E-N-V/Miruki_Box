const express = require('express');
const mysql = require('../databases/connect');
const router = express.Router();

/* GET home page. */
router.get('/:name', (req, res, next) => {
    const id_olymp = req.params.name;
        mysql.query("select name, table_name, url from categories", (err, find) => {
            if (err) return res.status(500).render('404/error');
            const table_info = {
                name: null,
                tb_name: null
            };
            for (const item of find) 
                if (item.url === id_olymp) {
                    table_info.name = item.name;
                    table_info.tb_name = item.table_name;
                }
            mysql.query("select * from " + table_info.tb_name, (err, data) => {
                if (err) return res.status(500).render('404/error');
                let all_query_pool = [];
                for (const item of data) {
                    const map = {
                        id: item.id,
                        type: item.type,
                        description: item.description,
                        answers: item.answer,
                        right: item.right_,
                        f: null,
                        opt_mode: null
                    };
                    let temp = item.f;
                    if (temp){
                        if (temp.slice(0, 3) === 'Рис') {
                            map.f = item.f + ".png";
                            map.opt_mode = 'image';
                        }
                        else if (temp.slice(0, 4) === 'code') {
                            const fs = require('fs');
                            map.f = (fs.readFileSync(`public/code/code_${temp.slice(4)}.txt`, {encoding: 'utf-8'}));
                            map.opt_mode = 'code'
                        }
                    }
                    all_query_pool.push(map);
                }
                if (all_query_pool.length > 20)
                    for (let i = all_query_pool.length; i > 20; i--)
                        all_query_pool.splice(Math.floor(Math.random() * (all_query_pool.length - 1) + 1) - 1, 1)
                res.render('olympWalkthrough', {
                    data: all_query_pool,
                    name_olymp: id_olymp,
                    category: table_info.name,
                });
            });
        });
});

module.exports = router;
