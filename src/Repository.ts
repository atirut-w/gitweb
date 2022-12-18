import DirFs from "./DirFs.ts";

export default class Repository {
  fs: DirFs;

  constructor(handle: FileSystemDirectoryHandle) {
    this.fs = new DirFs(handle);
  }

  async resolveRef(path: String): String {
    var file = await this.fs.getFile(".git/" + path);
    var ref = (await file.text()).replace(/^\W+|\W+$/g, "");
    
    if (ref.startsWith("ref: ")) {
      return await this.resolveRef(ref.substring(5))
    } else {
      return ref
    }
  }

  async currentBranch() {
    var headf = await (await this.fs.resolve(".git/HEAD")).getFile();

    return headf.text();
  }
}
