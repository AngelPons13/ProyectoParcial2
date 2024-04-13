// Objeto para almacenar las publicaciones de cada usuario
var userPosts = {};

// Función para crear un nuevo post
function createPost(title, description, autor, image) {
    var postContainer = document.getElementById("posts-container");

    var post = document.createElement("div");
    post.classList.add("post");

    var postTitle = document.createElement("h3");
    postTitle.textContent = title;

    var postDescription = document.createElement("p");
    postDescription.textContent = description;

    var postautor = document.createElement("A");
    postautor.textContent = autor;

    var postImage = document.createElement("img");
    postImage.src = image;
    postImage.alt = "Imagen del post";

    var postFooter = document.createElement("div");
    postFooter.classList.add("post-footer");

    var likeButton = document.createElement("button");
    likeButton.textContent = "Me gusta";

    var commentButton = document.createElement("button");
    commentButton.textContent = "Comentar";

    var shareButton = document.createElement("button");
    shareButton.textContent = "Compartir";

    postFooter.appendChild(likeButton);
    postFooter.appendChild(commentButton);
    postFooter.appendChild(shareButton);

    post.appendChild(postTitle);
    post.appendChild(postDescription);
    post.appendChild(postautor);
    post.appendChild(postImage);
    post.appendChild(postFooter);

    postContainer.appendChild(post);

    var currentUser = localStorage.getItem("username");
    userPosts[currentUser] = userPosts[currentUser] || [];
    userPosts[currentUser].push({ title: title, description: description, autor: autor, image: image });
}

function loadUserPosts() {
    var currentUser = localStorage.getItem("username");
    var posts = userPosts[currentUser] || [];

    posts.forEach(function(post) {
        createPost(post.title, post.description,post.autor, post.image);
    });
}

loadUserPosts();

document.getElementById("new-post-form").addEventListener("submit", function(event) {
    event.preventDefault();

    var postTitle = document.getElementById("post-title").value;
    var postDescription = document.getElementById("post-description").value;
    var postautor = document.getElementById("post-autor").value;
    var postImageInput = document.getElementById("post-image");
    var postImage = postImageInput.files[0];

    if (postTitle.trim() === "") {
        alert("Por favor, introduce un título para tu publicación.");
        return;
    }

    if (!postImage) {
        alert("Por favor, selecciona una imagen para tu publicación.");
        return;
    }

    var imageURL = URL.createObjectURL(postImage);

    createPost(postTitle, postDescription, postautor, imageURL);

    document.getElementById("post-title").value = "";
    document.getElementById("post-description").value = "";
    postImageInput.value = "";
});