<template>
  <div class="sensor" v-if="auth">
      <div class="tiles__element">
        <div class="tiles__container">
          <div class="tiles__content">
            <p class="sensor__measure" v-for="item in sensorMock">
              {{item}}
            </p>
          </div>
        </div>
        <router-link to="/">
          <button class="info__button" >Powrót</button>
        </router-link>
      </div>
  </div>
</template>

<script src="./../js/Sensor.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./../css/Sensor.css">
</style>
