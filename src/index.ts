import FileLoader from './fileLoader';

export default class ComposeConfig<Config = any, Context = any> {
  constructor(public filePath: string, public context?: Context) {}

  config: Config;

  async load() {
    const fileLoader = new FileLoader<Config, Context>(
      this.filePath,
      this.context
    );
    this.config = await fileLoader.load();
  }
}
