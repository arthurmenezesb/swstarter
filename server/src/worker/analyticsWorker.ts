import db from '../services/dbService';

interface Log {
  url: string;
  duration: number;
  timestamp: string;
}

const processLogs = () => {
  db.all(
    'SELECT url, duration, timestamp FROM request_logs',
    (err, rows: Log[]) => {
      if (err) {
        console.error('Error reading logs', err);
        return;
      }
      // Top five queries with percentages
      const queryCounts = rows.reduce(
        (acc, row) => {
          acc[row.url] = (acc[row.url] || 0) + 1;

          return acc;
        },
        {} as Record<string, number>
      );
      const topFiveQueries = Object.entries(queryCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([query, count]) => ({
          query,
          percentage: (count / rows.length) * 100,
        }));

      // Average length of request timing
      const totalDuration = rows.reduce((acc, row) => acc + row.duration, 0);
      const averageRequestTime = totalDuration / rows.length;

      // Most popular hour of day for overall search volume
      const hourCounts = rows.reduce(
        (acc, row) => {
          const hour = new Date(row.timestamp).getHours();
          acc[hour] = (acc[hour] || 0) + 1;
          return acc;
        },
        {} as Record<number, number>
      );
      const mostPopularHour = Object.entries(hourCounts).sort(
        ([, a], [, b]) => b - a
      )[0][0];

      db.run(
        'INSERT INTO analytics (top_five_queries, average_request_time, most_popular_hour) VALUES (?, ?, ?)',
        [JSON.stringify(topFiveQueries), averageRequestTime, mostPopularHour],
        (err) => {
          if (err) {
            console.error('Error inserting analytics', err);
          }
        }
      );
    }
  );
};

export default processLogs;
