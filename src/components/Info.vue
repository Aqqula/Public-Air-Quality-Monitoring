<template>
  <div>
      <header>  <!--HEDER-->
        <div class="container-fluid">
            <div class="row no-gutters">
                <div class="col-9 justify-content-end">
                   <img src="../assets/img/Logo.png" alt="Logo" width="280" height="39">
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
            <div class="container-fluid graff">
                <vue-chart type="bar" :data="chartData"></vue-chart>
            </div>
            <br>
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
    
        //bar chart AQI
        let dataOfChartPM25 = [];
        let labelsOfChart = [];
        result.forEach(el => {
            dataOfChartPM25.push(el.PMTwoAvg);
            labelsOfChart.push(el.date);
        });
        this.chartData.labels = labelsOfChart;
        this.chartData.datasets.push({"label": "PM2.5", "data": dataOfChartPM25, "backgroundColor": colorsOfChart});
 
        //bar chart PM10
        // let dataOfChartPM = [];
        // resultOfPMTen.forEach(el => {
        //     dataOfChartPM.push(el.PMTenAvg);
        // });
        // this.chartData.datasets.push({"label": "PM10", "data": dataOfChartPM});
        
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
    align-items: center;
    justify-content: center;
	border-left: 2px ridge #228B22;
	border-bottom: 2px ridge #228B22;
	border-right: 2px ridge #228B22;
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
</style>