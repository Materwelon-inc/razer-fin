<template>
    <div class="container" id="main-container">
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
                <b-step-item class="step-margin"
                    id="particulars"
                    step="1"
                    label="Identification" :clickable="isStepsClickable">
                    <h1 class="title has-text-centered">Identification</h1>
                    <p class="subtitle is-6 has-text-centered">Please key in your particulars</p>
                    <b-field horizontal label="Name">
                        <b-input value="Donald Trump"></b-input>
                    </b-field>
                    <b-field horizontal label="NRIC">
                        <b-input></b-input>
                    </b-field>
                    <b-field horizontal label="Email">
                        <b-input type="email"></b-input>
                    </b-field>
                    <b-field horizontal label="Mobile number">
                        <b-input></b-input>
                    </b-field>
                    <b-field horizontal label="Home number">
                        <b-input></b-input>
                    </b-field>
                </b-step-item>

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
                                        <b-upload v-model="file">
                                            <a class="button is-primary">
                                                <b-icon icon="upload" id="uploadbutton1"></b-icon>
                                                <span>Click to upload</span>
                                            </a>
                                        </b-upload>
                                        <span class="file-name" v-if="frontIC">
                                            {{ frontIC.name }}
                                        </span>
                                    </b-field>
                                    <p class="subtitle is-6">Back:</p>
                                    <b-field class="file">
                                        <b-upload v-model="file">
                                            <a class="button is-primary" id="uploadbutton2">
                                                <b-icon icon="upload"></b-icon>
                                                <span>Click to upload</span>
                                            </a>
                                        </b-upload>
                                        <span class="file-name" v-if="backIC">
                                            {{ backIC.name }}
                                        </span>
                                    </b-field>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-step-item>

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
                        icon-pack="fas"
                        icon-left="backward"
                        :disabled="previous.disabled"
                        @click.prevent="previous.action">
                        Previous
                    </b-button>
                    <b-button
                        outlined
                        type="is-success"
                        icon-pack="fas"
                        icon-right="forward"
                        :disabled="next.disabled"
                        @click.prevent="next.action">
                        Next
                    </b-button>
                </template>
            </b-steps>
        </section>
    </div>
</template>

<style scoped>
#main-container {
    margin-top: 5%;
}
.step-margin {
    padding-top: 2%;
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
    margin-left: 25%;
    margin-right: 25%;
}
#particulars b-field {
    margin-top: 5px;
    margin-bottom: 5px;
}

</style>
