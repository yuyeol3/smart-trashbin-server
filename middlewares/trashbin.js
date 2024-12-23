const bcrypt = require('bcrypt');
const db = require(process.cwd() + '/models');

exports.isValidTrashBin = async (req, res, next) => {
    try {
        const {name, key} = req.body;
        const [data] = await db.execute(`SELECT * FROM trash_bins WHERE name=?`,
                                        [name]);

        if (data.length > 0) {
            if (await bcrypt.compare(key, data[0].cert_key)) {
                req.trash_id = data[0].id;
                next();
            }
            else return res.status(404).send();
        }
        else return res.status(404).send();

    } catch (err) {
        console.error(err);
        res.json({message : 'unknown error'});
    }
}