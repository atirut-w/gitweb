import DirFs from "./DirFs.ts";

export default class Repository {
  fs: DirFs

  constructor(handle: FileSystemDirectoryHandle) {
    this.fs = new DirFs(handle)
  }
}
