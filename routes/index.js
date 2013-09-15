var User = require('../models/user');
var Auth = require('../config/middlewares/authorization.js');
var workspace = require('../models/workspace');

module.exports = function (app, passport) {
  app.get("/", function (req, res) {
    if (req.isAuthenticated()) {
      workspace.find(req.user.email, function (workspace) {
        req.session.workspace = workspace;
        res.render("index", { user: req.user, title: 'Intelli Place', workspace: workspace });
      });
    } else {
      res.render("index", { user: null, title: 'Intelli Place' });
    }
  });

  app.get("/login", function (req, res) {
    res.render("login");
  });

  app.post("/login", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login"
  })
  );

  app.get("/signup", function (req, res) {
    res.render("signup");
  });

  app.post("/signup", Auth.userExist, function (req, res, next) {
    User.signup(req.body.email, req.body.password, function (err, user) {
      if (err) throw err;
      req.login(user, function (err) {
        if (err) return next(err);
        return res.redirect("profile");
      });
    });
  });

  app.get("/auth/facebook", passport.authenticate("facebook", { scope: "email"}));

  app.get("/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: '/login'}),
    function (req, res) {
      res.render("profile", {user: req.user});
    }
  );

  app.get("/profile", Auth.isAuthenticated, function (req, res) {
    res.render("profile", { user: req.user});
  });

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
  });
};