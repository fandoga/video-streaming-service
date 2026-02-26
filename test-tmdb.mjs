const API_KEY = "3ae7bf3392767fd05320e360faa50a5a";

const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ru-RU&page=1`;

console.log("Fetching:", url);

try {
  const res = await fetch(url);
  const data = await res.json();
  console.log("Status:", res.status);
  console.log("Movies:", data.results?.length);
  console.log("First movie:", data.results?.[0]?.title);
} catch (err) {
  console.error("Error:", err);
}
