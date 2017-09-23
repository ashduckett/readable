# Running the Project
In order to run the project you will need two things. The first is a server which gives you temporary storage of any posts and comments you might add, it also adds a couple of each for you to see when you start the program.

In order to run the server, navigate to its directory and run the command `node server`.

The second thing you'll need to do is to run `npm start` in the directory of your own project. This will start your react app and you'll be ready to go.

# The Interface
When you first start the application you'll see some controls to the right and the text `Select a post` to the left. The posts to which the text refers are those under the nNew Post button
to the right.

Initially you shoul see two posts under the New Post button. You can see that these can be reordered using the dropdown under the Sort heading. You can also filter them by category using
the category drop down.

## Creating a Post
This can be done by hitting the New Post Link to the right. If you fill in the modal that appears and then hit the save button, you'll see your post is added to the list on the right, 
and is also made visible in the detail view.

## Deleting a post
Should you wish to delete the selected post, you'll find a drop down to the right of its heading. Select the delete option
and it should vanish from view.

## Adding a comment
From the dropdown to the right of a post's title, you'll find a comment option. Select this and you'll be able
to add a comment to your post.

## Delete a comment
If you have a comment on the screen, there will be links for editing and deleting your comment.

## Voting
Voting controls exist for both posts and comments and these are the thumbs up and thumbs down symbols with 
a score to the center.

## URLs
If you enter the extra URL parameter of `/category_name_here`, for example `/redux` after the main URL, you'll
find that the only posts available to the right will be those with a category of redux.

If you enter a URL corresponding to `/category_name_here/post_id_here` then the post that you've identified
via the `id` parameter will be displayed in the details view.