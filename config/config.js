module.exports = {
  development: {
    db: 'mongodb://intelli-place:Asdf1234@ds041168.mongolab.com:41168/intelli-place',
    app: {
      name: 'Passport Authentication Tutorial'
    },
    facebook: {
      clientID: "clientID",
      clientSecret: "clientSecret",
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    }
  },
  production: {
    db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
    app: {
      name: 'Passport Authentication Tutorial'
    },
    facebook: {
      clientID: "clientID",
      clientSecret: "clientSecret",
      callbackURL: "{{production callbackURL}}"
    }
  }
};
