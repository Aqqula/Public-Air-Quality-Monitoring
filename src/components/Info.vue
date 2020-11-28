<template>
  <div>
      <header>  <!--HEDER-->
        <div class="container-fluid">
            <div class="row no-gutters">
                 <div class="col-9">
                   <img src="../assets/img/Logo.png" alt="Logo" width="280" height="39">
                </div>          
                <div class="col-3">
                    <button type="button" class="btn btn-success"><router-link to="/">На головну сторінку</router-link></button>
                </div>
            </div>
        </div>
    </header>

    <main> <!--MAIN-->
        <div class="HederImg"> <!-- HEDERIMG -->
            <img src="../assets/img/HI.png" alt="img/hederImg.png">
        </div>
        <div class="container-fluid">
            <br>
            <div class="container-fluid graff2">
                <h1>Графік порівняння даних</h1>
                <vue-chart type="line" :data="chartData"></vue-chart>
            </div>
            <br>
        </div>
        <br>
        <div class="container-fluid InfoDet">
            <h1>Детальніша інформація</h1>
            <div class="row PM25">
                <div class="col-7">
                    <p><span>PM2.5</span> - це тверді частинки розміром менше 2,5 мікрон. Їх діаметр в 30 разів менше, ніж діаметр людської волосини. До них відноситься суміш частинок пилу, золи, сажі, а також сульфатів і нітратів, які перебувають в підвішеному стані в повітрі. Саме ці речовини викликають помутніння повітря, типове для центрів найбільших мегаполісів.</p>
                </div>
                <div class="col-5">
                    <img src="../assets/img/ПМ25.jpg" alt="PM25" width="300" height="300">
                </div>
            </div>
             <div class="row PM10">
                <div class="col-5">
                    <img src="../assets/img/ПМ10.jpg" alt="PM25" width="300" height="300">
                </div>
                <div class="col-7">
                    <p><span>PM10</span> - являють собою широко поширений забруднювач атмосферного повітря, що включає суміш твердих і рідких частинок, що знаходяться в повітрі в підвішеному стані.</p>
                </div>
            </div>
            <div class="row TMandHum">
                <div class="col-7">
                    <p><span>Температура</span> - являють собою широко поширений забруднювач атмосферного повітря, що включає суміш твердих і рідких частинок, що знаходяться в повітрі в підвішеному стані.</p>
                    <p><span>Влажность</span> - являють собою широко поширений забруднювач атмосферного повітря, що включає суміш твердих і рідких частинок, що знаходяться в повітрі в підвішеному стані.</p>
                </div>
                <div class="col-5">
                    <img src="../assets/img/температура и влажность.jpg" alt="PM25" width="300" height="300">
                </div>
            </div>
        </div>
        <br>
        <div class="FuterImg"> <!-- HEDERIMG -->
            <img src="../assets/img/FuterImg.png" alt="img/FuterImg.png">
        </div>
    </main>

    <footer><!--FOOTER--></footer>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import AQI from '../assets/data/data.json'
import VueChart from 'vue-chart-js'


