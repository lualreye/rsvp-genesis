import { defineStore } from "pinia";
import axios from "axios";

const apiUrlBase = "https://n8n-railway-custom-production-3f03.up.railway.app/webhook/get-attendant"; // URL base de la API
const apiUrlBase2 = "https://n8n-railway-custom-production-3f03.up.railway.app/webhook/set-attendant-status"; // URL base de la API

interface RootState {
  user: null | {
    attendant_id: string,
    nombre: string,
    apellido: string,
    asistencia: string,
    admisiones: number
  }
}

const useConfirmationStore = defineStore("ConfirmationStore", {
  state: (): RootState => ({
    user: null,
  }),

  actions: {
    // Función para hacer POST
    async postData(data: string) {
      try {
        const response = await axios.post(`${apiUrlBase}`, {
          attendantId: data
        });
        this.user = response.data;
      } catch (error) {
        console.error("Error en POST:", error);
        throw error;
      }
    },

    // Función para hacer PATCH
    async patchData(id: string, data: boolean) {
      try {
        const response = await axios.patch(`${apiUrlBase2}`, {
          attendantId: id,
          asiste: data
        });
        this.postData(response.data.assistantId as string)
      } catch (error) {
        console.error("Error en PATCH:", error);
        throw error;
      }
    },
  },
});

export default useConfirmationStore;
