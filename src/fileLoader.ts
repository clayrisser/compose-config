import fs from 'fs-extra';
import yaml from 'yaml';

export default class FileLoader<Config = any, Context = any> {
  constructor(public filePath: string, public context?: Context) {}

  get fileType(): string {
    if (/.+\.((ya?ml)|json)$/.test(this.filePath)) return 'yaml';
    if (/.+\.jsx?$/.test(this.filePath)) return 'js';
    return 'unknown';
  }

  async load(): Promise<Config> {
    let result: Config;
    if (this.fileType === 'yaml') {
      result = await this.loadYaml();
    } else if (this.fileType === 'js') {
      result = await this.loadJs();
    } else {
      try {
        result = await this.loadYaml();
      } catch (err) {
        result = await this.loadJs();
      }
    }
    return result;
  }

  // TODO: rewrite using file streams
  async loadYaml(): Promise<Config> {
    const file = (await fs.readFile(this.filePath)).toString();
    return yaml.parse(file);
  }

  async loadJs(): Promise<Config> {
    let required = require(this.filePath);
    if (required?.__esModule && typeof required?.default !== 'undefined') {
      required = required?.default;
    }
    if (typeof required === 'function') {
      return required(this.context);
    }
    return required;
  }
}
