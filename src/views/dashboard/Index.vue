<template>
  <div>
    <!-- start of contents -->
    <div class="container is-fluid" id="firstcontainer">
      <!--- start of credit score -->
      <!-- start of slider -->
      <div class="box">
        <section>
          <div class="title is-4">Indicate your desired interest rate</div>
          <div class="subtitle is-6">Available plans will be shown below!</div>
          <b-slider
            type="is-success"
            :custom-formatter="val=>val+'%'"
            v-model="riskVal"
            size="is-large"
            :min="0"
            rounded
            :max="6"
            :step="0.01"
          >
            <template v-for="val in [0, 6]">
              <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
            </template>
          </b-slider>
        </section>
      </div>
      <!-- end of slider -->
      <!-- start of carousel bank loans -->
      <template>
        <div class="box">
          <div id="moreinfo">
            <b-tooltip
              class="infotooltip"
              label="If no loans are available to you, verify your account first!"
              position="is-left"
              size="is-medium"
              multilined
              type="is-success"
            >
              <b-button class="button" rounded>?</b-button>
            </b-tooltip>
          </div>
          <b-carousel id="caroustyle" :autoplay="false">
            <b-carousel-item v-for="x in carouData" :key="x">
              <div class="hero-body has-text-centered" id="carouitem">
                <img alt="banklogo" src="../../assets/banklogo.png">
                <div class="title is-2" id="customtitle">{{ x.bankName }}</div>
                <div class="subtitle is-4">{{ x.bankLoan }}</div>
                <div class="subtitle is-6">Amount: ${{ x.amountMin }} to ${{ x.amountMax }}</div>
                <div class="subtitle is-6">Max repayment duration: {{ x.maxPeriod }} year(s)</div>
                <div class="subtitle is-6">Interest rate: {{ x.interest }}%</div>
                <hr />
                <b-button
                  :type="availColor(x.avail)"
                  :disabled="!x.avail"
                  @click="isComponentModalActive = true"
                >Apply</b-button>
                <b-modal
                  :active.sync="isComponentModalActive"
                  has-modal-card
                  trap-focus
                  :destroy-on-hide="false"
                  aria-role="dialog"
                  aria-modal
                >
                  <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                      <p class="modal-card-title">Login</p>
                    </header>
                    <section class="modal-card-body">
                      <div class="box">
                        <section>
                          <div class="title is-4">Amount</div>
                          <b-slider
                            type="is-success"
                            :custom-formatter="val=>'$'+val"
                            v-model="riskVal"
                            size="is-large"
                            :min="x.amountMin"
                            rounded
                            :max="x.amountMax"
                            :step="0.01"
                          >
                            <template v-for="val in [x.amountMin, x.amountMax]">
                              <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
                            </template>
                          </b-slider>
                        </section>
                      </div>

                      <b-field label="Password">
                        <b-input
                          type="password"
                          :value="password"
                          password-reveal
                          placeholder="Your password"
                          required
                        ></b-input>
                      </b-field>

                      <b-checkbox>Remember me</b-checkbox>
                    </section>
                    <footer class="modal-card-foot">
                      <button class="button" type="button" @click="$parent.close()">Close</button>
                      <button class="button is-primary">Login</button>
                    </footer>
                  </div>
                </b-modal>
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
import { mapGetters } from 'vuex';
import firebase from 'firebase';
import UserClaimService from '../../services/UserClaimService';

export default {
  name: 'dashboard',
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: 'user',
    }),
    liveUser() {
      if (this.user && this.user.data && this.user.data.email) {
        return firebase.auth().currentUser;
      }

      return null;
    },
  },
  beforeMount() {
    UserClaimService.getClaim('email')
    .then((res) => {
      for (let i = 0; i < this.bankData.length; i += 1) {
        this.bankData[i].avail = true;
      }
    })
    .catch((err) => {
      console.dir(err);
    });
  },
  data() {
    return {
      isComponentModalActive: false,
      formProps: {
        email: 'evan@you.com',
        password: 'testing',
      },
      riskVal: 0,
      carousels: [
        { text: 'Slide 1', color: 'primary' },
      ],
      // Dummy data -- to be replaced with API
      bankData: [
        {
          bankName: 'CBS', bankLoan: 'Education Loan', amountMin: '5000', amountMax: '40000', maxPeriod: '15', interest: '2.0', avail: false,
        },
        {
          bankName: 'POXB', bankLoan: 'Housing Loan', amountMin: '50000', amountMax: '300000', maxPeriod: '30', interest: '3.5', avail: true,
        },
        {
          bankName: 'DBX', bankLoan: 'Education Loan', amountMin: '5000', amountMax: '40000', maxPeriod: '15', interest: '4.1', avail: false,
        },
        {
          bankName: 'OCBX', bankLoan: 'Education Loan', amountMin: '5000', amountMax: '40000', maxPeriod: '15', interest: '4.5', avail: false,
        },
        {
          bankName: 'UOX', bankLoan: 'Education Loan', amountMin: '5000', amountMax: '40000', maxPeriod: '15', interest: '5', avail: false,
        },
        {
          bankName: 'StanChart', bankLoan: 'Education Loan', amountMin: '5000', amountMax: '40000', maxPeriod: '15', interest: '5', avail: false,
        },
        {
          bankName: 'Razer', bankLoan: 'Education Loan', amountMin: '5000', amountMax: '40000', maxPeriod: '15', interest: '5.3', avail: false,
        },
      ],
      // Loan data to be displayed to user
      carouData: [
        {
          bankName: 'No Loans Available!', bankLoan: '', amountMin: '-', amountMax: '-', maxPeriod: '-', interest: '-', avail: false,
        },
      ],
      creditScore: 3,
      // ? button on carousel boolean
      isActive: false,

    };
  },
  watch: {
    riskVal(newVal) {
      this.updateCarou(newVal);
    },
  },
  methods: {
    updateCarou(newVal) {
      this.carouData = [];
      for (let i = 0; i < this.bankData.length; i += 1) {
        if (this.bankData[i].interest <= newVal) this.carouData.push(this.bankData[i]);
      }
      if (this.carouData.length === 0) {
        this.carouData = [
          {
            bankName: 'No Loans Available!', bankLoan: '', amountMin: '-', amountMax: '-', maxPeriod: '-', interest: '-', avail: false,
          },
        ];
      }
    },
    updateAvailability(bank, loan) {
      for (let i = 0; i < this.bankData.length; i += 1) {
        if (this.bankData[i].bankName === bank && this.bankData[i].bankLoan === loan) {
          this.bankData[i].avail = !this.bankData[i].avail;
        }
      }
    },
    availColor(avail) {
      if (avail) return 'is-success';
      return 'is-dark';
    },
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

.infotooltip {
  font-weight: bold;
  margin-left: 97.5%;
}
.infotooltip button {
  border: 1px solid rgb(97, 97, 97);
  font-size: 60%;
}

#caroustyle {
  margin-top: 1px;
}
#carouitem div {
  margin-bottom: 0px;
  margin-top: 0px;
}
</style>
