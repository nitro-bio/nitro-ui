declare module "@biowasm/aioli" {
  export default class Aioli {
    constructor(packages: string[]);
    init(): Promise<{
      exec: (cmd: string, args: string[]) => Promise<string>;
      mountFiles: (files: File[]) => Promise<void>;
    }>;
  }
}
declare module "*.sam" {
  export = content as string;
}
