import express from "express";
import usercontroller from "../controllers/users.controller.js";
import postcontroller from "../controllers/posts.controller.js";
import middlewares from "../middlewares/auth.js";
const router = express.Router();

//users
router.route("/new-user").post(middlewares.auth , usercontroller.createUser); //used just for initial phase user creation in database
router.route("/authenticate").post(middlewares.auth , usercontroller.authenticate);
router.route("/follow/:id").post(middlewares.auth , usercontroller.follow);
router.route("/unfollow/:id").post(middlewares.auth , usercontroller.unfollow);
router.route("/user").get(middlewares.userauth , usercontroller.getUser);


//posts
router.route("/posts").post(middlewares.userauth , postcontroller.createPost);
router.route("/posts/:id").delete(postcontroller.deletePost);
router.route("/like/:id").post(middlewares.userauth , postcontroller.likePost);
router.route("/unlike/:id").post(middlewares.userauth ,  postcontroller.unlikePost);
router.route("/comment/:id").post(middlewares.userauth , postcontroller.commentPost);
router.route("/posts/:id").get(middlewares.userauth , postcontroller.getPost);
router.route("/all_posts").get(middlewares.userauth , postcontroller.getAllPost);

export default router;