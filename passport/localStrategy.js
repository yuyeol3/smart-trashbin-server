const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require(process.cwd() + '/models');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: "userId",
        passwordField: "password",
        passReqToCallback: false,
    }, async(userId, password, done) => {
            try {
                const [rows] = await db.execute('SELECT * FROM users WHERE userId=?', [userId]);
                if (rows.length > 0) {
                    const result = await bcrypt.compare(password, rows[0].password);
                    if (result) {
                        done(null, rows[0]);
                    } else {
                        done(null, false, {message: '비밀번호가 일치하지 않습니다.'});
                    }
                } else {
                    done(null, false, {message: '가입되지 않은 회원입니다.'});
                }
            } catch (err) {
                console.log(err);
                done(err);
            }

        }
    ));
}

