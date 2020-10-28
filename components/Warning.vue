<template>
    <article class="warning">
        <div class="warning__container">
            <h1 class="warning__title">
                <img src="@/assets/images/warning-title.png" alt="注意事項">
            </h1>
            <div class="warning__content">
                <p>即日起打開Vidol登入會員，開始進行扭扭樂，台劇、華劇扭起來！每一會員帳號每日可玩一次，<br>分享遊戲至社群，可再獲得一次遊戲機會。</p>
                <ul>
                    <li>獎項內容: Vidol 11人VIP歡樂看、 11日VIP體驗序號、 111元折扣、 11%折扣、 11元折扣。</li>
                    <li>按下「快扭我」進行遊戲，所有中獎紀錄及中獎序號皆顯示於「我的中獎紀錄」。</li>
                    <li>點擊「再扭一次」後進行遊戲分享，可再獲得一次遊戲機會。</li>
                    <li>活動辦法及中獎名單依本網站公佈為準。</li>
                    <li>本活動獲得之「會員折扣碼/優惠」僅能使用乙次。</li>
                    <li>本活動獲得之「會員折扣碼/優惠」<strong class="blue">限定使用於「 1111驚喜扭扭樂」</strong>方案。</li>
                    <li>本活動獲得之「會員折扣碼/優惠」限定於<strong class="red">活動期間(11/3-11/22)</strong>內使用完畢，逾期/遺失不進行補發，請自行紀錄/截圖。</li>
                    <li>所有參加者保證所有填寫或提出之資料均為真實且正確之個人資料，且未冒用或盜用任何第三人之資料，若有假造，冒用，盜用或不實，不正確之情事時，主辦單位得取消其參加或得獎資格與延遲中獎公告。</li>
                    <li>如有以下行為主辦單位有權取消參加資格，並保留相關法律追訴權利:使用不當行為或程式灌票或干擾活動進行、傳播不實謠言，造成本活動或本公司名譽受損、違反本活動辦法及政府法令之行為等。</li>
                    <li>參加本活動者同意所有於本活動網站所留存或產生之任何參與活動的資料及記錄，皆以主辦單位的電腦系統與時間的記錄為主。如有任何因電腦，網路，電話，技術或不可歸責於主辦單位之事由，而使 參加者送出之資料有延遲，遺失，錯誤，無法辨識之情況，主辦單位不負責任何法律責任，參加者不得因此異議。</li>
                    <li>活動辦法載明於本活動網頁中，參加者於參加本活動之同時，即同意接受本活動辦法之規範，主辦單位保留活動修改之權利。</li>
                </ul>
            </div>
        </div>
    </article>
</template>

<script>
export default {
    name: 'Warning'
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common.scss';

.warning {
    $bg-color: #9a9a9a;
    padding: 70px;
    border-radius: 20px;
    background-color: $bg-color;
    @media (max-width: #{$tablet-width}px) {
        padding: 15px;
    }
    &__container {
        position: relative;
        border: 4px dashed #fff;
        border-radius: 10px;
        background-color: #e6e6e6;
        box-shadow: 0 0 0 8px $bg-color, 0 0 0 13px #fff;
        @media (max-width: #{$tablet-width}px) {
            box-shadow: 0 0 0 5px $bg-color, 0 0 0 7px #fff;
        }
    }
    &__title {
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        @media (max-width: #{$tablet-width}px) {
            top: -13px;
            width: 115px;
        }
    }
    &__content {
        padding: 50px 60px;
        letter-spacing: letter-spacing(10);
        font-size: 20px;
        line-height: 36px;
        @media (max-width: #{$tablet-width}px) {
            padding: 1.5em 1em 1em;
            letter-spacing: letter-spacing(10);
            font-size: 12px;
            line-height: 18px;
        }
        > p {
            text-align: center;
            @media (max-width: #{$tablet-width}px) {
                margin: 0 1em 1em;
                > br {
                    display: none;
                }
            }
        }
        > ul {
            padding-left: 1.5em;
            list-style-type: decimal;
        }
        .blue {
            color: #472fff;
        }
        .red {
            color: #f00;
        }
    }
}
</style>
