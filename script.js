window.addEventListener("scroll", function () {
      var nav = document.getElementById("tsNav");
      if (nav) {
        if (window.scrollY > 60) { nav.classList.add("scrolled"); }
        else { nav.classList.remove("scrolled"); }
      }
    });
    var topBtn = document.createElement("button");
    topBtn.id = "tsTopBtn";
    topBtn.innerHTML = '<i class="fa fa-chevron-up"></i>';
    topBtn.title = "Back to top";
    document.body.appendChild(topBtn);
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) { topBtn.classList.add("visible"); }
      else { topBtn.classList.remove("visible"); }
    });
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    function openAlbum(name, year, img) {
      document.getElementById("albumModalTitle").innerHTML = '<i class="fa fa-compact-disc me-2"></i>' + name;
      document.getElementById("albumModalName").textContent = name;
      document.getElementById("albumModalYear").textContent = "Released: " + year;
      document.getElementById("albumModalImg").src = img;
      document.getElementById("albumModalImg").alt = name;
      var modal = new bootstrap.Modal(document.getElementById("albumModal"));
      modal.show();
    }
    var cart = JSON.parse(localStorage.getItem("tsCart") || "[]");
    function addToCart(item, price) {
      cart.push({ item: item, price: price, time: new Date().toLocaleString() });
      localStorage.setItem("tsCart", JSON.stringify(cart));
      showToast("🛍️ " + item + " added to cart! " + price);
    }
    function joinFanClub() {
      var name  = document.getElementById("fanName").value.trim();
      var email = document.getElementById("fanEmail").value.trim();
      var era   = document.getElementById("fanEra").value;
      var city  = document.getElementById("fanCity").value.trim();
      var msg   = document.getElementById("fanClubMsg");
      if (!name || !email || !era || !city) {
        msg.style.display = "block";
        msg.style.color = "#ff6b6b";
        msg.style.background = "rgba(255,107,107,0.08)";
        msg.style.padding = "10px";
        msg.style.borderRadius = "8px";
        msg.textContent = "⚠ Please fill in all fields!";
        return;
      }
      if (email.indexOf("@") === -1) {
        msg.style.display = "block";
        msg.style.color = "#ff6b6b";
        msg.textContent = "⚠ Please enter a valid email.";
        return;
      }
      var fan = { name: name, email: email, era: era, city: city, joined: new Date().toLocaleString() };
      localStorage.setItem("tsFanMember", JSON.stringify(fan));
      msg.style.display = "block";
      msg.style.color = "#c2185b";
      msg.style.background = "rgba(194,24,91,0.08)";
      msg.style.padding = "10px";
      msg.style.borderRadius = "8px";
      msg.innerHTML = "🎉 Welcome to the Swifties, <strong>" + name + "</strong>! You're officially a " + era + " fan!";
      document.getElementById("fanName").value = "";
      document.getElementById("fanEmail").value = "";
      document.getElementById("fanCity").value = "";
      var tip = document.getElementById("welcomeBack");
      if (tip) { tip.textContent = "Hi, " + name + "! ♡"; tip.style.display = "inline-block"; }
    }
    function bookTicket() {
      var city  = document.getElementById("ticketCity").value;
      var cat   = document.getElementById("ticketCat").value;
      var qty   = document.getElementById("ticketQty").value;
      var email = document.getElementById("ticketEmail").value.trim();
      var msg   = document.getElementById("ticketMsg");
      if (!city || !email) {
        msg.style.display = "block";
        msg.style.color = "#ff6b6b";
        msg.textContent = "⚠ Please select a city and enter your email.";
        return;
      }
      var booking = { city: city, cat: cat, qty: qty, email: email, time: new Date().toLocaleString() };
      localStorage.setItem("tsTicketBooking", JSON.stringify(booking));
      msg.style.display = "block";
      msg.style.color = "#00cc88";
      msg.style.background = "rgba(0,204,136,0.08)";
      msg.style.padding = "10px";
      msg.style.borderRadius = "8px";
      msg.innerHTML = "🎉 Booking confirmed for <strong>" + city + "</strong>! " + qty + "x " + cat + ". Check your email!";
    }
    function handleLogin() {
      var email = document.getElementById("loginEmail").value.trim();
      var pass  = document.getElementById("loginPass").value;
      var msg   = document.getElementById("loginMsg");
      if (!email || !pass) {
        msg.style.display = "block";
        msg.style.color = "#ff6b6b";
        msg.textContent = "⚠ Please enter email and password.";
        return;
      }
      localStorage.setItem("tsUser", email);
      msg.style.display = "block";
      msg.style.color = "#c2185b";
      msg.textContent = "✅ Welcome back, Swiftie! ♡";
      setTimeout(function () {
        var modal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
        if (modal) modal.hide();
        var tip = document.getElementById("welcomeBack");
        if (tip) { tip.textContent = "Hi, " + email.split("@")[0] + "! ♡"; tip.style.display = "inline-block"; }
      }, 1200);
    }
    function submitContact() {
      var name  = document.getElementById("contactName").value.trim();
      var email = document.getElementById("contactEmail").value.trim();
      var msg   = document.getElementById("contactMsg").value.trim();
      var suc   = document.getElementById("contactSuccess");
      if (!name || !email || !msg) {
        suc.style.display = "block";
        suc.style.color = "#ff6b6b";
        suc.textContent = "⚠ Please fill all fields.";
        return;
      }
      var ticket = { name: name, email: email, msg: msg, time: new Date().toLocaleString() };
      localStorage.setItem("tsContactTicket", JSON.stringify(ticket));
      suc.style.display = "block";
      suc.style.color = "#c2185b";
      suc.textContent = "✅ Message sent! We'll get back to you, " + name + ". ♡";
      document.getElementById("contactName").value = "";
      document.getElementById("contactEmail").value = "";
      document.getElementById("contactMsg").value = "";
    }
    function acceptTC() {
      localStorage.setItem("tsTCAccepted", "yes");
      var cb = document.getElementById("agreeTC");
      if (cb) cb.checked = true;
      showToast("✅ Terms & Conditions accepted! ♡");
    }
    function showToast(message) {
      var old = document.querySelector(".ts-toast");
      if (old) old.remove();
      var toast = document.createElement("div");
      toast.className = "ts-toast";
      toast.innerHTML = message;
      document.body.appendChild(toast);
      setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 4000);
    }
    window.addEventListener("DOMContentLoaded", function () {
      var fan = localStorage.getItem("tsFanMember");
      if (fan) {
        var f = JSON.parse(fan);
        var tip = document.getElementById("welcomeBack");
        if (tip) { tip.textContent = "Hi, " + f.name + "! ♡"; tip.style.display = "inline-block"; }
      }
      var user = localStorage.getItem("tsUser");
      if (user && !fan) {
        var tip = document.getElementById("welcomeBack");
        if (tip) { tip.textContent = "Hi, " + user.split("@")[0] + "! ♡"; tip.style.display = "inline-block"; }
      }
      var tc = localStorage.getItem("tsTCAccepted");
      var cb = document.getElementById("agreeTC");
      if (tc === "yes" && cb) cb.checked = true;
    });
    function fetchSongs() {
      var query = document.getElementById("apiSearchInput").value.trim();
      if (!query) { query = "Taylor Swift"; }
      var grid    = document.getElementById("apiSongsGrid");
      var loading = document.getElementById("apiLoading");
      var error   = document.getElementById("apiError");
      var count   = document.getElementById("apiCount");
      grid.innerHTML = "";
      error.style.display  = "none";
      count.style.display  = "none";
      loading.style.display = "block";
      var url = "https://itunes.apple.com/search?term=" + encodeURIComponent(query) + "&entity=song&limit=12&media=music";
      fetch(url)
        .then(function(response) { return response.json(); })
        .then(function(data) {
          loading.style.display = "none";
          if (!data.results || data.results.length === 0) {
            error.style.display = "block";
            return;
          }
          localStorage.setItem("tsLastSearch", JSON.stringify({ query: query, count: data.resultCount, time: new Date().toLocaleString() }));
          data.results.forEach(function(song) {
            var col = document.createElement("div");
            col.className = "col-6 col-sm-4 col-md-3 col-lg-2";
            col.innerHTML =
              '<div class="ts-song-card">' +
                '<img src="' + song.artworkUrl100 + '" alt="' + song.trackName + '" />' +
                '<div class="ts-song-info">' +
                  '<h4>' + song.trackName + '</h4>' +
                  '<p>' + song.collectionName + '</p>' +
                  '<span class="ts-song-price">' + (song.trackPrice > 0 ? "₹" + Math.round(song.trackPrice * 83) : "Free") + '</span>' +
                  '<a href="' + song.previewUrl + '" target="_blank" class="btn ts-btn-pink btn-sm w-100 mt-2">' +
                    '<i class="fa fa-play me-1"></i>Preview' +
                  '</a>' +
                '</div>' +
              '</div>';
            grid.appendChild(col);
          });
          count.style.display = "block";
          count.textContent = "✦ " + data.results.length + " songs found for \"" + query + "\" via iTunes API ✦";
        })
        .catch(function() {
          loading.style.display = "none";
          error.style.display   = "block";
        });
    }
    window.addEventListener("DOMContentLoaded", function() {
      fetchSongs();
    });
