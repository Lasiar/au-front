<template>
  <v-card class="ma-2 elevation-10">
    <v-toolbar dark flat primary color="indigo">
      <v-icon>mdi-silverware</v-icon>
      <v-toolbar-title>Не завершенные игры</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-layout>
      <v-flex>
        <v-card-text
          style=" height: 300px;
  overflow-y: auto;"
        >
          <game-sessions @selectSession="selectSession"></game-sessions>
        </v-card-text>
      </v-flex>

      <v-divider vertical></v-divider>

      <v-flex xs12 md6>
        <div
          v-if="currentSession.id === undefined"
          class="title font-weight-light grey--text pa-3 text-xs-center"
        >
          Выберите игру
        </div>
        <game v-else :current-session="currentSession"></game>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-card-actions>
      <v-layout align-center justify-space-between row>
        <v-flex xs6>
          <session-new
            class="ml-1"
            @newSession="newSessionHanding"
          ></session-new>
        </v-flex>
        <v-flex xs6>
          <game-input
            v-if="currentSession.id !== undefined"
            :length="lengthSecret"
            @sendGuess="guessHandler"
          ></game-input>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import GameInput from "./GameInput";
import Game from "./Game";
import GameSessions from "./GameSessions";
import SessionNew from "./SessionNew";

export default {
  components: { SessionNew, GameSessions, GameInput, Game },
  data: () => ({
    currentSession: {}
  }),
  computed: {
    ...mapState({
      user: state => state.auth.user.name,
      history: state => state.game.history
    }),
    lengthSecret() {
      return this.currentSession.secret.length || 0;
    }
  },
  methods: {
    ...mapActions({
      guess: "game/guess",
      getHistory: "game/getHistory"
    }),
    async guessHandler(input) {
      await this.guess({ idSession: this.currentSession.id, text: input });
    },
    selectSession(session) {
      this.currentSession = session;
    },
    newSessionHanding(session) {
      this.currentSession = session;
    }
  }
};
</script>

<style scoped></style>
