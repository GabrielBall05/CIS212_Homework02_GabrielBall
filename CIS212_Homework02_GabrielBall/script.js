function addPost()
{
    //alert("adding post");
    var postTitle = document.getElementById("postTitle").value;
    var postType = document.getElementById("postType").value;
    var postText = tinymce.get('mytextarea').getContent();

    //Gets date
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    //Puts in mm-dd-yy format
    var fullDate = month + "-" + day + "-" + year;

    //Get the list from session storage
    var posts = JSON.parse(sessionStorage.getItem("allPosts"));

    //make a new empty slot at the end of the array
    posts[posts.length] = {};

    //Insert the details
    posts[posts.length - 1].title = postTitle;
    posts[posts.length - 1].type = postType;
    posts[posts.length - 1].post = postText; 
    posts[posts.length - 1].date = fullDate;

    //Put list of posts back into session storage (will have the new post at the end)
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
        //Get the list again (updated with 3 dummy posts)
        list = JSON.parse(sessionStorage.getItem("allPosts"));
    }

    //Cycles through all elements in the array
    for (var i = 0; i < list.length; i++)
    {
       //Creates a list item element
       var li = document.createElement("li");

       //Creates an h2 element for the post's title
       var postTitle = document.createElement("h2");
       //Setting that h2's text to be that post's title from the array at i
       postTitle.innerText = list[i].title;
       //Appends the title (h2) to the list item
       li.appendChild(postTitle);

       //Does same thing but for the contents of the post
       var postText = document.createElement("p");
       //Can't use innerText this time because the TinyMCE returns <p></p> for the contents of the text area
       postText.innerHTML = list[i].post;
       li.appendChild(postText);

       //I wont be listing the date or type on the main page. That will be shown in the details page upon clicking on a post

       //Gives the list item a unique id (the counter) 
       li.setAttribute("id", i);
       //Gives the list item an on click that calls the idInSS() function which puts the id (i) in session storage
       li.setAttribute("onclick", 'idInSS(this.id)');
                   //li.setAttribute("onclick", 'idInURL(this.id)');

       //Appends the list item to the unordered list
       ul.appendChild(li);

       //Repeat for all elements in array
    }
}

function initializeList()
{
    //There was nothing in the list, put some dummy posts in it
    var posts = [
        {title: "John Wick 4 Review", type: "Review", post: "'John Wick 4' delivers another adrenaline-fueled chapter in the saga of everyone's favorite relentless assassin. Keanu Reeves reprises his role with the same magnetic intensity, seamlessly blending action and emotion. The film's choreography is a symphony of violence, showcasing Wick's unparalleled skills in stunningly inventive ways. The narrative takes unexpected turns, expanding the intricate underworld mythology. New characters add layers to the story, keeping the audience engaged. While the plot may occasionally tread familiar ground, the relentless pace and breathtaking set pieces make it a worthy addition to the franchise. 'John Wick 4' continues to raise the bar for action cinema.", date: "03-24-23"},
        {title: "Why the 'u' is left out in some English words", type: "Informative", post: "The absence of 'u' in 'color' and 'favorite' is a linguistic divergence between American English and British English. Noah Webster, the American lexicographer, opted to simplify and standardize spelling in the early 19th century. His intention was to create a distinct American identity, and part of this involved trimming down certain letters. Hence, the omission of 'u' in words like 'color' and 'favorite.' While British English retained the original spellings, American English embraced Webster's reforms. So, it's not a matter of right or wrong, but rather a reflection of the historical evolution and regional nuances in the English language.", date: "11-01-23"},
        {title: "My Day", type: "Personal", post: "Whew, what a day! The office felt like a battleground, deadlines dropping like bombs, and emails attacking from all fronts. My to-do list was a formidable adversary, and I fought the good fight against the relentless onslaught of tasks. The coffee became my trusty sidekick, fueling the skirmishes with spreadsheets and reports. Each meeting was a strategic maneuver, navigating through the chaos of conflicting priorities. But, hey, I held my ground, even if it felt like I was wading through a swamp of stress. Now, I'm just counting the minutes until I can kick back, decompress, and bid this battlefield farewell.", date: "10-21-23"}
    ];

    //Put the list in session storage
    sessionStorage.setItem("allPosts", JSON.stringify(posts));
}

function idInSS(id) //id caught is the id of the li.
{
    //Put id in session storage and call it "clickedID"
    sessionStorage.setItem("clickedID", JSON.stringify(id));
    //Move to postDetails page
    window.location.href = "postDetails.html";
}

function fillInDetails() //Gets called when details page loads
{
    //Get the list from session storage
    var list = JSON.parse(sessionStorage.getItem("allPosts"));

    //Get the id that was clicked from session storage
    var i = JSON.parse(sessionStorage.getItem("clickedID"));
    
    //Change the text for all the placeholders that are in postDetails.html to be that post's details
    document.getElementById("details_title").innerText = list[i].title;
    document.getElementById("details_type").innerText = list[i].type;
    document.getElementById("details_date").innerText = "Date: " + list[i].date;
    document.getElementById("details_post").innerHTML = list[i].post;
}

function deletePost()
{
    //Get the list from session storage
    var list = JSON.parse(sessionStorage.getItem("allPosts"));

    //Get the id that was clicked from session storage
    var i = JSON.parse(sessionStorage.getItem("clickedID"));

    //Pop up a dialog box that asks the user if they are sure they want to delete.
    //If the user clicks "OK", run the code. If the user clicks "Cancel" nothing will happen
    if (confirm("Are you sure you want to delete this post?"))
    {
        //Starts splicing at i. Splices 1 element from there. Replaces with nothing (2 parameters in this case)
        list.splice(i, 1);

        //Put the list back into session storage (will not have the spliced element)
        sessionStorage.setItem("allPosts", JSON.stringify(list));

        //Move to main page
        window.location.href = "index.html";
    }
}

// function idInURL(id)
// {
//     window.location.href = `postDetails.html?id=${id}`;
// }

// function fillInDetails()
// {
//     const params = new URLSearchParams(window.location.search);

//     var list = JSON.parse(sessionStorage.getItem("allPosts"));

//     var i = Number(params.get("id"));
    
//     document.getElementById("details_title").innerText = list[i].title;
//     document.getElementById("details_date").innerText = list[i].date;
//     document.getElementById("details_post").innerText = list[i].post;
// }