
<script>
import axios from 'axios'
export default {
    props: {
        routeNumber: Number
        // : Number,
        // : Number,
        // : Number,
        // : Number,
        // : Number,
        // : Number,
    },
    data() {
    return {
        allStops: [],
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
         getAllStops: async function() {
            try {
                const response = await axios.get(
                    'api/Stops/index.php', 
                    {
                        headers: {'accept': 'application/json',"Access-Control-Allow-Origin": "*"},
                        params: { "req1": this.routeNumber }
                    })
                // console.log(response.data)
                this.allStops = response.data
                // console.log('done my dinner')
                // console.log(response.data)
            } catch (e)  {
                console.log(e)
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
    },
    created() {

    },
    mounted(){
        this.getAllStops()
        .then(() => {
            this.getSourceRangeMin(this.allStops)
        }
        )
        .then(() => { 
            this.allStops.forEach(
                element => 
                { 
                  element.yPos = this.scaleLng(element.lng,this.lngMin,this.lngMax,this.windowYMin,this.windowYMax)
                  element.xPos = this.scaleLng(element.lat,this.latMin,this.latMax,this.windowXMin,this.windowXMax)
                })
            })
        .then(() => {
        const canvas = document.getElementById("allStops");
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "green";
        this.allStops.forEach(element => {
            ctx.fillRect(element.xPos,element.yPos,3,3)
        })
    })
    }
}
</script>
<template>
    <canvas id="allStops" :width="this.windowXMax" :height="this.windowYMax">

    </canvas>
    <div>
        <!-- {{ vehicleData }} -->
        <!-- <li v-for="stop in allStops"> -->
            <!-- {{ stop.lng}} -->
            <!-- {{ stop }} -->
        <!-- </li> -->
    </div>

</template>

<style>
</style>