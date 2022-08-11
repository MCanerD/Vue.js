<template>
    <b-card>
        <b-button class="sag" @click="$router.push('/AddPatient')" variant="primary">Ekleme</b-button>
        <b-form @submit.prevent="getTC()">
            Kimlik Sorgulama
            <div class="row">
                <div class="col-lg-2">
                    <b-form-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Tc Kimlik"
                        v-model="this.tc">
                    </b-form-input>
                </div>
                <div class="col-lg-1">
                    <b-button type="submit" variant="primary">Ara</b-button>
                </div>
            </div>
        </b-form>
    </b-card>
    <b-card>
        <b-tabs content-class="mt-3 " fill>
            <b-tab>
                <p>
                    <CardComp v-for="patient in patients" :key="patient" class="cerceve">
                        <b-container class="bv-example-row">
                            <b-row>
                                <b-col>
                                    <div>
                                        <ul>
                                            <li>
                                                <p><b></b> {{ patient.hastaAd }} {{ patient.hastaSoyad }}</p>
                                                <p>Yaş: {{ patient.hastaYas }}</p>
                                                <p>Şikayeti: {{ patient.hastaSikayeti }}</p>
                                                <p>Tanı: {{ patient.tani }}</p>
                                                <p v-if="patient.yatacakMi">Tanı: Yatıcak</p>
                                                <p v-if="!patient.yatacakMi">Tanı: Yatmıyacak</p>
                                                <b-button pill variant="danger" @click="remove(patient.id)">
                                                    sil
                                                </b-button>
                                                <b-col>
                                                    <b-button pill variant="primary" v-b-modal.modal-7>Düzenle
                                                    </b-button>
                                                </b-col>
                                                <b-modal id="modal-7" title="Ürün Düzenle">
                                                    <b-card>
                                                        <b-form @submit.prevent="update(patient.id, duzenlenecek.tc, duzenlenecek.hastaAd,
                                                        duzenlenecek.hastaSoyad, duzenlenecek.hastaYas, duzenlenecek.hastaSikayeti,
                                                        duzenlenecek.tani, duzenlenecek.yatacakMi)">
                                                            <div class="row">
                                                                <div class="col-lg-4">
                                                                    <b-form-input id="inline-form-input-username"
                                                                        placeholder="Hasta Tc"
                                                                        v-model="duzenlenecek.tc">
                                                                    </b-form-input>
                                                                </div>
                                                                <div class="col-lg-4">
                                                                    <b-form-input id="inline-form-input-username"
                                                                        placeholder="Hasta Adı"
                                                                        v-model="duzenlenecek.hastaAd">
                                                                    </b-form-input>
                                                                </div>
                                                                <div class="col-lg-4">
                                                                    <b-form-input id="inline-form-input-username"
                                                                        placeholder="Hasta Soyadı"
                                                                        v-model="duzenlenecek.hastaSoyad">
                                                                    </b-form-input>
                                                                </div>
                                                                <div class="col-lg-4">
                                                                    <b-form-input id="inline-form-input-username"
                                                                        placeholder="Yaşı"
                                                                        v-model="duzenlenecek.hastaYas">
                                                                    </b-form-input>
                                                                </div>
                                                                <div class="col-lg-4">
                                                                    <b-form-input id="inline-form-input-username"
                                                                        placeholder="Şikayeti"
                                                                        v-model="duzenlenecek.hastaSikayeti">
                                                                    </b-form-input>
                                                                </div>
                                                                <div class="col-lg-4">
                                                                    <b-form-input id="inline-form-input-username"
                                                                        placeholder="Tanısı"
                                                                        v-model="duzenlenecek.tani">
                                                                    </b-form-input>
                                                                </div>
                                                                <div class="col-lg-2">
                                                                    <b-form-select id="inline-form-custom-select-pref"
                                                                        class="mb-2 mr-sm-2 mb-sm-0"
                                                                        :options="[{ text: 'Tür Seçiniz...', value: null }, 'Evet', 'Hayır']"
                                                                        :value="null" v-model="duzenlenecek.yatacakMi">
                                                                    </b-form-select>
                                                                </div>
                                                                <div class="col-lg-2">
                                                                    <b-button type="submit" variant="primary">Save
                                                                    </b-button>
                                                                </div>
                                                            </div>
                                                        </b-form>
                                                    </b-card>
                                                </b-modal>
                                            </li>
                                        </ul>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-container>
                    </CardComp>
                </p>
            </b-tab>
        </b-tabs>
    </b-card>
</template>

<script>
import { getPatient, getTc, deletePatient, updatePatient } from '../services/PatientService'
import CardComp from './CardComp.vue'
export default {
    data() {
        return {
            patients: [],
            tc: null,
            Yaticak: "Evet",
            Yatmicak: "Hayır",
            duzenlenecek: {
                tc: "",
                hastaAd: "",
                hastaSoyad: "",
                hastaYas: "",
                hastaSikayeti: "",
                tani: "",
                yatacakMi: ""
            },

        }
    },
    methods: {
        async update(id, tc, hastaAd, hastaSoyad, hastaYas, hastaSikayeti, tani, yatacakMi) {

            this.duzenlenecek = {
                id: id,
                tc: tc,
                hastaAd: hastaAd,
                hastaSoyad: hastaSoyad,
                hastaYas: hastaYas,
                hastaSikayeti: hastaSikayeti,
                tani: tani,
                yatacakMi: yatacakMi
            }
            if (this.duzenlenecek.yatacakMi == "Evet") {
                this.duzenlenecek.yatacakMi = true
            }
            else if (this.duzenlenecek.yatacakMi == "Hayır") {
                this.duzenlenecek.yatacakMi = false
            }
            await updatePatient(this.duzenlenecek)
                .then(() => {
                    alert("Düzenleme başarılı")
                    console.log("Component'ten gitti",);
                })
                .catch((err) => {
                    throw err;
                });


        },
        async getTC() {
            await getTc(this.tc)
                .then(() => {
                    getPatient()
                        .then((response) => {
                            this.patients = response.data
                            console.log("Component - ", response);
                        })
                        .catch((err) => {
                            throw err;
                        });
                })
                .catch((err) => {
                    throw err;
                });
        },
        async remove(id) {
            await deletePatient(id)
                .then(() => {
                    this.getTC()
                    console.log("Component'ten gitti");
                })
                .catch((err) => {
                    throw err;
                });
        },
    },
    components: { CardComp }
}
</script>

<style>
li {
    list-style: none;
}
.sag{
    margin-left: 85%;
}
</style>