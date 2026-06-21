const blogRouter = require('express').Router()
const Blog = require('../models/blog')

const User = require('../models/user')
const Comment = require('../models/comment')

const middleware = require('../utils/middleware');



blogRouter.get('/', async (request, response, next) => {



  let blogs = await Blog.find({}).populate("user",
    {
      username: 1
      , name: 1
    }

  ).populate("comments")

  response.status(200).json(blogs)



})




blogRouter.post('/', middleware.getUser, async (request, response, next) => {

  let data = request.body

  console.log(request.token)
  const user = request.user

  data.user = user.id

  const blog = new Blog(data)

  let addedBlog = await blog.save()

  // update blogs list in user
  user.blogs = user.blogs.concat(addedBlog._id)

  await user.save()

  response.status(201).json(addedBlog)



})


blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = request.body;

  await updateBlog(id, blog, response);

});


blogRouter.delete("/:id", middleware.getUser, async (request, response,) => {
  const id = request.params.id;
  const user = request.user
  console.log(user)
  console.log(id)
  await deleteBlog(id, user, response);
});

async function updateBlog(id, blog, response) {

  console.log(blog)
  console.log(blog.user)

  // get the user of that blog
  let userId = blog["user"]?.id

  let user = await User.findById(userId)

  // remove the old user
  delete blog["user"]

  // update the new user
  blog["user"] = user

  let result = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  })

  let code = 200;

  response.status(code);
  response.json(result);

  return;


}

async function deleteBlog(id, user, response) {



  const blog = await Blog.findById(id).populate("user")
  let blogUserId = blog?.user?.id
  console.log("blog user id:" + blogUserId.toString())
  console.log("" + user.id.toString())
  if (blogUserId.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(id)
    let code = 204;

    response.status(code);
    response.end();

    return;
  }
  let code = 403;

  response.status(code);
  response.end();





}

// for comments

blogRouter.post("/:id/comments", async (request, response) => {
  const id = request.params.id;
  const comment = request.body;

  await updateBlogWithComment(id, comment, response);

});
async function updateBlogWithComment(id, comment, response) {

  // get the blog
  let blog = await Blog.findById(id)

  console.log("hi comments!")

  // add comment to CommentModel
  comment["blog"] = blog
  CommentModel = new Comment(comment)
  let addedComment = await CommentModel.save()



  // add comment to blog
  let comments = blog["comments"].concat(addedComment.id)

  delete blog["comments"]
  blog["comments"] = comments

  console.log(blog)

  console.log("id is: " + id)

  let result = await blog.save()


  let code = 200;

  response.status(code);
  response.json(result);

  return;


}


module.exports = blogRouter