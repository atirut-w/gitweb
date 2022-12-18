<script lang="ts">
import git from "isomorphic-git";
import DirFs from "./DirFs.ts";

export default {
  data() {
    return {};
  },
  methods: {
    async openRepo() {
      try {
        var dir = await window.showDirectoryPicker({ mode: "readwrite" });
        var fs = new DirFs(dir);
        console.log(
          await git.currentBranch({
            fs,
            dir: "",
          })
        );
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<template>
  <button @click="openRepo">Open a repository</button>
</template>
