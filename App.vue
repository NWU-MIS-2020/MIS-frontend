<template>
    <el-container>
        <el-header>
            毕业完成度系统
            <el-dropdown>
                <span class="el-dropdown-link">
                    查询
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>123</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown>
                <span class="el-dropdown-link">
                    修改
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>123</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown>
                <span class="el-dropdown-link">
                    审核
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>123</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown style="float: right">
                <el-button icon="el-icon-user" type="primary"></el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="logout" icon="el-icon-switch-button">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <el-divider></el-divider>
        <el-main>
            模块名称
            <el-divider></el-divider>
            主体内容
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="日期" width="180"></el-table-column>
                <el-table-column prop="name" label="表格" width="180"></el-table-column>
                <el-table-column prop="address" label="表格"></el-table-column>
            </el-table>
            <br><br><br><br><br><br><br>
            <el-divider></el-divider>
            这里可能是一个图表
        </el-main>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <el-divider></el-divider>
        <el-footer>西北大学 2020</el-footer>
    </el-container>
</template>

  <script>
export default {
    data() {
        return {
            tableData: [
                {
                    date: "2016-05-02",
                    name: "测试",
                    address: "测试"
                }
            ]
        };
    }
};
</script>