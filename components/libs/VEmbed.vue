<template>
  <div :id="id">
    <slot></slot>
  </div>
</template>
<script>
  // import EmbedJS from 'embed-js';

  export default {
    props: {
      id: {
        type: String,
        default: 'embed__container',
      },
      options: {
        type: Object,
        default: () => ({}),
      },
    },

    data() {
      return {
        vEmbed: {},
      };
    },

    mounted() {
      if (process.browser) {
        let EmbedJS = require('embed-js');

        EmbedJS.setOptions(this.options);

        this.vEmbed = new EmbedJS({
          input: document.querySelector(`#${this.id}`),
        });

        this.vEmbed.render();
      }
    },

    beforeDestroy() {

      if (process.browser) {
        this.vEmbed.destroy();
      }
    },
  };
</script>
