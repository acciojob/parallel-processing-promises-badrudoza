const output = document.getElementById("output");

// Step 1: Define the images
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Step 2: Create a function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

// Step 3: Download all images and handle states
function downloadImages() {
  output.innerHTML = `<p>Loading...</p>`; // show loading

  const promises = images.map(img => downloadImage(img.url));

  Promise.all(promises)
    .then(loadedImages => {
      output.innerHTML = ""; // clear loading

      loadedImages.forEach(img => {
        output.appendChild(img); // display images
      });
    })
    .catch(error => {
      output.innerHTML = `<p style="color:red;">${error}</p>`;
    });
}

// Step 4: Automatically start downloading images when page loads
window.onload = downloadImages;
