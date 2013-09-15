
/*
 * GET the room editor.
 */

exports.editor = function(req, res){
  if (req.isAuthenticated()) {
    res.render("editor", { user: req.user, title: 'Intelli Place Editor' });
  } else {
    res.render("login");
  }
};