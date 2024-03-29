const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const audio= $('#audio') // get element audio player!
const progress = $('#progress');// get element input range
let playing = false; // status 'playing' when first load app
const loader = $('.loader'); // get element current progress
const bgContainer = $('.container')
const bgMain = $('.main-bg')

const curSong = $('.cur-playing') // get element to render current songs

//// get element button control
const playPause = $('.play-pause');
const btnPlay = $('.btn-play')
const btnPause = $('.btn-pause')
const btnNext = $('.next')
const btnPrev = $('.prev')
const repeat = $('.repeat')// get element repeat current song
let isRepeat 
const shuffle = $('.shuffle') //get element random song
let isShuffle

const list = $('.column') // get element to render songs


const theme = $('.theme-icon') //get element change theme
let ramdomMemory = [];
var listSong ; //get song after render playlist
var currentSong =0; // index song

const playList = [
    {
        src:"./acssets/mp3/yeunguoicouocmo.mp3",
        nameSong: "Yêu Người Có Ước Mơ",
        singer: "buitruonglinh",
        img: "https://i.ytimg.com/vi/6r7jzy1LABY/maxresdefault.jpg"
    },
    {
        src:"./acssets/mp3/suytnuathi.mp3",
        nameSong: "Suýt Nữa Thì",
        singer: "Andiez",
        img: "https://i.ytimg.com/vi/cUmpJ2zwfVU/maxresdefault.jpg"
    },
    {
        src:"./acssets/mp3/maimaikhongphaianh.mp3",
        nameSong: "Mãi Mãi Không Phải Anh",
        singer: "Thanh Bình",
        img: "https://i.ytimg.com/vi/677bAENZAEI/maxresdefault.jpg"
    },
    {
        src:"./acssets/mp3/ghequa.mp3",
        nameSong: "Ghé Qua",
        singer: "taynguyensound",
        img: "https://i.ytimg.com/vi/wNH2zUpr_k4/maxresdefault.jpg"
    },
    {
        src:"./acssets/mp3/duongtoichoemve.mp3",
        nameSong: "Đường Tôi Chở Em Về",
        singer: "buitruonglinh",
        img: "https://i.ytimg.com/vi/OuNo8Tkb3lI/maxresdefault.jpg"
    },
    {
        src:"./acssets/mp3/chodoicodangso.mp3",
        nameSong: "Chờ đợi có đáng sợ",
        singer: "Andiez",
        img: "https://i.ytimg.com/vi/WE05tPmCj8k/maxresdefault.jpg"
    },
    {
        src:"./acssets/mp3/aidoiminhduocmai.mp3",
        nameSong: "Ai Đợi  mình Được Mãi lofi",
        singer: "Thanh Hưng",
        img: "https://i.ytimg.com/vi/LM-q6gkn63s/maxresdefault.jpg"
    },
    {
        src:"./acssets/mp3/3107full.mp3",
        nameSong: "3107 Full version ",
        singer: "W/n x DuongG, Nâu , Titie, Erik",
        img: "https://i.ytimg.com/vi/GatNL0mmQGc/maxresdefault.jpg"
    },
    {
        src:"./acssets/mp3/CuChillThoi.mp3",
        nameSong: "Cứ Chill Thôi ",
        singer: "Chillies ft Suni Hạ Linh & Rhymastic",
        img: "https://lyrics-hot.com/wp-content/uploads/2021/02/loi-bai-hat-cu-chill-thoi-640.jpg"
    },
    {
        src:"./acssets/mp3/XeDap.mp3",
        nameSong:" Xe Đạp ",
        singer: "CM1X",
        img: "https://i.ytimg.com/vi/3v3YYpVrEuA/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/MuonRuouToTinh.mp3",
        nameSong:" Mượn Rượu Tỏ Tình",
        singer: "BIGDADDY x EMILY",
        img: "https://i.ytimg.com/vi/aGUQsb31TEw/hq720.jpg"
    
    },
    {
        src:"./acssets/mp3/HaiMuoiHai.mp3",
        nameSong: "Hai Mươi Hai",
        singer: "amme x Hứa Kim Tuyền",
        img: "https://i.ytimg.com/vi/n2iFnPaAsnU/maxresdefault.jpg"
    },
    {
        src:"./acssets/mp3/AnhMetRoi.mp3",
        nameSong:" Anh Mệt Rồi",
        singer: "Anh Quân Idol x Freak D",
        img: "https://i.ytimg.com/vi/wAQnEYVcOq4/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/AnhSeQuenEmMa.mp3",
        nameSong:" Anh Sẽ Quên Em Mà",
        singer: "NIT ft Sing",
        img: "https://i.ytimg.com/vi/tYNX2E6v6jU/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/ChungTaCuaHienTai.mp3",
        nameSong:" Chúng Ta Của Hiện Tại- lofi",
        singer: "MTP x CM1X",
        img: "https://media.vov.vn/sites/default/files/styles/large/public/2021-02/chungtacuahientai.jpg"
    
    },
    {
        src:"./acssets/mp3/BuongDoiTayNhauRa.mp3",
        nameSong:" Buông Đôi Tay Nhau Ra",
        singer: "Sơn Tùng-MTP ",
        img: "https://i.ytimg.com/vi/LCyo565N_5w/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/HayTraoChoAnh.mp3",
        nameSong:"Hãy Trao Cho Anh",
        singer: "Sơn Tùng-MTP ",
        img: "https://amthanhthudo.com/wp-content/uploads/hay-trao-cho-anh.jpg"
    
    },
    {
        src:"./acssets/mp3/LacTroi.mp3",
        nameSong:"Lạc Trôi",
        singer: "Sơn Tùng-MTP ",
        img: "https://i.ytimg.com/vi/DrY_K0mT-As/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/HoaVoSac.mp3",
        nameSong:"Hoa Vô Sắc",
        singer: "K-ICM , Jack ",
        img: "https://i.ytimg.com/vi/gZKkD3edFaE/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/ChungTaCuaSauNay.mp3",
        nameSong:" Chúng Ta Của Sau Này",
        singer: "T.R.I",
        img: "https://avatar-ex-swe.nixcdn.com/song/share/2021/01/27/f/1/e/c/1611738359456.jpg"
    
    },
    {
        src:"./acssets/mp3/HetThuongCanNho.mp3",
        nameSong:" Hết Thương Cạn Nhớ",
        inger: "Đức Phúc",
        img: "https://i.ytimg.com/vi/DZDYZ9nRHfU/maxresdefault.jpg"
    
    },
    {
       src:"./acssets/mp3/DungLoAnhDoiMa.mp3",
       nameSong:" Đừng Lo Anh Đợi Mà",
       singer: "Mr.Siro",
       img: "https://i.ytimg.com/vi/BnWiFq0AxQc/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/HoaNoKhongMau.mp3",
        nameSong:" Hoa Nở Không Màu",
        singer: "Hoài Lâm x Freak D",
        img: "https://i.ytimg.com/vi/y_6aSG2yfe8/mqdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/MuaHaNamAy.mp3",
        nameSong:" Mùa Hạ Năm Ấy",
        singer: "Linh",
        img: "https://i.ytimg.com/vi/bbiXiY_Ec_c/sddefault.jpg"
    
    },
    {
        src:"./acssets/mp3/NhuAnhDaThayEm.mp3",
        nameSong:"Như Anh Đã Thấy Em",
        singer: "Phúc XP x Freak D",
        img: "https://i.ytimg.com/vi/cPbp2iFaZRo/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/PhaiChangEmDaYeu.mp3",
        nameSong:" Phải Chăng Em Đã Yêu",
        singer: "Juky San ft Redt x Freak D ",
        img: "https://i.ytimg.com/vi/O81_4VAson4/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/SinhRaDaLaThuDoiLapNhau.mp3",
        nameSong:" Sinh Ra Đã Là Thứ Đối Lập Nhau",
        singer: "Emcee L (Da LAB) ft. Badbies",
        img: "https://i.ytimg.com/vi/redFrGBZoJY/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/TinhKaNgotNgao.mp3",
        nameSong:"Tình Ka Ngọt Ngào",
        singer: "LẬP NGUYÊN x YẾN NỒI CƠM ĐIỆN",
        img: "https://i.ytimg.com/vi/Yr7FIIshNxo/maxresdefault.jpg"
   
    },
    {
        src:"./acssets/mp3/Yeu1NguoiCoLe.mp3",
        nameSong:"Yêu Một Người Có Lẽ",
        singer: " Lou Hoàng - Miu Lê",
        img: "https://i.ytimg.com/vi/w2DBMrXJDIo/sddefault.jpg"
    
    },
    {
        src:"./acssets/mp3/LegendsNeverDie.mp3",
        nameSong:"Legends Never Die",
        singer: " Against The Curent-World 2017",
        img: "https://i.ytimg.com/vi/r6zIGXun57U/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/Yeu1NguoiCoLe.mp3",
        nameSong:"Yêu Một Người Có Lẽ",
        singer: " Lou Hoàng - Miu Lê",
        img: "https://i.ytimg.com/vi/w2DBMrXJDIo/sddefault.jpg"
            
    },
    {
        src:"./acssets/mp3/EmLaKeDangThuong.mp3",
        nameSong:"Em Là Kẻ Đáng Thương",
        singer: " Phát Huy T4",
        img: "https://i.scdn.co/image/ab67616d0000b273e6f362e9f1966e14e0056764"
    
    },
    {
        src:"./acssets/mp3/ChangTheTimDuocEm.mp3",
        nameSong:"Chẳng Thể Tìm Được Em",
        singer: " Freak D, Reddy",
        img: "https://i.ytimg.com/vi/GA6eNcbp57A/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/ChoDoiCoDangSo.mp3",
        nameSong:"Chờ Đợi Có Đáng Sợ",
        singer: " Andiez",
        img: "https://i.ytimg.com/vi/WE05tPmCj8k/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/EmDongYIDo.mp3",
        nameSong:"Em Đồng Ý(I Do)",
        singer: "Đức Phúc-911",
        img: "https://avatar-ex-swe.nixcdn.com/song/share/2023/02/08/6/f/8/6/1675840937290.jpg"
    
    },
    {
        src:"./acssets/mp3/FromMyHeart.mp3",
        nameSong:"From My Heart",
        singer: "Kang Tae Oh",
        img: "https://i1.sndcdn.com/artworks-000105068842-74r0l5-t500x500.jpg"
    
    },
    {
        src:"./acssets/mp3/song12.mp3",
        nameSong:"Đừng Lo Nhé Có Anh Đây",
        singer: "Thiên Tú",
        img: "https://i.ytimg.com/vi/xM9eGtrIGh8/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/song16.mp3",
        nameSong:"Em Là Nhất",
        singer: "kis x Hoàng kaye x Yahy",
        img: "https://i.ytimg.com/vi/MbGo-MkHSTs/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/song19.mp3",
        nameSong:"Cảm Ơn Vì Tất Cả",
        singer: "Anh Quân Idol",
        img: "https://i.ytimg.com/vi/jz2D2kJqm_8/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/song23.mp3",
        nameSong:"Khoan Thai",
        singer: "Khải Đăng",
        img: "https://i.ytimg.com/vi/6EnPoe2Rgps/mqdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/song4.mp3",
        nameSong:"Tiếng Pháo Tiễn Người",
        singer: "Hùng Quân",
        img: "https://i.ytimg.com/vi/KI6TFG0-mTY/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/song8.mp3",
        nameSong:"Thuyền Quyên",
        singer: "Diệu Kiên",
        img: "https://i.ytimg.com/vi/kqOybgUwTGY/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/AiLaNguoiThuongEm.mp3",
        nameSong:"Ai Là Người Thương Em",
        singer: "Quân AP",
        img: "https://i.ytimg.com/vi/P_jk6caKnfA/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/ChiLaKhongCungNhau.mp3",
        nameSong:"Chỉ Là Không Cùng Nhau",
        singer: "TĂNG PHÚC ft TRƯƠNG THẢO NHI",
        img: "https://i.ytimg.com/vi/UqKVL56IJB8/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/changaiyeumaimotnguoi.mp3",
        nameSong:"Chẳng Ai Yêu Mãi Một Người",
        singer: "NB3 HOÀI BẢO ft ĐÔNG ĐẶNG",
        img: "https://i.ytimg.com/vi/5QEUY6-BMeI/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/minhanhnoinay.mp3",
        nameSong:"Mình Anh Nơi Này",
        singer: "NIT ft. SING",
        img: "https://i.ytimg.com/vi/w2cEVsySsNI/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/emlaconthuyencodon.mp3",
        nameSong:"Em Là Con Thuyền Cô Đơn",
        singer: "THÁI HỌC x CHÍ HƯỚNG",
        img: "https://i.ytimg.com/vi/InlnBTL4qeQ/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/nguoilaoi.mp3",
        nameSong:"Người Lạ Ơi ",
        singer: "Superbrothers x Karik x Orange",
        img: "https://i.ytimg.com/vi/g20t_K9dlhU/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/neuemcontontai.mp3",
        nameSong:"Nếu Em Còn Tồn Tại ",
        singer: "Trịnh Đình Quang",
        img: "https://i.ytimg.com/vi/pA5BEWKZEqw/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/thegioiaotinhyeuthat.mp3",
        nameSong:"Thế Giới Ảo Tình Yêu Thật ",
        singer: "Trịnh Đình Quang",
        img: "https://i.ytimg.com/vi/cIZ1IDD35Y8/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/nhunggianhnoi.mp3",
        nameSong:"Những Gì Anh Nói ",
        singer: "BOZITT",
        img: "https://i.ytimg.com/vi/ntHG5LCGaxE/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/thattinh.mp3",
        nameSong:"Thất Tình ",
        singer: "Trịnh Đình Quang",
        img: "https://i.ytimg.com/vi/FSeGrBw5eFA/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/phiasaumotcogai.mp3",
        nameSong:"Phía Sau Một Cô Gái  ",
        singer: "Soobin Hoàng Sơn",
        img: "https://i.ytimg.com/vi/vCIc1g_4JWM/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/gio.mp3",
        nameSong:"Gió  ",
        singer: "JANK",
        img: "https://i.ytimg.com/vi/igoE062z76U/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/daonuong.mp3",
        nameSong:"Đào Nương ",
        singer: "HOÀNG VƯƠNG",
        img: "https://i.ytimg.com/vi/qI5wVW69mLE/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/ngoai30.mp3",
        nameSong:"Ngoài 30 ",
        singer: "THÁI HỌC x LÊ CHÍ TRUNG",
        img: "https://i.ytimg.com/vi/p84MfhO8w00/maxresdefault.jpg"
    
    },
    {
        src:"./acssets/mp3/giuitinhyeunho.mp3",
        nameSong:"Giửi Tình Yêu Nhỏ ",
        singer: "Trịnh ĐÌnh Quang",
        img: "https://i.ytimg.com/vi/dXjcjpSd2jc/maxresdefault.jpg"
    
    },
]


