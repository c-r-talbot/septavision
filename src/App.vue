<template>
  <!-- <canvas id = "foo" width="1600" height="900" > </canvas>  -->

  <h2>Route 42</h2>
  <!-- <Routes :route-number="42"/> -->
  
  <!-- <h2>All Stops</h2> -->
  <!-- <Stops></Stops> -->
  <p>{{ this.busLocData }}</p>
  <!-- <p>{{ this.allStops }}</p> -->
  <ul v-for="route in this.routesViewed">
    <h1>{{ route }}</h1>
    <ul v-for="bus in this.allStops[route]">
      <li>{{bus}}</li>
    </ul>
  </ul>
  
</template>


<script>
// import AllPosts from './components/AllPosts.vue'
// import Incrementer from './components/Incrementer.vue'
import axios from 'axios'
import { ref, unref, onMounted, onBeforeMount } from 'vue'
import Routes from './components/Routes.vue'
import Stops from './components/Stops.vue'


export default {
  data() {
    return {
      busLocData: {},
      lastUpdatedHours: [],
      lastUpdatedMinutes: [],
      lastUpdatedSeconds: [],
      routesViewed: [],
      allStops: {},
      pollInterval: [],
      lngMin: -75.3,
      lngMax: -75.1,
      latMin: 39.9408,
      latMax: 40.09,
      windowXMin: 100,
      windowXMax: 1000,
      windowYMin: 0,
      windowYMax: 300,
    }
  },
  methods: {
    setLastUpdated(){
      const d = new Date();
        if (d.getHours() % 12 == 0) { this.lastUpdatedHours = 12 }
        else { this.lastUpdatedHours = d.getHours() % 12 }
          this.lastUpdatedMinutes = d.getMinutes();
          this.lastUpdatedSeconds = d.getSeconds();
    },

    resolveRoutesViewed(){
    //grab whatever r
    },
    
    async getStops() { 
    for (var i = 0; i < this.routesViewed.length; i++) {
        await axios.get(
            'api/Stops/index.php', 
            {
                headers: {'accept': 'application/json',"Access-Control-Allow-Origin": "*"},
                params: { "req1": this.routesViewed[i] }
            }).then(result => this.allStops[this.routesViewed[i]] = result.data)
            .catch(error => console.log(error))       
        }
    },
    getSourceRangeMin: function(stops) {
            let busStopLats = [];
            let busStopLngs = [];
            let minLat;
            let minLng;
            stops.forEach(element => 
            {
                busStopLats.push(element.lat)
                busStopLngs.push(element.lng)
            }
            )
            this.latMin = Math.min(...busStopLats)
            this.latMax = Math.max(...busStopLats)
            this.lngMin = Math.min(...busStopLngs)
            this.lngMax = Math.max(...busStopLngs)
            console.log(this.lngMax)
      },

      scaleLng: function(value, sourceRangeMin, sourceRangeMax, targetRangeMin, targetRangeMax) {
              var targetRange = targetRangeMax - targetRangeMin;
              var sourceRange = sourceRangeMax - sourceRangeMin;
              // console.log((value - sourceRangeMin) * targetRange / sourceRange + targetRangeMin)
              return (value - sourceRangeMin) * targetRange / sourceRange + targetRangeMin;
      },

      scaleLat: function(value, sourceRangeMin, sourceRangeMax, targetRangeMin, targetRangeMax) {
              var targetRange = targetRangeMax - targetRangeMin;
              var sourceRange = sourceRangeMax - sourceRangeMin;
              return (value - sourceRangeMin) * targetRange / sourceRange + targetRangeMin;
      },

      async getBusLocData() {
      for (var i = 0; i < this.routesViewed.length; i++) {
        await axios.get(
            'api/TransitView/index.php', 
            {
                headers: {'accept': 'application/json',"Access-Control-Allow-Origin": "*"},
                params: { "route": this.routesViewed[i] }
            }).then(result => {
              this.busLocData[this.routesViewed[i]] = result.data
            }
              )
            .catch(error => console.log(error))
        }
      },
  },

  watch: {
    routesViewed: 'resolveRoutesViewed'
  },

  mounted(){
    this.routesViewed = [42,19]
    this.getStops()
    // .then(
    //   this.getSourceRangeMin(this.allStops)
    // )
    // .then(() => {
    //   this.allStops.forEach(
    //     element =>
    //     {
    //       element.yPos = this.scaleLng(element.lng,this.lngMin,this.lngMax,this.windowYMin,this.windowYMax)
    //       element.xPos = this.scaleLng(element.lat,this.latMin,this.latMax,this.windowXMin,this.windowXMax)
    //     }
    //   )
    // })
    this.getBusLocData()
    // this.pollInterval = setInterval(this.getBusLocData,2000);
    // setTimeout(() => { clearInterval(this.pollInterval) }, 36000000)
  }
  }

</script>


<style scoped>

</style>
