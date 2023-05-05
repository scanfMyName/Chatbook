const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();

// Bringing in the post model
const Post = require('../../models/Post');
const User = require('../../models/User');

//For validation of post
const validatePost = require('../../validation/post');

// @route Get api/posts/test
// @desc Test post route
// @access public
router.get(
    '/test', (req,res) => res.json({msg:"post works"})
);
// @route Get api/posts/allPost
// @desc take out all the post on screen
// @access Public

router.get('/allPost', (req,res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => {
            res.json(posts)
        })
        .catch( err => res.status(404).json({noPostsfound: "No posts Here"}))
})
// @route Get api/posts:id
// @desc Get post by id
// @access Public

router.get('/:id', (req,res) => {
    Post.findById(req.params.id)
        .then(post => {
            res.json(post)
        })
        .catch( err => res.status(404).json({noPostfound: "No post found by that id"}))
})


// @route Post api/posts
// @desc create post
// @access Private
router.post('/', (req,res) => {
    const { errors, isValid } = validatePost(req.body);

    //now we will check the validation
    if(!isValid){
        return res.status(400).json(errors)
    }


    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.name,
        user: req.id
    });
    newPost
        .save()
        .then(post => res.json(post));
        
})

// @route post api/posts/edit/:id
// @desc edit a post
// @access Private
router.post('/edit/:id', (req,res) => {
    // Lets check is there anything in the post or not
    const { errors, isValid } = validatePost(req.body);
    if(!isValid){
        return res.status(400).json(errors)
    }
    User.findById(req.user.id)
        .then( user =>{
            Post.findById(req.params.id)
                .then(post => {
                    // First we would like to check that whether the user who wants to edit a post is valid or not
                    if(post.user.toString() !== req.user.id){
                        return res.status(401)
                                   .json({
                                       notAuthorize: 'User is not authorized to edit the post with above id'})
                    }
                    // now we know that the user is authenticated now we will just change the text to what user want to write in his post
                        post.text = req.body.text;
                        post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({postNotFound: "No post found with the given id"}))
        })
        .catch(err => res.status(401).json({notAuthorised: "A person must login to delete those post which he write earlier."}))
})

// @route delete api/posts
// @desc delete post
// @access Private
router.delete('/', async(req,res) => {
    const {user_id,post_id} = req.body;

     console.log("The post id is",post_id);
     

    const user = await User.findById(user_id);

   
// 6345a7cdce72be1cdca49b59
    if(user){
        const post = await Post.findById(post_id);
        if(post.user==user._id){
            await post.remove();
            res.json({msg: "Post removed"});
        }
        else{
            console.log("The user id is",user._id);
            console.log("The post user id is",post.user);
            res.status(404).json({msg: "Not Delete"});

        }
    }
    else{
        res.status(404).json({msg: "User not found"});
    }
   
})
/// if we change 
//   router.get('/delete:id', passport.authenticate('jwt', { //session: false }), (req,res) => { 
// the above thing wouldn't work due to the id syntax


// @route POST api/posts/like/:id
// @desc like a post or remove dislike+ add like to a post or remove a like (based on the previous event of the user on that post)
// @access Private

router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req,res) => {
    User.findById(req.user.id)
        .then( user =>{
            Post.findById(req.params.id)
                .then(post => {
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                        const removeIndex = post.likes
                                             .map(item => item.user.toString())
                                             .indexOf(req.user.id);
                        // splicing the likes list
                        post.likes.splice(removeIndex, 1);
                        post.save().then(post => res.json(post));
                        return ;
                    }if(post.dislikes.filter(dislike => dislike.user.toString() === req.user.id).length > 0){
                        // now as the user have already have disliked the post so now we are going to make that dislike to like
                        // getting the removing index
                        const removeIndex = post.dislikes
                                             .map(item => item.user.toString())
                                             .indexOf(req.user.id);
                        // splicing the dislikes list
                        post.dislikes.splice(removeIndex, 1);
                        // now adding the user in like list
                        post.likes.unshift({user: req.user.id});
                        post.save().then(post => res.json(post));
                        return ;
                    }
                    post.likes.unshift({user: req.user.id});
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({postNotFound: "No post found with the given id"}))
        })
        .catch(err => res.status(401).json({notAuthorised: "A person must login to like a post."}))
   
})


// @route POST api/posts/dislike/:id
// @desc dislike a post or remove like+ dislike a post or remove that dislike based on the previous occured event of the user on that post
// @access Private

router.post('/dislike/:id', passport.authenticate('jwt', { session: false }), (req,res) => {
    User.findById(req.user.id)
        .then( user =>{
            Post.findById(req.params.id)
                .then(post => {
                    if(post.dislikes.filter(dislike => dislike.user.toString() === req.user.id).length > 0){
                        const removeIndex = post.dislikes
                                             .map(item => item.user.toString())
                                             .indexOf(req.user.id);
                        // splicing the likes list
                        post.dislikes.splice(removeIndex, 1);
                        post.save().then(post => res.json(post));
                        return ;
                    }
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                        // now as the user have already have liked the post so now we are going to make that  like to dislike
                        // getting the removing index
                        const removeIndex = post.likes
                                             .map(item => item.user.toString())
                                             .indexOf(req.user.id);
                        // splicing the likes list
                        post.likes.splice(removeIndex, 1);
                        // now adding the user in dislike list
                        post.dislikes.unshift({user: req.user.id});
                        post.save().then(post => res.json(post));
                        return ;
                    }
                    post.dislikes.unshift({user: req.user.id});
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({postNotFound: "No post found with the given id"}))
        })
        .catch( err => res.status(401).json({notAuthorised: "A person must login correctly to dislike a post."}))

})



module.exports = router;
