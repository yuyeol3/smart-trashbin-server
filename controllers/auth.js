const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require(process.cwd() + '/models');

exports.register = async (req, res, next) => {
   const {userId, password} = req.body;
   try {
        const [rows] = await db.execute('SELECT * FROM users WHERE userId = ?', [userId]);
        if (rows.length > 0) {
            return res.render('error',{message: 'user ID exists'});
        }
        const hash = await bcrypt.hash(password, 12);
        await db.execute(
            'INSERT INTO users (userId, password) VALUES (?, ?)',
            [userId, hash],
        )
       return res.redirect('/manage');
   } catch (err) {
       console.error(err);
       return next(err);
   }
}


exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.send(info.message);
        }
        return req.login(user, loginErr => {
            if (loginErr) {
                console.error(loginErr);
                return next(loginErr);
            }
            return res.redirect('/manage');
        })

    })(req, res, next);
}

exports.logout = (req, res) => {
    req.logout(()=>{
        res.redirect('/manage/login');
    });
}