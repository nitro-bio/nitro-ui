declare module "@biowasm/aioli" {
  export default class Aioli {
    constructor(packages: string[]);
    init(): Promise<Aioli>;
    exec(cmd: string, args?: string[]): Promise<string[]>;
    mount(files: File[]): Promise<string[]>;
  }
}
declare module "*.sam" {
  export = content as string;
}
