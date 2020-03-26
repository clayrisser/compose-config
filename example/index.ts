import path from 'path';
import ComposeConfig from '../src';

(async () => {
  const composeConfig = new ComposeConfig(
    path.resolve(__dirname, './config/conf.unknown')
  );
  await composeConfig.load();
  console.log(composeConfig.config);
})();
