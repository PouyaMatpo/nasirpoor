<template>
    <div>
        <div class="flex-col-reverse flex md:flex-row overflow-hidden">
            <div class="md:w-2/3">
                <div :class="$s.mdAndUp ? 'flex flex-col s-center' : 'mt-24'"
                    class="absolute leading-tight md:h-full w-1/2 z-1"
                    :style="$s.mdAndUp ? '' : 'left:calc(50vw - 25%)'">
                    <div>
                        <div :class="$s.dark ? $store.state.pageColor + '--text text--lighten-3' : $store.state.pageColor + '--text text--darken-5'"
                            class="text-5xl md:text-8xl font-black">
                            {{ $l(errorText) }}
                        </div>
                        <div v-if="error.statusCode" :class="$store.state.pageColor + '--text text--darken-1'"
                            class="text-8xl md:text-[200px] font-black text-center md:text-start">
                            {{ error.statusCode }}
                        </div>
                        <div v-if="error.message" :class="$store.state.pageColor + '--text text--darken-1'"
                            class="font-black text-center md:text-start">
                            {{ error.message }}
                        </div>
                        <div class="py-2 flex justify-center md:justify-start">
                            <s-btn aria-label="text" to="/" :color="$s.dark ? 'cyan darken-3' : $store.state.pageColor">
                                {{ $l(btnText) }}
                            </s-btn>
                        </div>
                    </div>
                </div>
                <s-image
                    :skeletonColor="$s.dark ? $store.state.pageColor + ' darken-2' : $store.state.pageColor + ' lighten-4'"
                    alt="error-image" v class="md:h-screen"
                    :src="$s.mdAndUp ? '/error/errorPic.png' : '/error/errorPicMob.png'" />
            </div>
            <div class="md:w-1/2">
                <div class="flex justify-end md:h-1/2 px-5">
                    <s-lottie class="h-40 md:h-96" src="/lottie/firstAnim.lottie" auto-play loop
                        @mounted="firstAnim = $event" />
                </div>
                <div class="flex items-end justify-start md:h-1/2">
                    <s-lottie class="h-48 md:h-96" src="/lottie/secondAnim.lottie" auto-play loop
                        @mounted="secondAnim = $event" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['error'],

    layout: 'empty',

    data() {
        return {
            firstAnim: null,
            secondAnim: null,
            btnText: {
                en: "home page",
                fa: "بازگشت به خانه",
            },
            errorText: {
                en: "Error",
                fa: "خطا",
            }
        };
    }
};
</script>