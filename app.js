// AnimeRec - AI-Powered Anime Recommendation System
// Advanced recommendation algorithms with modern JavaScript

class AnimeRecommendationSystem {
    constructor() {
        this.animeDatabase = [];
        this.userRatings = {};
        this.watchlist = new Set();
        this.currentAnime = null;
        this.filteredAnime = [];
        this.currentAlgorithm = 'content';
        
        this.algorithmDescriptions = {
            content: 'Recommends anime similar to ones you\'ve rated highly based on genre similarity using cosine similarity calculations.',
            collaborative: 'Finds users with similar preferences and recommends anime they enjoyed using collaborative filtering.',
            popularity: 'Shows the highest-rated and most popular anime across all users and critics.',
            hybrid: 'Combines content-based, collaborative, and popularity algorithms for optimal recommendations using weighted scoring.'
        };

        this.init();
    }

    async init() {
        await this.loadAnimeData();
        this.loadUserPreferences();
        this.setupEventListeners();
        this.displayAnime(this.animeDatabase);
        this.updateStats();
        this.updateAlgorithmInfo();
    }

    async loadAnimeData() {
        try {
            // Use embedded anime data
            this.animeDatabase = [
                {
                    "id": 1,
                    "title": "Fullmetal Alchemist: Brotherhood",
                    "genres": ["Action", "Adventure", "Drama", "Fantasy", "Military", "Shounen"],
                    "rating": 9.1,
                    "year": 2009,
                    "episodes": 64,
                    "status": "Completed",
                    "synopsis": "After a disastrous alchemy experiment, brothers Edward and Alphonse Elric search for the Philosopher's Stone to restore their bodies.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/1223/96541.jpg",
                    "type": "TV"
                },
                {
                    "id": 2,
                    "title": "Frieren: Beyond Journey's End",
                    "genres": ["Adventure", "Drama", "Fantasy"],
                    "rating": 9.3,
                    "year": 2023,
                    "episodes": 28,
                    "status": "Completed",
                    "synopsis": "Elf mage Frieren reflects on mortality and friendship after her hero's party dissolves following their quest to defeat the Demon King.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/1015/138006.jpg",
                    "type": "TV"
                },
                {
                    "id": 3,
                    "title": "Solo Leveling",
                    "genres": ["Action", "Fantasy", "Supernatural"],
                    "rating": 8.6,
                    "year": 2024,
                    "episodes": 12,
                    "status": "Ongoing",
                    "synopsis": "Weak hunter Sung Jinwoo becomes the world's strongest after gaining a mysterious system that allows him to level up.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/1906/140923.jpg",
                    "type": "TV"
                },
                {
                    "id": 4,
                    "title": "Demon Slayer: Kimetsu no Yaiba",
                    "genres": ["Action", "Historical", "Shounen", "Supernatural"],
                    "rating": 8.7,
                    "year": 2019,
                    "episodes": 26,
                    "status": "Completed",
                    "synopsis": "Tanjiro becomes a demon slayer to save his sister Nezuko who was turned into a demon.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
                    "type": "TV"
                },
                {
                    "id": 5,
                    "title": "Attack on Titan",
                    "genres": ["Action", "Drama", "Fantasy", "Military", "Shounen"],
                    "rating": 8.5,
                    "year": 2013,
                    "episodes": 25,
                    "status": "Completed",
                    "synopsis": "Humanity fights for survival against giant humanoid creatures called Titans.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
                    "type": "TV"
                },
                {
                    "id": 6,
                    "title": "One Piece",
                    "genres": ["Action", "Adventure", "Comedy", "Drama", "Shounen"],
                    "rating": 8.7,
                    "year": 1999,
                    "episodes": 1000,
                    "status": "Ongoing",
                    "synopsis": "Monkey D. Luffy explores the Grand Line with his crew to find the ultimate treasure, One Piece.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
                    "type": "TV"
                },
                {
                    "id": 7,
                    "title": "Your Name",
                    "genres": ["Drama", "Romance", "School", "Shounen"],
                    "rating": 8.4,
                    "year": 2016,
                    "episodes": 1,
                    "status": "Completed",
                    "synopsis": "Two teenagers share a profound, magical connection when they start swapping bodies.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
                    "type": "Movie"
                },
                {
                    "id": 8,
                    "title": "Spirited Away",
                    "genres": ["Adventure", "Family", "Supernatural"],
                    "rating": 9.3,
                    "year": 2001,
                    "episodes": 1,
                    "status": "Completed",
                    "synopsis": "A girl enters a world ruled by gods and witches, where humans are changed into beasts.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/6/79597.jpg",
                    "type": "Movie"
                },
                {
                    "id": 9,
                    "title": "My Hero Academia",
                    "genres": ["Action", "School", "Shounen", "Super Power"],
                    "rating": 7.9,
                    "year": 2016,
                    "episodes": 13,
                    "status": "Completed",
                    "synopsis": "In a world where superpowers are the norm, a boy born without them dreams of becoming a hero.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/10/78745.jpg",
                    "type": "TV"
                },
                {
                    "id": 10,
                    "title": "Death Note",
                    "genres": ["Drama", "Psychological", "Shounen", "Supernatural", "Thriller"],
                    "rating": 9.0,
                    "year": 2006,
                    "episodes": 37,
                    "status": "Completed",
                    "synopsis": "A high school student discovers a supernatural notebook that kills anyone whose name is written in it.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
                    "type": "TV"
                },
                {
                    "id": 11,
                    "title": "Naruto",
                    "genres": ["Action", "Comedy", "Martial Arts", "Shounen"],
                    "rating": 8.3,
                    "year": 2002,
                    "episodes": 220,
                    "status": "Completed",
                    "synopsis": "A young ninja seeks recognition from his peers and dreams of becoming the Hokage.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
                    "type": "TV"
                },
                {
                    "id": 12,
                    "title": "Cowboy Bebop",
                    "genres": ["Action", "Adventure", "Drama", "Sci-Fi", "Space"],
                    "rating": 8.8,
                    "year": 1998,
                    "episodes": 26,
                    "status": "Completed",
                    "synopsis": "The futuristic misadventures of bounty hunters traveling in their spaceship called Bebop.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/4/19644.jpg",
                    "type": "TV"
                },
                {
                    "id": 13,
                    "title": "Dandadan",
                    "genres": ["Action", "Comedy", "Romance", "School", "Shounen", "Supernatural"],
                    "rating": 8.8,
                    "year": 2024,
                    "episodes": 12,
                    "status": "Ongoing",
                    "synopsis": "A story about ghosts, aliens, and the unlikely friendship between two high school students.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/1695/144718.jpg",
                    "type": "TV"
                },
                {
                    "id": 14,
                    "title": "Jujutsu Kaisen",
                    "genres": ["Action", "School", "Shounen", "Supernatural"],
                    "rating": 8.6,
                    "year": 2020,
                    "episodes": 24,
                    "status": "Completed",
                    "synopsis": "A high school student joins a secret organization of Jujutsu Sorcerers to kill Curses.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
                    "type": "TV"
                },
                {
                    "id": 15,
                    "title": "Princess Mononoke",
                    "genres": ["Action", "Adventure", "Drama"],
                    "rating": 8.7,
                    "year": 1997,
                    "episodes": 1,
                    "status": "Completed",
                    "synopsis": "A prince becomes involved in the struggle between forest gods and a mining colony.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/7/75919.jpg",
                    "type": "TV"
                },
                {
                    "id": 16,
                    "title": "Hunter x Hunter",
                    "genres": ["Action", "Adventure", "Fantasy", "Shounen"],
                    "rating": 9.0,
                    "year": 2011,
                    "episodes": 148,
                    "status": "Completed",
                    "synopsis": "A young boy seeks to become a Hunter and find his father who abandoned him.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/11/33657.jpg",
                    "type": "TV"
                },
                {
                    "id": 17,
                    "title": "One Punch Man",
                    "genres": ["Action", "Comedy", "Parody", "Seinen", "Super Power"],
                    "rating": 8.8,
                    "year": 2015,
                    "episodes": 12,
                    "status": "Completed",
                    "synopsis": "A superhero who can defeat any enemy with a single punch struggles with ennui.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/12/76049.jpg",
                    "type": "TV"
                },
                {
                    "id": 18,
                    "title": "Mob Psycho 100",
                    "genres": ["Action", "Comedy", "Supernatural"],
                    "rating": 8.9,
                    "year": 2016,
                    "episodes": 12,
                    "status": "Completed",
                    "synopsis": "A psychic middle schooler tries to live normally despite his extraordinary powers.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/8/80356.jpg",
                    "type": "TV"
                },
                {
                    "id": 19,
                    "title": "Haikyuu!!",
                    "genres": ["Comedy", "Drama", "School", "Shounen", "Sports"],
                    "rating": 8.7,
                    "year": 2014,
                    "episodes": 25,
                    "status": "Completed",
                    "synopsis": "A short boy joins his school's volleyball team despite his height disadvantage.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/7/76014.jpg",
                    "type": "TV"
                },
                {
                    "id": 20,
                    "title": "Chainsaw Man",
                    "genres": ["Action", "Shounen", "Supernatural"],
                    "rating": 8.5,
                    "year": 2022,
                    "episodes": 12,
                    "status": "Completed",
                    "synopsis": "A young man makes a contract with a devil and becomes part human, part chainsaw.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/1806/126216.jpg",
                    "type": "TV"
                },
                {
                    "id": 21,
                    "title": "Kaiju No. 8",
                    "genres": ["Action", "Military", "Shounen"],
                    "rating": 8.3,
                    "year": 2024,
                    "episodes": 12,
                    "status": "Completed",
                    "synopsis": "A man gains kaiju powers after a parasite enters his body during a cleanup mission.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/1492/140690.jpg",
                    "type": "TV"
                },
                {
                    "id": 22,
                    "title": "Violet Evergarden",
                    "genres": ["Drama", "Fantasy", "Slice of Life"],
                    "rating": 8.5,
                    "year": 2018,
                    "episodes": 13,
                    "status": "Completed",
                    "synopsis": "A former soldier works as a ghostwriter to understand the meaning of love and emotions.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/3/88097.jpg",
                    "type": "TV"
                },
                {
                    "id": 23,
                    "title": "A Silent Voice",
                    "genres": ["Drama", "Romance", "School", "Shounen"],
                    "rating": 8.9,
                    "year": 2016,
                    "episodes": 1,
                    "status": "Completed",
                    "synopsis": "A former bully seeks redemption by reconnecting with a deaf girl he tormented.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/1122/96435.jpg",
                    "type": "Movie"
                },
                {
                    "id": 24,
                    "title": "Your Lie in April",
                    "genres": ["Drama", "Music", "Romance", "School", "Shounen"],
                    "rating": 8.6,
                    "year": 2014,
                    "episodes": 22,
                    "status": "Completed",
                    "synopsis": "A piano prodigy who lost his ability to hear music meets a violinist who changes his life.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/3/67177.jpg",
                    "type": "TV"
                },
                {
                    "id": 25,
                    "title": "Delicious in Dungeon",
                    "genres": ["Adventure", "Comedy", "Fantasy"],
                    "rating": 8.5,
                    "year": 2024,
                    "episodes": 24,
                    "status": "Completed",
                    "synopsis": "Adventurers explore a dungeon and cook the monsters they defeat to survive.",
                    "image_url": "https://cdn.myanimelist.net/images/anime/1456/140736.jpg",
                    "type": "TV"
                }
            ];

            this.filteredAnime = [...this.animeDatabase];
        } catch (error) {
            console.error('Error loading anime data:', error);
            this.animeDatabase = [];
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                if (e.target.value.length === 0) {
                    this.applyFilters();
                }
            });
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.searchAnime();
                }
            });
        }

        // Algorithm selector
        const algorithmSelect = document.getElementById('algorithmSelect');
        if (algorithmSelect) {
            algorithmSelect.addEventListener('change', () => {
                this.currentAlgorithm = algorithmSelect.value;
                this.updateAlgorithmInfo();
                this.saveUserPreferences();
            });
        }

        // Filter dropdowns
        const genreFilter = document.getElementById('genreFilter');
        const yearFilter = document.getElementById('yearFilter');
        
        if (genreFilter) {
            genreFilter.addEventListener('change', () => {
                this.applyFilters();
            });
        }
        
        if (yearFilter) {
            yearFilter.addEventListener('change', () => {
                this.applyFilters();
            });
        }

        // Star rating interaction in modal
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('star')) {
                const rating = parseInt(e.target.dataset.rating);
                this.setStarRating(rating);
            }
        });

        // Star hover effects
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('star')) {
                const rating = parseInt(e.target.dataset.rating);
                this.highlightStars(rating);
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('star')) {
                const currentRating = this.getCurrentRating();
                this.highlightStars(currentRating);
            }
        });

        // Modal backdrop clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal__backdrop')) {
                this.closeAllModals();
            }
        });

        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    // RECOMMENDATION ALGORITHMS

    // 1. Content-Based Filtering using Cosine Similarity
    getContentBasedRecommendations(limit = 10) {
        const userRatedAnime = Object.keys(this.userRatings)
            .map(id => ({
                anime: this.animeDatabase.find(a => a.id === parseInt(id)),
                rating: this.userRatings[id]
            }))
            .filter(item => item.anime && item.rating >= 7); // Only consider highly rated anime

        if (userRatedAnime.length === 0) {
            return this.getPopularityBasedRecommendations(limit);
        }

        const recommendations = [];
        const ratedIds = new Set(Object.keys(this.userRatings).map(Number));

        // Create genre vector for user profile
        const userGenreProfile = this.createUserGenreProfile(userRatedAnime);

        for (const anime of this.animeDatabase) {
            if (ratedIds.has(anime.id)) continue;

            const animeGenreVector = this.createGenreVector(anime.genres);
            const similarity = this.cosineSimilarity(userGenreProfile, animeGenreVector);
            
            // Factor in anime rating and recency
            const recencyBoost = anime.year >= 2020 ? 0.1 : 0;
            const ratingBoost = (anime.rating - 7) * 0.05;
            const score = similarity + recencyBoost + ratingBoost;

            recommendations.push({ anime, score, reason: `${(similarity * 100).toFixed(0)}% genre match` });
        }

        return recommendations
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    }

    // 2. Collaborative Filtering
    getCollaborativeRecommendations(limit = 10) {
        if (Object.keys(this.userRatings).length < 3) {
            return this.getContentBasedRecommendations(limit);
        }

        // Simulate other users with different preferences
        const otherUsers = this.generateSimulatedUsers();
        const currentUserVector = this.createUserRatingVector();
        
        // Find similar users
        const userSimilarities = otherUsers.map(user => ({
            user,
            similarity: this.cosineSimilarity(currentUserVector, user.ratingVector)
        })).sort((a, b) => b.similarity - a.similarity);

        const recommendations = [];
        const ratedIds = new Set(Object.keys(this.userRatings).map(Number));

        // Get recommendations from similar users
        for (const { user, similarity } of userSimilarities.slice(0, 3)) {
            for (const [animeId, rating] of Object.entries(user.ratings)) {
                const id = parseInt(animeId);
                if (!ratedIds.has(id) && rating >= 8) {
                    const anime = this.animeDatabase.find(a => a.id === id);
                    if (anime) {
                        const score = similarity * (rating / 10);
                        const existing = recommendations.find(r => r.anime.id === id);
                        if (existing) {
                            existing.score += score;
                        } else {
                            recommendations.push({
                                anime,
                                score,
                                reason: `Liked by similar users (${(similarity * 100).toFixed(0)}% match)`
                            });
                        }
                    }
                }
            }
        }

        return recommendations
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    }

    // 3. Popularity-Based Recommendations
    getPopularityBasedRecommendations(limit = 10) {
        const ratedIds = new Set(Object.keys(this.userRatings).map(Number));
        
        return this.animeDatabase
            .filter(anime => !ratedIds.has(anime.id))
            .map(anime => {
                // Combine rating with recency and episode count considerations
                const ratingScore = anime.rating / 10;
                const recencyScore = Math.max(0, (anime.year - 1990) / (2024 - 1990)) * 0.3;
                const episodeScore = Math.min(anime.episodes / 100, 1) * 0.2;
                const score = ratingScore + recencyScore + episodeScore;

                return {
                    anime,
                    score,
                    reason: `Popular choice (${anime.rating}/10 rating)`
                };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    }

    // 4. Hybrid Recommendation System
    getHybridRecommendations(limit = 10) {
        const ratingCount = Object.keys(this.userRatings).length;
        
        let contentWeight = 0.4;
        let collaborativeWeight = 0.3;
        let popularityWeight = 0.3;

        // Adjust weights based on available data
        if (ratingCount < 3) {
            contentWeight = 0.2;
            collaborativeWeight = 0.1;
            popularityWeight = 0.7;
        } else if (ratingCount < 10) {
            contentWeight = 0.5;
            collaborativeWeight = 0.2;
            popularityWeight = 0.3;
        } else {
            contentWeight = 0.4;
            collaborativeWeight = 0.4;
            popularityWeight = 0.2;
        }

        const contentRecs = this.getContentBasedRecommendations(limit * 2);
        const collaborativeRecs = this.getCollaborativeRecommendations(limit * 2);
        const popularityRecs = this.getPopularityBasedRecommendations(limit * 2);

        const hybridScores = {};

        // Combine scores from all algorithms
        [...contentRecs, ...collaborativeRecs, ...popularityRecs].forEach(rec => {
            const id = rec.anime.id;
            if (!hybridScores[id]) {
                hybridScores[id] = { anime: rec.anime, score: 0, reasons: [] };
            }
            
            let weight = 0;
            if (contentRecs.find(r => r.anime.id === id)) weight += contentWeight;
            if (collaborativeRecs.find(r => r.anime.id === id)) weight += collaborativeWeight;
            if (popularityRecs.find(r => r.anime.id === id)) weight += popularityWeight;
            
            hybridScores[id].score += rec.score * weight;
            if (!hybridScores[id].reasons.includes(rec.reason)) {
                hybridScores[id].reasons.push(rec.reason);
            }
        });

        return Object.values(hybridScores)
            .map(item => ({
                ...item,
                reason: `Hybrid: ${item.reasons.join(', ')}`
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    }

    // UTILITY FUNCTIONS FOR ALGORITHMS

    createGenreVector(genres) {
        const allGenres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Romance', 
                          'Shounen', 'Supernatural', 'Psychological', 'Military', 'Historical',
                          'School', 'Sci-Fi', 'Sports', 'Music', 'Slice of Life', 'Family',
                          'Thriller', 'Martial Arts', 'Space', 'Parody', 'Seinen', 'Super Power'];
        
        return allGenres.map(genre => genres.includes(genre) ? 1 : 0);
    }

    createUserGenreProfile(userRatedAnime) {
        const allGenres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Romance', 
                          'Shounen', 'Supernatural', 'Psychological', 'Military', 'Historical',
                          'School', 'Sci-Fi', 'Sports', 'Music', 'Slice of Life', 'Family',
                          'Thriller', 'Martial Arts', 'Space', 'Parody', 'Seinen', 'Super Power'];
        
        const genreScores = allGenres.map(() => 0);
        let totalWeight = 0;

        userRatedAnime.forEach(({ anime, rating }) => {
            const weight = rating / 10; // Normalize rating to 0-1
            anime.genres.forEach(genre => {
                const index = allGenres.indexOf(genre);
                if (index !== -1) {
                    genreScores[index] += weight;
                    totalWeight += weight;
                }
            });
        });

        // Normalize scores
        if (totalWeight > 0) {
            return genreScores.map(score => score / totalWeight);
        }
        return genreScores;
    }

    createUserRatingVector() {
        const vector = new Array(this.animeDatabase.length).fill(0);
        Object.entries(this.userRatings).forEach(([id, rating]) => {
            const index = this.animeDatabase.findIndex(a => a.id === parseInt(id));
            if (index !== -1) {
                vector[index] = rating / 10; // Normalize to 0-1
            }
        });
        return vector;
    }

    cosineSimilarity(vectorA, vectorB) {
        if (vectorA.length !== vectorB.length) return 0;
        
        let dotProduct = 0;
        let normA = 0;
        let normB = 0;
        
        for (let i = 0; i < vectorA.length; i++) {
            dotProduct += vectorA[i] * vectorB[i];
            normA += vectorA[i] * vectorA[i];
            normB += vectorB[i] * vectorB[i];
        }
        
        const magnitude = Math.sqrt(normA) * Math.sqrt(normB);
        return magnitude === 0 ? 0 : dotProduct / magnitude;
    }

    generateSimulatedUsers() {
        // Generate diverse user profiles for collaborative filtering
        const users = [];
        
        // Action lover
        users.push({
            ratings: { 1: 9, 4: 9, 5: 8, 14: 8, 20: 7, 11: 8, 16: 9 },
            ratingVector: this.createRatingVector({ 1: 9, 4: 9, 5: 8, 14: 8, 20: 7, 11: 8, 16: 9 })
        });
        
        // Romance/Drama fan
        users.push({
            ratings: { 7: 9, 23: 9, 24: 8, 22: 8, 8: 9, 2: 8 },
            ratingVector: this.createRatingVector({ 7: 9, 23: 9, 24: 8, 22: 8, 8: 9, 2: 8 })
        });
        
        // Comedy enthusiast
        users.push({
            ratings: { 6: 9, 17: 9, 18: 8, 19: 8, 13: 8, 25: 7 },
            ratingVector: this.createRatingVector({ 6: 9, 17: 9, 18: 8, 19: 8, 13: 8, 25: 7 })
        });
        
        return users;
    }

    createRatingVector(ratings) {
        const vector = new Array(this.animeDatabase.length).fill(0);
        Object.entries(ratings).forEach(([id, rating]) => {
            const index = this.animeDatabase.findIndex(a => a.id === parseInt(id));
            if (index !== -1) {
                vector[index] = rating / 10;
            }
        });
        return vector;
    }

    // UI MANAGEMENT FUNCTIONS

    displayAnime(animeList) {
        const grid = document.getElementById('animeGrid');
        const noResults = document.getElementById('noResults');
        const resultsCount = document.getElementById('resultsCount');
        
        if (!grid || !noResults || !resultsCount) return;
        
        if (animeList.length === 0) {
            grid.innerHTML = '';
            noResults.classList.remove('hidden');
            resultsCount.textContent = '0 anime found';
            return;
        }
        
        noResults.classList.add('hidden');
        resultsCount.textContent = `${animeList.length} anime found`;
        
        grid.innerHTML = animeList.map(item => {
            const anime = item.anime || item;
            const reason = item.reason || '';
            const userRating = this.userRatings[anime.id];
            const isInWatchlist = this.watchlist.has(anime.id);
            
            return `
                <div class="anime-card" data-id="${anime.id}">
                    <div class="anime-card__image-container">
                        ${anime.image_url ? 
                            `<img src="${anime.image_url}" alt="${anime.title}" class="anime-card__image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                             <div class="anime-card__placeholder" style="display:none;">🎌</div>` :
                            `<div class="anime-card__placeholder">🎌</div>`
                        }
                        <div class="anime-card__rating-badge">
                            ⭐ ${anime.rating}
                        </div>
                        ${userRating ? `<div class="anime-card__user-rating">You: ${userRating}/10</div>` : ''}
                    </div>
                    <div class="anime-card__content">
                        <h3 class="anime-card__title">${anime.title}</h3>
                        <div class="anime-card__meta">
                            <span>${anime.year} • ${anime.type}</span>
                            <span>${anime.episodes} eps</span>
                        </div>
                        <div class="anime-card__genres">
                            ${anime.genres.slice(0, 3).map(genre => 
                                `<span class="genre-tag">${genre}</span>`
                            ).join('')}
                        </div>
                        <p class="anime-card__synopsis">${anime.synopsis}</p>
                        ${reason ? `<div class="recommendation-reason"><strong>Why:</strong> ${reason}</div>` : ''}
                        <div class="anime-card__actions">
                            <button class="btn btn--primary btn--sm" onclick="window.animeRec.openRatingModal(${anime.id})">
                                ${userRating ? 'Update Rating' : 'Rate'}
                            </button>
                            <button class="btn btn--secondary btn--sm" onclick="window.animeRec.toggleWatchlist(${anime.id})">
                                ${isInWatchlist ? '✓ In List' : '+ Watchlist'}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    generateRecommendations() {
        const algorithmSelect = document.getElementById('algorithmSelect');
        if (!algorithmSelect) return;
        
        const algorithm = algorithmSelect.value;
        const loadingState = document.getElementById('loadingState');
        const resultsTitle = document.getElementById('resultsTitle');
        
        if (loadingState && resultsTitle) {
            // Update algorithm info
            this.currentAlgorithm = algorithm;
            this.updateAlgorithmInfo();
            
            // Show loading state
            loadingState.classList.remove('hidden');
            const animeGrid = document.getElementById('animeGrid');
            if (animeGrid) {
                animeGrid.style.opacity = '0.5';
            }
            
            // Simulate processing time for better UX
            setTimeout(() => {
                let recommendations;
                
                switch (algorithm) {
                    case 'content':
                        recommendations = this.getContentBasedRecommendations(12);
                        resultsTitle.textContent = 'Content-Based Recommendations';
                        break;
                    case 'collaborative':
                        recommendations = this.getCollaborativeRecommendations(12);
                        resultsTitle.textContent = 'Collaborative Filtering Recommendations';
                        break;
                    case 'popularity':
                        recommendations = this.getPopularityBasedRecommendations(12);
                        resultsTitle.textContent = 'Popular Anime Recommendations';
                        break;
                    case 'hybrid':
                        recommendations = this.getHybridRecommendations(12);
                        resultsTitle.textContent = 'Hybrid AI Recommendations';
                        break;
                    default:
                        recommendations = this.getContentBasedRecommendations(12);
                }
                
                this.displayAnime(recommendations);
                loadingState.classList.add('hidden');
                if (animeGrid) {
                    animeGrid.style.opacity = '1';
                }
            }, 1000);
        }
    }

    updateAlgorithmInfo() {
        const algorithmName = document.getElementById('currentAlgorithmName');
        const algorithmDesc = document.getElementById('algorithmDescription');
        
        if (algorithmName && algorithmDesc) {
            const algorithmNames = {
                content: 'Content-Based Filtering',
                collaborative: 'Collaborative Filtering', 
                popularity: 'Popularity-Based',
                hybrid: 'Hybrid System'
            };
            
            algorithmName.textContent = algorithmNames[this.currentAlgorithm];
            algorithmDesc.textContent = this.algorithmDescriptions[this.currentAlgorithm];
        }
    }

    searchAnime() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;
        
        const query = searchInput.value.toLowerCase().trim();
        if (!query) {
            this.applyFilters();
            return;
        }
        
        const results = this.animeDatabase.filter(anime => 
            anime.title.toLowerCase().includes(query) ||
            anime.genres.some(genre => genre.toLowerCase().includes(query)) ||
            anime.synopsis.toLowerCase().includes(query)
        );
        
        this.displayAnime(results);
        const resultsTitle = document.getElementById('resultsTitle');
        if (resultsTitle) {
            resultsTitle.textContent = `Search Results for "${query}"`;
        }
    }

    applyFilters() {
        const genreFilter = document.getElementById('genreFilter');
        const yearFilter = document.getElementById('yearFilter');
        const searchInput = document.getElementById('searchInput');
        
        if (!genreFilter || !yearFilter || !searchInput) return;
        
        const genreValue = genreFilter.value;
        const yearValue = yearFilter.value;
        const searchQuery = searchInput.value.toLowerCase().trim();
        
        let filtered = [...this.animeDatabase];
        
        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(anime => 
                anime.title.toLowerCase().includes(searchQuery) ||
                anime.genres.some(genre => genre.toLowerCase().includes(searchQuery))
            );
        }
        
        // Apply genre filter
        if (genreValue) {
            filtered = filtered.filter(anime => anime.genres.includes(genreValue));
        }
        
        // Apply year filter
        if (yearValue) {
            if (yearValue === '2024') {
                filtered = filtered.filter(anime => anime.year === 2024);
            } else if (yearValue === '2023') {
                filtered = filtered.filter(anime => anime.year === 2023);
            } else if (yearValue === '2020s') {
                filtered = filtered.filter(anime => anime.year >= 2020);
            } else if (yearValue === '2010s') {
                filtered = filtered.filter(anime => anime.year >= 2010 && anime.year < 2020);
            } else if (yearValue === '2000s') {
                filtered = filtered.filter(anime => anime.year >= 2000 && anime.year < 2010);
            } else if (yearValue === '1990s') {
                filtered = filtered.filter(anime => anime.year >= 1990 && anime.year < 2000);
            }
        }
        
        this.filteredAnime = filtered;
        this.displayAnime(filtered);
        
        // Update title based on filters
        let title = 'All Anime';
        if (genreValue && yearValue) {
            title = `${genreValue} Anime from ${yearValue}`;
        } else if (genreValue) {
            title = `${genreValue} Anime`;
        } else if (yearValue) {
            title = `Anime from ${yearValue}`;
        }
        
        const resultsTitle = document.getElementById('resultsTitle');
        if (resultsTitle) {
            resultsTitle.textContent = title;
        }
    }

    // RATING SYSTEM

    openRatingModal(animeId) {
        const anime = this.animeDatabase.find(a => a.id === animeId);
        if (!anime) return;
        
        this.currentAnime = anime;
        
        // Populate modal
        const modal = document.getElementById('ratingModal');
        const modalTitle = document.getElementById('ratingModalTitle');
        const animeTitle = document.getElementById('ratingAnimeTitle');
        const animeGenres = document.getElementById('ratingAnimeGenres');
        const imageElement = document.getElementById('ratingAnimeImage');
        
        if (modal && modalTitle && animeTitle && animeGenres) {
            modalTitle.textContent = `Rate ${anime.title}`;
            animeTitle.textContent = anime.title;
            animeGenres.textContent = anime.genres.join(', ');
            
            if (imageElement) {
                if (anime.image_url) {
                    imageElement.src = anime.image_url;
                    imageElement.style.display = 'block';
                } else {
                    imageElement.style.display = 'none';
                }
            }
            
            // Set current rating if exists
            const currentRating = this.userRatings[animeId] || 0;
            this.setStarRating(currentRating);
            
            modal.classList.remove('hidden');
        }
    }

    setStarRating(rating) {
        const stars = document.querySelectorAll('#starRating .star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
        
        const feedback = document.getElementById('ratingValue');
        if (feedback) {
            if (rating === 0) {
                feedback.textContent = 'Rate this anime';
            } else {
                const labels = ['', 'Terrible', 'Bad', 'Poor', 'Below Average', 'Average', 
                               'Above Average', 'Good', 'Very Good', 'Excellent', 'Masterpiece'];
                feedback.textContent = `${rating}/10 - ${labels[rating]}`;
            }
        }
    }

    highlightStars(rating) {
        const stars = document.querySelectorAll('#starRating .star');
        stars.forEach((star, index) => {
            star.classList.toggle('active', index < rating);
        });
    }

    getCurrentRating() {
        return document.querySelectorAll('#starRating .star.active').length;
    }

    submitRating() {
        if (!this.currentAnime) return;
        
        const rating = this.getCurrentRating();
        if (rating === 0) {
            alert('Please select a rating before submitting.');
            return;
        }
        
        this.userRatings[this.currentAnime.id] = rating;
        this.saveUserPreferences();
        this.updateStats();
        
        // Refresh current view to show new rating
        const currentTitle = document.getElementById('resultsTitle');
        if (currentTitle && currentTitle.textContent.includes('Recommendations')) {
            this.generateRecommendations();
        } else {
            this.applyFilters();
        }
        
        this.closeRatingModal();
    }

    closeRatingModal() {
        const modal = document.getElementById('ratingModal');
        if (modal) {
            modal.classList.add('hidden');
        }
        this.currentAnime = null;
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.add('hidden');
        });
        this.currentAnime = null;
    }

    // WATCHLIST MANAGEMENT

    toggleWatchlist(animeId) {
        if (this.watchlist.has(animeId)) {
            this.watchlist.delete(animeId);
        } else {
            this.watchlist.add(animeId);
        }
        
        this.saveUserPreferences();
        this.updateStats();
        
        // Refresh display to update button text
        const currentTitle = document.getElementById('resultsTitle');
        if (currentTitle && currentTitle.textContent.includes('Recommendations')) {
            this.generateRecommendations();
        } else {
            this.applyFilters();
        }
    }

    // STATISTICS AND USER DATA

    updateStats() {
        const totalRatings = Object.keys(this.userRatings).length;
        const averageRating = totalRatings > 0 ? 
            Object.values(this.userRatings).reduce((a, b) => a + b, 0) / totalRatings : 0;
        
        const genreCounts = {};
        Object.keys(this.userRatings).forEach(id => {
            const anime = this.animeDatabase.find(a => a.id === parseInt(id));
            if (anime) {
                anime.genres.forEach(genre => {
                    genreCounts[genre] = (genreCounts[genre] || 0) + 1;
                });
            }
        });
        
        const favoriteGenre = Object.keys(genreCounts).length > 0 ?
            Object.keys(genreCounts).reduce((a, b) => genreCounts[a] > genreCounts[b] ? a : b) : '-';
        
        // Update stats display
        const totalRatingsEl = document.getElementById('totalRatings');
        const averageRatingEl = document.getElementById('averageRating');
        const favoriteGenreEl = document.getElementById('favoriteGenre');
        const watchlistCountEl = document.getElementById('watchlistCount');
        
        if (totalRatingsEl) totalRatingsEl.textContent = totalRatings;
        if (averageRatingEl) averageRatingEl.textContent = averageRating.toFixed(1);
        if (favoriteGenreEl) favoriteGenreEl.textContent = favoriteGenre;
        if (watchlistCountEl) watchlistCountEl.textContent = this.watchlist.size;
    }

    showStatsModal() {
        this.updateRecentRatings();
        const modal = document.getElementById('statsModal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    closeStatsModal() {
        const modal = document.getElementById('statsModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    updateRecentRatings() {
        const recentRatingsList = document.getElementById('recentRatingsList');
        if (!recentRatingsList) return;
        
        const ratings = Object.entries(this.userRatings)
            .map(([id, rating]) => ({
                anime: this.animeDatabase.find(a => a.id === parseInt(id)),
                rating
            }))
            .filter(item => item.anime)
            .slice(-5)
            .reverse();
        
        if (ratings.length === 0) {
            recentRatingsList.innerHTML = '<p>No ratings yet. Start rating some anime!</p>';
            return;
        }
        
        recentRatingsList.innerHTML = ratings.map(({ anime, rating }) => `
            <div class="recent-rating-item">
                <span class="recent-rating-title">${anime.title}</span>
                <span class="recent-rating-score">${rating}/10</span>
            </div>
        `).join('');
    }

    showHelpModal() {
        const modal = document.getElementById('helpModal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    closeHelpModal() {
        const modal = document.getElementById('helpModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    clearRatings() {
        if (confirm('Are you sure you want to clear all your ratings? This action cannot be undone.')) {
            this.userRatings = {};
            this.watchlist.clear();
            this.saveUserPreferences();
            this.updateStats();
            this.applyFilters();
        }
    }

    // DATA PERSISTENCE

    saveUserPreferences() {
        try {
            const data = {
                ratings: this.userRatings,
                watchlist: Array.from(this.watchlist),
                algorithm: this.currentAlgorithm
            };
            localStorage.setItem('animeRecUserData', JSON.stringify(data));
        } catch (error) {
            console.error('Error saving user preferences:', error);
        }
    }

    loadUserPreferences() {
        try {
            const saved = localStorage.getItem('animeRecUserData');
            if (saved) {
                const data = JSON.parse(saved);
                this.userRatings = data.ratings || {};
                this.watchlist = new Set(data.watchlist || []);
                this.currentAlgorithm = data.algorithm || 'content';
                
                const algorithmSelect = document.getElementById('algorithmSelect');
                if (algorithmSelect) {
                    algorithmSelect.value = this.currentAlgorithm;
                }
            }
        } catch (error) {
            console.error('Error loading user preferences:', error);
            this.userRatings = {};
            this.watchlist = new Set();
        }
    }
}

// GLOBAL FUNCTIONS FOR HTML EVENT HANDLERS

let animeRec;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    animeRec = new AnimeRecommendationSystem();
    // Make it globally accessible
    window.animeRec = animeRec;
});

// Global functions for HTML onclick handlers
function searchAnime() {
    if (window.animeRec) {
        window.animeRec.searchAnime();
    }
}

function generateRecommendations() {
    if (window.animeRec) {
        window.animeRec.generateRecommendations();
    }
}

function applyFilters() {
    if (window.animeRec) {
        window.animeRec.applyFilters();
    }
}

function openRatingModal(animeId) {
    if (window.animeRec) {
        window.animeRec.openRatingModal(animeId);
    }
}

function closeRatingModal() {
    if (window.animeRec) {
        window.animeRec.closeRatingModal();
    }
}

function submitRating() {
    if (window.animeRec) {
        window.animeRec.submitRating();
    }
}

function toggleWatchlist(animeId) {
    if (window.animeRec) {
        window.animeRec.toggleWatchlist(animeId);
    }
}

function showStatsModal() {
    if (window.animeRec) {
        window.animeRec.showStatsModal();
    }
}

function closeStatsModal() {
    if (window.animeRec) {
        window.animeRec.closeStatsModal();
    }
}

function showHelpModal() {
    if (window.animeRec) {
        window.animeRec.showHelpModal();
    }
}

function closeHelpModal() {
    if (window.animeRec) {
        window.animeRec.closeHelpModal();
    }
}

function clearRatings() {
    if (window.animeRec) {
        window.animeRec.clearRatings();
    }
}