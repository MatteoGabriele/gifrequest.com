<script setup lang="ts">
const props = defineProps<{
  isCorrect: boolean;
}>();

const corrects = [
  "https://media1.tenor.com/m/0Sh7u1lRsyEAAAAC/wedding-crasher-hro.gif",
  "https://media1.tenor.com/m/Cc1qotSwPnIAAAAC/yee.gif",
  "https://media1.tenor.com/m/7aYhdZouU-QAAAAC/celebrate-will-ferrell.gif",
  "https://media1.tenor.com/m/UQcfPJ_dv8kAAAAC/taylor-swift-taylor-cam.gif",
  "https://media1.tenor.com/m/iWGw0fapmFQAAAAC/oh-obama.gif",
  "https://media1.tenor.com/m/Tut-NCefoD0AAAAC/clapping-hands.gif",
  "https://media1.tenor.com/m/paXQ0eZDvxIAAAAd/tcalk%C4%B1s1x-alk%C4%B1stc1x.gif",
  "https://media1.tenor.com/m/VD2vimrZ3toAAAAd/excited-hockey.gif",
  "https://media1.tenor.com/m/I7eDUnVD7FYAAAAC/money-rain-erlich-bachman.gif",
];

const errors = [
  "https://media1.tenor.com/m/n5UTrQqOwp0AAAAC/leonardo-dicaprio-absolutely-fucking-not.gif",
  "https://media1.tenor.com/m/LFez5CkZp44AAAAC/groundhog-day-bill-murray.gif",
  "https://media1.tenor.com/m/DKj_JQhjAo8AAAAd/wrong-incorrect.gif",
  "https://media1.tenor.com/m/XryxBeYJL_AAAAAC/no-disappointed.gif",
  "https://media1.tenor.com/m/fwJDXbBW7-8AAAAC/wrong-not.gif",
  "https://media1.tenor.com/m/0qgtyzAb1XYAAAAd/skysleash-selena.gif",
  "https://media1.tenor.com/m/d53WvnYgeMkAAAAd/absolutely-not.gif",
];

const src = computed<string | undefined>(() => {
  if (props.isCorrect) {
    return shuffle(corrects)[0];
  } else {
    return shuffle(errors)[0];
  }
});
</script>

<template>
  <Gif :key="src" :src="src" />
</template>
