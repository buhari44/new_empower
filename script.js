document.addEventListener("DOMContentLoaded", () => {
  const newsSection = document.querySelector("aside.news");
  const newsItemContainer = document.querySelector(".news-item");
  let articles = [];
  let currentIndex = 0;

  const fetchNews = async () => {
    try {
      const response = await fetch(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=31caa36b12da48e8a14cd0ce307fbce0"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      articles = data.articles;

      if (articles && articles.length > 0) {
        displayNewsItem();
        setInterval(displayNewsItem, 10000); // Update every 10 seconds
      } else {
        newsItemContainer.innerHTML = "<p>No news available at the moment.</p>";
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
      newsItemContainer.innerHTML = "<p>Fani Willis appeals disqualification from Trump's election interference case - Axios.</p>";
    }
  };

  const displayNewsItem = () => {
    if (articles.length === 0) return;

    const article = articles[currentIndex];
    const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const newsHTML = `
      <p>${date}</p>
      <h4>${article.title}</h4>
      <a href="${article.url}" target="_blank">Read more</a>
    `;

    // Clear existing content and trigger the animation
    newsItemContainer.innerHTML = newsHTML;

    // Trigger the animation by adding a class after a brief delay
    newsItemContainer.classList.add("animate__animated", "animate__fadeInRight");

    // Remove the animation class after animation ends to reset
    newsItemContainer.addEventListener("animationend", () => {
      newsItemContainer.classList.remove("animate__animated", "animate__fadeInRight");
    });

    currentIndex = (currentIndex + 1) % articles.length; // Cycle through articles
  };

  fetchNews();
});
