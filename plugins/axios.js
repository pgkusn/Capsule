export default function ({ $axios, redirect, error, $config }) {
    $axios.setBaseURL($config.API_URL);
    $axios.onError(data => {
        const code = parseInt(data.response && data.response.status);
        console.error(`Status Code: ${code}`);
        error('網路連線錯誤，請稍後再試！');
    });
}
