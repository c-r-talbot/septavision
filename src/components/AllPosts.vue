<!--
This example fetches latest Vue.js commits data from GitHub’s API and displays them as a list.
You can switch between the two branches.
-->

<script>
import axios from 'axios'

export default {
  data() {
    return {
        posts: []
    }
    },

  async created() {
    
        try {
            const response = await axios.get('http://44.208.162.57.nip.io/wp-json/wp/v2/posts')
            this.posts = response.data 
            console.log(response.data)
        } catch (e)  {
            console.log(e)
        }
  },
}
</script>

<template>
<div>
        <div v-for="post in posts">
            <h1 v-html="post.title.rendered"></h1>
            <p v-html="post.content.rendered"></p>
        </div>
    <!-- {{ this.posts }} -->
</div>
</template>

<style>
</style>