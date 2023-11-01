function addPost()
{
    alert("adding post");
    var t = document.getElementById("postTitle").value;
    var p = tinymce.get('mytextarea').getContent();

    var posts = [
        {title: <h2>Dummy Title 1</h2>, post: <p>dummy text for post 1</p>},
        {title: <h2>Dummy Title 2</h2>, post: <p>dummy text for post 2</p>},
        {title: <h2>Dummy Title 3</h2>, post: <p>dummy text for post 3</p>},
    ]

    posts[posts.length] = {};

    posts[posts.length - 1].title = t;
    posts[posts.length - 1].post = p; 

    sessionStorage.setItem("allPosts", JSON.stringify(posts));
}

function fillList()
{
    alert("filling posts");
    // var ul = document.getElementById("listOfPosts");
    // var li = document.createElement("li");
    // li.appendChild(document.createTextNode("new post"));
    // ul.appendChild(li);
    var list = JSON.parse(sessionStorage.getItem("allPosts"));
    for (var i = 0; i < list.length; i++)
    {
        alert(list[i].title);
    }
    var ul = document.getElementById("listOfPosts");
}

function test()
{
    alert("test");
}