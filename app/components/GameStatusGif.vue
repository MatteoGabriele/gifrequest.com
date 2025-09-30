<script setup lang="ts">
defineProps<{
  isCorrect?: boolean;
}>();
</script>

<template>
  <GifContainer>
    <Gif
      key="correct"
      v-show="isCorrect"
      url="https://media1.tenor.com/m/0Sh7u1lRsyEAAAAC/wedding-crasher-hro.gif"
    />
    <Gif
      key="wrong"
      v-show="!isCorrect"
      url="https://media1.tenor.com/m/DKj_JQhjAo8AAAAd/wrong-incorrect.gif"
    />
  </GifContainer>
</template>
