import axios from 'axios';

export async function searchFoodByKeyword(keyword) {
    const res = await axios.get(`/api/food/search?keyword=${keyword}`);
    return res.data;
}

export async function fetchFoodDetail(name) {
    const res = await axios.get(`/api/food/detail?name=${name}`);
    return res.data;
}