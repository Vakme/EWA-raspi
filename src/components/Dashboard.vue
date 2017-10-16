<template>
  <div class="dashboard">
      <div class="tiles__element" v-for="item in sensors">
        <div class="tiles__container">
          <div class="dashboard__sensorName"><router-link :to="'sensor/' + item.sensor">Sensor {{item.sensor}}</router-link></div>
          <div class="dashboard__measures">
            <div class="dashboard__measureValues" v-for="measure in item.measures">
              <div class="dashboard__value"> <!-- v-bind:class = "['dashboard__value', classChanger(item.temperature, item.crit_temperature) ]" TODO: crit value -->{{measure.value.toFixed(2)}}</div>
            </div>
            <div class="dashboard__measureNames" v-for="measure in item.measures">
              <div class="dashboard__valueName">{{measure.measure_id}}</div>
            </div>
          </div>
          <div class="dashboard__timestamp">
            <div class="dashboard__date">{{item.timestamp}}</div>
            <div class="dashboard__time">{{item.timestamp}}</div></div>
        </div>
      </div>
  </div>
</template>

<script src="./../js/Dashboard.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./../css/Dashboard.css">
</style>
