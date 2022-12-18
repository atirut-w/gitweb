<script lang="ts">
import git from "isomorphic-git";
import DirFs from "./DirFs.ts";
import Repository from "./Repository.ts";

export default {
  data() {
    return {};
  },
  methods: {
    async openRepo() {
      var dir = await window.showDirectoryPicker({ mode: "readwrite" });
      var repo = new Repository(dir);
      console.log(await repo.fs.resolve("README.md"));
    },
  },
};
</script>

<template>
  <button @click="openRepo">Open a repository</button>
</template>
