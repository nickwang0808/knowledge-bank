const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { ObjectID } = require("mongodb");

module.exports = (app, db) => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // removed return before done
  passport.deserializeUser((id, done) => {
    db.findOne({ _id: new ObjectID(id) }, (err, user) => {
      if (err) {
        console.log(err);
        done(err);
      } else {
        done(null, user);
      }
    });
  });

  passport.use(
    new LocalStrategy((username, password, done) => {
      console.log(username, password);

      db.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          console.log("User Does Not Exist");
          return done(null, false);
        }
        if (user.password !== password) {
          console.log("Wrong Password trying to log in");
          return done(null, false);
        }
        return done(null, user);
      });
    })
  );
};
