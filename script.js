const params = new URLSearchParams(window.location.search);

const giftNo = params.get("gift");
const couponEntered = params.get("coupon")?.trim();

const giftTitle = document.getElementById("giftTitle");
const giftImage = document.getElementById("giftImage");
const winnerDiv = document.getElementById("winner");

if (!gifts[giftNo] || !couponEntered) {
  document.body.innerHTML = "<h2>Invalid Request</h2>";
} else {
  giftTitle.innerText =
    `🎁 Gift #${giftNo}: ${gifts[giftNo].name}`;

  giftImage.src = gifts[giftNo].image;

  fetch("data.csv")
    .then(res => res.text())
    .then(text => {
      const rows = text.split("\n");
      const headers = rows[0].split(",");

      // Find correct column indexes
      const couponIndex = headers.indexOf("CP. NO.");
      const nameIndex = headers.indexOf("CUSTOMER NAME");

      let found = false;

      for (let i = 1; i < rows.length; i++) {
        const cols = rows[i].split(",");

        const csvCoupon = cols[couponIndex]?.trim();
        const customerName = cols[nameIndex]?.trim();

        if (csvCoupon === couponEntered) {
          winnerDiv.innerHTML = `
            🎉 <strong>${customerName}</strong> 🎉<br>
            has won<br>
            <strong>${gifts[giftNo].name}</strong>
          `;
          found = true;
          break;
        }
      }

      if (!found) {
        winnerDiv.innerHTML =
          "<span style='color:red'>Invalid Coupon Number</span>";
      }
    });
}
