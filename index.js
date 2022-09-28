const DATABASE_URL = "https://jsonplaceholder.typicode.com";

// DO NOT CHANGE THIS FUNCTION
const getUserId = () => {
  return 1;
};
// END OF FUNCTION

// ELEMENTS
const postsButton = document.getElementById("posts-button");
const friendsButton = document.getElementById("users-button");
const postsContainer = document.getElementById("posts");
const usersContainer = document.getElementById("users");

const createPostCard = (post) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h2");
  const titleText = document.createTextNode(post.title);
  title.appendChild(titleText);

  const body = document.createElement("p");
  const bodyText = document.createTextNode(post.body);
  body.appendChild(bodyText);

  const textContainer = document.createElement("div");
  textContainer.classList.add("text-container");

  textContainer.appendChild(title);
  textContainer.appendChild(body);

  const commentContainer = document.createElement("div");
  commentContainer.classList.add("comment-container");

  const commentTitle = document.createElement("h3");
  const commentTitleText = document.createTextNode("Comments");
  commentTitle.appendChild(commentTitleText);
  commentContainer.appendChild(commentTitle);

  if (post.comments) {
    post.comments.forEach((comment) => {
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");

      const commentUser = document.createElement("p");
      const commentUserText = document.createTextNode(comment.email);
      commentUser.appendChild(commentUserText);

      const commentTitle = document.createElement("p");
      const commentTitleText = document.createTextNode(comment.name);
      commentTitle.appendChild(commentTitleText);

      const commentBody = document.createElement("p");
      const commentBodyText = document.createTextNode(comment.body);
      commentBody.appendChild(commentBodyText);

      commentElement.appendChild(commentUser);
      commentElement.appendChild(commentTitle);
      commentElement.appendChild(commentBody);

      commentContainer.appendChild(commentElement);
    });
  }

  textContainer.appendChild(commentContainer);
  card.appendChild(textContainer);

  return card;
};

const createAvatar = (user) => {
  const avatar = document.getElementById("avatar");
  avatar.src = `./assets/avatar${user.id}.png`;

  const name = document.getElementById("user-name");
  const text = document.createTextNode(user.name);
  name.appendChild(text);
};

const getLoginUser = async () => {
  const id = getUserId();
  const response = await fetch(`${DATABASE_URL}/users/${id}`);
  const user = await response.json();

  // const user = users.find((user) => user.id === id); // FINE

  createAvatar(user);
};

const getUserPosts = async (userId) => {
  // FETCH POSTS DATA
  const postResponse = await fetch(`${DATABASE_URL}/posts`);
  const posts = await postResponse.json();

  // const userPosts = posts.filter((post) => post.userId === userId);

  // FETCH COMMENTS RELATED TO POSTS

  // const commentResponse = await fetch(`${DATABASE_URL}/comments`);
  // const comments = await commentResponse.json();

  const userPosts = await Promise.all(
    posts
      .filter((post) => post.userId === userId)
      .map(async (post) => {
        // find the relevant comments for each post
        // const postComments = comments.filter(
        //   (comment) => comment.postId === post.id
        // );

        const response = await fetch(
          `${DATABASE_URL}/comments?postId=${post.id}`
        );
        const comments = await response.json();

        // console.log(comments);

        return {
          ...post,
          comments,
          // comments: postComments,
        };
      })
  );

  // const userPostsWithComments = userPosts.map((post) => {
  //   // find the relevant comments for each post
  //   const postComments = comments.filter(
  //     (comment) => comment.postId === post.id
  //   );

  //   return {
  //     ...post,
  //     comments: postComments,
  //   };
  // });

  // const postsCards = userPostsWithComments.map((post) => {
  const postsCards = userPosts.map((post) => {
    return createPostCard(post);
  });

  postsCards.forEach((card) => {
    postsContainer.appendChild(card);
  });
};

// INIT

getLoginUser();
getUserPosts(getUserId());

// const todosContainer = document.getElementById("todos");

// const createTodo = (todo) => {
//   const todoEl = document.createElement("div");

//   const todoTitle = document.createElement("p");
//   const todoTitleText = document.createTextNode(todo.title);
//   todoTitle.appendChild(todoTitleText);

//   const todoCompleted = document.createElement("p");
//   const todoCompletedText = document.createTextNode(todo.completed);
//   todoCompleted.appendChild(todoCompletedText);

//   todoEl.appendChild(todoTitle);
//   todoEl.appendChild(todoCompleted);

//   todosContainer.appendChild(todoEl);
// };

// const getTodos = async () => {
//   const response = await fetch(`${DATABASE_URL}/todos`);
//   const todos = await response.json(); // goes into the body of the response (where the data is)

//   console.log(todos);

//   todos.forEach((todo) => {
//     /*
//       {
//         title: "...",
//         completed: true / false
//       }
//     */
//     createTodo(todo);
//   });
// };

// // getTodos();
