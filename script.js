document.addEventListener("DOMContentLoaded", function () {
  var present = document.getElementById("present");
  var top = document.getElementById("top");
  var cat = document.getElementById("cat");
  var wish = document.getElementById("wish");
  var touchCat = document.getElementById("touch-cat"); // Dòng chữ "Touch the cat"
  var audio = document.getElementById("audio");
  var countdown = document.getElementById("countdown");

  cat.style.pointerEvents = "none"; // Ngăn chặn click vào con mèo trước khi hộp quà được bấm

  present.classList.add("animated", "bounceInDown");

  present.addEventListener("click", function () {
    top.classList.remove("animated", "bounce");
    top.classList.add("animated", "bounceOutUp");
    present.removeEventListener("click", arguments.callee);

    setTimeout(function () {
      cat.style.top = "-160px";
      cat.style.pointerEvents = "auto"; // Kích hoạt lại khả năng click vào con mèo
    }, 1000);

    var wishChildren = wish.children;
    var delay = 2500;

    for (let i = 0; i < wishChildren.length; i++) {
      setTimeout(function () {
        bounceIn(wishChildren[i]);
      }, delay + i * 100);
    }

    // Sau khi chữ "Happy Birthday" hiển thị xong
    setTimeout(function () {
      touchCat.style.opacity = 1;
    }, delay + wishChildren.length * 100);
  });

  function bounceIn(el) {
    el.classList.add("animated", "bounceInDown", "swing");
    setTimeout(function () {
      el.classList.remove("bounceInDown");
      el.classList.add("swing");
    }, 1000);
  }

  // Khi bấm vào con mèo, bắt đầu đếm ngược 5 giây
  cat.addEventListener("click", function () {
    cat.style.pointerEvents = "none";
    var count = 5;
    countdown.innerHTML = count; // Hiển thị 5 giây ban đầu
    countdown.style.display = "block"; // Hiển thị countdown

    // Đếm ngược
    var countdownInterval = setInterval(function () {
      count--;
      countdown.innerHTML = count; // Cập nhật hiển thị mỗi giây

      if (count === 0) {
        clearInterval(countdownInterval); // Dừng đếm ngược
        countdown.style.display = "none"; // Ẩn số đếm ngược sau khi kết thúc

        // Sau khi đếm ngược xong, phát nhạc và tạo mini box
        runBeforeMiniBox();
      }
    }, 1000);
  });
  // Hàm chạy trước khi tạo mini box (phát nhạc)
  function runBeforeMiniBox() {
    const audio = document.getElementById("audio");
    audio.volume = 0.2;

    if (audio.paused) {
      audio.volume = 0; // Bắt đầu với âm lượng 0
      audio.play();

      let maxVolume = 0.2; // Âm lượng tối đa cần đạt được
      let steps = 60; // Số bước chia nhỏ trong 3 giây
      let stepIncrease = maxVolume / steps; // Mức tăng âm lượng mỗi bước
      let duration = 3000; // Tổng thời gian là 3000ms (3 giây)
      let delay = duration / steps; // Thời gian giữa mỗi bước

      for (let i = 0; i <= steps; i++) {
        setTimeout(() => {
          audio.volume = Math.min(maxVolume, i * stepIncrease); // Tăng âm lượng từ 0 đến 0.2
        }, i * delay);
      }
    }

    touchCat.style.opacity = 0;
    let intervalId = null;

    const checkTime = () => {
      audio.removeEventListener("timeupdate", checkTime);

      intervalId = setInterval(createMiniBox, 100);

      audio.addEventListener("ended", () => {
        clearInterval(intervalId);
      });
    };

    audio.addEventListener("timeupdate", checkTime);
  }
});

// Hàm tạo mini box
function createMiniBox() {
  const miniBox = document.createElement("div");
  miniBox.classList.add("mini-box");

  const header = document.createElement("div");
  header.classList.add("box-header");
  const title = document.createElement("p");
  title.textContent = "Happy Birthday Cốt";
  const closeButton = document.createElement("a");
  closeButton.textContent = "-";
  closeButton.href = "#";
  closeButton.onclick = () => miniBox.remove();

  header.appendChild(title);
  header.appendChild(closeButton);
  miniBox.appendChild(header);

  const content = document.createElement("div");
  content.classList.add("box-content");
  const img = document.createElement("img");

  let list = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
  ];

  let randomIndex = Math.floor(Math.random() * list.length);
  let randomValue = list[randomIndex];

  img.src = `./image/${randomValue}.png`;
  img.alt = "Image";
  content.appendChild(img);
  miniBox.appendChild(content);

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const randomX = Math.random() * (screenWidth - 200);
  const randomY = Math.random() * (screenHeight - 200);

  miniBox.style.left = `${randomX}px`;
  miniBox.style.top = `${randomY}px`;

  document.body.appendChild(miniBox);

  miniBox.style.opacity = 1;
}
