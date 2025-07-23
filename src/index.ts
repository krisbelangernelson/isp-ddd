import { AppDataSource } from './infrastructure/database/typeorm/data-source';
import './shared/module-alias';
import app from './app';

AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch(console.error);
