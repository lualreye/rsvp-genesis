import { defineStore } from "pinia";
import axios from "axios";

const apiUrlBase = "https://n8n-railway-custom-production-3f03.up.railway.app/webhook/get-attendant"; // URL base de la API

const useConfirmationStore = defineStore("ConfirmationStore", {
  state: () => ({
    user: null,
  }),

  actions: {
    // Función para hacer POST
    async postData(data: string) {
      try {
        const response = await axios.post(`${apiUrlBase}`, {
          attendantId: data
        });
        return response.data;
      } catch (error) {
        console.error("Error en POST:", error);
        throw error;
      }
    },

    // Función para hacer PATCH
    async patchData(id: string, data: boolean) {
      try {
        const response = await axios.patch(`${apiUrlBase}`, {
          attendantId: id,
          asiste: data
        });
        return response.data;
      } catch (error) {
        console.error("Error en PATCH:", error);
        throw error;
      }
    },
  },
});

export default useConfirmationStore;
