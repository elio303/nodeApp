module.exports = function(app){
	var listOfPosts = require('./listOfPosts');
	var addNewMessage = require('./addNewMessage');
	var postCount = 0;

	app.get('/', function(req, res) {
		// Initial call to page
		listOfPosts(0, function(err, posts){
			if(err){
				console.log(err);
			}
			res.render('index', {
			    name: "",
			    message: "",
			    posts: posts
			});
			// initialize number of posts
			postCount = 10;
		});
	});

	app.get('/show', function(req, res) {
		// Showing more posts via AJAX
		listOfPosts(postCount, function(err, posts){
			if(err){
				console.log(err);
			}
			if(posts.length != 0){
				res.render('morePosts', {
				    posts: posts
				});
			}
			else{
				res.send({
					done: 'done'
				});
			}
			postCount = postCount + 10;
		});
	})

	app.post('/', function(req, res) {
		var name = req.body.name;
		var message = req.body.message;
		// adding message to DB
		addNewMessage(name, message, function(err, postBO){
			// Returning AJAX call with submitted post
			res.render('morePosts', {
				posts: [postBO]
			});
		});
	});
}