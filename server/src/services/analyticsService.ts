import db from './dbService';

interface Analytics {
  top_five_queries: string;
  average_request_time: number;
  most_popular_hour: number;
}

export const getLatestAnalytics = () => {
  return new Promise((resolve, reject) => {
    db.get('SELECT top_five_queries, average_request_time, most_popular_hour FROM analytics ORDER BY created_at DESC LIMIT 1', (err, row: Analytics) => {
      if (err) {
        reject(err);
      } else if (row) {
        resolve({
          ...row,
          top_five_queries: JSON.parse(row.top_five_queries || '[]'),
        });
      } else {
        resolve({});
      }
    });
  });
};
export const insertRequestLog = (method: string, url: string, duration: number) => {
  db.run(
    'INSERT INTO request_logs (method, url, duration) VALUES (?, ?, ?)',
    [method, url, duration],
    (err) => {
      if (err) {
        console.error('Error inserting log', err);
      }
    }
  );
};