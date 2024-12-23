const passport = require('passport');
const local = require('./localStrategy');
const db = require(process.cwd() + '/models');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const [rows] = await db.execute('SELECT id FROM users WHERE id=?', [id]);
            if (rows.length > 0) {
                const user = rows[0];
                console.log(user);
                done(null, user);
            } else done(null);
        } catch (err) {
            console.log(err);
            done(err);
        }
    })

    local();
};