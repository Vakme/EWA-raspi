<template>
  <div class="main-sidebar" v-if="auth">
      <div class="tiles__element">
        <div class="tiles__container">
          <div class="tiles__content">
            <div class="main-sidebar__userinfo">
              <div class="main-sidebar__header">
                Profil
              </div>
              Lorem ipsum
            </div>
            <div class="main-sidebar__header">
              Komunikaty
            </div>
            <div class="main-sidebar__data">
              <div class="main-sidebar__notif">
                <p class="main-sidebar__notif__elem" v-for="item in sensorMock">
              <b>Timestamp: {{item.timestamp}}</b> <br>
                  <ul>
                    <li  v-for="measure in item.measures"><b>{{measure.name}}:</b> {{measure.value}}</li>
                  </ul>
                </p>
                <p class="main-sidebar__notif__elem">
                  New sensor was added: <br>
                  ID: 4
                </p>
              </div>

              </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script src="./../js/Sidebar.js">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./../css/Sidebar.css">
</style>
