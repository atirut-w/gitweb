export default class DirFs {
  handle: FileSystemDirectoryHandle;

  constructor(handle: FileSystemDirectoryHandle) {
    this.handle = handle;
  }

  async resolve(path: String) {
    var parts = path.split("/");
    var current = this.handle;

    for (const part of parts) {
      if (part == parts[parts.length - 1]) {
        for await (const [key, value] of current.entries()) {
          if (key == part) {
            console.debug(`Resolved file handle for "${path}"`);
            return await current.getFileHandle(key);
          }
        }
      } else {
        for await (const [key, value] of current.entries()) {
          if (key == part) {
            console.debug("Entering " + key);
            current = await current.getDirectoryHandle(key);
            continue;
          }
        }
      }
    }

    throw new Error(`Could not resolve "${path}"`);
  }
}
