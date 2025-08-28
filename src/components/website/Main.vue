<template>
    <div class="w-main">
        <div class="m wrap">
            <div v-for="(item, index) in book" :key="index" :class="['box', positionClasses[index]]"
                @click="handleClick(index)">
                <img :src="item" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            book: [
                require('@/assets/img/1.png'),
                require('@/assets/img/2.png'),
                require('@/assets/img/3.png'),
                require('@/assets/img/4.png'),
                require('@/assets/img/5.png')
            ],
            positionClasses: ['box1', 'box2', 'box3', 'box4', 'box5'],
            currentIndex: 0
        }
    },
    created() {
        this.updatePositions();
    },
    methods: {
        handleClick(clickedIndex) {
            this.currentIndex = clickedIndex;
            this.updatePositions();
        },
        updatePositions() {
            this.positionClasses = this.book.map((_, offset) => {
                const positionMap = ['box1', 'box2', 'box3', 'box4', 'box5'];
                const index = (offset - this.currentIndex + this.book.length) % this.book.length; 
                return positionMap[index];
            });
        }
    }
}
</script>
<style lang="scss">
.w-main {
    padding-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    .wrap {
        display: flex;
        justify-content: center;
        position: relative;
        width: 150px;
        height: 200px;

        .box {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transition: 1s;
            cursor: pointer;
        }

        .box:hover {
            box-shadow: 0px 0px 5px white;
        }

        .box img {
            width: 100%;
            height: 100%;
        }

        .box1 {
            transform: translate3d(0px, 0px, 50px) scale3d(1, 1, 1);
            z-index: 999;
        }

        .box2 {
            transform: translate3d(180px, -10px, 50px) scale3d(0.9, 0.9, 0.9);
            z-index: 998;
        }

        .box3 {
            transform: translate3d(80px, -30px, 100px) scale3d(0.8, 0.8, 0.8);
            z-index: 997;
        }

        .box4 {
            transform: translate3d(-80px, -30px, 100px) scale3d(0.8, 0.8, 0.8);
            z-index: 997;
        }

        .box5 {
            transform: translate3d(-180px, -10px, 50px) scale3d(0.9, 0.9, 0.9);
            z-index: 998;
        }
    }

}
</style>