<script setup lang="ts">
defineProps<{
  isCorrect?: boolean;
}>();

const corrects = [
  "https://media1.tenor.com/m/0Sh7u1lRsyEAAAAC/wedding-crasher-hro.gif",
  "https://media1.tenor.com/m/Cc1qotSwPnIAAAAC/yee.gif",
  "https://media1.tenor.com/m/7aYhdZouU-QAAAAC/celebrate-will-ferrell.gif",
  "https://media1.tenor.com/m/UQcfPJ_dv8kAAAAC/taylor-swift-taylor-cam.gif",
];

const correct = computed<string | undefined>(() => {
  return shuffle(corrects)[0];
});

const errors = [
  "https://media1.tenor.com/m/DKj_JQhjAo8AAAAd/wrong-incorrect.gif",
  "https://media1.tenor.com/m/XryxBeYJL_AAAAAC/no-disappointed.gif",
  "https://media1.tenor.com/m/fwJDXbBW7-8AAAAC/wrong-not.gif",
  "https://media1.tenor.com/m/0qgtyzAb1XYAAAAd/skysleash-selena.gif",
];

const error = computed<string | undefined>(() => {
  return shuffle(errors)[0];
});
</script>

<template>
  <GifContainer>
    <Gif v-if="isCorrect" :key="correct" :url="correct" />
    <Gif v-else :key="error" :url="error" />
  </GifContainer>
</template>
