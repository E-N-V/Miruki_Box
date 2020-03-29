const express = require('express');
const mysql = require('../databases/connect');
const router = express.Router();

/* GET home page. */
router.get('/:name', (req, res, next) => {
    const id_olymp = req.params.name;
        mysql.query("select name, table_name, url from categories", (err, find) => {
            if (err) return res.status(500).render('404/error');
            const tb_name = () => {for (const item of find) if (item.url === id_olymp) return [item.table_name, item.name]};
            const name = tb_name()[0];
            mysql.query("select * from c_plus_plus", (err, data) => {
                if (err) return res.status(500).render('404/error');
                const query_pool = [];
                for (const item of data) {
                    const map = {
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        answers: item.answer,
                        right: item.right,
                        f: item.f
                    };
                    query_pool.push(map);
                }
                res.render('olympWalkthrough', {
                    data: query_pool,
                    name_olymp: id_olymp,
                    category: tb_name()[1]
                });
            });
        });

});

module.exports = router;
