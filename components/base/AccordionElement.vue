<template>
  <div class="accordion" v-bind="navElement" v-bind:class="{ 'accordion--active': isActive }" style="padding: 1rem">
    <nuxt-link :to="{ name: navElement.routeName, params: { lang: locale }}">
      <button class="button accordion__trigger"
              type="button">
                    <span class="button__symbol--square">
                        <svg class="icon icon-camera">
                            <use :href="navElement.icon"></use>
                        </svg>
                    </span>
        <span class="button__label" style="text-transform: uppercase">{{navElement.label}}</span>
      </button>
    </nuxt-link>
    <div class="accordion__panel">
      <p>{{navElement.description}}</p>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    props: ['navElement'],
    computed: {
      isActive: function () {
        return this.$route.name === this.navElement.routeName
      },
      ...mapGetters({
        locale: 'getLocale',
      }),
    },
  }
</script>

