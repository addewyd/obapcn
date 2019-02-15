<template>
<div>{{cb}}<br />
   <ul class="nav nav-tabs">
      <li role="presentation" @click="currentTab = 'home'"><a href="#">Главная</a></li>
      <li role="presentation" @click="currentTab = 'profile'"><a href="#">Профиль</a></li>
      <li role="presentation" @click="currentTab = 'messages'"><a href="#">Сообщения</a></li>
   </ul>

  <div class="tab-content">
    <div v-if="currentTab == 'home'">
        <h1>Главная</h1>
    </div>
    <div v-if="currentTab == 'profile'">Профиль</div>
    <div v-if="currentTab == 'messages'">Сообщения</div>
  </div>
</div>
</template>
<script>
module.exports = {
    data: function() {
        return {
            cb: 'test-a',
            currentTab: 'profile'
        }
    }
}
</script>
