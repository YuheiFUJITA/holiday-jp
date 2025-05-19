<script setup lang="ts">
import { ref } from "vue";

const today = new Date();
const from = ref<Date>(new Date(today.getFullYear(), today.getMonth(), 1));
const to = ref<Date>(new Date(today.getFullYear(), today.getMonth() + 1, 0));
const contentType = ref<"json" | "csv" | "xml">("json");

const dateToString = (date: Date): string => {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Tokyo",
  })
    .format(date)
    .replace(/\//g, "-");
};

const curl = ref("");

const data = ref("");

const call = async () => {
  const response = await fetch(
    `https://jpcal.rest/v1/holiday.${contentType.value}?from=${dateToString(
      from.value
    )}&to=${dateToString(to.value)}`
  );
  data.value = await response.text();
  curl.value = `curl -X GET "https://jpcal.rest/v1/holiday.${
    contentType.value
  }?from=${dateToString(from.value)}&to=${dateToString(to.value)}"`;
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>祝日API</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-title> パラメーター </v-card-title>
          <v-card-item>
            <v-date-input
              label="From"
              variant="outlined"
              v-model="from"
            ></v-date-input>
            <v-date-input
              label="To"
              variant="outlined"
              v-model="to"
            ></v-date-input>
            <v-radio-group v-model="contentType" label="Content Type">
              <v-radio label="JSON" value="json"></v-radio>
              <v-radio label="CSV" value="csv"></v-radio>
              <v-radio label="XML" value="xml"></v-radio>
            </v-radio-group>
          </v-card-item>
          <v-card-actions>
            <v-btn block @click="call">実行する</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title> 結果 </v-card-title>
          <v-card-item>
            <v-card-item>
              <v-textarea
                label="curl"
                variant="outlined"
                readonly
                v-model="curl"
              ></v-textarea>
              <v-textarea
                label="Response"
                variant="outlined"
                readonly
                v-model="data"
              ></v-textarea>
            </v-card-item>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
