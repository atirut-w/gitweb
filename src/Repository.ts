import DirFs from "./DirFs.ts";

export default class Repository {
  fs: DirFs;

  constructor(handle: FileSystemDirectoryHandle) {
    this.fs = new DirFs(handle);
  }

  async currentBranch() {
    var headf = await (await this.fs.resolve(".git/HEAD")).getFile();

    return headf.text();
  }
}
