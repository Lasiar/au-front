<template>
  <v-list dense>
    <div
      ref="chat"
      style=" height: 300px;
  overflow-y: auto;"
    >
      <template v-for="(lap, i) in historyHumanDT">
        <div :key="i">
          <v-list-item>
            <v-list-item-content>
              {{ lap.date_time }} {{ user }}: {{ lap.input }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content
              v-text="
                `Комьютер: ${bullAndCow(lap.input, currentSession.secret)}`
              "
            ></v-list-item-content>
          </v-list-item>
        </div>
      </template>
    </div>
  </v-list>
</template>

<script>
import { bullAndCow, dateFormatter } from "../../../utils/game";
import { mapActions, mapState } from "vuex";

export default {
  name: "Game",
  props: {
    currentSession: {
      required: true,
      type: Object,
      default() {
        return { secret: "", id: 0 };
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user.name,
      history: state => state.game.history
    }),
    historyHumanDT() {
      return this.history.map(lap => {
        return { ...lap, date_time: dateFormatter(lap.date_time) };
      });
    }
  },
  methods: {
    ...mapActions({
      guess: "game/guess",
      getHistory: "game/getHistory"
    }),
    bullAndCow(input, secret) {
      return bullAndCow(input, secret);
    },
    scrollToEnd() {
      const chat = this.$refs["chat"];
      chat.scrollTop = chat.scrollHeight;
    }
  },
  watch: {
    history: {
      immediate: true,
      async handler() {
        const session = await this.scrollToEnd();
        this.$emit("loadSession", session);
      }
    },
    currentSession: {
      handler(newVal) {
        this.getHistory(newVal.id);
      }
    }
  }
};
</script>

<style scoped></style>