const mainApp = {
    renderPlaylist : function(){
        const htmlsList = playList.map((song,index)=>{
            return `
                    <div class="song">
                        <img src="${song.img}" alt="" class="img-song-item">
                        <div class="decript">
                            <div class="name-song-item">${song.nameSong}</div>
                            <div class="singer-song-item">${song.singer}</div>
                        </div>
                        
                    </div>
                    `
        })
        list.innerHTML = htmlsList.join('')
    
        //get element listsong after render playlist
        listSong = $$('.song')
    },
    
    renderCurrentSong: function(){
        audio.src = playList[currentSong].src;
        bgContainer.style.backgroundImage =`url(${playList[currentSong].img}) `
        bgMain.style.backgroundImage = `url(${playList[currentSong].img}) `
        curSong.innerHTML = 
            `
            <div class="cur-song">
                <div class="now">Now playing :</div>
                <div class="name-song">${playList[currentSong].nameSong}</div>
                <div class="name-singer">${playList[currentSong].singer}</div>
            </div>
            <div class="cur-img">
                <img src="${playList[currentSong].img}" alt="" class="img">
                <img src="${playList[currentSong].img}" alt="" class="drop-img">
            </div>
            `

        //add class 'now-play' for first song
        listSong[currentSong].classList.add('now-play')
    },
    handleEvents: function(){
        theme.onclick =()=>{
            $('.main-bg-filter').classList.toggle('change-theme')
        }
        
        repeat.onclick = ()=>{
            isRepeat= repeat.classList.toggle('focus')
        }
        
        shuffle.onclick = ()=>{
            isShuffle= shuffle.classList.toggle('focus')
        }
        playPause.onclick = ()=>{
            if(!playing){
                generalFunction.audioPlay();
            }
            else{
                generalFunction.audioPause()
            }
        }
        
        btnNext.onclick=()=>{
            generalFunction.audioNext()
        }
        btnPrev.onclick=()=>{
            generalFunction.audioBack()
        }
        audio.onended =()=>{
            if(isRepeat){
                generalFunction.audioPlay()
            }
            else{
                generalFunction.audioNext()
            }
        }
    
        for(let j = 0 ; j< listSong.length; j++){
            listSong[j].onclick=()=>{
                currentSong = j;
                generalFunction.removeClass()
                this.renderCurrentSong()
                generalFunction.audioPlay()
            }
        }
    },

    start : function(){
        this.renderPlaylist()
        this.renderCurrentSong()
        this.handleEvents()
    }
}


