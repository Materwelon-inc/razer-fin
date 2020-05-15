<template>
  <div>
    <!-- start of contents -->
    <div class="container is-fluid" id="firstcontainer">
      <!--- start of credit score -->
            <div class="box">
        <section>
          <div class="title is-4">Your credit score is </div>
          <div class ="title is-3"> 3 </div>
        </section>
      </div>
      <!-- start of slider -->
      <div class="box">
        <section>
          <div class="title is-4">Indicate your risk appetite</div>
          <b-slider type="is-success" v-model= "initialState" :custom-formatter="val=>val+'%'"
            size="is-medium" :min="0" rounded :max="6" step="0.01" >
            <template v-for="val in [0, 6]">
              <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
            </template>
          </b-slider>
        </section>
      </div>
      <!-- end of slider -->
      <!-- start of bank loans -->
      <template>
    <b-carousel class="is-success">
        <b-carousel-item v-for="x in example" :key="x">
                <div class="hero-body has-text-centered">
              <div class="title is-3" id="custtitle">{{ x.bankName }}</div>
              <div class="subtitle is-5">{{ x.bankLoan }}</div>
              <div class="subtitle is-6">Amount: ${{ x.amountMin }} to ${{ x.amountMax }}</div>
              <div class="subtitle is-6">Max repayment duration: {{ x.maxPeriod }} year(s)</div>
              <div class="subtitle is-6">Interest rate: {{ x.interest }}%</div>
                </div>
        </b-carousel-item>
    </b-carousel>
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
  margin-top: 3%;
}
.custmargin div {
  margin-bottom: 0px;
  margin-top: 0px;
}
.custmargin #custtitle {
  margin-bottom: 25px;
}
.custmargin hr {
  border-top: 1px solid black;
}
</style>
