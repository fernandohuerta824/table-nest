import app from "./app";
import { AppDataSource } from "./models/dataSource";


const PORT = process.env.PORT || 8080;

AppDataSource.initialize()
  .then(() => app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  }))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
