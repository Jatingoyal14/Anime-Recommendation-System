# 📺 Anime Recommendation System

A **full-stack, machine learning-powered recommendation system** that suggests anime titles based on user preferences.  
This project implements **Content-Based Filtering, Collaborative Filtering, Popularity-Based, and Hybrid Recommendation algorithms**, along with a **modern, responsive UI.**

## 🚀 Features

- **Four Recommendation Modes**
  - **Content-Based Filtering** – Finds similar anime using genre similarity via cosine similarity.
  - **Collaborative Filtering** – Suggests anime based on similar user preferences.
  - **Popularity-Based** – Shows trending and highly-rated anime.
  - **Hybrid System** – Combines all approaches for better accuracy.
- **User Interaction**
  - Rate anime with an interactive star-rating system.
  - Search and filter results by genre, year, and rating.
  - Add/remove anime from your watchlist.
- **Responsive UI**
  - Mobile-first design.
  - Anime-themed visuals & animations.
  - Intuitive navigation and real-time updates.
- **Personal Dashboard**
  - View watchlist and ratings.
  - Check how recommendations are computed.

***

## 🛠️ Tech Stack

### **Frontend**
- HTML5, CSS3, JavaScript (ES6+)
- CSS Grid & Flexbox for responsive design
- Custom CSS animations

### **Backend / Logic**
- Python 3.x
- Pandas & NumPy (data handling & similarity calculation)
- Scikit-learn (cosine similarity)
- Flask (API for recommendations)

### **Data**
- Preprocessed Anime dataset (from AnimeList/Kaggle-style dataset)
- User-anime rating matrix

***
## 📖 Algorithms Explained

1. **Content-Based Filtering**  
   - Converts anime genres into numerical vectors.
   - Computes cosine similarity between vectors.
   - Recommends anime with the highest similarity score.

2. **Collaborative Filtering**  
   - Based on user-user similarity from the rating matrix.
   - Finds users with similar tastes.
   - Suggests anime they liked that you haven’t seen.

3. **Popularity-Based**  
   - Sorts anime by average rating and number of ratings.
   - Great for new users (cold start problem).

4. **Hybrid Approach**  
   - Weighted combination of all algorithms.
   - Offers balanced, accurate recommendations.





