const BASE_URL = "http://localhost:8081/hastane";

let tc

const getTc = async (TC) => {
    tc = TC
    console.log(TC)
}


import axios from "axios";

const getPatient = async (Patient) => {
    return await axios
        .get(`${BASE_URL}/HastaBilgiTc/${tc}`, Patient)
        .then((response) => {
            console.log("Service -", response)
            return response;
        })
        .catch((err) => {
            throw err
        })
}

const deletePatient = async (id) => {
    return await axios
        .delete(`${BASE_URL}/HastaBilgiSil/${id}`, id)
        .then(() => {
            console.log("Ürün Silindi")
        })
        .catch((err) => {
            throw err;
        })
}

const addPatient = async (Patient) => {
    return await axios
        .post(`${BASE_URL}/HastaBilgiEkle`, {
            tc: Patient.tc, hastaAd: Patient.hastaAd, hastaSoyad: Patient.hastaSoyad, hastaYas: Patient.hastaYas, hastaSikayeti: Patient.hastaSikayeti, tani: Patient.tani, yatacakMi: Patient.yatacakMi
        })
        .then(() => {
            console.log(Patient.tc)
            console.log(Patient.hastaAd)
            console.log(Patient.hastaSoyad)
            console.log(Patient.hastaYas)
            console.log(Patient.hastaSikayeti)
            console.log(Patient.tani)
            console.log(Patient.yatacakMi)
        })
}

const updatePatient = async (Patient) => {
    console.log("Serivice - ", Patient.yatacakMi)
    return await axios
        .put(`${BASE_URL}/HastaBilgiDuzenle/${Patient.id}`,
            {
                tc: Patient.tc, hastaAd: Patient.hastaAd, hastaSoyad: Patient.hastaSoyad, hastaYas: Patient.hastaYas,
                hastaSikayeti: Patient.hastaSikayeti, tani: Patient.tani, yatacakMi: Patient.yatacakMi
            })
}

export { getPatient, getTc, deletePatient, addPatient, updatePatient }
