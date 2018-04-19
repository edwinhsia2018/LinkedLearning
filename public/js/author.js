$(document).ready(function() {
  // Getting references to the name input and author container, as well as the table body
  var username;
  var password;
  var libraryList = $("tbody");
  var libraryContainer = $(".library-container");
  var urlObj = {
      urlInput: $("#url-input"),
      titleInput: $("#title-input"),
      summaryInput: $("#summary-input"),
      categoryInput:$("#category-input"),
      authorInput: $("#author-input"),
      addedBy: $("#addedby-input"),
      tags: [],
      slackChannel: $("#slackchannel-input"),
      favoriteChecked: $("#favorite-checked")
  };

  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on("submit", "#urlsubmit", urlFormSubmit());
  $(document).on("click", ".delete-author", handleDeleteButtonPress);
  $(document).on("register", "#register-submit", registerSubmit());

  // Getting the initial list of links
  getLibrary();

  function registerSubmit(event){
    event.preventDefault();
    if (!username.val().trim().trim()) {
      return;
    }
    if (!password.val().trim().trim()) {
      return;
    }
    
  }

  // A function to handle what happens when the form is submitted to create a new library entry
  function urlFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }

    insertLink({
      urlInput: $("#url-input").val().trim(),
      titleInput: $("#title-input").val().trim(),
      summaryInput: $("#summary-input").val().trim(),
      categoryInput:$("#category-input").val().trim(),
      authorInput: $("#author-input").val().trim(),
      addedBy: $("#addedby-input").val().trim(),
      tags: [],
      slackChannel: $("#slackchannel-input").val().trim(),
      libraryList: $("tbody").val().trim(),
      favoriteChecked: $("#favorite-checked").val().trim()
    });
  }

  // A function for creating an author. Calls getAuthors upon completion
  function insertLink(linkData) {
    $.post("/api/library", linkData)
      .then(getLibrary);
  }

  function insertUser(userData) {
    $.post("/api/users", userData)
      .then(getLibrary);
  }

  // Function for creating a new list row for authors
  function createLibaryEntry(linkData) {
    var newTr = $("<tr>");
    newTr.data("author", linkData);
    newTr.append("<td>" + linkData.name + "</td>");
    newTr.append("<td> " + linkData.Posts.length + "</td>");
    newTr.append("<td><a href='/blog?author_id=" + linkData.id + "'>Go to Posts</a></td>");
    newTr.append("<td><a href='/cms?author_id=" + linkData.id + "'>Create a Post</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Author</a></td>");
    return newTr;
  }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function getLibrary() {
    $.get("/api/library", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createLibraryEntry(data[i]));
      }
      renderLibraryList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of authors to the page
  function renderLibraryList(rows) {
    libraryList.children().not(":last").remove();
    libraryContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      LibraryList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no authors
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("Library is empty, submit a link to get started.");
    authorContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("author");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/authors/" + id
    })
      .then(getAuthors);
  }
});
