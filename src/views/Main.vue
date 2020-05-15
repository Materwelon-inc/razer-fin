<template>
  <div>
    <!-- start of contents -->
    <div class="container is-fluid" id="firstcontainer">
      <!--- start of credit score -->
            <div class="box">
        <section>
          <div class="title is-4">Your credit score is </div>
          <div class="title is-3"> 3 </div>
        </section>
      </div>
      <!-- start of slider -->
      <div class="box">
        <section>
          <div class="title is-4">Indicate your risk appetite</div>
          <b-slider type="is-success" v-model= "initialState" :custom-formatter="val=>val+'%'"
            size="is-large" :min="0" rounded :max="6" step="0.01" >
            <template v-for="val in [0, 6]">
              <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
            </template>
          </b-slider>
        </section>
      </div>
      <!-- end of slider -->
      <!-- start of bank loans -->
      <template>
        <div class="box">
          <b-carousel id="caroustyle" :autoplay="false">
            <b-carousel-item v-for="x in example" :key="x">
              <div class="hero-body has-text-centered" id="carouitem">
                <div class="title is-2" id="customtitle">{{ x.bankName }}</div>
                <div class="subtitle is-4">{{ x.bankLoan }}</div>
                <div class="subtitle is-6">Amount: ${{ x.amountMin }} to ${{ x.amountMax }}</div>
                <div class="subtitle is-6">Max repayment duration: {{ x.maxPeriod }} year(s)</div>
                <div class="subtitle is-6">Interest rate: {{ x.interest }}%</div>
              </div>
            </b-carousel-item>
          </b-carousel>
        </div>
      </template>
      <!-- end of bank loans -->
    </div>
    <!-- end of contents -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      carousels: [
        { text: 'Slide 1', color: 'primary' },
      ],
      initialState: [2, 4],
      example: [
        {
          bankName: 'POXB', bankLoan: 'Housing Loan', amountMin: '50000', amountMax: '300000', maxPeriod: '30', interest: '3.5',
        },
        {
          bankName: 'DBX', bankLoan: 'Education Loan', amountMin: '5000', amountMax: '40000', maxPeriod: '15', interest: '4.1',
        },
      ],
    };
  },
};
</script>

<style scoped>
#firstcontainer {
  margin-bottom: 5%;
  margin-left: 10%;
  margin-right: 10%;
}
.box {
  box-shadow: 5px 5px #a8a8a8;
  border: 1px solid rgb(172, 172, 172);
}
#firstcontainer {
  margin-top: 3%;
}
#caroustyle {
  margin-top: 1px;
}
#carouitem div {
  margin-bottom: 0px;
  margin-top: 0px;
}

</style>
