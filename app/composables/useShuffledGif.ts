type UseShaffledGifReturn = {
  gif: ComputedRef<Gif | undefined>;
  nextGif: () => void;
};

export default function useShuffledGif(
  gifs: MaybeRef<Gif[] | undefined>
): UseShaffledGifReturn {
  const shuffledGifs = computed<Gif[]>(() => {
    const gifsRaw = unref(gifs);

    if (!gifsRaw) {
      return [];
    }

    return shuffle(gifsRaw);
  });

  const currentGifIndex = ref<number>(0);
  function nextGif(): void {
    if (currentGifIndex.value >= shuffledGifs.value.length - 1) {
      currentGifIndex.value = 0;
    } else {
      currentGifIndex.value++;
    }
  }

  const gif = computed<Gif | undefined>(() => {
    return shuffledGifs.value[currentGifIndex.value];
  });

  return {
    nextGif,
    gif,
  };
}
