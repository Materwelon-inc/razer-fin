<template>
    <div class="container" id="main-container">
        <div class="box">
        <section>
            <b-steps
                v-model="activeStep"
                :animated="isAnimated"
                :rounded="isRounded"
                :has-navigation="hasNavigation"
                :icon-prev="prevIcon"
                :icon-next="nextIcon"
                :label-position="labelPosition"
                :mobile-mode="mobileMode">
                <!-- Personal particulars fields -->
                <b-step-item class="step-margin" step="1"
                    id="particulars"
                    label="Identification" :clickable="isStepsClickable">
                    <h1 class="title has-text-centered">Identification</h1>
                    <p class="subtitle is-6 has-text-centered">Please key in your particulars</p>
                    <b-field grouped>
                        <b-field label="First Name" :label-position='labelPosition'>
                            <b-input v-model="form.firstName" />
                        </b-field>
                        <b-field
                        label="Last name"
                        :label-position='labelPosition'>
                            <b-input v-model="form.lastName" />
                        </b-field>
                    </b-field>
                    <b-field label="Email" :label-position='labelPosition'>
                        <b-input v-model="form.email" />
                    </b-field>
                    <b-field label="Address" :label-position='labelPosition'>
                        <b-input v-model="form.addr" />
                    </b-field>
                    <b-field grouped>
                      <b-field label="Preferred language"
                        id="languagefield"
                        :label-position='labelPosition'>
                          <b-select v-model="form.prefLang"
                            placeholder="Select a language"
                            >
                              <option value="English">English</option>
                              <option value="Chinese">Chinese</option>
                              <option value="Malay">Malay</option>
                              <option value="Tamil">Tamil</option>
                          </b-select>
                      </b-field>
                      <b-field>
                        <b-input placeholder="Others" v-model="form.prefLang" />
                      </b-field>
                    </b-field>
                    <div class="buttons">
                      <b-button id="cancelbutton" type="is-danger">Back</b-button>
                      <b-button
                        id="savebutton"
                        type="is-success"
                        v-on:click="saveParticulars"
                        >
                        Save
                      </b-button>
                    </div>
                </b-step-item>
                <!-- NRIC Photos -->
                <b-step-item class="step-margin" step="2"
                    label="Upload" :clickable="isStepsClickable"
                    :type="{'is-success': isProfileSuccess}">
                    <h1 class="title has-text-centered">Upload your ID</h1>
                    <hr>
                    <p class="subtitle is-6 has-text-centered">
                        Please upload a coloured copy of both sides of ID card for verification.
                    </p>
                    <div class="tile is-ancestor" id="tile-margin">
                        <div class="tile">
                            <div class="container">
                                <p class="subtitle is-6" id="imagesmustinclude">
                                    IMAGES MUST INCLUDE
                                </p>
                                <img src="@/assets/frontic.jpg">
                                <img src="@/assets/backic.jpg">
                            </div>
                        </div>
                        <div class="tile">
                            <div class="container">
                                <div class="content">
                                    <ul>
                                        <li>Coloured photo</li>
                                        <li>Full name</li>
                                        <li>Date of birth</li>
                                        <li>Valid expiration date</li>
                                        <li>NRIC</li>
                                    </ul>
                                    <hr>
                                    <p class="subtitle is-6">Front:</p>
                                    <b-field class="file">
                                                <input type="file" accept="image/*"
                                            @change="onFileChanged">
                                            <b-button @click="onUpload" type="is-success"
                                             outlined>Upload!</b-button>
                                        <span class="file-name" v-if="frontIC">
                                            {{ frontIC.name }}
                                        </span>
                                    </b-field>
                                    <p class="subtitle is-6">Back:</p>
                                    <b-field class="file">
                                        <input type="file" accept="image/*"
                                            @change="onFileChanged">
                                            <b-button @click="onUpload" type="is-success"
                                             outlined>Upload!</b-button>
                                        <span class="file-name" v-if="backIC">
                                            {{ backIC.name }}
                                        </span>
                                    </b-field>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-step-item>
                <!-- Finish step -->
                <b-step-item class="step-margin" :step="3" label="Finish"
                    :clickable="isStepsClickable" disabled>
                    <h1 class="title has-text-centered is-spaced">Finish</h1>
                    <p class="subtitle is-6 has-text-centered is-spaced">
                        Done! All documents submitted!
                    </p>
                    <p class="subtitle is-6 has-text-centered">
                        Please give us up to 3 working days to verify your account.
                    </p>
                </b-step-item>

                <template
                    class="has-text-centered"
                    v-if="customNavigation"
                    slot="navigation"
                    slot-scope="{previous, next}">
                    <b-button
                        outlined
                        type="is-success"
                        :disabled="previous.disabled"
                        @click.prevent="previous.action">
                        Previous
                    </b-button>
                    <b-button
                        outlined
                        type="is-success"
                        :disabled="next.disabled"
                        @click.prevent="next.action">
                        Next
                    </b-button>
                </template>
            </b-steps>
        </section>
        </div>
    </div>
</template>

<style scoped>
.box {
  box-shadow: 5px 5px #a8a8a8;
  border: 1px solid rgb(172, 172, 172);
}
#main-container {
    margin-top: 5%;
}

#tile-margin {
    margin-left: 25%;
    margin-right: 25%;
}
#imagesmustinclude {
    margin-top: 5%;
    margin-bottom: 2%;
    margin-left: 2%;
    font-weight: bold;
}
.content {
    margin-left: 20%;
    margin-top: 12%;
}
#particulars {
    margin: auto;
}
.buttons {
  margin-left: 35%;
}
</style>

<script>
import axios from 'axios';

export default {
  methods: {
    onFileChanged(event) {
      // eslint-disable-next-line
      // this.selectedFile = event.target.files[0]
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    },
    onUpload() {
      // upload file, get it from this.selectedFile
      console.log(this.selectedFile);
      const formData = new FormData();
      formData.append('myFile', this.selectedFile, this.selectedFile.name);
      axios.post('https://niw1itg937.execute-api.ap-southeast-1.amazonaws.com/Prod/verify', formData)
      .then((res) => {
        console.log(res);
      });
    },
  },
  data() {
    return {
      isStepsClickable: true,
      labelPosition: 'on-border',
      form: {
        firstName: '',
        lastName: '',
        addr: '',
        prefLang: '',
        email: '',
      },
    };
  },
};
</script>
