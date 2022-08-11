<template>
    <b-card>
        <b-form @submit.prevent="AddPatient()">
            <b-button class="sag" @click="$router.push('/')" variant="primary">Arama</b-button>
            <div class="row">
                <div class="col-lg-2">
                    <b-form-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Tc Kimlik"
                        v-model="Patient.tc">
                    </b-form-input>
                </div>
                <div class="col-lg-2">
                    <b-form-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Hasta Adı"
                        v-model="Patient.hastaAd">
                    </b-form-input>
                </div>
                <div class="col-lg-2">
                    <b-form-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Hasta Soyadı"
                        v-model="Patient.hastaSoyad">
                    </b-form-input>
                </div>
                <div class="col-lg-2">
                    <b-form-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Yaşı"
                        v-model="Patient.hastaYas">
                    </b-form-input>
                </div>
                <div class="col-lg-2">
                    <b-form-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Şikayeti"
                        v-model="Patient.hastaSikayeti">
                    </b-form-input>
                </div>
                <div class="col-lg-2">
                    <b-form-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Tani"
                        v-model="Patient.tani">
                    </b-form-input>
                </div>
                <div class="col-lg-2 ">
                    <b-form-select id="inline-form-custom-select-pref" class="mb-2 mr-sm-2 mb-sm-0"
                        :options="[{ text: 'Tür Seçiniz...', value: null }, 'Evet', 'Hayır']" :value="null"
                        v-model="Patient.yatacakMi"></b-form-select>
                </div>
                <div class="col-lg-1">
                    <b-button type="submit" variant="primary">Ekle</b-button>
                </div>
            </div>
        </b-form>
    </b-card>
</template>

<script>
import { addPatient } from '../services/PatientService'
export default {
    data() {
        return {
            Patient: {
                tc: null,
                hastaAd: "",
                hastaSoyad: "",
                hastaYas: null,
                hastaSikayeti: "",
                tani: "",
                yatacakMi: ""
            }
        }
    },
    methods: {
        async AddPatient() {
            if (this.Patient.yatacakMi == "Evet") {
                this.Patient.yatacakMi = true
            }
            else if (this.Patient.yatacakMi == "Hayır") {
                this.Patient.yatacakMi = false
            }
            if (this.Patient.tc < 99999999999 & this.Patient.tc > 10000000000) {
                await addPatient(this.Patient)
                    .then(() => {
                        alert("Ekleme başarılı.")
                        console.log(this.Patient)
                    })
                    .catch((err) => {
                        return err
                    })
            }
            else {
                alert("Hatalı giriş")
            }
        }
    }
}
</script>

<style>
.sag {
    margin-left: 90%;
    margin-bottom: 2%;
}
</style>