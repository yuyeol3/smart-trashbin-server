const bcrypt = require('bcrypt');
const db = require(process.cwd() + '/models');

exports.lists = async (req, res, next) => {
    try {
        const {from, to} = req.query;
        // const [data] = await db.execute(
        //     `SELECT id, name, location, recent_data FROM trash_bins WHERE id >= ? AND id <= ? LIMIT 30`,
        //     [from, to]);

        const [data] = await db.execute(`
        SELECT 
            tb.id AS id,
            tb.name AS name,
            tb.location AS location,
            tbl.pet AS pet,
            tbl.can AS can,
            tbl.others AS others,
            tbl.weight AS weight
        FROM 
            trash_bins tb
        LEFT JOIN 
            trash_bins_log tbl
        ON 
            tb.recent_data = tbl.id
        WHERE tb.id >= ? AND tb.id <= ? 
        LIMIT 30`, [from, to]);

        // console.log(data);
        return res.json(data);

    } catch (err) {
        console.error(err);
    }
}

exports.search = async (req, res, next) => {
    try {
        const {name} = req.body;
        const [data] = await db.execute(`
            SELECT 
                    tb.id AS id,
                    tb.name AS name,
                    tb.location AS location,
                    tbl.pet AS pet,
                    tbl.can AS can,
                    tbl.others AS others,
                    tbl.weight AS weight
                FROM 
                    trash_bins tb
                LEFT JOIN 
                    trash_bins_log tbl
                ON 
                    tb.recent_data = tbl.id
                WHERE name LIKE ?`,
        ['%' + name + '%']);

        return res.json({
            message : 'succeed',
            data : data
        });
    } catch (err) {
        console.error(err);
        return res.json({
            message : 'unknown error',
            data : []
        })
    }
}

exports.add = async (req, res, next) => {
    try {
        const {name, key, location} = req.body;
        console.log(name, key, location);
        const [rows] = await db.execute(`SELECT * FROM trash_bins where name=?`,
            [name]);

        if (rows.length > 0) {
            return res.json({
                message : 'trash bin exists'
            });
        }

        const hash = await bcrypt.hash(key, 10);
        await db.execute(
            'INSERT INTO trash_bins (name, cert_key, location) VALUES (?, ?, ?)',
            [name, hash, location]
        );

        return res.json({
            message : 'succeed'
        });
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const {id} = req.body;
        await db.execute(`DELETE FROM trash_bins WHERE id=?`, [id]);
        return res.json({
            message : 'succeed'
        })
    } catch (error) {
        console.error(error);
        return res.json({
            message : 'unknown error'
        });
    }
}

exports.update = async (req, res, next) => {
    try {
        const {id, name, location} = req.body;
        await db.execute(`
            UPDATE trash_bins SET name=?, location=? WHERE id=?  
        `, [name, location, id]);
        return res.json({message : 'succeed'});

    } catch (err) {
        console.error(err);
        res.json({message : 'unknown error'});
    }

}


exports.addData = async (req, res, next) => {
    try {
        const {pet, can, others, weight} = req.body;
        // console.log(req.body);
        await db.execute(`INSERT INTO trash_bins_log (pet, can, others, weight, trash_bin_id) VALUES(?, ?, ?, ?, ?)`,
            [Number(pet), Number(can), Number(others), Number(weight), req.trash_id]);

        const [data] = await db.execute(`SELECT LAST_INSERT_ID() AS id FROM trash_bins_log`);
        const rid = data[0].id;

        await db.execute(`UPDATE trash_bins SET recent_data = ? WHERE id=?`, [rid, req.trash_id]);
        res.send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}