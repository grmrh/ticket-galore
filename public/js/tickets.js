$(function () {

      $(document).on('change', "#eventFilter", function () {
        $('#eventFilter').empty();
        $("option[value=" + this.value + "]", this)
          .attr("selected", true)
          .siblings()
          .removeAttr('selected');
      })

      $(document).on('click', "#ticket-dropdown ul li a", function () {
        event.preventDefault();

        $(this).parents(".btn-group.ticket-name-dropdown").find('#ticket_name').html($(this).text() + '<span class="caret"></span>');
        $(this).parents(".btn-group.ticket-name-dropdown").find('#ticket_name').val($(this).data('lookupeventid'));

        //location.reload();
      })


      $(".create-ticket-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newTicket = {
          email: $('#email').val().trim(),
          lookup_event_id: Number($("#ticket_name").val().trim()),
          ticket_name: $("#ticket_name").text().trim(),
          location: $("#location").val().trim(),
          price: parseFloat($("#price").val().trim()),
          description: $('#description').val().trim()
        };

        console.log('new ticket to store \n', newTicket);

        // Send the POST request.
        $.ajax("/api/tickets", {
          type: "POST",
          data: newTicket
        }).then(function () {
          console.log("created new ticket");
          // Reload the page to get the updated list
          location.reload();
        });
      });

      $(".ticket-add").on("click", function(event) {
        event.preventDefault();
        $('.ticket-add-form').removeAttr(".d-none").attr("class", "ticket-add-form d-block");
        // $('.ticket-add-form').removeAttr(".d-none").attr(".d-block");
      })

      $(".create-ticket-form-reset").on("click", function() {
        $(".create-ticket-form").trigger("reset");
      })

      $(".create-ticket-form-cancel").on("click", function() {
        $(".ticket-add-form").removeAttr(".d-block").attr("class", "ticket-add-form d-none");
      })

      $(".trade-ticket").on("click", function(event) {
        event.preventDefault();
        var user_id = $("#userId").val();
        var ticket_id = $(this).data("ticket_id");
        var image_stored_at = $(this).data('')

        var newTicketTrade = {
          "ticket_for_bid_user": $(this).data("owner_name"),
          "bid_Status": "in_pool",
          "bid_time": new Date().getFullYear().toString() + "-" + (new Date().getMonth()+1).toString() + "-" + new Date().getDate().toString(),
          "bid_price": $(this).data("price"),
          "bid_user_id": user_id,
          "bid_ticket_id": $(this).data("ticket_id"),
          "ticket_name": $(this).data("ticket_name"),
          "location": $(this).data("location"),
          "price": $(this).data("price"),
          "description": $(this).data("description"),
          "image_stored_at": $(this).data("image_stored_at"),
          "image_name": $(this).data("image_name"),
          "event_name": $(this).data("event_name"),
        }

        $.ajax({
          url: "/api/ticketTrades", 
          method: "POST",
          data: newTicketTrade
        })
        // .then(function(ticketTrade) {

        //   var ticketUpdate = [{ticket_trade_id: ticketTrade.ticket_trade_id},
        //                       {ticket_id: ticket_id}];
        //   $.ajax({
        //     url: "/api/tickets", 
        //     method: "PUT",
        //     data: ticketUpdate
        //   })
          .then(function(ticketTrade) {

            //console.log("Offer in Market: created ticket_trade entry \n", ticketTrade.ticket_name);
            location.reload();

          })         

      });

      $(".edit-trade-ticket").on("click", function(event) {

      })

      $(".takeback-trade-ticket").on("click", function(event) {

      })
      // ----------------------------------------------------------------------
      // transition background images
      var images = [
        "https://blog.roblox.com/wp-content/uploads/2017/09/Sports-Event-Banner_1920x1080_v01.jpg",
        "images/demo/bg-slide-01.jpg",
        "images/demo/eminem.jpg",
        "images/demo/wilds.jpg",
        "images/demo/timberwolves.jpg",
        "images/demo/mamma.jpg",
        "images/demo/people.jpg",
        "images/demo/vikings.jpg"
      ];
      var cur_image = 0;

      function changeBackground() {

        cur_image++;

        if (cur_image >= images.length)
          cur_image = 0;

        // change images
        $('.backGround').css({
          backgroundImage: 'url(' + images[cur_image] + ')'
        });

        $('.backGround .slide').fadeOut('slow', function () {
          $(this).css({
            backgroundImage: 'url(' + images[cur_image] + ')'
          }).show();
        });

      }

      //setInterval(changeBackground, 5000);


      var logoImage = [
        "/images/pref_imgs/vikings.png",
        "/images/pref_imgs/twins.png",
        "/images/pref_imgs/wolves.png",
        "/images/pref_imgs/wild.png",
        "/images/pref_imgs/united.png",
        "/images/pref_imgs/saints.png",
        "/images/pref_imgs/lynx.png",
        "/images/pref_imgs/gophers.png"
      ]

      var logoImageName = [
        "Vikings",
        "Twins",
        "Wolves",
        "Wilds",
        "United",
        "Saints",
        "Lynx",
        "Gophers"
      ]

      var logo = [{
          logoName: "Vikings",
          logoId: 1,
          imageStoredAt: "/images/pref_imgs/vikings.png"
        },
        {
          logoName: "Twins",
          logoId: 7,
          imageStoredAt: "/images/pref_imgs/twins.png"
        },
        {
          logoName: "Timberwolves",
          logoId: 8,
          imageStoredAt: "/images/pref_imgs/wolves.png"
        },
        {
          logoName: "Wilds",
          logoId: 9,
          imageStoredAt: "/images/pref_imgs/wild.png"
        },
        {
          logoName: "United",
          logoId: 2,
          imageStoredAt: "/images/pref_imgs/uniteds.png"
        },
        {
          logoName: "Saints",
          logoId: 3,
          imageStoredAt: "/images/pref_imgs/saints.png"
        },
        {
          logoName: "Lynx",
          logoId: 4,
          imageStoredAt: "/images/pref_imgs/lynx.png"
        },
        {
          logoName: "Gophers",
          logoId: 5,
          imageStoredAt: "/images/pref_imgs/gophers.png"
        },
      ]

      function addTicketToUserPreference(logoTitle) {

        var newPref = {
          user_id: Number($("#userId").val()),
          lookup_event_id: logo.find(l => l.logoName.trim().toLowerCase() == logoTitle.trim().toLowerCase()).logoId
        };

        var id = newPref.user_id;
        console.log('new preference to store \n', logoTitle);

        // Send the POST request.
        $.ajax({
          url: "/api/tickets/user/" + id + "/userInterests",
          method: "POST",
          data: newPref
        }).then(function () {
          console.log("created new preference for a current user");
          // Reload the page to get the updated list
          //location.reload();
        });
      }

      // $('#menu').load(function() {
      //   var id = Number($("#userId").val());
      //   // Send the GET request.
      //   $.ajax({
      //     url: "/api/tickets/user/" + id + "/userInterests",
      //     method: "GET"
      //   }).then(function () {
      //     console.log("created new preference for a current user");
      //     // Reload the page to get the updated list
      //     location.reload();
      //     }
      //   );
      // })


      var logoImage = [
        "/images/pref_imgs/vikings.png",
        "/images/pref_imgs/twins.png",
        "/images/pref_imgs/wolves.png",
        "/images/pref_imgs/wild.png",
        "/images/pref_imgs/united.png",
        "/images/pref_imgs/saints.png",
        "/images/pref_imgs/lynx.png",
        "/images/pref_imgs/gophers.png"
      ]

      var logoImageName = [
        "Vikings",
        "Twins",
        "Wolves",
        "Wilds",
        "United",
        "Saints",
        "Lynx",
        "Gophers"
      ]

      // ---------------------------------------------------------------------------------------
      // Loads images into modal for preference seletion 
      $("#pbutton").on("click", function () {

        $(".test123").empty();
        for (var i = 0; i < logoImage.length; i++) {
          var imageClass = ("imageClass" + [i])

          $(".test123").append(`<div class="img_container userPreferenceLogo">
            <input type="radio" name="pref" value="${logoImageName[i]}">
            <img src="${logoImage[i]}" alt="${logoImageName[i]}" id = "${imageClass}" class="image">
            <div class="middle">
            <div class="text">${logoImageName[i]}</div>
            </div>
            </div>`);

          // add ticket trade history to the below right side section

        }

      });


      //--------------------------------------------------------------------------------------
      //renders the users choice of preferences images to the pref div 
      var imageArray = []
      $("#submit").click(function () {

        event.preventDefault();
        var val = $('input[name=pref]:checked').val();
        imageArray.push(val)
        $("#menu").append(`<li><input type="radio" name="pref" value="${val}">
                      <img src="/images/pref_imgs/${val}.png" alt=""height="10%" width="10%">
                      </li>`)
        //alert("this is your array " + imageArray)

        // add this ticket to user preference
        addTicketToUserPreference(val);

      });

      // adds submit button for adding image to the preference div
      $("#submit").click(function () {
        $("#submit2").remove();
        $("#menu").prepend(`</div>
          <button id = "submit2" class="btn btn-danger" data-dismiss="modal">Submit</button>
            </div>`)
      });
      //--------------------------------------------------------------------------------------
      //renders the users tickets to buy 
      $("body").on("click", "#submit2", function () {
        var val = $('input[name=pref]:checked').val();
        $("#userTrade").prepend(`<div><img src="/images/pref_imgs/${val}.png" alt=""height="50%" width="50%"</div>`)

        //alert("this is our value " + val)
      });


      // -------------------------------------------------------------------------------------
      // function for speak voice
      function startDictation() {

        if (window.hasOwnProperty('webkitSpeechRecognition')) {

          var recognition = new webkitSpeechRecognition();

          recognition.continuous = false;
          recognition.interimResults = false;

          recognition.lang = "en-US";
          recognition.start();

          recognition.onresult = function (e) {
            document.getElementById('transcript').value = e.results[0][0].transcript;
            recognition.stop();
            document.getElementById('labnol').submit();
          };

          recognition.onerror = function (e) {
            recognition.stop();
          }

        }
      }

      function searchEvent(event) {
        event.preventDefault();
        var userInput = $('#eventInput').val().trim();


        var token = '752SKMBHJW64XM6OUEMY';
        var $events = $("#events");


        $.get('https://www.eventbriteapi.com/v3/events/search/?q=football&location.address=minnesota&token=' + token + '&', function (res) {
          if (res.events.length) {
            var s = "<ul class='eventList'>";
            for (var i = 0; i < res.events.length; i++) {
              var event = res.events[i];
              console.log(event);
              s += "<li><a href='" + event.url + "'>" + event.name.text + "</a> -" + event.name.text + "</li>";
            }
            s += "</ul>";
            $events.html(s);
          } else {
            $events.html("<p>Sorry, there are no upcoming events.</p>");
          }
        });
      }
});