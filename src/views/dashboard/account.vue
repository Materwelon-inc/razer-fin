<template>
  <div class="container" id="maincontainer">
    <div class="box">
      <!-- tiles -->
      <div class="tile is-ancestor">

        <div class="tile is-vertical is-parent">

          <article class="tile is-child notification is-success">
            <p class="title is-4">Available assets:</p>
            <div class="content">
              <!-- Content -->
              <p class="title is-1">${{ amountLeft }}</p>
            </div>
          </article>

          <article class="tile is-child notification is-dark">
            <p class="title is-4">Reminders:</p>
            <div class="content">
              <!-- Content -->
              <p class="subtitle is-6">
                Your next payment is
                <b class="title is-5">${{ paymentAmt }}</b>
                 at
                <b class="title is-5">{{ nextDate }}</b>
              </p>
              <p class="subtitle is-6">Keep your credit score healthy!</p>
            </div>
          </article>
        </div>

        <div class="tile is-vertical is-parent">
          <article class="tile is-child notification is-dark">
            <p class="title is-4">Account number:</p>
            <div class="content">
              <!-- Content -->
              <p class="title is-1">{{ accountNo }}</p>
            </div>
          </article>

          <article class="tile is-child notification is-success">
            <div class="content">
              <p class="title is-4">Loans taken:</p>
              <div class="content" v-for="x in loansTaken" :key="x">
                <!-- Content -->
                <div class="box" id="loans">
                  <div class="title is-4" id="customtitle">{{ x.bankName }}</div>
                  <p class="subtitle is-6">{{ x.bankLoan }}</p>
                  <p class="subtitle is-6">Amount: ${{ x.amountMin }} to ${{ x.amountMax }}</p>
                  <p class="subtitle is-6">Max repayment duration: {{ x.maxPeriod }} year(s)</p>
                  <p class="subtitle is-6">Interest rate: {{ x.interest }}%</p>
                </div>
              </div>
            </div>
          </article>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amountLeft: 500000.23,
      paymentAmt: 139.23,
      nextDate: '23/05/20',
      accountNo: '102-59123-01',
      loansTaken: [
        {
          bankName: 'POXB', bankLoan: 'Housing Loan', amountMin: '50000', amountMax: '300000', maxPeriod: '30', interest: '3.5',
        },
        {
          bankName: 'DBX', bankLoan: 'Education Loan', amountMin: '5000', amountMax: '40000', maxPeriod: '15', interest: '4.1',
        },
      ],
    };
  },
  methods: {
  },
};
</script>

<style scoped>
#maincontainer {
  margin-top: 3%;
}
.box {
  box-shadow: 5px 5px #a8a8a8;
  border: 1px solid rgb(172, 172, 172);
}
#loans {
  box-shadow: 0px 0px;
  border: 0px solid rgb(172, 172, 172);
}
#loans p {
  margin-bottom: 1px;
}
</style>
