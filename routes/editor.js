
/*
 * GET the room editor.
 */

exports.editor = function(req, res){
  res.render('editor', { title: 'Editor' });
};