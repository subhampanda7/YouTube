let Api_data = "AIzaSyDYEaLPmDXMrwle5x_e1GGJj1IzPYcKPOM";

let data;

let allData = async () => {
  try {
    let query = document.getElementById("query").value;
    let res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?q=${query}&key=${Api_data}&part=snippet&maxResults=20`
    );

    var { items } = await res.json();

    show_data = items;

    console.log("show_data:", show_data);

    displayTable(show_data);
  } catch (err) {
    console.log("err:", err);
  }
};

let displayTable = (data) => {
  //display Part
  document.getElementById("container").innerHTML = "";

  data.forEach(
    ({ id: { videoId }, snippet: { title, thumbnails, channelTitle } }) => {
      //Element Createing
      let div = document.createElement("div");

      let image = document.createElement("img");
      image.setAttribute("id", "homeimage");
      image.src = thumbnails.medium.url;
      image.addEventListener("click", function () {
        addFunc(videoId, title, channelTitle);
      });

      let name = document.createElement("p");
      name.innerText = title;
      name.setAttribute("id", "videoname");

      let cname = document.createElement("p");
      cname.innerText = channelTitle;
      cname.setAttribute("id", "channelname");

      document.getElementById("container").append(div);

      div.append(image, name, cname);
    }
  );
  document.querySelector("#filtering").addEventListener("change", function () {
    //Filtering Part
    let select = document.getElementById("filtering").value;
    //console.log("select:", select);

    if (select == "ATOZ") {
      data.sort((a, b) => {
        let x = a.snippet.title.toUpperCase();
        let y = b.snippet.title.toUpperCase();
        if (x > y) return 1;
        if (x < y) return -1;
        return 0;
      });
      // console.log(data);
      displayTable(data);
    }
    if (select == "ZTOA") {
      data.sort((a, b) => {
        let x = a.snippet.title.toUpperCase();
        let y = b.snippet.title.toUpperCase();
        if (x > y) return -1;
        if (x < y) return 1;
        return 0;
      });
      // console.log(data);
      displayTable(data);
    }
  });
};

let mainObj = JSON.parse(localStorage.getItem("video")) || []; //Local storage storing
// console.log("mainObj:", mainObj);

let addFunc = (videoId, title, channelTitle) => {
  let obj = {
    id: videoId,
    name: title,
    cname: channelTitle,
  };
  // console.log(obj);

  localStorage.setItem("video", JSON.stringify(obj));
  window.location.href = "ytdirect.html";
};
