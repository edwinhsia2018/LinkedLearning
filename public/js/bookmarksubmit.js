$(document).ready(function() {

    // Click handler for submitting a bookmark
    $(document).on("submit", "#bookmarksubmit", function(event) {
      var id = $(this).data("id");
      var urlObj = {
        url: $("#url-input").val().trim(),
        title: $("#title-input").val().trim(),
        summary: $("#summary-input").val().trim(),
        category:$("#category-input").val().trim(),
        tags: $("#tags-input").tagsinput(),
        // author: $("#author-input").val().trim(),
        // added_by: $("#addedby-input").val().trim(),
        // slack_channel: $("#slackchannel-input").val().trim()
    };
  
      // Send the PUT request.
      $.ajax("/api/bookmarks/" + id, {
        type: "PUT",
        data: urlObj
      }).then(
        function() {
          location.reload();
        }
      );
    });
  
    //Click handler for registering a new user
    $(document).on("click", "#register-submit", function(event){
      var id = $(this).data("id");
      var userObj = {
        fname: $("#fname-input").val().trim(),
        lname: $("#lname-input").val().trim(),
        email: $("#email-input").val().trim(),
        password:$("#password-input").val().trim(),
    };
  
      // Send the PUT request.
      $.ajax("/api/user/" + id, {
        type: "PUT",
        data: userObj
      }).then(
        function() {
          location.reload();
        }
      );
    });

       //Click handler for registering a login
       $(document).on("click", "#login-submit", function(event){
        var id = $(this).data("id");
        var loginObj = {
          username: $("#username-input").val().trim(),
          password:$("#password-input").val().trim()
      };
    
        // Send the PUT request.
        $.ajax("/api/user/" + id, {
          type: "PUT",
          data: loginObj
        }).then(
          function() {
            location.reload();
          }
        );
      });
  
    //Click handler for search function
    $(document).on("click", "#search-button", function(event) {
      var id = $(this).data("id");
      var searchObj = {
        category: $("#category-search").val().trim(),
        tags: $("#tags-search").val().trim(),
        slack_channel: $("#slack-search").val().trim()
    };
  
      $.ajax("/api/bookmarks/" + id, {
        type: "GET",
        data: searchObj
      }).then(
        function() {
          location.reload();
        }
      );
    });
  
  });
  