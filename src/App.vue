<script lang='ts'>
export default {
    data() {
        return {
        }
    },
    methods: {
        async openRepo() {
            try {
                var dir = await window.showDirectoryPicker({mode: "readwrite"});
                console.log(dir);
            } catch (e) {
                console.log(e);
            }
        }
    }
}
</script>

<template>
    <button @click="openRepo">Open a repository</button>
</template>
