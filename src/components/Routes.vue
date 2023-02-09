
<script>
import axios from 'axios'
export default {
    props: {
        routeNumber: Number
    },
    data() {
    return {
        vehicleData: [],
        lastUpdatedHours: [],
        lastUpdatedMinutes: [],
        lastUpdatedSeconds: [],
        }
    },

    methods: {
         getRoutes: async function() {
            try {
                const response = await axios.get(
                    'api/TransitView/index.php', 
                    {
                        headers: {'accept': 'application/json',"Access-Control-Allow-Origin": "*"},
                        params: { "route": this.routeNumber }
                    })
                // console.log(response.data)
                this.vehicleData = response.data
                const d = new Date();
                if (d.getHours() % 12 == 0) { this.lastUpdatedHours = 12 }
                    else { this.lastUpdatedHours = d.getHours() % 12 }
                this.lastUpdatedMinutes = d.getMinutes();
                this.lastUpdatedSeconds = d.getSeconds();
                // console.log(this.lastUpdated)
            } catch (e)  {
                console.log(e)
            }
        }
    },
    mounted() {
        this.getRoutes()
        this.pollInterval = setInterval(this.getRoutes,6000);
        setTimeout(() => { clearInterval(this.pollInterval) }, 36000000)
    }
}
</script>
<template>
    <h2>remember, latitude = Y axis, longitude = X axis</h2>
    <h3>Last Updated: {{ lastUpdatedHours }}:{{ lastUpdatedMinutes }}:{{ lastUpdatedSeconds }}</h3>
    <p>
        <div v-for="vehicle in vehicleData.bus">
            <ul>
            <h4>Bus ID {{ vehicle.VehicleID }}</h4>
            <li>{{ vehicle.lat }}, {{ vehicle.lng }}, {{ vehicle.next_stop_name }}</li>
            <li>{{ vehicle }}</li>
            </ul>
        </div>
    </p>

</template>

<style>
</style>