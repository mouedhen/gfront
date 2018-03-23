<template>
  <aside id="aside" class="l-aside aside">
    <nav id="asideNavigation" class="l-navigation navigation">
      <nuxt-link :to="{ name: 'lang', params: { lang: locale }}" @click.native="hideMenu">
        <div class="title-container">
          <div class="nav-icons">
            <svg class="icon icon-camera" style="width: 90px">
              <use href="/images/svg/sprite.svg#logotype"></use>
            </svg>
          </div>
        </div>
      </nuxt-link>
    </nav>
    <p class="aside__description" style="margin-top: 1rem">{{ $t('navigation.home.description') }}<br>{{
      $t('navigation.home.description_2') }}</p>
    <div id="accordion" class="aside__accordion">
      <accordion-element v-for="navElement in navBarElements"
                         :key="navElement.id"
                         :navElement="navElement"/>
    </div>
  </aside>
</template>

<script>
  import AccordionElement from './AccordionElement.vue'

  const removeClass = (el, className) => {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' ');
    }
  };

  export default {
    components: {AccordionElement},
    data() {
      return {
        show: true
      }
    },
    methods: {
      hideMenu() {
        document.getElementById('aside').style.display = 'none';
      }
    },
    computed: {
      locale: function () {
        return this.$i18n.locale
      },
      navBarElements: function () {
        return [
          {
            id: 1,
            icon: '/images/svg/symbol-defs.svg#icon-camera',
            label: this.$t('navigation.complains.title'),
            description: this.$t('navigation.complains.description'),
            routeName: 'lang-complains'
          },
          {
            id: 2,
            icon: '/images/svg/symbol-defs.svg#icon-pen',
            label: this.$t('navigation.petitions.title'),
            description: this.$t('navigation.petitions.description'),
            routeName: 'lang-petitions'
          },
          {
            id: 3,
            icon: '/images/svg/symbol-defs.svg#icon-calendar',
            label: this.$t('navigation.events.title'),
            description: this.$t('navigation.events.description'),
            routeName: 'lang-events'
          },
          {
            id: 4,
            icon: '/images/svg/symbol-defs.svg#icon-library',
            label: this.$t('navigation.municipalities.title'),
            description: this.$t('navigation.municipalities.description'),
            routeName: 'lang-municipalities'
          },
          {
            id: 5,
            icon: '/images/svg/symbol-defs.svg#icon-files-empty',
            label: this.$t('navigation.reports.title'),
            description: this.$t('navigation.reports.description'),
            routeName: 'lang-reports'
          },
          {
            id: 6,
            icon: '/images/svg/symbol-defs.svg#icon-bullhorn',
            label: this.$t('navigation.press.title'),
            description: this.$t('navigation.press.description'),
            routeName: 'lang-press'
          },
        ]
      },
    },
  }
</script>

<style lang="scss" scoped>
  .app[dir='rtl'] {
    .aside {
      left: unset;
      right: 0;
    }
  }
</style>