export default {
    data() {
        return {
            arrayOfAqi : [],
            arrayOfPMTen : [],
            arrayOfPMTwo : [],
            arrayOfTemperature : [],
            arrayOfHumidity : [],
            chartData: {
                labels: [],
                datasets: [
                    // {
                    //     label: 'Component 1',
                    //     data: [10, 20, 30],
                    //     backgroundColor: [
                    //         'red',
                    //         'rgba(205, 92, 92)',
                    //         'rgba(255, 182, 193)',
                    //         'rgba(216, 191, 216)',
                    //         'rgba(176, 196, 222)',
                    //         'rgba(144, 238, 144)'
                    //     ],
                    // },
                    //  {
                    //     label: 'Component 1',
                    //     data: [10, 20, 30],
                    //     backgroundColor: [
                    //         'red',
                    //         'rgba(205, 92, 92)',
                    //         'rgba(255, 182, 193)',
                    //         'rgba(216, 191, 216)',
                    //         'rgba(176, 196, 222)',
                    //         'rgba(144, 238, 144)'
                    //     ],
                    // }
                ]
            }
        }
    },
    components: {
        VueChart
    },
    mounted() {
        this.arrayOfAqi = AQI;
        console.log(this.arrayOfAqi);

        // PM10
        this.arrayOfPMTen = this.arrayOfAqi.filter((el) => {
            return el.name == "PM10"
        });
          // PM2.5
        this.arrayOfPMTwo = this.arrayOfAqi.filter((el) => {
            return el.name == "PM2.5"
        });
        // Temperature
        this.arrayOfTemp = this.arrayOfAqi.filter((el) => {
            return el.name == "Temperature"
        });
        // Humidity
        this.arrayOfHum = this.arrayOfAqi.filter((el) => {
            return el.name == "Humidity"
        });

        //Перебыраємо масив з ПМ2.5 за датою
        var result = this.arrayOfPMTwo.reduce(function(h, obj) {
        h[obj.date.slice(0, 7)] = (h[obj.date.slice(0, 7)] || []).concat(obj);
        return h; 
        }, {});
        result = Object.keys(result).map(key => {
        return {
            date: key, 
            PMTwoAvg : result[key].reduce((a, b) => a + (parseInt(b.data) || 0), 0)/result[key].length,
           }
        });
        console.log(result);

        //Перебыраємо масив з ПМ10 за датою
        var resultOfPMTen = this.arrayOfPMTen.reduce(function(h, obj) {
        h[obj.date.slice(0, 7)] = (h[obj.date.slice(0, 7)] || []).concat(obj);
        return h; 
        }, {});
        resultOfPMTen = Object.keys(resultOfPMTen).map(key => {
        return {
            date: key, 
            PMTenAvg : resultOfPMTen[key].reduce((a, b) => a + (parseInt(b.data) || 0), 0)/resultOfPMTen[key].length,
           }
        });
        console.log(resultOfPMTen);

        //Перебыраємо масив з Temperature за датою
        var resultOfTemp = this.arrayOfTemp.reduce(function(h, obj) {
        h[obj.date.slice(0, 7)] = (h[obj.date.slice(0, 7)] || []).concat(obj);
        return h; 
        }, {});
        resultOfTemp = Object.keys(resultOfTemp).map(key => {
        return {
            date: key, 
            TempAvg : resultOfTemp[key].reduce((a, b) => a + (parseInt(b.data) || 0), 0)/resultOfTemp[key].length,
           }
        });
        console.log(resultOfTemp);

        //Перебыраємо масив з Humidity за датою
        var resultOfHum = this.arrayOfHum.reduce(function(h, obj) {
        h[obj.date.slice(0, 7)] = (h[obj.date.slice(0, 7)] || []).concat(obj);
        return h; 
        }, {});
        resultOfHum = Object.keys(resultOfHum).map(key => {
        return {
            date: key, 
            HumAvg : resultOfHum[key].reduce((a, b) => a + (parseInt(b.data) || 0), 0)/resultOfHum[key].length,
           }
        });
        console.log(resultOfHum);
    
        //bar chart PM2.5
        let dataOfChartPM25 = [];
        let labelsOfChart = [];
        result.forEach(el => {
            dataOfChartPM25.push(el.PMTwoAvg);
            labelsOfChart.push(el.date);
        });
        this.chartData.datasets.push({"label": "PM2.5", backgroundColor: 'transparent',"data": dataOfChartPM25, "fill": false, borderColor:'#DB7093'});
        this.chartData.labels = labelsOfChart;

        // //bar chart PM10
        let dataOfChartPM10 = [];
        resultOfPMTen.forEach(el => {
            dataOfChartPM10.push(el.PMTenAvg);
        });
        this.chartData.datasets.push({"label": "PM10", backgroundColor: 'transparent',"data": dataOfChartPM10, "fill": false, borderColor:'#FFA07A'});
        
        // //bar chart Temp
        let dataOfChartTemp = [];
        resultOfTemp.forEach(el => {
            dataOfChartTemp.push(el.TempAvg);
        });
        this.chartData.datasets.push({"label": "Temperature", backgroundColor: 'transparent',"data": dataOfChartTemp, "fill": false, borderColor:'#20B2AA'});

        // //bar chart Hum
        let dataOfChartHum = [];
        resultOfHum.forEach(el => {
            dataOfChartHum.push(el.HumAvg);
        });
        this.chartData.datasets.push({"label": "Humidity", backgroundColor: 'transparent',"data": dataOfChartHum, "fill": false, borderColor:'#4682B4'});

    },
}
</script>

<style>
@font-face {
	font-family: 'Century Gothic Regular';
	src: url('../assets/fonts/CenturyGothic.ttf') format('truetype');
}
.graff span{
	font-family: 'Century Gothic Regular';
	font-size: 5.4vh;
	color: #008d46;
}
header{
	/*border: 1px solid;*/
	display: flex;
	flex-direction: row;
	padding: 0.9vh;
	background: linear-gradient(160deg,#98d633,#0d7c3a);
	opacity: 0.80;
}
.HederImg img{
	/*border: 1px solid;*/
	width: 100vw;
	height: auto;
	display: flex;
	justify-content: center;
	align-items: center;
}
.FuterImg img{
	width: 100vw;
	height: auto;
	display: flex;
	justify-content: center;
	align-items: center;
}
.InfoBox{
	/*border: 1px solid;*/
	padding: 0.5vh;
	display: flex;
	justify-content: space-between;
}
.InfoBox h3{
	color: #006400;
}
.row.InfoBox p{
	font-family:'Century Gothic Regular';
	font-size: 2vh;
}
.BOX{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 1vh;
	border: 10px solid transparent;
	border-radius: 40px 10px;
	border-image: linear-gradient(to left, transparent 0%, #228B22 120%);
	border-image-slice: 0.9;
}
.graff{
    min-height: 40vh;
	display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
	border-left: 2px ridge #228B22;
	border-bottom: 2px ridge #228B22;
	border-right: 2px ridge #228B22;
    font-family: 'Century Gothic Regular';
	color: #008d46;
}
.graff2{
    min-height: 40vh;
	display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Century Gothic Regular';
	color: #008d46;
}
.adding{
	display: flex;
	align-items: center;
	
}
.adding span{
	font-family:'Century Gothic Regular';
	font-size: 2.5vh;
}
select{
	color: #228B22;
	border-color: #228B22;
}
.btn-success {
    width: 100%;
}
span{
    color:#008d46;
}
.InfoDet h1{
    color:#008d46;
    font-family:'Century Gothic Regular';
    display: flex;
    justify-content: center;
}
.PM25{
    font-family:'Century Gothic Regular';
	font-size: 3vh;
    display: flex;
    justify-content: center;
    padding: 20px;
    
}
</style>