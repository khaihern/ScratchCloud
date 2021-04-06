const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByUsername, getUserById) {
  const authenticateUser = async (username, password, done) => {
    const user = await getUserByUsername(username)
    if (user == null) {
      return done(null, false, { message: 'No user with that username' })
    }

    try {
      console.log(user.password);
      if (await bcrypt.compare(password, user.password)) {
        console.log(`From passport config line 14: ${user}`);
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy(authenticateUser));
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser(async (id, done) => {
    let user = await getUserById(id)
    return done(null, user)
  })
}

module.exports = initialize