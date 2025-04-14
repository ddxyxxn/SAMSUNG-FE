<!-- components/PostTable.vue -->
<template>
    <table class="post-table">
        <thead>
            <tr>
                <th>No.</th>
                <th>제목</th>
                <th>일시</th>
                <th>조회수</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(post, index) in posts" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ post.title }}</td>
                <td>{{ post.date }}</td>
                <td>{{ post.count }}</td>
            </tr>
        </tbody>
    </table>
</template>
  
<script setup>
    defineProps({
        posts: {
            type: Array,
            required: true,
        },
    })
</script>
  
<style scoped>
    .post-table {
        position: relative;
        width: 100%;
        border-collapse: separate;
        border-spacing: 0 10px;
        margin-top: 1rem;
        border-radius: 12px;
        border: 2px solid lightgray;
        padding: 30px;
  
    }
  
    /* .post-table th,
    .post-table td {
        border: 1px solid #ddd;
        padding: 12px;
        text-align: center;
    } */
  
    .post-table th {
        background-color: white;
        font-weight: bold;
        padding: 12px;
        text-align: center;
        border-bottom: 2px solid gray;
    }

    .post-table td {
        background-color: white;
        padding: 16px;
        text-align: center;
        border: none;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
        border-radius: 8px;
    }
  
    .post-table tr:hover  td{
        background-color: #f9f9f9;
        transition: background-color 0.2s ease;
    }
</style>
  