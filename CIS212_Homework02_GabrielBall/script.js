function addPost()
{
    //alert("adding post");
    var t = document.getElementById("postTitle").value;
    var p = tinymce.get('mytextarea').getContent();

    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1; //Have to do plus 1 for some reason
    var year = date.getFullYear();
    var d = month + "-" + day + "-" + year;

    var posts = JSON.parse(sessionStorage.getItem("allPosts"));

    posts[posts.length] = {};

    posts[posts.length - 1].title = t;
    posts[posts.length - 1].post = p; 
    posts[posts.length - 1].date = d;

    sessionStorage.setItem("allPosts", JSON.stringify(posts));
}

function fillList()
{
    //alert("filling posts");
    //Gets the unordered list on our main page
    var ul = document.getElementById("listOfPosts");

    //Gets the array from session storage
    var list = JSON.parse(sessionStorage.getItem("allPosts"));

    //If there is nothing in the list, initialize with 3 dummy posts
    if (list == null)
    {
        initializeList();
    }

    list = JSON.parse(sessionStorage.getItem("allPosts"));

    //Cycles through all elements in the array
    for (var i = 0; i < list.length; i++)
    {
       // alert(list[i].title);
       //Creates a list item element
       var li = document.createElement("li");
       //Creates an h2 element
       var t = document.createElement("h2");
       //Setting that h2's text to be that post's title from the array at i
       t.innerHTML = list[i].title;
       //Appends the title (h2) to the list item
       li.appendChild(t);

       //Does same thing but for the contents of the post
       var p = document.createElement("p");
       p.innerHTML = list[i].post;
       li.appendChild(p);

       //Makes a delete button
       var b = document.createElement("button");
       b.innerHTML = "Delete";
       b.setAttribute("class", "delButton");
       b.setAttribute("onclick", 'deletePost(i)');
       li.appendChild(b);
       

       //I wont be listing the date on the main page. That will be shown in the details page upon clicking on a post

       //=====
       //For testing to see dates on main page
       var d = document.createElement("p");
       d.innerHTML = list[i].date;
       li.appendChild(d);
       //======


       //Gives the list item a unique id (counter) 
       li.setAttribute("id", i);
       //Gives the list item an on click
       //li.setAttribute("onclick", "window.location.href = 'postDetails.html';");
       li.setAttribute("onclick", 'fillInDetails(this.id)');
       //Appends that list item to the unordered list
       ul.appendChild(li);
    }
}

function initializeList()
{
    var posts = [
        {title: "Dummy Title 1", post: "dummy text for post 1", date: "10-20-23"},
        {title: "Dummy Title 2", post: "dummy text for post 2", date: "10-21-23"},
        {title: "Dummy Title 3", post: "dummy text for post 3", date: "10-22-23"}
    ];

    sessionStorage.setItem("allPosts", JSON.stringify(posts));
}

function fillInDetails(id)
{
    window.location.href = 'postDetails.html';

    var list = JSON.parse(sessionStorage.getItem("allPosts"));
    //var ul = document.getElementById("postDetails");

    document.getElementById("details_title").innerHTML = list[id].title;
    document.getElementById("details_post").innerHTML = list[id].post;
    document.getElementById("details_date").innerHTML = list[id].date;


    // var li = document.createElement("li");
    // var t = document.createElement("h2");
    // t.innerHTML = list[id].title;
    // li.appendChild(t);
    // ul.appendChild(li);

    // li = document.createElement("li");
    // var d = document.createElement("h3");
    // d.innerHTML = list[id].date;
    // li.appendChild(d);
    // ul.appendChild(li);

    // li = document.createElement("li");
    // var p = document.createElement("p");
    // p.innerHTML = list[id].post;
    // li.appendChild(p);
    // ul.appendChild(li);
}

function deletePost(i)
{
    alert("delete");
}