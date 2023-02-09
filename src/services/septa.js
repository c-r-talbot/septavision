
import { ref, unref } from 'vue'
import axios from 'axios'


export function getStops(routeNums) { 
    let stops = {}
    for (var i=0; i< routeNums.length; i++) {
        stops.push(axios.get(
            'api/Stops/index.php', 
            {
                headers: {'accept': 'application/json',"Access-Control-Allow-Origin": "*"},
                params: { "req1": routeNums[i] }
            }))       
        }
    }
export function getBusses(routeNum) {
    return axios.get(
        'api/TransitView/index.php', 
        {
            headers: {'accept': 'application/json',"Access-Control-Allow-Origin": "*"},
            params: { "route": routeNum }
        })
}

export function printStuff(stuff) {
    return stuff+" hello"
}