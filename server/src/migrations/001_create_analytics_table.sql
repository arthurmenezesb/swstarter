CREATE TABLE IF NOT EXISTS analytics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    top_five_queries TEXT,
    average_request_time REAL,
    most_popular_hour INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);