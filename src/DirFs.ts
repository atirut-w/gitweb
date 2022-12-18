export default class DirFs {
  constructor(dirh: FileSystemDirectoryHandle) {
    this.promises.handle = dirh;
  }

  promises = {
    async resolve(path: String): FileSystemFileHandle {
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
              current = await current.getDirectoryHandle(key);

              continue;
            }
          }
        }
      }

      throw new Error(`Could not resolve file handler for "${path}"`);
    },

    async getFile(path: String): File {
      return (await this.resolve(path)).getFile();
    },

    async readFile(path: String, options) {
      try {
        var file = await this.getFile(path);
        return await file.text();
      } catch (e) {
        console.error(e.message);
      }
    },

    async writeFile(file: String, data) {},

    async unlink(path: String) {},

    async readdir(path: String) {},

    async mkdir(path: String) {},

    async rmdir(path: String) {},

    async stat(path: String) {},

    async lstat(path: String) {},

    async readlink(path: String) {},

    async symlink(target: String, path: String) {},

    async chmod(path: String) {},
  };
}