const generalFunction= {
    removeClass :function(){
        var activeElements = $$(".now-play");
        for (var i = 0; i < activeElements.length; i++) {
            activeElements[i].classList.remove("now-play");
        }
    },
    audioPlay: function(){
        audio.play();
        playing= true;
        btnPlay.classList.add('dp-none')
        btnPause.classList.remove('dp-none')
    },
    
    audioPause :function(){
        audio.pause();
        playing= false;
        btnPause.classList.add('dp-none')
        btnPlay.classList.remove('dp-none')
    },
    audioNext: function(){
        if(isShuffle){
          currentSong =  this.isShuffled(playList.length, ramdomMemory)
        }
        else{
            currentSong++;
            if( currentSong >= playList.length ){
                currentSong = 0;
            }
        }
        this.removeClass() 
        mainApp.renderCurrentSong()
        this.audioPlay()
    },
    
    audioBack :function(){
        if(isShuffle){
            currentSong =  this.isShuffled(playList.length, ramdomMemory)
          }
        else{
            currentSong--;
            if( currentSong < 0 ){
                currentSong = playList.length -1 ;
            }
        }
        
        this.removeClass()
        mainApp.renderCurrentSong();
        this.audioPlay()
    },
    isShuffled: function(arrLength, arr) {
        let randomNumber = Math.floor(Math.random() * arrLength);
        while (arr.includes(randomNumber)) {
          randomNumber = Math.floor(Math.random() * arrLength);
        }
        arr.push(randomNumber);
        return randomNumber;
    },
}

