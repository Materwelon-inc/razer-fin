<template>
  <div>
    <!-- start of contents -->
    <div class="container is-fluid">
      <div class="box">
        <section>
          <b-field label="Select preferred risk" >
            <b-slider type="is-success" v-model= "initialState" :custom-formatter="val=>val+'%'"
              size="is-medium" :min="0" rounded :max="6" step="0.01" >
            </b-slider>
          </b-field>
        </section>
      </div>
      <!-- end of slider -->
      <div class="box">
        <div class="tile is-ancestor">
        </div> 
      </div>
    </div>
    <!-- end of contents -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      initialState: [2, 4],
    };
  },
};
</script>
