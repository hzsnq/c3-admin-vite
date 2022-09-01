<script lang="ts" setup>
import { computed } from "vue"
import { useRoute } from "vue-router"

const routes = useRoute()
const key = computed(() => {
  console.log(routes.name)
  return routes.path
})

//v-slot="{ Component, route }"
</script>

<template>
  <section class="app-main">
    <router-view>
      <template #default="{ Component, route }">
        <transition name="fade-transform" mode="out-in" appear>
          <keep-alive>
            <component :is="Component" :key="key" v-if="route.meta.keepAlive" />
          </keep-alive>
        </transition>
        <component :is="Component" :key="route.fullPath" v-if="!route.meta.keepAlive" />
      </template>
    </router-view>
  </section>
</template>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - var(--v3-navigationbar-height));
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: var(--v3-navigationbar-height);
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    min-height: calc(100vh - var(--v3-header-height));
  }
  .fixed-header + .app-main {
    padding-top: var(--v3-header-height);
  }
}
</style>