//handle times
const handleTimes={
    updateTrack: function(){
        audio.ontimeupdate = function () {
            if (audio.duration) {
              const progressPercent = Math.floor(
                (audio.currentTime / audio.duration) * 100
              );
              progress.value = progressPercent ;
              if(progress.value <45){
                loader.style.width = progress.value-1.5 +2 +"%";
                }
                else{
                    loader.style.width = progress.value - 0.5 +"%";
                }
            }
          }
        progress.oninput = function (e) {
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime;
        };
    },
    updateTime:function(){
            var time = audio.currentTime;
            var timeSecons = Math.floor(time / 1);
            var min = Math.floor(timeSecons / 60);
            (min >= 1) ? timeSecons = timeSecons - (min*60) : min = '0';
            (timeSecons < 1) ? sec='0' : void 0;
            if(min < 10) {
                min = "0" + min;
            }
            if(timeSecons < 10) {
                timeSecons = "0" + timeSecons;
            }
            $(".curTime").innerHTML = min + ":" + timeSecons;
    }, 
    getDurationTimes:function(){
        audio.onloadedmetadata = function() {
            var time = audio.duration;
          
          
            var timeSecons = Math.floor(time / 1);
            
              var min = Math.floor(timeSecons / 60);
              (min >= 1) ? timeSecons = timeSecons - (min*60) : min = '0';
              (timeSecons < 1) ? sec='0' : void 0;
              if(min < 10) {
                min = "0" + min;
            }
              if(timeSecons < 10) {
                timeSecons = "0" + timeSecons;
            }
            $(".sumTime").innerHTML = min + ":" + timeSecons;
          };
    },
    onTimeStart:function(){
        this.updateTrack();
        setInterval('handleTimes.updateTime()', 1000);
        this.getDurationTimes()
    }
}

//start
mainApp.start()
handleTimes.onTimeStart()
