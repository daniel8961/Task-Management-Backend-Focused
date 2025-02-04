import app from './app.js';  // Import Express app
import dotenv from './db_config/dotenv.js';

const PORT = dotenv.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
