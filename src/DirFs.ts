export default class DirFs {
    handle: FileSystemDirectoryHandle;

    constructor(dirh: FileSystemDirectoryHandle) {
        this.handle = dirh;
    }

    async resolve(path: String) {
        var parts = path.split('/')
        var current = this.handle

        for (const part of parts) {
            if (part == parts[parts.length - 1]) {
                for await (const [key, value] of current.entries()) {
                    if (key == part) {
                        console.log("Resolved " + path)
                        return await current.getFileHandle(key)
                    }
                }
            } else {
                for await (const [key, value] of current.entries()) {
                    if (key == part) {
                        current = await current.getDirectoryHandle(key)

                        continue;
                    }
                }
            }
        }

        console.error("Could not resolve " + path)
    }

    ret(opt, cb, val) {
        if (cb == null) {
            opt(val)
        } else {
            cb(val)
        }
    }

    readFile(path: String, options, callback) {
        this.resolve(path).then((handle) => {
            if (handle != null) {
                console.log(handle)
            }
            this.ret(options, callback)
        })
    }

    writeFile(file: String, data) {

    }

    unlink(path: String) {

    }

    readdir(path: String) {

    }

    mkdir(path: String) {

    }

    rmdir(path: String) {

    }

    stat(path: String) {

    }

    lstat(path: String) {

    }

    readlink(path: String) {

    }

    symlink(target: String, path: String) {

    }

    chmod(path: String) {

    }
}
