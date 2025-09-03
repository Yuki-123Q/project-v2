<template>
    <div class="w-footer">
        <el-footer>
            copyright@YukiYan 2025
        </el-footer>
    </div>
</template>
<style lang="scss">
.w-footer {
    margin-top: 20px;
    background: rgba(101, 92, 92, 1);
    color: white;
    z-index: 2000;
    .el-footer {
        padding: 0;
        line-height: 60px;
    }
}

@media (max-width: 500px) {
    .w-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100vw;
    }
}
</style>