export default function ({ $axios, redirect, error, $config }) {
    $axios.setBaseURL($config.API_URL);
}
